"use strict";

var url = require("url")
var http = require('http')
var https = require('https')
var EventEmitter = require('events').EventEmitter

var WebSocketServer = require('websocket').server
var WebSocketClient = require('websocket').client

var Future = require("future")

// returns an event emitter
    // that can get event:
        // error: error
    // and has the following methods:
        // wait(): waits for the server to be listening
        // close(): shutsdown the websocket server and closes the http server
// options is an object with optional properties:
    // secure - whether to use http or https (default false)
    // secureOptions - options to pass to http.createServer
    // httpHandler - handler for http and https requests (defaults to no-op)
    // keepaliveGracePeriod - number of milliseconds to wait after a ping to drop the connection
    // maxReceiveSize - Maximum size of a received message (and frame) in bytes
// callback gets one parameter - the connection (a wsConnection object, see below)
exports.listen = function(port/*,[options], callback*/) {
    if(arguments.length === 2) {
        var options = {secure:false}
        var callback = arguments[1]
    } else if(arguments.length > 2) {
        var options = arguments[1]
        var callback = arguments[2]
    } else {
        throw Error("Invalid number of arguments - should be 2 or 3: "+arguments.length)
    }

    if(options.secure === undefined) options.secure = false
    if(options.httpHandler === undefined) options.httpHandler = function(request, response) {}

    if(options.secure) {
        var server = https.createServer(options.secureOptions, options.httpHandler).listen(port)
    } else {
        var server = http.createServer(options.httpHandler).listen(port)
    }

    var emitter = new EventEmitter()


    var listeningFuture = new Future
    server.on('listening', function() {
        listeningFuture.return()
    })
    server.on('error', function(err) {
        emitter.emit('error', err)
    })

    var serverOptions = {
        httpServer: server,
        autoAcceptConnections: false // unfortunately, I can't figure out how to actually interact with the connection without doing it this way
    }
    if(options.keepaliveGracePeriod !== undefined) serverOptions.keepaliveGracePeriod = options.keepaliveGracePeriod
    if(options.maxReceiveSize !== undefined) {
        serverOptions.maxReceivedMessageSize = serverOptions.maxReceivedFrameSize = options.maxReceiveSize        
    }
    
    var wsServer = new WebSocketServer(serverOptions)

    wsServer.on('request', function(request) {
        try {
            callback({
                request: request,
                resource: request.resource,
                remoteAddress: request.remoteAddress,
                origin: request.origin,

                accept: function(websocketProtocol) {
                    // a websocket connection: https://github.com/Worlize/WebSocket-Node/wiki/Documentation
                    var connection = request.accept(websocketProtocol, request.origin)
                    return wsConnection(connection)
                },

                // xWebSocketRejectReason is a message to send back to the client in the form of an "X-WebSocket-Reject-Reason" header
                reject: function(httpStatus, xWebSocketRejectReason) {
                    request.reject(httpStatus, xWebSocketRejectReason)
                }
            })
        } catch(e) {
            if(!listeningFuture.isResolved()) {
                listeningFuture.throw(e)
            } else {
                if(!(e instanceof Error)) {
                    e = new Error(e)
                }
                emitter.emit('error', e)
            }
        }
    })

    emitter.close = function() {
        wsServer.shutDown()
        server.close()
    }
    emitter.wait = function() {
        return listeningFuture.wait()
    }

    return emitter
}

// returns a future that returns a wsConnection object (see below)
// options can have the properties:
    // protocol - the websocket protocol to use (this is not the same as ws or wss)
    // secure - (Default: false) whether to use tls (wss) or not
    // secureOptions - options to pass to https.request
exports.connect = function(hostAndResource, port, options) {
    if(options === undefined) options = {}

    var websocketClientOptions = {}
    if(options.secure === true) {
        websocketClientOptions.tlsOptions = options.secureOptions
    }

    var client = new WebSocketClient(websocketClientOptions)

    var f = new Future
    client.on('connectFailed', function(errorString) {
        var reason = errorString.toString().match(/x-websocket-reject-reason: (.*)/)

        var e = new Error('connectionFailure')
            e.cause = errorString.toString()
            e.toString = function() {
                return 'connectionFailure - '+errorString
            }
        if(reason !== null) {
            e.reason = reason[1]
        }

        f.throw(e)
    })
    client.on('connect', function(connection) {
        try {
            f.return(wsConnection(connection))
        } catch(e) {
            f.throw(e)
        }
    })

    if(options.secure) var protocol = 'wss'
    else               var protocol = 'ws'

    var hostAndResourceParts = hostAndResource.split('/')
    var host = hostAndResourceParts[0]
    hostAndResourceParts.splice(0,1)
    var resource = hostAndResourceParts.join('/')

    client.connect(protocol+'://'+host+':'+port+'/'+resource, options.protocol)

    return f
}


// Returns an object that..
// has the following properties:
    // close(): closes the connection
    // send(): sends a message, can be either a utf-8 string or a node.js Buffer object (for binary data)
// and can get the following events:
    // message:
    // close:
    // error:
function wsConnection(connection) {
    var emitter = new EventEmitter()
    emitter.connection = connection
    emitter.connected = function() {
        return emitter.connection.connected
    }
    emitter.send = function(data) {
        if(!emitter.connected()) {
            throw new Error("Connection is closed")
        }
        connection.send(data)
    }
    emitter.close = function() {
        connection.close()
    }

    connection.on('message', function(data) {
        if(data.type === 'utf8') {
            emitter.emit('message', data.utf8Data)
        } else if(data.type === 'binary') {
            emitter.emit('message', data.binaryData)
        } else {
            throw Error('Unknown type: '+data.type)
        }
    })
    connection.on('close', function(reasonCode, description) {
        //if(!readECONNRESTEerrorHappened)
            emitter.emit('close', reasonCode, description)
    })
    //var writeEPIPEerrorHappened = false // looks like a bug in Worlize Websockets - EPIPE error happens but no close event happens
    //var readECONNRESTEerrorHappened = false // um, i guess same thing here?
    connection.on('error', function(error) {
        // all the commented out code here are workarounds for things that I think Worlize websockets has now fixed
        if(error.message === 'read ECONNRESET') {
            // CORRECTION: I guess this isn't the case -> disconnections will be automatically emitted via the close event
            /*if(readECONNRESTEerrorHappened === false) {
                readECONNRESTEerrorHappened = true
                emitter.emit('close', undefined, 'read ECONNRESET')
            } */
        } else if(error.message === 'write EPIPE') {
            /*if(writeEPIPEerrorHappened === false) {
                writeEPIPEerrorHappened = true
                emitter.emit('close', undefined, 'write EPIPE')
            }*/
        } else
            emitter.emit('error', error)
    })

    return emitter
}