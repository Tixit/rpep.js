module.exports = function(transportOptions, rpepOptions) {
    return {
        connect: function(host, port) {
            if(transportOptions.secure) {
                var protocol = 'wss'
            } else {
                var protocol = 'ws'
            }

            return new WebSocket(protocol+'://'+host+':'+port)
        },
        connection: function(wsConnection) {
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
                }
            }
        }
    }
}