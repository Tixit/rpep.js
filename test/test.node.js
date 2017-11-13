"use strict";

var Unit = require('deadunit')

var serverTests = require('rpep.server.test')
var clientTests = require('rpep.client.test')
var utils = require("../utils")

var testSerialization = require("../serialization/json")
var json = require('../serialization/json')
var bson = require('../serialization/bson')
var msgpack = require('../serialization/msgpack')

var testTransportModule = require('testTransport')
var wsNode = require("../transport/ws.node")

Unit.test('All node tests', function(t) {
    this.timeout(3000)

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
    var createTestTransportGetter = function() {
        var testTransport = testTransportModule({listeners:{}})
        return function() {
            return testTransport
        }
    }

    // createTest(this, 'rpep with test serialization and transport',
    //            testSerialization, createTestTransportGetter(), createSerializationTestOptions(testSerialization))
    //
    // this.test('rpep with different serializations', function() {
    //     createTest(this, 'rpep with json',
    //                json, createTestTransportGetter(), createSerializationTestOptions(json))
    //     createTest(this, 'rpep with bson',
    //                bson, createTestTransportGetter(), createSerializationTestOptions(bson))
    //     createTest(this, 'rpep with msgpack',
    //                msgpack, createTestTransportGetter(), createSerializationTestOptions(msgpack))
    // })

    this.test("rpep with different transports", function() {
        createTest(this, 'rpep with websockets for node', testSerialization, wsNode, {
            clientErrorOptions: ['localhost', 6080],
            clientError: "Connection couldn\'t be opened: \nconnectionFailure - Error: connect ECONNREFUSED 127.0.0.1:6080",
            listenerErrorOptions: ['notAValidPort'], listenerError: "listen EACCES notAValidPort",
            rawMessages: createRawMessageTests(testSerialization),
            nextListenerOptions: function(lastOptions) {
                if(lastOptions === undefined) return [6081]
                return [lastOptions[0]+1]
            },
            nextClientOptions: function(lastOptions) {
                if(lastOptions === undefined) return ['localhost', 6081]
                return ['localhost', lastOptions[1]+1]
            }
        })
    })


    //*/

}).writeConsole(1000)


function createTest(that, name, serialization, transport, options) {
    var one = that.test('server - '+name, serverTests(transport, serialization, options))
    var two = that.test('client - '+name, clientTests(transport, serialization, options))

    return one.complete.then(function() {
        return two.complete
    })
}

function createSerializationTestOptions(serialization) {
    var options = {
        listenerNoOnClose: [{port:1, createOnClose:false}], clientNoOnClose: [{port:1, createOnClose:false}],
        clientErrorOptions: [{port:2, throwErrors:[new Error("failed to connect"), new Error("blarg")]}],
        clientError: "Connection couldn\'t be opened: \nError: failed to connect\nError: blarg",
        listenerErrorOptions: [{port:3, throwError:new Error("some error")}],
        listenerError: "some error",
        listenerWithRawMessageSend: [{port:4, setupSendRawMessage:function(sendIn) {
            options.serverSend = sendIn
        }}],
        listenerWithRawMessageSendClient: [{port:4}],
        clientWithRawMessageSend: [{port:5, setupSendRawMessage:function(sendIn) {
            options.clientSend = sendIn
        }}],
        clientWithRawMessageSendClient: [{port:5}],
        rawMessages: createRawMessageTests(serialization),
        nextListenerOptions: function(lastOptions) {
            if(lastOptions === undefined) return [{port:6}]
            return [{port:lastOptions[0].port+1}]
        },
        nextClientOptions: function(lastOptions) {
            if(lastOptions === undefined) return [{port:6}]
            return [{port:lastOptions[0].port+1}]
        }
    }

    return options
}

function createRawMessageTests(serialization) {
    return [
        {message: 'x', matchTest: function(m) {
            return utils.equal(m, serialization.serialize(["x"]))
        }},
        {message: 'ignoreMe', matchTest: function(m) {
            return utils.equal(m, serialization.serialize(["ignoreMe"]))
        }},
        {message: 'ignoreMeRaw', matchTest: function(m) {
            return utils.equal(m, serialization.serialize(["ignoreMeRaw"]))
        }}
    ]
}