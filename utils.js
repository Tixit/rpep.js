

exports.resolver = function() {
    var resolve, reject
    var f = new Promise(function(inResolve, inReject) {
        resolve = inResolve
        reject = inReject
    })

    return {f: f, resolve:resolve, reject:reject}
}

// compares arrays and objects for value equality (all elements and members must match)
exports.equal = function(a,b) {
    if(a instanceof Array) {
        if(!(b instanceof Array))
            return false
        if(a.length !== b.length) {
            return false
        } else {
            for(var n=0; n<a.length; n++) {
                if(!exports.equal(a[n],b[n])) {
                    return false
                }
            }
            // else
            return true
        }
    } else if(a instanceof Object) {
        if(!(b instanceof Object))
            return false

        var aKeys = getKeys(a)
        var bKeys = getKeys(b)

        if(aKeys.length !== bKeys.length) {
            return false
        } else {
            for(var n=0; n<aKeys.length; n++) {
                var key = aKeys[n]
                var aVal = a[key]
                var bVal = b[key]

                if(!exports.equal(aVal,bVal)) {
                    return false
                }
            }
            // else
            return true
        }
    } else {
        return a===b || Number.isNaN(a) && Number.isNaN(b)
    }
}

// counts object own-keys ignoring properties that are undefined
function getKeys(x) {
    var keys=[]
    for(var k in x) {
        if(x[k] !== undefined && Object.prototype.hasOwnProperty.call(x,k)) {
            keys.push(k)
        }
    }

    return keys
}