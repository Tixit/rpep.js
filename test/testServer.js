var http = require('http');
var fs = require('fs')
var url = require('url')

var opn = require('opn')
var Unit = require('deadunit')

var testUtils = require("testUtils")

var json = require("../serialization/json")
var msgpack = require('../serialization/msgpack')
var wsNode = require("../transport/ws.node")



var buildRun  = require('../build').done // build the bundles

var server = http.createServer(function (request, res) {
    try {
        var requestUrl = url.parse(request.url)
        var path = requestUrl.pathname

        if(path !== '/favicon.ico') {
            console.log("got request for: "+path)

            if(path === '/') {
                path = '/node_modules/test.browser.html'
            }

            if(path.slice(-2) === 'js') {
                res.setHeader("Content-Type", 'text/javascript')
            }
            res.writeHead(200)
            res.write(fs.readFileSync(__dirname+path))
        }
    } catch(e) {
        console.log(e.message)
    } finally {
        res.end()
    }
})


var port = 8100
server.listen(port)
console.log("listening on port "+port)

buildRun.then(function() {
    Unit.test('Server tests for browser-side tests', function(t) {
        var serverTests = require('rpep.server.test')

        this.timeout(5000)

        // this is here so that we actually get stack traces for unhandled promise rejections
        process.on('unhandledRejection', (reason, p) => {
          t.ok(false, 'Unhandled Rejection reason: '+reason)
          t.log(p)
        })
        process.on('uncaughtException', (reason) => {
            t.ok(false)
            t.log(reason)
        })


        //*

        var testOptions = {
            clientErrorOptions: ['localhost', 6080],
            clientError: "Connection couldn\'t be opened: \nconnectionFailure - Error: connect ECONNREFUSED 127.0.0.1:6080",
            listenerErrorOptions: ['notAValidPort'], listenerError: "listen EACCES notAValidPort",
            rawMessages: testUtils.createRawMessageTests(json),
            nextListenerOptions: function(lastOptions) {
                if(lastOptions === undefined) lastOptions = [testOptions.clientErrorOptions[1]]
                return [lastOptions[0]+1]
            }
        }


        this.test('rpep node server with json websockets', serverTests(wsNode, json, testOptions)).complete.then(function() {
            testOptions.rawMessages = testUtils.createRawMessageTests(msgpack)
            testOptions.clientErrorOptions[1] = 7080

            t.test('rpep node server with msgpack binary websockets', serverTests(wsNode, msgpack, testOptions)).complete.then(function() {
                server.close()
                // setTimeout(function() {
                //     require("why-is-node-running")()     
                // })
            })
        })


        //*/

    }).writeConsole(1000)

    opn('http://localhost:8100')
})
