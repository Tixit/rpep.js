var msgpack = require("msgpack-lite")

module.exports = {
    serialize: function(javascriptObject) {
        return msgpack.encode(javascriptObject)
    },
    deserialize: function(serializedObject) {
        // not sure if this is the right place to do this, but without it, deserialization fails for browser websockets
        // should this be done in the ws.browser transport module, instead?
        if(serializedObject instanceof ArrayBuffer) {
            serializedObject = new Uint8Array(serializedObject)
        }
        
        return msgpack.decode(serializedObject)
    }
}