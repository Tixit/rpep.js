"use strict";

var Unit = require('deadunit')

var testUtils = require("testUtils")

var testSerialization = require("../serialization/json")
var json = require('../serialization/json')

var testTransportModule = require('testTransport')

Unit.test('All node tests', function(t) {
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
    var createTestTransportGetter = function() {
        var testTransport = testTransportModule({listeners:{}})
        return function() {
            return testTransport
        }
    }

    testUtils.runTest(this, 'rpep with test serialization and transport',
               testSerialization, createTestTransportGetter(), testUtils.createSerializationTestOptions(testSerialization))

    testUtils.runTest(this, 'rpep with json', json, createTestTransportGetter(), testUtils.createSerializationTestOptions(json))


    //*/

}).writeConsole(1000)