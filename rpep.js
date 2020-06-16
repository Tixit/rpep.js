var EventEmitter = require('eventemitter2')
var proto = require("proto")

var utils = require("./utils")
var DuplexEventEmitter = require('./DuplexEventEmitter')

// enums
var receive = 0
var respond = 1
var stream = 2

var defaultMaxId = 9007199254740992 // 2^53]
var reservedFireCommands = {close:1,idDiscontinuity:1}
var reservedRequestAndStreamCommands = {close:1,idDiscontinuity:1}
var reservedRequestAndStreamErrorCommand = {error:1}
var reservedListeningCommands = {close:1}
var reservedRespondAndStreamListenCommands = {idDiscontinuity:1}
var reservedEventListeningEvents = {order:1}
var reservedStreamEmissionEvents = {orderNumberDiscontinuity:1}


var buffer = 50 // some buffer for message header stuff

var PeerError = proto(Error, function() {
    this.name = "PeerError"
})

// An instance of RpepCore can emit the following events:
    // 'close' - Fired once the listening server has been closed
    // 'error' - Fired if there was an error related to listening
module.exports = proto(EventEmitter, function() {

    // static properties

    // an error that, when thrown, sends the error as an error response to the other Peer (including iterable properties, but not including the stack)
    this.PeerError = PeerError

    // instance properties

    // transport is an object with the following methods:
        // connect(/*transport connect parameters... */, rpepOptions) - connects to a websocket server
            // transport connect parameters... - A variable number of transport connect parameters passed into rpepPeer.connect
            // rpepOptions - An object containing the maxSendSize and maxReceiveSize options
            // returns a connection object
               // with the following methods:
                // send(message)
                // close() - Closes the connection in a way that actively informs the other Peer about closure.
                // drop() - (Optional) Closes the connection without informing the other Peer.
               // and the following event-handler functions (which will only be called once):
                // onOpen(callback)
                // onClose(callback) - (Optional) If an error happens that causes connection closure, this should still be fired, or the connection will be assumed to still be open. If not given, a "close" fire-and-forget message will be sent before connection closure if the Peer is a server, and that "close" message will be listened for if its a client Peer.
                // onMessage(callback)
                // onError(callback)
        // listen(/*transport listen parameters... */, rpepOptions, callback) - (Optional) Listens for connectiosn and calls `callback` when a connection comes through.
            // transport listen parameters... - A variable number of transport listen parameters passed into rpepPeer.listen
            // Parameters:
                // rpepOptions - An object containing the maxSendSize and maxReceiveSize options
                // callback(request) - Called when a connection request comes through.
                    // `request` has the methods:
                        // accept() - Returns a connection object (with the same API as the object that `connect` returns).
                        // reject()
                    // and the following property:
                        // rawRequest - The raw request from the transport
            // returns an object
               // with the following method:
                // close() - closes the listening server
               // and the following event-handler functions (which will only be called once):
                // onListening(callback) - Called when the server starts listening
                // onClose(callback) - Called when the server stops listening
                // onError(callback) - Called if listening couldn't be started
        // connection(connectionArgument) - Returns a connection object
            // connectionArgument - The value returned from `connect` above or from the `accept` function in a `listen` callback
    // serialization is an object with the following methods:
        // serialize(javascriptObject) - Returns the javascript object in serialized form (something the transport can process, most likely a string or Buffer)
        // deserialize(serializedObject) - Returns a javascript object reprented by the serializedObject
    // options:
        // maxSendSize - The maximum byte-length a sent message can be (Default: no limit)
        // maxReceiveSize - The maximum byte-length a received message can be (Default: no limit)
        // maxId - (Default: 2^53) The maximum id to use for request and stream commands, as well as stream order id numbers
        // closeTimeout - (Default: 30,000 ms) The number of milliseconds to wait for outstanding requests and streams to complete before closing the connection. If the timeout is reached, an 'error'
        // sendCommandErrorInfo - (Default:true)
            // If true,
                // errors will automatically be sent to the other Peer if their command is unparsable, and
                // the first part of the command will be sent with an "invalidMessage" error
            // Otherwise, the error will be ignored (but handleable via rawHandle or preHandle, depending on the case).
    this.init = function(transport, serialization, options) {
        EventEmitter.call(this) // superclass constructor

        if(!options) options = {}

        this.transport = transport
        this.serialization = serialization
        this.options = options
        if(this.options.maxId === undefined) this.options.maxId = defaultMaxId

        this.commands = {}
        // this.defaultHandler
        // this.preHandler
        // this.rawHandler

        // this.listener
    }

    // returns a future open connection
    // takes in any number of transport specific connection arguments
    this.connect = function() {
        var args = Array.prototype.slice.call(arguments)

        var that = this
        return new Promise(function(resolve, reject) {
            var connection = that.transport.connect.apply(that.transport.connect, args.concat([that.options]))

            var onOpenCalled = false, errors = []
            connection.onOpen(function() {
                onOpenCalled = true
                resolve(rpepConn)
            })

            var rpepConn = RpepConnection(that, connection, {isServer:false, onClose: function() {
                if(!onOpenCalled) {
                    var message = "Connection couldn't be opened"
                    if(errors.length > 0) {
                        message+=': \n'+errors.join('\n')
                    }

                    var e = new Error(message)
                    e.errors = errors
                    reject(e)
                }
            }})

            connection.onError(function(e) {
                errors.push(e)
            })
        })
    }

    // returns a future that resolves successfully when the server has begun listening and resolves to an error if listening couldn't be started
    this.listen = function(/*variable number of listen parameters, requestHandler*/) {
        var args = Array.prototype.slice.call(arguments)
        var requestHandler = args[args.length-1]
        var transportListenArguments = args.slice(0,-1)

        var that = this
        return new Promise(function(resolve, reject) {
            if(that.listener !== undefined) {
                throw new Error("Rpep object already listening!")
            }

            that.listener = that.transport.listen.apply(that.transport, transportListenArguments.concat([that.options, function(request) {
                requestHandler({
                    accept: function() {
                        var connection = request.accept.apply(that,arguments)
                        return RpepConnection(that, connection, {isServer:true})
                    },
                    reject: function() {
                        request.reject.apply(that, arguments)
                    },
                    rawRequest: request
                })
            }]))

            var listening = false
            that.listener.onListening(function() {
                listening = true
                resolve()
            })
            that.listener.onError(function(e) {
                that.emit('error',e)
            })
            that.listener.onClose(function(e) {
                that.listener = undefined
                that.emit('close')
                if(listening === false)
                    reject()
            })
        })
    }

    // closes a listening websocket server
    // no-op if the server is already closed
    this.close = function() {
        if(this.listener)
            this.listener.close()
    }

    // sets up a handler to receive a fireAndForget call
    this.receive = function(command, handler) {
        addCommand(this, receive, command, handler)
    }

    // sets up a handler to handle request-response calls
    // the handler can either return
        // A (possibly future) value, which will be sent as a response. Or,
        // A (possibly future) Error object. The 'message' will be sent as the `error`, and any other iterable properties of the object will be added as the `data`.
    this.respond = function(command, handler) {
        addCommand(this, respond, command, handler)
    }

    // sets up a handler to handle event-steam calls
    this.stream = function(command, handler) {
        if(!(handler instanceof Function)) {
            throw new Error("rpep.stream requires a callback as the second argument")
        }
        addCommand(this, stream, command, handler)
    }

    // Sets a default command handler
    this.default = function(handler) {
        if(this.defaultHandler !== undefined)
            throw handlerError('default handler')

        this.defaultHandler = handler
    }

    // Sets up a function that is run before every command
    // If "ignore" is returned from `handler`, the corresponding receive, respond, stream, or default handler will not be called
    this.preHandle = function(handler) {
        if(this.preHandler !== undefined)
            throw handlerError('preHandle')

        this.preHandler = handler
    }

    // Sets up a function that is run before the command is even parsed
    // If "ignore" is returned from `handler`, preHandle and the corresponding receive, respond, stream, or default handler will not be called
    this.rawHandle = function(handler) {
        if(this.rawHandler !== undefined)
            throw handlerError('rawHandle')

        this.rawHandler = handler
    }

    // private

    // type should either be `receive`, `respond`, or `stream`
    function addCommand(that, type, command, handler) {
        if(that.commands[command] !== undefined)
            throw handlerError('handler for "'+command+'"')
        if(command in reservedListeningCommands)
            throw new Error("Can't setup a handler for the command '"+command+"', because it's reserved for internal use.")
        if((type === respond || type === stream) && command in reservedRespondAndStreamListenCommands)
            throw new Error("Can't setup a receive or stream handler for the command '"+command+"', because it's reserved for as a receive command. If you'd like to listen for this command, use `receive`.")

        that.commands[command] = {type: type, handler: handler}
    }

    function handlerError(handlerName) {
        return new Error('A '+handlerName+' already exists! You can only have one handler per command.')
    }
})

