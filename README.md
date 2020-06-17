
`rpep.js`
=====

This is a javascript implementation of the [Remote Procedure and Event Protocol (RPEP)](https://github.com/Tixit/RPEP) for node.js and the browser. RPEP is a simple, light-weight protocol for request-response and stream-event style communication between peers.

Example
=======

```javascript
var rpep = require("rpep")
var websockets = require("rpep-websockets/ws.node") // For node.js
var msgpack = require("rpep-msgpack")

// server

var server = rpep(websockets, msgpack)
server.respond('x', function(request) {
    return request+1
})
server.stream('y', function(emitter) {
    emitter.emit('hi')
    emitter.on('end', function() {
        emitter.emit("end") // end the stream (but not the connection)
        this.close()        // close the connection
    }.bind(this))
})

server.listen(80, function(request) {
    var conn = request.accept()
})

// client (usually on a different machine ; )

var client = rpep(websockets(), msgpack)
r.connect('yourhost.me', 80).then(function(conn) {
    conn.request('x', 5).then(function(result) {
        console.log(result) // result will be 6
    })
    conn.streamConnect('y').then(function(emitter) {
        emitter.on('hi', function() {
            emitter.emit('hello')
            emitter.emit('end')
        })
    })
})
```

Install
=======

```
yarn add rpep
```

Usage
=====

Accessing rpep:
```javascript
// node.js
var rpep = require('rpep')

// amd
require.config({paths: {'rpep': '../dist/rpep.umd.js'}})
require(['rpep'], function(rpep) { /* your code */ })

// global variable
<script src="rpep.umd.js"></script>
rpep; // rpep.umd.js can define rpep globally if you really
      //   want to shun module-based design
```

Using rpep:

**`var peer = rpep(transport, serialization, rpepOptions)`** - Creates a new rpep Peer.
* `transport` - An rpep transport object (described below in the *Transports* section)
* `serialization` - An rpep serialization object (described below in the *Serializations* section)
* `rpepOptions` - *(Default: `{}`)* An object with the following properties
  * `maxSendSize` - *(Default: no limit)* The maximum byte-length a sent message can be. 
  * `maxReceiveSize` - *(Default: no limit)* The maximum byte-length a received message can be.
  * `maxId` - *(Default: `2^53`)* The maximum ID to use for request and stream commands, as well as stream order IDs.
  * `closeTimeout` - *(Default: `30,000 ms`)* The number of milliseconds to wait for outstanding requests and streams to complete before closing the connection. If the timeout is reached, an 'error' is emitted containing information about what requests and streams were still pending.
  * `sendCommandErrorInfo` - *(Default:`true`)* If `true`, errors will automatically be sent to the other Peer if their command is unparsable, and the first part of the command will be sent with an "invalidMessage" error. If `false`, the error will be ignored (but handleable via `rawHandle` or `preHandle`, depending on the case).

**`rpep.PeerError`** - A custom `Error` object that can be thrown from a `respond` handler in order to create an error response (which should throw an error for the peer making the request).

**`peer.connect(arguments...)`** - Connects to a Peer. Returns a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to an **Rpep Connection Object** if it successfully connects, or resolves to an error if it couldn't connect. The `arguments` are transport-specific.

**`peer.listen(arguments..., requestHandler)`** - Listens for connections. Returns a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves successfully when it begins listening, or resolves to an error if it couldn't begin listening. 
* The `arguments...` (other than the last one) are transport-specific.
* `requestHandler(request)` - A function called when a connection request comes through. The `request` can be `accept`ed to complete the connection, or `reject`ed to reject the connection. See the **Rpep Request Object** section for details about `request`.

**`peer.close()`** - Closes the listener. If the server is already closed, this is a no-op.

**`peer.receive(command, handler)`** - Creates a fire-and-forget receive `handler` for the given `command`.
* `command` - A string command name.
* `handler(arguments...)` - The function called when a fire-and-forget message is received. The call will have a number of `arguments` depending on how many the message contains. 

**`peer.respond(command, handler)`** - Creates a request-response `handler` for the given `command`.
* `command` - A string command name.
* `handler(arguments..., ID)` - The function called when a request-response message is received. If a normal value is returned from the handler, that value will be returned as the result to the other Peer. If an `rpep.PeerError` is thrown from the handler, an error will be returned as an error-result to the other Peer. A [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) can also be returned that can be resolved to a normal value or `rpep.PeerError` and those are handled the same way. If an exception that isn't a `PeerError` is thrown from the handler, the request will be responded to with an `"unexpectedPeerError"` error response.
   * `arguments...` - The call will have a number of `arguments` depending on how many the message contains. 
   * `ID` - The last parameter will contain the `ID` number of the message.

**`peer.stream(command, handler)`** - Creates a full-duplex stream `handler` for the given `command`.
* `command` - A string command name.
* `handler(stream, arguments..., ID)` - The function called when a stream initialization message is received. 
   * `stream` - A `DuplexEventEmitter` object used to send and receive events. See the **`DuplexEventEmitter`** section for more information.
   * `arguments...` - The call will have a number of `arguments` depending on how many the message contains. 
   * `ID` - The last parameter will contain the `ID` number of the message.

**`peer.default(handler)`** - Creates a `handler` that is called if a well-formed command is received but there isn't a `receive`, `respond`, or `stream` handler set up for that command.
* `handler(message)` - The callback. The `message` is a parsed rpep message (see [the RPEP protocol](https://github.com/Tixit/RPEP) for defails)

**`peer.preHandle(handler)`** - Creates a `handler` that is called before any `receive`, `respond`, `stream`, or `default` handler is called.
* `handler(message)` - The callback. The `message` is a parsed rpep message (see [the RPEP protocol](https://github.com/Tixit/RPEP) for defails). If the handler returns "ignore" the message will not trigger any `receive`, `respond`, `stream`, or `default` handler.

**`peer.rawHandle(handler)`** - Creates a `handler` that is called before the message is parsed by the `serialization` (which happens before `preHandle`).
* `handler(rawMessage)` - The callback. The `rawMessage` is a unparsed rpep message in whatever format the configured `serialization` dictates. If the handler returns "ignore" the message will not trigger any `receive`, `respond`, `stream`, `default`, or `preHandle` handler.

#### Rpep Connection Object

An **Rpep Connection Object** is an [EventEmitter2 object](https://github.com/asyncly/EventEmitter2) that can emit events as well as call connection methods.

*Connection Object Properties and Methods:*

**`connectionObject.fire(command, arguments...)`** - Sends a fire-and-forget command.
* `command` - The string command name. 
* `arguments...` - A variable number of command arguments. If the command is `error`, there must only be one argument that is an object containing a `message` property (eg an `Error` object) and any other iterable properties will be added as error data properties.

**`connectionObject.request(command, arguments...)`** - Sends an RPC-style request. Returns a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to the result of the request (either a value or an error).
* `command` - The string command name. 
* `arguments...` - A variable number of request arguments. 

**`connectionObject.streamConnect(command, arguments...)`** - Sends a command initializing a stream. Returns a **`DuplexEventEmitter`** event stream that is used to send and receive events.
* `command` - The string command name. 
* `arguments...` - A variable number of stream initialization arguments. 

**`connectionObject.close()`** - Closes the connection.  
**`connectionObject.drop()`** - Closes the connection without informing the other Peer. If the transport doesn't support this, this does the same thing as `close`.  

**`connectionObject.connection`** - The transport connection returned by `transport.connection(..)`. This could be used to send raw RPEP messages.  
**`connectionObject.rawConnection`** - The raw connection the transport wraps. This allows access to transport-specific connection properties. 

*Rpep Connection Object Events:*

**`close`** - Emitted when the connection has been closed.  
**`error(e)`** - An error event is emitted from the connection in the following cases:
* When the transport connection calls its onError callback (ie when the transport says a connection error happened)
* When an error is thrown from a stream or receive handler
* When an error that isn't an `rpep.PeerError` is thrown from a respond handler
* If an unexpected internal exception is thrown when handling a message
* If the closeTimeout is reached and there are still open requests or streams. This error will contain info about what requests and streams are still open.

#### Rpep Request Object

An rpep request object is passed to the `listen` `requestHandler` callback. It is used to either accept or reject the connection. It has the following methods and properties:

**`request.accept(arguments...)`** - Accepts the connection and returns an **Rpep Connection Object**.
**`request.reject(arguments...)`** - Accepts the connection and returns an **Rpep Connection Object**.
* `arguments...` - Both methods take any number of transport-specific arguments.

**`request.rawRequest`** - The raw request from the transport.

#### `DuplexEventEmitter`

A `DuplexEventEmitter` is a special event emitter used to both listen for events from a stream and send events across the stream. Note that `"error"` and `"end"` events have special meanings (see [the RPEP protocol](https://github.com/Tixit/RPEP) for details)

`DuplexEventEmitter` is intended to look and act like an [EventEmitter2 object](https://github.com/asyncly/EventEmitter2) object, and so has the following methosd and properties:

**`stream.emit(event, arguments...)`** - Emits an event to the other Peer. 
* `event` - The string event name.
* `arguments...` - A variable number of event arguments.

**`stream.on(event, handler)`** - Listens for a particular `event` from the other Peer.
* `handler(eventArguments...)` - A callback that's called when an event is received on this stream.

**`stream.onAny(handler)`** - Listens for any event from the other Peer.
* `handler(event, eventArguments...)` - A callback that's called when an `event` is received on this stream.

**`stream.off(event, handler)`** - Removes a handler for a particular event.  
**`stream.offAny(handler)`** - Removes an `offAny` handler.  

## Serializations

A serialization is an object describing how to serialize and deserialize messages from the connection. Serializations must be paired with a transport who's messages are in formats the serialization knows how to deserialize. The object should have the following methods:

**`serialization.serialize(javascriptObject)`** - Serializes the javascript object and returns the result (something the transport can process, most likely a string or Buffer).  
**`serialization.deserialize(serializedObject)`** - Returns a javascript object reprented by the serializedObject.  

#### Known rpep.js serializations

* Msgpack - https://github.com/Tixit/rpep-msgpack
* BSON - https://github.com/Tixit/rpep-bson
* JSON - `require('rpep/serialization/json')`

## Transports

A transport is an object describing how to send and receive messages. The object has the following properties:

**`transport.connect(connectArguments..., rpepOptions)`** - Connects to another peer. Should return a **Transport Connection Object**.
* `connectArguments...` - Any number of transport-specific connect parameters passed into `peer.connect`.
* `rpepOptions` - The options passed into `rpep` when the `peer` was created.

**`transport.listen(listenerArguments..., rpepOptions, requestHandler)`** - Listens for connections from another peer. Should return a **Transport Listener Object**.
* `listenerArguments...` - Any number of transport-specific listen parameters passed into `peer.listen`.
* `rpepOptions` - The options passed into `rpep` when the `peer` was created.
* `requestHandler(transportRequestObject)` - The `requestHandler` passed into `peer.listen`. On a request, the `requestHandler` should be called with a **Transport Request Object**.

#### Transport Request Object
This is very similar to *Rpep Request Object*. It has all the same methods and properties, but the `accept` method should return a **Transport Connection Object** rather than an *Rpep Connnection Object*

#### Transport Connection Object

This is a type of object returned by `transport.connect()` and a listener's `request.accept()` method calls that allows `rpep` to interact with the connection. It has the following methods:

**`transportConnection.send(message)`** - Sends a message to the other Peer.  
**`transportConnection.close()`** - Closes the connection in a way that actively informs the other Peer about closure.  
**`transportConnection.drop()`** - (Optional) Closes the connection without informing the other Peer.  
**`transportConnection.onOpen(callback)`** - Calls the `callback` when the connection has opened.  
**`transportConnection.onClose(callback)`** - (Optional) Calls the `callback` when the connection has closed. If an error happens that causes connection closure, the `onClose` callback should still be called, or the connection will be assumed to still be open. If not given, a "close" fire-and-forget message will be sent before connection closure if the Peer is a server, and that "close" message will be listened for if its a client Peer.  
**`transportConnection.onMessage(handler)`** - Calls `handler(message)` when a message is received over the connection.  
**`transportConnection.onError(errback)`** - Calls the `callback(e)` when a connection error occurs.  

#### Transport Listener Object

This is a type of object returned by `transport.listen` that allows `rpep` to interact with the listener. It has the following methods:

**`transportListner.close()`** - Closes the listener.  
**`transportListner.onListening(callback)`** - Sets up a `callback` that is called when the listener begins listening.  
**`transportListner.onClose(callback)`** - Sets up a `callback` that is called when the listener stops listening. If an error happens that causes the listener to never start listening or stop listening, the `onClose` `callback` should still be called, or the listener will be assumed to still be open or opening.  
**`transportListner.onError(errback)`** - Sets up a `callback` that is called when an error happens while listening.  
* `errback(error)`

#### Known rpep.js transports

* Websockets - https://github.com/Tixit/rpep-websockets

Known issues
============

Todo
======

* Separate the serializations and transports into thier own separate repositories

How to Contribute!
============

Anything helps:

* Creating issues (aka tickets/bugs/etc). Please feel free to use issues to report bugs, request features, and discuss changes
* Updating the documentation: ie this readme file. Be bold! Help create amazing documentation!
* Submitting pull requests.

How to submit pull requests:

1. Please create an issue and get my input before spending too much time creating a feature. Work with me to ensure your feature or addition is optimal and fits with the purpose of the project.
2. Fork the repository
3. clone your forked repo onto your machine and run `npm install` at its root
4. If you're gonna work on multiple separate things, its best to create a separate branch for each of them
5. edit!
6. When you're done, run the unit tests and ensure they all pass
  * Run `node test/test.node`
  * Run `node test/testServer`
7. Commit and push your changes
8. Submit a pull request: https://help.github.com/articles/creating-a-pull-request

Change Log
=========
* 2.0.2 - Fixing bug where server streams didn't correctly display the stream command name in the case of pending streams after connection closure.
* 2.0.1 - Fixing bug where emitted errors were silently ignored if no listeners were attached to an RPEP connection or server.
* 2.0.0 - Adding peer error event, creating lots of documentation, implementing tls for the websocket transport, and adding more tests for node.js and the browser
* 1.9.9 - Reimplement based on private repository (owned by me)

License
=======
Released under the MIT license: http://opensource.org/licenses/MIT
