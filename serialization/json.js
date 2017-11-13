module.exports = {
    serialize: function(javascriptObject) {
        return JSON.stringify(javascriptObject)
    },
    deserialize: function(serializedObject) {
        return JSON.parse(serializedObject)
    }
}