
`rpep.js`
=====

This is a javascript implementation of the [Remote Procedure and Event Protocol (RPEP)](https://github.com/Tixit/RPEP) for node.js and the browser. RPEP is a simple, light-weight protocol for request-response and stream-event style communication between peers.

Example
=======

```javascript
var rpep = require("rpep"
var transport = require("rpep/transport/ws.node")
var serialization = require("rpep/serialization/msgpack"

// server

var server = rpep(transport, serialization)
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

server.listen(443, function(request) {
    var conn = request.accept()
})

// client (usually on a different machine ; )

var client = rpep(transport, serialization)
r.connect({host:'yourhost.me', port:443}).then(function(conn) {
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
npm install rpep
```


Usage
=====

Accessing rpep:
```javascript
// node.js
var dd = require('rpep')

// amd
require.config({paths: {'rpep': '../dist/rpep.umd.js'}})
require(['rpep'], function(dd) { /* your code */ })

// global variable
<script src="rpep.umd.js"></script>
rpep; // rpep.umd.js can define rpep globally if you really
      //   want to shun module-based design
```

Using rpep:


Known issues
============

Todo
======

* Test that raw buffers can be sent and received by transports that support that

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
7. Commit and push your changes
8. Submit a pull request: https://help.github.com/articles/creating-a-pull-request

Change Log
=========
* 2.0.0 - Reimplement based on private repository (owned by me)

License
=======
Released under the MIT license: http://opensource.org/licenses/MIT