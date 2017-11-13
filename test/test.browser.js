"use strict";

var Unit = require('deadunit/deadunit.browser')

var resultsDiv = document.getElementById("results")

Unit.test("Browser Rpep Tests", function(t) {
    t.test("websocket.transport.browser", require('websocket.transport.browser.test'))
}).writeHtml(resultsDiv)