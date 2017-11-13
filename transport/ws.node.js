var http = require("http")
var https = require("https")

var proto = require('proto')
var WebSocketServer = require('websocket').server
var WebSocketClient = require('websocket').client


// transportOptions contains options for theturtle32/WebSocket-Node
    // most of the options can be found here: https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketServer.md#server-config-options
    // Also, the tlsOptions option from here: https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketClient.md
    // And the undocumented `secure` option - (Default:false) if true, connect will use the wss protocol (otherwise will use ws). The tlsOptions are ignored unless `secure` is true.
module.exports = function(transportOptions) {
    if(!transportOptions)                          transportOptions = {secure:false}
    if(transportOptions.secure === undefined)      transportOptions.secure = false
    if(transportOptions.wsProtocol === undefined)  transportOptions.wsProtocol = ''
    if(transportOptions.httpHandler === undefined) transportOptions.httpHandler = function(request, response) {}

    if(transportOptions.httpServer === undefined) {
        if(transportOptions.secure) {
            transportOptions.httpServer = https.createServer(transportOptions.secureOptions, transportOptions.httpHandler)
        } else {
            transportOptions.httpServer = http.createServer(transportOptions.httpHandler)
        }
    }

    transportOptions.autoAcceptConnections = false // unfortunately, I can't figure out how to actually interact with the connection without doing it this way

    return {
        connect: function(host, port, rpepOptions) {
            if(transportOptions.secure) var protocol = 'wss'
            else                        var protocol = 'ws'

            var client = new WebSocketClient(transportOptions)
            client.connect(protocol+'://'+host+':'+port, transportOptions.wsProtocol)  // can wsProtocol be undefined?

            return client
        },

        listen: function(port, rpepOptions, requestHandler) {
            var wsServer = new WebSocketServer(transportOptions)
            wsServer.on('request', function(request) {
                try {
                    requestHandler({
                        rawRequest: request,
                        //resource: request.resource,
                        // remoteAddress: request.remoteAddress,
                        // origin: request.origin,

                        accept: function() {
                            // a websocket connection: https://github.com/theturtle32/WebSocket-Node/wiki/Documentation
                            var connection = request.accept(transportOptions.wsProtocol, request.origin)
                            return connection
                        },

                        // xWebSocketRejectReason is a message to send back to the client in the form of an "X-WebSocket-Reject-Reason" header
                        reject: function() {
                            var httpStatus = 404, xWebSocketRejectReason="Websocket connection was rejected by the application."
                            request.reject(httpStatus, xWebSocketRejectReason)
                        }
                    })
                } catch(e) {
                    if(errorHandler) {
                        errorHandler(e)
                    }
                }
            })

            // setTimeout(function() { // ensure asynchronicity
                transportOptions.httpServer.listen(port)
            // })

            var onCloseHandler, errorHandler;
            return {
                close: function() {
                    wsServer.shutDown()
                    transportOptions.httpServer.close()
                    if(onCloseHandler) onCloseHandler()
                },
                onListening: function(cb) {
                    transportOptions.httpServer.on('listening', cb)
                },
                onClose: function(cb) {
                    onCloseHandler = cb
                },
                onError: function(cb) {
                    errorHandler = cb
                    transportOptions.httpServer.on('error', cb)
                }
            }
        },

        connection: function(object) {
            if(object instanceof WebSocketClient) { // client
                return ClientConnectionObject(object)
            } else { // server
                return ServerConnectionObject(object)
            }
        }
    }
}



var ClientConnectionObject = function(client) {

    var wsConnection, onCloseHandler, onMessageHandler, onErrorHandler;
    client.on('connect', function(connection) {
        wsConnection = connection
    })
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

        onErrorHandler(e)
        onCloseHandler() // this should have been setup at this point
    })

    return {
        send: function(m) {
            wsConnection.send(m)
        },
        close: function() {
            wsConnection.close()
        },
        onOpen: function(cb) {
            client.on('connect', function(connection) {
                attachCloseHandler(connection, onCloseHandler)
                attachMessageHandler(connection, onMessageHandler)
                attachErrorHandler(connection, onErrorHandler)

                cb()
            })
        },
        onClose: function(cb) {
            onCloseHandler = cb
        },
        onMessage: function(cb) {
            onMessageHandler = cb
        },
        onError: function(cb) {
            onErrorHandler = cb
        }
    }
}


var ServerConnectionObject = function(wsConnection) {
    return {
        send: function(m) {
            wsConnection.send(m)
        },
        close: function() {
            wsConnection.close()
        },
        onOpen: function(cb) {
            setTimeout(function() {
                cb() // connection is already open
            })
        },
        onClose: function(cb) {
            attachCloseHandler(wsConnection, cb)
        },
        onMessage: function(cb) {
            attachMessageHandler(wsConnection, cb)
        },
        onError: function(cb) {
            attachErrorHandler(wsConnection, cb)
        }
    }
}

function attachCloseHandler(wsConnection, onCloseHandler) {
    if(onCloseHandler) {
        wsConnection.on('close', function(reasonCode, description) {
            onCloseHandler()
        })
    }
}
function attachMessageHandler(wsConnection, onMessageHandler) {
    if(onMessageHandler) {
        wsConnection.on('message', function(data) {
            if(data.type === 'utf8') {
                onMessageHandler(data.utf8Data)
            } else if(data.type === 'binary') {
                onMessageHandler(data.binaryData)
            } else {
                throw Error('Unknown type: '+data.type)
            }
        })
    }
}
function attachErrorHandler(wsConnection, onErrorHandler) {
    if(onErrorHandler) {
        wsConnection.on('error', function(e) {
            if(e instanceof Event) {
                var error = new Error('Websocket error event (probably means the connection couldn\'t be made or has been closed)')
                error.event = e
                onErrorHandler(error)
            } else {
                onErrorHandler(e)
            }
        })
    }
}