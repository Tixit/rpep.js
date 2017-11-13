var bson = new (require("bson"))()

module.exports = {
    serialize: function(javascriptObject) {
        return bson.serialize({x:javascriptObject}) // apparently bson can only handle object as top-level entities... that kinda sucks
    },
    deserialize: function(serializedObject) {
        return bson.deserialize(serializedObject).x
    }
}