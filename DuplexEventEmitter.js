var proto = require("proto")
var EventEmitter = require('eventemitter2')

// an event emitter where listening to it listens to the other end and emitting emits to the other end
module.exports = proto(function() {
    this.init = function(onEmitHandler) {
        this._external = new EventEmitter({newListener: false})
        this._onEmitHandler = onEmitHandler
    }

    this.emit = function(event/*, arguments...*/) {
        if(this.ended) throw new Error("Duplex Stream has already been ended.")
        this._onEmitHandler.apply(this._onEmitHandler, arguments)
    }
    this.on = function(event,handler) {
        this._external.on(event,handler)
    }
    this.off = this.removeListener = function(event, handler) {
        this._external.removeListener(event,handler)
    }
    this.onAny = function(handler) {
        this._external.onAny(handler)
    }
    this.offAny = function(handler) {
        this._external.offAny(handler)
    }
})