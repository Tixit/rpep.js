module.exports = function(transportOptions) {
    return {
        // connectionOptions
            // binaryType - The binaryType property of a websocket connection
            // protocol - (Default: 'ws') Either 'wss' or 'ws'
        connect: function(host, port/*, [connectionOptions,] rpepOptions*/) {
            if(arguments.length <= 3) {
                var rpepOptions = arguments[2]
            } else {
                var connectionOptions = arguments[2]
                var rpepOptions = arguments[3]
            }

            if(!connectionOptions) connectionOptions = {}
            if(!connectionOptions.protocol) connectionOptions.protocol = 'ws'

            var wsConnection = new WebSocket(connectionOptions.protocol+'://'+host+':'+port)
            if(connectionOptions.binaryType)
                wsConnection.binaryType = connectionOptions.binaryType

            return {
                send: function(m) {
                    wsConnection.send(m)
                },
                close: function() {
                    wsConnection.close()
                },
                onOpen: function(cb) {
                    wsConnection.onopen = cb
                },
                onClose: function(cb) {
                    wsConnection.onclose = cb
                },
                onMessage: function(cb) {
                    wsConnection.onmessage = function(m) {
                        cb(m.data)
                    }
                },
                onError: function(cb) {
                    wsConnection.onerror = function(e) {
                        if(e instanceof Event) {
                            var error = new Error('Websocket error event (probably means the connection couldn\'t be made or has been closed)')
                            error.event = e
                            cb(error)
                        } else {
                            cb(e)
                        }
                    }
                },
                rawConnection: wsConnection
            }
        }
    }
}