// An instance of RpepConnection can emit the following events:
    // close() - Fired once the connection has been closed
    // openMessage() - Fired when an 'open' message is received. For internal use only.
    // closeMessage() - Fired when a 'close' message is received. For internal use only.
    // error(e) - An error event is emitted from the connection in the following cases:
        // When the transport calls its onError callback
        // When an error is thrown from a stream or receive handler
        // When an error that isn't a PeerError is thrown from a respond handler
        // If an unexpected internal exception is thrown when handling a message
        // If the closeTimeout is reached and there are still open requests or streams. This error will contain info about what requests and streams are still open.
var RpepConnection = proto(EventEmitter, function() {

    // connectionOptions
        // isServer - Should be true if the connection is being creatd by a server, false otherwise
        // onClose - A function that will be called in the onClose event before the 'close' event is emitted
    this.init = function(rpepCoreObject, connectionObject, connectionOptions) {
        EventEmitter.call(this) // superclass constructor

        this.transport = rpepCoreObject.transport
        this.serialization = rpepCoreObject.serialization
        this.commands = rpepCoreObject.commands

        this.defaultHandler = rpepCoreObject.defaultHandler
        this.preHandler = rpepCoreObject.preHandler
        this.rawHandler = rpepCoreObject.rawHandler

        this.maxSendSize = rpepCoreObject.options.maxSendSize
        this.maxReceiveSize = rpepCoreObject.options.maxReceiveSize
        this.sendCommandErrorInfo = rpepCoreObject.options.sendCommandErrorInfo
        this.maxId = rpepCoreObject.options.maxId
        this.closeTimeout = rpepCoreObject.options.closeTimeout || 30000
        this.server = connectionOptions.isServer

        this.connection = connectionObject
        this.connected = true
        this.closing = false
        this.sessionData = {}
        this.commandState = {}

        Object.defineProperty(this, 'rawConnection', { get: function() {
            return this.connection.rawConnection
        }})
        
        if(this.server)
            this.nextId = 0
        else
            this.nextId = 1

        var that = this

        if(this.connection.onClose) {
            this.connection.onClose(function() {
                if(connectionOptions.onClose)
                    connectionOptions.onClose()

                that.connected = false
                that.emit('close')
            })
        } else {
            this.on('closeMessage', function() {
                that.connected = false
                that.emit('close')
            })
        }

        this.connection.onMessage(function(rawMessage) {
            handle(that, rawMessage)
        })
        this.connection.onError(function(e) {
            that.emit('error', e)
        })
    }

    // closes the connection
    this.close = function() {
        var that = this
        
        if(this.connected) {
            this.closing = true
            if(Object.keys(this.commandState).length === 0) {
                closeInternal(this)
            } else {
                this.closeTimeoutHandle = setTimeout(function() {
                    that.closeTimeoutHandle = undefined
                    closeInternal(that)
                },this.closeTimeout)
            }
        }
    }
    // drops the connection without informing the other Peer if supported, otherwise with informing the other Peer
    this.drop = function() {
        if(this.connected && this.connection.drop) {
            this.connection.drop()
        } else {
            this.close()
        }
    }

    // fire and forget message
    // If `command` is "error", the data must be an object that contains a message property (eg an Error object). Any other iterable properties will be added as data.
    this.fire = function(command/*, data...*/) {
        if(command === 'error') {
            if(arguments[1].message === undefined)
                throw new Error("The data for an 'error' fire-and-forget message must have a 'message' property (eg an Error object has a message property)")
            else if(arguments.length !== 2)
                throw new Error("An 'error' fire-and-forget message can only take one argument - the error.")
        }

        if(command in reservedFireCommands) {
            throw new Error("Can't fire an '"+command+"' event directly; '"+command+"' is a global command reserved for internal use.")
        }

        var message = [command]
        if(command === 'error') {
            var error = arguments[1]
            var errorData = {}
            for(var k in error) {
                if(k !== 'message')
                    errorData[k] = error[k]
            }

            message.push(error.message, errorData)
        } else {
            addData(message, arguments)
        }

        send(this, message)
    }

    // request response
    this.request = function(command/*, data...*/) {
        if(command in reservedRequestAndStreamCommands)
            throw new Error("Can't do a '"+command+"' request directly; '"+command+"' is a global command reserved for internal use.")
        if(command in reservedRequestAndStreamErrorCommand)
            throw new Error("Can't do an 'error' request; 'error' is reserved for global fire-and-forget errors.")
        if(this.commandState[this.nextId] !== undefined)
            throw new Error('There is already a callback for id: '+this.nextId)

        var message = [command, this.nextId]
        addData(message, arguments)

        send(this, message)

        var theResolver = utils.resolver()
        theResolver.command = command
        this.commandState[this.nextId] = theResolver

        incrementId(this)

        return theResolver.f
    }

    // full-duplex event stream
    this.streamConnect = function(command/*, data...*/) {
        if(command in reservedRequestAndStreamCommands)
            throw new Error("Can't open a '"+command+"' stream directly; '"+command+"' is a global command reserved for internal use.")
        if(command in reservedRequestAndStreamErrorCommand)
            throw new Error("Can't open an 'error' stream; 'error' is reserved for global fire-and-forget errors.")
        if(this.commandState[this.nextId] !== undefined)
            throw new Error('There is already a callback for id: '+this.nextId)

        var message = [command, this.nextId]
        addData(message, arguments)

        var emitter = this.commandState[this.nextId] = createStreamEmiter(this, this.nextId)
        emitter.command = command
        send(this, message)

        incrementId(this)

        return emitter
    }

    // private

    function serialize(that,data) {
        return that.serialization.serialize(data)
    }
    function deserialize(that,serializedData) {
        return that.serialization.deserialize(serializedData)
    }

    function closeInternal(that) {
        if(that.closeTimeoutHandle !== undefined) {
            clearTimeout(that.closeTimeoutHandle)
        }

        var ids = Object.keys(that.commandState)
        if(ids.length > 0) {
            var errorMessage = "Connection has been closed after a "+that.closeTimeout+"ms timeout and some pending requests and streams remain unfulfilled. "+
                                "The following requests and streams were still active up until the timeout:\n"
            
            var activeCommandStates = []
            for(var k in that.commandState) {
                var info = that.commandState[k]
                if(info instanceof RpepDuplexEventEmitter) { // stream
                    if(info.endMessageSent) {
                        activeCommandStates.push("* Stream "+k+" '"+info.command+"' waiting for other side to 'end'")
                    } else if(info.endMessageReceived) {
                        activeCommandStates.push("* Stream "+k+" '"+info.command+"' has received 'end' but hasn't sent 'end'")
                    } else {
                        activeCommandStates.push("* Stream "+k+" '"+info.command+"' is still active")
                    }
                } else if(info.f !== undefined) { // request
                    activeCommandStates.push("* Request "+k+" to '"+info.command+"'")
                } else { // response
                    activeCommandStates.push("* Response "+k+" for '"+info.command+"'")
                }
            }

            errorMessage+=activeCommandStates.join('\n')
            var e = new Error(errorMessage)
            e.ids = ids

            that.commandState = {} // clear command state so anything that comes through will error - todo: should we just leave it be tho?

            that.emit('error', e)
        }

        if(that.connection.onClose === undefined) {
            send(that, ['close'])
        }

        that.connection.close()
        that.connection = undefined
    }
    // checks if the connection is closing and if it is and it's a clean close, close it out
    function checkCleanClose(that) {
        if(that.closing && Object.keys(that.commandState).length === 0) {
            closeInternal(that)
        }
    }

    // may send an idDiscontinuity message
    function incrementId(that) {
        var prevId = that.nextId
        do {
            that.nextId += 2
            if(that.nextId > that.maxId) {
                that.nextId = that.nextId%2 // reset to 0 or 1
            }
        } while(that.nextId in that.commandState && prevId !== that.nextId)

        if(prevId === that.nextId)
            throw new Error("No valid rpep IDs left to use.")
        if(that.nextId !== prevId+2)
            send(that, ['idDiscontinuity', [prevId,that.nextId]])
    }

    function addData(message, theArguments) {
        var data = Array.prototype.slice.call(theArguments, 1)
        if(data.length === 1)
            message.push(data[0])
        else if(data.length > 1)
            message.push(data)
    }

    // returns the argument if its array, or wraps it in an array if not
    function getArrayData(data) {
        if(data === undefined)
            return []
        else if(data instanceof Array)
            return data
        else
            return [data]
    }

    // may send an disctontinuity message
    function incrementOrderNumber(that, emitter) {
        emitter.nextOrderNumber += 1
        if(emitter.nextOrderNumber > that.maxId) {
            var prevNumber = emitter.nextOrderNumber-1
            emitter.nextOrderNumber = 0
            sendEvent(that, emitter,  emitter.id, 'orderNumberDiscontinuity', ['', prevNumber, emitter.nextOrderNumber])
        }
    }

    // error is expected to be an exception object (with a message property at least)
    function createErrorInfo(error) {
        var data = {}, any = false
        for(var k in error) {
            if(k !== 'message') {
                data[k] = error[k]
                any = true
            }
        }

        var errorInfo = [error.message]
        if(any) {
            errorInfo.push(data)
        }

        return errorInfo
    }

    function createErrorFromMessage(errorMessage, errorData) {
        var e = new Error(errorMessage)
        for(var k in errorData) {
            if(k !== 'message')
                e[k] = errorData[k]
        }

        return e
    }

    function createStreamEmiter(that, id) {
        var emitter = RpepDuplexEventEmitter(function onEmit(event/*, data*/) {
            if(emitter.endMessageSent)
                throw new Error("Stream 'end' event has been sent, can't send more events.")
            if(event in reservedStreamEmissionEvents)
                throw new Error("Can't emit the '"+event+"' event directly; '"+event+"' is reserved for internal use.")
            if(event === 'error') {
                if(arguments[1].message === undefined)
                    throw new Error("The data for an 'error' event must have a 'message' property (eg an Error object has a message property)")
                else if(arguments.length !== 2)
                    throw new Error("An 'error' event can only take one argument - the error.")
            }

            sendEvent(that, emitter, id, event, arguments)
        })

        emitter.id = id
        emitter.orderingData = false
        emitter.nextOrderNumber = 0
        emitter.endMessageSent = false
        return emitter
    }

    // raw send
    function send(that, message) {
        var serializedMessage = serialize(that, message)
        if(that.maxSendSize !== undefined && serializedMessage.length > that.maxSendSize) {
            var e = new Error('maxMessageSizeExceeded')
            e.messageSize = serializedMessage.length
            throw e
        }

        if(that.connected) {
            that.connection.send(serializedMessage)
        } else {
            throw Error('Connection is closed')
        }
    }

    // args will contain [event, data...]
    function sendEvent(that, emitter, id, event, args) {
        var message = [id]
        if(emitter.orderingData)
            message.push(emitter.nextOrderNumber)

        message.push(event)

        if(event === 'error')
            message.push(createErrorInfo(args[1]))
        else
            addData(message, args)

        send(that, message)

        if(event === 'end') {
            emitter.endMessageSent = true
            if(emitter.endMessageReceived) {
                delete that.commandState[id] // ensures that "rpepIdNotFound" will be returned if this stream continues to be communicated on
                checkCleanClose(that)
            }
        } else if(emitter.orderingData) {
            incrementOrderNumber(that, emitter)
        }
    }

    function handle(that, rawMessage) {
        try {
            if(that.rawHandler) {
                if(that.rawHandler.call(that, rawMessage) === 'ignore') {
                    return
                }
            }

            try {
                var message = deserialize(that, rawMessage)
            } catch(e) {
                if(that.sendCommandErrorInfo) {
                    try {
                        that.fire("error", {message: "unparsableCommand", rawMessage: rawMessage})
                    } catch(e) {
                        if(e.message === 'maxMessageSizeExceeded')
                            that.fire("error", {message: "unparsableCommand", rawMessage: rawMessage.slice(0,200)})
                        else throw e
                    }
                }

                return
            }

            if(that.preHandler) {
                if(that.preHandler.call(that, message) === 'ignore') {
                    return
                }
            }

            var type0 = typeof(message[0])
            if(type0 === 'string') {
                // open and close fire-and-forget connection establishment message
                if(message.length === 1 && message[0] === 'close') {
                    that.emit("closeMessage")
                    return
                }

                var commandInfo = that.commands[message[0]]
                if(commandInfo === undefined) {
                    if(that.defaultHandler !== undefined) {
                        that.defaultHandler.call(that,message)
                        return
                    }
                    if(message[0] === 'error')
                        throw createErrorFromMessage(message[1], message[2])
                    if(message[0] !== 'idDiscontinuity') 
                        that.fire('error', {message: "noSuchCommand", command: message[0]})

                    return
                }

                if(commandInfo.type === receive) {
                    if(message[0] === 'error')
                        var data = [createErrorFromMessage(message[1], message[2])]
                    else
                        var data = getArrayData(message[1])

                    commandInfo.handler.apply(that, data)
                } else if(commandInfo.type === respond) {
                    var id = message[1]
                    if(!validateId(that, id)) {
                        return
                    }

                    that.commandState[id] = {command: message[0]}
                    Promise.resolve().then(function() {
                        return commandInfo.handler.apply(that, getArrayData(message[2]).concat([id]))
                    }).then(function(result) {
                        delete that.commandState[id]
                        send(that, [id,result])
                    }).catch(function(e) {
                        delete that.commandState[id]
                        if(e instanceof PeerError) {
                            var errorInfo = createErrorInfo(e)
                        } else {
                            var errorInfo = ['unexpectedPeerError', {}]
                            that.emit('error', e)
                        }

                        send(that, [id].concat(errorInfo))
                    })
                } else if(commandInfo.type === stream) {
                    var id = message[1]
                    if(!validateId(that, id)) {
                        return
                    }
                    
                    var emitter = that.commandState[id] = createStreamEmiter(that,id)
                    emitter.command = message[0]

                    try {
                        commandInfo.handler.apply(that, [emitter].concat(getArrayData(message[2])).concat([id]))
                    } catch(e) {
                        that.emit('error', e) // note that PeerError objects are treated like normal Errors here - to emit an error, you must emit an 'error' event from the passed emitter
                    }
                } else {
                    throw new Error("Invalid command type: "+commandInfo.type)
                }

            } else if(type0 === 'number') {
                if(!(message[0] in that.commandState)) {
                    that.fire("error", {message: "rpepIdNotFound", id: message[0]})
                    return
                }

                var info = that.commandState[message[0]]
                if(info instanceof RpepDuplexEventEmitter) { //stream
                    var emitter = info
                    if(typeof(message[1]) === 'string') {          // message without order number
                        var event = message[1], eventData = message[2]
                    } else if(typeof(message[2]) === 'string') {   // message with order number
                        var orderNumber = message[1], event = message[2], eventData = message[3]
                    } else {
                        throw new Error("Received invalid stream message: couldn't find string event name at position 1 or 2 in the message")
                    }

                    if(event === 'order') {
                        emitter.orderingData = eventData === true
                    } else {
                        if(event === 'error') {
                            var error = createErrorFromMessage(eventData[0], eventData[1])
                            emitter._external.emit('error', error, orderNumber)
                        } else {
                            var emitArgs = [event]
                            if(eventData !== undefined) emitArgs = emitArgs.concat(eventData)
                            if(orderNumber !== undefined) emitArgs.push(orderNumber)
                            emitter._external.emit.apply(emitter._external, emitArgs)

                            if(event === 'end') {
                                emitter.endMessageReceived = true
                                if(emitter.endMessageSent) {
                                    delete that.commandState[message[0]] // ensures that "rpepIdNotFound" will be returned if this stream continues to be communicated on
                                    checkCleanClose(that)
                                }
                            }
                        }
                    }
                } else if(info.f !== undefined) { // response
                    var theResolver = info
                    if(message.length === 3) { // error response
                        theResolver.reject(createErrorFromMessage(message[1], message[2]))
                    } else { // normal response
                        theResolver.resolve(message[1])
                    }

                    delete that.commandState[message[0]]
                    checkCleanClose(that)
                } else {
                    throw new Error("Shouldn't get here "+JSON.stringify(info))
                }
            } else {
                if(that.sendCommandErrorInfo) {
                    that.fire("error", {message: "invalidMessage", rawMessage: rawMessage.slice(0,200)})
                } else {
                    that.fire("error", {message: "invalidMessage"})
                }
            }
        } catch(e) {
            that.emit('error', e)
        }
    }
})

// sends an rpepInvalidId error fire-and-forget message if the id isn't valid
// returns true if the id is valid, false otherwise
function validateId(that, id) {
    if(id > that.maxId) {
        var reason = "Id greater than "
        if(that.maxId === defaultMaxId) reason += "2^53"
        else                            reason += that.maxId
    } else if(that.server) {
        if(id%2 !== 1) {
            var reason = "Id from client not odd"
        }
    } else if(id%2 !== 0) {
        var reason = "Id from server not even"
    }

    if(reason !== undefined) {
        that.fire("error", {message: 'rpepInvalidId', reason: reason})
        return false
    } else {
        return true
    }
}


var RpepDuplexEventEmitter = proto(DuplexEventEmitter, function(superclass) {
    this.on = function(event,handler) {
        if(event in reservedEventListeningEvents)
            throw new Error("Can't listen on the '"+event+"' event directly; the '"+event+"' event is reserved for internal use.")

        superclass.on.call(this, event,handler)
    }

    this.onAny = function(callback) {
        superclass.onAny.call(this, function(eventName) {
            if(!(eventName in reservedEventListeningEvents)) {
                callback.apply(this, arguments)
            }
        }.bind(this))
    }
})