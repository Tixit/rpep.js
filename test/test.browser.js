"use strict";

var Unit = require('deadunit/deadunit.browser')

var resultsDiv = document.getElementById("results")

Unit.test("Browser Rpep Tests", function(t) {
    this.timeout(20*1000) // not entirely sure why i have to make this so high for the test to not timeout
    
    t.test("websocket.transport.browser", require('websocket.transport.browser.test'))
}).writeHtml(resultsDiv)