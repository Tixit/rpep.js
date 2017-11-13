var msgpack = require("msgpack-lite")

module.exports = {
    serialize: function(javascriptObject) {
        return msgpack.encode(javascriptObject)
    },
    deserialize: function(serializedObject) {
        return msgpack.decode(serializedObject)
    }
}