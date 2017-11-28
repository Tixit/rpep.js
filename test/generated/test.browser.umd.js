(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["test.browser"] = factory();
	else
		root["test.browser"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/bufferish.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// bufferish.js

var Buffer = exports.global = __webpack_require__(/*! ./buffer-global */ 101);
var hasBuffer = exports.hasBuffer = Buffer && !!Buffer.isBuffer;
var hasArrayBuffer = exports.hasArrayBuffer = ("undefined" !== typeof ArrayBuffer);

var isArray = exports.isArray = __webpack_require__(/*! isarray */ 10);
exports.isArrayBuffer = hasArrayBuffer ? isArrayBuffer : _false;
var isBuffer = exports.isBuffer = hasBuffer ? Buffer.isBuffer : _false;
var isView = exports.isView = hasArrayBuffer ? (ArrayBuffer.isView || _is("ArrayBuffer", "buffer")) : _false;

exports.alloc = alloc;
exports.concat = concat;
exports.from = from;

var BufferArray = exports.Array = __webpack_require__(/*! ./bufferish-array */ 103);
var BufferBuffer = exports.Buffer = __webpack_require__(/*! ./bufferish-buffer */ 104);
var BufferUint8Array = exports.Uint8Array = __webpack_require__(/*! ./bufferish-uint8array */ 105);
var BufferProto = exports.prototype = __webpack_require__(/*! ./bufferish-proto */ 18);

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer|Uint8Array|Array}
 */

function from(value) {
  if (typeof value === "string") {
    return fromString.call(this, value);
  } else {
    return auto(this).from(value);
  }
}

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return auto(this).alloc(size);
}

/**
 * @param list {Array} array of (Buffer|Uint8Array|Array)s
 * @param [length]
 * @returns {Buffer|Uint8Array|Array}
 */

function concat(list, length) {
  if (!length) {
    length = 0;
    Array.prototype.forEach.call(list, dryrun);
  }
  var ref = (this !== exports) && this || list[0];
  var result = alloc.call(ref, length);
  var offset = 0;
  Array.prototype.forEach.call(list, append);
  return result;

  function dryrun(buffer) {
    length += buffer.length;
  }

  function append(buffer) {
    offset += BufferProto.copy.call(buffer, result, offset);
  }
}

var _isArrayBuffer = _is("ArrayBuffer");

function isArrayBuffer(value) {
  return (value instanceof ArrayBuffer) || _isArrayBuffer(value);
}

/**
 * @private
 */

function fromString(value) {
  var expected = value.length * 3;
  var that = alloc.call(this, expected);
  var actual = BufferProto.write.call(that, value);
  if (expected !== actual) {
    that = BufferProto.slice.call(that, 0, actual);
  }
  return that;
}

function auto(that) {
  return isBuffer(that) ? BufferBuffer
    : isView(that) ? BufferUint8Array
    : isArray(that) ? BufferArray
    : hasBuffer ? BufferBuffer
    : hasArrayBuffer ? BufferUint8Array
    : BufferArray;
}

function _false() {
  return false;
}

function _is(name, key) {
  /* jshint eqnull:true */
  name = "[object " + name + "]";
  return function(value) {
    return (value != null) && {}.toString.call(key ? value[key] : value) === name;
  };
}

/***/ }),
/* 1 */
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/*!***********************************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/node_modules/proto/proto.js ***!
  \***********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2013 Billy Tetrud - Free to use for any purpose: MIT License*/

var noop = function() {}

var prototypeName='prototype', undefined, protoUndefined='undefined', init='init', ownProperty=({}).hasOwnProperty; // minifiable variables
function proto() {
    var args = arguments // minifiable variables

    if(args.length == 1) {
        var parent = {init: noop}
        var prototypeBuilder = args[0]

    } else { // length == 2
        var parent = args[0]
        var prototypeBuilder = args[1]
    }

    // special handling for Error objects
    var namePointer = {}    // name used only for Error Objects
    if([Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError].indexOf(parent) !== -1) {
        parent = normalizeErrorObject(parent, namePointer)
    }

    // set up the parent into the prototype chain if a parent is passed
    var parentIsFunction = typeof(parent) === "function"
    if(parentIsFunction) {
        prototypeBuilder[prototypeName] = parent[prototypeName]
    } else {
        prototypeBuilder[prototypeName] = parent
    }

    // the prototype that will be used to make instances
    var prototype = new prototypeBuilder(parent)
    namePointer.name = prototype.name

    // if there's no init, assume its inheriting a non-proto class, so default to applying the superclass's constructor.
    if(!prototype[init] && parentIsFunction) {
        prototype[init] = function() {
            parent.apply(this, arguments)
        }
    }

    // constructor for empty object which will be populated via the constructor
    var F = function() {}
        F[prototypeName] = prototype    // set the prototype for created instances

    var constructorName = prototype.name?prototype.name:''
    if(prototype[init] === undefined || prototype[init] === noop) {
        var ProtoObjectFactory = new Function('F',
            "return function " + constructorName + "(){" +
                "return new F()" +
            "}"
        )(F)
    } else {
        // dynamically creating this function cause there's no other way to dynamically name a function
        var ProtoObjectFactory = new Function('F','i','u','n', // shitty variables cause minifiers aren't gonna minify my function string here
            "return function " + constructorName + "(){ " +
                "var x=new F(),r=i.apply(x,arguments)\n" +    // populate object via the constructor
                "if(r===n)\n" +
                    "return x\n" +
                "else if(r===u)\n" +
                    "return n\n" +
                "else\n" +
                    "return r\n" +
            "}"
        )(F, prototype[init], proto[protoUndefined]) // note that n is undefined
    }

    prototype.constructor = ProtoObjectFactory;    // set the constructor property on the prototype

    // add all the prototype properties onto the static class as well (so you can access that class when you want to reference superclass properties)
    for(var n in prototype) {
        addProperty(ProtoObjectFactory, prototype, n)
    }

    // add properties from parent that don't exist in the static class object yet
    for(var n in parent) {
        if(ownProperty.call(parent, n) && ProtoObjectFactory[n] === undefined) {
            addProperty(ProtoObjectFactory, parent, n)
        }
    }

    ProtoObjectFactory.parent = parent;            // special parent property only available on the returned proto class
    ProtoObjectFactory[prototypeName] = prototype  // set the prototype on the object factory

    return ProtoObjectFactory;
}

proto[protoUndefined] = {} // a special marker for when you want to return undefined from a constructor

module.exports = proto

function normalizeErrorObject(ErrorObject, namePointer) {
    function NormalizedError() {
        var tmp = new ErrorObject(arguments[0])
        tmp.name = namePointer.name

        this.message = tmp.message
        if(Object.defineProperty) {
            /*this.stack = */Object.defineProperty(this, 'stack', { // getter for more optimizy goodness
                get: function() {
                    return tmp.stack
                },
                configurable: true // so you can change it if you want
            })
        } else {
            this.stack = tmp.stack
        }

        return this
    }

    var IntermediateInheritor = function() {}
        IntermediateInheritor.prototype = ErrorObject.prototype
    NormalizedError.prototype = new IntermediateInheritor()

    return NormalizedError
}

function addProperty(factoryObject, prototype, property) {
    try {
        var info = Object.getOwnPropertyDescriptor(prototype, property)
        if(info.get !== undefined || info.get !== undefined && Object.defineProperty !== undefined) {
            Object.defineProperty(factoryObject, property, info)
        } else {
            factoryObject[property] = prototype[property]
        }
    } catch(e) {
        // do nothing, if a property (like `name`) can't be set, just ignore it
    }
}

/***/ }),
/* 3 */
/*!************************************************!*\
  !*** ../node_modules/path-browserify/index.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../process/browser.js */ 1)))

/***/ }),
/* 4 */
/*!*************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/source-map/lib/util.js ***!
  \*************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;


/***/ }),
/* 5 */
/*!***************************************************!*\
  !*** ../node_modules/async-future/asyncFuture.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2013 Billy Tetrud - Free to use for any purpose: MIT License*/

var trimArgs = __webpack_require__(/*! trimArguments */ 21)


module.exports = Future

Future.debug = false // switch this to true if you want ids and long stack traces

var curId = 0         // for ids\
function Future(value) {
	if(arguments.length > 0) {
		var f = new Future()
        f.return(value)
        return f
	} else {
        this.isResolved = false
        this.queue = []
        if(Future.debug) {
            curId++
            this.id = curId
        }
    }
}

// static methods

// has one parameter: either a bunch of futures, or a single array of futures
// returns a promise that resolves when one of them errors, or when all of them succeeds
Future.all = function() {
    if(arguments[0] instanceof Array) {
        var futures = arguments[0]
    } else {
        var futures = trimArgs(arguments)
    }

    var f = new Future()
    var results = []

    if(futures.length > 0) {
        var current = futures[0]
        futures.forEach(function(future, index) {
            current = current.then(function(v) {
                results[index] = v
                return futures[index+1]
            })
        })

        //if
        current.catch(function(e) {
            f.throw(e)
        })
        // else
        current.then(function() {
            f.return(results)
        })


    } else {
        f.return(results)
    }

    return f
}

// either used like futureWrap(function(){ ... })(arg1,arg2,etc) or
//  futureWrap(object, 'methodName')(arg1,arg2,etc)
Future.wrap = function() {
    // function
    if(arguments.length === 1) {
        var fn = arguments[0]
        var object = undefined


    // object, function
    } else {
        var object = arguments[0]
        var fn = object[arguments[1]]
    }

    return function() {
        var args = Array.prototype.slice.call(arguments)
        var future = new Future
        args.push(future.resolver())
        var me = this
        if(object) me = object
        fn.apply(me, args)
        return future
    }
}


// default
var unhandledErrorHandler = function(e) {
    setTimeout(function() {
        throw e
    },0)
}

// setup unhandled error handler
// unhandled errors happen when done is called, and  then an exception is thrown from the future
Future.error = function(handler) {
    unhandledErrorHandler = handler
}

// instance methods

// returns a value for the future (can only be executed once)
// if there are callbacks waiting on this value, they are run in the next tick
    // (ie they aren't run immediately, allowing the current thread of execution to complete)
Future.prototype.return = function(v) {
    resolve(this, 'return', v)
}
Future.prototype.throw = function(e) {
    resolve(this, 'error', e)
}

function setNext(that, future) {
    if(future !== undefined && !isLikeAFuture(future) )
        throw Error("Value returned from then or catch *not* a Future: "+future)

    resolve(that, 'next', future)
}

function wait(that, cb) {
    if(that.isResolved) {
        executeCallbacks(that, [cb])
    } else {
        that.queue.push(cb)
    }
}

// duck typing to determine if something is or isn't a future
function isLikeAFuture(x) {
    return x.isResolved !== undefined && x.queue !== undefined && x.then !== undefined
}

function waitOnResult(f, result, cb) {
    wait(result, function() {
        if(this.hasError) {
            f.throw(this.error)
        } else if(this.hasNext) {
            waitOnResult(f, this.next, cb)
        } else {
            try {
                setNext(f, cb(this.result))
            } catch(e) {
                f.throw(e)
            }
        }
    })
}


// cb takes one parameter - the value returned
// cb can return a Future, in which case the result of that Future is passed to next-in-chain
Future.prototype.then = function(cb) {
    var f = new Future
    wait(this, function() {
        if(this.hasError)
            f.throw(this.error)
        else if(this.hasNext)
            waitOnResult(f, this.next, cb)
        else {
            try {
                setNext(f, cb(this.result))
            } catch(e) {
                f.throw(e)
            }
        }
    })
    return f
}
// cb takes one parameter - the error caught
// cb can return a Future, in which case the result of that Future is passed to next-in-chain
Future.prototype.catch = function(cb) {
    var f = new Future
    wait(this, function() {
        if(this.hasError) {
            try {
                setNext(f, cb(this.error))
            } catch(e) {
                f.throw(e)
            }
        } else if(this.hasNext) {
            this.next.then(function(v) {
                f.return(v)
            }).catch(function(e) {
                setNext(f, cb(e))
            })
        } else {
            f.return(this.result)
        }
    })
    return f
}
// cb takes no parameters
// callback's return value is ignored, but thrown exceptions propogate normally
Future.prototype.finally = function(cb) {
    var f = new Future
    wait(this, function() {
        try {
            var that = this
            if(this.hasNext) {
                this.next.then(function(v) {
                    var x = cb()
                    f.return(v)
                    return x
                }).catch(function(e) {
                    var x = cb()
                    f.throw(e)
                    return x
                }).done()
            } else if(this.hasError) {
                Future(true).then(function() {
                    return cb()
                }).then(function() {
                    f.throw(that.error)
                }).catch(function(e) {
                    f.throw(e)
                }).done()

            } else  {
                Future(true).then(function() {
                    return cb()
                }).then(function() {
                    f.return(that.result)
                }).catch(function(e) {
                    f.throw(e)
                }).done()
            }
        } catch(e) {
            f.throw(e)
        }
    })
    return f
}

// all unused futures should end with this (e.g. most then-chains)
// detatches the future so any propogated exception is thrown (so the exception isn't silently lost)
Future.prototype.done = function() {
    wait(this, function() {
        if(this.hasError) {
            unhandledErrorHandler(this.error)
        } else if(this.hasNext) {
            this.next.catch(function(e) {
                unhandledErrorHandler(e)
            })
        }
    })
}



Future.prototype.resolver = function() {
    var me = this

    return function(e,v) {
        if(e) { // error argument
            me.throw(e)
        } else {
            me.return(v)
        }
    }
}

Future.prototype.resolved = function() {
    return this.isResolved
}


function resolve(that, type, value) {
    if(that.isResolved)
        throw Error("Future resolved more than once! Resolution: "+value)

    that.isResolved = true
    that.hasError = type === 'error'
    that.hasNext = type === 'next' && value !== undefined

    if(that.hasError)
        that.error = value
    else if(that.hasNext)
        that.next = value
    else
        that.result = value

    executeCallbacks(that, that.queue)
}

function executeCallbacks(that, callbacks) {
    if(callbacks.length > 0) {
        setTimeout(function() {
            callbacks.forEach(function(cb) {
                cb.apply(that)
            })
        },0)
    }
}


/***/ }),
/* 6 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/*!*********************************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/src/node_modules/utils.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// utilities needed by the configuration (excludes dependencies the configs don't need so the webpack bundle is lean)

var path = __webpack_require__(/*! path */ 3)


// Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
// any number of objects can be passed into the function and will be merged into the first argument in order
// returns obj1 (now mutated)
var merge = exports.merge = function(obj1, obj2/*, moreObjects...*/){
    return mergeInternal(arrayify(arguments), false)
}

// like merge, but traverses the whole object tree
// the result is undefined for objects with circular references
var deepMerge = exports.deepMerge = function(obj1, obj2/*, moreObjects...*/) {
    return mergeInternal(arrayify(arguments), true)
}

// returns a new object where properties of b are merged onto a (a's properties may be overwritten)
exports.objectConjunction = function(a, b) {
    var objectCopy = {}
    merge(objectCopy, a)
    merge(objectCopy, b)
    return objectCopy
}

// turns an array of values into a an object where those values are all keys that point to 'true'
exports.arrayToMap = function(array) {
    var result = {}
    array.forEach(function(v) {
        result[v] = true
    })
    return result
}

function mergeInternal(objects, deep) {
    var obj1 = objects[0]
    var obj2 = objects[1]

    for(var key in obj2){
       if(Object.hasOwnProperty.call(obj2, key)) {
            if(deep && obj1[key] instanceof Object && obj2[key] instanceof Object) {
                mergeInternal([obj1[key], obj2[key]], true)
            } else {
                obj1[key] = obj2[key]
            }
       }
    }

    if(objects.length > 2) {
        var newObjects = [obj1].concat(objects.slice(2))
        return mergeInternal(newObjects, deep)
    } else {
        return obj1
    }
}

function arrayify(a) {
    return Array.prototype.slice.call(a, 0)
}


/***/ }),
/* 8 */
/*!*********************************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/src/node_modules/Style.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var jssModule = __webpack_require__(/*! ../external/jss */ 61)
var proto = __webpack_require__(/*! proto */ 2)
var HashMap = __webpack_require__(/*! hashmap */ 28)

var utils = __webpack_require__(/*! ./utils */ 7)
var blockStyleUtils = __webpack_require__(/*! ./blockStyleUtils */ 27)

var baseClassName = '_ComponentStyle_' // the base name for generated class names
var nextClassNumber = 0

// creates a style object
var Style = module.exports = proto(function() {

    this.defaultClassName = '_default_'     // the name of the default class (used to prevent style inheritance)

    // styleDefinition is an object where key-value pairs can be any of the following:
    // <cssPropertyName>: the value should be a valid css value for that style attribute
    // <ComponentName>: the value can either be a Style object or a nested styleDefinition object
    // $setup: the value is a function to be run on a component when the style is applied to it
    // $kill: the value is a function to be run on a component when a style is removed from it
    // $state: the value should be a state handler function
    // $<label>: the value should be a nested styleDefinition object that does not contain any label styles.
    this.init = function(styleDefinition, privateOptions) {
        if(privateOptions === undefined) privateOptions = {}
        if(privateOptions.inLabel===undefined) inLabel = false

        this.className = baseClassName+nextClassNumber
        nextClassNumber++

        this.componentStyleMap = {}
        this.labelStyleMap = {}

        var labelStyles = {}
        var pseudoClassStyles = {}
        var cssProperties = {}
        for(var key in styleDefinition) {
            var value = styleDefinition[key]

            if(key === '$setup') {
                if(!(value instanceof Function)) throw new Error("$setup key must be a function ('setup' can't be used as a label)")
                this.setup = value

            } else if(key === '$kill') {
                if(!(value instanceof Function)) throw new Error("$kill key must be a function ('kill' can't be used as a label)")
                this.kill = value

            } else if(key === '$state') {
                if(!(value instanceof Function)) throw new Error("$state key must be a function ('$state' can't be used as a label)")
                this.stateHandler = value

            } else if(key.indexOf('$$') === 0) { // pseudo-class style
                var pseudoClass = mapCamelCase(key.substr(2))
                if(pseudoClass === '') {
                    throw new Error("Empty pseudo-class name not valid (style key '$$')")
                }

                utils.merge(pseudoClassStyles, flattenPseudoClassStyles(pseudoClass, value))

            } else if(key.indexOf('$') === 0) {   // label style
                if(privateOptions.inLabel)
                    throw new Error("Can't create nested label style "+key+" because components can only have one label")

                var label = key.substr(1)
                if(label === '') {
                    throw new Error("Empty label name not valid (style key '$')")
                }

                labelStyles[label] = value

            } else if(isStyleObject(value)) {
                this.componentStyleMap[key] = value

            } else if(value instanceof Object) {
                this.componentStyleMap[key] = Style(value)  // turn the object description into a full fledged style object
            } else {
                var cssStyle = key
                var cssStyleName = mapCamelCase(cssStyle)
                cssProperties[cssStyleName] = cssValue(cssStyleName, value)
            }
        }

        // create the css class
        if(privateOptions.default) {
            var jssSheet = defaultJss
        } else {
            var jssSheet = jss
        }

        jssSheet.set('.'+this.className, cssProperties)

        //if(module.exports.isDev) {
            this.styleDefinitions = {}
            this.styleDefinitions['.'+this.className] = cssProperties
        //}

        // create label styles
        if(Object.keys(labelStyles).length > 0) {
            var baseStyle = utils.merge({}, cssProperties, this.componentStyleMap)

            for(var label in labelStyles) {
                if(isStyleObject(labelStyles[label])) {
                    this.labelStyleMap[label] = labelStyles[label]
                } else {
                    var mergedStyle = utils.merge({}, baseStyle, labelStyles[label])
                    this.labelStyleMap[label] = Style(mergedStyle, {inLabel:true})
                }
            }
        }

        // create pseudoclass styles
        if(Object.keys(pseudoClassStyles).length > 0) {

            var tieredPseudoClasses = createTieredPseudoClasses(this, pseudoClassStyles)
            pseudoclassCombinations(tieredPseudoClasses) // mutates tieredPseudoClasses

            // turn the emulatable pseudo classes into Style objects
            // also build up the set of psuedoclasses that will be emulated
            // also build up a map of pseudoclasses-to-emulate to the emulation functions for those pseudoclasses
            var pseudoClasesToEmulate = []
            var preSplitPseudoClasses = [] // a list where each element looks like: [pseudoClassList, styleObject]  (this is primarily for performance - so we don't have to split the key every time we check for state changes)
            var pseudoClassesToEmulationInfo = {}
            for(var key in tieredPseudoClasses) {
                if(isStyleObject(tieredPseudoClasses[key])) {
                    tieredPseudoClasses[key] = tieredPseudoClasses[key]
                } else {
                    var newStyle = Style(utils.merge({}, cssProperties, tieredPseudoClasses[key])) // pseudoClassStyles merged with parent css styles

                    // merge in componentStyleMap and labelStyleMap
                    for(var k in this.componentStyleMap) {
                        if(newStyle.componentStyleMap[k] === undefined)
                            newStyle.componentStyleMap[k] = this.componentStyleMap[k]
                    }
                    for(var k in this.labelStyleMap) {
                        if(newStyle.labelStyleMap[k] === undefined)
                            newStyle.labelStyleMap[k] = this.labelStyleMap[k]
                    }

                    tieredPseudoClasses[key] = newStyle
                }


                var pseudoClassList = key.split(":")
                for(var n=0; n<pseudoClassList.length; n++) {
                    var pseudoClass = pseudoClassList[n]
                    if(pseudoClasesToEmulate.indexOf(pseudoClass) === -1) {
                        pseudoClasesToEmulate.push(pseudoClass)

                        var pseudoClassParts = getPseudoClassParts(pseudoClass)
                        var fns = emulatedPseudoClasses[pseudoClassParts.class]
                        var info = {fns: fns}
                        if(fns.processParameter !== undefined) {
                            info.parameter = fns.processParameter(pseudoClassParts.parameter)
                        }
                        pseudoClassesToEmulationInfo[pseudoClass] = info
                    }
                }

                preSplitPseudoClasses.push([pseudoClassList, tieredPseudoClasses[key]])
            }

            // create functions that initialize and keep track of state
            var initializeState = function(component) {
                var state = {}
                for(var n=0; n<pseudoClasesToEmulate.length; n++) {
                    var pseudoClass = pseudoClasesToEmulate[n]
                    var pseudoClassEmulationInfo = pseudoClassesToEmulationInfo[pseudoClass]
                    state[pseudoClass] = pseudoClassEmulationInfo.fns.check(component, pseudoClassEmulationInfo.parameter)
                }

                return state
            }

            var that = this
            var changeStyleIfNecessary = function(currentStyle, component, state) {
                var longestMatchingLength = 0;
                var mostSpecificMatchingStyle = that; // if nothing else matches, change back to the base style object
                for(var n=0; n<preSplitPseudoClasses.length; n++) {
                    var pseudoClassList = preSplitPseudoClasses[n][0]
                    for(var j=0; j<pseudoClassList.length; j++) {
                        if(!state[pseudoClassList[j]]) {
                            break;
                        }
                    }

                    if(j === pseudoClassList.length && j > longestMatchingLength) {
                        longestMatchingLength = j
                        mostSpecificMatchingStyle = preSplitPseudoClasses[n][1]
                    }
                }

                if(mostSpecificMatchingStyle !== currentStyle) {
                    component.style = mostSpecificMatchingStyle

                    //blockStyleUtils.setCurrentStyle(component, mostSpecificMatchingStyle)
                    //blockStyleUtils.propogateStyleSet(component.children, component.computedStyleMap) // propogate styles to children
                }
            }

            // setup pseudoclass emulation with $setup and $kill handlers

            var wrapSetupAndKill = function(style) {
                var originalSetup = style.setup
                style.setup = function(component) {
                    var that = this

                    this._styleSetupStates = {} // maps pseudoClass to setupState
                    var state = initializeState(component)
                    for(var pseudoClass in pseudoClassesToEmulationInfo) {
                        ;(function(pseudoClass, emulationInfo){   // close over those variables (so they keep the value they had when the function was setup)
                            that._styleSetupStates[pseudoClass] = emulationInfo.fns.setup(component, function() { // start
                                state[pseudoClass] = true
                                changeStyleIfNecessary(that, component, state)
                            }, function() { // end
                                state[pseudoClass] = false
                                changeStyleIfNecessary(that, component, state)
                            }, emulationInfo.parameter)

                        })(pseudoClass, pseudoClassesToEmulationInfo[pseudoClass])
                    }

                    changeStyleIfNecessary(that, component, state)

                    if(originalSetup !== undefined) {
                        originalSetup.apply(this, arguments)
                    }
                }

                var originalKill = style.kill
                style.kill = function(component) {
                    for(var pseudoClass in pseudoClassesToEmulationInfo) {
                        var emulationInfo = pseudoClassesToEmulationInfo[pseudoClass]
                        emulationInfo.fns.kill(component, this._styleSetupStates[pseudoClass])
                    }

                    if(originalKill !== undefined) {
                        originalKill.apply(this, arguments)
                    }
                }
            }

            // wrap all the setup and kill functions

            for(var key in tieredPseudoClasses) {
                var style = tieredPseudoClasses[key]
                wrapSetupAndKill(style)
            }

            wrapSetupAndKill(this)
        }
    }

    // instance properties

    this.className          // the css classname for this style
    this.componentStyleMap; // maps a Component name to a Style object for that component
    this.labelStyleMap;     // maps a label name to a Style object for that label
    this.setup;             // run some javascript on any element this class is applied to
    this.kill;              // a function to run on removal of the style (should reverse setup)

    // gets the style object for a component based on the current style object (takes into account whether the component has a label
    this.get = function(component) {
        if(component.label !== undefined) {
            var labelStyle = this.labelStyleMap[component.label]
            if(labelStyle !==  undefined) {
                return labelStyle
            }
        }
        // else
        return this
    }
})


// private


// returns a two-level map where the top-level keys are emulatable psuedo classes, and non-emulatable pseudo classes are at the second level
// the classes will also be sorted and deduped
// Example return value: {"hover:lastChild": {color:'red', "$$visited:disabled": {fontWeight: 'bold'}}, }
// parameters:
    // style - the style object being created
    // pseudoClassStyles - a flat object where each key is a list of pseudoclasses separated by colons (e.g. "hover" or "hover:focus") and the value is an object of styles that don't contain pseudoclasses
function createTieredPseudoClasses(style, pseudoClassStyles) {
    var tieredPseudoClasses = {} // the two-level map
    for(var key in pseudoClassStyles) {
        var value = pseudoClassStyles[key]

        // split key into pseudoclass list
        var pseudoClassList = key.split(":")
        var emulatablePseudoClasses = []
        var nonEmulatablePseudoClasses = []
        for(var n in pseudoClassList) {
            var pseudoClass = pseudoClassList[n]
            var pseudoClassParts = getPseudoClassParts(pseudoClass)
            if(pseudoClassParts.class in emulatedPseudoClasses) {
                emulatablePseudoClasses.push(pseudoClass)
            } else {
                nonEmulatablePseudoClasses.push(pseudoClass)
            }
        }

        // todo: add a third branch as an optimization: if the Style can be rendered without emulation - do that
        if(emulatablePseudoClasses.length === 0) { // if none of the pseudoclasses can be emulated using javascript
            validatePurePseudoClassStyles(key, value)                        // then validate the value and
            createPseudoClassRules(style, key, '.'+style.className+":"+key, value)   // create pseudoClassRules

        } else { // if some of the pseudoclasses can be emulated using javascript

            emulatablePseudoClasses.sort()
            var emulatablePseudoClassKey = emulatablePseudoClasses.join(':')
            if(tieredPseudoClasses[emulatablePseudoClassKey] === undefined)
                tieredPseudoClasses[emulatablePseudoClassKey] = {}

            if(nonEmulatablePseudoClasses.length === 0) {
                utils.merge(tieredPseudoClasses[emulatablePseudoClassKey], value)
            } else {
                nonEmulatablePseudoClasses.sort()
                var nonEmulatablePsuedoClassKey = nonEmulatablePseudoClasses.join(':')

                var secondTier = {}
                secondTier['$$'+nonEmulatablePsuedoClassKey] = value

                utils.merge(tieredPseudoClasses[emulatablePseudoClassKey], secondTier)
            }
        }
    }

    return tieredPseudoClasses
}



// make combinations of the emulatable pseudoclasses, so that they combine like the non-emulated ones do
// info about mathematical combination: https://en.wikipedia.org/wiki/Combination
// mutates tieredPseudoClasses
function pseudoclassCombinations(tieredPseudoClasses) {
    var tieredPseudoClassesKeys = Object.keys(tieredPseudoClasses).reverse().map(function(v) {    // reverse first so that more specific pseudoclasses go first
        return {key: v, parts: v.split(':')} // so it doesn't have to split every time
    })

    for(var n=0; n<tieredPseudoClassesKeys.length; n++) {
        var keyA = tieredPseudoClassesKeys[n]
        for(var k=2; k <= tieredPseudoClassesKeys.length; k++) { // k is the number of psuedoclasses to combine
            for(var j=n+1; j<tieredPseudoClassesKeys.length-(k-2); j++) {
                var result = combinePseudoclasses(tieredPseudoClasses, [keyA].concat(tieredPseudoClassesKeys.slice(j, k)))
                if(result.key in tieredPseudoClasses) {
                    utils.merge(tieredPseudoClasses[result.key], result.value)
                } else { // new key
                    tieredPseudoClasses[result.key] = result.value
                }
            }
        }
    }
}



// keys is a list of objects where each object has the members:
    // key - the original string key
    // parts - the key split by ":"
// returns an object with the following members:
    // key - the new combined key
    // value - the new merged value
var combinePseudoclasses = function(pseudoclasses, keys) {
    var resultKeyParts = keys[0].parts
    var resultValue = utils.merge({}, pseudoclasses[keys[0].key]) // make a copy
    for(var n=1; n<keys.length; n++) {
        var key = keys[n]
        // merge all psuedoclasses that don't already exist into the resultKey
        for(var j=0; j<key.parts.length; j++) {
            var part = key.parts[j]
            if(resultKeyParts.indexOf(part) === -1) {
                resultKeyParts.push(part)
            }
        }

        // merge the value into resultValue
        utils.merge(resultValue, pseudoclasses[key.key])
    }

    return {key: resultKeyParts.join(':'), value: resultValue}
}

// a map of pseudoclass names and how they are emulated with javascript
// each pseudoclass sets up the following functions:
    // check - a function that checks if that pseudoclass currently applies to the component when its called
    // setup - calls a callback when the pseudoClass starts and stops applying
        // should return an object that will be passed to the kill function (as its 'state' parameter)
    // kill - cleans up anything set up in the 'setup' function
    // processParameter - takes the pseudoclass parameter and returns some object representing it that will be used by the setup and check functions
var emulatedPseudoClasses = {
    hover: {
        check: function(component) {
            var nodes = document.querySelectorAll( ":hover" )
            for(var n=0; n<nodes.length; n++) {
                if(nodes[n] === component.domNode) {
                    return true
                }
            }
            return false
        },
        setup: function(component, startCallback, endCallback) {
            component.on("mouseover", function() {
                startCallback()
            })
            component.on("mouseout", endCallback)

            return {start: startCallback, end: endCallback}
        },
        kill: function(component, state) {
            component.off("mouseover", state.start)
            component.off("mouseout", state.end)
        }
    },
    checked: {
        check: function(component) {
            return component.selected
        },
        setup: function(component, startCallback, endCallback) {
            var setupState = {}
            component.on("change", setupState.listener = function() {
                if(component.selected) {
                    startCallback()
                } else {
                    endCallback()
                }
            })

            return setupState
        },
        kill: function(component, state) {
            component.removeListener("change", state.listener)
        }
    },
    required: {
        check: function(component) {
            return component.attr('required') !== undefined
        },
        setup: function(component, startCallback, endCallback) {
            var observer = new MutationObserver(function() {
                if(component.attr('required') !== undefined) {
                    startCallback()
                } else {
                    endCallback()
                }
            })

            observer.observe(component.domNode, {attributes: true})

            return {observer: observer}
        },
        kill: function(component, state) {
            state.observer.disconnect()
        }
    },
    'last-child': {
        check: function(component) {
            return nthLastChildCheck(component, '1')
        },
        setup: function(component, startCallback, endCallback) {
            var observer = new MutationObserver(function() {
                if(nthLastChildCheck(component, '1')) {
                    startCallback()
                } else {
                    endCallback()
                }
            })

            var setupObserver = function() {
                // note that since this uses the component parent rather than domNode.parentNode, this won't work for components added to non-component nodes (and there's no good way to do it, because you would have to poll for parent changes)
                observer.observe(component.parent.domNode, {childList: true})
            }

            if(component.parent !== undefined) {
                setupObserver()
            }

            component.on('newParent', function() {
                setupObserver()
            })
            component.on('parentRemoved', function() {
                observer.disconnect()
            })

            return {observer: observer}
        },
        kill: function(component, state) {
            state.observer.disconnect()
        }
    },
    'nth-child': {
        // todo: support full an+b parameters for nth-child https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child
        check: function(component, parameterCheck) {
            return nthChildCheck(component, parameterCheck)
        },
        setup: function(component, startCallback, endCallback, parameterCheck) {

            var checkAndCallCallbacks = function() {
                if(nthChildCheck(component, parameterCheck)) {
                    startCallback()
                } else {
                    endCallback()
                }
            }

            var observer = new MutationObserver(function() {
                checkAndCallCallbacks()
            })

            var setupObserver = function() {
                // note that since this uses the component parent rather than domNode.parentNode, this won't work for components added to non-component nodes (and there's no good way to do it, because you would have to poll for parent changes)
                observer.observe(component.parent.domNode, {childList: true})
            }

            if(component.parent !== undefined) {
                setupObserver()
            }

            component.on('newParent', function() {
                setupObserver()
                checkAndCallCallbacks()
            })
            component.on('parentRemoved', function() {
                observer.disconnect()
                checkAndCallCallbacks()
            })

            return {observer: observer}
        },
        kill: function(component, state) {
            state.observer.disconnect()
        },
        processParameter: function(parameter) {
            return nthChildParameterFn(parameter)
        }
    },

    // not's parameter is a statement consisting of pseudoclasses separated either by & or ,
    // $$not(pseudoclass1&pseudoclass2,psuedoclass3) translates to the css :not(:pseudoclass1:pseudoclass2,:psuedoclass3)
    /*not: {
        check: function() {

        },
    }*/
}

// name is the name of the new pseudoclass
// fns is an object with the members:
    // check(component) - returns true if the pseudoclass applies to the component
    // setup(component, startCallback, endCallback, parameter) - a function that should call startCallback when the pseudoclass starts applying, and endCallback when it stops applying
        // parameter - the parameter passed to the pseudoclass (e.g. in :not(:first-child), ":first-child" is the parameter)
    // kill - a function that cleans up any event listeners or anything else set up in the 'setup' function
module.exports.addPseudoClass = function(name, fns) {
    if(emulatedPseudoClasses[name] !== undefined) throw new Error("The pseudoclass '"+name+"' is already defined.")
    // else
    emulatedPseudoClasses[name] = fns
}


function nthChildCheck(component, testFn) {
    if(component.domNode.parentNode === null)
        return false

    var children = component.domNode.parentNode.children                    // must be domNode.parentNode, because child nodes may not be Components
    var index = Array.prototype.indexOf.call(children, component.domNode)
    return testFn(index)
}

function nthLastChildCheck(component, parameter) {
    if(component.domNode.parentNode === null)
        return false

    var children = component.domNode.parentNode.children                    // must be domNode.parentNode, because child nodes may not be Components
    var index = children.length - parseInt(parameter)
    return children[index] === component.domNode
}

// returns a function that takes an index and tell you if that index applies to the nthChildParameter
var nthChildParameter = /^(((-?\d*)(([+-]\d*)n?)?)|((-?\d)*n?([+-]\d*)?))$/
function nthChildParameterFn(parameter) {
    var parts = parameter.match(nthChildParameter)
    if(parts === null)
        throw new Error("nth-child parameter '"+parameter+"' isn't valid")

    if(parts[2] !== undefined) {
        var constant = parts[3]
        var variable = parts[5]
    } else {
        var constant = parts[8]
        var variable = parts[7]
    }

    if(constant === undefined) constant = 0
    else                       constant = parseInt(constant)
    if(variable === undefined) variable = 0
    else                       variable = parseInt(variable)

    if(variable === 0) {
        return function(index) {
            return index+1 === constant
        }
    } else {
        return function(index) {
            return ((index+1-constant)/variable) % 1 === 0
        }
    }

}

// maps a style value to a css value
// style values that are numbers are mapped to strings, usually with px postfix
function cssValue(cssStyleName, value) {
    // If a number was passed in, add 'px' to the (except for certain CSS properties) [also taken from jquery's code]
    if(typeof(value) === "number" && cssNumber[cssStyleName] === undefined) {
        return value+"px"
    } else {
        return value.toString()
    }
}

function createPseudoClassRules(that, pseudoClass, selector, pseudoClassStyle) {

    var pseudoClassCss = {}
    for(var key in pseudoClassStyle) {
        var value = pseudoClassStyle[key]

        if(!(value instanceof Object)) {
            var cssStyle = key
            var cssStyleName = mapCamelCase(cssStyle)
            pseudoClassCss[cssStyleName] = cssValue(cssStyleName, value)
        } else {
            throw new Error("All properties within the pseudoclasses '"+pseudoClass+"' must be css styles")
        }
    }

    // create immediate pseudo class style
    defaultJss.set(selector, pseudoClassCss) // create the css class with the pseudoClass

    //if(module.exports.isDev) {
        that.styleDefinitions = {}
        that.styleDefinitions[selector] = pseudoClassCss
    //}
}

// throws exceptions for various style configurations that are unsupported by pure pseudo classes (ones that can't be emulated usuing javascript)
function validatePurePseudoClassStyles(pseudoClass, pseudoClassStyles) {
    for(var key in pseudoClassStyles) {
        var value = pseudoClassStyles[key]

        if(isStyleObject(value)) {
            throw new Error("Can't set the pseudoclasses '"+pseudoClass+"' to a Style object")
        } else if(key === '$setup') {
            throw new Error("$setup can't be used within the pseudoclasses '"+pseudoClass+"'")
        } else if(key === '$kill') {
            throw new Error("$kill can't be used within the pseudoclasses '"+pseudoClass+"'")
        } else if(key.indexOf('$') === 0) {   // label style
            throw new Error("Block labels can't be used within the pseudoclasses '"+pseudoClass+"'")
        }
    }
}

// e.g. pulls out 'nth-child' and '2+3n' from 'nth-child(2+3n)'
var pseudoClassRegex = /^([^(]*)(\((.*)\))?$/
function getPseudoClassParts(fullPsuedoClass) {
    var x = fullPsuedoClass.match(pseudoClassRegex)
    if(x === null) throw new Error("Pseudoclass '"+fullPsuedoClass+"' is invalid")
    return {class: x[1], parameter: x[3]}
}


// takes in a list of pseudoClassRules and changes any nesting like {hover: {focus: {}}} into something like {hover: {}, "hover:focus": {}}
// also does some validation
function flattenPseudoClassStyles(pseudoClass, pseudoClassStyle) {
    var nonPseudoClassStyles = {}
    var subpseudoClasses = {}
    for(var key in pseudoClassStyle) {
        var value = pseudoClassStyle[key]

        if(key.indexOf('$$') === 0) { // pseudo-class style
            var subPseudoClass = key.substr(2)
            if(subPseudoClass === '') {
                throw new Error("Empty pseudo-class name not valid (style key '$$')")
            }

            subpseudoClasses[subPseudoClass] = value
        } else {
            nonPseudoClassStyles[key] = value
        }
    }

    // create flattened styles (with merged in styles from its parent pseudoclass
    var flattenedStyles = {}
    for(var subPseudoClass in subpseudoClasses) {
        var value = subpseudoClasses[subPseudoClass]

        if(isStyleObject(value)) {
            flattenedStyles[pseudoClass+":"+subPseudoClass] =  value
        } else {
            utils.merge(flattenedStyles, flattenPseudoClassStyles(pseudoClass+":"+subPseudoClass, utils.merge({}, nonPseudoClassStyles, value)))
        }
    }

    // write the top-level pseudoClass
    flattenedStyles[pseudoClass] = nonPseudoClassStyles

    return flattenedStyles
}


// taken from jquery's code
var cssNumber = {
    "column-count": 1,
    "fill-opacity": 1,
    "flex-grow": 1,
    "flex-shrink": 1,
    "font-weight": 1,
    "line-height": 1,
    "opacity": 1,
    "order": 1,
    "orphans": 1,
    "widows": 1,
    "z-index": 1,
    "zoom": 1
}

function isStyleObject(o) {
    return o.componentStyleMap !== undefined
}


var asciiA = 'A'.charCodeAt(0), asciiZ = 'Z'.charCodeAt(0), difference = 'a'.charCodeAt(0) - asciiA
function mapCamelCase(cssStyleName) {
    for(var n=0; n<cssStyleName.length; n++) {
        var ascii = cssStyleName.charCodeAt(n)
        if(asciiA <= ascii && ascii <= asciiZ) { // found capital letter
            cssStyleName = cssStyleName.slice(0, n) + '-'+String.fromCharCode(ascii+difference) + cssStyleName.slice(n+1)
            n++ // increment a second time for the dash
        }
    }

    return cssStyleName
}

// maps all the styles that are inherited by descendant nodes to their default values
// source: http://stackoverflow.com/questions/5612302/which-css-styles-are-inherited
var defaultStyleValues = {
    'azimuth': 'center',
    'border-collapse': 'separate',
    'border-spacing': '0',
    'caption-side': 'top',
    //'color': 'black',         // let this inherit
    //'cursor': 'auto',         // let this one inherit - its weird otherwise
    'direction': 'ltr',
     display: 'inline-block', // changes the default display to inline-block
    'elevation': '',
    'empty-cells': 'show',
    // 'font-family': '',       // let this inherit
    // 'font-size': 'medium',   // let this inherit
    //'font-style': 'normal',   // let this inherit
    //'font-variant': 'normal', // let this inherit
    //'font-weight': 'normal',  // let this inherit
    'letter-spacing': 'normal',
    'line-height': 'normal',
    'list-style-image': 'none',
    'list-style-position': 'outside',
    'list-style-type': 'disc',
    'orphans': '2',
    'pitch-range': '',
    'pitch': '',
     position: 'relative', // changes the default positioning so that absolute is relative to its parent by default
    'quotes': '',
    'richness': '',
    'speak-header': '',
    'speak-numeral': '',
    'speak-punctuation': '',
    'speak': '',
    'speak-rate': '',
    'stress': '',
    'text-align': 'left',
    'text-indent': '0',
    'text-transform': 'none',
    //'visibility': 'visible',    // let this inherit - otherwise you just hide the container and not the contents
    'voice-family': '',
    'volume': '',
    'white-space': 'normal',
    'widows': '2',
    'word-spacing': 'normal'
}



// returns index of the passed css classname, or undefined if sheet containing that class isn't found
function cssClassSheetIndex(classname) {
    var result = undefined

    var styleNodes = document.querySelectorAll("style")
    for(var n=0; n<styleNodes.length; n++) {
        var sheet = styleNodes[n].sheet
        jssModule.defaultSheet = sheet

        var defaultStyleMaybe = jssModule.get(classname)
        if(Object.keys(defaultStyleMaybe).length > 0) {
            result = n
            break
        }
    }

    jssModule.defaultSheet = undefined
    return result
}


var defaultJss = jssModule.forDocument(document) // must be created before the jss object (so that the styles there override the styles in the default sheet)
var jss = jssModule.forDocument(document)

var defaultClassSheetIndex = cssClassSheetIndex('.'+Style.defaultClassName)
if(defaultClassSheetIndex === undefined) {
    defaultJss.defaultSheet = defaultJss._createSheet() // create its sheet first (before the regular jss sheet)

    jss.defaultSheet = jss._createSheet()

    defaultJss.set('.'+Style.defaultClassName, defaultStyleValues) // creates default css class in order to prevent inheritance

    defaultJss.set('input', { // chrome and firefox user agent stylesheets mess with this otherwise
        cursor: 'inherit'
    })
} else {
    // if the default styleclass *already* exists, it probably means that blocks.js is being loaded twice
    console.log("Warning: the default-styles class name for blocks.js looks like its already in use. This probably means you have two versions of blocks.js loaded. If so, Blocks.js will continue to work, but your app will be a bit bloated. If something other than block.js created that class, blocks.js may break that style.")

    var styleNodes = document.querySelectorAll("style")
    defaultJss.defaultSheet = styleNodes[defaultClassSheetIndex].sheet
    jss.defaultSheet = styleNodes[defaultClassSheetIndex+1].sheet

    // make sure the baseClassName isn't already taken
    var dedupNumber = 0
    while(true) {
        var testBaseClassName = baseClassName+dedupNumber
        if(cssClassSheetIndex('.'+testBaseClassName+dedupNumber+0) !== undefined) {
            dedupNumber++
        } else {
            break;
        }
    }

    baseClassName = testBaseClassName+dedupNumber
}


/*private*/ module.exports.isDev; // should be set by Block

var computedStyles = module.exports.computedStyles = new HashMap() // stores a map from styleMap components, to the combined style map



/***/ }),
/* 9 */
/*!*******************!*\
  !*** ../utils.js ***!
  \*******************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.resolver = function () {
    var resolve, reject;
    var f = new Promise(function (inResolve, inReject) {
        resolve = inResolve;
        reject = inReject;
    });
    return {
        f: f,
        resolve: resolve,
        reject: reject
    };
};
exports.equal = function (a, b) {
    if (a instanceof Array) {
        if (!(b instanceof Array)) 
            return false;
        if (a.length !== b.length) {
            return false;
        } else {
            for (var n = 0;n < a.length; n++) {
                if (!exports.equal(a[n], b[n])) {
                    return false;
                }
            }
            return true;
        }
    } else if (a instanceof Object) {
        if (!(b instanceof Object)) 
            return false;
        var aKeys = getKeys(a);
        var bKeys = getKeys(b);
        if (aKeys.length !== bKeys.length) {
            return false;
        } else {
            for (var n = 0;n < aKeys.length; n++) {
                var key = aKeys[n];
                var aVal = a[key];
                var bVal = b[key];
                if (!exports.equal(aVal, bVal)) {
                    return false;
                }
            }
            return true;
        }
    } else {
        return a === b || Number.isNaN(a) && Number.isNaN(b);
    }
};
function getKeys(x) {
    var keys = [];
    for (var k in x) {
        if (x[k] !== undefined && Object.prototype.hasOwnProperty.call(x, k)) {
            keys.push(k);
        }
    }
    return keys;
}



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFx1dGlscy5qcyhvcmlnaW5hbCkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBQSxDQUFRLFFBQVIsQ0FBQSxDQUFBLENBQW1CLFlBQVc7SUFDMUIsR0FBQSxDQUFJLFNBQVM7SUFDYixHQUFBLENBQUksSUFBSSxJQUFJLE9BQUosQ0FBWSxVQUFTLFNBQVcsRUFBQSxVQUFVO1FBQzlDLE9BQUEsQ0FBQSxDQUFBLENBQVU7UUFDVixNQUFBLENBQUEsQ0FBQSxDQUFTO0lBQ2pCO0lBRUksT0FBTztRQUFDLEdBQUcsQ0FBSixDQUFBO1FBQU8sU0FBUSxPQUFmLENBQUE7UUFBd0IsUUFBTzs7QUFDMUM7QUFHQSxPQUFBLENBQVEsS0FBUixDQUFBLENBQUEsQ0FBZ0IsVUFBUyxDQUFFLEVBQUEsR0FBRztJQUMxQixJQUFHLENBQUEsQ0FBQSxVQUFBLENBQWEsT0FBTztRQUNuQixJQUFHLEVBQUUsQ0FBQSxDQUFBLFVBQUEsQ0FBYTtZQUNkLE9BQU87UUFDWCxJQUFHLENBQUEsQ0FBRSxNQUFGLENBQUEsR0FBQSxDQUFhLENBQUEsQ0FBRSxRQUFRO1lBQ3RCLE9BQU87UUFDbkIsT0FBZTtZQUNILEtBQUksR0FBQSxDQUFJLElBQUUsRUFBRyxDQUFBLENBQUEsQ0FBQSxDQUFFLENBQUEsQ0FBRSxRQUFRLENBQUEsSUFBSztnQkFDMUIsSUFBRyxDQUFDLE9BQUEsQ0FBUSxLQUFSLENBQWMsQ0FBQSxDQUFFLElBQUcsQ0FBQSxDQUFFLEtBQUs7b0JBQzFCLE9BQU87Z0JBQzNCO1lBQ0E7WUFFWSxPQUFPO1FBQ25CO0lBQ0EsT0FBVyxJQUFHLENBQUEsQ0FBQSxVQUFBLENBQWEsUUFBUTtRQUMzQixJQUFHLEVBQUUsQ0FBQSxDQUFBLFVBQUEsQ0FBYTtZQUNkLE9BQU87UUFFWCxHQUFBLENBQUksUUFBUSxPQUFBLENBQVE7UUFDcEIsR0FBQSxDQUFJLFFBQVEsT0FBQSxDQUFRO1FBRXBCLElBQUcsS0FBQSxDQUFNLE1BQU4sQ0FBQSxHQUFBLENBQWlCLEtBQUEsQ0FBTSxRQUFRO1lBQzlCLE9BQU87UUFDbkIsT0FBZTtZQUNILEtBQUksR0FBQSxDQUFJLElBQUUsRUFBRyxDQUFBLENBQUEsQ0FBQSxDQUFFLEtBQUEsQ0FBTSxRQUFRLENBQUEsSUFBSztnQkFDOUIsR0FBQSxDQUFJLE1BQU0sS0FBQSxDQUFNO2dCQUNoQixHQUFBLENBQUksT0FBTyxDQUFBLENBQUU7Z0JBQ2IsR0FBQSxDQUFJLE9BQU8sQ0FBQSxDQUFFO2dCQUViLElBQUcsQ0FBQyxPQUFBLENBQVEsS0FBUixDQUFjLE1BQUssT0FBTztvQkFDMUIsT0FBTztnQkFDM0I7WUFDQTtZQUVZLE9BQU87UUFDbkI7SUFDQSxPQUFXO1FBQ0gsT0FBTyxDQUFBLENBQUEsR0FBQSxDQUFJLENBQUosQ0FBQSxFQUFBLENBQVMsTUFBQSxDQUFPLEtBQVAsQ0FBYSxFQUFiLENBQUEsRUFBQSxDQUFtQixNQUFBLENBQU8sS0FBUCxDQUFhO0lBQ3hEO0FBQ0E7QUFHQSxTQUFTLFFBQVEsR0FBRztJQUNoQixHQUFBLENBQUksT0FBSztJQUNULEtBQUksR0FBQSxDQUFJLEtBQUssR0FBRztRQUNaLElBQUcsQ0FBQSxDQUFFLEVBQUYsQ0FBQSxHQUFBLENBQVMsU0FBVCxDQUFBLEVBQUEsQ0FBc0IsTUFBQSxDQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBRSxJQUFJO1lBQ2hFLElBQUEsQ0FBSyxJQUFMLENBQVU7UUFDdEI7SUFDQTtJQUVJLE9BQU87QUFDWDs7QUFqRUEiLCJmaWxlIjoiRDpcXGJpbGx5c0ZpbGVcXGNvZGVcXGphdmFzY3JpcHRcXG1vZHVsZXNcXHJwZXAuanNcXHV0aWxzLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuZXhwb3J0cy5yZXNvbHZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJlc29sdmUsIHJlamVjdFxyXG4gICAgdmFyIGYgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihpblJlc29sdmUsIGluUmVqZWN0KSB7XHJcbiAgICAgICAgcmVzb2x2ZSA9IGluUmVzb2x2ZVxyXG4gICAgICAgIHJlamVjdCA9IGluUmVqZWN0XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiB7ZjogZiwgcmVzb2x2ZTpyZXNvbHZlLCByZWplY3Q6cmVqZWN0fVxyXG59XHJcblxyXG4vLyBjb21wYXJlcyBhcnJheXMgYW5kIG9iamVjdHMgZm9yIHZhbHVlIGVxdWFsaXR5IChhbGwgZWxlbWVudHMgYW5kIG1lbWJlcnMgbXVzdCBtYXRjaClcclxuZXhwb3J0cy5lcXVhbCA9IGZ1bmN0aW9uKGEsYikge1xyXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgaWYoIShiIGluc3RhbmNlb2YgQXJyYXkpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICBpZihhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yKHZhciBuPTA7IG48YS5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWV4cG9ydHMuZXF1YWwoYVtuXSxiW25dKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYoYSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgIGlmKCEoYiBpbnN0YW5jZW9mIE9iamVjdCkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG5cclxuICAgICAgICB2YXIgYUtleXMgPSBnZXRLZXlzKGEpXHJcbiAgICAgICAgdmFyIGJLZXlzID0gZ2V0S2V5cyhiKVxyXG5cclxuICAgICAgICBpZihhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IodmFyIG49MDsgbjxhS2V5cy5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGFLZXlzW25dXHJcbiAgICAgICAgICAgICAgICB2YXIgYVZhbCA9IGFba2V5XVxyXG4gICAgICAgICAgICAgICAgdmFyIGJWYWwgPSBiW2tleV1cclxuXHJcbiAgICAgICAgICAgICAgICBpZighZXhwb3J0cy5lcXVhbChhVmFsLGJWYWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGE9PT1iIHx8IE51bWJlci5pc05hTihhKSAmJiBOdW1iZXIuaXNOYU4oYilcclxuICAgIH1cclxufVxyXG5cclxuLy8gY291bnRzIG9iamVjdCBvd24ta2V5cyBpZ25vcmluZyBwcm9wZXJ0aWVzIHRoYXQgYXJlIHVuZGVmaW5lZFxyXG5mdW5jdGlvbiBnZXRLZXlzKHgpIHtcclxuICAgIHZhciBrZXlzPVtdXHJcbiAgICBmb3IodmFyIGsgaW4geCkge1xyXG4gICAgICAgIGlmKHhba10gIT09IHVuZGVmaW5lZCAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCxrKSkge1xyXG4gICAgICAgICAgICBrZXlzLnB1c2goaylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGtleXNcclxufSJdfQ==


/***/ }),
/* 10 */
/*!****************************************!*\
  !*** ../node_modules/isarray/index.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 11 */
/*!******************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/codec-base.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// codec-base.js

var IS_ARRAY = __webpack_require__(/*! isarray */ 10);

exports.createCodec = createCodec;
exports.install = install;
exports.filter = filter;

var Bufferish = __webpack_require__(/*! ./bufferish */ 0);

function Codec(options) {
  if (!(this instanceof Codec)) return new Codec(options);
  this.options = options;
  this.init();
}

Codec.prototype.init = function() {
  var options = this.options;

  if (options && options.uint8array) {
    this.bufferish = Bufferish.Uint8Array;
  }

  return this;
};

function install(props) {
  for (var key in props) {
    Codec.prototype[key] = add(Codec.prototype[key], props[key]);
  }
}

function add(a, b) {
  return (a && b) ? ab : (a || b);

  function ab() {
    a.apply(this, arguments);
    return b.apply(this, arguments);
  }
}

function join(filters) {
  filters = filters.slice();

  return function(value) {
    return filters.reduce(iterator, value);
  };

  function iterator(value, filter) {
    return filter(value);
  }
}

function filter(filter) {
  return IS_ARRAY(filter) ? join(filter) : filter;
}

// @public
// msgpack.createCodec()

function createCodec(options) {
  return new Codec(options);
}

// default shared codec

exports.preset = createCodec({preset: true});


/***/ }),
/* 12 */
/*!*********************************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/src/node_modules/Block.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitterB = __webpack_require__(/*! EventEmitterB */ 56)
var proto = __webpack_require__(/*! proto */ 2);
var trimArguments = __webpack_require__(/*! trimArguments */ 57)
var observe = __webpack_require__(/*! observe */ 58)

var utils = __webpack_require__(/*! ./utils */ 7)
var domUtils = __webpack_require__(/*! ./domUtils */ 60)
var blockStyleUtils = __webpack_require__(/*! ./blockStyleUtils */ 27)

var Style = __webpack_require__(/*! ./Style */ 8)
Style.isDev = function() {return module.exports.dev}

var components = {};

var setOfBrowserEvents = utils.arrayToMap([
    'abort','afterprint','animationend','animationiteration','animationstart','audioprocess','beforeprint','beforeunload',
    'beginEvent','blocked','blur','cached','canplay','canplaythrough','change','chargingchange','chargingtimechange',
    'checking','click','close','compassneedscalibration','complete','compositionend','compositionstart','compositionupdate','contextmenu',
    'copy','cut','dblclick','decivelight','devicemotion','deviceorientation','deviceproximity','dischargingtimechange','DOMContentLoaded',
    'downloading','drag','dragend','dragenter','dragleave','dragover','dragstart','drop','durationchange','emptied','ended','endEvent',
    'error','focus','focusin','focusout','fullscreenchange','fullscreenerror','gamepadconnected','gamepaddisconnected','hashchange',
    'input','invalid','keydown','keypress','keyup','languagechange','levelchange','load','loadeddata','loadedmetadata','loadend',
    'loadstart','message','mousedown','mouseenter','mouseleave','mousemove','mouseout','mouseover','mouseup','noupdate','obsolete',
    'offline','online','open','orientationchange','pagehide','pageshow','paste','pause','pointerlockchange','pointerlockerror','play',
    'playing','popstate','progress','ratechange','readystatechange','repeatEvent','reset','resize','scroll','seeked','seeking','select',
    'show','stalled','storage','submit','success','suspend','SVGAbort','SVGError','SVGLoad','SVGResize','SVGScroll','SVGUnload','SVGZoom',
    'timeout','timeupdate','touchcancel','touchend','touchenter','touchleave','touchmove','touchstart','transitionend','unload',
    'updateready','upgradeneeded','userproximity','versionchange','visibilitychange','volumechange','waiting','wheel'
])

// events:
    // newParent - emits this when a component gets a new parent
    // parentRemoved - emits this when a component is detached from its parent
var Block = module.exports = proto(EventEmitterB,function(superclass) {

    // static properties

    // constructor
	this.init = function() {
        var that = this

        if(this.name === undefined) {
            throw new Error("The 'name' property is required for Blocks")
        }

        var defaultBlockStyle = blockStyleUtils.defaultStyleMap.get(this.constructor)
        if(defaultBlockStyle === undefined) {
            defaultBlockStyle = blockStyleUtils.createDefaultBlockStyle(this)
        }

        superclass.init.call(this)

        this.children = []
        this.state = observe({})
        this.parent = undefined;

		if (this.id !== undefined) {
			components[this.id] = this;
		}

        if(this.domNode === undefined) {
            this.domNode = domUtils.div()
        }

        this.build.apply(this, arguments)

        //if(module.exports.dev) {
            this.attr('blkName', this.name)
        //}

        var classList = [this.domNode.className]
        if(defaultBlockStyle !== false) classList.push(defaultBlockStyle.className)
        classList.push(Style.defaultClassName)
        this.domNode.className = classList.join(' ') // note that the order of classes doesn't matter

        // set up dom event handlers
        var ifonHandlers={}
        that.ifon(function(event) {
            if(event in setOfBrowserEvents && (that.excludeDomEvents === undefined || !(event in that.excludeDomEvents))) {
                that.domNode.addEventListener(event, ifonHandlers[event]=function() {
                    that.emit.apply(that, [event].concat(Array.prototype.slice.call(arguments)))
                })
            }
        })
        that.ifoff(function(event) {
            if(event in setOfBrowserEvents && (that.excludeDomEvents === undefined || !(event in that.excludeDomEvents))) {
                that.domNode.removeEventListener(event,ifonHandlers[event])
            }
        })
	}

    // sub-constructor - called by the constructor
    // parameters:
        // label - (Optional) A label that can be used to style a component differently.
                   // Intended to be some string describing what the component is being used for.
                   // Note, tho, that labels are not dynamic - changing the label won't affect styling until a new style is applied to the component)
        // domNode - (Optional) A domNode to be used as the container domNode instead of the default (a div)
    this.build = function(/*[label,] domNode*/) {
        if(arguments.length === 1) {
            this.domNode = arguments[0]
        } else if(arguments.length >= 2) {
            this.label = arguments[0]
            this.domNode = arguments[1]
        }
    }
	

	// instance properties

	
	this.domNode;
    this.label;
    this.excludeDomEvents;
    this.children;     // a list of child components that are a part of a Block object (these are used so Styles can be propogated down to child components)


    Object.defineProperty(this, 'label', {
        get: function() {
            return this._label
        }, set: function(v) {
            if(this._label === undefined) {
                this._label = v

                if(module.exports.dev) {
                    this.attr('label', this._label)
                }
            } else {
                throw new Error("A Block's label can only be set once (was already set to: "+this._label+")")
            }
        }
    })

    // adds elements to the components main domNode
    // arguments can be one of the following:
        // component, component, component, ...
        // listOfBlocks
    this.add = function() {
        this.addAt.apply(this, [this.domNode.children.length].concat(trimArguments(arguments)))
	}

    // adds nodes at a particular index
    // nodes can be one of the following:
        // component, component, component, ...
        // listOfBlocks
    this.addAt = function(index/*, nodes...*/) {
        var nodes = normalizeAddAtArguments.apply(this, arguments)

        for (var i=0;i<nodes.length;i++) {
			var node = nodes[i];
            this.children.splice(index+i, 0, node)

            if(!isBlock(node)) {
                throw new Error("node is not a Block")
            }

            node.parent = undefined
            node.emit('parentRemoved')

            var beforeChild = this.children[1+i+index]
            if(beforeChild === undefined) {
                this.domNode.appendChild(node.domNode)
            } else {
                this.domNode.insertBefore(node.domNode, beforeChild.domNode)
            }

            node.parent = this;
            node.emit('newParent')

            // apply styles
            //if(itsaBlock) { // its always a component now
                var that = this
                node.getParentStyleMap = function() {return that.computedStyleMap}
                blockStyleUtils.propogateStyleSet([node], this.computedStyleMap)
            //}
		}
    }

	// add a list of nodes before a particular node
    // if beforeChild is undefined, this will append the given nodes
    // arguments can be one of the following:
        // component, component, component, ...
        // listOfBlocks
    this.addBefore = this.addBeforeNode = function(beforeChild) {
        var nodes = trimArguments(arguments).slice(1)
        if(beforeChild === undefined) {
            this.add.apply(this, nodes)
        } else {
            var index = this.children.indexOf(beforeChild)
            this.addAt.apply(this, [index].concat(nodes))
        }
    }


    // arguments can be one of the following:
        // component, component, component, ...
        // index, index, index, ... - each index is the numerical index to remove
        // arrayOfComponents
        // arrayOfIndexes
    this.remove = function() {
        var removals = normalizeRemoveArguments.apply(this, arguments)
        removals = removals.sort(function(a,b) {
            return b-a // reverse sort (so that removing multiple indexes doesn't mess up)
        })

        for(var n=0; n<removals.length; n++) {
            var r = removals[n]
            var c = this.children[r]

            if(c === undefined) {
                throw new Error("There is no child at index "+r)
            }

            c.parent = undefined
            this.children.splice(r, 1)
            this.domNode.removeChild(this.domNode.childNodes[r])

            c.emit('parentRemoved')
        }
    }

    // sets or gets an attribute on the components domNode
    // parameter sets:
    // if one argument is passed, the attribute's value is returned (if there is no attribute, undefined is returned)
    // if there are two arguments passed, the attribute is set
        // if 'value' is undefined, the attribute is removed
    this.attr = function(/*attribute, value OR attributeObject*/) {
        if(arguments.length === 1) {
            if(arguments[0] instanceof Object) {
                var attributes = arguments[0]
                for(var attribute in attributes) {
                    domUtils.setAttribute(this.domNode, attribute, arguments[0][attribute])
                }
            } else {
                var attribute = this.domNode.getAttribute(arguments[0])
                if(attribute === null) {
                    return undefined // screw null
                } else {
                    return attribute
                }
            }
        } else {
            var attribute = arguments[0]
            if(arguments[1] !== undefined) {
                var value = arguments[1]
                domUtils.setAttribute(this.domNode, arguments[0], value)
            } else {
                this.domNode.removeAttribute(attribute)
            }
        }
    }

    Object.defineProperty(this, 'visible', {
        // returns true if the element is visible
        get: function() {
            return this.domNode.style.display !== 'none';

        // sets whether or not the element is visible
        }, set: function(setToVisible) {
            if(setToVisible) {
                if (this._displayStyle !== undefined) {
                    this.domNode.style.display = this._displayStyle // set back to its previous inline style
                    this._displayStyle = undefined
                } else {
                    this.domNode.style.display = ''
                }
            } else {
                if(this.domNode.style.display !== '' && this.domNode.style.display !== 'none') { // domNode has inline style
                    this._displayStyle = this.domNode.style.display
                }

                this.domNode.style.display = 'none'
            }
        }
    })


    Object.defineProperty(this, 'focus', {
        // returns true if the element is in focus
        get: function() {
            return document.activeElement === this.domNode

        // sets whether or not the element is in focus (setting it to true gives it focus, setting it to false blurs it)
        }, set: function(setToInFocus) {
            if(setToInFocus) {
                this.domNode.focus()
            } else {
                this.domNode.blur()
            }
        }
    })

    Object.defineProperty(this, 'style', {
        get: function() {
            return this._style

        // sets the style, replacing one if one already exists
        }, set: function(styleObject) {
            if(styleObject === undefined) {
                var styleMap = this.getParentStyleMap()
                if(styleMap !== undefined) {
                    blockStyleUtils.setCurrentStyle(this, blockStyleUtils.getStyleForComponent(styleMap, this))
                } else {
                    blockStyleUtils.setCurrentStyle(this, undefined)
                }

                this.computedStyleMap = styleMap

            } else {
                blockStyleUtils.setCurrentStyle(this, styleObject)
                var specificStyle = styleObject.get(this)
                if(this.getParentStyleMap() !== undefined) {
                    this.computedStyleMap = blockStyleUtils.styleMapConjunction(this.getParentStyleMap(), specificStyle.componentStyleMap)
                } else {
                    this.computedStyleMap = specificStyle.componentStyleMap
                }
            }

            this._style = styleObject
            blockStyleUtils.propogateStyleSet(this.children, this.computedStyleMap) // propogate styles to children
        }
    })

    Object.defineProperty(this, 'selectionRange', {
        // returns the visible character selection range inside the element
        // returns an array like [offsetStart, offsetEnd]
        get: function() {
            return domUtils.getSelectionRange(this.domNode)

        // sets the visible character selection range
        }, set: function(selection) {
            domUtils.setSelectionRange(this.domNode, selection[0], selection[1])
        }
    })

    this.attach = function() {
        attach(this)
    }
    this.detach = function() {
        detach(this)
    }


	// private instance variables/functions

    this.getParentStyleMap = function() {/*default returns undefined*/}  // should be set to a function that returns the computedStyleMap of the component containing this one (so Styles objects can be inherited)
    this.computedStyleMap;  // a map of style objects computed from the Styles set on a given component and its parent components

	this._style;              // the object's explicit Style object (undefined if it inherits a style)
    this.currentStyle;       // the object's current Style (inherited or explicit)
    this._displayStyle;      // temporariliy stores an inline display style while the element is hidden (for use when 'show' is called)
    this._styleSetupStates   // place to put states for setup functions (used for css pseudoclass emulation)
});


module.exports.dev = false // set to true to enable dom element naming (so you can see boundaries of components when inspecting the dom)


// appends components to the body
var attach = module.exports.attach = function(/*component,component,.. or components*/) {
    if(arguments[0] instanceof Array) {
        var components = arguments[0]
    } else {
        var components = arguments
    }

    if(document.body === null) throw new Error("Your document does not have a body.")

    for(var n=0; n<components.length; n++) {
        document.body.appendChild(components[n].domNode)
    }
}
// removes components from the body
var detach = module.exports.detach = function(/*component,component,.. or components*/) {
    if(arguments[0] instanceof Array) {
        var components = arguments[0]
    } else {
        var components = arguments
    }

    for(var n=0; n<components.length; n++) {
        document.body.removeChild(components[n].domNode)
    }
}

// creates a body tag (only call this if document.body is null)

module.exports.createBody = function(callback) {
    var dom = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    var body = dom.createElement("body")
    dom.documentElement.appendChild(body)
    setTimeout(function() {  // set timeout is needed because the body tag is only added after javascript goes back to the scheduler
        callback()
    },0)
}




// returns a list of indexes to remove from Block.remove's arguments
/*private*/ var normalizeRemoveArguments = module.exports.normalizeRemoveArguments = function() {
    var that = this

    if(arguments[0] instanceof Array) {
        var removals = arguments[0]
    } else {
        var removals = Array.prototype.slice.call(arguments)
    }

    return removals.map(function(removal, parameterIndex) {
        if(isBlock(removal)) {
            var index = that.children.indexOf(removal)
            if(index === -1) {
                throw new Error("The Block passed at index "+parameterIndex+" is not a child of this Block.")
            }
            return index
        } else {
            return removal
        }

    })
}

// returns a list of nodes to add
/*private*/ var normalizeAddAtArguments = module.exports.normalizeAddAtArguments = function() {
    if(arguments.length === 2) {
        if(arguments[1] instanceof Array) {
            return arguments[1]
        } else {
            return [arguments[1]]
        }
    } else { // > 2
        return trimArguments(arguments).slice(1)
    }
}

function isBlock(c) {
    return c.add !== undefined && c.children instanceof Array && c.domNode !== undefined
}
function isDomNode(node) {
    return node.nodeName !== undefined
}

/***/ }),
/* 13 */
/*!**************************************!*\
  !*** ../node_modules/proto/proto.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2013 Billy Tetrud - Free to use for any purpose: MIT License*/

var noop = function() {}

var prototypeName='prototype', undefined, protoUndefined='undefined', init='init', ownProperty=({}).hasOwnProperty; // minifiable variables
function proto() {
    var args = arguments // minifiable variables

    if(args.length == 1) {
        var parent = {init: noop}
        var prototypeBuilder = args[0]

    } else { // length == 2
        var parent = args[0]
        var prototypeBuilder = args[1]
    }

    // special handling for Error objects
    var namePointer = {}    // name used only for Error Objects
    if([Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError].indexOf(parent) !== -1) {
        parent = normalizeErrorObject(parent, namePointer)
    }

    // set up the parent into the prototype chain if a parent is passed
    var parentIsFunction = typeof(parent) === "function"
    if(parentIsFunction) {
        prototypeBuilder[prototypeName] = parent[prototypeName]
    } else {
        prototypeBuilder[prototypeName] = parent
    }

    // the prototype that will be used to make instances
    var prototype = new prototypeBuilder(parent)
    namePointer.name = prototype.name

    // if there's no init, assume its inheriting a non-proto class, so default to applying the superclass's constructor.
    if(!prototype[init] && parentIsFunction) {
        prototype[init] = function() {
            parent.apply(this, arguments)
        }
    }

    // constructor for empty object which will be populated via the constructor
    var F = function() {}
        F[prototypeName] = prototype    // set the prototype for created instances

    var constructorName = prototype.name?prototype.name:''
    if(prototype[init] === undefined || prototype[init] === noop) {
        var ProtoObjectFactory = new Function('F',
            "return function " + constructorName + "(){" +
                "return new F()" +
            "}"
        )(F)
    } else {
        // dynamically creating this function cause there's no other way to dynamically name a function
        var ProtoObjectFactory = new Function('F','i','u','n', // shitty variables cause minifiers aren't gonna minify my function string here
            "return function " + constructorName + "(){ " +
                "var x=new F(),r=i.apply(x,arguments)\n" +    // populate object via the constructor
                "if(r===n)\n" +
                    "return x\n" +
                "else if(r===u)\n" +
                    "return n\n" +
                "else\n" +
                    "return r\n" +
            "}"
        )(F, prototype[init], proto[protoUndefined]) // note that n is undefined
    }

    prototype.constructor = ProtoObjectFactory;    // set the constructor property on the prototype

    // add all the prototype properties onto the static class as well (so you can access that class when you want to reference superclass properties)
    for(var n in prototype) {
        addProperty(ProtoObjectFactory, prototype, n)
    }

    // add properties from parent that don't exist in the static class object yet
    for(var n in parent) {
        if(ownProperty.call(parent, n) && ProtoObjectFactory[n] === undefined) {
            addProperty(ProtoObjectFactory, parent, n)
        }
    }

    ProtoObjectFactory.parent = parent;            // special parent property only available on the returned proto class
    ProtoObjectFactory[prototypeName] = prototype  // set the prototype on the object factory

    return ProtoObjectFactory;
}

proto[protoUndefined] = {} // a special marker for when you want to return undefined from a constructor

module.exports = proto

function normalizeErrorObject(ErrorObject, namePointer) {
    function NormalizedError() {
        var tmp = new ErrorObject(arguments[0])
        tmp.name = namePointer.name

        this.message = tmp.message
        if(Object.defineProperty) {
            /*this.stack = */Object.defineProperty(this, 'stack', { // getter for more optimizy goodness
                get: function() {
                    return tmp.stack
                },
                configurable: true // so you can change it if you want
            })
        } else {
            this.stack = tmp.stack
        }

        return this
    }

    var IntermediateInheritor = function() {}
        IntermediateInheritor.prototype = ErrorObject.prototype
    NormalizedError.prototype = new IntermediateInheritor()

    return NormalizedError
}

function addProperty(factoryObject, prototype, property) {
    try {
        var info = Object.getOwnPropertyDescriptor(prototype, property)
        if(info.get !== undefined || info.get !== undefined && Object.defineProperty !== undefined) {
            Object.defineProperty(factoryObject, property, info)
        } else {
            factoryObject[property] = prototype[property]
        }
    } catch(e) {
        // do nothing, if a property (like `name`) can't be set, just ignore it
    }
}

/***/ }),
/* 14 */
/*!***********************************!*\
  !*** ./node_modules/testUtils.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(/*! ../../utils */ 9)

// Define the functions up front, and when you call the return value, it passes the arguments you call it with to the functions in sequence
// returns a function that, each time its called, calls the next function in the list with the passed argument
// example:
/*
var sequenceX = testUtils.seq(
 function(x) {
     t.ok(x === 'a')
 },
 function(x) {
     t.ok(x === 'b')
 },
 function(x) {
     t.ok(x === 'c')
})

 var obj = {a:1,b:2,c:3}
 for(var x in obj) {
     sequenceX(x)
 }
 */
exports.seq = function(/*functions*/) {
    var n=-1
    var fns = arguments
    return function() {
        n++
        if(n>=fns.length)
            throw new Error("Unexpected call: "+n)
        // else
        fns[n].apply(this,arguments)
    }
}


exports.runTest = function(that, name, serialization, transport, options) {
    var serverTests = __webpack_require__(/*! ./rpep.server.test */ 95)
    var clientTests = __webpack_require__(/*! ./rpep.client.test */ 38)

    var one = that.test('server - '+name, serverTests(transport, serialization, options))
    var two = that.test('client - '+name, clientTests(transport, serialization, options))

    return one.complete.then(function() {
        return two.complete
    })
}

exports.createSerializationTestOptions = function(serialization) {
    var options = {
        listenerNoOnClose: [{port:1, createOnClose:false}], clientNoOnClose: [{port:1, createOnClose:false}],
        testAcceptParameters: true,
        clientErrorOptions: [{port:2, throwErrors:[new Error("failed to connect"), new Error("blarg")]}],
        clientError: "Connection couldn\'t be opened: \nError: failed to connect\nError: blarg",
        listenerErrorOptions: [{port:3, throwError:new Error("some error")}],
        listenerError: "some error",
        rawMessages: exports.createRawMessageTests(serialization),
        nextListenerOptions: function(lastOptions) {
            if(lastOptions === undefined) return [{port:6}]
            return [{port:lastOptions[0].port+1}]
        },
        nextClientOptions: function(lastOptions) {
            if(lastOptions === undefined) return [{port:6}]
            return [{port:lastOptions[0].port+1}]
        }
    }

    return options
}

exports.createRawMessageTests = function(serialization) {
    return [
        {message: 'x', matchTest: function(m) {
            return utils.equal(m, serialization.serialize(["x"]))
        }},
        {message: 'ignoreMe', matchTest: function(m) {
            return utils.equal(m, serialization.serialize(["ignoreMe"]))
        }},
        {message: 'ignoreMeRaw', matchTest: function(m) {
            return utils.equal(m, serialization.serialize(["ignoreMeRaw"]))
        }}
    ]
}

/***/ }),
/* 15 */
/*!******************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/write-core.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// write-core.js

var ExtBuffer = __webpack_require__(/*! ./ext-buffer */ 16).ExtBuffer;
var ExtPacker = __webpack_require__(/*! ./ext-packer */ 107);
var WriteType = __webpack_require__(/*! ./write-type */ 108);
var CodecBase = __webpack_require__(/*! ./codec-base */ 11);

CodecBase.install({
  addExtPacker: addExtPacker,
  getExtPacker: getExtPacker,
  init: init
});

exports.preset = init.call(CodecBase.preset);

function getEncoder(options) {
  var writeType = WriteType.getWriteType(options);
  return encode;

  function encode(encoder, value) {
    var func = writeType[typeof value];
    if (!func) throw new Error("Unsupported type \"" + (typeof value) + "\": " + value);
    func(encoder, value);
  }
}

function init() {
  var options = this.options;
  this.encode = getEncoder(options);

  if (options && options.preset) {
    ExtPacker.setExtPackers(this);
  }

  return this;
}

function addExtPacker(etype, Class, packer) {
  packer = CodecBase.filter(packer);
  var name = Class.name;
  if (name && name !== "Object") {
    var packers = this.extPackers || (this.extPackers = {});
    packers[name] = extPacker;
  } else {
    // fallback for IE
    var list = this.extEncoderList || (this.extEncoderList = []);
    list.unshift([Class, extPacker]);
  }

  function extPacker(value) {
    if (packer) value = packer(value);
    return new ExtBuffer(value, etype);
  }
}

function getExtPacker(value) {
  var packers = this.extPackers || (this.extPackers = {});
  var c = value.constructor;
  var e = c && c.name && packers[c.name];
  if (e) return e;

  // fallback for IE
  var list = this.extEncoderList || (this.extEncoderList = []);
  var len = list.length;
  for (var i = 0; i < len; i++) {
    var pair = list[i];
    if (c === pair[0]) return pair[1];
  }
}


/***/ }),
/* 16 */
/*!******************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/ext-buffer.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// ext-buffer.js

exports.ExtBuffer = ExtBuffer;

var Bufferish = __webpack_require__(/*! ./bufferish */ 0);

function ExtBuffer(buffer, type) {
  if (!(this instanceof ExtBuffer)) return new ExtBuffer(buffer, type);
  this.buffer = Bufferish.from(buffer);
  this.type = type;
}


/***/ }),
/* 17 */
/*!****************************************!*\
  !*** ../node_modules/ieee754/index.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 18 */
/*!***********************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/bufferish-proto.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// bufferish-proto.js

/* jshint eqnull:true */

var BufferLite = __webpack_require__(/*! ./buffer-lite */ 106);

exports.copy = copy;
exports.slice = slice;
exports.toString = toString;
exports.write = gen("write");

var Bufferish = __webpack_require__(/*! ./bufferish */ 0);
var Buffer = Bufferish.global;

var isBufferShim = Bufferish.hasBuffer && ("TYPED_ARRAY_SUPPORT" in Buffer);
var brokenTypedArray = isBufferShim && !Buffer.TYPED_ARRAY_SUPPORT;

/**
 * @param target {Buffer|Uint8Array|Array}
 * @param [targetStart] {Number}
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function copy(target, targetStart, start, end) {
  var thisIsBuffer = Bufferish.isBuffer(this);
  var targetIsBuffer = Bufferish.isBuffer(target);
  if (thisIsBuffer && targetIsBuffer) {
    // Buffer to Buffer
    return this.copy(target, targetStart, start, end);
  } else if (!brokenTypedArray && !thisIsBuffer && !targetIsBuffer &&
    Bufferish.isView(this) && Bufferish.isView(target)) {
    // Uint8Array to Uint8Array (except for minor some browsers)
    var buffer = (start || end != null) ? slice.call(this, start, end) : this;
    target.set(buffer, targetStart);
    return buffer.length;
  } else {
    // other cases
    return BufferLite.copy.call(this, target, targetStart, start, end);
  }
}

/**
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function slice(start, end) {
  // for Buffer, Uint8Array (except for minor some browsers) and Array
  var f = this.slice || (!brokenTypedArray && this.subarray);
  if (f) return f.call(this, start, end);

  // Uint8Array (for minor some browsers)
  var target = Bufferish.alloc.call(this, end - start);
  copy.call(this, target, 0, start, end);
  return target;
}

/**
 * Buffer.prototype.toString()
 *
 * @param [encoding] {String} ignored
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {String}
 */

function toString(encoding, start, end) {
  var f = (!isBufferShim && Bufferish.isBuffer(this)) ? this.toString : BufferLite.toString;
  return f.apply(this, arguments);
}

/**
 * @private
 */

function gen(method) {
  return wrap;

  function wrap() {
    var f = this[method] || BufferLite[method];
    return f.apply(this, arguments);
  }
}


/***/ }),
/* 19 */
/*!****************************************************!*\
  !*** ../node_modules/int64-buffer/int64-buffer.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// int64-buffer.js

/*jshint -W018 */ // Confusing use of '!'.
/*jshint -W030 */ // Expected an assignment or function call and instead saw an expression.
/*jshint -W093 */ // Did you mean to return a conditional instead of an assignment?

var Uint64BE, Int64BE, Uint64LE, Int64LE;

!function(exports) {
  // constants

  var UNDEFINED = "undefined";
  var BUFFER = (UNDEFINED !== typeof Buffer) && Buffer;
  var UINT8ARRAY = (UNDEFINED !== typeof Uint8Array) && Uint8Array;
  var ARRAYBUFFER = (UNDEFINED !== typeof ArrayBuffer) && ArrayBuffer;
  var ZERO = [0, 0, 0, 0, 0, 0, 0, 0];
  var isArray = Array.isArray || _isArray;
  var BIT32 = 4294967296;
  var BIT24 = 16777216;

  // storage class

  var storage; // Array;

  // generate classes

  Uint64BE = factory("Uint64BE", true, true);
  Int64BE = factory("Int64BE", true, false);
  Uint64LE = factory("Uint64LE", false, true);
  Int64LE = factory("Int64LE", false, false);

  // class factory

  function factory(name, bigendian, unsigned) {
    var posH = bigendian ? 0 : 4;
    var posL = bigendian ? 4 : 0;
    var pos0 = bigendian ? 0 : 3;
    var pos1 = bigendian ? 1 : 2;
    var pos2 = bigendian ? 2 : 1;
    var pos3 = bigendian ? 3 : 0;
    var fromPositive = bigendian ? fromPositiveBE : fromPositiveLE;
    var fromNegative = bigendian ? fromNegativeBE : fromNegativeLE;
    var proto = Int64.prototype;
    var isName = "is" + name;
    var _isInt64 = "_" + isName;

    // properties
    proto.buffer = void 0;
    proto.offset = 0;
    proto[_isInt64] = true;

    // methods
    proto.toNumber = toNumber;
    proto.toString = toString;
    proto.toJSON = toNumber;
    proto.toArray = toArray;

    // add .toBuffer() method only when Buffer available
    if (BUFFER) proto.toBuffer = toBuffer;

    // add .toArrayBuffer() method only when Uint8Array available
    if (UINT8ARRAY) proto.toArrayBuffer = toArrayBuffer;

    // isUint64BE, isInt64BE
    Int64[isName] = isInt64;

    // CommonJS
    exports[name] = Int64;

    return Int64;

    // constructor
    function Int64(buffer, offset, value, raddix) {
      if (!(this instanceof Int64)) return new Int64(buffer, offset, value, raddix);
      return init(this, buffer, offset, value, raddix);
    }

    // isUint64BE, isInt64BE
    function isInt64(b) {
      return !!(b && b[_isInt64]);
    }

    // initializer
    function init(that, buffer, offset, value, raddix) {
      if (UINT8ARRAY && ARRAYBUFFER) {
        if (buffer instanceof ARRAYBUFFER) buffer = new UINT8ARRAY(buffer);
        if (value instanceof ARRAYBUFFER) value = new UINT8ARRAY(value);
      }

      // Int64BE() style
      if (!buffer && !offset && !value && !storage) {
        // shortcut to initialize with zero
        that.buffer = newArray(ZERO, 0);
        return;
      }

      // Int64BE(value, raddix) style
      if (!isValidBuffer(buffer, offset)) {
        var _storage = storage || Array;
        raddix = offset;
        value = buffer;
        offset = 0;
        buffer = new _storage(8);
      }

      that.buffer = buffer;
      that.offset = offset |= 0;

      // Int64BE(buffer, offset) style
      if (UNDEFINED === typeof value) return;

      // Int64BE(buffer, offset, value, raddix) style
      if ("string" === typeof value) {
        fromString(buffer, offset, value, raddix || 10);
      } else if (isValidBuffer(value, raddix)) {
        fromArray(buffer, offset, value, raddix);
      } else if ("number" === typeof raddix) {
        writeInt32(buffer, offset + posH, value); // high
        writeInt32(buffer, offset + posL, raddix); // low
      } else if (value > 0) {
        fromPositive(buffer, offset, value); // positive
      } else if (value < 0) {
        fromNegative(buffer, offset, value); // negative
      } else {
        fromArray(buffer, offset, ZERO, 0); // zero, NaN and others
      }
    }

    function fromString(buffer, offset, str, raddix) {
      var pos = 0;
      var len = str.length;
      var high = 0;
      var low = 0;
      if (str[0] === "-") pos++;
      var sign = pos;
      while (pos < len) {
        var chr = parseInt(str[pos++], raddix);
        if (!(chr >= 0)) break; // NaN
        low = low * raddix + chr;
        high = high * raddix + Math.floor(low / BIT32);
        low %= BIT32;
      }
      if (sign) {
        high = ~high;
        if (low) {
          low = BIT32 - low;
        } else {
          high++;
        }
      }
      writeInt32(buffer, offset + posH, high);
      writeInt32(buffer, offset + posL, low);
    }

    function toNumber() {
      var buffer = this.buffer;
      var offset = this.offset;
      var high = readInt32(buffer, offset + posH);
      var low = readInt32(buffer, offset + posL);
      if (!unsigned) high |= 0; // a trick to get signed
      return high ? (high * BIT32 + low) : low;
    }

    function toString(radix) {
      var buffer = this.buffer;
      var offset = this.offset;
      var high = readInt32(buffer, offset + posH);
      var low = readInt32(buffer, offset + posL);
      var str = "";
      var sign = !unsigned && (high & 0x80000000);
      if (sign) {
        high = ~high;
        low = BIT32 - low;
      }
      radix = radix || 10;
      while (1) {
        var mod = (high % radix) * BIT32 + low;
        high = Math.floor(high / radix);
        low = Math.floor(mod / radix);
        str = (mod % radix).toString(radix) + str;
        if (!high && !low) break;
      }
      if (sign) {
        str = "-" + str;
      }
      return str;
    }

    function writeInt32(buffer, offset, value) {
      buffer[offset + pos3] = value & 255;
      value = value >> 8;
      buffer[offset + pos2] = value & 255;
      value = value >> 8;
      buffer[offset + pos1] = value & 255;
      value = value >> 8;
      buffer[offset + pos0] = value & 255;
    }

    function readInt32(buffer, offset) {
      return (buffer[offset + pos0] * BIT24) +
        (buffer[offset + pos1] << 16) +
        (buffer[offset + pos2] << 8) +
        buffer[offset + pos3];
    }
  }

  function toArray(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    storage = null; // Array
    if (raw !== false && offset === 0 && buffer.length === 8 && isArray(buffer)) return buffer;
    return newArray(buffer, offset);
  }

  function toBuffer(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    storage = BUFFER;
    if (raw !== false && offset === 0 && buffer.length === 8 && Buffer.isBuffer(buffer)) return buffer;
    var dest = new BUFFER(8);
    fromArray(dest, 0, buffer, offset);
    return dest;
  }

  function toArrayBuffer(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    var arrbuf = buffer.buffer;
    storage = UINT8ARRAY;
    if (raw !== false && offset === 0 && (arrbuf instanceof ARRAYBUFFER) && arrbuf.byteLength === 8) return arrbuf;
    var dest = new UINT8ARRAY(8);
    fromArray(dest, 0, buffer, offset);
    return dest.buffer;
  }

  function isValidBuffer(buffer, offset) {
    var len = buffer && buffer.length;
    offset |= 0;
    return len && (offset + 8 <= len) && ("string" !== typeof buffer[offset]);
  }

  function fromArray(destbuf, destoff, srcbuf, srcoff) {
    destoff |= 0;
    srcoff |= 0;
    for (var i = 0; i < 8; i++) {
      destbuf[destoff++] = srcbuf[srcoff++] & 255;
    }
  }

  function newArray(buffer, offset) {
    return Array.prototype.slice.call(buffer, offset, offset + 8);
  }

  function fromPositiveBE(buffer, offset, value) {
    var pos = offset + 8;
    while (pos > offset) {
      buffer[--pos] = value & 255;
      value /= 256;
    }
  }

  function fromNegativeBE(buffer, offset, value) {
    var pos = offset + 8;
    value++;
    while (pos > offset) {
      buffer[--pos] = ((-value) & 255) ^ 255;
      value /= 256;
    }
  }

  function fromPositiveLE(buffer, offset, value) {
    var end = offset + 8;
    while (offset < end) {
      buffer[offset++] = value & 255;
      value /= 256;
    }
  }

  function fromNegativeLE(buffer, offset, value) {
    var end = offset + 8;
    value++;
    while (offset < end) {
      buffer[offset++] = ((-value) & 255) ^ 255;
      value /= 256;
    }
  }

  // https://github.com/retrofox/is-array
  function _isArray(val) {
    return !!val && "[object Array]" == Object.prototype.toString.call(val);
  }

}(typeof exports === 'object' && typeof exports.nodeName !== 'string' ? exports : (this || {}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../buffer/index.js */ 41).Buffer))

/***/ }),
/* 20 */
/*!*****************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/read-core.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// read-core.js

var ExtBuffer = __webpack_require__(/*! ./ext-buffer */ 16).ExtBuffer;
var ExtUnpacker = __webpack_require__(/*! ./ext-unpacker */ 110);
var readUint8 = __webpack_require__(/*! ./read-format */ 46).readUint8;
var ReadToken = __webpack_require__(/*! ./read-token */ 111);
var CodecBase = __webpack_require__(/*! ./codec-base */ 11);

CodecBase.install({
  addExtUnpacker: addExtUnpacker,
  getExtUnpacker: getExtUnpacker,
  init: init
});

exports.preset = init.call(CodecBase.preset);

function getDecoder(options) {
  var readToken = ReadToken.getReadToken(options);
  return decode;

  function decode(decoder) {
    var type = readUint8(decoder);
    var func = readToken[type];
    if (!func) throw new Error("Invalid type: " + (type ? ("0x" + type.toString(16)) : type));
    return func(decoder);
  }
}

function init() {
  var options = this.options;
  this.decode = getDecoder(options);

  if (options && options.preset) {
    ExtUnpacker.setExtUnpackers(this);
  }

  return this;
}

function addExtUnpacker(etype, unpacker) {
  var unpackers = this.extUnpackers || (this.extUnpackers = []);
  unpackers[etype] = CodecBase.filter(unpacker);
}

function getExtUnpacker(type) {
  var unpackers = this.extUnpackers || (this.extUnpackers = []);
  return unpackers[type] || extUnpacker;

  function extUnpacker(buffer) {
    return new ExtBuffer(buffer, type);
  }
}


/***/ }),
/* 21 */
/*!******************************************************!*\
  !*** ../node_modules/trimArguments/trimArguments.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// resolves varargs variable into more usable form
// args - should be a function arguments variable
// returns a javascript Array object of arguments that doesn't count trailing undefined values in the length
module.exports = function(theArguments) {
    var args = Array.prototype.slice.call(theArguments, 0)

    var count = 0;
    for(var n=args.length-1; n>=0; n--) {
        if(args[n] === undefined)
            count++
    }
    args.splice(-0, count)
    return args
}

/***/ }),
/* 22 */
/*!************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/proto/proto.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2013 Billy Tetrud - Free to use for any purpose: MIT License*/

var noop = function() {}

var prototypeName='prototype', undefined, protoUndefined='undefined', init='init', ownProperty=({}).hasOwnProperty; // minifiable variables
function proto() {
    var args = arguments // minifiable variables

    if(args.length == 1) {
        var parent = {init: noop}
        var prototypeBuilder = args[0]

    } else { // length == 2
        var parent = args[0]
        var prototypeBuilder = args[1]
    }

    // special handling for Error objects
    var namePointer = {}    // name used only for Error Objects
    if([Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError].indexOf(parent) !== -1) {
        parent = normalizeErrorObject(parent, namePointer)
    }

    // set up the parent into the prototype chain if a parent is passed
    var parentIsFunction = typeof(parent) === "function"
    if(parentIsFunction) {
        prototypeBuilder[prototypeName] = parent[prototypeName]
    } else {
        prototypeBuilder[prototypeName] = parent
    }

    // the prototype that will be used to make instances
    var prototype = new prototypeBuilder(parent)
    namePointer.name = prototype.name

    // if there's no init, assume its inheriting a non-proto class, so default to applying the superclass's constructor.
    if(!prototype[init] && parentIsFunction) {
        prototype[init] = function() {
            parent.apply(this, arguments)
        }
    }

    // constructor for empty object which will be populated via the constructor
    var F = function() {}
        F[prototypeName] = prototype    // set the prototype for created instances

    var constructorName = prototype.name?prototype.name:''
    if(prototype[init] === undefined || prototype[init] === noop) {
        var ProtoObjectFactory = new Function('F',
            "return function " + constructorName + "(){" +
                "return new F()" +
            "}"
        )(F)
    } else {
        // dynamically creating this function cause there's no other way to dynamically name a function
        var ProtoObjectFactory = new Function('F','i','u','n', // shitty variables cause minifiers aren't gonna minify my function string here
            "return function " + constructorName + "(){ " +
                "var x=new F(),r=i.apply(x,arguments)\n" +    // populate object via the constructor
                "if(r===n)\n" +
                    "return x\n" +
                "else if(r===u)\n" +
                    "return n\n" +
                "else\n" +
                    "return r\n" +
            "}"
        )(F, prototype[init], proto[protoUndefined]) // note that n is undefined
    }

    prototype.constructor = ProtoObjectFactory;    // set the constructor property on the prototype

    // add all the prototype properties onto the static class as well (so you can access that class when you want to reference superclass properties)
    for(var n in prototype) {
        addProperty(ProtoObjectFactory, prototype, n)
    }

    // add properties from parent that don't exist in the static class object yet
    for(var n in parent) {
        if(ownProperty.call(parent, n) && ProtoObjectFactory[n] === undefined) {
            addProperty(ProtoObjectFactory, parent, n)
        }
    }

    ProtoObjectFactory.parent = parent;            // special parent property only available on the returned proto class
    ProtoObjectFactory[prototypeName] = prototype  // set the prototype on the object factory

    return ProtoObjectFactory;
}

proto[protoUndefined] = {} // a special marker for when you want to return undefined from a constructor

module.exports = proto

function normalizeErrorObject(ErrorObject, namePointer) {
    function NormalizedError() {
        var tmp = new ErrorObject(arguments[0])
        tmp.name = namePointer.name

        this.message = tmp.message
        if(Object.defineProperty) {
            /*this.stack = */Object.defineProperty(this, 'stack', { // getter for more optimizy goodness
                get: function() {
                    return tmp.stack
                }
            })
        } else {
            this.stack = tmp.stack
        }

        return this
    }

    var IntermediateInheritor = function() {}
        IntermediateInheritor.prototype = ErrorObject.prototype
    NormalizedError.prototype = new IntermediateInheritor()

    return NormalizedError
}

function addProperty(factoryObject, prototype, property) {
    try {
        var info = Object.getOwnPropertyDescriptor(prototype, property)
        if(info.get !== undefined || info.get !== undefined && Object.defineProperty !== undefined) {
            Object.defineProperty(factoryObject, property, info)
        } else {
            factoryObject[property] = prototype[property]
        }
    } catch(e) {
        // do nothing, if a property (like `name`) can't be set, just ignore it
    }
}

/***/ }),
/* 23 */
/*!**************************************************!*\
  !*** ../node_modules/deadunit/defaultFormats.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Future = __webpack_require__(/*! async-future */ 5)

var formatBasic = __webpack_require__(/*! ./basicFormatter */ 24)
var indent = __webpack_require__(/*! ./indent */ 50)
var utils = __webpack_require__(/*! ./utils */ 25)

// unitTest is a deadunit-core UnitTest object
// if consoleColoring is true, the string will contain console color annotations
// if printOnTheFly is true, test results will be printed to the screen in addition to being returned
// returns a future containing a string with the final results
exports.text = function textOutput(unitTest, consoleColors, printOnTheFly, printLateEvents) {
    if(printLateEvents === undefined) printLateEvents = true

    function color(theColor, theString) {
        if(consoleColors !== undefined)
            return consoleColors[theColor](theString.toString())
        else
            return theString.toString()
    }

    var warningHasBeenPrinted = false
    function lateEventsWarning() {
        if(ended && !warningHasBeenPrinted && printLateEvents) {
            warningHasBeenPrinted = true

            return color('red',
                'Test results were accessed before asynchronous parts of tests were fully complete'
                +" If you have tests with asynchronous parts, make sure to use `this.count` to declare how many assertions you're waiting for."
            )+'\n\n'
        } else {
            return ''
        }
    }


    var ended = false
    return formatBasic(unitTest, printOnTheFly, consoleColors, {
        group: function(name, totalDuration, testSuccesses, testFailures,
                              assertSuccesses, assertFailures, exceptions,
                              testResults, exceptionResults, nestingLevel, timedOut, onTheFly) {

            var total = testSuccesses+testFailures

            var addResults = function() {
                var result = ''
                if(testResults.length > 0)
                    result += '\n'+indent('   ', testResults.join('\n'))
                if(exceptionResults.length > 0)
                    result += '\n'+indent('   ', exceptionResults.join('\n'))
                return result
            }


            var testColor, exceptionColor, failColor, finalColor
            testColor = exceptionColor = failColor = finalColor = 'green'
            if(testFailures > 0) {
                testColor = failColor = finalColor = 'red'
            }
            if(exceptions > 0) {
                finalColor = 'red'
                exceptionColor = 'magenta'
            }

            var durationText = utils.timeText(totalDuration)

            if(nestingLevel === 0) {
                var resultsLine = ''

                if(name) resultsLine += color('cyan', name+' - ')



                resultsLine += color(finalColor, testSuccesses+'/'+(testSuccesses+testFailures)+' successful tests. ')+
                        color('green', assertSuccesses+' pass'+utils.plural(assertSuccesses,"es",""))+
                        ', '+color(failColor, assertFailures+' fail'+utils.plural(assertFailures))+
                        ', and '+color(exceptionColor, exceptions+' exception'+utils.plural(exceptions))+"."
                        +color('grey', " Took "+durationText+".")

                var result = ''
                if(name) result += color('cyan', name)+'\n'
                result += addResults()
                result += '\n\n'+resultsLine

                if(timedOut) {
                    result += color('red', '\n    The test timed out')
                }
            } else {
                if(!name) name = "<unnamed test>"
                var result = color(finalColor, name)+':           '
                                +color(testColor, testSuccesses+'/'+total)
                                +" and "+color(exceptionColor, exceptionResults.length+" exception"+utils.plural(exceptionResults.length))
                                +color('grey', " took "+durationText)
                result += addResults()
            }

            return lateEventsWarning()+result
        },
        assert: function(result, test, onTheFly) {
            if(result.success) {
                var word = "Ok!  ";
                var c = 'green'
            } else {
                var word = "Fail:";
                var c = 'red'
            }

            var linesDisplay = result.sourceLines
            if(result.sourceLines.indexOf("\n") !== -1) {
                linesDisplay = "\n"+linesDisplay;
            }

            var expectations = ""
            if(!result.success && (result.actual !== undefined || result.expected !== undefined)) {
                var things = []
                if(result.expected !== undefined)
                    things.push("Expected "+utils.valueToMessage(result.expected))
                if(result.actual !== undefined)
                    things.push("Got "+utils.valueToMessage(result.actual))

                expectations = " - "+things.join(', ')
            }

            var column = ''
            if(result.column !== undefined) {
                column = color('grey', ":"+result.column)
            }

            return lateEventsWarning()+color(c, word)+" ["+color('grey', result.file)+" "+result.line+column+"] "
                        +color(c, linesDisplay)
                        +expectations
        },
        exception: function(e, onTheFly) {
            return lateEventsWarning()+color('red', 'Exception: ')
                        +color('magenta', utils.errorToString(e))
        },
        log: function(values, onTheFly) {
            return lateEventsWarning()+values.map(function(v) {
                return utils.valueToString(v)
            }).join(', ')
        },
        end: function() {
            ended = true
        }
    })
}


var htmlColors = exports.htmlColors = {
    red: 'rgb(200,30,30)',
    darkRed: 'rgb(90,0,0)',
    lightRed: 'rgb(255,210,230)',

    black: 'rgb(20,20,20)',
    white: 'rgb(240,220,220)',
    gray: 'rgb(185, 180, 180)',

    green: 'rgb(0,100,20)',
    brightGreen: 'rgb(0,200,50)',

    purple: 'rgb(190,0,160)',
    brightPurple: 'rgb(255,126,255)',

    blue: 'rgb(0, 158, 173)',
    brightBlue: 'rgb(0, 233, 255)',

    yellow: 'rgb(210,182,0)',
    darkYellow: 'rgb(106,93,0)'
}

var red = htmlColors.red
var darkRed = htmlColors.darkRed
var lightRed = htmlColors.lightRed
var black = htmlColors.black
var white = htmlColors.white
var green = htmlColors.green
var brightGreen = htmlColors.brightGreen
var purple = htmlColors.purple
var brightPurple = htmlColors.brightPurple
var blue = htmlColors.blue
var brightBlue = htmlColors.brightBlue
var gray = htmlColors.gray


exports.html = function(unitTest, printLateEvents) {
    if(printLateEvents === undefined) printLateEvents = true

    var getTestDisplayer = function() {
        return {
            onToggle: function(displayNone, $bgcolor, innerSelector, outerSelector) {
                if(displayNone == true) {
                    $(innerSelector).css({"display":""});
                    if(outerSelector != undefined) {
                        $(outerSelector).css({"border":"1px solid "+$bgcolor});
                    }
                } else {
                    $(innerSelector).css({"display":"none"});
                    if(outerSelector != undefined) {
                        $(outerSelector).css({"border":""});
                    }
                }
            }
        }
    }


    var formattedTestHtml = formatBasic(unitTest, false, {
        group: function(name, totalDuration, testSuccesses, testFailures,
                          assertSuccesses, assertFailures, exceptions,
                          testResults, exceptionResults, nestingLevel, timedOut) {

            var total = testSuccesses+testFailures
            var mainId = getMainId(name)

            if(testFailures > 0 || exceptions > 0) {
                var bgcolor=red;
                var show = "true";
                var foregroundColor = lightRed
            } else {
                var bgcolor=green;
                var show = "false";
                var foregroundColor = brightGreen
            }

            var durationText = utils.timeText(totalDuration)

            if(nestingLevel === 0) {

                var initTestGroup = function(mainId, bgcolor, show) {
                    $(function()
                    {	$('#'+mainId).css({"border-color":"'+bgcolor+'"});
                        TestDisplayer.onToggle(show, bgcolor, '#'+mainId);

                        $('#'+mainId+'_final').click(function()
                        {	TestDisplayer.onToggle($('#'+mainId).css("display") == "none", bgcolor, '#'+mainId);
                        });
                    });
                }

                var nameLine = "", titleLine = ''
                if(name) {
                    titleLine = '<h1 class="primaryTitle">'+name+'</h1>'
                    nameLine = name+' - '
                }

                var timeoutNote = ""
                if(timedOut) {
                    timeoutNote = 'The test timed out'
                }

                return titleLine+
                       '<div class="testResultsArea" id="'+mainId+'">'+
                            testResults.join('\n')+
                            exceptionResults.join('\n')+"\n"+
                            '<div style="color:'+red+'">'+timeoutNote+'</div>'+
                       '</div>'+
                       '<div class="testResultsBar link" style="border:2px solid '+bgcolor+';" id="'+mainId+'_final">'+
                            '<div class="testResultsBarInner" style="background-color:'+bgcolor+';">'+
                                '<div style="float:right;"><i>click on this bar</i></div>'+
                                '<div><span class="testResultsName">'+nameLine+'</span>' + testSuccesses+'/'+total+' successful tests. '+
                                '<span style="color:'+brightGreen+'">'+assertSuccesses+' pass'+utils.plural(assertSuccesses,"es","")+'</span>'+
                                ', <span style="color:'+darkRed+'">'+assertFailures+' fail'+utils.plural(assertFailures)+'</span>'+
                                ', and <span style="color:'+brightPurple+'">'+exceptions+' exception'+utils.plural(exceptions)+'</span>'+
                                '. <span style="color: '+white+'">Took '+durationText+".</span>"+
                            '</div>'+
                       '</div>'+

                       '<script>;('+initTestGroup+')("'+mainId+'", "'+bgcolor+'", '+show+')</script>'+
                       '</div>'

            } else {
                var n = getNewNumber()

                var testId = mainId+n

                var initTest = function(mainId, bgcolor, show, n) {
                    $(function()
                    {	$('#'+mainId).css({borderColor:bgcolor});
                        TestDisplayer.onToggle(show, bgcolor, '#'+mainId+n+'_inner', '#'+mainId+n);

                        $('.'+mainId+n+'_status').click(function()
                        {	TestDisplayer.onToggle
                            (	$('#'+mainId+n+'_inner').css("display") == "none",
                                bgcolor,
                                '#'+mainId+n+'_inner',
                                '#'+mainId+n+''
                            );
                        });
                    });
                }

                if(!name) name = "<unnamed test>"

                return '<div class="resultsArea" id="'+mainId+n+'">'+
                            '<div class="resultsBar link '+mainId+n+'_status" style="background-color:'+bgcolor+';color:'+foregroundColor+'">'+
                                name+': &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
                                testSuccesses+'/'+total+" and "+exceptions+" exception"+utils.plural(exceptions)
                                +' <span style="color: white">took '+durationText+'</span>'+
                            '</div>'+
                            '<div class="resultsAreaInner" id="'+testId+'_inner">'+
                                '<h2 class="'+testId+'_status link" style="color:'+bgcolor+';">'+name+'</h2>'+
                                testResults.join('\n')+"\n"+
                                exceptionResults.join('\n')+"\n"+
                            '</div>'+
                            '<script>;('+initTest+')("'+mainId+'", "'+bgcolor+'", '+show+', '+n+')</script>'+
                      '</div>';
            }
        },
        assert: function(result) {
            if(false === result.success) {
                var color = red;
                var word = "Fail:";
            } else {
                var color = green;
                var word = "Ok!";
            }

            var linesDisplay = "<i>"+utils.textToHtml(result.sourceLines)+"</i>";
            if(result.sourceLines.indexOf("\n") !== -1) {
                linesDisplay = "<br>\n"+linesDisplay;
            }

            var expectations = ""
            if(!result.success && (result.actual !== undefined || result.expected !== undefined)) {
                var things = []
                if(result.expected !== undefined)
                    things.push("Expected "+utils.textToHtml(utils.valueToMessage(result.expected)))
                if(result.actual !== undefined)
                    things.push("Got "+utils.textToHtml(utils.valueToMessage(result.actual)))

                expectations = " - "+things.join(', ')
            }

            var column = ''
            if(result.column !== undefined) {
                column = ":"+result.column
            }

            return '<div style="color:'+color+';"><span >'+word+'</span>'+
                        " <span class='locationOuter'>[<span class='locationInner'>"
                                +result.file+" line <span class='lineNumber'>"+result.line+"</span>"+column+"</span>]"
                        +"</span> "
                    +linesDisplay
                    +' <span class="expectations">'+expectations+'</span>'
            +"</div>"
        },
        exception: function(exception) {
            var formattedException = utils.textToHtml(utils.errorToString(exception))
            return '<div style="color:'+purple+';">Exception: '+formattedException+'</div>'
        },
        log: function(values) {
            return '<div>'
                +values.map(function(v) {
                    return utils.textToHtml(utils.valueToString(v))
                }).join(', ')
            +'</div>'

        }
    })

    return formattedTestHtml.then(function(formattedHtml) {
        return Future('<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>'+
        '<style>\
            body{\
                background-color: '+black+';\
                color: '+white+';\
            }\
            h2{\
                margin-bottom: 5px;\
                margin-top: 10px;\
            }\
            .green\
            {   color: '+green+';\
            }\
            .link\
            {   cursor:pointer;\
            }\
            .primaryTitle {\
                color: '+blue+';\
            }\
            .testResultsName {\
                color: '+brightBlue+';\
            }\
            .asyncTime {\
                color: '+gray+';\
            }\
            .resultsArea{\
                margin:1px;\
                margin-bottom: 5px;\
            }\
                .resultsAreaInner{\
                    padding:0 8px;\
                }\
                .resultsBar{\
                    color:white;\
                    margin-bottom:4px;\
                    padding: 1px 3px;\
                }\
            .testResultsArea{\
                padding:0 8px;\
            }\
            .testResultsBar{\
                background-color:'+black+';color:white;margin:4px 0;\
            }\
                .testResultsBarInner{\
                    color:white;margin:1px;padding: 1px 3px;\
                }\
                \
            .locationOuter{\
                color:'+white+';\
            }\
            .locationInner, .expectations {\
                color:'+gray+';\
            }\
            .lineNumber{\
                color:'+white+';\
            }\
         </style>'+
        '<script type="text/javascript">                      \
             var TestDisplayer = ('+getTestDisplayer+')() \
          </script>'
        +formattedHtml)
    })
}

var nextId = 0
var getMainId = function(name) {
    nextId++
    return 'unitTest_'+nextId//+name.replace(/[^a-zA-Z]/g, "") // get rid of all characters except letters
}
var getNewNumber = function() {
    getNewNumber.n++
    return getNewNumber.n
}
getNewNumber.n = 0



/***/ }),
/* 24 */
/*!**************************************************!*\
  !*** ../node_modules/deadunit/basicFormatter.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var Future = __webpack_require__(/*! async-future */ 5)

// built in test formatting helper
module.exports = function(unitTest, printOnTheFly/*, [consoleColors,] format*/) {
    if(arguments.length === 3) {
        var format = arguments[2]
    } else /* if(arguments.length > 3) */{
        var color = arguments[2]
        var format = arguments[3]
    }

    var dotText = '.'
    if(color !== undefined) {
        dotText = color.green('.')
    }

    var result = new Future

    var lastPrintWasDot = false
    var printDot = function(dot) {
        if(dot) {
            process.stdout.write(dotText)
        } else if(lastPrintWasDot) {
            process.stdout.write('\n')
        }

        lastPrintWasDot = dot
    }

    var ended = false
    var events = {
        end: function(e) {
            ended = true
            if(printOnTheFly) printDot(false)

            var results = unitTest.results()
            result.return(formatGroup(results, format, 0).result)

            if(format.end !== undefined)
                format.end()
        }
    }

    if(printOnTheFly) {
        var groups = {}
        events.assert = function(e) {
            printDot(e.success && !ended)
            if(e.success) {
                groups[e.parent].testSuccesses++
                groups[e.parent].assertSuccesses++
            } else {
                groups[e.parent].testFailures++
                groups[e.parent].assertFailures++
            }

            if(!e.success || ended) {
                console.log(format.assert(e, undefined, true))
            }
        }
        events.exception = function(e) {
            printDot(false)
            groups[e.parent].exceptions++

            console.log(format.exception(e.error, true))
        }
        events.log = function(e) {
            printDot(false)
            console.log(format.log(e.values, true))
        }
        events.group = function(g) {
            groups[g.id] = {parent: g.parent, name: g.name, testSuccesses: 0, testFailures: 0, assertSuccesses: 0, assertFailures: 0, exceptions: 0}
        }
        events.groupEnd = function(g) {
            var parent = groups[g.id].parent
            if(parent !== undefined) {
                printDot(false)
                if(groups[g.id].testFailures === 0 && groups[g.id].assertFailures === 0 && groups[g.id].exceptions === 0) {
                    groups[parent].testSuccesses++
                } else {
                    groups[parent].testFailures++
                }

                console.log(format.group(groups[g.id].name, undefined, groups[g.id].testSuccesses,groups[g.id].testFailures,groups[g.id].assertSuccesses,groups[g.id].assertFailures,
                                        groups[g.id].exceptions, [], [], 1, false, true))
            }
        }
    }

    unitTest.events(events)

    return result
}

function formatGroup(testResults, format, nestingLevel) {
    var assertSuccesses = 0
    var assertFailures = 0
    var exceptions = 0

    var testCaseSuccesses= 0, testCaseFailures=0;

    var results = []
    testResults.results.forEach(function(result) {
        if(result.type === 'assert') {
            if(result.success) {
                testCaseSuccesses++
                assertSuccesses ++
            } else {
                testCaseFailures++
                assertFailures++
            }

            results.push(format.assert(result, testResults.name, false))

        } else if(result.type === 'group') {
            var group = formatGroup(result, format, nestingLevel+1)
            exceptions+= group.exceptions

            if(group.failures === 0 && group.exceptions === 0)
                testCaseSuccesses++
            else
                testCaseFailures++

            results.push(group.result)
            assertSuccesses+= group.assertSuccesses
            assertFailures+= group.assertFailures

        } else if(result.type === 'log') {
            results.push(format.log(result.values, false))
        } else {
            throw new Error("Unknown result type: "+result.type)
        }
    })

    var exceptionResults = []
    testResults.exceptions.forEach(function(e) {
        exceptionResults.push(format.exception(e, false))
    })

    exceptions+= testResults.exceptions.length

    var formattedGroup = format.group(testResults.name, testResults.duration,
                                      testCaseSuccesses, testCaseFailures,
                                      assertSuccesses, assertFailures, exceptions,
                                      results, exceptionResults, nestingLevel, testResults.timeout, false)
    return {result: formattedGroup,
            successes: testCaseSuccesses,
            failures: testCaseFailures,
            assertSuccesses: assertSuccesses,
            assertFailures: assertFailures,
            exceptions: exceptions
    }
}


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../process/browser.js */ 1)))

/***/ }),
/* 25 */
/*!*****************************************!*\
  !*** ../node_modules/deadunit/utils.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var util = __webpack_require__(/*! util */ 51)

exports.plural = function (num, plural, singular) {
	var plur = num!==1;

    if(singular === undefined) {
    	if(plur)	return "s"
        else        return ""
    } else {
    	if(plur)	return plural
        else		return singular
    }
}


exports.textToHtml = function(text) {
    return htmlEscape(text)
            .replace(/ /g, '&nbsp;')
            .replace(/\n/g, "<br>\n")
            .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
}

exports.timeText = function (ms) {
    if(ms < 2000)
        return ms+"ms"
    else
        return Number(ms/1000).toPrecision(3)+'s'
}


exports.valueToMessage = function(value) {
    if(value instanceof Error) {
        return exports.errorToString(value)
    } else {
        return prettyPrint(value)
    }
}

exports.errorToString = function(err) {
    if(err instanceof Error) {
        var otherProperties = []
        for(var n in err) {
            if(Object.hasOwnProperty.call(err, n) && n !== 'message' && n !== 'stack') {
                otherProperties.push(exports.valueToString(err[n]))
            }
        }

        var properties = ''
        if(otherProperties.length > 0)
            properties = '\n'+otherProperties.join("\n")


        if(err.stack !== undefined) {
            if(err.stack.indexOf(err.message) !== -1) { // chrome
                return err.stack+properties
            } else { // firefox (others?)
                return err.message+'\n'+err.stack+properties
            }
        } else {
            return err.toString()+properties
        }
    } else {
        return err
    }
}

exports.valueToString = function(v) {
    if(v instanceof Error) {
        return exports.errorToString(v)

    } else if(typeof(v) === 'string') {
        return v
    } else {
        return prettyPrint(v)
    }
}

function prettyPrint(value) {
    try {
        return util.inspect(value)       // I've seen this throw an error if the value contains a radio button dom object
    } catch(e) {
        console.log(e)
        return "<error printing value>"
    }
}


function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
}

/***/ }),
/* 26 */
/*!****************************************!*\
  !*** ../node_modules/events/events.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 27 */
/*!*******************************************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/src/node_modules/blockStyleUtils.js ***!
  \*******************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// some functionality that is needed by Block.js but is related to styling (some things are also needed by Style.js)

var HashMap = __webpack_require__(/*! hashmap */ 28)

var Style = __webpack_require__(/*! ./Style */ 8)
var utils = __webpack_require__(/*! ./utils */ 7)

exports.defaultStyleMap = new HashMap() // maps from a proto class to its computed default style

// propogates a style-set change to a set of components
    // styleMap should be a *copy* of a Style's componentStyleMap property (because it will be modified)
var propogateStyleSet = exports.propogateStyleSet = function (components, styleMap) {
    for(var n=0; n<components.length; n++) {
        var c = components[n]

        // object inherits style if its in the styleSet and if it doesn't have an explicitly set style
        if(c._style === undefined) {
            if(styleMap === undefined) {
                setCurrentStyle(c, undefined)
            } else {
                var styleFromMap = getStyleForComponent(styleMap, c)
                if(styleFromMap !== undefined) {
                    setCurrentStyle(c, styleFromMap)
                }
            }
        }

        // set the computed style set
        var mainStyle; // the style directly given to a component, either its `style` property, or its inherited style
        if(c._style !== undefined) {
            mainStyle = c._style.get(c)
        } else if(styleMap !== undefined) {
            mainStyle = getStyleForComponent(styleMap, c)
            if(mainStyle !== undefined) {
                mainStyle = mainStyle.get(c) // get the specific style (taking into account any label)
            }
        }

        if(mainStyle !== undefined) {
            if(styleMap !== undefined) {
                c.computedStyleMap = styleMapConjunction(styleMap, mainStyle.componentStyleMap)
            } else {
                c.computedStyleMap = mainStyle.componentStyleMap
            }
        } else {
            c.computedStyleMap = styleMap
        }

        propogateStyleSet(c.children, c.computedStyleMap)
    }
}

// gets the right style from the styleMap
// takes the component's inheritance tree into account (relies on the block.constructor.parent property)
var getStyleForComponent = exports.getStyleForComponent = function (styleMap, block) {
    var constructor = block.constructor
    while(constructor !== undefined) {
        var style = styleMap[constructor.name]
        if(style !== undefined) {
            return style
        } else {
            constructor = constructor.parent
        }
    }
}

// returns the conjunction of two style maps
// gets it from the computedStyles cache if its already in there
var styleMapConjunction = exports.styleMapConjunction = function (secondaryStyleMap, primaryStyleMap) {
    var cachedStyleMap = Style.computedStyles.get([secondaryStyleMap, primaryStyleMap])
    if(cachedStyleMap === undefined) {
        cachedStyleMap = utils.objectConjunction(secondaryStyleMap, primaryStyleMap)
        Style.computedStyles.set([secondaryStyleMap, primaryStyleMap], cachedStyleMap)
    }

    return cachedStyleMap
}

// takes labels into account
var setCurrentStyle = exports.setCurrentStyle = function (component, style) {
    if(style === component.currentStyle) return; // do nothing

    if(style !== undefined)
        var specificStyle = style.get(component)
    else
        var specificStyle = style

    setStyleClass(component, specificStyle)
    applyStyleKillFunction(component)
    component.currentStyle = specificStyle
    applyStyleSetupFunction(component, specificStyle)
    applyStateHandler(component, specificStyle)
}


exports.createDefaultBlockStyle = function (that) {
    if(that.defaultStyle !== undefined) {
        validateDefaultStyle(that.defaultStyle)
    }

    // get list of default styles
    var defaultStyles = []
    var nextConstructor = that.constructor
    while(nextConstructor !== undefined) {
        if(nextConstructor.defaultStyle !== undefined) {
            defaultStyles.push(nextConstructor.defaultStyle)
        }
        nextConstructor = nextConstructor.parent
    }

    // generate merged default style
    var defaultStyleSet = {}
    defaultStyles.reverse().forEach(function(style) {
        for(var k in style.styleDefinitions) {
            utils.merge(defaultStyleSet, style.styleDefinitions[k])
            break; // just do first key (shouldn't be more than one key, because only simple stylings are allowed for default styles)
        }

    })

    if(Object.keys(defaultStyleSet).length > 0)
        var defaultBlockStyle = Style(defaultStyleSet, {default:true})
    else
        var defaultBlockStyle = false // no special default

    exports.defaultStyleMap.set(that.constructor, defaultBlockStyle)
    return defaultBlockStyle
}


// applies setup appropriately
function applyStyleSetupFunction(component, style) {
    if(style !== undefined && style.setup !== undefined) {
        component._styleSetupObject = style.setup(component) // call setup on the component
    } else {
        component._styleSetupObject = undefined
    }
}
// applies kill appropriately
function applyStyleKillFunction(component) {
    var currentStyle = component.currentStyle
    if(currentStyle !== undefined && currentStyle.setup !== undefined) {
        if(currentStyle.kill === undefined)
            throw new Error('style has been unset but does not have a "kill" function to undo its "setup" function')

        currentStyle.kill(component, component._styleSetupObject)
    }
}

// initializes and sets up state-change handler
function applyStateHandler(component, style) {
    if(style !== undefined && style.stateHandler !== undefined) {
        // todo: using setCurrentStyle is a stopgap until I can implement better style application for $state and pseudoclasses (which probably will require a rewrite of much of the style logic)
        setCurrentStyle(component, style.stateHandler(component.state.subject))
        component.state.on('change', function() {
            setCurrentStyle(component, style.stateHandler(component.state.subject))
        })
    }
}

// sets the style, replacing one if one already exists
function setStyleClass(component, style) {
    var currentStyle = component.currentStyle
    if(currentStyle !== undefined) {
        component.domNode.className = component.domNode.className.replace(new RegExp(" ?\\b"+currentStyle.className+"\\b"),'') // remove the previous css class
    }
    if(style !== undefined) {
        component.domNode.className = style.className+' '+component.domNode.className.trim() // note that the order of classes doesn't matter
    }
}

function validateDefaultStyle(defaultStyle) {
    if(!(defaultStyle instanceof Style)) {
        throw new Error("defaultStyle property must be a Style object")
    } else if(
        defaultStyle.setup !== undefined || defaultStyle.kill !== undefined || defaultStyle.stateHandler !== undefined ||
        Object.keys(defaultStyle.componentStyleMap).length > 0 || Object.keys(defaultStyle.labelStyleMap).length > 0 /*||
        Object.keys(defaultStyle.pseudoClassStyles).length > 0*/
    ) {
        throw new Error("A Block's defaultStyle can only contain basic css stylings, no Block, label, or pseudoclass stylings, nor run/kill javascript")
    }
}

/***/ }),
/* 28 */
/*!******************************************!*\
  !*** ../node_modules/hashmap/hashmap.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * HashMap - HashMap Class for JavaScript
 * @author Ariel Flesler <aflesler@gmail.com>
 * @version 2.0.6
 * Homepage: https://github.com/flesler/hashmap
 */

(function(factory) {
	/* global define */
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module === 'object') {
		// Node js environment
		var HashMap = module.exports = factory();
		// Keep it backwards compatible
		HashMap.HashMap = HashMap;
	} else {
		// Browser globals (this is window)
		this.HashMap = factory();
	}
}(function() {

	function HashMap(other) {
		this.clear();
		switch (arguments.length) {
			case 0: break;
			case 1: {
				if ('length' in other) {
					// Flatten 2D array to alternating key-value array
					multi(this, Array.prototype.concat.apply([], other));
				} else { // Assumed to be a HashMap instance
					this.copy(other);
				}
				break;
			}
			default: multi(this, arguments); break;
		}
	}

	var proto = HashMap.prototype = {
		constructor:HashMap,

		get:function(key) {
			var data = this._data[this.hash(key)];
			return data && data[1];
		},

		set:function(key, value) {
			// Store original key as well (for iteration)
			var hash = this.hash(key);
			if ( !(hash in this._data) ) {
				this.size++;
			}
			this._data[hash] = [key, value];
		},

		multi:function() {
			multi(this, arguments);
		},

		copy:function(other) {
			for (var hash in other._data) {
				if ( !(hash in this._data) ) {
					this.size++;
				}
				this._data[hash] = other._data[hash];
			}
		},

		has:function(key) {
			return this.hash(key) in this._data;
		},

		search:function(value) {
			for (var key in this._data) {
				if (this._data[key][1] === value) {
					return this._data[key][0];
				}
			}

			return null;
		},

		delete:function(key) {
			var hash = this.hash(key);
			if ( hash in this._data ) {
				this.size--;
				delete this._data[hash];
			}
		},

		type:function(key) {
			var str = Object.prototype.toString.call(key);
			var type = str.slice(8, -1).toLowerCase();
			// Some browsers yield DOMWindow or Window for null and undefined, works fine on Node
			if (!key && (type === 'domwindow' || type === 'window')) {
				return key + '';
			}
			return type;
		},

		keys:function() {
			var keys = [];
			this.forEach(function(_, key) { keys.push(key); });
			return keys;
		},

		values:function() {
			var values = [];
			this.forEach(function(value) { values.push(value); });
			return values;
		},

		entries:function() {
			var entries = [];
			this.forEach(function(value, key) { entries.push([key, value]); });
			return entries;
		},

		// TODO: This is deprecated and will be deleted in a future version
		count:function() {
			return this.size;
		},

		clear:function() {
			// TODO: Would Object.create(null) make any difference
			this._data = {};
			this.size = 0;
		},

		clone:function() {
			return new HashMap(this);
		},

		hash:function(key) {
			switch (this.type(key)) {
				case 'undefined':
				case 'null':
				case 'boolean':
				case 'number':
				case 'regexp':
					return key + '';

				case 'date':
					return '♣' + key.getTime();

				case 'string':
					return '♠' + key;

				case 'array':
					var hashes = [];
					for (var i = 0; i < key.length; i++) {
						hashes[i] = this.hash(key[i]);
					}
					return '♥' + hashes.join('⁞');

				default:
					// TODO: Don't use expandos when Object.defineProperty is not available?
					if (!key.hasOwnProperty('_hmuid_')) {
						key._hmuid_ = ++HashMap.uid;
						hide(key, '_hmuid_');
					}

					return '♦' + key._hmuid_;
			}
		},

		forEach:function(func, ctx) {
			for (var key in this._data) {
				var data = this._data[key];
				func.call(ctx || this, data[1], data[0]);
			}
		}
	};

	HashMap.uid = 0;

	//- Add chaining to all methods that don't return something

	['set','multi','copy','delete','clear','forEach'].forEach(function(method) {
		var fn = proto[method];
		proto[method] = function() {
			fn.apply(this, arguments);
			return this;
		};
	});

	//- Backwards compatibility

	// TODO: remove() is deprecated and will be deleted in a future version
	HashMap.prototype.remove = HashMap.prototype.delete;

	//- Utils

	function multi(map, args) {
		for (var i = 0; i < args.length; i += 2) {
			map.set(args[i], args[i+1]);
		}
	}

	function hide(obj, prop) {
		// Make non iterable if supported
		if (Object.defineProperty) {
			Object.defineProperty(obj, prop, {enumerable:false});
		}
	}

	return HashMap;
}));


/***/ }),
/* 29 */
/*!*********************************************************!*\
  !*** ../node_modules/deadunit-core/src/deadunitCore.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2013 Billy Tetrud - Free to use for any purpose: MIT License*/

var path = __webpack_require__(/*! path */ 3)
var Url = __webpack_require__(/*! url */ 68)

var proto = __webpack_require__(/*! proto */ 30)
var Future = __webpack_require__(/*! async-future */ 31)
var SourceMapConsumer = __webpack_require__(/*! source-map */ 75).SourceMapConsumer

var processResults = __webpack_require__(/*! ./processResults */ 82)
var isRelative = __webpack_require__(/*! ./isRelative */ 35)

// returns a module intended for a specific environment (that environment being described by the options)
// options can contain:
    // initialization - a function run once that can setup things (like a global error handler).
        // Gets a single parameter 'state' which has the following form:
            // unhandledErrorHandler(error,warn)
    // initializeMainTest - a function run once that can setup things (like a test-specific handler).
        // Gets a single parameter 'mainTestState' which has the following form:
            // unhandledErrorHandler(error,warn) - the error handler for that test
    // getDomain - a function that returns the current domain, or undefined if the environment (*cough* browsers) doesn't have domains
    // getSourceMapObject - a function that returns a future of the pre-parsed source map object for a file, or future undefined
        // gets the parameter:
            // url - the url of the file to find a sourcemap for
            // warningHandler - a warningHandler function that expects an error to be passed to it
    // runTestGroup - a function run that allows you to wrap the actual test run in some way (intended for node.js domains)
        // gets parameters:
            // state - the same state object sent into `initialization`
            // tester - a UnitTester object for the test
            // runTest - the function that you should call to run the test group. Already has a synchronous try catch inside it (so you don't need to worry about that)
            // handleError - a function that handles an error if one comes up. Takes the error as its only parameter. Returns a future.
    // mainTestDone - a function run once a test is done
        // gets the 'mainTestState' parameter
    // defaultUnhandledErrorHandler - a function that handles an error unhandled by any other handler
        // gets the 'error' as its only parameter
    // defaultTestErrorHandler - is passed the current test, and should return a function that handles an error
module.exports = function(options) {

    // a variable that holds changeable state
    var state = {
        unhandledErrorHandler: options.defaultUnhandledErrorHandler
    }

    options.initialize(state)

    // the prototype of objects used to manage accessing and displaying results of a unit test
    var UnitTest = proto(function() {
        this.init = function(/*mainName=undefined, groups*/) {
            var that = this
            var args = arguments
            this.manager = EventManager(this)

            setTimeout(function() {
                runTest.call(that, args)
            },0)
        }

        this.events = function(handlers) {
            this.manager.add(handlers, options.getDomain())
            return this
        }

        this.results = function() {
            return processResults(this)
        }

        // private

        function runTest(args) {
            var fakeTest = new UnitTester()
                fakeTest.id = undefined // fake test doesn't get an id
                fakeTest.manager = this.manager
                fakeTest.timeouts = []
                fakeTest.onDoneCallbacks = []

                var getUnhandledErrorHandler = function() {
                    var unhandledErrorHandler = createUnhandledErrorHandler(fakeTest.mainSubTest)
                    getUnhandledErrorHandler = function() { // memoize this junk
                        return unhandledErrorHandler
                    }
                    return unhandledErrorHandler
                }
                fakeTest.mainTestState = {get unhandledErrorHandler(){return getUnhandledErrorHandler() || options.defaultTestErrorHandler(fakeTest)}}

                var warningInfoMessageHasBeenOutput = false
                this.manager.testObject.warningHandler = fakeTest.warningHandler = function(w) {
                    var errorHandler = getUnhandledErrorHandler()
                    if(warningInfoMessageHasBeenOutput === false) {
                        var warning = newError("You've received at least one warning. If you don't want to treat warnings as errors, use the `warning` method to redefine how to handle them.")
                        errorHandler(warning, false)
                        warningInfoMessageHasBeenOutput = true
                    }

                    errorHandler(w, false)
                }

                options.initializeMainTest(fakeTest.mainTestState)

                timeout(fakeTest, 3000, true) // initial (default) timeout
                fakeTest.onDone = function() { // will execute when this test is done
                    fakeTest.manager.lastEmitFuture.then(function() { // wait for all the already-registered emits to emit before finalizing the test
                        done(fakeTest)
                        options.mainTestDone(fakeTest.mainTestState)
                    }).done()
                }
                fakeTest.callOnDone = function(cb) {
                    fakeTest.onDoneCallbacks.push(cb)
                }

            UnitTester.prototype.test.apply(fakeTest, args) // set so the error handler can access the real test
            this.mainTester = fakeTest
            this.parentTester = fakeTest

            fakeTest.groupEnded = true
            checkGroupDone(fakeTest)
        }
    })

    var EventManager = proto(function() {

        this.init = function(testObject) {
            this.handlers = {
                group: [],
                assert: [],
                count: [],
                exception: [],
                log: [],
                end: [],
                groupEnd: [],
                before: [],
                after: [],
                beforeEnd: [],
                afterEnd: []
            }

            this.history = []
            this.emitDepth = 0 // records how many futures are waiting on eachother, so we can make sure maximum stack depth isn't exceeded
            this.lastEmitFuture = Future(undefined)
            this.testObject = testObject
        }

        this.testObject; // used to get the right warningHandler

        // emits an event
        // eventDataFuture resolves to either an eventData object, or undefined if nothing should be emitted
        this.emit = function(type, eventDataFuture) {
            var that = this
            var lastEmitFuture = that.lastEmitFuture // capture it for the possible setTimeout threadlet
            var doStuff = function(f) {
                var resultFuture = lastEmitFuture.then(function() {
                    return eventDataFuture
                }).then(function(eventData){
                    if(eventData !== undefined)
                        recordAndTriggerHandlers.call(that, type, eventData)
                }).catch(function(e) {
                    that.testObject.warningHandler(e)
                })

                if(f !== undefined) {
                    resultFuture.finally(function() {
                        setTimeout(function(){f.return()},0) // make sure we don't get a "too much recursion error" // todo: test not doing this once browsers all support proper tail calls
                    })
                    return f
                } else {
                    return resultFuture
                }
            }

            this.emitDepth++
            if(this.emitDepth % 40 === 0) { // 40 seems to be the magic number here for firefox - such a finicky browser
                that.lastEmitFuture = doStuff(new Future)
            } else {
                that.lastEmitFuture = doStuff()
            }

            return this.lastEmitFuture
        }

        // adds a set of listening handlers to the event stream, and runs those handlers on the stream's history
        // domain is optional, but if defined will be the node.js domain that unhandled errors will be routed to
        this.add = function(handlers, domain) {
            // run the history of events on the the handlers
            this.history.forEach(function(e) {
                if(handlers[e.type] !== undefined) {
                    handlers[e.type].call(undefined, e.data)
                }
            })

            // then have those handlers listen on future events
            for(var type in handlers) {
                var typeHandlers = this.handlers[type]
                if(typeHandlers === undefined) {
                    throw new Error("event type '"+type+"' invalid")
                }

                typeHandlers.push({handler: handlers[type], domain: domain})
            }
        }

        // the synchronous part of emitting
        function recordAndTriggerHandlers(type, eventData) {
            this.history.push({type:type, data: eventData})
            this.handlers[type].forEach(function(handlerInfo) {
                try {
                    handlerInfo.handler.call(undefined, eventData)
                } catch(e) {

                    // throw error asynchronously because these error should be separate from the test exceptions
                    var throwErrorFn = options.throwAsyncException

                    if(handlerInfo.domain) {
                        throwErrorFn = handlerInfo.domain.bind(throwErrorFn)    // this domain bind is needed because emit is done inside deadunit's test domain, which isn't where we want to put errors caused by the event handlers
                    }

                    throwErrorFn(e)
                }
            })
        }
    })

    function testGroup(tester, test) {

        // handles any error (synchronous or asynchronous errors)
        var handleError = createUnhandledErrorHandler(tester)

        var runTest = function() {
            try {
                test.call(tester, tester) // tester is both 'this' and the first parameter (for flexibility)
            } catch(e) {
                handleError(e, true).done()
            }
         }

        options.runTestGroup(state, tester, runTest, handleError)
    }

    function createUnhandledErrorHandler(tester) {

        var handleErrorInErrorHandler = function(warn, newError) {
            var textForOriginalError = newError.stack?newError.stack:newError

            if(warn !== false) {
                try {
                    tester.warningHandler(newError)
                } catch(warningHandlerError) {
                    var warningHandlerErrorText = warningHandlerError.stack?warningHandlerError.stack:warningHandlerErro

                    var errorception = new Error("An error happened in the error handler: "+warningHandlerErrorText+"\n"+textForOriginalError)
                    tester.manager.emit('exception', Future(errorception)).done() // if shit gets this bad, that sucks
                }
            } else {
                console.error(textForOriginalError)
            }
        }

        // warn should be set to false if the handler is being called to report a warning
        return function(e, warn) {
            if(tester.unhandledErrorHandler !== undefined) {
                try {
                    tester.unhandledErrorHandler(e)
                    return Future(undefined)

                } catch(newError) {     // error handler had an error...
                    handleErrorInErrorHandler(warn, newError)
                }
            }
            // else

            var errorToEmit = mapException(e, tester.warningHandler).catch(function(newError) {
                if(newError.message !== "Accessing the 'caller' property of a function or arguments object is not allowed in strict mode") { // stacktrace.js doesn't support IE for certain things
                    handleErrorInErrorHandler(warn, newError)
                }
                return Future(e) // use the original unmapped exception

            }).then(function(exception){
                return Future(exceptionEmitData(tester,exception))
            })

            var emitFuture = tester.manager.emit('exception', errorToEmit)
            return afterWaitingEmitIsComplete(tester, emitFuture)

        }
    }

    function exceptionEmitData(tester, e) {
        return {
            parent: tester.id,
            time: now(),
            error: e
        }
    }


    // the prototype of objects used to write tests and contain the results of tests
    var UnitTester = function(name, mainTester, parentTester) {
        if(!mainTester) mainTester = this

        this.id = groupid()
        this.mainTester = mainTester // the mainTester is used to easily figure out if the test results have been accessed (so early accesses can be detected)
        this.parentTester = parentTester // used to reset timeouts
        this.name = name

        this.doneTests = 0
        this.doneAsserts = 0
        this.runningTests = 0 // the number of subtests created synchronously
        this.doneCalled = false
        this.doSourcemappery = true // whether to do source mapping, if possible, within this test

        this.complete = new Future // resolved when done
    }

        UnitTester.prototype = {
            test: function() {
                if(arguments.length === 1) {
                    var test = arguments[0]

                // named test
                } else {
                    var name = arguments[0]
                    var test = arguments[1]
                }

                var that = this
                this.runningTests++

                var tester = new UnitTester(name, this.mainTester, this)
                tester.manager = this.manager
                tester.doSourcemappery = this.doSourcemappery // inherit from parent test
                tester.warningHandler = this.warningHandler

                if(this.id === undefined) { // ie its the top-level fake test
                    this.mainSubTest = tester
                }

                tester.onDone = function() { // will execute when this test is done
                    that.doneTests += 1

                    that.manager.emit('groupEnd', Future({
                        id: tester.id,
                        time: now()
                    }))

                    try {
                        tester.complete.return()
                    } catch(e) {
                        createUnhandledErrorHandler(tester)(e)
                    }

                    checkGroupDone(that)
                }

                tester.mainTester.callOnDone(function() {
                    if(!tester.doneCalled) { // a timeout happened - end the test
                        tester.doneCalled = true
                        that.manager.emit('groupEnd', Future({
                            id: tester.id,
                            time: now()
                        }))
                    }
                })

                this.manager.emit('group', Future({
                    id: tester.id,
                    parent: this.id,
                    name: name,
                    time: now()
                }))

                if(this.beforeFn) {
                    this.manager.emit('before', Future({
                        parent: tester.id,
                        time: now()
                    }))

                    this.beforeFn.call(this, this)

                    this.manager.emit('beforeEnd', Future({
                        parent: tester.id,
                        time: now()
                    }))
                }

                testGroup(tester, test)

                if(this.afterFn) {
                    this.manager.emit('after', Future({
                        parent: tester.id,
                        time: now()
                    }))

                    this.afterFn.call(this, this)

                    this.manager.emit('afterEnd', Future({
                        parent: tester.id,
                        time: now()
                    }))
                }

                tester.groupEnded = true
                checkGroupDone(tester)

                return tester
            },

            ok: function(success, actualValue, expectedValue) {
                this.doneAsserts += 1
                afterWaitingEmitIsComplete(this, assert(this, success, actualValue, expectedValue, 'assert', "ok")).done()
            },
            eq: function(actualValue, expectedValue) {
                this.doneAsserts += 1
                afterWaitingEmitIsComplete(this, assert(this, expectedValue === actualValue, actualValue, expectedValue, 'assert', "eq")).done()
            },
            count: function(number) {
                if(this.countExpected !== undefined)
                    throw Error("count called multiple times for this test")
                this.countExpected = number

                afterWaitingEmitIsComplete(this,assert(this, undefined, undefined, number, 'count', "count")).done()
            },

            before: function(fn) {
                if(this.beforeFn !== undefined)
                    throw Error("before called multiple times for this test")

                this.beforeFn = fn
            },
            after: function(fn) {
                if(this.afterFn !== undefined)
                    throw Error("after called multiple times for this test")

                this.afterFn = fn
            },

            log: function(/*arguments*/) {
                this.manager.emit('log', Future({
                    parent: this.id,
                    time: now(),
                    values: Array.prototype.slice.call(arguments, 0)
                }))
            },

            timeout: function(t) {
                timeout(this, t, false)
            },

            error: function(handler) {
                this.unhandledErrorHandler = handler
            },
            warning: function(handler) {
                this.warningHandler = handler
            },

            sourcemap: function(doSourcemappery) {
                this.doSourcemappery = doSourcemappery
            }
        }

    function afterWaitingEmitIsComplete(that, assertFuture) {
        return assertFuture.finally(function() {
            checkGroupDone(that)
        })
    }

    function checkGroupDone(group) {
        if(!group.doneCalled && group.groupEnded === true
            && ((group.countExpected === undefined || group.countExpected <= group.doneAsserts+group.doneTests)
                && group.runningTests === group.doneTests)
        ) {
            group.doneCalled = true // don't call twice
            group.onDone()
        }

    }

    function done(unitTester) {
        if(unitTester.mainTester.ended) {
            unitTester.mainTester.manager.emit('exception', Future({
                parent: unitTester.mainTester.mainSubTest.id,
                time: now(),
                error: newError("done called more than once (probably because the test timed out before it finished)")
            }))
        } else {
            unitTester.mainTester.timeouts.forEach(function(to) {
                clearTimeout(to)
            })
            unitTester.mainTester.timeouts = []

            endTest(unitTester, 'normal')
        }
    }

    function timeout(unitTester, t, theDefault) {
        var timeouts = unitTester.mainTester.timeouts

        unitTester.timeoutTime = t

        if(theDefault) {
            timeouts.defaultTimeout = true
        } else if(unitTester === unitTester.mainTester && timeouts.defaultTimeout) { // if a timeout is the default, it can be overridden
            clearTimeout(unitTester.timeoutHandle)
            remove(timeouts, unitTester.timeoutHandle)
            timeouts.defaultTimeout = undefined
            delete unitTester.timeoutHandle
        }

        setTesterTimeout(unitTester)
    }

    // sets or resets a timeout for a unitTester
    function setTesterTimeout(unitTester) {
        var timeouts = unitTester.mainTester.timeouts
        if(unitTester.timeoutHandle !== undefined) {
            clearTimeout(unitTester.timeoutHandle)
            remove(timeouts, unitTester.timeoutHandle)
        }

        unitTester.timeoutHandle = setTimeout(function() {
            remove(timeouts, unitTester.timeoutHandle)
            delete unitTester.timeoutHandle

            if(timeouts.length === 0 && !unitTester.mainTester.ended) {
                endTest(unitTester.mainTester, 'timeout')
            }
        }, unitTester.timeoutTime)

        timeouts.push(unitTester.timeoutHandle)
    }

    // removes an item from an array
    function remove(array, item) {
        var index = array.indexOf(item)
        if(index !== -1)
            array.splice(index, 1) // no longer throwing Error("Item doesn't exist to remove") if there's nothing to remove - in the case that mainTester.timeouts gets set back to [] (when done), it won't be there

    }

    function endTest(that, type) {
        that.mainTester.ended = true

        if(that.mainTester === that) { // if its the main tester
            that.onDoneCallbacks.forEach(function(cb) {
                cb()
            })
        }

        setTimeout(function() { // setTimeout here is to make it so the currently running threadlet that caused the test to end can finish before the end event is sent
            that.manager.emit('end', Future({
                type: type,
                time: now()
            }))
        },0)
    }

    // type - either "count" or "assert"
    function assert(that, success, actualValue, expectedValue, type, functionName/*="ok"*/, lineInfo/*=dynamic*/, stackIncrease/*=0*/) {
        if(!stackIncrease) stackIncrease = 1
        if(!functionName) functionName = "ok"
        if(!lineInfo)
            var lineInfoFuture = getLineInformation(functionName, stackIncrease, that.doSourcemappery, that.warningHandler)
        else
            var lineInfoFuture = Future(lineInfo)

        // reste timeouts up the chain
        var cur = that
        while(cur !== undefined) {
            setTesterTimeout(cur)
            cur = cur.parentTester
        }

        var emitData = lineInfoFuture.then(function(lineInfo) {
            var result = lineInfo
            result.type = 'assert'
            if(type !=='count') result.success = success === true

            if(actualValue !== undefined)     result.actual = actualValue
            if(expectedValue !== undefined)   result.expected = expectedValue

            result.parent = that.id
            result.time = now()

           return Future(result)
        })

        return that.manager.emit(type, emitData)
    }


    function getLineInformation(functionName, stackIncrease, doSourcemappery, warningHandler) {

        var file, line, column, lineinfo;
        return options.getLineInfo(stackIncrease).then(function(info){
            lineinfo = info
            return getSourceMapConsumer(info.file, warningHandler)
        }).catch(function(e){
            warningHandler(e)
            return Future(undefined)

        }).then(function(sourceMapConsumer) {
            if(sourceMapConsumer !== undefined && doSourcemappery) {

                var mappedInfo = getMappedSourceInfo(sourceMapConsumer, lineinfo.file, lineinfo.line, lineinfo.column)
                file = mappedInfo.file
                line = mappedInfo.line
                column = mappedInfo.column
                var sourceLines = mappedInfo.sourceLines

                var multiLineSearch = !mappedInfo.usingOriginalFile // don't to a multi-line search if the source has been mapped (the file might not be javascript)
            } else {
                file = lineinfo.file
                line = lineinfo.line
                column = lineinfo.column
                var sourceLines = undefined
                var multiLineSearch = true
            }

            return getFunctionCallLines(sourceLines, file, functionName, line, multiLineSearch, warningHandler)

        }).catch(function(e) {
            warningHandler(e)
            return Future("<source not available>")
        }).then(function(sourceLines) {
            return Future({
                sourceLines: sourceLines,
                file: path.basename(file),
                line: line,
                column: column
            })
        })
    }

    // returns the line, column, and filename mapped from a source map
    // appropriately handles cases where some information is missing
    function getMappedSourceInfo(sourceMapConsumer, originalFilePath, originalLine, originalColumn, originalFunctionName) {
        var sourceMapInfo = sourceMapConsumer.originalPositionFor({line:originalLine, column:originalColumn||0})       // the 0 is for browsers (like firefox) that don't output column numbers
        var line = sourceMapInfo.line
        var column = sourceMapInfo.column
        var fn = sourceMapInfo.name

        if(sourceMapInfo.source !== null) {
            var relative = isRelative(sourceMapInfo.source)

            /* I don't think this is needed any longer, and probably isn't correct - this was working around an issue in webpack: See https://github.com/webpack/webpack/issues/559 and https://github.com/webpack/webpack/issues/238
            if(sourceMapConsumer.sourceRoot !== null) {
                sourceMapInfo.source = sourceMapInfo.source.replace(sourceMapConsumer.sourceRoot, '') // remove sourceRoot
            }*/

            if(relative) {
                var file = Url.resolve(originalFilePath, path.basename(sourceMapInfo.source))
            } else {
                var file = sourceMapInfo.source
            }


            var originalFile = true
        } else {
            var file = originalFilePath
            var originalFile = false
        }

        if(fn === null || !originalFile) {
            fn = originalFunctionName
        }
        if(line === null || !originalFile) {
            line = originalLine
            column = originalColumn
        }
        if(column === null) {
            column = undefined
        }

        if(file != undefined && sourceMapConsumer.sourcesContent != undefined) { // intentional single !=
            var index = sourceMapConsumer.sources.indexOf(file)
            var sourceLines = sourceMapConsumer.sourcesContent[index]
            if(sourceLines !== undefined) sourceLines = sourceLines.split('\n')
        }

        return {
            file: file,
            function: fn,
            line: line,
            column: column,
            usingOriginalFile: originalFile,
            sourceLines: sourceLines
        }
    }

    // gets the actual lines of the call
    // if multiLineSearch is true, it finds
    function getFunctionCallLines(sourcesContent, filePath, functionName, lineNumber, multiLineSearch, warningHandler) {
        if(sourcesContent !==  undefined) {
            var source = Future(sourcesContent)
        } else {
            var source = options.getScriptSourceLines(filePath)
        }
        return source.catch(function(e) {
            warningHandler(e)
            return Future(undefined)

        }).then(function(fileLines) {
            if(fileLines !== undefined) {

                var startLine = findStartLine(fileLines, functionName, lineNumber)
                if(startLine === 'lineOfCodeNotFound') {
                    return Future("<line of code not found (possibly an error?)> ")

                } else if(startLine !== 'sourceNotAvailable') {
                    if(multiLineSearch) {
                        return Future(findFullSourceLine(fileLines, startLine))
                    } else {
                        return Future(fileLines[startLine].trim())
                    }
                }
            }
            // else
            return Future("<source not available>")

        })
    }

    var sourceMapConsumerCache = {} // a map from a script url to a future of its SourceMapConsumer object (null means no sourcemap exists)
    function getSourceMapConsumer(url, warningHandler) {
        if(sourceMapConsumerCache[url] === undefined) {
            try {
                sourceMapConsumerCache[url] = options.getSourceMapObject(url, warningHandler).then(function(sourceMapObject) {
                    if(sourceMapObject !== undefined) {
                        if(sourceMapObject.version === undefined) {
                            warningHandler(new Error("Sourcemap for "+url+" doesn't contain the required 'version' property. Assuming version 2."))
                            sourceMapObject.version = 2 // assume version 2 to make browserify's broken sourcemap format that omits the version
                        }
                        return Future(new SourceMapConsumer(sourceMapObject))
                    } else {
                        return Future(undefined)
                    }
                })
            } catch(e) {
                sourceMapConsumerCache[url] = Future(undefined)
                warningHandler(e)
            }
        }

        return sourceMapConsumerCache[url]
    }

    // takes an exception and returns a future exception that has a stacktrace with sourcemapped tracelines
    function mapException(exception, warningHandler) {
        try {
            if(exception instanceof Error) {
                var stacktrace;
                return options.getExceptionInfo(exception).then(function(trace){
                    stacktrace = trace

                    var smcFutures = []
                    for(var n=0; n<trace.length; n++) {
                        if(trace[n].file !== undefined) {
                            smcFutures.push(getSourceMapConsumer(trace[n].file, warningHandler))
                        } else {
                            smcFutures.push(Future(undefined))
                        }
                    }

                    return Future.all(smcFutures)
                }).then(function(sourceMapConsumers) {
                    var CustomMappedException = proto(MappedException, function() {
                        // set the name so it looks like the original exception when printed
                        // this subclasses MappedException so that name won't be an own-property
                        this.name = exception.name
                    })

                    try {
                        throw CustomMappedException(exception, stacktrace, sourceMapConsumers)  // IE doesn't give exceptions stack traces unless they're actually thrown
                    } catch(mappedExcetion) {
                        return Future(mappedExcetion)
                    }
                })
            } else {
                return Future(exception)
            }
        } catch(e) {
            var errorFuture = new Future
            errorFuture.throw(e)
            return errorFuture
        }
    }

    // an exception where the stacktrace's files and lines are mapped to the original file (when applicable)
    var MappedException = proto(Error, function(superclass) {

        // constructor. Takes the parameters:
            // originalError
            // traceInfo - an array where each element is an object containing information about that stacktrace line
            // sourceMapConsumers - an array of the same length as traceInfo where each element is the sourcemap consumer for the corresponding info in traceInfo
        this.init = function(originalError, traceInfo, sourceMapConsumers) {
            superclass.call(this, originalError.message)

            for(var p in originalError) {
                if(Object.hasOwnProperty.call(originalError, p)) {
                    try {
                        this[p] = originalError[p]
                    } catch(e) {
                        console.log("Error setting property "+p+' with value '+originalError[p])
                    }
                }
            }

            var newTraceLines = []
            for(var n=0; n<traceInfo.length; n++) {
                var info = traceInfo[n]
                if(sourceMapConsumers[n] !== undefined) {
                    info = getMappedSourceInfo(sourceMapConsumers[n], info.file, info.line, info.column, info.function)
                }

                var fileLineColumn = info.line
                if(info.column !== undefined) {
                    fileLineColumn += ':'+info.column
                }
                if(info.file !== undefined) {
                    fileLineColumn = info.file+':'+fileLineColumn
                }

                var traceLine = "    at "
                if(info.function !== undefined) {
                    traceLine += info.function+' ('+fileLineColumn+')'
                } else {
                    traceLine += fileLineColumn
                }

                newTraceLines.push(traceLine)
            }

            Object.defineProperty(this, 'stack', {
                get: function() {
                    return this.name+': '+this.message+'\n'+newTraceLines.join('\n')
                }
            })
        }
    })

    // attempts to find the full function call expression (over multiple lines) given the sources lines and a starting point
    function findFullSourceLine(fileLines, startLine) {
        var lines = []
        var parenCount = 0
        var mode = 0 // mode 0 for paren searching, mode 1 for double-quote searching, mode 2 for single-quote searching
        var lastWasBackslash = false // used for quote searching
        for(var n=startLine; n<fileLines.length; n++) {
            var line = fileLines[n]
            lines.push(line.trim())

            for(var i=0; i<line.length; i++) {
                var c = line[i]

                if(mode === 0) {
                    if(c === '(') {
                        parenCount++
                        //if(parenCount === 0) {
                          //  return lines.join('\n') // done
                        //}
                    } else if(c === ')' && parenCount > 0) {
                        parenCount--
                        if(parenCount === 0) {
                            return lines.join('\n') // done
                        }
                    } else if(c === '"') {
                        mode = 1
                    } else if(c === "'") {
                        mode = 2
                    }
                } else if(mode === 1) {
                    if(c === '"' && !lastWasBackslash) {
                        mode = 0
                    }

                    lastWasBackslash = c==='\\'
                } else { // mode === 2
                    if(c === "'" && !lastWasBackslash) {
                        mode = 0
                    }

                    lastWasBackslash = c==='\\'
                }
            }
        }

        return lines.join('\n') // if it gets here, something minor went wrong
    }

    // finds the line a function started on given the file's lines, and the stack trace line number (and function name)
    // returns undefined if something went wrong finding the startline
    function findStartLine(fileLines, functionName, lineNumber) {
        var startLine = lineNumber - 1
        while(true) {
            if(startLine < 0) {
                return 'lineOfCodeNotFound' // something went wrong if this is being returned (the functionName wasn't found above - means you didn't get the function name right)
            }

            var line = fileLines[startLine]
            if(line === undefined) {
                return 'sourceNotAvailable'
            }

            //lines.push(line.trim())
            var containsFunction = line.indexOf(functionName) !== -1
            if(containsFunction) {
                return startLine
            }

            startLine--
        }
    }

    function groupid() {
        groupid.next++
        return groupid.next
    }
    groupid.next = -1

    // returns a Unix Timestamp for now
    function now() {
        return (new Date()).getTime()
    }

    return {
        test: UnitTest
    }
}

function newError(message, ErrorPrototype) {
    try {
        throw new Error(message) // IE needs an exception to be actually thrown to get a stack trace property
    } catch(e) {
        return e
    }
}


/***/ }),
/* 30 */
/*!*****************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/proto/proto.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2013 Billy Tetrud - Free to use for any purpose: MIT License*/

var noop = function() {}

var prototypeName='prototype', undefined, protoUndefined='undefined', init='init', ownProperty=({}).hasOwnProperty; // minifiable variables
function proto() {
    var args = arguments // minifiable variables

    if(args.length == 1) {
        var parent = {init: noop}
        var prototypeBuilder = args[0]

    } else { // length == 2
        var parent = args[0]
        var prototypeBuilder = args[1]
    }

    // special handling for Error objects
    var namePointer = {}    // name used only for Error Objects
    if([Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError].indexOf(parent) !== -1) {
        parent = normalizeErrorObject(parent, namePointer)
    }

    // set up the parent into the prototype chain if a parent is passed
    var parentIsFunction = typeof(parent) === "function"
    if(parentIsFunction) {
        prototypeBuilder[prototypeName] = parent[prototypeName]
    } else {
        prototypeBuilder[prototypeName] = parent
    }

    // the prototype that will be used to make instances
    var prototype = new prototypeBuilder(parent)
    namePointer.name = prototype.name

    // if there's no init, assume its inheriting a non-proto class, so default to applying the superclass's constructor.
    if(!prototype[init] && parentIsFunction) {
        prototype[init] = function() {
            parent.apply(this, arguments)
        }
    }

    // constructor for empty object which will be populated via the constructor
    var F = function() {}
        F[prototypeName] = prototype    // set the prototype for created instances

    var constructorName = prototype.name?prototype.name:''
    if(prototype[init] === undefined || prototype[init] === noop) {
        var ProtoObjectFactory = new Function('F',
            "return function " + constructorName + "(){" +
                "return new F()" +
            "}"
        )(F)
    } else {
        // dynamically creating this function cause there's no other way to dynamically name a function
        var ProtoObjectFactory = new Function('F','i','u','n', // shitty variables cause minifiers aren't gonna minify my function string here
            "return function " + constructorName + "(){ " +
                "var x=new F(),r=i.apply(x,arguments)\n" +    // populate object via the constructor
                "if(r===n)\n" +
                    "return x\n" +
                "else if(r===u)\n" +
                    "return n\n" +
                "else\n" +
                    "return r\n" +
            "}"
        )(F, prototype[init], proto[protoUndefined]) // note that n is undefined
    }

    prototype.constructor = ProtoObjectFactory;    // set the constructor property on the prototype

    // add all the prototype properties onto the static class as well (so you can access that class when you want to reference superclass properties)
    for(var n in prototype) {
        addProperty(ProtoObjectFactory, prototype, n)
    }

    // add properties from parent that don't exist in the static class object yet
    for(var n in parent) {
        if(ownProperty.call(parent, n) && ProtoObjectFactory[n] === undefined) {
            addProperty(ProtoObjectFactory, parent, n)
        }
    }

    ProtoObjectFactory.parent = parent;            // special parent property only available on the returned proto class
    ProtoObjectFactory[prototypeName] = prototype  // set the prototype on the object factory

    return ProtoObjectFactory;
}

proto[protoUndefined] = {} // a special marker for when you want to return undefined from a constructor

module.exports = proto

function normalizeErrorObject(ErrorObject, namePointer) {
    function NormalizedError() {
        var tmp = new ErrorObject(arguments[0])
        tmp.name = namePointer.name

        this.message = tmp.message
        if(Object.defineProperty) {
            /*this.stack = */Object.defineProperty(this, 'stack', { // getter for more optimizy goodness
                get: function() {
                    return tmp.stack
                },
                configurable: true // so you can change it if you want
            })
        } else {
            this.stack = tmp.stack
        }

        return this
    }

    var IntermediateInheritor = function() {}
        IntermediateInheritor.prototype = ErrorObject.prototype
    NormalizedError.prototype = new IntermediateInheritor()

    return NormalizedError
}

function addProperty(factoryObject, prototype, property) {
    try {
        var info = Object.getOwnPropertyDescriptor(prototype, property)
        if(info.get !== undefined || info.get !== undefined && Object.defineProperty !== undefined) {
            Object.defineProperty(factoryObject, property, info)
        } else {
            factoryObject[property] = prototype[property]
        }
    } catch(e) {
        // do nothing, if a property (like `name`) can't be set, just ignore it
    }
}

/***/ }),
/* 31 */
/*!******************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/async-future/asyncFuture.js ***!
  \******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2013 Billy Tetrud - Free to use for any purpose: MIT License*/

var trimArgs = __webpack_require__(/*! trimArguments */ 21)


module.exports = Future

Future.debug = false // switch this to true if you want ids and long stack traces

var curId = 0         // for ids\
function Future(value) {
	if(arguments.length > 0) {
		var f = new Future()
        f.return(value)
        return f
	} else {
        this.isResolved = false
        this.queue = []
        this.n = 1 // future depth (for preventing "too much recursion" RangeErrors)
        if(Future.debug) {
            curId++
            this.id = curId
        }
    }
}

// static methods

// has one parameter: either a bunch of futures, or a single array of futures
// returns a promise that resolves when one of them errors, or when all of them succeeds
Future.all = function() {
    if(arguments[0] instanceof Array) {
        var futures = arguments[0]
    } else {
        var futures = trimArgs(arguments)
    }

    var f = new Future()
    var results = []

    if(futures.length > 0) {
        var current = futures[0]
        futures.forEach(function(future, index) {
            current = current.then(function(v) {
                results[index] = v
                return futures[index+1]
            })
        })

        //if
        current.catch(function(e) {
            f.throw(e)
        })
        // else
        current.then(function() {
            f.return(results)
        })


    } else {
        f.return(results)
    }

    return f
}

// either used like futureWrap(function(){ ... })(arg1,arg2,etc) or
//  futureWrap(object, 'methodName')(arg1,arg2,etc)
Future.wrap = function() {
    // function
    if(arguments.length === 1) {
        var fn = arguments[0]
        var object = undefined


    // object, function
    } else {
        var object = arguments[0]
        var fn = object[arguments[1]]
    }

    return function() {
        var args = Array.prototype.slice.call(arguments)
        var future = new Future
        args.push(future.resolver())
        var me = this
        if(object) me = object
        fn.apply(me, args)
        return future
    }
}

// future wraps a function who's callback only takes one parameter - the return value (no error is available)
// eg: function(result) {}
Future.wrapSingleParameter = function() {
    if(arguments.length === 1) {
        var fn = arguments[0]
    } else {
        var object = arguments[0]
        var method = arguments[1]
        var fn = object[method]
    }

    return function() {
        var args = Array.prototype.slice.call(arguments)
		var future = new Future
		args.push(function(result) {
		    future.return(result)
		})
		var me = this
        if(object) me = object
        fn.apply(me, args)
		return future
    }
}


// default
var unhandledErrorHandler = function(e) {
    setTimeout(function() {
        throw e
    },0)
}

// setup unhandled error handler
// unhandled errors happen when done is called, and  then an exception is thrown from the future
Future.error = function(handler) {
    unhandledErrorHandler = handler
}

// instance methods

// returns a value for the future (can only be executed once)
// if there are callbacks waiting on this value, they are run in the next tick
    // (ie they aren't run immediately, allowing the current thread of execution to complete)
Future.prototype.return = function(v) {
    resolve(this, 'return', v)
}
Future.prototype.throw = function(e) {
    if(this.location !== undefined) {
        e.stack += '\n    ---------------------------\n'+this.location.stack.split('\n').slice(4).join('\n')
    }
    resolve(this, 'error', e)
    return this
}

function setNext(that, future) {
    resolve(that, 'next', future)
}

function wait(that, cb) {
    if(that.isResolved) {
        executeCallbacks(that, [cb])
    } else {
        that.queue.push(cb)
    }
}

// duck typing to determine if something is or isn't a future
var isLikeAFuture = Future.isLikeAFuture = function(x) {
    return x.isResolved !== undefined && x.queue !== undefined && x.then !== undefined
}

function waitOnResult(f, result, cb) {
    wait(result, function() {
        if(this.hasError) {
            f.throw(this.error)
        } else if(this.hasNext) {
            waitOnResult(f, this.next, cb)
        } else {
            try {
                setNext(f, executeCallback(cb,this.result))
            } catch(e) {
                f.throw(e)
            }
        }
    })
}


// cb takes one parameter - the value returned
// cb can return a Future, in which case the result of that Future is passed to next-in-chain
Future.prototype.then = function(cb) {
    var f = createChainFuture(this)
    wait(this, function() {
        if(this.hasError)
            f.throw(this.error)
        else if(this.hasNext)
            waitOnResult(f, this.next, cb)
        else {
            try {
                setNext(f, executeCallback(cb,this.result))
            } catch(e) {
                f.throw(e)
            }
        }
    })
    return f
}
// cb takes one parameter - the error caught
// cb can return a Future, in which case the result of that Future is passed to next-in-chain
Future.prototype.catch = function(cb) {
    var f = createChainFuture(this)
    wait(this, function() {
        if(this.hasError) {
            try {
                setNext(f, executeCallback(cb,this.error))
            } catch(e) {
                f.throw(e)
            }
        } else if(this.hasNext) {
            this.next.then(function(v) {
                f.return(v)
            }).catch(function(e) {
                try {
                    setNext(f, executeCallback(cb,e))
                } catch(e) {
                    f.throw(e)
                }
            })
        } else {
            f.return(this.result)
        }
    })
    return f
}
// cb takes no parameters
// callback's return value is ignored, but thrown exceptions propogate normally
Future.prototype.finally = function(cb) {
    var f = createChainFuture(this)
    wait(this, function() {
        try {
            var that = this
            if(this.hasNext) {
                this.next.then(function(v) {
                    var x = executeCallback(cb)
                    f.return(v)
                    return x
                }).catch(function(e) {
                    var x = executeCallback(cb)
                    f.throw(e)
                    return x
                }).done()
            } else if(this.hasError) {
                Future(true).then(function() {
                    return executeCallback(cb)
                }).then(function() {
                    f.throw(that.error)
                }).catch(function(e) {
                    f.throw(e)
                }).done()

            } else  {
                Future(true).then(function() {
                    return executeCallback(cb)
                }).then(function() {
                    f.return(that.result)
                }).catch(function(e) {
                    f.throw(e)
                }).done()
            }
        } catch(e) {
            f.throw(e)
        }
    })
    return f
}

// a future created for the chain functions (then, catch, and finally)
function createChainFuture(that) {
    var f = new Future
    f.n = that.n + 1
    if(Future.debug) {
        f.location = createException()  // used for long traces
    }
    return f
}

// all unused futures should end with this (e.g. most then-chains)
// detatches the future so any propogated exception is thrown (so the exception isn't silently lost)
Future.prototype.done = function() {
    wait(this, function() {
        if(this.hasError) {
            unhandledErrorHandler(this.error)
        } else if(this.hasNext) {
            this.next.catch(function(e) {
                unhandledErrorHandler(e)
            })
        }
    })
}



Future.prototype.resolver = function() {
    var me = this

    return function(e,v) {
        if(e) { // error argument
            me.throw(e)
        } else {
            me.return(v)
        }
    }
}

Future.prototype.resolved = function() {
    return this.isResolved
}


function resolve(that, type, value) {
    if(that.isResolved)
        throw Error("Future resolved more than once! Resolution: "+value)

    that.isResolved = true
    that.hasError = type === 'error'
    that.hasNext = type === 'next' && value !== undefined

    if(that.hasError)
        that.error = value
    else if(that.hasNext)
        that.next = value
    else
        that.result = value

    // 100 is a pretty arbitrary number - it should be set significantly lower than common maximum stack depths, and high enough to make sure performance isn't significantly affected
    // in using this for deadunit, firefox was getting a recursion error at 150, but not at 100. This doesn't mean that it can't happen at 100 too, but it'll certainly make it less likely
    // if you're getting recursion errors even with this mechanism, you probably need to figure that out in your own code
    if(that.n % 100 !== 0) {
        executeCallbacks(that, that.queue)
    } else {
        setTimeout(function() { // this prevents too much recursion errors
            executeCallbacks(that, that.queue)
        }, 0)
    }
}

function executeCallbacks(that, callbacks) {
    if(callbacks.length > 0) {
        try {
            callbacks.forEach(function(cb) {
                cb.apply(that)
            })
        } catch(e) {
            unhandledErrorHandler(e)
        }
    }
}

// executes a callback and ensures that it returns a future
function executeCallback(cb, arg) {
    var r = cb(arg)
    if(r !== undefined && !isLikeAFuture(r) )
        throw Error("Value returned from then or catch ("+r+") is *not* a Future. Callback: "+cb.toString())

    return r
}

function createException() {
    try {
        throw new Error()
    } catch(e) {
        return e
    }
}

/***/ }),
/* 32 */
/*!*****************************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/source-map/lib/source-map-generator.js ***!
  \*****************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(/*! ./base64-vlq */ 33);
var util = __webpack_require__(/*! ./util */ 4);
var ArraySet = __webpack_require__(/*! ./array-set */ 34).ArraySet;
var MappingList = __webpack_require__(/*! ./mapping-list */ 77).MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source)
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),
/* 33 */
/*!*******************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/source-map/lib/base64-vlq.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(/*! ./base64 */ 76);

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),
/* 34 */
/*!******************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/source-map/lib/array-set.js ***!
  \******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ 4);
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;


/***/ }),
/* 35 */
/*!*******************************************************!*\
  !*** ../node_modules/deadunit-core/src/isRelative.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! path */ 3)

module.exports = function isRelative(p) {
    var normal = path.normalize(p)
    var absolute = path.resolve(p)
    return normal != absolute && p.indexOf('://') === -1// second part for urls
}

/***/ }),
/* 36 */
/*!******************!*\
  !*** ../rpep.js ***!
  \******************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! eventemitter2 */ 37);
var proto = __webpack_require__(/*! proto */ 13);
var utils = __webpack_require__(/*! ./utils */ 9);
var DuplexEventEmitter = __webpack_require__(/*! ./DuplexEventEmitter */ 96);
var receive = 0;
var respond = 1;
var stream = 2;
var defaultMaxId = 9007199254740992;
var reservedFireCommands = {
    close: 1,
    idDiscontinuity: 1
};
var reservedRequestAndStreamCommands = {
    close: 1,
    idDiscontinuity: 1
};
var reservedRequestAndStreamErrorCommand = {
    error: 1
};
var reservedListeningCommands = {
    close: 1
};
var reservedRespondAndStreamListenCommands = {
    idDiscontinuity: 1
};
var reservedEventListeningEvents = {
    order: 1
};
var reservedStreamEmissionEvents = {
    orderNumberDiscontinuity: 1
};
var buffer = 50;
var PeerError = proto(Error, function () {
    this.name = "PeerError";
});
module.exports = proto(EventEmitter, function () {
    this.PeerError = PeerError;
    this.init = function (transport, serialization, options) {
        if (!options) 
            options = {};
        this.transport = transport;
        this.serialization = serialization;
        this.options = options;
        if (this.options.maxId === undefined) 
            this.options.maxId = defaultMaxId;
        this.commands = {};
    };
    this.connect = function () {
        var args = Array.prototype.slice.call(arguments);
        var that = this;
        return new Promise(function (resolve, reject) {
            var connection = that.transport.connect.apply(that.transport.connect, args.concat([that.options]));
            var onOpenCalled = false, errors = [];
            connection.onOpen(function () {
                onOpenCalled = true;
                resolve(rpepConn);
            });
            var rpepConn = RpepConnection(that, connection, {
                isServer: false,
                onClose: function () {
                    if (!onOpenCalled) {
                        var message = "Connection couldn't be opened";
                        if (errors.length > 0) {
                            message += ': \n' + errors.join('\n');
                        }
                        var e = new Error(message);
                        e.errors = errors;
                        reject(e);
                    }
                }
            });
            connection.onError(function (e) {
                errors.push(e);
            });
        });
    };
    this.listen = function () {
        var args = Array.prototype.slice.call(arguments);
        var requestHandler = args[args.length - 1];
        var transportListenArguments = args.slice(0, -1);
        var that = this;
        return new Promise(function (resolve, reject) {
            if (that.listener !== undefined) {
                throw new Error("Rpep object already listening!");
            }
            that.listener = that.transport.listen.apply(that.transport, transportListenArguments.concat([that.options,
                function (request) {
                requestHandler({
                    accept: function () {
                        var connection = request.accept.apply(that, arguments);
                        return RpepConnection(that, connection, {
                            isServer: true
                        });
                    },
                    reject: function () {
                        request.reject.apply(that, arguments);
                    },
                    rawRequest: request
                });
            }]));
            var listening = false;
            that.listener.onListening(function () {
                listening = true;
                resolve();
            });
            that.listener.onError(function (e) {
                that.emit('error', e);
            });
            that.listener.onClose(function (e) {
                that.listener = undefined;
                that.emit('close');
                if (listening === false) 
                    reject();
            });
        });
    };
    this.close = function () {
        if (this.listener) 
            this.listener.close();
    };
    this.receive = function (command, handler) {
        addCommand(this, receive, command, handler);
    };
    this.respond = function (command, handler) {
        addCommand(this, respond, command, handler);
    };
    this.stream = function (command, handler) {
        if (!(handler instanceof Function)) {
            throw new Error("rpep.stream requires a callback as the second argument");
        }
        addCommand(this, stream, command, handler);
    };
    this.default = function (handler) {
        if (this.defaultHandler !== undefined) 
            throw handlerError('default handler');
        this.defaultHandler = handler;
    };
    this.preHandle = function (handler) {
        if (this.preHandler !== undefined) 
            throw handlerError('preHandle');
        this.preHandler = handler;
    };
    this.rawHandle = function (handler) {
        if (this.rawHandler !== undefined) 
            throw handlerError('rawHandle');
        this.rawHandler = handler;
    };
    function addCommand(that, type, command, handler) {
        if (that.commands[command] !== undefined) 
            throw handlerError('handler for "' + command + '"');
        if (command in reservedListeningCommands) 
            throw new Error("Can't setup a handler for the command '" + command + "', because it's reserved for internal use.");
        if ((type === respond || type === stream) && command in reservedRespondAndStreamListenCommands) 
            throw new Error("Can't setup a receive or stream handler for the command '" + command + "', because it's reserved for as a receive command. If you'd like to listen for this command, use `receive`.");
        that.commands[command] = {
            type: type,
            handler: handler
        };
    }
    
    function handlerError(handlerName) {
        return new Error('A ' + handlerName + ' already exists! You can only have one handler per command.');
    }
    
});
var RpepConnection = proto(EventEmitter, function () {
    this.init = function (rpepCoreObject, connectionObject, connectionOptions) {
        this.transport = rpepCoreObject.transport;
        this.serialization = rpepCoreObject.serialization;
        this.commands = rpepCoreObject.commands;
        this.defaultHandler = rpepCoreObject.defaultHandler;
        this.preHandler = rpepCoreObject.preHandler;
        this.rawHandler = rpepCoreObject.rawHandler;
        this.maxSendSize = rpepCoreObject.options.maxSendSize;
        this.maxReceiveSize = rpepCoreObject.options.maxReceiveSize;
        this.sendCommandErrorInfo = rpepCoreObject.options.sendCommandErrorInfo;
        this.maxId = rpepCoreObject.options.maxId;
        this.closeTimeout = rpepCoreObject.options.closeTimeout || 30000;
        this.server = connectionOptions.isServer;
        this.connection = connectionObject;
        this.connected = true;
        this.closing = false;
        this.sessionData = {};
        this.commandState = {};
        Object.defineProperty(this, 'rawConnection', {
            get: function () {
                return this.connection.rawConnection;
            }
        });
        if (this.server) 
            this.nextId = 0;
         else 
            this.nextId = 1;
        var that = this;
        if (this.connection.onClose) {
            this.connection.onClose(function () {
                if (connectionOptions.onClose) 
                    connectionOptions.onClose();
                that.connected = false;
                that.emit('close');
            });
        } else {
            this.on('closeMessage', function () {
                that.connected = false;
                that.emit('close');
            });
        }
        this.connection.onMessage(function (rawMessage) {
            handle(that, rawMessage);
        });
        this.connection.onError(function (e) {
            that.emit('error', e);
        });
    };
    this.close = function () {
        var that = this;
        if (this.connected) {
            this.closing = true;
            if (Object.keys(this.commandState).length === 0) {
                closeInternal(this);
            } else {
                this.closeTimeoutHandle = setTimeout(function () {
                    that.closeTimeoutHandle = undefined;
                    closeInternal(that);
                }, this.closeTimeout);
            }
        }
    };
    this.drop = function () {
        if (this.connected && this.connection.drop) {
            this.connection.drop();
        } else {
            this.close();
        }
    };
    this.fire = function (command) {
        if (command === 'error') {
            if (arguments[1].message === undefined) 
                throw new Error("The data for an 'error' fire-and-forget message must have a 'message' property (eg an Error object has a message property)");
             else if (arguments.length !== 2) 
                throw new Error("An 'error' fire-and-forget message can only take one argument - the error.");
        }
        if (command in reservedFireCommands) {
            throw new Error("Can't fire an '" + command + "' event directly; '" + command + "' is a global command reserved for internal use.");
        }
        var message = [command];
        if (command === 'error') {
            var error = arguments[1];
            var errorData = {};
            for (var k in error) {
                if (k !== 'message') 
                    errorData[k] = error[k];
            }
            message.push(error.message, errorData);
        } else {
            addData(message, arguments);
        }
        send(this, message);
    };
    this.request = function (command) {
        if (command in reservedRequestAndStreamCommands) 
            throw new Error("Can't do a '" + command + "' request directly; '" + command + "' is a global command reserved for internal use.");
        if (command in reservedRequestAndStreamErrorCommand) 
            throw new Error("Can't do an 'error' request; 'error' is reserved for global fire-and-forget errors.");
        if (this.commandState[this.nextId] !== undefined) 
            throw new Error('There is already a callback for id: ' + this.nextId);
        var message = [command,this.nextId];
        addData(message, arguments);
        send(this, message);
        var theResolver = utils.resolver();
        theResolver.command = command;
        this.commandState[this.nextId] = theResolver;
        incrementId(this);
        return theResolver.f;
    };
    this.streamConnect = function (command) {
        if (command in reservedRequestAndStreamCommands) 
            throw new Error("Can't open a '" + command + "' stream directly; '" + command + "' is a global command reserved for internal use.");
        if (command in reservedRequestAndStreamErrorCommand) 
            throw new Error("Can't open an 'error' stream; 'error' is reserved for global fire-and-forget errors.");
        if (this.commandState[this.nextId] !== undefined) 
            throw new Error('There is already a callback for id: ' + this.nextId);
        var message = [command,this.nextId];
        addData(message, arguments);
        var emitter = this.commandState[this.nextId] = createStreamEmiter(this, this.nextId);
        emitter.command = command;
        send(this, message);
        incrementId(this);
        return emitter;
    };
    function serialize(that, data) {
        return that.serialization.serialize(data);
    }
    
    function deserialize(that, serializedData) {
        return that.serialization.deserialize(serializedData);
    }
    
    function closeInternal(that) {
        if (that.closeTimeoutHandle !== undefined) {
            clearTimeout(that.closeTimeoutHandle);
        }
        var ids = Object.keys(that.commandState);
        if (ids.length > 0) {
            var errorMessage = "Connection has been closed after a " + that.closeTimeout + "ms timeout and some pending requests and streams remain unfulfilled. " + "The following requests and streams were still active up until the timeout:\n";
            var activeCommandStates = [];
            for (var k in that.commandState) {
                var info = that.commandState[k];
                if (info instanceof RpepDuplexEventEmitter) {
                    if (info.endMessageSent) {
                        activeCommandStates.push("* Stream " + k + " '" + info.command + "' waiting for other side to 'end'");
                    } else if (info.endMessageReceived) {
                        activeCommandStates.push("* Stream " + k + " '" + info.command + "' has received 'end' but hasn't sent 'end'");
                    } else {
                        activeCommandStates.push("* Stream " + k + " '" + info.command + "' is still active");
                    }
                } else if (info.f !== undefined) {
                    activeCommandStates.push("* Request " + k + " to '" + info.command + "'");
                } else {
                    activeCommandStates.push("* Response " + k + " for '" + info.command + "'");
                }
            }
            errorMessage += activeCommandStates.join('\n');
            var e = new Error(errorMessage);
            e.ids = ids;
            that.commandState = {};
            that.emit('error', e);
        }
        if (that.connection.onClose === undefined) {
            send(that, ['close']);
        }
        that.connection.close();
        that.connection = undefined;
    }
    
    function checkCleanClose(that) {
        if (that.closing && Object.keys(that.commandState).length === 0) {
            closeInternal(that);
        }
    }
    
    function incrementId(that) {
        var prevId = that.nextId;
        do {
            that.nextId += 2;
            if (that.nextId > that.maxId) {
                that.nextId = that.nextId % 2;
            }
        } while (that.nextId in that.commandState && prevId !== that.nextId);
        if (prevId === that.nextId) 
            throw new Error("No valid rpep IDs left to use.");
        if (that.nextId !== prevId + 2) 
            send(that, ['idDiscontinuity',[prevId,that.nextId]]);
    }
    
    function addData(message, theArguments) {
        var data = Array.prototype.slice.call(theArguments, 1);
        if (data.length === 1) 
            message.push(data[0]);
         else if (data.length > 1) 
            message.push(data);
    }
    
    function getArrayData(data) {
        if (data === undefined) 
            return [];
         else if (data instanceof Array) 
            return data;
         else 
            return [data];
    }
    
    function incrementOrderNumber(that, emitter) {
        emitter.nextOrderNumber += 1;
        if (emitter.nextOrderNumber > that.maxId) {
            var prevNumber = emitter.nextOrderNumber - 1;
            emitter.nextOrderNumber = 0;
            sendEvent(that, emitter, emitter.id, 'orderNumberDiscontinuity', ['',
                prevNumber,emitter.nextOrderNumber]);
        }
    }
    
    function createErrorInfo(error) {
        var data = {}, any = false;
        for (var k in error) {
            if (k !== 'message') {
                data[k] = error[k];
                any = true;
            }
        }
        var errorInfo = [error.message];
        if (any) {
            errorInfo.push(data);
        }
        return errorInfo;
    }
    
    function createErrorFromMessage(errorMessage, errorData) {
        var e = new Error(errorMessage);
        for (var k in errorData) {
            if (k !== 'message') 
                e[k] = errorData[k];
        }
        return e;
    }
    
    function createStreamEmiter(that, id) {
        var emitter = RpepDuplexEventEmitter(function onEmit(event) {
            if (emitter.endMessageSent) 
                throw new Error("Stream 'end' event has been sent, can't send more events.");
            if (event in reservedStreamEmissionEvents) 
                throw new Error("Can't emit the '" + event + "' event directly; '" + event + "' is reserved for internal use.");
            if (event === 'error') {
                if (arguments[1].message === undefined) 
                    throw new Error("The data for an 'error' event must have a 'message' property (eg an Error object has a message property)");
                 else if (arguments.length !== 2) 
                    throw new Error("An 'error' event can only take one argument - the error.");
            }
            sendEvent(that, emitter, id, event, arguments);
        });
        emitter.id = id;
        emitter.orderingData = false;
        emitter.nextOrderNumber = 0;
        emitter.endMessageSent = false;
        return emitter;
    }
    
    function send(that, message) {
        var serializedMessage = serialize(that, message);
        if (that.maxSendSize !== undefined && serializedMessage.length > that.maxSendSize) {
            var e = new Error('maxMessageSizeExceeded');
            e.messageSize = serializedMessage.length;
            throw e;
        }
        if (that.connected) {
            that.connection.send(serializedMessage);
        } else {
            throw Error('Connection is closed');
        }
    }
    
    function sendEvent(that, emitter, id, event, args) {
        var message = [id];
        if (emitter.orderingData) 
            message.push(emitter.nextOrderNumber);
        message.push(event);
        if (event === 'error') 
            message.push(createErrorInfo(args[1]));
         else 
            addData(message, args);
        send(that, message);
        if (event === 'end') {
            emitter.endMessageSent = true;
            if (emitter.endMessageReceived) {
                delete that.commandState[id];
                checkCleanClose(that);
            }
        } else if (emitter.orderingData) {
            incrementOrderNumber(that, emitter);
        }
    }
    
    function handle(that, rawMessage) {
        try {
            if (that.rawHandler) {
                if (that.rawHandler.call(that, rawMessage) === 'ignore') {
                    return;
                }
            }
            try {
                var message = deserialize(that, rawMessage);
            } catch (e) {
                if (that.sendCommandErrorInfo) {
                    try {
                        that.fire("error", {
                            message: "unparsableCommand",
                            rawMessage: rawMessage
                        });
                    } catch (e) {
                        if (e.message === 'maxMessageSizeExceeded') 
                            that.fire("error", {
                            message: "unparsableCommand",
                            rawMessage: rawMessage.slice(0, 200)
                        });
                         else 
                            throw e;
                    }
                }
                return;
            }
            if (that.preHandler) {
                if (that.preHandler.call(that, message) === 'ignore') {
                    return;
                }
            }
            var type0 = typeof message[0];
            if (type0 === 'string') {
                if (message.length === 1 && message[0] === 'close') {
                    that.emit("closeMessage");
                    return;
                }
                var commandInfo = that.commands[message[0]];
                if (commandInfo === undefined) {
                    if (that.defaultHandler !== undefined) {
                        that.defaultHandler.call(that, message);
                        return;
                    }
                    if (message[0] === 'error') 
                        throw createErrorFromMessage(message[1], message[2]);
                    if (message[0] !== 'idDiscontinuity') 
                        that.fire('error', {
                        message: "noSuchCommand",
                        command: message[0]
                    });
                    return;
                }
                if (commandInfo.type === receive) {
                    if (message[0] === 'error') 
                        var data = [createErrorFromMessage(message[1], message[2])];
                     else 
                        var data = getArrayData(message[1]);
                    commandInfo.handler.apply(that, data);
                } else if (commandInfo.type === respond) {
                    var id = message[1];
                    if (!validateId(that, id)) {
                        return;
                    }
                    that.commandState[id] = {
                        command: message[0]
                    };
                    Promise.resolve().then(function () {
                        return commandInfo.handler.apply(that, getArrayData(message[2]).concat([id]));
                    }).then(function (result) {
                        delete that.commandState[id];
                        send(that, [id,result]);
                    }).catch(function (e) {
                        delete that.commandState[id];
                        if (e instanceof PeerError) {
                            var errorInfo = createErrorInfo(e);
                        } else {
                            var errorInfo = ['unexpectedPeerError',{}];
                            that.emit('error', e);
                        }
                        send(that, [id].concat(errorInfo));
                    });
                } else if (commandInfo.type === stream) {
                    var id = message[1];
                    if (!validateId(that, id)) {
                        return;
                    }
                    var emitter = that.commandState[id] = createStreamEmiter(that, id);
                    try {
                        commandInfo.handler.apply(that, [emitter].concat(getArrayData(message[2])).concat([id]));
                    } catch (e) {
                        that.emit('error', e);
                    }
                } else {
                    throw new Error("Invalid command type: " + commandInfo.type);
                }
            } else if (type0 === 'number') {
                if (!(message[0] in that.commandState)) {
                    that.fire("error", {
                        message: "rpepIdNotFound",
                        id: message[0]
                    });
                    return;
                }
                var info = that.commandState[message[0]];
                if (info instanceof RpepDuplexEventEmitter) {
                    var emitter = info;
                    if (typeof message[1] === 'string') {
                        var event = message[1], eventData = message[2];
                    } else if (typeof message[2] === 'string') {
                        var orderNumber = message[1], event = message[2], eventData = message[3];
                    } else {
                        throw new Error("Received invalid stream message: couldn't find string event name at position 1 or 2 in the message");
                    }
                    if (event === 'order') {
                        emitter.orderingData = eventData === true;
                    } else {
                        if (event === 'error') {
                            var error = createErrorFromMessage(eventData[0], eventData[1]);
                            emitter._external.emit('error', error, orderNumber);
                        } else {
                            var emitArgs = [event];
                            if (eventData !== undefined) 
                                emitArgs = emitArgs.concat(eventData);
                            if (orderNumber !== undefined) 
                                emitArgs.push(orderNumber);
                            emitter._external.emit.apply(emitter._external, emitArgs);
                            if (event === 'end') {
                                emitter.endMessageReceived = true;
                                if (emitter.endMessageSent) {
                                    delete that.commandState[message[0]];
                                    checkCleanClose(that);
                                }
                            }
                        }
                    }
                } else if (info.f !== undefined) {
                    var theResolver = info;
                    if (message.length === 3) {
                        theResolver.reject(createErrorFromMessage(message[1], message[2]));
                    } else {
                        theResolver.resolve(message[1]);
                    }
                    delete that.commandState[message[0]];
                    checkCleanClose(that);
                } else {
                    throw new Error("Shouldn't get here " + JSON.stringify(info));
                }
            } else {
                if (that.sendCommandErrorInfo) {
                    that.fire("error", {
                        message: "invalidMessage",
                        rawMessage: rawMessage.slice(0, 200)
                    });
                } else {
                    that.fire("error", {
                        message: "invalidMessage"
                    });
                }
            }
        } catch (e) {
            that.emit('error', e);
        }
    }
    
});
function validateId(that, id) {
    if (id > that.maxId) {
        var reason = "Id greater than ";
        if (that.maxId === defaultMaxId) 
            reason += "2^53";
         else 
            reason += that.maxId;
    } else if (that.server) {
        if (id % 2 !== 1) {
            var reason = "Id from client not odd";
        }
    } else if (id % 2 !== 0) {
        var reason = "Id from server not even";
    }
    if (reason !== undefined) {
        that.fire("error", {
            message: 'rpepInvalidId',
            reason: reason
        });
        return false;
    } else {
        return true;
    }
}

var RpepDuplexEventEmitter = proto(DuplexEventEmitter, function (superclass) {
    this.on = function (event, handler) {
        if (event in reservedEventListeningEvents) 
            throw new Error("Can't listen on the '" + event + "' event directly; the '" + event + "' event is reserved for internal use.");
        superclass.on.call(this, event, handler);
    };
    this.onAny = function (callback) {
        superclass.onAny.call(this, (function (eventName) {
            if (!(eventName in reservedEventListeningEvents)) {
                callback.apply(this, arguments);
            }
        }).bind(this));
    };
});


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFxycGVwLmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxHQUFBLENBQUksZUFBZSxPQUFBLENBQVE7QUFDM0IsR0FBQSxDQUFJLFFBQVEsT0FBQSxDQUFRO0FBRXBCLEdBQUEsQ0FBSSxRQUFRLE9BQUEsQ0FBUTtBQUNwQixHQUFBLENBQUkscUJBQXFCLE9BQUEsQ0FBUTtBQUdqQyxHQUFBLENBQUksVUFBVTtBQUNkLEdBQUEsQ0FBSSxVQUFVO0FBQ2QsR0FBQSxDQUFJLFNBQVM7QUFFYixHQUFBLENBQUksZUFBZTtBQUNuQixHQUFBLENBQUksdUJBQXVCO0lBQUMsT0FBTSxDQUFQLENBQUE7SUFBUyxpQkFBZ0I7O0FBQ3BELEdBQUEsQ0FBSSxtQ0FBbUM7SUFBQyxPQUFNLENBQVAsQ0FBQTtJQUFTLGlCQUFnQjs7QUFDaEUsR0FBQSxDQUFJLHVDQUF1QztJQUFDLE9BQU07O0FBQ2xELEdBQUEsQ0FBSSw0QkFBNEI7SUFBQyxPQUFNOztBQUN2QyxHQUFBLENBQUkseUNBQXlDO0lBQUMsaUJBQWdCOztBQUM5RCxHQUFBLENBQUksK0JBQStCO0lBQUMsT0FBTTs7QUFDMUMsR0FBQSxDQUFJLCtCQUErQjtJQUFDLDBCQUF5Qjs7QUFHN0QsR0FBQSxDQUFJLFNBQVM7QUFFYixHQUFBLENBQUksWUFBWSxLQUFBLENBQU0sT0FBTyxZQUFXO0lBQ3BDLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZO0FBQ2hCO0FBS0EsTUFBQSxDQUFPLE9BQVAsQ0FBQSxDQUFBLENBQWlCLEtBQUEsQ0FBTSxjQUFjLFlBQVc7SUFLNUMsSUFBQSxDQUFLLFNBQUwsQ0FBQSxDQUFBLENBQWlCO0lBa0RqQixJQUFBLENBQUssSUFBTCxDQUFBLENBQUEsQ0FBWSxVQUFTLFNBQVcsRUFBQSxhQUFlLEVBQUEsU0FBUztRQUNwRCxJQUFHLENBQUM7WUFBUyxPQUFBLENBQUEsQ0FBQSxDQUFVO1FBRXZCLElBQUEsQ0FBSyxTQUFMLENBQUEsQ0FBQSxDQUFpQjtRQUNqQixJQUFBLENBQUssYUFBTCxDQUFBLENBQUEsQ0FBcUI7UUFDckIsSUFBQSxDQUFLLE9BQUwsQ0FBQSxDQUFBLENBQWU7UUFDZixJQUFHLElBQUEsQ0FBSyxPQUFMLENBQWEsS0FBYixDQUFBLEdBQUEsQ0FBdUI7WUFBVyxJQUFBLENBQUssT0FBTCxDQUFhLEtBQWIsQ0FBQSxDQUFBLENBQXFCO1FBRTFELElBQUEsQ0FBSyxRQUFMLENBQUEsQ0FBQSxDQUFnQjtJQU14QjtJQUlJLElBQUEsQ0FBSyxPQUFMLENBQUEsQ0FBQSxDQUFlLFlBQVc7UUFDdEIsR0FBQSxDQUFJLE9BQU8sS0FBQSxDQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsQ0FBMkI7UUFFdEMsR0FBQSxDQUFJLE9BQU87UUFDWCxPQUFPLElBQUksT0FBSixDQUFZLFVBQVMsT0FBUyxFQUFBLFFBQVE7WUFDekMsR0FBQSxDQUFJLGFBQWEsSUFBQSxDQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLEtBQXZCLENBQTZCLElBQUEsQ0FBSyxTQUFMLENBQWUsU0FBUyxJQUFBLENBQUssTUFBTCxDQUFZLENBQUMsSUFBQSxDQUFLO1lBRXhGLEdBQUEsQ0FBSSxlQUFlLE9BQU8sU0FBUztZQUNuQyxVQUFBLENBQVcsTUFBWCxDQUFrQixZQUFXO2dCQUN6QixZQUFBLENBQUEsQ0FBQSxDQUFlO2dCQUNmLE9BQUEsQ0FBUTtZQUN4QjtZQUVZLEdBQUEsQ0FBSSxXQUFXLGNBQUEsQ0FBZSxNQUFNLFlBQVk7Z0JBQUMsVUFBUyxLQUFWLENBQUE7Z0JBQWlCLFNBQVMsWUFBVztvQkFDakYsSUFBRyxDQUFDLGNBQWM7d0JBQ2QsR0FBQSxDQUFJLFVBQVU7d0JBQ2QsSUFBRyxNQUFBLENBQU8sTUFBUCxDQUFBLENBQUEsQ0FBZ0IsR0FBRzs0QkFDbEIsT0FBQSxDQUFBLEVBQUEsQ0FBUyxNQUFBLENBQUEsQ0FBQSxDQUFPLE1BQUEsQ0FBTyxJQUFQLENBQVk7d0JBQ3BEO3dCQUVvQixHQUFBLENBQUksSUFBSSxJQUFJLEtBQUosQ0FBVTt3QkFDbEIsQ0FBQSxDQUFFLE1BQUYsQ0FBQSxDQUFBLENBQVc7d0JBQ1gsTUFBQSxDQUFPO29CQUMzQjtnQkFDQTs7WUFFWSxVQUFBLENBQVcsT0FBWCxDQUFtQixVQUFTLEdBQUc7Z0JBQzNCLE1BQUEsQ0FBTyxJQUFQLENBQVk7WUFDNUI7UUFDQTtJQUNBO0lBR0ksSUFBQSxDQUFLLE1BQUwsQ0FBQSxDQUFBLENBQWMsWUFBbUU7UUFDN0UsR0FBQSxDQUFJLE9BQU8sS0FBQSxDQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsQ0FBMkI7UUFDdEMsR0FBQSxDQUFJLGlCQUFpQixJQUFBLENBQUssSUFBQSxDQUFLLE1BQUwsQ0FBQSxDQUFBLENBQVk7UUFDdEMsR0FBQSxDQUFJLDJCQUEyQixJQUFBLENBQUssS0FBTCxDQUFXLEdBQUUsQ0FBQztRQUU3QyxHQUFBLENBQUksT0FBTztRQUNYLE9BQU8sSUFBSSxPQUFKLENBQVksVUFBUyxPQUFTLEVBQUEsUUFBUTtZQUN6QyxJQUFHLElBQUEsQ0FBSyxRQUFMLENBQUEsR0FBQSxDQUFrQixXQUFXO2dCQUM1QixNQUFNLElBQUksS0FBSixDQUFVO1lBQ2hDO1lBRVksSUFBQSxDQUFLLFFBQUwsQ0FBQSxDQUFBLENBQWdCLElBQUEsQ0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixLQUF0QixDQUE0QixJQUFBLENBQUssV0FBVyx3QkFBQSxDQUF5QixNQUF6QixDQUFnQyxDQUFDLElBQUEsQ0FBSztnQkFBUyxVQUFTLFNBQVM7Z0JBQ3pILGNBQUEsQ0FBZTtvQkFDWCxRQUFRLFlBQVc7d0JBQ2YsR0FBQSxDQUFJLGFBQWEsT0FBQSxDQUFRLE1BQVIsQ0FBZSxLQUFmLENBQXFCLE1BQUs7d0JBQzNDLE9BQU8sY0FBQSxDQUFlLE1BQU0sWUFBWTs0QkFBQyxVQUFTOztvQkFDMUUsQ0FKK0IsQ0FBQTtvQkFLWCxRQUFRLFlBQVc7d0JBQ2YsT0FBQSxDQUFRLE1BQVIsQ0FBZSxLQUFmLENBQXFCLE1BQU07b0JBQ25ELENBUCtCLENBQUE7b0JBUVgsWUFBWTs7WUFFaEM7WUFFWSxHQUFBLENBQUksWUFBWTtZQUNoQixJQUFBLENBQUssUUFBTCxDQUFjLFdBQWQsQ0FBMEIsWUFBVztnQkFDakMsU0FBQSxDQUFBLENBQUEsQ0FBWTtnQkFDWixPQUFBO1lBQ2hCO1lBQ1ksSUFBQSxDQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLFVBQVMsR0FBRztnQkFDOUIsSUFBQSxDQUFLLElBQUwsQ0FBVSxTQUFRO1lBQ2xDO1lBQ1ksSUFBQSxDQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLFVBQVMsR0FBRztnQkFDOUIsSUFBQSxDQUFLLFFBQUwsQ0FBQSxDQUFBLENBQWdCO2dCQUNoQixJQUFBLENBQUssSUFBTCxDQUFVO2dCQUNWLElBQUcsU0FBQSxDQUFBLEdBQUEsQ0FBYztvQkFDYixNQUFBO1lBQ3BCO1FBQ0E7SUFDQTtJQUlJLElBQUEsQ0FBSyxLQUFMLENBQUEsQ0FBQSxDQUFhLFlBQVc7UUFDcEIsSUFBRyxJQUFBLENBQUs7WUFDSixJQUFBLENBQUssUUFBTCxDQUFjLEtBQWQ7SUFDWjtJQUdJLElBQUEsQ0FBSyxPQUFMLENBQUEsQ0FBQSxDQUFlLFVBQVMsT0FBUyxFQUFBLFNBQVM7UUFDdEMsVUFBQSxDQUFXLE1BQU0sU0FBUyxTQUFTO0lBQzNDO0lBTUksSUFBQSxDQUFLLE9BQUwsQ0FBQSxDQUFBLENBQWUsVUFBUyxPQUFTLEVBQUEsU0FBUztRQUN0QyxVQUFBLENBQVcsTUFBTSxTQUFTLFNBQVM7SUFDM0M7SUFHSSxJQUFBLENBQUssTUFBTCxDQUFBLENBQUEsQ0FBYyxVQUFTLE9BQVMsRUFBQSxTQUFTO1FBQ3JDLElBQUcsRUFBRSxPQUFBLENBQUEsVUFBQSxDQUFtQixXQUFXO1lBQy9CLE1BQU0sSUFBSSxLQUFKLENBQVU7UUFDNUI7UUFDUSxVQUFBLENBQVcsTUFBTSxRQUFRLFNBQVM7SUFDMUM7SUFHSSxJQUFBLENBQUssT0FBTCxDQUFBLENBQUEsQ0FBZSxVQUFTLFNBQVM7UUFDN0IsSUFBRyxJQUFBLENBQUssY0FBTCxDQUFBLEdBQUEsQ0FBd0I7WUFDdkIsTUFBTSxZQUFBLENBQWE7UUFFdkIsSUFBQSxDQUFLLGNBQUwsQ0FBQSxDQUFBLENBQXNCO0lBQzlCO0lBSUksSUFBQSxDQUFLLFNBQUwsQ0FBQSxDQUFBLENBQWlCLFVBQVMsU0FBUztRQUMvQixJQUFHLElBQUEsQ0FBSyxVQUFMLENBQUEsR0FBQSxDQUFvQjtZQUNuQixNQUFNLFlBQUEsQ0FBYTtRQUV2QixJQUFBLENBQUssVUFBTCxDQUFBLENBQUEsQ0FBa0I7SUFDMUI7SUFJSSxJQUFBLENBQUssU0FBTCxDQUFBLENBQUEsQ0FBaUIsVUFBUyxTQUFTO1FBQy9CLElBQUcsSUFBQSxDQUFLLFVBQUwsQ0FBQSxHQUFBLENBQW9CO1lBQ25CLE1BQU0sWUFBQSxDQUFhO1FBRXZCLElBQUEsQ0FBSyxVQUFMLENBQUEsQ0FBQSxDQUFrQjtJQUMxQjtJQUtJLFNBQVMsV0FBVyxJQUFNLEVBQUEsSUFBTSxFQUFBLE9BQVMsRUFBQSxTQUFTO1FBQzlDLElBQUcsSUFBQSxDQUFLLFFBQUwsQ0FBYyxRQUFkLENBQUEsR0FBQSxDQUEyQjtZQUMxQixNQUFNLFlBQUEsQ0FBYSxlQUFBLENBQUEsQ0FBQSxDQUFnQixPQUFoQixDQUFBLENBQUEsQ0FBd0I7UUFDL0MsSUFBRyxPQUFBLENBQUEsRUFBQSxDQUFXO1lBQ1YsTUFBTSxJQUFJLEtBQUosQ0FBVSx5Q0FBQSxDQUFBLENBQUEsQ0FBMEMsT0FBMUMsQ0FBQSxDQUFBLENBQWtEO1FBQ3RFLEtBQUksSUFBQSxDQUFBLEdBQUEsQ0FBUyxPQUFULENBQUEsRUFBQSxDQUFvQixJQUFBLENBQUEsR0FBQSxDQUFTLE9BQTlCLENBQUEsRUFBQSxDQUF5QyxPQUFBLENBQUEsRUFBQSxDQUFXO1lBQ25ELE1BQU0sSUFBSSxLQUFKLENBQVUsMkRBQUEsQ0FBQSxDQUFBLENBQTRELE9BQTVELENBQUEsQ0FBQSxDQUFvRTtRQUV4RixJQUFBLENBQUssUUFBTCxDQUFjLFFBQWQsQ0FBQSxDQUFBLENBQXlCO1lBQUMsTUFBTSxJQUFQLENBQUE7WUFBYSxTQUFTOztJQUN2RDs7SUFFSSxTQUFTLGFBQWEsYUFBYTtRQUMvQixPQUFPLElBQUksS0FBSixDQUFVLElBQUEsQ0FBQSxDQUFBLENBQUssV0FBTCxDQUFBLENBQUEsQ0FBaUI7SUFDMUM7O0FBQ0E7QUFZQSxHQUFBLENBQUksaUJBQWlCLEtBQUEsQ0FBTSxjQUFjLFlBQVc7SUFLaEQsSUFBQSxDQUFLLElBQUwsQ0FBQSxDQUFBLENBQVksVUFBUyxjQUFnQixFQUFBLGdCQUFrQixFQUFBLG1CQUFtQjtRQUN0RSxJQUFBLENBQUssU0FBTCxDQUFBLENBQUEsQ0FBaUIsY0FBQSxDQUFlO1FBQ2hDLElBQUEsQ0FBSyxhQUFMLENBQUEsQ0FBQSxDQUFxQixjQUFBLENBQWU7UUFDcEMsSUFBQSxDQUFLLFFBQUwsQ0FBQSxDQUFBLENBQWdCLGNBQUEsQ0FBZTtRQUUvQixJQUFBLENBQUssY0FBTCxDQUFBLENBQUEsQ0FBc0IsY0FBQSxDQUFlO1FBQ3JDLElBQUEsQ0FBSyxVQUFMLENBQUEsQ0FBQSxDQUFrQixjQUFBLENBQWU7UUFDakMsSUFBQSxDQUFLLFVBQUwsQ0FBQSxDQUFBLENBQWtCLGNBQUEsQ0FBZTtRQUVqQyxJQUFBLENBQUssV0FBTCxDQUFBLENBQUEsQ0FBbUIsY0FBQSxDQUFlLE9BQWYsQ0FBdUI7UUFDMUMsSUFBQSxDQUFLLGNBQUwsQ0FBQSxDQUFBLENBQXNCLGNBQUEsQ0FBZSxPQUFmLENBQXVCO1FBQzdDLElBQUEsQ0FBSyxvQkFBTCxDQUFBLENBQUEsQ0FBNEIsY0FBQSxDQUFlLE9BQWYsQ0FBdUI7UUFDbkQsSUFBQSxDQUFLLEtBQUwsQ0FBQSxDQUFBLENBQWEsY0FBQSxDQUFlLE9BQWYsQ0FBdUI7UUFDcEMsSUFBQSxDQUFLLFlBQUwsQ0FBQSxDQUFBLENBQW9CLGNBQUEsQ0FBZSxPQUFmLENBQXVCLFlBQXZCLENBQUEsRUFBQSxDQUF1QztRQUMzRCxJQUFBLENBQUssTUFBTCxDQUFBLENBQUEsQ0FBYyxpQkFBQSxDQUFrQjtRQUVoQyxJQUFBLENBQUssVUFBTCxDQUFBLENBQUEsQ0FBa0I7UUFDbEIsSUFBQSxDQUFLLFNBQUwsQ0FBQSxDQUFBLENBQWlCO1FBQ2pCLElBQUEsQ0FBSyxPQUFMLENBQUEsQ0FBQSxDQUFlO1FBQ2YsSUFBQSxDQUFLLFdBQUwsQ0FBQSxDQUFBLENBQW1CO1FBQ25CLElBQUEsQ0FBSyxZQUFMLENBQUEsQ0FBQSxDQUFvQjtRQUVwQixNQUFBLENBQU8sY0FBUCxDQUFzQixNQUFNLGlCQUFpQjtZQUFFLEtBQUssWUFBVztnQkFDM0QsT0FBTyxJQUFBLENBQUssVUFBTCxDQUFnQjtZQUNuQzs7UUFFUSxJQUFHLElBQUEsQ0FBSztZQUNKLElBQUEsQ0FBSyxNQUFMLENBQUEsQ0FBQSxDQUFjOztZQUVkLElBQUEsQ0FBSyxNQUFMLENBQUEsQ0FBQSxDQUFjO1FBRWxCLEdBQUEsQ0FBSSxPQUFPO1FBRVgsSUFBRyxJQUFBLENBQUssVUFBTCxDQUFnQixTQUFTO1lBQ3hCLElBQUEsQ0FBSyxVQUFMLENBQWdCLE9BQWhCLENBQXdCLFlBQVc7Z0JBQy9CLElBQUcsaUJBQUEsQ0FBa0I7b0JBQ2pCLGlCQUFBLENBQWtCLE9BQWxCO2dCQUVKLElBQUEsQ0FBSyxTQUFMLENBQUEsQ0FBQSxDQUFpQjtnQkFDakIsSUFBQSxDQUFLLElBQUwsQ0FBVTtZQUMxQjtRQUNBLE9BQWU7WUFDSCxJQUFBLENBQUssRUFBTCxDQUFRLGdCQUFnQixZQUFXO2dCQUMvQixJQUFBLENBQUssU0FBTCxDQUFBLENBQUEsQ0FBaUI7Z0JBQ2pCLElBQUEsQ0FBSyxJQUFMLENBQVU7WUFDMUI7UUFDQTtRQUVRLElBQUEsQ0FBSyxVQUFMLENBQWdCLFNBQWhCLENBQTBCLFVBQVMsWUFBWTtZQUMzQyxNQUFBLENBQU8sTUFBTTtRQUN6QjtRQUNRLElBQUEsQ0FBSyxVQUFMLENBQWdCLE9BQWhCLENBQXdCLFVBQVMsR0FBRztZQUNoQyxJQUFBLENBQUssSUFBTCxDQUFVLFNBQVM7UUFDL0I7SUFDQTtJQUdJLElBQUEsQ0FBSyxLQUFMLENBQUEsQ0FBQSxDQUFhLFlBQVc7UUFDcEIsR0FBQSxDQUFJLE9BQU87UUFFWCxJQUFHLElBQUEsQ0FBSyxXQUFXO1lBQ2YsSUFBQSxDQUFLLE9BQUwsQ0FBQSxDQUFBLENBQWU7WUFDZixJQUFHLE1BQUEsQ0FBTyxJQUFQLENBQVksSUFBQSxDQUFLLGFBQWpCLENBQStCLE1BQS9CLENBQUEsR0FBQSxDQUEwQyxHQUFHO2dCQUM1QyxhQUFBLENBQWM7WUFDOUIsT0FBbUI7Z0JBQ0gsSUFBQSxDQUFLLGtCQUFMLENBQUEsQ0FBQSxDQUEwQixVQUFBLENBQVcsWUFBVztvQkFDNUMsSUFBQSxDQUFLLGtCQUFMLENBQUEsQ0FBQSxDQUEwQjtvQkFDMUIsYUFBQSxDQUFjO2dCQUNsQyxHQUFrQixJQUFBLENBQUs7WUFDdkI7UUFDQTtJQUNBO0lBRUksSUFBQSxDQUFLLElBQUwsQ0FBQSxDQUFBLENBQVksWUFBVztRQUNuQixJQUFHLElBQUEsQ0FBSyxTQUFMLENBQUEsRUFBQSxDQUFrQixJQUFBLENBQUssVUFBTCxDQUFnQixNQUFNO1lBQ3ZDLElBQUEsQ0FBSyxVQUFMLENBQWdCLElBQWhCO1FBQ1osT0FBZTtZQUNILElBQUEsQ0FBSyxLQUFMO1FBQ1o7SUFDQTtJQUlJLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZLFVBQVMsU0FBc0I7UUFDdkMsSUFBRyxPQUFBLENBQUEsR0FBQSxDQUFZLFNBQVM7WUFDcEIsSUFBRyxTQUFBLENBQVUsRUFBVixDQUFhLE9BQWIsQ0FBQSxHQUFBLENBQXlCO2dCQUN4QixNQUFNLElBQUksS0FBSixDQUFVO2tCQUNmLElBQUcsU0FBQSxDQUFVLE1BQVYsQ0FBQSxHQUFBLENBQXFCO2dCQUN6QixNQUFNLElBQUksS0FBSixDQUFVO1FBQ2hDO1FBRVEsSUFBRyxPQUFBLENBQUEsRUFBQSxDQUFXLHNCQUFzQjtZQUNoQyxNQUFNLElBQUksS0FBSixDQUFVLGlCQUFBLENBQUEsQ0FBQSxDQUFrQixPQUFsQixDQUFBLENBQUEsQ0FBMEIscUJBQTFCLENBQUEsQ0FBQSxDQUFnRCxPQUFoRCxDQUFBLENBQUEsQ0FBd0Q7UUFDcEY7UUFFUSxHQUFBLENBQUksVUFBVSxDQUFDO1FBQ2YsSUFBRyxPQUFBLENBQUEsR0FBQSxDQUFZLFNBQVM7WUFDcEIsR0FBQSxDQUFJLFFBQVEsU0FBQSxDQUFVO1lBQ3RCLEdBQUEsQ0FBSSxZQUFZO1lBQ2hCLEtBQUksR0FBQSxDQUFJLEtBQUssT0FBTztnQkFDaEIsSUFBRyxDQUFBLENBQUEsR0FBQSxDQUFNO29CQUNMLFNBQUEsQ0FBVSxFQUFWLENBQUEsQ0FBQSxDQUFlLEtBQUEsQ0FBTTtZQUN6QztZQUVZLE9BQUEsQ0FBUSxJQUFSLENBQWEsS0FBQSxDQUFNLFNBQVM7UUFDeEMsT0FBZTtZQUNILE9BQUEsQ0FBUSxTQUFTO1FBQzdCO1FBRVEsSUFBQSxDQUFLLE1BQU07SUFDbkI7SUFHSSxJQUFBLENBQUssT0FBTCxDQUFBLENBQUEsQ0FBZSxVQUFTLFNBQXNCO1FBQzFDLElBQUcsT0FBQSxDQUFBLEVBQUEsQ0FBVztZQUNWLE1BQU0sSUFBSSxLQUFKLENBQVUsY0FBQSxDQUFBLENBQUEsQ0FBZSxPQUFmLENBQUEsQ0FBQSxDQUF1Qix1QkFBdkIsQ0FBQSxDQUFBLENBQStDLE9BQS9DLENBQUEsQ0FBQSxDQUF1RDtRQUMzRSxJQUFHLE9BQUEsQ0FBQSxFQUFBLENBQVc7WUFDVixNQUFNLElBQUksS0FBSixDQUFVO1FBQ3BCLElBQUcsSUFBQSxDQUFLLFlBQUwsQ0FBa0IsSUFBQSxDQUFLLE9BQXZCLENBQUEsR0FBQSxDQUFtQztZQUNsQyxNQUFNLElBQUksS0FBSixDQUFVLHNDQUFBLENBQUEsQ0FBQSxDQUF1QyxJQUFBLENBQUs7UUFFaEUsR0FBQSxDQUFJLFVBQVUsQ0FBQyxRQUFTLElBQUEsQ0FBSztRQUM3QixPQUFBLENBQVEsU0FBUztRQUVqQixJQUFBLENBQUssTUFBTTtRQUVYLEdBQUEsQ0FBSSxjQUFjLEtBQUEsQ0FBTSxRQUFOO1FBQ2xCLFdBQUEsQ0FBWSxPQUFaLENBQUEsQ0FBQSxDQUFzQjtRQUN0QixJQUFBLENBQUssWUFBTCxDQUFrQixJQUFBLENBQUssT0FBdkIsQ0FBQSxDQUFBLENBQWlDO1FBRWpDLFdBQUEsQ0FBWTtRQUVaLE9BQU8sV0FBQSxDQUFZO0lBQzNCO0lBR0ksSUFBQSxDQUFLLGFBQUwsQ0FBQSxDQUFBLENBQXFCLFVBQVMsU0FBc0I7UUFDaEQsSUFBRyxPQUFBLENBQUEsRUFBQSxDQUFXO1lBQ1YsTUFBTSxJQUFJLEtBQUosQ0FBVSxnQkFBQSxDQUFBLENBQUEsQ0FBaUIsT0FBakIsQ0FBQSxDQUFBLENBQXlCLHNCQUF6QixDQUFBLENBQUEsQ0FBZ0QsT0FBaEQsQ0FBQSxDQUFBLENBQXdEO1FBQzVFLElBQUcsT0FBQSxDQUFBLEVBQUEsQ0FBVztZQUNWLE1BQU0sSUFBSSxLQUFKLENBQVU7UUFDcEIsSUFBRyxJQUFBLENBQUssWUFBTCxDQUFrQixJQUFBLENBQUssT0FBdkIsQ0FBQSxHQUFBLENBQW1DO1lBQ2xDLE1BQU0sSUFBSSxLQUFKLENBQVUsc0NBQUEsQ0FBQSxDQUFBLENBQXVDLElBQUEsQ0FBSztRQUVoRSxHQUFBLENBQUksVUFBVSxDQUFDLFFBQVMsSUFBQSxDQUFLO1FBQzdCLE9BQUEsQ0FBUSxTQUFTO1FBRWpCLEdBQUEsQ0FBSSxVQUFVLElBQUEsQ0FBSyxZQUFMLENBQWtCLElBQUEsQ0FBSyxPQUF2QixDQUFBLENBQUEsQ0FBaUMsa0JBQUEsQ0FBbUIsTUFBTSxJQUFBLENBQUs7UUFDN0UsT0FBQSxDQUFRLE9BQVIsQ0FBQSxDQUFBLENBQWtCO1FBQ2xCLElBQUEsQ0FBSyxNQUFNO1FBRVgsV0FBQSxDQUFZO1FBRVosT0FBTztJQUNmO0lBSUksU0FBUyxVQUFVLElBQUssRUFBQSxNQUFNO1FBQzFCLE9BQU8sSUFBQSxDQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBNkI7SUFDNUM7O0lBQ0ksU0FBUyxZQUFZLElBQUssRUFBQSxnQkFBZ0I7UUFDdEMsT0FBTyxJQUFBLENBQUssYUFBTCxDQUFtQixXQUFuQixDQUErQjtJQUM5Qzs7SUFFSSxTQUFTLGNBQWMsTUFBTTtRQUN6QixJQUFHLElBQUEsQ0FBSyxrQkFBTCxDQUFBLEdBQUEsQ0FBNEIsV0FBVztZQUN0QyxZQUFBLENBQWEsSUFBQSxDQUFLO1FBQzlCO1FBRVEsR0FBQSxDQUFJLE1BQU0sTUFBQSxDQUFPLElBQVAsQ0FBWSxJQUFBLENBQUs7UUFDM0IsSUFBRyxHQUFBLENBQUksTUFBSixDQUFBLENBQUEsQ0FBYSxHQUFHO1lBQ2YsR0FBQSxDQUFJLGVBQWUscUNBQUEsQ0FBQSxDQUFBLENBQXNDLElBQUEsQ0FBSyxZQUEzQyxDQUFBLENBQUEsQ0FBd0QsdUVBQXhELENBQUEsQ0FBQSxDQUNDO1lBRXBCLEdBQUEsQ0FBSSxzQkFBc0I7WUFDMUIsS0FBSSxHQUFBLENBQUksS0FBSyxJQUFBLENBQUssY0FBYztnQkFDNUIsR0FBQSxDQUFJLE9BQU8sSUFBQSxDQUFLLFlBQUwsQ0FBa0I7Z0JBQzdCLElBQUcsSUFBQSxDQUFBLFVBQUEsQ0FBZ0Isd0JBQXdCO29CQUN2QyxJQUFHLElBQUEsQ0FBSyxnQkFBZ0I7d0JBQ3BCLG1CQUFBLENBQW9CLElBQXBCLENBQXlCLFdBQUEsQ0FBQSxDQUFBLENBQVksQ0FBWixDQUFBLENBQUEsQ0FBYyxJQUFkLENBQUEsQ0FBQSxDQUFtQixJQUFBLENBQUssT0FBeEIsQ0FBQSxDQUFBLENBQWdDO29CQUNqRixPQUEyQixJQUFHLElBQUEsQ0FBSyxvQkFBb0I7d0JBQy9CLG1CQUFBLENBQW9CLElBQXBCLENBQXlCLFdBQUEsQ0FBQSxDQUFBLENBQVksQ0FBWixDQUFBLENBQUEsQ0FBYyxJQUFkLENBQUEsQ0FBQSxDQUFtQixJQUFBLENBQUssT0FBeEIsQ0FBQSxDQUFBLENBQWdDO29CQUNqRixPQUEyQjt3QkFDSCxtQkFBQSxDQUFvQixJQUFwQixDQUF5QixXQUFBLENBQUEsQ0FBQSxDQUFZLENBQVosQ0FBQSxDQUFBLENBQWMsSUFBZCxDQUFBLENBQUEsQ0FBbUIsSUFBQSxDQUFLLE9BQXhCLENBQUEsQ0FBQSxDQUFnQztvQkFDakY7Z0JBQ0EsT0FBdUIsSUFBRyxJQUFBLENBQUssQ0FBTCxDQUFBLEdBQUEsQ0FBVyxXQUFXO29CQUM1QixtQkFBQSxDQUFvQixJQUFwQixDQUF5QixZQUFBLENBQUEsQ0FBQSxDQUFhLENBQWIsQ0FBQSxDQUFBLENBQWUsT0FBZixDQUFBLENBQUEsQ0FBdUIsSUFBQSxDQUFLLE9BQTVCLENBQUEsQ0FBQSxDQUFvQztnQkFDakYsT0FBdUI7b0JBQ0gsbUJBQUEsQ0FBb0IsSUFBcEIsQ0FBeUIsYUFBQSxDQUFBLENBQUEsQ0FBYyxDQUFkLENBQUEsQ0FBQSxDQUFnQixRQUFoQixDQUFBLENBQUEsQ0FBeUIsSUFBQSxDQUFLLE9BQTlCLENBQUEsQ0FBQSxDQUFzQztnQkFDbkY7WUFDQTtZQUVZLFlBQUEsQ0FBQSxFQUFBLENBQWMsbUJBQUEsQ0FBb0IsSUFBcEIsQ0FBeUI7WUFDdkMsR0FBQSxDQUFJLElBQUksSUFBSSxLQUFKLENBQVU7WUFDbEIsQ0FBQSxDQUFFLEdBQUYsQ0FBQSxDQUFBLENBQVE7WUFFUixJQUFBLENBQUssWUFBTCxDQUFBLENBQUEsQ0FBb0I7WUFFcEIsSUFBQSxDQUFLLElBQUwsQ0FBVSxTQUFTO1FBQy9CO1FBRVEsSUFBRyxJQUFBLENBQUssVUFBTCxDQUFnQixPQUFoQixDQUFBLEdBQUEsQ0FBNEIsV0FBVztZQUN0QyxJQUFBLENBQUssTUFBTSxDQUFDO1FBQ3hCO1FBRVEsSUFBQSxDQUFLLFVBQUwsQ0FBZ0IsS0FBaEI7UUFDQSxJQUFBLENBQUssVUFBTCxDQUFBLENBQUEsQ0FBa0I7SUFDMUI7O0lBRUksU0FBUyxnQkFBZ0IsTUFBTTtRQUMzQixJQUFHLElBQUEsQ0FBSyxPQUFMLENBQUEsRUFBQSxDQUFnQixNQUFBLENBQU8sSUFBUCxDQUFZLElBQUEsQ0FBSyxhQUFqQixDQUErQixNQUEvQixDQUFBLEdBQUEsQ0FBMEMsR0FBRztZQUM1RCxhQUFBLENBQWM7UUFDMUI7SUFDQTs7SUFHSSxTQUFTLFlBQVksTUFBTTtRQUN2QixHQUFBLENBQUksU0FBUyxJQUFBLENBQUs7UUFDbEIsR0FBRztZQUNDLElBQUEsQ0FBSyxNQUFMLENBQUEsRUFBQSxDQUFlO1lBQ2YsSUFBRyxJQUFBLENBQUssTUFBTCxDQUFBLENBQUEsQ0FBYyxJQUFBLENBQUssT0FBTztnQkFDekIsSUFBQSxDQUFLLE1BQUwsQ0FBQSxDQUFBLENBQWMsSUFBQSxDQUFLLE1BQUwsQ0FBQSxDQUFBLENBQVk7WUFDMUM7UUFDQSxTQUFnQixJQUFBLENBQUssTUFBTCxDQUFBLEVBQUEsQ0FBZSxJQUFBLENBQUssWUFBcEIsQ0FBQSxFQUFBLENBQW9DLE1BQUEsQ0FBQSxHQUFBLENBQVcsSUFBQSxDQUFLO1FBRTVELElBQUcsTUFBQSxDQUFBLEdBQUEsQ0FBVyxJQUFBLENBQUs7WUFDZixNQUFNLElBQUksS0FBSixDQUFVO1FBQ3BCLElBQUcsSUFBQSxDQUFLLE1BQUwsQ0FBQSxHQUFBLENBQWdCLE1BQUEsQ0FBQSxDQUFBLENBQU87WUFDdEIsSUFBQSxDQUFLLE1BQU0sQ0FBQyxrQkFBbUIsQ0FBQyxPQUFPLElBQUEsQ0FBSztJQUN4RDs7SUFFSSxTQUFTLFFBQVEsT0FBUyxFQUFBLGNBQWM7UUFDcEMsR0FBQSxDQUFJLE9BQU8sS0FBQSxDQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsQ0FBMkIsY0FBYztRQUNwRCxJQUFHLElBQUEsQ0FBSyxNQUFMLENBQUEsR0FBQSxDQUFnQjtZQUNmLE9BQUEsQ0FBUSxJQUFSLENBQWEsSUFBQSxDQUFLO2NBQ2pCLElBQUcsSUFBQSxDQUFLLE1BQUwsQ0FBQSxDQUFBLENBQWM7WUFDbEIsT0FBQSxDQUFRLElBQVIsQ0FBYTtJQUN6Qjs7SUFHSSxTQUFTLGFBQWEsTUFBTTtRQUN4QixJQUFHLElBQUEsQ0FBQSxHQUFBLENBQVM7WUFDUixPQUFPO2NBQ04sSUFBRyxJQUFBLENBQUEsVUFBQSxDQUFnQjtZQUNwQixPQUFPOztZQUVQLE9BQU8sQ0FBQztJQUNwQjs7SUFHSSxTQUFTLHFCQUFxQixJQUFNLEVBQUEsU0FBUztRQUN6QyxPQUFBLENBQVEsZUFBUixDQUFBLEVBQUEsQ0FBMkI7UUFDM0IsSUFBRyxPQUFBLENBQVEsZUFBUixDQUFBLENBQUEsQ0FBMEIsSUFBQSxDQUFLLE9BQU87WUFDckMsR0FBQSxDQUFJLGFBQWEsT0FBQSxDQUFRLGVBQVIsQ0FBQSxDQUFBLENBQXdCO1lBQ3pDLE9BQUEsQ0FBUSxlQUFSLENBQUEsQ0FBQSxDQUEwQjtZQUMxQixTQUFBLENBQVUsTUFBTSxTQUFVLE9BQUEsQ0FBUSxJQUFJLDRCQUE0QixDQUFDO2dCQUFJLFdBQVksT0FBQSxDQUFRO1FBQ3ZHO0lBQ0E7O0lBR0ksU0FBUyxnQkFBZ0IsT0FBTztRQUM1QixHQUFBLENBQUksT0FBTyxJQUFJLE1BQU07UUFDckIsS0FBSSxHQUFBLENBQUksS0FBSyxPQUFPO1lBQ2hCLElBQUcsQ0FBQSxDQUFBLEdBQUEsQ0FBTSxXQUFXO2dCQUNoQixJQUFBLENBQUssRUFBTCxDQUFBLENBQUEsQ0FBVSxLQUFBLENBQU07Z0JBQ2hCLEdBQUEsQ0FBQSxDQUFBLENBQU07WUFDdEI7UUFDQTtRQUVRLEdBQUEsQ0FBSSxZQUFZLENBQUMsS0FBQSxDQUFNO1FBQ3ZCLElBQUcsS0FBSztZQUNKLFNBQUEsQ0FBVSxJQUFWLENBQWU7UUFDM0I7UUFFUSxPQUFPO0lBQ2Y7O0lBRUksU0FBUyx1QkFBdUIsWUFBYyxFQUFBLFdBQVc7UUFDckQsR0FBQSxDQUFJLElBQUksSUFBSSxLQUFKLENBQVU7UUFDbEIsS0FBSSxHQUFBLENBQUksS0FBSyxXQUFXO1lBQ3BCLElBQUcsQ0FBQSxDQUFBLEdBQUEsQ0FBTTtnQkFDTCxDQUFBLENBQUUsRUFBRixDQUFBLENBQUEsQ0FBTyxTQUFBLENBQVU7UUFDakM7UUFFUSxPQUFPO0lBQ2Y7O0lBRUksU0FBUyxtQkFBbUIsSUFBTSxFQUFBLElBQUk7UUFDbEMsR0FBQSxDQUFJLFVBQVUsc0JBQUEsQ0FBdUIsU0FBUyxPQUFPLE9BQWlCO1lBQ2xFLElBQUcsT0FBQSxDQUFRO2dCQUNQLE1BQU0sSUFBSSxLQUFKLENBQVU7WUFDcEIsSUFBRyxLQUFBLENBQUEsRUFBQSxDQUFTO2dCQUNSLE1BQU0sSUFBSSxLQUFKLENBQVUsa0JBQUEsQ0FBQSxDQUFBLENBQW1CLEtBQW5CLENBQUEsQ0FBQSxDQUF5QixxQkFBekIsQ0FBQSxDQUFBLENBQStDLEtBQS9DLENBQUEsQ0FBQSxDQUFxRDtZQUN6RSxJQUFHLEtBQUEsQ0FBQSxHQUFBLENBQVUsU0FBUztnQkFDbEIsSUFBRyxTQUFBLENBQVUsRUFBVixDQUFhLE9BQWIsQ0FBQSxHQUFBLENBQXlCO29CQUN4QixNQUFNLElBQUksS0FBSixDQUFVO3NCQUNmLElBQUcsU0FBQSxDQUFVLE1BQVYsQ0FBQSxHQUFBLENBQXFCO29CQUN6QixNQUFNLElBQUksS0FBSixDQUFVO1lBQ3BDO1lBRVksU0FBQSxDQUFVLE1BQU0sU0FBUyxJQUFJLE9BQU87UUFDaEQ7UUFFUSxPQUFBLENBQVEsRUFBUixDQUFBLENBQUEsQ0FBYTtRQUNiLE9BQUEsQ0FBUSxZQUFSLENBQUEsQ0FBQSxDQUF1QjtRQUN2QixPQUFBLENBQVEsZUFBUixDQUFBLENBQUEsQ0FBMEI7UUFDMUIsT0FBQSxDQUFRLGNBQVIsQ0FBQSxDQUFBLENBQXlCO1FBQ3pCLE9BQU87SUFDZjs7SUFHSSxTQUFTLEtBQUssSUFBTSxFQUFBLFNBQVM7UUFDekIsR0FBQSxDQUFJLG9CQUFvQixTQUFBLENBQVUsTUFBTTtRQUN4QyxJQUFHLElBQUEsQ0FBSyxXQUFMLENBQUEsR0FBQSxDQUFxQixTQUFyQixDQUFBLEVBQUEsQ0FBa0MsaUJBQUEsQ0FBa0IsTUFBbEIsQ0FBQSxDQUFBLENBQTJCLElBQUEsQ0FBSyxhQUFhO1lBQzlFLEdBQUEsQ0FBSSxJQUFJLElBQUksS0FBSixDQUFVO1lBQ2xCLENBQUEsQ0FBRSxXQUFGLENBQUEsQ0FBQSxDQUFnQixpQkFBQSxDQUFrQjtZQUNsQyxNQUFNO1FBQ2xCO1FBRVEsSUFBRyxJQUFBLENBQUssV0FBVztZQUNmLElBQUEsQ0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCO1FBQ2pDLE9BQWU7WUFDSCxNQUFNLEtBQUEsQ0FBTTtRQUN4QjtJQUNBOztJQUdJLFNBQVMsVUFBVSxJQUFNLEVBQUEsT0FBUyxFQUFBLEVBQUksRUFBQSxLQUFPLEVBQUEsTUFBTTtRQUMvQyxHQUFBLENBQUksVUFBVSxDQUFDO1FBQ2YsSUFBRyxPQUFBLENBQVE7WUFDUCxPQUFBLENBQVEsSUFBUixDQUFhLE9BQUEsQ0FBUTtRQUV6QixPQUFBLENBQVEsSUFBUixDQUFhO1FBRWIsSUFBRyxLQUFBLENBQUEsR0FBQSxDQUFVO1lBQ1QsT0FBQSxDQUFRLElBQVIsQ0FBYSxlQUFBLENBQWdCLElBQUEsQ0FBSzs7WUFFbEMsT0FBQSxDQUFRLFNBQVM7UUFFckIsSUFBQSxDQUFLLE1BQU07UUFFWCxJQUFHLEtBQUEsQ0FBQSxHQUFBLENBQVUsT0FBTztZQUNoQixPQUFBLENBQVEsY0FBUixDQUFBLENBQUEsQ0FBeUI7WUFDekIsSUFBRyxPQUFBLENBQVEsb0JBQW9CO2dCQUMzQixNQUFBLENBQU8sSUFBQSxDQUFLLFlBQUwsQ0FBa0I7Z0JBQ3pCLGVBQUEsQ0FBZ0I7WUFDaEM7UUFDQSxPQUFlLElBQUcsT0FBQSxDQUFRLGNBQWM7WUFDNUIsb0JBQUEsQ0FBcUIsTUFBTTtRQUN2QztJQUNBOztJQUVJLFNBQVMsT0FBTyxJQUFNLEVBQUEsWUFBWTtRQUM5QixJQUFJO1lBQ0EsSUFBRyxJQUFBLENBQUssWUFBWTtnQkFDaEIsSUFBRyxJQUFBLENBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixNQUFNLFdBQTNCLENBQUEsR0FBQSxDQUEyQyxVQUFVO29CQUNwRDtnQkFDcEI7WUFDQTtZQUVZLElBQUk7Z0JBQ0EsR0FBQSxDQUFJLFVBQVUsV0FBQSxDQUFZLE1BQU07WUFDaEQsQ0FBYyxRQUFNLEdBQUc7Z0JBQ1AsSUFBRyxJQUFBLENBQUssc0JBQXNCO29CQUMxQixJQUFJO3dCQUNBLElBQUEsQ0FBSyxJQUFMLENBQVUsU0FBUzs0QkFBQyxTQUFTLG1CQUFWLENBQUE7NEJBQStCLFlBQVk7O29CQUN0RixDQUFzQixRQUFNLEdBQUc7d0JBQ1AsSUFBRyxDQUFBLENBQUUsT0FBRixDQUFBLEdBQUEsQ0FBYzs0QkFDYixJQUFBLENBQUssSUFBTCxDQUFVLFNBQVM7NEJBQUMsU0FBUyxtQkFBVixDQUFBOzRCQUErQixZQUFZLFVBQUEsQ0FBVyxLQUFYLENBQWlCLEdBQUU7Ozs0QkFDaEYsTUFBTTtvQkFDbkM7Z0JBQ0E7Z0JBRWdCO1lBQ2hCO1lBRVksSUFBRyxJQUFBLENBQUssWUFBWTtnQkFDaEIsSUFBRyxJQUFBLENBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixNQUFNLFFBQTNCLENBQUEsR0FBQSxDQUF3QyxVQUFVO29CQUNqRDtnQkFDcEI7WUFDQTtZQUVZLEdBQUEsQ0FBSSxRQUFRLE1BQUEsQ0FBTyxPQUFBLENBQVE7WUFDM0IsSUFBRyxLQUFBLENBQUEsR0FBQSxDQUFVLFVBQVU7Z0JBRW5CLElBQUcsT0FBQSxDQUFRLE1BQVIsQ0FBQSxHQUFBLENBQW1CLENBQW5CLENBQUEsRUFBQSxDQUF3QixPQUFBLENBQVEsRUFBUixDQUFBLEdBQUEsQ0FBZSxTQUFTO29CQUMvQyxJQUFBLENBQUssSUFBTCxDQUFVO29CQUNWO2dCQUNwQjtnQkFFZ0IsR0FBQSxDQUFJLGNBQWMsSUFBQSxDQUFLLFFBQUwsQ0FBYyxPQUFBLENBQVE7Z0JBQ3hDLElBQUcsV0FBQSxDQUFBLEdBQUEsQ0FBZ0IsV0FBVztvQkFDMUIsSUFBRyxJQUFBLENBQUssY0FBTCxDQUFBLEdBQUEsQ0FBd0IsV0FBVzt3QkFDbEMsSUFBQSxDQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsTUFBSzt3QkFDOUI7b0JBQ3hCO29CQUNvQixJQUFHLE9BQUEsQ0FBUSxFQUFSLENBQUEsR0FBQSxDQUFlO3dCQUNkLE1BQU0sc0JBQUEsQ0FBdUIsT0FBQSxDQUFRLElBQUksT0FBQSxDQUFRO29CQUNyRCxJQUFHLE9BQUEsQ0FBUSxFQUFSLENBQUEsR0FBQSxDQUFlO3dCQUNkLElBQUEsQ0FBSyxJQUFMLENBQVUsU0FBUzt3QkFBQyxTQUFTLGVBQVYsQ0FBQTt3QkFBMkIsU0FBUyxPQUFBLENBQVE7O29CQUVuRTtnQkFDcEI7Z0JBRWdCLElBQUcsV0FBQSxDQUFZLElBQVosQ0FBQSxHQUFBLENBQXFCLFNBQVM7b0JBQzdCLElBQUcsT0FBQSxDQUFRLEVBQVIsQ0FBQSxHQUFBLENBQWU7d0JBQ2QsR0FBQSxDQUFJLE9BQU8sQ0FBQyxzQkFBQSxDQUF1QixPQUFBLENBQVEsSUFBSSxPQUFBLENBQVE7O3dCQUV2RCxHQUFBLENBQUksT0FBTyxZQUFBLENBQWEsT0FBQSxDQUFRO29CQUVwQyxXQUFBLENBQVksT0FBWixDQUFvQixLQUFwQixDQUEwQixNQUFNO2dCQUNwRCxPQUF1QixJQUFHLFdBQUEsQ0FBWSxJQUFaLENBQUEsR0FBQSxDQUFxQixTQUFTO29CQUNwQyxHQUFBLENBQUksS0FBSyxPQUFBLENBQVE7b0JBQ2pCLElBQUcsQ0FBQyxVQUFBLENBQVcsTUFBTSxLQUFLO3dCQUN0QjtvQkFDeEI7b0JBRW9CLElBQUEsQ0FBSyxZQUFMLENBQWtCLEdBQWxCLENBQUEsQ0FBQSxDQUF3Qjt3QkFBQyxTQUFTLE9BQUEsQ0FBUTs7b0JBQzFDLE9BQUEsQ0FBUSxPQUFSLEVBQUEsQ0FBa0IsSUFBbEIsQ0FBdUIsWUFBVzt3QkFDOUIsT0FBTyxXQUFBLENBQVksT0FBWixDQUFvQixLQUFwQixDQUEwQixNQUFNLFlBQUEsQ0FBYSxPQUFBLENBQVEsR0FBckIsQ0FBeUIsTUFBekIsQ0FBZ0MsQ0FBQztvQkFDaEcsRUFGb0IsQ0FFRyxJQUZILENBRVEsVUFBUyxRQUFRO3dCQUNyQixNQUFBLENBQU8sSUFBQSxDQUFLLFlBQUwsQ0FBa0I7d0JBQ3pCLElBQUEsQ0FBSyxNQUFNLENBQUMsR0FBRztvQkFDdkMsRUFMb0IsQ0FLRyxLQUxILENBS1MsVUFBUyxHQUFHO3dCQUNqQixNQUFBLENBQU8sSUFBQSxDQUFLLFlBQUwsQ0FBa0I7d0JBQ3pCLElBQUcsQ0FBQSxDQUFBLFVBQUEsQ0FBYSxXQUFXOzRCQUN2QixHQUFBLENBQUksWUFBWSxlQUFBLENBQWdCO3dCQUM1RCxPQUErQjs0QkFDSCxHQUFBLENBQUksWUFBWSxDQUFDLHNCQUF1Qjs0QkFDeEMsSUFBQSxDQUFLLElBQUwsQ0FBVSxTQUFTO3dCQUMvQzt3QkFFd0IsSUFBQSxDQUFLLE1BQU0sQ0FBQyxHQUFELENBQUssTUFBTCxDQUFZO29CQUMvQztnQkFDQSxPQUF1QixJQUFHLFdBQUEsQ0FBWSxJQUFaLENBQUEsR0FBQSxDQUFxQixRQUFRO29CQUNuQyxHQUFBLENBQUksS0FBSyxPQUFBLENBQVE7b0JBQ2pCLElBQUcsQ0FBQyxVQUFBLENBQVcsTUFBTSxLQUFLO3dCQUN0QjtvQkFDeEI7b0JBRW9CLEdBQUEsQ0FBSSxVQUFVLElBQUEsQ0FBSyxZQUFMLENBQWtCLEdBQWxCLENBQUEsQ0FBQSxDQUF3QixrQkFBQSxDQUFtQixNQUFLO29CQUU5RCxJQUFJO3dCQUNBLFdBQUEsQ0FBWSxPQUFaLENBQW9CLEtBQXBCLENBQTBCLE1BQU0sQ0FBQyxRQUFELENBQVUsTUFBVixDQUFpQixZQUFBLENBQWEsT0FBQSxDQUFRLElBQXRDLENBQTJDLE1BQTNDLENBQWtELENBQUM7b0JBQzNHLENBQXNCLFFBQU0sR0FBRzt3QkFDUCxJQUFBLENBQUssSUFBTCxDQUFVLFNBQVM7b0JBQzNDO2dCQUNBLE9BQXVCO29CQUNILE1BQU0sSUFBSSxLQUFKLENBQVUsd0JBQUEsQ0FBQSxDQUFBLENBQXlCLFdBQUEsQ0FBWTtnQkFDekU7WUFFQSxPQUFtQixJQUFHLEtBQUEsQ0FBQSxHQUFBLENBQVUsVUFBVTtnQkFDMUIsSUFBRyxFQUFFLE9BQUEsQ0FBUSxFQUFSLENBQUEsRUFBQSxDQUFjLElBQUEsQ0FBSyxlQUFlO29CQUNuQyxJQUFBLENBQUssSUFBTCxDQUFVLFNBQVM7d0JBQUMsU0FBUyxnQkFBVixDQUFBO3dCQUE0QixJQUFJLE9BQUEsQ0FBUTs7b0JBQzNEO2dCQUNwQjtnQkFFZ0IsR0FBQSxDQUFJLE9BQU8sSUFBQSxDQUFLLFlBQUwsQ0FBa0IsT0FBQSxDQUFRO2dCQUNyQyxJQUFHLElBQUEsQ0FBQSxVQUFBLENBQWdCLHdCQUF3QjtvQkFDdkMsR0FBQSxDQUFJLFVBQVU7b0JBQ2QsSUFBRyxNQUFBLENBQU8sT0FBQSxDQUFRLEVBQWYsQ0FBQSxHQUFBLENBQXVCLFVBQVU7d0JBQ2hDLEdBQUEsQ0FBSSxRQUFRLE9BQUEsQ0FBUSxJQUFJLFlBQVksT0FBQSxDQUFRO29CQUNwRSxPQUEyQixJQUFHLE1BQUEsQ0FBTyxPQUFBLENBQVEsRUFBZixDQUFBLEdBQUEsQ0FBdUIsVUFBVTt3QkFDdkMsR0FBQSxDQUFJLGNBQWMsT0FBQSxDQUFRLElBQUksUUFBUSxPQUFBLENBQVEsSUFBSSxZQUFZLE9BQUEsQ0FBUTtvQkFDOUYsT0FBMkI7d0JBQ0gsTUFBTSxJQUFJLEtBQUosQ0FBVTtvQkFDeEM7b0JBRW9CLElBQUcsS0FBQSxDQUFBLEdBQUEsQ0FBVSxTQUFTO3dCQUNsQixPQUFBLENBQVEsWUFBUixDQUFBLENBQUEsQ0FBdUIsU0FBQSxDQUFBLEdBQUEsQ0FBYztvQkFDN0QsT0FBMkI7d0JBQ0gsSUFBRyxLQUFBLENBQUEsR0FBQSxDQUFVLFNBQVM7NEJBQ2xCLEdBQUEsQ0FBSSxRQUFRLHNCQUFBLENBQXVCLFNBQUEsQ0FBVSxJQUFJLFNBQUEsQ0FBVTs0QkFDM0QsT0FBQSxDQUFRLFNBQVIsQ0FBa0IsSUFBbEIsQ0FBdUIsU0FBUyxPQUFPO3dCQUNuRSxPQUErQjs0QkFDSCxHQUFBLENBQUksV0FBVyxDQUFDOzRCQUNoQixJQUFHLFNBQUEsQ0FBQSxHQUFBLENBQWM7Z0NBQVcsUUFBQSxDQUFBLENBQUEsQ0FBVyxRQUFBLENBQVMsTUFBVCxDQUFnQjs0QkFDdkQsSUFBRyxXQUFBLENBQUEsR0FBQSxDQUFnQjtnQ0FBVyxRQUFBLENBQVMsSUFBVCxDQUFjOzRCQUM1QyxPQUFBLENBQVEsU0FBUixDQUFrQixJQUFsQixDQUF1QixLQUF2QixDQUE2QixPQUFBLENBQVEsV0FBVzs0QkFFaEQsSUFBRyxLQUFBLENBQUEsR0FBQSxDQUFVLE9BQU87Z0NBQ2hCLE9BQUEsQ0FBUSxrQkFBUixDQUFBLENBQUEsQ0FBNkI7Z0NBQzdCLElBQUcsT0FBQSxDQUFRLGdCQUFnQjtvQ0FDdkIsTUFBQSxDQUFPLElBQUEsQ0FBSyxZQUFMLENBQWtCLE9BQUEsQ0FBUTtvQ0FDakMsZUFBQSxDQUFnQjtnQ0FDcEQ7NEJBQ0E7d0JBQ0E7b0JBQ0E7Z0JBQ0EsT0FBdUIsSUFBRyxJQUFBLENBQUssQ0FBTCxDQUFBLEdBQUEsQ0FBVyxXQUFXO29CQUM1QixHQUFBLENBQUksY0FBYztvQkFDbEIsSUFBRyxPQUFBLENBQVEsTUFBUixDQUFBLEdBQUEsQ0FBbUIsR0FBRzt3QkFDckIsV0FBQSxDQUFZLE1BQVosQ0FBbUIsc0JBQUEsQ0FBdUIsT0FBQSxDQUFRLElBQUksT0FBQSxDQUFRO29CQUN0RixPQUEyQjt3QkFDSCxXQUFBLENBQVksT0FBWixDQUFvQixPQUFBLENBQVE7b0JBQ3BEO29CQUVvQixNQUFBLENBQU8sSUFBQSxDQUFLLFlBQUwsQ0FBa0IsT0FBQSxDQUFRO29CQUNqQyxlQUFBLENBQWdCO2dCQUNwQyxPQUF1QjtvQkFDSCxNQUFNLElBQUksS0FBSixDQUFVLHFCQUFBLENBQUEsQ0FBQSxDQUFzQixJQUFBLENBQUssU0FBTCxDQUFlO2dCQUN6RTtZQUNBLE9BQW1CO2dCQUNILElBQUcsSUFBQSxDQUFLLHNCQUFzQjtvQkFDMUIsSUFBQSxDQUFLLElBQUwsQ0FBVSxTQUFTO3dCQUFDLFNBQVMsZ0JBQVYsQ0FBQTt3QkFBNEIsWUFBWSxVQUFBLENBQVcsS0FBWCxDQUFpQixHQUFFOztnQkFDbEcsT0FBdUI7b0JBQ0gsSUFBQSxDQUFLLElBQUwsQ0FBVSxTQUFTO3dCQUFDLFNBQVM7O2dCQUNqRDtZQUNBO1FBQ0EsQ0FBVSxRQUFNLEdBQUc7WUFDUCxJQUFBLENBQUssSUFBTCxDQUFVLFNBQVM7UUFDL0I7SUFDQTs7QUFDQTtBQUlBLFNBQVMsV0FBVyxJQUFNLEVBQUEsSUFBSTtJQUMxQixJQUFHLEVBQUEsQ0FBQSxDQUFBLENBQUssSUFBQSxDQUFLLE9BQU87UUFDaEIsR0FBQSxDQUFJLFNBQVM7UUFDYixJQUFHLElBQUEsQ0FBSyxLQUFMLENBQUEsR0FBQSxDQUFlO1lBQWMsTUFBQSxDQUFBLEVBQUEsQ0FBVTs7WUFDVixNQUFBLENBQUEsRUFBQSxDQUFVLElBQUEsQ0FBSztJQUN2RCxPQUFXLElBQUcsSUFBQSxDQUFLLFFBQVE7UUFDbkIsSUFBRyxFQUFBLENBQUEsQ0FBQSxDQUFHLENBQUgsQ0FBQSxHQUFBLENBQVMsR0FBRztZQUNYLEdBQUEsQ0FBSSxTQUFTO1FBQ3pCO0lBQ0EsT0FBVyxJQUFHLEVBQUEsQ0FBQSxDQUFBLENBQUcsQ0FBSCxDQUFBLEdBQUEsQ0FBUyxHQUFHO1FBQ2xCLEdBQUEsQ0FBSSxTQUFTO0lBQ3JCO0lBRUksSUFBRyxNQUFBLENBQUEsR0FBQSxDQUFXLFdBQVc7UUFDckIsSUFBQSxDQUFLLElBQUwsQ0FBVSxTQUFTO1lBQUMsU0FBUyxlQUFWLENBQUE7WUFBMkIsUUFBUTs7UUFDdEQsT0FBTztJQUNmLE9BQVc7UUFDSCxPQUFPO0lBQ2Y7QUFDQTs7QUFHQSxHQUFBLENBQUkseUJBQXlCLEtBQUEsQ0FBTSxvQkFBb0IsVUFBUyxZQUFZO0lBQ3hFLElBQUEsQ0FBSyxFQUFMLENBQUEsQ0FBQSxDQUFVLFVBQVMsS0FBTSxFQUFBLFNBQVM7UUFDOUIsSUFBRyxLQUFBLENBQUEsRUFBQSxDQUFTO1lBQ1IsTUFBTSxJQUFJLEtBQUosQ0FBVSx1QkFBQSxDQUFBLENBQUEsQ0FBd0IsS0FBeEIsQ0FBQSxDQUFBLENBQThCLHlCQUE5QixDQUFBLENBQUEsQ0FBd0QsS0FBeEQsQ0FBQSxDQUFBLENBQThEO1FBRWxGLFVBQUEsQ0FBVyxFQUFYLENBQWMsSUFBZCxDQUFtQixNQUFNLE9BQU07SUFDdkM7SUFFSSxJQUFBLENBQUssS0FBTCxDQUFBLENBQUEsQ0FBYSxVQUFTLFVBQVU7UUFDNUIsVUFBQSxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsT0FBTSxVQUFTLFdBQVc7WUFDNUMsSUFBRyxFQUFFLFNBQUEsQ0FBQSxFQUFBLENBQWEsK0JBQStCO2dCQUM3QyxRQUFBLENBQVMsS0FBVCxDQUFlLE1BQU07WUFDckM7UUFDQSxFQUpvQyxDQUkxQixJQUowQixDQUlyQjtJQUNmO0FBQ0E7QUFwekJBIiwiZmlsZSI6IkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFxycGVwLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbInZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIyJylcclxudmFyIHByb3RvID0gcmVxdWlyZShcInByb3RvXCIpXHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKVxyXG52YXIgRHVwbGV4RXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi9EdXBsZXhFdmVudEVtaXR0ZXInKVxyXG5cclxuLy8gZW51bXNcclxudmFyIHJlY2VpdmUgPSAwXHJcbnZhciByZXNwb25kID0gMVxyXG52YXIgc3RyZWFtID0gMlxyXG5cclxudmFyIGRlZmF1bHRNYXhJZCA9IDkwMDcxOTkyNTQ3NDA5OTIgLy8gMl41M11cclxudmFyIHJlc2VydmVkRmlyZUNvbW1hbmRzID0ge2Nsb3NlOjEsaWREaXNjb250aW51aXR5OjF9XHJcbnZhciByZXNlcnZlZFJlcXVlc3RBbmRTdHJlYW1Db21tYW5kcyA9IHtjbG9zZToxLGlkRGlzY29udGludWl0eToxfVxyXG52YXIgcmVzZXJ2ZWRSZXF1ZXN0QW5kU3RyZWFtRXJyb3JDb21tYW5kID0ge2Vycm9yOjF9XHJcbnZhciByZXNlcnZlZExpc3RlbmluZ0NvbW1hbmRzID0ge2Nsb3NlOjF9XHJcbnZhciByZXNlcnZlZFJlc3BvbmRBbmRTdHJlYW1MaXN0ZW5Db21tYW5kcyA9IHtpZERpc2NvbnRpbnVpdHk6MX1cclxudmFyIHJlc2VydmVkRXZlbnRMaXN0ZW5pbmdFdmVudHMgPSB7b3JkZXI6MX1cclxudmFyIHJlc2VydmVkU3RyZWFtRW1pc3Npb25FdmVudHMgPSB7b3JkZXJOdW1iZXJEaXNjb250aW51aXR5OjF9XHJcblxyXG5cclxudmFyIGJ1ZmZlciA9IDUwIC8vIHNvbWUgYnVmZmVyIGZvciBtZXNzYWdlIGhlYWRlciBzdHVmZlxyXG5cclxudmFyIFBlZXJFcnJvciA9IHByb3RvKEVycm9yLCBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMubmFtZSA9IFwiUGVlckVycm9yXCJcclxufSlcclxuXHJcbi8vIEFuIGluc3RhbmNlIG9mIFJwZXBDb3JlIGNhbiBlbWl0IHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxyXG4gICAgLy8gJ2Nsb3NlJyAtIEZpcmVkIG9uY2UgdGhlIGxpc3RlbmluZyBzZXJ2ZXIgaGFzIGJlZW4gY2xvc2VkXHJcbiAgICAvLyAnZXJyb3InIC0gRmlyZWQgaWYgdGhlcmUgd2FzIGFuIGVycm9yIHJlbGF0ZWQgdG8gbGlzdGVuaW5nXHJcbm1vZHVsZS5leHBvcnRzID0gcHJvdG8oRXZlbnRFbWl0dGVyLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyBzdGF0aWMgcHJvcGVydGllc1xyXG5cclxuICAgIC8vIGFuIGVycm9yIHRoYXQsIHdoZW4gdGhyb3duLCBzZW5kcyB0aGUgZXJyb3IgYXMgYW4gZXJyb3IgcmVzcG9uc2UgdG8gdGhlIG90aGVyIFBlZXIgKGluY2x1ZGluZyBpdGVyYWJsZSBwcm9wZXJ0aWVzLCBidXQgbm90IGluY2x1ZGluZyB0aGUgc3RhY2spXHJcbiAgICB0aGlzLlBlZXJFcnJvciA9IFBlZXJFcnJvclxyXG5cclxuICAgIC8vIGluc3RhbmNlIHByb3BlcnRpZXNcclxuXHJcbiAgICAvLyB0cmFuc3BvcnQgaXMgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzOlxyXG4gICAgICAgIC8vIGNvbm5lY3QoLyp0cmFuc3BvcnQgY29ubmVjdCBwYXJhbWV0ZXJzLi4uICovLCBycGVwT3B0aW9ucykgLSBjb25uZWN0cyB0byBhIHdlYnNvY2tldCBzZXJ2ZXJcclxuICAgICAgICAgICAgLy8gdHJhbnNwb3J0IGNvbm5lY3QgcGFyYW1ldGVycy4uLiAtIEEgdmFyaWFibGUgbnVtYmVyIG9mIHRyYW5zcG9ydCBjb25uZWN0IHBhcmFtZXRlcnMgcGFzc2VkIGludG8gcnBlcFBlZXIuY29ubmVjdFxyXG4gICAgICAgICAgICAvLyBycGVwT3B0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXhTZW5kU2l6ZSBhbmQgbWF4UmVjZWl2ZVNpemUgb3B0aW9uc1xyXG4gICAgICAgICAgICAvLyByZXR1cm5zIGEgY29ubmVjdGlvbiBvYmplY3RcclxuICAgICAgICAgICAgICAgLy8gd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHM6XHJcbiAgICAgICAgICAgICAgICAvLyBzZW5kKG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAvLyBjbG9zZSgpIC0gQ2xvc2VzIHRoZSBjb25uZWN0aW9uIGluIGEgd2F5IHRoYXQgYWN0aXZlbHkgaW5mb3JtcyB0aGUgb3RoZXIgUGVlciBhYm91dCBjbG9zdXJlLlxyXG4gICAgICAgICAgICAgICAgLy8gZHJvcCgpIC0gKE9wdGlvbmFsKSBDbG9zZXMgdGhlIGNvbm5lY3Rpb24gd2l0aG91dCBpbmZvcm1pbmcgdGhlIG90aGVyIFBlZXIuXHJcbiAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgZm9sbG93aW5nIGV2ZW50LWhhbmRsZXIgZnVuY3Rpb25zICh3aGljaCB3aWxsIG9ubHkgYmUgY2FsbGVkIG9uY2UpOlxyXG4gICAgICAgICAgICAgICAgLy8gb25PcGVuKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgLy8gb25DbG9zZShjYWxsYmFjaykgLSAoT3B0aW9uYWwpIElmIGFuIGVycm9yIGhhcHBlbnMgdGhhdCBjYXVzZXMgY29ubmVjdGlvbiBjbG9zdXJlLCB0aGlzIHNob3VsZCBzdGlsbCBiZSBmaXJlZCwgb3IgdGhlIGNvbm5lY3Rpb24gd2lsbCBiZSBhc3N1bWVkIHRvIHN0aWxsIGJlIG9wZW4uIElmIG5vdCBnaXZlbiwgYSBcImNsb3NlXCIgZmlyZS1hbmQtZm9yZ2V0IG1lc3NhZ2Ugd2lsbCBiZSBzZW50IGJlZm9yZSBjb25uZWN0aW9uIGNsb3N1cmUgaWYgdGhlIFBlZXIgaXMgYSBzZXJ2ZXIsIGFuZCB0aGF0IFwiY2xvc2VcIiBtZXNzYWdlIHdpbGwgYmUgbGlzdGVuZWQgZm9yIGlmIGl0cyBhIGNsaWVudCBQZWVyLlxyXG4gICAgICAgICAgICAgICAgLy8gb25NZXNzYWdlKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgLy8gb25FcnJvcihjYWxsYmFjaylcclxuICAgICAgICAvLyBsaXN0ZW4oLyp0cmFuc3BvcnQgbGlzdGVuIHBhcmFtZXRlcnMuLi4gKi8sIHJwZXBPcHRpb25zLCBjYWxsYmFjaykgLSAoT3B0aW9uYWwpIExpc3RlbnMgZm9yIGNvbm5lY3Rpb3NuIGFuZCBjYWxscyBgY2FsbGJhY2tgIHdoZW4gYSBjb25uZWN0aW9uIGNvbWVzIHRocm91Z2guXHJcbiAgICAgICAgICAgIC8vIHRyYW5zcG9ydCBsaXN0ZW4gcGFyYW1ldGVycy4uLiAtIEEgdmFyaWFibGUgbnVtYmVyIG9mIHRyYW5zcG9ydCBsaXN0ZW4gcGFyYW1ldGVycyBwYXNzZWQgaW50byBycGVwUGVlci5saXN0ZW5cclxuICAgICAgICAgICAgLy8gUGFyYW1ldGVyczpcclxuICAgICAgICAgICAgICAgIC8vIHJwZXBPcHRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1heFNlbmRTaXplIGFuZCBtYXhSZWNlaXZlU2l6ZSBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayhyZXF1ZXN0KSAtIENhbGxlZCB3aGVuIGEgY29ubmVjdGlvbiByZXF1ZXN0IGNvbWVzIHRocm91Z2guXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYHJlcXVlc3RgIGhhcyB0aGUgbWV0aG9kczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWNjZXB0KCkgLSBSZXR1cm5zIGEgY29ubmVjdGlvbiBvYmplY3QgKHdpdGggdGhlIHNhbWUgQVBJIGFzIHRoZSBvYmplY3QgdGhhdCBgY29ubmVjdGAgcmV0dXJucykuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlamVjdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIHRoZSBmb2xsb3dpbmcgcHJvcGVydHk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJhd1JlcXVlc3QgLSBUaGUgcmF3IHJlcXVlc3QgZnJvbSB0aGUgdHJhbnNwb3J0XHJcbiAgICAgICAgICAgIC8vIHJldHVybnMgYW4gb2JqZWN0XHJcbiAgICAgICAgICAgICAgIC8vIHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2Q6XHJcbiAgICAgICAgICAgICAgICAvLyBjbG9zZSgpIC0gY2xvc2VzIHRoZSBsaXN0ZW5pbmcgc2VydmVyXHJcbiAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgZm9sbG93aW5nIGV2ZW50LWhhbmRsZXIgZnVuY3Rpb25zICh3aGljaCB3aWxsIG9ubHkgYmUgY2FsbGVkIG9uY2UpOlxyXG4gICAgICAgICAgICAgICAgLy8gb25MaXN0ZW5pbmcoY2FsbGJhY2spIC0gQ2FsbGVkIHdoZW4gdGhlIHNlcnZlciBzdGFydHMgbGlzdGVuaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBvbkNsb3NlKGNhbGxiYWNrKSAtIENhbGxlZCB3aGVuIHRoZSBzZXJ2ZXIgc3RvcHMgbGlzdGVuaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBvbkVycm9yKGNhbGxiYWNrKSAtIENhbGxlZCBpZiBsaXN0ZW5pbmcgY291bGRuJ3QgYmUgc3RhcnRlZFxyXG4gICAgICAgIC8vIGNvbm5lY3Rpb24oY29ubmVjdGlvbkFyZ3VtZW50KSAtIFJldHVybnMgYSBjb25uZWN0aW9uIG9iamVjdFxyXG4gICAgICAgICAgICAvLyBjb25uZWN0aW9uQXJndW1lbnQgLSBUaGUgdmFsdWUgcmV0dXJuZWQgZnJvbSBgY29ubmVjdGAgYWJvdmUgb3IgZnJvbSB0aGUgYGFjY2VwdGAgZnVuY3Rpb24gaW4gYSBgbGlzdGVuYCBjYWxsYmFja1xyXG4gICAgLy8gc2VyaWFsaXphdGlvbiBpcyBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHM6XHJcbiAgICAgICAgLy8gc2VyaWFsaXplKGphdmFzY3JpcHRPYmplY3QpIC0gUmV0dXJucyB0aGUgamF2YXNjcmlwdCBvYmplY3QgaW4gc2VyaWFsaXplZCBmb3JtIChzb21ldGhpbmcgdGhlIHRyYW5zcG9ydCBjYW4gcHJvY2VzcywgbW9zdCBsaWtlbHkgYSBzdHJpbmcgb3IgQnVmZmVyKVxyXG4gICAgICAgIC8vIGRlc2VyaWFsaXplKHNlcmlhbGl6ZWRPYmplY3QpIC0gUmV0dXJucyBhIGphdmFzY3JpcHQgb2JqZWN0IHJlcHJlbnRlZCBieSB0aGUgc2VyaWFsaXplZE9iamVjdFxyXG4gICAgLy8gb3B0aW9uczpcclxuICAgICAgICAvLyBtYXhTZW5kU2l6ZSAtIFRoZSBtYXhpbXVtIGJ5dGUtbGVuZ3RoIGEgc2VudCBtZXNzYWdlIGNhbiBiZSAoRGVmYXVsdDogbm8gbGltaXQpXHJcbiAgICAgICAgLy8gbWF4UmVjZWl2ZVNpemUgLSBUaGUgbWF4aW11bSBieXRlLWxlbmd0aCBhIHJlY2VpdmVkIG1lc3NhZ2UgY2FuIGJlIChEZWZhdWx0OiBubyBsaW1pdClcclxuICAgICAgICAvLyBtYXhJZCAtIChEZWZhdWx0OiAyXjUzKSBUaGUgbWF4aW11bSBpZCB0byB1c2UgZm9yIHJlcXVlc3QgYW5kIHN0cmVhbSBjb21tYW5kcywgYXMgd2VsbCBhcyBzdHJlYW0gb3JkZXIgaWQgbnVtYmVyc1xyXG4gICAgICAgIC8vIGNsb3NlVGltZW91dCAtIChEZWZhdWx0OiAzMCwwMDAgbXMpIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgZm9yIG91dHN0YW5kaW5nIHJlcXVlc3RzIGFuZCBzdHJlYW1zIHRvIGNvbXBsZXRlIGJlZm9yZSBjbG9zaW5nIHRoZSBjb25uZWN0aW9uLiBJZiB0aGUgdGltZW91dCBpcyByZWFjaGVkLCBhbiAnZXJyb3InXHJcbiAgICAgICAgLy8gc2VuZENvbW1hbmRFcnJvckluZm8gLSAoRGVmYXVsdDp0cnVlKVxyXG4gICAgICAgICAgICAvLyBJZiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gZXJyb3JzIHdpbGwgYXV0b21hdGljYWxseSBiZSBzZW50IHRvIHRoZSBvdGhlciBQZWVyIGlmIHRoZWlyIGNvbW1hbmQgaXMgdW5wYXJzYWJsZSwgYW5kXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgcGFydCBvZiB0aGUgY29tbWFuZCB3aWxsIGJlIHNlbnQgd2l0aCBhbiBcImludmFsaWRNZXNzYWdlXCIgZXJyb3JcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB0aGUgZXJyb3Igd2lsbCBiZSBpZ25vcmVkIChidXQgaGFuZGxlYWJsZSB2aWEgcmF3SGFuZGxlIG9yIHByZUhhbmRsZSwgZGVwZW5kaW5nIG9uIHRoZSBjYXNlKS5cclxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKHRyYW5zcG9ydCwgc2VyaWFsaXphdGlvbiwgb3B0aW9ucykge1xyXG4gICAgICAgIGlmKCFvcHRpb25zKSBvcHRpb25zID0ge31cclxuXHJcbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnRcclxuICAgICAgICB0aGlzLnNlcmlhbGl6YXRpb24gPSBzZXJpYWxpemF0aW9uXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5tYXhJZCA9PT0gdW5kZWZpbmVkKSB0aGlzLm9wdGlvbnMubWF4SWQgPSBkZWZhdWx0TWF4SWRcclxuXHJcbiAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9XHJcbiAgICAgICAgLy8gdGhpcy5kZWZhdWx0SGFuZGxlclxyXG4gICAgICAgIC8vIHRoaXMucHJlSGFuZGxlclxyXG4gICAgICAgIC8vIHRoaXMucmF3SGFuZGxlclxyXG5cclxuICAgICAgICAvLyB0aGlzLmxpc3RlbmVyXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJucyBhIGZ1dHVyZSBvcGVuIGNvbm5lY3Rpb25cclxuICAgIC8vIHRha2VzIGluIGFueSBudW1iZXIgb2YgdHJhbnNwb3J0IHNwZWNpZmljIGNvbm5lY3Rpb24gYXJndW1lbnRzXHJcbiAgICB0aGlzLmNvbm5lY3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcclxuXHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoYXQudHJhbnNwb3J0LmNvbm5lY3QuYXBwbHkodGhhdC50cmFuc3BvcnQuY29ubmVjdCwgYXJncy5jb25jYXQoW3RoYXQub3B0aW9uc10pKVxyXG5cclxuICAgICAgICAgICAgdmFyIG9uT3BlbkNhbGxlZCA9IGZhbHNlLCBlcnJvcnMgPSBbXVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLm9uT3BlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG9uT3BlbkNhbGxlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocnBlcENvbm4pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgcnBlcENvbm4gPSBScGVwQ29ubmVjdGlvbih0aGF0LCBjb25uZWN0aW9uLCB7aXNTZXJ2ZXI6ZmFsc2UsIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYoIW9uT3BlbkNhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCJDb25uZWN0aW9uIGNvdWxkbid0IGJlIG9wZW5lZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSs9JzogXFxuJytlcnJvcnMuam9pbignXFxuJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgZS5lcnJvcnMgPSBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX0pXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLm9uRXJyb3IoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybnMgYSBmdXR1cmUgdGhhdCByZXNvbHZlcyBzdWNjZXNzZnVsbHkgd2hlbiB0aGUgc2VydmVyIGhhcyBiZWd1biBsaXN0ZW5pbmcgYW5kIHJlc29sdmVzIHRvIGFuIGVycm9yIGlmIGxpc3RlbmluZyBjb3VsZG4ndCBiZSBzdGFydGVkXHJcbiAgICB0aGlzLmxpc3RlbiA9IGZ1bmN0aW9uKC8qdmFyaWFibGUgbnVtYmVyIG9mIGxpc3RlbiBwYXJhbWV0ZXJzLCByZXF1ZXN0SGFuZGxlciovKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXHJcbiAgICAgICAgdmFyIHJlcXVlc3RIYW5kbGVyID0gYXJnc1thcmdzLmxlbmd0aC0xXVxyXG4gICAgICAgIHZhciB0cmFuc3BvcnRMaXN0ZW5Bcmd1bWVudHMgPSBhcmdzLnNsaWNlKDAsLTEpXHJcblxyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgaWYodGhhdC5saXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJScGVwIG9iamVjdCBhbHJlYWR5IGxpc3RlbmluZyFcIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5saXN0ZW5lciA9IHRoYXQudHJhbnNwb3J0Lmxpc3Rlbi5hcHBseSh0aGF0LnRyYW5zcG9ydCwgdHJhbnNwb3J0TGlzdGVuQXJndW1lbnRzLmNvbmNhdChbdGhhdC5vcHRpb25zLCBmdW5jdGlvbihyZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SGFuZGxlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSByZXF1ZXN0LmFjY2VwdC5hcHBseSh0aGF0LGFyZ3VtZW50cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJwZXBDb25uZWN0aW9uKHRoYXQsIGNvbm5lY3Rpb24sIHtpc1NlcnZlcjp0cnVlfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QucmVqZWN0LmFwcGx5KHRoYXQsIGFyZ3VtZW50cylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhd1JlcXVlc3Q6IHJlcXVlc3RcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1dKSlcclxuXHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5pbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGF0Lmxpc3RlbmVyLm9uTGlzdGVuaW5nKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuaW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoYXQubGlzdGVuZXIub25FcnJvcihmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVtaXQoJ2Vycm9yJyxlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGF0Lmxpc3RlbmVyLm9uQ2xvc2UoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5saXN0ZW5lciA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbWl0KCdjbG9zZScpXHJcbiAgICAgICAgICAgICAgICBpZihsaXN0ZW5pbmcgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBjbG9zZXMgYSBsaXN0ZW5pbmcgd2Vic29ja2V0IHNlcnZlclxyXG4gICAgLy8gbm8tb3AgaWYgdGhlIHNlcnZlciBpcyBhbHJlYWR5IGNsb3NlZFxyXG4gICAgdGhpcy5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKHRoaXMubGlzdGVuZXIpXHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuY2xvc2UoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNldHMgdXAgYSBoYW5kbGVyIHRvIHJlY2VpdmUgYSBmaXJlQW5kRm9yZ2V0IGNhbGxcclxuICAgIHRoaXMucmVjZWl2ZSA9IGZ1bmN0aW9uKGNvbW1hbmQsIGhhbmRsZXIpIHtcclxuICAgICAgICBhZGRDb21tYW5kKHRoaXMsIHJlY2VpdmUsIGNvbW1hbmQsIGhhbmRsZXIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0cyB1cCBhIGhhbmRsZXIgdG8gaGFuZGxlIHJlcXVlc3QtcmVzcG9uc2UgY2FsbHNcclxuICAgIC8vIHRoZSBoYW5kbGVyIGNhbiBlaXRoZXIgcmV0dXJuXHJcbiAgICAgICAgLy8gQSAocG9zc2libHkgZnV0dXJlKSB2YWx1ZSwgd2hpY2ggd2lsbCBiZSBzZW50IGFzIGEgcmVzcG9uc2UuIE9yLFxyXG4gICAgICAgIC8vIEEgKHBvc3NpYmx5IGZ1dHVyZSkgRXJyb3Igb2JqZWN0LiBUaGUgJ21lc3NhZ2UnIHdpbGwgYmUgc2VudCBhcyB0aGUgYGVycm9yYCwgYW5kIGFueSBvdGhlciBpdGVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBvYmplY3Qgd2lsbCBiZSBhZGRlZCBhcyB0aGUgYGRhdGFgLlxyXG4gICAgdGhpcy5yZXNwb25kID0gZnVuY3Rpb24oY29tbWFuZCwgaGFuZGxlcikge1xyXG4gICAgICAgIGFkZENvbW1hbmQodGhpcywgcmVzcG9uZCwgY29tbWFuZCwgaGFuZGxlcilcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXRzIHVwIGEgaGFuZGxlciB0byBoYW5kbGUgZXZlbnQtc3RlYW0gY2FsbHNcclxuICAgIHRoaXMuc3RyZWFtID0gZnVuY3Rpb24oY29tbWFuZCwgaGFuZGxlcikge1xyXG4gICAgICAgIGlmKCEoaGFuZGxlciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJycGVwLnN0cmVhbSByZXF1aXJlcyBhIGNhbGxiYWNrIGFzIHRoZSBzZWNvbmQgYXJndW1lbnRcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYWRkQ29tbWFuZCh0aGlzLCBzdHJlYW0sIGNvbW1hbmQsIGhhbmRsZXIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0cyBhIGRlZmF1bHQgY29tbWFuZCBoYW5kbGVyXHJcbiAgICB0aGlzLmRlZmF1bHQgPSBmdW5jdGlvbihoYW5kbGVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5kZWZhdWx0SGFuZGxlciAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBoYW5kbGVyRXJyb3IoJ2RlZmF1bHQgaGFuZGxlcicpXHJcblxyXG4gICAgICAgIHRoaXMuZGVmYXVsdEhhbmRsZXIgPSBoYW5kbGVyXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0cyB1cCBhIGZ1bmN0aW9uIHRoYXQgaXMgcnVuIGJlZm9yZSBldmVyeSBjb21tYW5kXHJcbiAgICAvLyBJZiBcImlnbm9yZVwiIGlzIHJldHVybmVkIGZyb20gYGhhbmRsZXJgLCB0aGUgY29ycmVzcG9uZGluZyByZWNlaXZlLCByZXNwb25kLCBzdHJlYW0sIG9yIGRlZmF1bHQgaGFuZGxlciB3aWxsIG5vdCBiZSBjYWxsZWRcclxuICAgIHRoaXMucHJlSGFuZGxlID0gZnVuY3Rpb24oaGFuZGxlcikge1xyXG4gICAgICAgIGlmKHRoaXMucHJlSGFuZGxlciAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBoYW5kbGVyRXJyb3IoJ3ByZUhhbmRsZScpXHJcblxyXG4gICAgICAgIHRoaXMucHJlSGFuZGxlciA9IGhhbmRsZXJcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXRzIHVwIGEgZnVuY3Rpb24gdGhhdCBpcyBydW4gYmVmb3JlIHRoZSBjb21tYW5kIGlzIGV2ZW4gcGFyc2VkXHJcbiAgICAvLyBJZiBcImlnbm9yZVwiIGlzIHJldHVybmVkIGZyb20gYGhhbmRsZXJgLCBwcmVIYW5kbGUgYW5kIHRoZSBjb3JyZXNwb25kaW5nIHJlY2VpdmUsIHJlc3BvbmQsIHN0cmVhbSwgb3IgZGVmYXVsdCBoYW5kbGVyIHdpbGwgbm90IGJlIGNhbGxlZFxyXG4gICAgdGhpcy5yYXdIYW5kbGUgPSBmdW5jdGlvbihoYW5kbGVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5yYXdIYW5kbGVyICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IGhhbmRsZXJFcnJvcigncmF3SGFuZGxlJylcclxuXHJcbiAgICAgICAgdGhpcy5yYXdIYW5kbGVyID0gaGFuZGxlclxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaXZhdGVcclxuXHJcbiAgICAvLyB0eXBlIHNob3VsZCBlaXRoZXIgYmUgYHJlY2VpdmVgLCBgcmVzcG9uZGAsIG9yIGBzdHJlYW1gXHJcbiAgICBmdW5jdGlvbiBhZGRDb21tYW5kKHRoYXQsIHR5cGUsIGNvbW1hbmQsIGhhbmRsZXIpIHtcclxuICAgICAgICBpZih0aGF0LmNvbW1hbmRzW2NvbW1hbmRdICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IGhhbmRsZXJFcnJvcignaGFuZGxlciBmb3IgXCInK2NvbW1hbmQrJ1wiJylcclxuICAgICAgICBpZihjb21tYW5kIGluIHJlc2VydmVkTGlzdGVuaW5nQ29tbWFuZHMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNldHVwIGEgaGFuZGxlciBmb3IgdGhlIGNvbW1hbmQgJ1wiK2NvbW1hbmQrXCInLCBiZWNhdXNlIGl0J3MgcmVzZXJ2ZWQgZm9yIGludGVybmFsIHVzZS5cIilcclxuICAgICAgICBpZigodHlwZSA9PT0gcmVzcG9uZCB8fCB0eXBlID09PSBzdHJlYW0pICYmIGNvbW1hbmQgaW4gcmVzZXJ2ZWRSZXNwb25kQW5kU3RyZWFtTGlzdGVuQ29tbWFuZHMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNldHVwIGEgcmVjZWl2ZSBvciBzdHJlYW0gaGFuZGxlciBmb3IgdGhlIGNvbW1hbmQgJ1wiK2NvbW1hbmQrXCInLCBiZWNhdXNlIGl0J3MgcmVzZXJ2ZWQgZm9yIGFzIGEgcmVjZWl2ZSBjb21tYW5kLiBJZiB5b3UnZCBsaWtlIHRvIGxpc3RlbiBmb3IgdGhpcyBjb21tYW5kLCB1c2UgYHJlY2VpdmVgLlwiKVxyXG5cclxuICAgICAgICB0aGF0LmNvbW1hbmRzW2NvbW1hbmRdID0ge3R5cGU6IHR5cGUsIGhhbmRsZXI6IGhhbmRsZXJ9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlckVycm9yKGhhbmRsZXJOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignQSAnK2hhbmRsZXJOYW1lKycgYWxyZWFkeSBleGlzdHMhIFlvdSBjYW4gb25seSBoYXZlIG9uZSBoYW5kbGVyIHBlciBjb21tYW5kLicpXHJcbiAgICB9XHJcbn0pXHJcblxyXG4vLyBBbiBpbnN0YW5jZSBvZiBScGVwQ29ubmVjdGlvbiBjYW4gZW1pdCB0aGUgZm9sbG93aW5nIGV2ZW50czpcclxuICAgIC8vIGNsb3NlKCkgLSBGaXJlZCBvbmNlIHRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZFxyXG4gICAgLy8gb3Blbk1lc3NhZ2UoKSAtIEZpcmVkIHdoZW4gYW4gJ29wZW4nIG1lc3NhZ2UgaXMgcmVjZWl2ZWQuIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cclxuICAgIC8vIGNsb3NlTWVzc2FnZSgpIC0gRmlyZWQgd2hlbiBhICdjbG9zZScgbWVzc2FnZSBpcyByZWNlaXZlZC4gRm9yIGludGVybmFsIHVzZSBvbmx5LlxyXG4gICAgLy8gZXJyb3IoZSkgLSBBbiBlcnJvciBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIGNvbm5lY3Rpb24gaW4gdGhlIGZvbGxvd2luZyBjYXNlczpcclxuICAgICAgICAvLyBXaGVuIHRoZSB0cmFuc3BvcnQgY2FsbHMgaXRzIG9uRXJyb3IgY2FsbGJhY2tcclxuICAgICAgICAvLyBXaGVuIGFuIGVycm9yIGlzIHRocm93biBmcm9tIGEgc3RyZWFtIG9yIHJlY2VpdmUgaGFuZGxlclxyXG4gICAgICAgIC8vIFdoZW4gYW4gZXJyb3IgdGhhdCBpc24ndCBhIFBlZXJFcnJvciBpcyB0aHJvd24gZnJvbSBhIHJlc3BvbmQgaGFuZGxlclxyXG4gICAgICAgIC8vIElmIGFuIHVuZXhwZWN0ZWQgaW50ZXJuYWwgZXhjZXB0aW9uIGlzIHRocm93biB3aGVuIGhhbmRsaW5nIGEgbWVzc2FnZVxyXG4gICAgICAgIC8vIElmIHRoZSBjbG9zZVRpbWVvdXQgaXMgcmVhY2hlZCBhbmQgdGhlcmUgYXJlIHN0aWxsIG9wZW4gcmVxdWVzdHMgb3Igc3RyZWFtcy4gVGhpcyBlcnJvciB3aWxsIGNvbnRhaW4gaW5mbyBhYm91dCB3aGF0IHJlcXVlc3RzIGFuZCBzdHJlYW1zIGFyZSBzdGlsbCBvcGVuLlxyXG52YXIgUnBlcENvbm5lY3Rpb24gPSBwcm90byhFdmVudEVtaXR0ZXIsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vIGNvbm5lY3Rpb25PcHRpb25zXHJcbiAgICAgICAgLy8gaXNTZXJ2ZXIgLSBTaG91bGQgYmUgdHJ1ZSBpZiB0aGUgY29ubmVjdGlvbiBpcyBiZWluZyBjcmVhdGQgYnkgYSBzZXJ2ZXIsIGZhbHNlIG90aGVyd2lzZVxyXG4gICAgICAgIC8vIG9uQ2xvc2UgLSBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgaW4gdGhlIG9uQ2xvc2UgZXZlbnQgYmVmb3JlIHRoZSAnY2xvc2UnIGV2ZW50IGlzIGVtaXR0ZWRcclxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKHJwZXBDb3JlT2JqZWN0LCBjb25uZWN0aW9uT2JqZWN0LCBjb25uZWN0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gcnBlcENvcmVPYmplY3QudHJhbnNwb3J0XHJcbiAgICAgICAgdGhpcy5zZXJpYWxpemF0aW9uID0gcnBlcENvcmVPYmplY3Quc2VyaWFsaXphdGlvblxyXG4gICAgICAgIHRoaXMuY29tbWFuZHMgPSBycGVwQ29yZU9iamVjdC5jb21tYW5kc1xyXG5cclxuICAgICAgICB0aGlzLmRlZmF1bHRIYW5kbGVyID0gcnBlcENvcmVPYmplY3QuZGVmYXVsdEhhbmRsZXJcclxuICAgICAgICB0aGlzLnByZUhhbmRsZXIgPSBycGVwQ29yZU9iamVjdC5wcmVIYW5kbGVyXHJcbiAgICAgICAgdGhpcy5yYXdIYW5kbGVyID0gcnBlcENvcmVPYmplY3QucmF3SGFuZGxlclxyXG5cclxuICAgICAgICB0aGlzLm1heFNlbmRTaXplID0gcnBlcENvcmVPYmplY3Qub3B0aW9ucy5tYXhTZW5kU2l6ZVxyXG4gICAgICAgIHRoaXMubWF4UmVjZWl2ZVNpemUgPSBycGVwQ29yZU9iamVjdC5vcHRpb25zLm1heFJlY2VpdmVTaXplXHJcbiAgICAgICAgdGhpcy5zZW5kQ29tbWFuZEVycm9ySW5mbyA9IHJwZXBDb3JlT2JqZWN0Lm9wdGlvbnMuc2VuZENvbW1hbmRFcnJvckluZm9cclxuICAgICAgICB0aGlzLm1heElkID0gcnBlcENvcmVPYmplY3Qub3B0aW9ucy5tYXhJZFxyXG4gICAgICAgIHRoaXMuY2xvc2VUaW1lb3V0ID0gcnBlcENvcmVPYmplY3Qub3B0aW9ucy5jbG9zZVRpbWVvdXQgfHwgMzAwMDBcclxuICAgICAgICB0aGlzLnNlcnZlciA9IGNvbm5lY3Rpb25PcHRpb25zLmlzU2VydmVyXHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb25PYmplY3RcclxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWVcclxuICAgICAgICB0aGlzLmNsb3NpbmcgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuc2Vzc2lvbkRhdGEgPSB7fVxyXG4gICAgICAgIHRoaXMuY29tbWFuZFN0YXRlID0ge31cclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyYXdDb25uZWN0aW9uJywgeyBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnJhd0Nvbm5lY3Rpb25cclxuICAgICAgICB9fSlcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLnNlcnZlcilcclxuICAgICAgICAgICAgdGhpcy5uZXh0SWQgPSAwXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLm5leHRJZCA9IDFcclxuXHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcblxyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdGlvbi5vbkNsb3NlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbkNsb3NlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYoY29ubmVjdGlvbk9wdGlvbnMub25DbG9zZSlcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uT3B0aW9ucy5vbkNsb3NlKClcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvbm5lY3RlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVtaXQoJ2Nsb3NlJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uKCdjbG9zZU1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29ubmVjdGVkID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZW1pdCgnY2xvc2UnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uTWVzc2FnZShmdW5jdGlvbihyYXdNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZSh0aGF0LCByYXdNZXNzYWdlKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uRXJyb3IoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGF0LmVtaXQoJ2Vycm9yJywgZSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsb3NlcyB0aGUgY29ubmVjdGlvblxyXG4gICAgdGhpcy5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2luZyA9IHRydWVcclxuICAgICAgICAgICAgaWYoT2JqZWN0LmtleXModGhpcy5jb21tYW5kU3RhdGUpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VJbnRlcm5hbCh0aGlzKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2VUaW1lb3V0SGFuZGxlID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VJbnRlcm5hbCh0aGF0KVxyXG4gICAgICAgICAgICAgICAgfSx0aGlzLmNsb3NlVGltZW91dClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGRyb3BzIHRoZSBjb25uZWN0aW9uIHdpdGhvdXQgaW5mb3JtaW5nIHRoZSBvdGhlciBQZWVyIGlmIHN1cHBvcnRlZCwgb3RoZXJ3aXNlIHdpdGggaW5mb3JtaW5nIHRoZSBvdGhlciBQZWVyXHJcbiAgICB0aGlzLmRyb3AgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZih0aGlzLmNvbm5lY3RlZCAmJiB0aGlzLmNvbm5lY3Rpb24uZHJvcCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uZHJvcCgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZpcmUgYW5kIGZvcmdldCBtZXNzYWdlXHJcbiAgICAvLyBJZiBgY29tbWFuZGAgaXMgXCJlcnJvclwiLCB0aGUgZGF0YSBtdXN0IGJlIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbWVzc2FnZSBwcm9wZXJ0eSAoZWcgYW4gRXJyb3Igb2JqZWN0KS4gQW55IG90aGVyIGl0ZXJhYmxlIHByb3BlcnRpZXMgd2lsbCBiZSBhZGRlZCBhcyBkYXRhLlxyXG4gICAgdGhpcy5maXJlID0gZnVuY3Rpb24oY29tbWFuZC8qLCBkYXRhLi4uKi8pIHtcclxuICAgICAgICBpZihjb21tYW5kID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50c1sxXS5tZXNzYWdlID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZGF0YSBmb3IgYW4gJ2Vycm9yJyBmaXJlLWFuZC1mb3JnZXQgbWVzc2FnZSBtdXN0IGhhdmUgYSAnbWVzc2FnZScgcHJvcGVydHkgKGVnIGFuIEVycm9yIG9iamVjdCBoYXMgYSBtZXNzYWdlIHByb3BlcnR5KVwiKVxyXG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggIT09IDIpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbiAnZXJyb3InIGZpcmUtYW5kLWZvcmdldCBtZXNzYWdlIGNhbiBvbmx5IHRha2Ugb25lIGFyZ3VtZW50IC0gdGhlIGVycm9yLlwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY29tbWFuZCBpbiByZXNlcnZlZEZpcmVDb21tYW5kcykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBmaXJlIGFuICdcIitjb21tYW5kK1wiJyBldmVudCBkaXJlY3RseTsgJ1wiK2NvbW1hbmQrXCInIGlzIGEgZ2xvYmFsIGNvbW1hbmQgcmVzZXJ2ZWQgZm9yIGludGVybmFsIHVzZS5cIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gW2NvbW1hbmRdXHJcbiAgICAgICAgaWYoY29tbWFuZCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBhcmd1bWVudHNbMV1cclxuICAgICAgICAgICAgdmFyIGVycm9yRGF0YSA9IHt9XHJcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaWYoayAhPT0gJ21lc3NhZ2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yRGF0YVtrXSA9IGVycm9yW2tdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2UucHVzaChlcnJvci5tZXNzYWdlLCBlcnJvckRhdGEpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWRkRGF0YShtZXNzYWdlLCBhcmd1bWVudHMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZW5kKHRoaXMsIG1lc3NhZ2UpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVxdWVzdCByZXNwb25zZVxyXG4gICAgdGhpcy5yZXF1ZXN0ID0gZnVuY3Rpb24oY29tbWFuZC8qLCBkYXRhLi4uKi8pIHtcclxuICAgICAgICBpZihjb21tYW5kIGluIHJlc2VydmVkUmVxdWVzdEFuZFN0cmVhbUNvbW1hbmRzKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBkbyBhICdcIitjb21tYW5kK1wiJyByZXF1ZXN0IGRpcmVjdGx5OyAnXCIrY29tbWFuZCtcIicgaXMgYSBnbG9iYWwgY29tbWFuZCByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNlLlwiKVxyXG4gICAgICAgIGlmKGNvbW1hbmQgaW4gcmVzZXJ2ZWRSZXF1ZXN0QW5kU3RyZWFtRXJyb3JDb21tYW5kKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBkbyBhbiAnZXJyb3InIHJlcXVlc3Q7ICdlcnJvcicgaXMgcmVzZXJ2ZWQgZm9yIGdsb2JhbCBmaXJlLWFuZC1mb3JnZXQgZXJyb3JzLlwiKVxyXG4gICAgICAgIGlmKHRoaXMuY29tbWFuZFN0YXRlW3RoaXMubmV4dElkXSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIGFscmVhZHkgYSBjYWxsYmFjayBmb3IgaWQ6ICcrdGhpcy5uZXh0SWQpXHJcblxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gW2NvbW1hbmQsIHRoaXMubmV4dElkXVxyXG4gICAgICAgIGFkZERhdGEobWVzc2FnZSwgYXJndW1lbnRzKVxyXG5cclxuICAgICAgICBzZW5kKHRoaXMsIG1lc3NhZ2UpXHJcblxyXG4gICAgICAgIHZhciB0aGVSZXNvbHZlciA9IHV0aWxzLnJlc29sdmVyKClcclxuICAgICAgICB0aGVSZXNvbHZlci5jb21tYW5kID0gY29tbWFuZFxyXG4gICAgICAgIHRoaXMuY29tbWFuZFN0YXRlW3RoaXMubmV4dElkXSA9IHRoZVJlc29sdmVyXHJcblxyXG4gICAgICAgIGluY3JlbWVudElkKHRoaXMpXHJcblxyXG4gICAgICAgIHJldHVybiB0aGVSZXNvbHZlci5mXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZnVsbC1kdXBsZXggZXZlbnQgc3RyZWFtXHJcbiAgICB0aGlzLnN0cmVhbUNvbm5lY3QgPSBmdW5jdGlvbihjb21tYW5kLyosIGRhdGEuLi4qLykge1xyXG4gICAgICAgIGlmKGNvbW1hbmQgaW4gcmVzZXJ2ZWRSZXF1ZXN0QW5kU3RyZWFtQ29tbWFuZHMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IG9wZW4gYSAnXCIrY29tbWFuZCtcIicgc3RyZWFtIGRpcmVjdGx5OyAnXCIrY29tbWFuZCtcIicgaXMgYSBnbG9iYWwgY29tbWFuZCByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNlLlwiKVxyXG4gICAgICAgIGlmKGNvbW1hbmQgaW4gcmVzZXJ2ZWRSZXF1ZXN0QW5kU3RyZWFtRXJyb3JDb21tYW5kKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBvcGVuIGFuICdlcnJvcicgc3RyZWFtOyAnZXJyb3InIGlzIHJlc2VydmVkIGZvciBnbG9iYWwgZmlyZS1hbmQtZm9yZ2V0IGVycm9ycy5cIilcclxuICAgICAgICBpZih0aGlzLmNvbW1hbmRTdGF0ZVt0aGlzLm5leHRJZF0gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBhbHJlYWR5IGEgY2FsbGJhY2sgZm9yIGlkOiAnK3RoaXMubmV4dElkKVxyXG5cclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFtjb21tYW5kLCB0aGlzLm5leHRJZF1cclxuICAgICAgICBhZGREYXRhKG1lc3NhZ2UsIGFyZ3VtZW50cylcclxuXHJcbiAgICAgICAgdmFyIGVtaXR0ZXIgPSB0aGlzLmNvbW1hbmRTdGF0ZVt0aGlzLm5leHRJZF0gPSBjcmVhdGVTdHJlYW1FbWl0ZXIodGhpcywgdGhpcy5uZXh0SWQpXHJcbiAgICAgICAgZW1pdHRlci5jb21tYW5kID0gY29tbWFuZFxyXG4gICAgICAgIHNlbmQodGhpcywgbWVzc2FnZSlcclxuXHJcbiAgICAgICAgaW5jcmVtZW50SWQodGhpcylcclxuXHJcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXJcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlXHJcblxyXG4gICAgZnVuY3Rpb24gc2VyaWFsaXplKHRoYXQsZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGF0LnNlcmlhbGl6YXRpb24uc2VyaWFsaXplKGRhdGEpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkZXNlcmlhbGl6ZSh0aGF0LHNlcmlhbGl6ZWREYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuc2VyaWFsaXphdGlvbi5kZXNlcmlhbGl6ZShzZXJpYWxpemVkRGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZUludGVybmFsKHRoYXQpIHtcclxuICAgICAgICBpZih0aGF0LmNsb3NlVGltZW91dEhhbmRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGF0LmNsb3NlVGltZW91dEhhbmRsZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpZHMgPSBPYmplY3Qua2V5cyh0aGF0LmNvbW1hbmRTdGF0ZSlcclxuICAgICAgICBpZihpZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJDb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZCBhZnRlciBhIFwiK3RoYXQuY2xvc2VUaW1lb3V0K1wibXMgdGltZW91dCBhbmQgc29tZSBwZW5kaW5nIHJlcXVlc3RzIGFuZCBzdHJlYW1zIHJlbWFpbiB1bmZ1bGZpbGxlZC4gXCIrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGUgZm9sbG93aW5nIHJlcXVlc3RzIGFuZCBzdHJlYW1zIHdlcmUgc3RpbGwgYWN0aXZlIHVwIHVudGlsIHRoZSB0aW1lb3V0OlxcblwiXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgYWN0aXZlQ29tbWFuZFN0YXRlcyA9IFtdXHJcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiB0aGF0LmNvbW1hbmRTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSB0aGF0LmNvbW1hbmRTdGF0ZVtrXVxyXG4gICAgICAgICAgICAgICAgaWYoaW5mbyBpbnN0YW5jZW9mIFJwZXBEdXBsZXhFdmVudEVtaXR0ZXIpIHsgLy8gc3RyZWFtXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5mby5lbmRNZXNzYWdlU2VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVDb21tYW5kU3RhdGVzLnB1c2goXCIqIFN0cmVhbSBcIitrK1wiICdcIitpbmZvLmNvbW1hbmQrXCInIHdhaXRpbmcgZm9yIG90aGVyIHNpZGUgdG8gJ2VuZCdcIilcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5mby5lbmRNZXNzYWdlUmVjZWl2ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29tbWFuZFN0YXRlcy5wdXNoKFwiKiBTdHJlYW0gXCIraytcIiAnXCIraW5mby5jb21tYW5kK1wiJyBoYXMgcmVjZWl2ZWQgJ2VuZCcgYnV0IGhhc24ndCBzZW50ICdlbmQnXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29tbWFuZFN0YXRlcy5wdXNoKFwiKiBTdHJlYW0gXCIraytcIiAnXCIraW5mby5jb21tYW5kK1wiJyBpcyBzdGlsbCBhY3RpdmVcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5mby5mICE9PSB1bmRlZmluZWQpIHsgLy8gcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNvbW1hbmRTdGF0ZXMucHVzaChcIiogUmVxdWVzdCBcIitrK1wiIHRvICdcIitpbmZvLmNvbW1hbmQrXCInXCIpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNvbW1hbmRTdGF0ZXMucHVzaChcIiogUmVzcG9uc2UgXCIraytcIiBmb3IgJ1wiK2luZm8uY29tbWFuZCtcIidcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlKz1hY3RpdmVDb21tYW5kU3RhdGVzLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgICAgIHZhciBlID0gbmV3IEVycm9yKGVycm9yTWVzc2FnZSlcclxuICAgICAgICAgICAgZS5pZHMgPSBpZHNcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZFN0YXRlID0ge30gLy8gY2xlYXIgY29tbWFuZCBzdGF0ZSBzbyBhbnl0aGluZyB0aGF0IGNvbWVzIHRocm91Z2ggd2lsbCBlcnJvciAtIHRvZG86IHNob3VsZCB3ZSBqdXN0IGxlYXZlIGl0IGJlIHRobz9cclxuXHJcbiAgICAgICAgICAgIHRoYXQuZW1pdCgnZXJyb3InLCBlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhhdC5jb25uZWN0aW9uLm9uQ2xvc2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZW5kKHRoYXQsIFsnY2xvc2UnXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoYXQuY29ubmVjdGlvbi5jbG9zZSgpXHJcbiAgICAgICAgdGhhdC5jb25uZWN0aW9uID0gdW5kZWZpbmVkXHJcbiAgICB9XHJcbiAgICAvLyBjaGVja3MgaWYgdGhlIGNvbm5lY3Rpb24gaXMgY2xvc2luZyBhbmQgaWYgaXQgaXMgYW5kIGl0J3MgYSBjbGVhbiBjbG9zZSwgY2xvc2UgaXQgb3V0XHJcbiAgICBmdW5jdGlvbiBjaGVja0NsZWFuQ2xvc2UodGhhdCkge1xyXG4gICAgICAgIGlmKHRoYXQuY2xvc2luZyAmJiBPYmplY3Qua2V5cyh0aGF0LmNvbW1hbmRTdGF0ZSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNsb3NlSW50ZXJuYWwodGhhdClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWF5IHNlbmQgYW4gaWREaXNjb250aW51aXR5IG1lc3NhZ2VcclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudElkKHRoYXQpIHtcclxuICAgICAgICB2YXIgcHJldklkID0gdGhhdC5uZXh0SWRcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIHRoYXQubmV4dElkICs9IDJcclxuICAgICAgICAgICAgaWYodGhhdC5uZXh0SWQgPiB0aGF0Lm1heElkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5leHRJZCA9IHRoYXQubmV4dElkJTIgLy8gcmVzZXQgdG8gMCBvciAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IHdoaWxlKHRoYXQubmV4dElkIGluIHRoYXQuY29tbWFuZFN0YXRlICYmIHByZXZJZCAhPT0gdGhhdC5uZXh0SWQpXHJcblxyXG4gICAgICAgIGlmKHByZXZJZCA9PT0gdGhhdC5uZXh0SWQpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHZhbGlkIHJwZXAgSURzIGxlZnQgdG8gdXNlLlwiKVxyXG4gICAgICAgIGlmKHRoYXQubmV4dElkICE9PSBwcmV2SWQrMilcclxuICAgICAgICAgICAgc2VuZCh0aGF0LCBbJ2lkRGlzY29udGludWl0eScsIFtwcmV2SWQsdGhhdC5uZXh0SWRdXSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGREYXRhKG1lc3NhZ2UsIHRoZUFyZ3VtZW50cykge1xyXG4gICAgICAgIHZhciBkYXRhID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhlQXJndW1lbnRzLCAxKVxyXG4gICAgICAgIGlmKGRhdGEubGVuZ3RoID09PSAxKVxyXG4gICAgICAgICAgICBtZXNzYWdlLnB1c2goZGF0YVswXSlcclxuICAgICAgICBlbHNlIGlmKGRhdGEubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgbWVzc2FnZS5wdXNoKGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJucyB0aGUgYXJndW1lbnQgaWYgaXRzIGFycmF5LCBvciB3cmFwcyBpdCBpbiBhbiBhcnJheSBpZiBub3RcclxuICAgIGZ1bmN0aW9uIGdldEFycmF5RGF0YShkYXRhKSB7XHJcbiAgICAgICAgaWYoZGF0YSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gW11cclxuICAgICAgICBlbHNlIGlmKGRhdGEgaW5zdGFuY2VvZiBBcnJheSlcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBbZGF0YV1cclxuICAgIH1cclxuXHJcbiAgICAvLyBtYXkgc2VuZCBhbiBkaXNjdG9udGludWl0eSBtZXNzYWdlXHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRPcmRlck51bWJlcih0aGF0LCBlbWl0dGVyKSB7XHJcbiAgICAgICAgZW1pdHRlci5uZXh0T3JkZXJOdW1iZXIgKz0gMVxyXG4gICAgICAgIGlmKGVtaXR0ZXIubmV4dE9yZGVyTnVtYmVyID4gdGhhdC5tYXhJZCkge1xyXG4gICAgICAgICAgICB2YXIgcHJldk51bWJlciA9IGVtaXR0ZXIubmV4dE9yZGVyTnVtYmVyLTFcclxuICAgICAgICAgICAgZW1pdHRlci5uZXh0T3JkZXJOdW1iZXIgPSAwXHJcbiAgICAgICAgICAgIHNlbmRFdmVudCh0aGF0LCBlbWl0dGVyLCAgZW1pdHRlci5pZCwgJ29yZGVyTnVtYmVyRGlzY29udGludWl0eScsIFsnJywgcHJldk51bWJlciwgZW1pdHRlci5uZXh0T3JkZXJOdW1iZXJdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBlcnJvciBpcyBleHBlY3RlZCB0byBiZSBhbiBleGNlcHRpb24gb2JqZWN0ICh3aXRoIGEgbWVzc2FnZSBwcm9wZXJ0eSBhdCBsZWFzdClcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVycm9ySW5mbyhlcnJvcikge1xyXG4gICAgICAgIHZhciBkYXRhID0ge30sIGFueSA9IGZhbHNlXHJcbiAgICAgICAgZm9yKHZhciBrIGluIGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmKGsgIT09ICdtZXNzYWdlJykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtrXSA9IGVycm9yW2tdXHJcbiAgICAgICAgICAgICAgICBhbnkgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBlcnJvckluZm8gPSBbZXJyb3IubWVzc2FnZV1cclxuICAgICAgICBpZihhbnkpIHtcclxuICAgICAgICAgICAgZXJyb3JJbmZvLnB1c2goZGF0YSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvckluZm9cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFcnJvckZyb21NZXNzYWdlKGVycm9yTWVzc2FnZSwgZXJyb3JEYXRhKSB7XHJcbiAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKVxyXG4gICAgICAgIGZvcih2YXIgayBpbiBlcnJvckRhdGEpIHtcclxuICAgICAgICAgICAgaWYoayAhPT0gJ21lc3NhZ2UnKVxyXG4gICAgICAgICAgICAgICAgZVtrXSA9IGVycm9yRGF0YVtrXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdHJlYW1FbWl0ZXIodGhhdCwgaWQpIHtcclxuICAgICAgICB2YXIgZW1pdHRlciA9IFJwZXBEdXBsZXhFdmVudEVtaXR0ZXIoZnVuY3Rpb24gb25FbWl0KGV2ZW50LyosIGRhdGEqLykge1xyXG4gICAgICAgICAgICBpZihlbWl0dGVyLmVuZE1lc3NhZ2VTZW50KVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyZWFtICdlbmQnIGV2ZW50IGhhcyBiZWVuIHNlbnQsIGNhbid0IHNlbmQgbW9yZSBldmVudHMuXCIpXHJcbiAgICAgICAgICAgIGlmKGV2ZW50IGluIHJlc2VydmVkU3RyZWFtRW1pc3Npb25FdmVudHMpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBlbWl0IHRoZSAnXCIrZXZlbnQrXCInIGV2ZW50IGRpcmVjdGx5OyAnXCIrZXZlbnQrXCInIGlzIHJlc2VydmVkIGZvciBpbnRlcm5hbCB1c2UuXCIpXHJcbiAgICAgICAgICAgIGlmKGV2ZW50ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICBpZihhcmd1bWVudHNbMV0ubWVzc2FnZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBkYXRhIGZvciBhbiAnZXJyb3InIGV2ZW50IG11c3QgaGF2ZSBhICdtZXNzYWdlJyBwcm9wZXJ0eSAoZWcgYW4gRXJyb3Igb2JqZWN0IGhhcyBhIG1lc3NhZ2UgcHJvcGVydHkpXCIpXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggIT09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gJ2Vycm9yJyBldmVudCBjYW4gb25seSB0YWtlIG9uZSBhcmd1bWVudCAtIHRoZSBlcnJvci5cIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VuZEV2ZW50KHRoYXQsIGVtaXR0ZXIsIGlkLCBldmVudCwgYXJndW1lbnRzKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGVtaXR0ZXIuaWQgPSBpZFxyXG4gICAgICAgIGVtaXR0ZXIub3JkZXJpbmdEYXRhID0gZmFsc2VcclxuICAgICAgICBlbWl0dGVyLm5leHRPcmRlck51bWJlciA9IDBcclxuICAgICAgICBlbWl0dGVyLmVuZE1lc3NhZ2VTZW50ID0gZmFsc2VcclxuICAgICAgICByZXR1cm4gZW1pdHRlclxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJhdyBzZW5kXHJcbiAgICBmdW5jdGlvbiBzZW5kKHRoYXQsIG1lc3NhZ2UpIHtcclxuICAgICAgICB2YXIgc2VyaWFsaXplZE1lc3NhZ2UgPSBzZXJpYWxpemUodGhhdCwgbWVzc2FnZSlcclxuICAgICAgICBpZih0aGF0Lm1heFNlbmRTaXplICE9PSB1bmRlZmluZWQgJiYgc2VyaWFsaXplZE1lc3NhZ2UubGVuZ3RoID4gdGhhdC5tYXhTZW5kU2l6ZSkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcignbWF4TWVzc2FnZVNpemVFeGNlZWRlZCcpXHJcbiAgICAgICAgICAgIGUubWVzc2FnZVNpemUgPSBzZXJpYWxpemVkTWVzc2FnZS5sZW5ndGhcclxuICAgICAgICAgICAgdGhyb3cgZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhhdC5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhhdC5jb25uZWN0aW9uLnNlbmQoc2VyaWFsaXplZE1lc3NhZ2UpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0Nvbm5lY3Rpb24gaXMgY2xvc2VkJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXJncyB3aWxsIGNvbnRhaW4gW2V2ZW50LCBkYXRhLi4uXVxyXG4gICAgZnVuY3Rpb24gc2VuZEV2ZW50KHRoYXQsIGVtaXR0ZXIsIGlkLCBldmVudCwgYXJncykge1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gW2lkXVxyXG4gICAgICAgIGlmKGVtaXR0ZXIub3JkZXJpbmdEYXRhKVxyXG4gICAgICAgICAgICBtZXNzYWdlLnB1c2goZW1pdHRlci5uZXh0T3JkZXJOdW1iZXIpXHJcblxyXG4gICAgICAgIG1lc3NhZ2UucHVzaChldmVudClcclxuXHJcbiAgICAgICAgaWYoZXZlbnQgPT09ICdlcnJvcicpXHJcbiAgICAgICAgICAgIG1lc3NhZ2UucHVzaChjcmVhdGVFcnJvckluZm8oYXJnc1sxXSkpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBhZGREYXRhKG1lc3NhZ2UsIGFyZ3MpXHJcblxyXG4gICAgICAgIHNlbmQodGhhdCwgbWVzc2FnZSlcclxuXHJcbiAgICAgICAgaWYoZXZlbnQgPT09ICdlbmQnKSB7XHJcbiAgICAgICAgICAgIGVtaXR0ZXIuZW5kTWVzc2FnZVNlbnQgPSB0cnVlXHJcbiAgICAgICAgICAgIGlmKGVtaXR0ZXIuZW5kTWVzc2FnZVJlY2VpdmVkKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhhdC5jb21tYW5kU3RhdGVbaWRdIC8vIGVuc3VyZXMgdGhhdCBcInJwZXBJZE5vdEZvdW5kXCIgd2lsbCBiZSByZXR1cm5lZCBpZiB0aGlzIHN0cmVhbSBjb250aW51ZXMgdG8gYmUgY29tbXVuaWNhdGVkIG9uXHJcbiAgICAgICAgICAgICAgICBjaGVja0NsZWFuQ2xvc2UodGhhdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZihlbWl0dGVyLm9yZGVyaW5nRGF0YSkge1xyXG4gICAgICAgICAgICBpbmNyZW1lbnRPcmRlck51bWJlcih0aGF0LCBlbWl0dGVyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGUodGhhdCwgcmF3TWVzc2FnZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmKHRoYXQucmF3SGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5yYXdIYW5kbGVyLmNhbGwodGhhdCwgcmF3TWVzc2FnZSkgPT09ICdpZ25vcmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGRlc2VyaWFsaXplKHRoYXQsIHJhd01lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5zZW5kQ29tbWFuZEVycm9ySW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlyZShcImVycm9yXCIsIHttZXNzYWdlOiBcInVucGFyc2FibGVDb21tYW5kXCIsIHJhd01lc3NhZ2U6IHJhd01lc3NhZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlLm1lc3NhZ2UgPT09ICdtYXhNZXNzYWdlU2l6ZUV4Y2VlZGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlyZShcImVycm9yXCIsIHttZXNzYWdlOiBcInVucGFyc2FibGVDb21tYW5kXCIsIHJhd01lc3NhZ2U6IHJhd01lc3NhZ2Uuc2xpY2UoMCwyMDApfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB0aHJvdyBlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGF0LnByZUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoYXQucHJlSGFuZGxlci5jYWxsKHRoYXQsIG1lc3NhZ2UpID09PSAnaWdub3JlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZTAgPSB0eXBlb2YobWVzc2FnZVswXSlcclxuICAgICAgICAgICAgaWYodHlwZTAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvcGVuIGFuZCBjbG9zZSBmaXJlLWFuZC1mb3JnZXQgY29ubmVjdGlvbiBlc3RhYmxpc2htZW50IG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UubGVuZ3RoID09PSAxICYmIG1lc3NhZ2VbMF0gPT09ICdjbG9zZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVtaXQoXCJjbG9zZU1lc3NhZ2VcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29tbWFuZEluZm8gPSB0aGF0LmNvbW1hbmRzW21lc3NhZ2VbMF1dXHJcbiAgICAgICAgICAgICAgICBpZihjb21tYW5kSW5mbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5kZWZhdWx0SGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEhhbmRsZXIuY2FsbCh0aGF0LG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlWzBdID09PSAnZXJyb3InKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVFcnJvckZyb21NZXNzYWdlKG1lc3NhZ2VbMV0sIG1lc3NhZ2VbMl0pXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZVswXSAhPT0gJ2lkRGlzY29udGludWl0eScpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpcmUoJ2Vycm9yJywge21lc3NhZ2U6IFwibm9TdWNoQ29tbWFuZFwiLCBjb21tYW5kOiBtZXNzYWdlWzBdfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY29tbWFuZEluZm8udHlwZSA9PT0gcmVjZWl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2VbMF0gPT09ICdlcnJvcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gW2NyZWF0ZUVycm9yRnJvbU1lc3NhZ2UobWVzc2FnZVsxXSwgbWVzc2FnZVsyXSldXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGdldEFycmF5RGF0YShtZXNzYWdlWzFdKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kSW5mby5oYW5kbGVyLmFwcGx5KHRoYXQsIGRhdGEpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY29tbWFuZEluZm8udHlwZSA9PT0gcmVzcG9uZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IG1lc3NhZ2VbMV1cclxuICAgICAgICAgICAgICAgICAgICBpZighdmFsaWRhdGVJZCh0aGF0LCBpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbW1hbmRTdGF0ZVtpZF0gPSB7Y29tbWFuZDogbWVzc2FnZVswXX1cclxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZEluZm8uaGFuZGxlci5hcHBseSh0aGF0LCBnZXRBcnJheURhdGEobWVzc2FnZVsyXSkuY29uY2F0KFtpZF0pKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGF0LmNvbW1hbmRTdGF0ZVtpZF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZCh0aGF0LCBbaWQscmVzdWx0XSlcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGF0LmNvbW1hbmRTdGF0ZVtpZF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZSBpbnN0YW5jZW9mIFBlZXJFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9ySW5mbyA9IGNyZWF0ZUVycm9ySW5mbyhlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9ySW5mbyA9IFsndW5leHBlY3RlZFBlZXJFcnJvcicsIHt9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmQodGhhdCwgW2lkXS5jb25jYXQoZXJyb3JJbmZvKSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvbW1hbmRJbmZvLnR5cGUgPT09IHN0cmVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IG1lc3NhZ2VbMV1cclxuICAgICAgICAgICAgICAgICAgICBpZighdmFsaWRhdGVJZCh0aGF0LCBpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbWl0dGVyID0gdGhhdC5jb21tYW5kU3RhdGVbaWRdID0gY3JlYXRlU3RyZWFtRW1pdGVyKHRoYXQsaWQpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRJbmZvLmhhbmRsZXIuYXBwbHkodGhhdCwgW2VtaXR0ZXJdLmNvbmNhdChnZXRBcnJheURhdGEobWVzc2FnZVsyXSkpLmNvbmNhdChbaWRdKSlcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGUpIC8vIG5vdGUgdGhhdCBQZWVyRXJyb3Igb2JqZWN0cyBhcmUgdHJlYXRlZCBsaWtlIG5vcm1hbCBFcnJvcnMgaGVyZSAtIHRvIGVtaXQgYW4gZXJyb3IsIHlvdSBtdXN0IGVtaXQgYW4gJ2Vycm9yJyBldmVudCBmcm9tIHRoZSBwYXNzZWQgZW1pdHRlclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBjb21tYW5kIHR5cGU6IFwiK2NvbW1hbmRJbmZvLnR5cGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZTAgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpZighKG1lc3NhZ2VbMF0gaW4gdGhhdC5jb21tYW5kU3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maXJlKFwiZXJyb3JcIiwge21lc3NhZ2U6IFwicnBlcElkTm90Rm91bmRcIiwgaWQ6IG1lc3NhZ2VbMF19KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbmZvID0gdGhhdC5jb21tYW5kU3RhdGVbbWVzc2FnZVswXV1cclxuICAgICAgICAgICAgICAgIGlmKGluZm8gaW5zdGFuY2VvZiBScGVwRHVwbGV4RXZlbnRFbWl0dGVyKSB7IC8vc3RyZWFtXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVtaXR0ZXIgPSBpbmZvXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKG1lc3NhZ2VbMV0pID09PSAnc3RyaW5nJykgeyAgICAgICAgICAvLyBtZXNzYWdlIHdpdGhvdXQgb3JkZXIgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBldmVudCA9IG1lc3NhZ2VbMV0sIGV2ZW50RGF0YSA9IG1lc3NhZ2VbMl1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKG1lc3NhZ2VbMl0pID09PSAnc3RyaW5nJykgeyAgIC8vIG1lc3NhZ2Ugd2l0aCBvcmRlciBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyTnVtYmVyID0gbWVzc2FnZVsxXSwgZXZlbnQgPSBtZXNzYWdlWzJdLCBldmVudERhdGEgPSBtZXNzYWdlWzNdXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVjZWl2ZWQgaW52YWxpZCBzdHJlYW0gbWVzc2FnZTogY291bGRuJ3QgZmluZCBzdHJpbmcgZXZlbnQgbmFtZSBhdCBwb3NpdGlvbiAxIG9yIDIgaW4gdGhlIG1lc3NhZ2VcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50ID09PSAnb3JkZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIub3JkZXJpbmdEYXRhID0gZXZlbnREYXRhID09PSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IGNyZWF0ZUVycm9yRnJvbU1lc3NhZ2UoZXZlbnREYXRhWzBdLCBldmVudERhdGFbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLl9leHRlcm5hbC5lbWl0KCdlcnJvcicsIGVycm9yLCBvcmRlck51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbWl0QXJncyA9IFtldmVudF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50RGF0YSAhPT0gdW5kZWZpbmVkKSBlbWl0QXJncyA9IGVtaXRBcmdzLmNvbmNhdChldmVudERhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvcmRlck51bWJlciAhPT0gdW5kZWZpbmVkKSBlbWl0QXJncy5wdXNoKG9yZGVyTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5fZXh0ZXJuYWwuZW1pdC5hcHBseShlbWl0dGVyLl9leHRlcm5hbCwgZW1pdEFyZ3MpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQgPT09ICdlbmQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5lbmRNZXNzYWdlUmVjZWl2ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZW1pdHRlci5lbmRNZXNzYWdlU2VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhhdC5jb21tYW5kU3RhdGVbbWVzc2FnZVswXV0gLy8gZW5zdXJlcyB0aGF0IFwicnBlcElkTm90Rm91bmRcIiB3aWxsIGJlIHJldHVybmVkIGlmIHRoaXMgc3RyZWFtIGNvbnRpbnVlcyB0byBiZSBjb21tdW5pY2F0ZWQgb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDbGVhbkNsb3NlKHRoYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGluZm8uZiAhPT0gdW5kZWZpbmVkKSB7IC8vIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZVJlc29sdmVyID0gaW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UubGVuZ3RoID09PSAzKSB7IC8vIGVycm9yIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVJlc29sdmVyLnJlamVjdChjcmVhdGVFcnJvckZyb21NZXNzYWdlKG1lc3NhZ2VbMV0sIG1lc3NhZ2VbMl0pKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5vcm1hbCByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVSZXNvbHZlci5yZXNvbHZlKG1lc3NhZ2VbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhhdC5jb21tYW5kU3RhdGVbbWVzc2FnZVswXV1cclxuICAgICAgICAgICAgICAgICAgICBjaGVja0NsZWFuQ2xvc2UodGhhdClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hvdWxkbid0IGdldCBoZXJlIFwiK0pTT04uc3RyaW5naWZ5KGluZm8pKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5zZW5kQ29tbWFuZEVycm9ySW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmlyZShcImVycm9yXCIsIHttZXNzYWdlOiBcImludmFsaWRNZXNzYWdlXCIsIHJhd01lc3NhZ2U6IHJhd01lc3NhZ2Uuc2xpY2UoMCwyMDApfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maXJlKFwiZXJyb3JcIiwge21lc3NhZ2U6IFwiaW52YWxpZE1lc3NhZ2VcIn0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gc2VuZHMgYW4gcnBlcEludmFsaWRJZCBlcnJvciBmaXJlLWFuZC1mb3JnZXQgbWVzc2FnZSBpZiB0aGUgaWQgaXNuJ3QgdmFsaWRcclxuLy8gcmV0dXJucyB0cnVlIGlmIHRoZSBpZCBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlXHJcbmZ1bmN0aW9uIHZhbGlkYXRlSWQodGhhdCwgaWQpIHtcclxuICAgIGlmKGlkID4gdGhhdC5tYXhJZCkge1xyXG4gICAgICAgIHZhciByZWFzb24gPSBcIklkIGdyZWF0ZXIgdGhhbiBcIlxyXG4gICAgICAgIGlmKHRoYXQubWF4SWQgPT09IGRlZmF1bHRNYXhJZCkgcmVhc29uICs9IFwiMl41M1wiXHJcbiAgICAgICAgZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFzb24gKz0gdGhhdC5tYXhJZFxyXG4gICAgfSBlbHNlIGlmKHRoYXQuc2VydmVyKSB7XHJcbiAgICAgICAgaWYoaWQlMiAhPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgcmVhc29uID0gXCJJZCBmcm9tIGNsaWVudCBub3Qgb2RkXCJcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYoaWQlMiAhPT0gMCkge1xyXG4gICAgICAgIHZhciByZWFzb24gPSBcIklkIGZyb20gc2VydmVyIG5vdCBldmVuXCJcclxuICAgIH1cclxuXHJcbiAgICBpZihyZWFzb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoYXQuZmlyZShcImVycm9yXCIsIHttZXNzYWdlOiAncnBlcEludmFsaWRJZCcsIHJlYXNvbjogcmVhc29ufSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxufVxyXG5cclxuXHJcbnZhciBScGVwRHVwbGV4RXZlbnRFbWl0dGVyID0gcHJvdG8oRHVwbGV4RXZlbnRFbWl0dGVyLCBmdW5jdGlvbihzdXBlcmNsYXNzKSB7XHJcbiAgICB0aGlzLm9uID0gZnVuY3Rpb24oZXZlbnQsaGFuZGxlcikge1xyXG4gICAgICAgIGlmKGV2ZW50IGluIHJlc2VydmVkRXZlbnRMaXN0ZW5pbmdFdmVudHMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGxpc3RlbiBvbiB0aGUgJ1wiK2V2ZW50K1wiJyBldmVudCBkaXJlY3RseTsgdGhlICdcIitldmVudCtcIicgZXZlbnQgaXMgcmVzZXJ2ZWQgZm9yIGludGVybmFsIHVzZS5cIilcclxuXHJcbiAgICAgICAgc3VwZXJjbGFzcy5vbi5jYWxsKHRoaXMsIGV2ZW50LGhhbmRsZXIpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbkFueSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgc3VwZXJjbGFzcy5vbkFueS5jYWxsKHRoaXMsIGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICBpZighKGV2ZW50TmFtZSBpbiByZXNlcnZlZEV2ZW50TGlzdGVuaW5nRXZlbnRzKSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG59KSJdfQ==


/***/ }),
/* 37 */
/*!**********************************************************!*\
  !*** ../node_modules/eventemitter2/lib/eventemitter2.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      this._maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;

      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' +
        'leak detected. ' + count + ' listeners added. ' +
        'Use emitter.setMaxListeners() to increase limit.';

    if(this.verboseMemoryLeak){
      errorMsg += ' Event name: ' + eventName + '.';
    }

    if(typeof process !== 'undefined' && process.emitWarning){
      var e = new Error(errorMsg);
      e.name = 'MaxListenersExceededWarning';
      e.emitter = this;
      e.count = count;
      process.emitWarning(e);
    } else {
      console.error(errorMsg);

      if (console.trace){
        console.trace();
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (
            !tree._listeners.warned &&
            this._maxListeners > 0 &&
            tree._listeners.length > this._maxListeners
          ) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    if (n !== undefined) {
      this._maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.event = '';


  EventEmitter.prototype.once = function(event, fn) {
    return this._once(event, fn, false);
  };

  EventEmitter.prototype.prependOnceListener = function(event, fn) {
    return this._once(event, fn, true);
  };

  EventEmitter.prototype._once = function(event, fn, prepend) {
    this._many(event, 1, fn, prepend);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    return this._many(event, ttl, fn, false);
  }

  EventEmitter.prototype.prependMany = function(event, ttl, fn) {
    return this._many(event, ttl, fn, true);
  }

  EventEmitter.prototype._many = function(event, ttl, fn, prepend) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      return fn.apply(this, arguments);
    }

    listener._origin = fn;

    this._on(event, listener, prepend);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) args[j] = arguments[j];
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this, type);
          break;
        case 2:
          handler[i].call(this, type, arguments[1]);
          break;
        case 3:
          handler[i].call(this, type, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this);
          break;
        case 2:
          handler[i].call(this, arguments[1]);
          break;
        case 3:
          handler[i].call(this, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
        if (!this._events.newListener) { return Promise.resolve([false]); }
    }

    var promises= [];

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) args[j] = arguments[j];
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(this._all[i].call(this, type));
          break;
        case 2:
          promises.push(this._all[i].call(this, type, arguments[1]));
          break;
        case 3:
          promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
          break;
        default:
          promises.push(this._all[i].apply(this, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
      case 1:
        promises.push(handler.call(this));
        break;
      case 2:
        promises.push(handler.call(this, arguments[1]));
        break;
      case 3:
        promises.push(handler.call(this, arguments[1], arguments[2]));
        break;
      default:
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      handler = handler.slice();
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler[i].call(this));
          break;
        case 2:
          promises.push(handler[i].call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler[i].call(this, arguments[1], arguments[2]));
          break;
        default:
          promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function(type, listener) {
    return this._on(type, listener, false);
  };

  EventEmitter.prototype.prependListener = function(type, listener) {
    return this._on(type, listener, true);
  };

  EventEmitter.prototype.onAny = function(fn) {
    return this._onAny(fn, false);
  };

  EventEmitter.prototype.prependAny = function(fn) {
    return this._onAny(fn, true);
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype._onAny = function(fn, prepend){
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    if(prepend){
      this._all.unshift(fn);
    }else{
      this._all.push(fn);
    }

    return this;
  }

  EventEmitter.prototype._on = function(type, listener, prepend) {
    if (typeof type === 'function') {
      this._onAny(type, listener);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just add
      if(prepend){
        this._events[type].unshift(listener);
      }else{
        this._events[type].push(listener);
      }

      // Check for listener leak
      if (
        !this._events[type].warned &&
        this._maxListeners > 0 &&
        this._events[type].length > this._maxListeners
      ) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return this;
  }

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }

        this.emit("removeListener", type, listener);

        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }

        this.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if ((obj instanceof Function) || (typeof obj !== "object") || (obj === null))
          continue;
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++)
        this.emit("removeListenerAny", fns[i]);
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.eventNames = function(){
    return Object.keys(this._events);
  }

  EventEmitter.prototype.listenerCount = function(type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (true) {
     // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return EventEmitter;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ 1)))

/***/ }),
/* 38 */
/*!******************************************!*\
  !*** ./node_modules/rpep.client.test.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(/*! ../../utils */ 9)
var seq = __webpack_require__(/*! testUtils */ 14).seq
var rpep = __webpack_require__(/*! ../../rpep */ 36)

// options
    // clientOptions - options to pass into each client.connect in the test
    // rawMessages - An array of 3 elements, where each element is an array with two elements:
        // the first element of each is the string message
        // the second element of each is a function that's passed the resulting raw message, and should return true if it matches what's expected based on the first element
module.exports = function(getTestTransport, testSerialization, options) {
    var lastOptions;
    var nextOptions = function() {
        lastOptions = options.nextClientOptions(lastOptions)
        return lastOptions
    }

    return function() {


        //*

        this.test("connect and close", function() {
            this.test('basic successful connection, closed on connecting end', function(t) {
                this.count(3)

                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    t.ok(conn.connection !== undefined) // just check that its there
                    t.ok(conn.rawConnection !== undefined) // just check that its there
                    conn.on('close', function() {
                        t.ok(true)
                    })
                    conn.close()
                })
            })
            this.test('basic successful connection, closed on listening end', function(t) {
                this.count(2)

                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    t.ok(true)
                    conn.on('close', function() {
                        t.ok(true)
                    })
                })
            })
            this.test('basic connection error(s)', function(t) {
                this.count(1)

                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, options.clientErrorOptions).catch(function(e) {
                    t.eq(e.message, options.clientError)
                })
            })
        })

        this.test("listen and close", function() {
            this.test('basic listen, closed on listening end', function(t) {
                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions())
            })
            this.test('basic listen, closed on connecting end', function(t) {
                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    conn.close()
                })
            })
            this.test('basic listen, rejection', function(t) {
                this.count(1)

                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function() {
                    // t.ok(false)
                }).catch(function(e) {
                    t.ok(e.message.indexOf("Connection couldn\'t be opened") !== -1, e.message)
                })
            })
            this.test('basic listen error', function(t) {
                // no test needed on client end
            })
        })

        this.test("fire and receive", function(t) {
            this.count(9)

            var event = seq(function(eventName, req) {
                t.eq(eventName,'c')
                t.eq(req,undefined)
            },function(eventName, a, b) {
                t.eq(eventName,'d')
                t.eq(a,3)
                t.eq(b,4)
            },function(eventName, e) {
                t.eq(eventName,'client error')
                t.ok(e instanceof Error)
                t.eq(e.message, 'error from server')
            })

            var client = rpep(getTestTransport(), testSerialization)
            client.receive('c', function(req) {
                event('c', req)
                this.fire('a')

            })
            client.receive('d', function(a, b) {
                event('d', a, b)
                this.fire('b', 5)
            })
            client.receive('error', function(e) {
                event('client error', e)

                var error = new Error("error from client")
                error.someData = 'client data'
                this.fire('error', error)
            })

            client.connect.apply(client, nextOptions()).then(function(conn) {
                t.ok(true)
            })
        })

        this.test("request/response", function(t) {
            this.test("basic request/response", function(t) {
                this.count(19)

                var event = seq(function(eventName, result) {
                    t.eq(eventName,'a result')
                    t.eq(result,1)
                },function(eventName, e) {
                    t.eq(eventName,'b error')
                    t.ok(e instanceof Error)
                    t.eq(e.message, "b error")
                },function(eventName, one,two,id) {
                    t.eq(eventName,'d')
                    t.eq(one,'yo')
                    t.eq(two,'boy')
                    t.eq(id,0)
                },function(eventName, id) {
                    t.eq(eventName,'e')
                    t.eq(id, 2)
                },function(eventName, id) {
                    t.eq(eventName,'f')
                    t.eq(id, 4)
                },function(eventName, e) {
                    t.eq(eventName,'client error')
                    t.ok(e instanceof Error)
                    t.eq(e.message, "f error")
                },function(eventName, e) {
                    t.eq(eventName,'c error')
                    t.ok(e instanceof Error)
                    t.eq(e.message, "unexpectedPeerError")
                })


                var client = rpep(getTestTransport(), testSerialization)
                client.respond('d', function(one,two, id) {   // return promise value
                    event('d', one,two,id)
                    return new Promise(function(resolve) {
                        resolve(3)
                    })
                })
                client.respond('e', function(id) {   // return normal error
                    event('e', id)

                    throw new rpep.PeerError("e error")
                })
                client.respond('f', function(req) {   // fail on thrown error (non-PeerError)
                    event('f', req)

                    throw new Error("f error")
                })

                client.connect.apply(client, nextOptions()).then(function(conn) {
                    conn.on('error', function(e) {
                        event('client error', e)
                    })

                    return conn.request("a").then(function(result) {
                        event('a result', result)
                        return conn.request('b', "hi")
                    }).catch(function(e) {
                        event('b error', e)
                        return conn.request('c', 99, 'bwak')
                    }).catch(function(e) {
                        event('c error', e)
                        conn.close()
                    })
                })
            })

            this.test("multiple outstanding calls to the same request", function(t) {
                this.count(2)

                var client = rpep(getTestTransport(), testSerialization)

                client.connect.apply(client, nextOptions()).then(function(conn) {
                    var one = conn.request("a")
                    var two = conn.request("a")

                    one.then(function(n) {
                        t.eq(n,0)
                    })
                    two.then(function(n) {
                        t.eq(n,1)
                    })

                    conn.fire('b')

                    conn.close()
                })
            })

            this.test('id discontinuity', function(t) {
                var client = rpep(getTestTransport(), testSerialization, {maxId: 4})
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    return conn.request('a').then(function() {
                        return conn.request('a')
                    }).then(function() {
                        return conn.request('a')
                    }).then(function() {
                        conn.close()
                    })
                })
            })
        })

        this.test("event streams", function(t) {
            this.test('basic event streams', function(t) {
                this.count(24)

                var event = seq(function(eventName, args) {
                    t.eq(eventName,'client one')
                    t.eq(args.length,0)
                },function(eventName, args) {
                    t.eq(eventName,'client two')
                    t.eq(args[0], 2)
                },function(eventName, args) {
                    t.eq(eventName,'client three')
                    t.eq(args[0], 3)
                    t.eq(args[1], 4)
                },function(eventName, args) {
                    t.eq(eventName,'client error')
                    t.eq(args[0].message, 'wut up')
                },function(eventName) {
                    t.eq(eventName,'client end')
                },function(eventName, one, two, id) {        // server-started event-stream
                    t.eq(eventName,'client b')
                    t.eq(one,'one')
                    t.eq(two,'two')
                    t.eq(id,0)
                },function(eventName, x,y) {
                    t.eq(eventName,'client two2')
                    t.eq(x,'x')
                    t.eq(y,'y')
                },function(eventName) {
                    t.eq(eventName,'client sendError2')
                },function(eventName) {
                    t.eq(eventName,'client doError2')
                },function(eventName, e) {
                    t.eq(eventName,'client error')
                    t.eq(e.message, "oh noz")
                },function(eventName, a, b) {
                    t.eq(eventName,'client end2')
                    t.eq(a, 5)
                    t.eq(b, 6)
                })


                var client = rpep(getTestTransport(), testSerialization)
                client.stream('b', function(stream, one,two, id) {   // return promise value
                    event('client b', one,two,id)
                    stream.emit('one')

                    stream.on('two', function(a, b) {
                        event('client two2', a,b)
                        stream.emit('two', 2)
                        stream.emit('three', 3, 4)
                    })
                    stream.on('sendError', function() {
                        event('client sendError2')
                        stream.emit('error', new Error("whats up"))
                    })
                    stream.on('end', function(a, b) {
                        event('client end2', a, b)
                        stream.emit('end')
                    })
                    stream.on('doError', function() {
                        event('client doError2')
                        throw new Error("oh noz")
                    })
                })

                client.connect.apply(client, nextOptions()).then(function(conn) {
                    conn.on('error', function(e) {
                        event('client error', e)
                    })

                    var stream = conn.streamConnect('a')
                    stream.onAny(function(eventName, args) {
                        var args = Array.prototype.slice.call(arguments,1)
                        event('client '+eventName, args)

                        if(eventName === 'one') {
                            stream.emit('two', 'a','b')
                        } else if(eventName === 'two') {
                            // nothing
                        } else if(eventName === 'three') {
                            stream.emit('sendError')
                        } else if(eventName === 'error') {
                            stream.emit('sendEnd')
                        } else if(eventName === 'end') {
                            stream.emit('end')
                        }
                    })
                })
            })

            this.test("multiple outstanding streams of the same command", function(t) {
                this.count(4)

                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    var stream1 = conn.streamConnect('a', 1)
                    var stream2 = conn.streamConnect('a', 2)

                    stream1.on('hi', function(x) {
                        t.eq(x,1)
                    })
                    stream1.on('end', function() {
                        t.ok(true)
                    })
                    stream2.on('hi', function(x) {
                        t.eq(x,2)
                    })
                    stream2.on('end', function() {
                        t.ok(true)
                    })

                    stream1.emit('x')
                    stream2.emit('x')

                    stream1.emit('end')
                    stream2.emit('end')
                })
            })

            this.test('event order numbers and order number discontinuity', function(t) {
                this.count(10)

                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    var stream1 = conn.streamConnect('a', 1)

                    stream1.on('hi', function() {
                        if(arguments.length === 1) {
                            t.eq(arguments[0],0) // order number
                        } else if(arguments.length === 2) {
                            t.eq(arguments[0],'a')
                            t.eq(arguments[1],1) // order number
                        } else if(arguments.length === 3) {
                            t.eq(arguments[0],'b')
                            t.eq(arguments[1],'c')
                            t.eq(arguments[2],2) // order number
                        }
                    })
                    stream1.on('orderNumberDiscontinuity', function(prevId, nextId, orderNumber) {
                        t.eq(prevId, 2)
                        t.eq(nextId, 0)
                        t.eq(orderNumber, 0)
                    })
                    stream1.on('end', function() {
                        t.ok(true)
                    })

                    stream1.emit('order', true)
                    stream1.emit('x')
                    stream1.emit('x', 'a')
                    stream1.emit('x', 'b', 'c')

                    stream1.emit('end')
                })
            })
        })

        this.test('sessionData', function(t) {
            var options = nextOptions()
            var client1 = rpep(getTestTransport(), testSerialization)
            client1.connect.apply(client1, options).then(function(conn) {
                conn.fire('a')
                conn.request('b').then(function() {
                    var s = conn.streamConnect('c')
                    s.on('end', function() {
                        s.emit('end')
                        conn.fire('d')
                    })
                })
            })

            // ensure you can have multiple concurrent connections
            var client2 = rpep(getTestTransport(), testSerialization)
            client2.connect.apply(client2, options).then(function(conn) {
                conn.fire('a')
                conn.request('b').then(function() {
                    var s = conn.streamConnect('c')
                    s.on('end', function() {
                        s.emit('end')
                        conn.fire('d')
                    })
                })
            })
        })

        this.test("rawHandle, preHandle, and default", function(t) {
            var client = rpep(getTestTransport(), testSerialization)
            client.connect.apply(client, nextOptions()).then(function(conn) {
                conn.fire(options.rawMessages[0].message)
                conn.fire(options.rawMessages[1].message)
                conn.fire(options.rawMessages[2].message)
            })
        })
                
        this.test('default error handlers', function() {
            this.test("no 'error' receive handler", function(t) {
                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    conn.fire('error', new Error("unhandled error"))
                })
            })
            this.test("no 'error' event handler", function(t) {
                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    var s = conn.streamConnect('a')
                    s.emit('error', new Error("unhandled error"))
                })
            })
        })

        if(options.clientNoOnClose) {
            this.test("close messages for transports that don't have onClose handlers", function(t) {
                var testTransportCopy = {}, testTransport = getTestTransport()
                for(var k in getTestTransport()) {
                    testTransportCopy[k] = testTransport[k]
                }
                delete testTransportCopy.onClose

                var client = rpep(testTransportCopy, testSerialization)
                client.preHandle(function(c) {
                    t.ok(false) // shouldn't get called
                })
                client.connect.apply(client, options.clientNoOnClose).then(function(conn) {
                    conn.close()
                })
            })
        }

        if(options.testAcceptParameters) {
            this.test("test that you can pass transport-specific accept parameters", function(t) {
                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    conn.close()
                })
            })
            this.test("test that you can pass transport-specific reject parameters", function(t) {
                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).catch(function(e) {
                    // this is expected - ignore it
                })
            })
        }

        this.test('errors', function(t) {
            this.test("basic errors", function(t) {
                this.count(9)

                var client = rpep(getTestTransport(), testSerialization), send
                client.connect.apply(client,nextOptions()).then(function(conn) {
                    var event = seq(function(eventName,e) {
                        t.eq(eventName, 'error')
                        t.eq(e.message, 'noSuchCommand')
                        t.eq(e.command, 'nonexistent')
                    },function(eventName,e) {
                        t.eq(eventName, 'error')
                        t.eq(e.message, 'noSuchCommand')
                        t.eq(e.command, 'nonexistent')
                    },function(eventName,e) {
                        t.eq(eventName, 'error')
                        t.eq(e.message, 'noSuchCommand')
                        t.eq(e.command, 'nonexistent')

                        conn.fire('endTest')
                    })

                    conn.on('error', function(e) {
                        event('error',e)
                    })

                    conn.fire('nonexistent')
                    conn.request('nonexistent').then(function() {
                        t.ok(false) // won't get here
                    }).catch(function(e) {
                        t.ok(false) // won't get here
                    })
                    var stream = conn.streamConnect('nonexistent')
                    stream.on('error', function() {
                        t.ok(false) // won't get here
                    })
                })
            })

            this.test("invalidId error", function(t) {
                this.count(2)

                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    conn.on('error', function(e) {
                        t.eq(e.message, 'rpepInvalidId')
                        t.eq(e.reason, 'Id from client not odd')
                    })

                    // should produce invalidId
                    conn.connection.send(testSerialization.serialize(['a',46]))
                    conn.fire('endTest')
                })
            })

            this.test("ensure no events can be emitted after sending 'end'", function(t) {
                this.count(1)

                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    var stream = conn.streamConnect('a')
                    stream.emit('end')
                    try {
                        stream.emit('somethingElse')
                    } catch(e) {
                        t.eq(e.message, "Stream 'end' event has been sent, can't send more events.")
                    }
                })
            })

            this.test("ensure no events can be received after receiving and sending 'end'", function(t) {
                this.count(1)

                var client = rpep(getTestTransport(), testSerialization)
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    var stream = conn.streamConnect('a')
                    stream.emit('end')
                    stream.onAny(function(eventName) {
                        t.eq(eventName, 'end')
                    })
                })
            })

            this.test("closeTimeout", function(t) {
                this.count(1)

                var client = rpep(getTestTransport(), testSerialization, {closeTimeout:500})
                client.respond('x', function() {
                    return utils.resolver().f // will never resolve
                })
                client.connect.apply(client, nextOptions()).then(function(conn) {
                    conn.request('a')
                    var stream1 = conn.streamConnect('b')
                    var stream2 = conn.streamConnect('c')
                    var stream3 = conn.streamConnect('b')

                    stream1.emit('end')

                    conn.on('error', function(e) {
                        t.log(e.message)
                        t.eq(e.message, "Connection has been closed after a 500ms timeout and some pending requests and streams remain unfulfilled. "+
                                        "The following requests and streams were still active up until the timeout:\n"+
                                        "* Response 0 for 'x'\n"+
                                        "* Request 1 to 'a'\n"+
                                        "* Stream 3 'b' waiting for other side to 'end'\n"+
                                        "* Stream 5 'c' has received 'end' but hasn't sent 'end'\n"+
                                        "* Stream 7 'b' is still active"
                        )
                    })

                    conn.close()
                })
            })
        })

        //*/
    }

}

/***/ }),
/* 39 */
/*!**************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/encode.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// encode.js

exports.encode = encode;

var EncodeBuffer = __webpack_require__(/*! ./encode-buffer */ 40).EncodeBuffer;

function encode(input, options) {
  var encoder = new EncodeBuffer(options);
  encoder.write(input);
  return encoder.read();
}


/***/ }),
/* 40 */
/*!*********************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/encode-buffer.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// encode-buffer.js

exports.EncodeBuffer = EncodeBuffer;

var preset = __webpack_require__(/*! ./write-core */ 15).preset;

var FlexEncoder = __webpack_require__(/*! ./flex-buffer */ 43).FlexEncoder;

FlexEncoder.mixin(EncodeBuffer.prototype);

function EncodeBuffer(options) {
  if (!(this instanceof EncodeBuffer)) return new EncodeBuffer(options);

  if (options) {
    this.options = options;
    if (options.codec) {
      var codec = this.codec = options.codec;
      if (codec.bufferish) this.bufferish = codec.bufferish;
    }
  }
}

EncodeBuffer.prototype.codec = preset;

EncodeBuffer.prototype.write = function(input) {
  this.codec.encode(this, input);
};


/***/ }),
/* 41 */
/*!***************************************!*\
  !*** ../node_modules/buffer/index.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 102)
var ieee754 = __webpack_require__(/*! ieee754 */ 17)
var isArray = __webpack_require__(/*! isarray */ 10)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 6)))

/***/ }),
/* 42 */
/*!*******************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/write-uint8.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// write-unit8.js

var constant = exports.uint8 = new Array(256);

for (var i = 0x00; i <= 0xFF; i++) {
  constant[i] = write0(i);
}

function write0(type) {
  return function(encoder) {
    var offset = encoder.reserve(1);
    encoder.buffer[offset] = type;
  };
}


/***/ }),
/* 43 */
/*!*******************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/flex-buffer.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// flex-buffer.js

exports.FlexDecoder = FlexDecoder;
exports.FlexEncoder = FlexEncoder;

var Bufferish = __webpack_require__(/*! ./bufferish */ 0);

var MIN_BUFFER_SIZE = 2048;
var MAX_BUFFER_SIZE = 65536;
var BUFFER_SHORTAGE = "BUFFER_SHORTAGE";

function FlexDecoder() {
  if (!(this instanceof FlexDecoder)) return new FlexDecoder();
}

function FlexEncoder() {
  if (!(this instanceof FlexEncoder)) return new FlexEncoder();
}

FlexDecoder.mixin = mixinFactory(getDecoderMethods());
FlexDecoder.mixin(FlexDecoder.prototype);

FlexEncoder.mixin = mixinFactory(getEncoderMethods());
FlexEncoder.mixin(FlexEncoder.prototype);

function getDecoderMethods() {
  return {
    bufferish: Bufferish,
    write: write,
    fetch: fetch,
    flush: flush,
    push: push,
    pull: pull,
    read: read,
    reserve: reserve,
    offset: 0
  };

  function write(chunk) {
    var prev = this.offset ? Bufferish.prototype.slice.call(this.buffer, this.offset) : this.buffer;
    this.buffer = prev ? (chunk ? this.bufferish.concat([prev, chunk]) : prev) : chunk;
    this.offset = 0;
  }

  function flush() {
    while (this.offset < this.buffer.length) {
      var start = this.offset;
      var value;
      try {
        value = this.fetch();
      } catch (e) {
        if (e && e.message != BUFFER_SHORTAGE) throw e;
        // rollback
        this.offset = start;
        break;
      }
      this.push(value);
    }
  }

  function reserve(length) {
    var start = this.offset;
    var end = start + length;
    if (end > this.buffer.length) throw new Error(BUFFER_SHORTAGE);
    this.offset = end;
    return start;
  }
}

function getEncoderMethods() {
  return {
    bufferish: Bufferish,
    write: write,
    fetch: fetch,
    flush: flush,
    push: push,
    pull: pull,
    read: read,
    reserve: reserve,
    send: send,
    maxBufferSize: MAX_BUFFER_SIZE,
    minBufferSize: MIN_BUFFER_SIZE,
    offset: 0,
    start: 0
  };

  function fetch() {
    var start = this.start;
    if (start < this.offset) {
      var end = this.start = this.offset;
      return Bufferish.prototype.slice.call(this.buffer, start, end);
    }
  }

  function flush() {
    while (this.start < this.offset) {
      var value = this.fetch();
      if (value) this.push(value);
    }
  }

  function pull() {
    var buffers = this.buffers || (this.buffers = []);
    var chunk = buffers.length > 1 ? this.bufferish.concat(buffers) : buffers[0];
    buffers.length = 0; // buffer exhausted
    return chunk;
  }

  function reserve(length) {
    var req = length | 0;

    if (this.buffer) {
      var size = this.buffer.length;
      var start = this.offset | 0;
      var end = start + req;

      // is it long enough?
      if (end < size) {
        this.offset = end;
        return start;
      }

      // flush current buffer
      this.flush();

      // resize it to 2x current length
      length = Math.max(length, Math.min(size * 2, this.maxBufferSize));
    }

    // minimum buffer size
    length = Math.max(length, this.minBufferSize);

    // allocate new buffer
    this.buffer = this.bufferish.alloc(length);
    this.start = 0;
    this.offset = req;
    return 0;
  }

  function send(buffer) {
    var length = buffer.length;
    if (length > this.minBufferSize) {
      this.flush();
      this.push(buffer);
    } else {
      var offset = this.reserve(length);
      Bufferish.prototype.copy.call(buffer, this.buffer, offset);
    }
  }
}

// common methods

function write() {
  throw new Error("method not implemented: write()");
}

function fetch() {
  throw new Error("method not implemented: fetch()");
}

function read() {
  var length = this.buffers && this.buffers.length;

  // fetch the first result
  if (!length) return this.fetch();

  // flush current buffer
  this.flush();

  // read from the results
  return this.pull();
}

function push(chunk) {
  var buffers = this.buffers || (this.buffers = []);
  buffers.push(chunk);
}

function pull() {
  var buffers = this.buffers || (this.buffers = []);
  return buffers.shift();
}

function mixinFactory(source) {
  return mixin;

  function mixin(target) {
    for (var key in source) {
      target[key] = source[key];
    }
    return target;
  }
}


/***/ }),
/* 44 */
/*!**************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/decode.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// decode.js

exports.decode = decode;

var DecodeBuffer = __webpack_require__(/*! ./decode-buffer */ 45).DecodeBuffer;

function decode(input, options) {
  var decoder = new DecodeBuffer(options);
  decoder.write(input);
  return decoder.read();
}

/***/ }),
/* 45 */
/*!*********************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/decode-buffer.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// decode-buffer.js

exports.DecodeBuffer = DecodeBuffer;

var preset = __webpack_require__(/*! ./read-core */ 20).preset;

var FlexDecoder = __webpack_require__(/*! ./flex-buffer */ 43).FlexDecoder;

FlexDecoder.mixin(DecodeBuffer.prototype);

function DecodeBuffer(options) {
  if (!(this instanceof DecodeBuffer)) return new DecodeBuffer(options);

  if (options) {
    this.options = options;
    if (options.codec) {
      var codec = this.codec = options.codec;
      if (codec.bufferish) this.bufferish = codec.bufferish;
    }
  }
}

DecodeBuffer.prototype.codec = preset;

DecodeBuffer.prototype.fetch = function() {
  return this.codec.decode(this);
};


/***/ }),
/* 46 */
/*!*******************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/read-format.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// read-format.js

var ieee754 = __webpack_require__(/*! ieee754 */ 17);
var Int64Buffer = __webpack_require__(/*! int64-buffer */ 19);
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

exports.getReadFormat = getReadFormat;
exports.readUint8 = uint8;

var Bufferish = __webpack_require__(/*! ./bufferish */ 0);
var BufferProto = __webpack_require__(/*! ./bufferish-proto */ 18);

var HAS_MAP = ("undefined" !== typeof Map);
var NO_ASSERT = true;

function getReadFormat(options) {
  var binarraybuffer = Bufferish.hasArrayBuffer && options && options.binarraybuffer;
  var int64 = options && options.int64;
  var usemap = HAS_MAP && options && options.usemap;

  var readFormat = {
    map: (usemap ? map_to_map : map_to_obj),
    array: array,
    str: str,
    bin: (binarraybuffer ? bin_arraybuffer : bin_buffer),
    ext: ext,
    uint8: uint8,
    uint16: uint16,
    uint32: uint32,
    uint64: read(8, int64 ? readUInt64BE_int64 : readUInt64BE),
    int8: int8,
    int16: int16,
    int32: int32,
    int64: read(8, int64 ? readInt64BE_int64 : readInt64BE),
    float32: read(4, readFloatBE),
    float64: read(8, readDoubleBE)
  };

  return readFormat;
}

function map_to_obj(decoder, len) {
  var value = {};
  var i;
  var k = new Array(len);
  var v = new Array(len);

  var decode = decoder.codec.decode;
  for (i = 0; i < len; i++) {
    k[i] = decode(decoder);
    v[i] = decode(decoder);
  }
  for (i = 0; i < len; i++) {
    value[k[i]] = v[i];
  }
  return value;
}

function map_to_map(decoder, len) {
  var value = new Map();
  var i;
  var k = new Array(len);
  var v = new Array(len);

  var decode = decoder.codec.decode;
  for (i = 0; i < len; i++) {
    k[i] = decode(decoder);
    v[i] = decode(decoder);
  }
  for (i = 0; i < len; i++) {
    value.set(k[i], v[i]);
  }
  return value;
}

function array(decoder, len) {
  var value = new Array(len);
  var decode = decoder.codec.decode;
  for (var i = 0; i < len; i++) {
    value[i] = decode(decoder);
  }
  return value;
}

function str(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  return BufferProto.toString.call(decoder.buffer, "utf-8", start, end);
}

function bin_buffer(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return Bufferish.from(buf);
}

function bin_arraybuffer(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return Bufferish.Uint8Array.from(buf).buffer;
}

function ext(decoder, len) {
  var start = decoder.reserve(len+1);
  var type = decoder.buffer[start++];
  var end = start + len;
  var unpack = decoder.codec.getExtUnpacker(type);
  if (!unpack) throw new Error("Invalid ext type: " + (type ? ("0x" + type.toString(16)) : type));
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return unpack(buf);
}

function uint8(decoder) {
  var start = decoder.reserve(1);
  return decoder.buffer[start];
}

function int8(decoder) {
  var start = decoder.reserve(1);
  var value = decoder.buffer[start];
  return (value & 0x80) ? value - 0x100 : value;
}

function uint16(decoder) {
  var start = decoder.reserve(2);
  var buffer = decoder.buffer;
  return (buffer[start++] << 8) | buffer[start];
}

function int16(decoder) {
  var start = decoder.reserve(2);
  var buffer = decoder.buffer;
  var value = (buffer[start++] << 8) | buffer[start];
  return (value & 0x8000) ? value - 0x10000 : value;
}

function uint32(decoder) {
  var start = decoder.reserve(4);
  var buffer = decoder.buffer;
  return (buffer[start++] * 16777216) + (buffer[start++] << 16) + (buffer[start++] << 8) + buffer[start];
}

function int32(decoder) {
  var start = decoder.reserve(4);
  var buffer = decoder.buffer;
  return (buffer[start++] << 24) | (buffer[start++] << 16) | (buffer[start++] << 8) | buffer[start];
}

function read(len, method) {
  return function(decoder) {
    var start = decoder.reserve(len);
    return method.call(decoder.buffer, start, NO_ASSERT);
  };
}

function readUInt64BE(start) {
  return new Uint64BE(this, start).toNumber();
}

function readInt64BE(start) {
  return new Int64BE(this, start).toNumber();
}

function readUInt64BE_int64(start) {
  return new Uint64BE(this, start);
}

function readInt64BE_int64(start) {
  return new Int64BE(this, start);
}

function readFloatBE(start) {
  return ieee754.read(this, start, false, 23, 4);
}

function readDoubleBE(start) {
  return ieee754.read(this, start, false, 52, 8);
}

/***/ }),
/* 47 */
/*!************************************************!*\
  !*** ../node_modules/event-lite/event-lite.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * event-lite.js - Light-weight EventEmitter (less than 1KB when gzipped)
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @constructor
 * @see https://github.com/kawanet/event-lite
 * @see http://kawanet.github.io/event-lite/EventLite.html
 * @example
 * var EventLite = require("event-lite");
 *
 * function MyClass() {...}             // your class
 *
 * EventLite.mixin(MyClass.prototype);  // import event methods
 *
 * var obj = new MyClass();
 * obj.on("foo", function() {...});     // add event listener
 * obj.once("bar", function() {...});   // add one-time event listener
 * obj.emit("foo");                     // dispatch event
 * obj.emit("bar");                     // dispatch another event
 * obj.off("foo");                      // remove event listener
 */

function EventLite() {
  if (!(this instanceof EventLite)) return new EventLite();
}

(function(EventLite) {
  // export the class for node.js
  if (true) module.exports = EventLite;

  // property name to hold listeners
  var LISTENERS = "listeners";

  // methods to export
  var methods = {
    on: on,
    once: once,
    off: off,
    emit: emit
  };

  // mixin to self
  mixin(EventLite.prototype);

  // export mixin function
  EventLite.mixin = mixin;

  /**
   * Import on(), once(), off() and emit() methods into target object.
   *
   * @function EventLite.mixin
   * @param target {Prototype}
   */

  function mixin(target) {
    for (var key in methods) {
      target[key] = methods[key];
    }
    return target;
  }

  /**
   * Add an event listener.
   *
   * @function EventLite.prototype.on
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

  function on(type, func) {
    getListeners(this, type).push(func);
    return this;
  }

  /**
   * Add one-time event listener.
   *
   * @function EventLite.prototype.once
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

  function once(type, func) {
    var that = this;
    wrap.originalListener = func;
    getListeners(that, type).push(wrap);
    return that;

    function wrap() {
      off.call(that, type, wrap);
      func.apply(this, arguments);
    }
  }

  /**
   * Remove an event listener.
   *
   * @function EventLite.prototype.off
   * @param [type] {string}
   * @param [func] {Function}
   * @returns {EventLite} Self for method chaining
   */

  function off(type, func) {
    var that = this;
    var listners;
    if (!arguments.length) {
      delete that[LISTENERS];
    } else if (!func) {
      listners = that[LISTENERS];
      if (listners) {
        delete listners[type];
        if (!Object.keys(listners).length) return off.call(that);
      }
    } else {
      listners = getListeners(that, type, true);
      if (listners) {
        listners = listners.filter(ne);
        if (!listners.length) return off.call(that, type);
        that[LISTENERS][type] = listners;
      }
    }
    return that;

    function ne(test) {
      return test !== func && test.originalListener !== func;
    }
  }

  /**
   * Dispatch (trigger) an event.
   *
   * @function EventLite.prototype.emit
   * @param type {string}
   * @param [value] {*}
   * @returns {boolean} True when a listener received the event
   */

  function emit(type, value) {
    var that = this;
    var listeners = getListeners(that, type, true);
    if (!listeners) return false;
    var arglen = arguments.length;
    if (arglen === 1) {
      listeners.forEach(zeroarg);
    } else if (arglen === 2) {
      listeners.forEach(onearg);
    } else {
      var args = Array.prototype.slice.call(arguments, 1);
      listeners.forEach(moreargs);
    }
    return !!listeners.length;

    function zeroarg(func) {
      func.call(that);
    }

    function onearg(func) {
      func.call(that, value);
    }

    function moreargs(func) {
      func.apply(that, args);
    }
  }

  /**
   * @ignore
   */

  function getListeners(that, type, readonly) {
    if (readonly && !that[LISTENERS]) return;
    var listeners = that[LISTENERS] || (that[LISTENERS] = {});
    return listeners[type] || (listeners[type] = []);
  }

})(EventLite);


/***/ }),
/* 48 */
/*!*************************!*\
  !*** ./test.browser.js ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Unit = __webpack_require__(/*! deadunit/deadunit.browser */ 49);
var resultsDiv = document.getElementById("results");
Unit.test("Browser Rpep Tests", function (t) {
    this.timeout(20 * 1000);
    t.test("websocket.transport.browser", __webpack_require__(/*! websocket.transport.browser.test */ 94));
}).writeHtml(resultsDiv);


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFx0ZXN0XFx0ZXN0LmJyb3dzZXIuanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBRUEsR0FBQSxDQUFJLE9BQU8sT0FBQSxDQUFRO0FBRW5CLEdBQUEsQ0FBSSxhQUFhLFFBQUEsQ0FBUyxjQUFULENBQXdCO0FBRXpDLElBQUEsQ0FBSyxJQUFMLENBQVUsc0JBQXNCLFVBQVMsR0FBRztJQUN4QyxJQUFBLENBQUssT0FBTCxDQUFhLEVBQUEsQ0FBQSxDQUFBLENBQUc7SUFFaEIsQ0FBQSxDQUFFLElBQUYsQ0FBTywrQkFBK0IsT0FBQSxDQUFRO0FBQ2xELEVBSkEsQ0FJRyxTQUpILENBSWE7QUFWYiIsImZpbGUiOiJEOlxcYmlsbHlzRmlsZVxcY29kZVxcamF2YXNjcmlwdFxcbW9kdWxlc1xccnBlcC5qc1xcdGVzdFxcdGVzdC5icm93c2VyLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIFVuaXQgPSByZXF1aXJlKCdkZWFkdW5pdC9kZWFkdW5pdC5icm93c2VyJylcclxuXHJcbnZhciByZXN1bHRzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRzXCIpXHJcblxyXG5Vbml0LnRlc3QoXCJCcm93c2VyIFJwZXAgVGVzdHNcIiwgZnVuY3Rpb24odCkge1xyXG4gICAgdGhpcy50aW1lb3V0KDIwKjEwMDApIC8vIG5vdCBlbnRpcmVseSBzdXJlIHdoeSBpIGhhdmUgdG8gbWFrZSB0aGlzIHNvIGhpZ2ggZm9yIHRoZSB0ZXN0IHRvIG5vdCB0aW1lb3V0XHJcbiAgICBcclxuICAgIHQudGVzdChcIndlYnNvY2tldC50cmFuc3BvcnQuYnJvd3NlclwiLCByZXF1aXJlKCd3ZWJzb2NrZXQudHJhbnNwb3J0LmJyb3dzZXIudGVzdCcpKVxyXG59KS53cml0ZUh0bWwocmVzdWx0c0RpdikiXX0=


/***/ }),
/* 49 */
/*!****************************************************!*\
  !*** ../node_modules/deadunit/deadunit.browser.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2014 Billy Tetrud - Free to use for any purpose: MIT License*/

var Future = __webpack_require__(/*! async-future */ 5)
var proto = __webpack_require__(/*! proto */ 22)
var defaultFormats = __webpack_require__(/*! ./defaultFormats */ 23)

var Container = __webpack_require__(/*! blocks.js/Container */ 54)
var OriginalText = __webpack_require__(/*! blocks.js/Text */ 62)
var Block = __webpack_require__(/*! blocks.js/Block */ 64)
Block.dev = true
var Style = __webpack_require__(/*! blocks.js/Style */ 65)

var deadunitInternal = __webpack_require__(/*! ./deadunit.internal */ 66)
var utils = __webpack_require__(/*! ./utils */ 25)


module.exports = deadunitInternal({
    deadunitCore: __webpack_require__(/*! deadunit-core/src/deadunitCore.browser */ 67),

    environmentSpecificMethods: function() {
        var red = 'rgb(200,30,30)'

        var warningWritten = false
        function warnAboutLateEvents(domNode) {
            if(!warningWritten) {
                append(domNode, "Test results were accessed before asynchronous parts of tests were fully complete.", {style: "color: red;"})
                warningWritten = true
            }
        }

        function writeLateEvent(written, ended, domNode, event, manager) {
            if(ended) {
                written.then(function() {
                    warnAboutLateEvents(domNode)
                    append(domNode, JSON.stringify(event), {style: "color: red;"})
                })
            }
        }

        // writes html on the current (browser) page
        this.writeHtml = function(domNode) {
            if(domNode === undefined) domNode = document.body

            var f = new Future, groups = {}, ended = false, mainGroup, lateEventsWarningPrinted=false;
            this.events({
                group: function(groupStartEvent) {
                    if(groupStartEvent.parent === undefined) {
                        var group = mainGroup = MainGroup(groupStartEvent.name, groupStartEvent.time)
                        domNode.appendChild(mainGroup.domNode)

                    } else {
                        var group = Group(mainGroup, groupStartEvent.name, groupStartEvent.time, groups[groupStartEvent.parent])
                        group.parentGroup.addSubGroup(group)
                    }

                    groups[groupStartEvent.id] = group
                    lateEventCheck()
                },
                count: function(e) {
                    groups[e.parent].addExpectedCount(e.expected, Count(e.sourceLines, e.file, e.line, e.column, ended, e.expected))
                    lateEventCheck()
                },
                assert: function(e) {
                    groups[e.parent].addAssert(Assert(e.sourceLines, e.file, e.line, e.column, ended, e.expected, e.actual, e.success))
                    lateEventCheck()
                },
                exception: function(exceptionEvent) {
                    groups[exceptionEvent.parent].addException(Exception(exceptionEvent.error, ended))
                    lateEventCheck()
                },
                log: function(logEvent) {
                    groups[logEvent.parent].results.add(Log(logEvent.values, ended))
                    lateEventCheck()
                },
                groupEnd: function(groupEvent) {
                    var group = groups[groupEvent.id]
                    group.end(groupEvent.time, ended)

                    if(group.parentGroup !== undefined && group.state.subject.success) {
                        group.parentGroup.title.passed++
                        group.parentGroup.updateTitle()
                    }

                    lateEventCheck()
                },
                end: function(endEvent) {
                    mainGroup.endTest(endEvent.type, endEvent.time)
                    ended = true
                    f.return()
                }
            })
            return f

            // if late is true, prints out the late event warning, unless it's already been printed
            function lateEventCheck() {
                if(ended && !lateEventsWarningPrinted) {
                    mainGroup.add(Text('lateEventsWarning', "Warning: some events happened after the test ended."))
                    lateEventsWarningPrinted = true
                }
            }
        }

    }
})

function append(domNode, content, attributes) {
    if(domNode.setAttributeNode === undefined || domNode.appendChild === undefined)
        console.log("Object that is not a dom node passed to 'append' (jquery objects aren't supported anymore): "+domNode)
    if(attributes ===  undefined) attributes = {}

    /*var div = document.createElement('div')
        div.innerHTML = content
    for(var attribute in attributes) {
        var a = document.createAttribute(attribute)
            a.nodeValue = attributes[attribute]
        domNode.setAttributeNode(a);
    }

    domNode.appendChild(div)
    */
    $(domNode).append(content)
}

var color = defaultFormats.htmlColors

document.body.style.backgroundColor = color.black
var mainGroupStyle = Style({
    color: color.white,
    marginTop: 10,

    Text: {
        $mainTitle:{
            cursor: 'pointer',
            color: color.brightBlue,
            fontSize: 28,
            fontWeight: 'bold',
            margin: '9px 0'
        },
        $timeout: {
            color: color.red
        },
        $lateEventsWarning: {
            color: color.yellow
        }
    },

    Container:{$results:{
        $state: function(state) {
            if(state.success) {
                if(state.late) {
                    var borderColor = color.darkYellow
                } else {
                    var borderColor = color.green
                }
            } else {
                var borderColor = color.red
            }

            return Style({
                border: '1px solid '+borderColor,
                display: 'block',
                padding: 5
            })
        }
    }},

    MainBar: {
        $state: function(state) {
            if(state.success) {
                if(state.late) {
                    var borderColor = color.darkYellow
                } else {
                    var borderColor = color.green
                }
            } else {
                var borderColor = color.red
            }

            return Style({
                cursor: 'pointer',
                border: "2px solid "+borderColor,
                display: 'block',
                padding: 1,
            })
        },


        Container: {
            $inner: {
                $state: function(state) {
                    if(state.success) {
                        if(state.late) {
                            var backgroundColor = color.darkYellow
                        } else {
                            var backgroundColor = color.green
                        }
                    } else {
                        var backgroundColor = color.red
                    }

                    return Style({
                        backgroundColor: backgroundColor,
                        display: "block",
                        padding: "1px 3px",
                    })
                },

                Text: {
                    color: color.white,
                    $title: {
                        color: color.brightBlue
                    }
                }
            },
            $passes: {
                Text: {color: color.brightGreen}
            },
            $failures: {
                Text: {color: color.darkRed}
            },
            $exceptions: {
                Text: {color: color.brightPurple}
            },
            $clickText: {
                float: 'right',
                Text: {fontStyle: 'italic'}
            }
        },
    },

    Group: {
        padding: 1,
        margin: '8px 0',

        GroupTitle: {
            $state: function(state) {
                if(state.success) {
                    var textColor = color.brightGreen
                    if(state.late) {
                        var backgroundColor = color.darkYellow
                    } else {
                        var backgroundColor = color.green
                    }
                } else {
                    var textColor = color.white
                    var backgroundColor = color.red
                }

                return Style({
                    backgroundColor: backgroundColor,
                    color: textColor,
                    paddingLeft: 3,
                    cursor: 'pointer'
                })
            },

            Text: {
                $timeElapsed: {
                    color: color.gray
                }
            }
        },
    },

    ResultLine: {
        $state: function(state) {
            if(!state.success) {
                var textColor = color.red
            } else if(state.late) {
                var textColor = color.yellow
            } else {
                var textColor = color.green
            }

            return Style({color: textColor})
        },

        Container: {
            $location: {
                Text: {
                    color: color.gray,
                    $line: {
                        color: color.white
                    }
                }
            },
            $expectedAndActual: {
                Text: {
                    color: color.gray,
                    $actual: {
                        color: color.white
                    },
                    $expected: {
                        color: color.white
                    }
                }
            }
        }
    },

    Exception: {
        color: color.purple
    },
    Log: {
        Text: {
            display: 'block'
        }
    }
})



// a Block on its own line
var Line = proto(Block, function() {
    this.name = "Line"
    this.defaultStyle = Style({
        display: 'block'
    })
})

var Group = proto(Line, function() {
    this.name = "Group"

    this.build = function(mainGroup, groupTitle, time, parentGroup) {
        this.mainGroup = mainGroup
        this.results = Container('results')
        this.parentGroup = parentGroup

        this.add(this.results)
        this.createTitleBar(groupTitle)
        this.startTime = time
        this.count = 0

        this.title.on('click', function() {
            this.results.visible = !this.results.visible
        }.bind(this))
    }

    this.createTitleBar = function(groupTitle) {
        this.title = GroupTitle(groupTitle)
        this.addAt(0, this.title)
    }

    this.addExpectedCount = function(expected, countBlock) {
        this.expected = expected
        this.countBlock = countBlock
        this.countBlock.count = this.count
        this.results.addAt(0, countBlock)
        this.title.total++

        updateCountSuccess(this)   // must be run before updateTitle (because it modifies info updateTitle relies on)
        this.updateTitle()
    }

    this.addAssert = function(assertBlock) {
        this.results.add(assertBlock)
        this.count++
        if(this.countBlock !== undefined)
            this.countBlock.count = this.count

        this.title.total++
        if(assertBlock.state.subject.success) {
            this.title.passed++
            this.mainGroup.title.testTotalPasses++
        } else {
            this.mainGroup.title.testTotalFailures++
        }

        updateCountSuccess(this)   // must be run before updateTitle (because it modifies info updateTitle relies on)
        this.updateTitle()
    }

    this.addException = function(exceptionBlock) {
        this.results.add(exceptionBlock)
        this.title.exceptions++
        this.mainGroup.title.testTotalExceptions++

        this.updateTitle()
    }

    this.addSubGroup = function(groupBlock) {
        this.results.add(groupBlock)
        this.count++
        if(this.countBlock !== undefined)
            this.countBlock.count = this.count

        this.title.total++

        updateCountSuccess(this)   // must be run before updateTitle (because it modifies info updateTitle relies on)
        this.updateTitle()
    }

    this.end = function(time) {
        //updateCountSuccess(this, true) // must be run before groupEnded is set (because it relies on groupEnded being false at this point)
        if(this.expected !== undefined && !(this.count === this.expected)) this.mainGroup.title.testTotalFailures++

        this.groupEnded = true
        this.updateTitle()
        if(!(this instanceof MainGroup)) {
            this.title.add(Text('timeElapsed', ' took '+(time - this.startTime)+'ms'))
        }
    }

    this.updateTitle = function() {
        var success = this.title.passed === this.title.total && this.title.exceptions === 0
                      && (this !== this.mainGroup || this.title.testTotalFailures === 0 && this.title.testTotalExceptions === 0)

        this.results.visible = !success
        var parts = [this,this.results,this.title]// things to set success on (since $state styling is currently so limited, you have to set it on everything that needs a style)
        if(this instanceof MainGroup) {
            parts.push(this.title.inner)
        }

        var ended = this.mainGroup.ended
        parts.forEach(function(block) {
            block.state.set("success", success)
            block.state.set("late", ended)
        })

        if(this.parentGroup !== undefined) this.parentGroup.updateTitle()
    }
})

// figure out if count succeeded and update the main group and the countblock state
function updateCountSuccess(that) {
    if(that.expected !== undefined) {
        var countSuccess = that.count === that.expected
        that.countBlock.state.set("success", countSuccess)
        if(that.groupEnded) that.countBlock.results.state.set("late", true)

        if(countSuccess) {
            that.mainGroup.title.testTotalPasses++
            that.title.passed++
            if(that.groupEnded) {
                that.mainGroup.title.testTotalFailures--
                that.groupEndCountSubtracted = true // marks that failures were subtracted after the test finished (so successes can be later subtracted correctly if need be)
            }
        } else if(that.groupEndCountSubtracted || that.count - 1 === that.expected) {
            that.title.passed--
            that.mainGroup.title.testTotalPasses--
            if(that.groupEnded) {
                that.mainGroup.title.testTotalFailures++
            }
        }
    }
}

var MainGroup = proto(Group, function(superclass) {
    this.name = "MainGroup"

    this.createTitleBar = function(groupTitle) {
        this.title = MainBar(groupTitle)
        this.add(this.title)
    }

    this.build = function(groupTitle, time) {
        superclass.build.call(this, this,groupTitle,time)
        this.style = mainGroupStyle

        var mainTitle = Text('mainTitle', groupTitle)
        this.addAt(0, mainTitle)
        this.add(this.pendingText=Text("Pending..."))

        mainTitle.on('click', function() {
            this.results.visible = !this.results.visible
        }.bind(this))
    }

    this.endTest = function(type, time) {
        if(type === 'timeout')
            this.add(Text('timeout', "The test timed out!"))

        this.pendingText.visible = false
        this.updateTitle()
        this.testTotalTime = getTimeDisplay(time - this.startTime)
        this.title.takenText.text = "Took "
        this.ended = true
    }
})



var Text = proto(OriginalText, function() { // doing this cause i'm to lazy to update blocks.js right now
    this.defaultStyle = Style({
        whiteSpace: 'pre-wrap'
    })
})


var GroupTitle = proto(Line, function() {
    this.name = "GroupTitle"

    this.build = function(title) {
        this.totalNode = Text('0')
        this.passedNode = Text('0')
        this.exceptionsNode = Text('0')


        if(title !== undefined) {
            this.add(Text(title+":       "))
        }

        this.add(this.passedNode, Text('/'), this.totalNode, Text(' and '), this.exceptionsNode, Text(" exceptions "))
    }

    ;['total','passed','exceptions'].forEach(function(property) {
        Object.defineProperty(this, property, {
            get: function() {  return parseInt(this[property+"Node"].text)},
            set: function(v) {
                this[property+"Node"].text = v
                if(property === 'total' && this.totalPlural) {
                    if(v == 1) this.totalPlural.visible = false
                    else       this.totalPlural.visible = true
                }
            }
        })
    }.bind(this))
})

var MainBar = proto(GroupTitle, function() {
    this.name = "MainBar"

    /*override*/ this.build = function(title) {
        this.totalNode = Text('0'); this.totalPlural = Text('s')
        this.passedNode = Text('0')
        this.exceptionsNode = Text('0')  // unused, but needed to match the interface of GroupTitle

        this.testTotalPassesNode = Text('0'); this.testTotalPassesPlural = Text('es')
        this.testTotalFailuresNode = Text('0'); this.testTotalFailuresPlural = Text('s')
        this.testTotalExceptionsNode = Text('0'); this.testTotalExceptionsPlural = Text('s')
        this.testTotalTimeNode = Text('0')

        // used temporarily to approximate the time when counting up on-the-fly
        // will be replaced by the time coming from deadunitCore's events at the end
        this.temporaryStartTime = Date.now()

        this.inner = Container('inner', []) // outer used for styling)
        this.add(this.inner)

        if(title !== undefined) {
            this.inner.add(Text('title', title), Text(' - '))
        }

        this.inner.add(
            this.passedNode, Text('/'), this.totalNode, Text(' successful test'),this.totalPlural,Text('. '),
            Container('passes', this.testTotalPassesNode, Text(" pass"), this.testTotalPassesPlural), Text(", "),
            Container('failures', this.testTotalFailuresNode, Text(" failure"),this.testTotalFailuresPlural), Text(", and "),
            Container('exceptions', this.testTotalExceptionsNode, Text(" exception"), this.testTotalExceptionsPlural), Text(". "),
            Container('time', this.takenText=Text("Has taken "), this.testTotalTimeNode, Text(".")),
            Container('clickText', Text("click on this bar"))
        )
    }

    ;['testTotalPasses','testTotalFailures','testTotalExceptions','testTotalTime'].forEach(function(property) {
        Object.defineProperty(this, property, {
            get: function() {  return parseInt(this[property+"Node"].text)},
            set: function(v) {
                this[property+"Node"].text = v

                if(property!=='testTotalTime') {
                    this.testTotalTime = getTimeDisplay(Date.now() - this.temporaryStartTime)

                    if(v == 1) this[property+'Plural'].visible = false
                    else        this[property+'Plural'].visible = true
                }
            }
        })
    }.bind(this))
})


// a line of result text
var ResultLine = proto(Line, function() {
    this.name = "ResultLine"

    this.build = function(resultText, sourceLines, file, line, column, expected, actual) {
        this.resultTextNode = Text(resultText)
        var location = Container('location',[Text("["+file+' '), Text('line',line), Text(":"+column+'] ')])
        this.add(this.resultTextNode, location, Text(sourceLines))

        this.expectedAndActual = Container('expectedAndActual')
        this.add(this.expectedAndActual)

        if(expected !== undefined) {
            this.expectedAndActual.add(Text(" Expected "), Text('expected', utils.valueToMessage(expected)))
        }
        if(actual !== undefined) {
            if(expected !== undefined)
                this.expectedAndActual.add(Text(","))

            this.got = Text("actual", utils.valueToMessage(actual))
            this.expectedAndActual.add(Text(" Got "), this.got)
        }
    }
})


var Assert = proto(Line, function() {
    this.name = "Assert"

    this.successText = "Ok! "
    this.failText = "Fail: "

    this.build = function(sourceLines, file, line, column, late, expected, actual, success) {
        var text = success?this.successText:this.failText

        this.results = ResultLine(text, sourceLines, file, line, column, expected, actual)
        this.add(this.results)

        var that = this
        this.state.on('change', function() {
            that.results.expectedAndActual.visible = !that.state.subject.success
        })

        this.state.set("success", success)
        this.results.state.set("success", success)
        if(late) this.results.state.set("late", true)
    }
})

var Exception = proto(Line, function() {
    this.name = "Exception"

    this.build = function(error, late) {
        if(late) this.state.set("late", true)

        var exceptionText = Text(utils.errorToString(error))
        this.add(exceptionText)
    }
})

var Count = proto(Assert, function(superclass) {
    this.name = "Count"

    this.build = function(sourceLines, file, line, column, late, expected) {
        superclass.build.call(this, sourceLines, file, line, column, late, expected, 0, false)
        this.expected = expected
    }

    Object.defineProperty(this, 'count', {
        get: function() {
            return this.results.got.text
        }, set: function(count) {
            this.results.got.text = count
            if(count === this.expected) {
                this.results.resultTextNode.text = this.successText
            } else {
                this.results.resultTextNode.text = this.failText
            }

            this.results.state.set("success", count === this.expected)
        }
    })
})

var Log = proto(Line, function() {
    this.name = "Log"

    this.build = function(values, late) {
        if(late) this.state.set("late", true)

        values.forEach(function(v) {
            this.add(Text(utils.valueToString(v)))
        }.bind(this))

    }
})

function getTimeDisplay(milliseconds) {
    if(milliseconds > 1000) {
        return Math.floor(milliseconds/1000)+'s'
    } else {
        return milliseconds+'ms'
    }
}


/***/ }),
/* 50 */
/*!******************************************!*\
  !*** ../node_modules/deadunit/indent.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


module.exports = function(i, str) {
    return i+str.split("\n")       // get all lines
              .join("\n"+i)      // join all lines with an indent
}

/***/ }),
/* 51 */
/*!************************************!*\
  !*** ../node_modules/util/util.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ 52);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ 53);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 6), __webpack_require__(/*! ./../process/browser.js */ 1)))

/***/ }),
/* 52 */
/*!*******************************************************!*\
  !*** ../node_modules/util/support/isBufferBrowser.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 53 */
/*!**********************************************************************!*\
  !*** ../node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 54 */
/*!********************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/Container.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// This file just contains a proxies to the actual source file, so that you can access standard blocks via require('blocks/Container')
module.exports = __webpack_require__(/*! ./src/node_modules/Components/Container */ 55)

/***/ }),
/* 55 */
/*!************************************************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/src/node_modules/Components/Container.js ***!
  \************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Block = __webpack_require__(/*! ../Block */ 12)
var proto = __webpack_require__(/*! proto */ 2)

module.exports = proto(Block, function(superclass) {

	// static properties

    this.name = 'Container'


	// instance properties

	this.init = function (/*[label,] content*/) {
        if(typeof(arguments[0]) !== 'string') {
            var contentArgs = arguments
        } else {
            var label = arguments[0]
            var contentArgs = Array.prototype.slice.call(arguments, 1)
        }

        superclass.init.call(this) // superclass constructor

        this.label = label

		if(contentArgs !== undefined)
            this.add.apply(this,contentArgs)
	}
})


/***/ }),
/* 56 */
/*!*****************************************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/src/node_modules/EventEmitterB.js ***!
  \*****************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events */ 26).EventEmitter
var proto = __webpack_require__(/*! proto */ 2)
var utils = __webpack_require__(/*! utils */ 7)

module.exports = proto(EventEmitter, function(superclass) {

    this.init = function() {
        superclass.apply(this, arguments)

        this.ifonHandlers = {}
        this.ifoffHandlers = {}
        this.ifonAllHandlers = []
        this.ifoffAllHandlers = []
    }

    // callback will be triggered immediately if there is already a listener attached, or
    // callback will be triggered when the first listener for the event is added
    // (regardless of whether its done through on or once)
    // parameters can be:
        // event, callback - attach an ifon handler for the passed event
        // callback - attach an ifon handler for all events
    this.ifon = function(event, callback) {
        if(event instanceof Function) {     // event not passed, only a callback
            callback = event // fix the argument
            for(var eventName in this._events) {
                if(this.listeners(eventName).length > 0) {
                    callback(eventName)
                }
            }
        } else if(this.listeners(event).length > 0) {
            callback(event)
        }

        addHandlerToList(this, 'ifonHandlers', event, callback)
    }

    // removes either:
        // removeIfon() - all ifon handlers (if no arguments are passed), or
        // removeIfon(event) - all ifon handlers for the passed event, or
        // removeIfon(callback) - the passed ifon-all handler (if the first parameter is the callback)
        // removeIfon(event, callback) - the specific passed callback for the passed event
    this.removeIfon = function(event, callback) {
        removeFromHandlerList(this, 'ifonHandlers', event, callback)
    }

    // callback will be triggered when the last listener for the 'click' event is removed (will not trigger immediately if there is no event listeners on call of ifoff)
    // (regardless of whether this is done through removeListener or as a result of 'once' being fulfilled)
    // parameters can be:
        // event, callback - attach an ifoff handler for the passed event
        // callback - attach an ifoff handler for all events
    this.ifoff = function(event, callback) {
        addHandlerToList(this, 'ifoffHandlers', event, callback)
    }

    // removes either:
        // removeIfoff() - all ifoff handlers (if no arguments are passed), or
        // removeIfoff(event) - all ifoff handlers for the passed event, or
        // removeIfoff(callback) - the passed ifoff-all handler (if the first parameter is the callback)
        // removeIfoff(event, callback) - the specific passed callback for the passed event
    this.removeIfoff = function(event, callback) {
        removeFromHandlerList(this, 'ifoffHandlers', event, callback)
    }

    // emitter is the emitter to proxy handler binding to
    // options can have one of the following properties:
        // only - an array of events to proxy
        // except - an array of events to *not* proxy
    this.proxy = function(emitter, options) {
        if(options === undefined) options = {}
        if(options.except !== undefined) {
            var except = utils.arrayToMap(options.except)
            var handleIt = function(event){return !(event in except)}
        } else if(options.only !== undefined) {
            var only = utils.arrayToMap(options.only)
            var handleIt = function(event){return event in only}
        } else {
            var handleIt = function(){return true}
        }

        var that = this, handler;
        this.ifon(function(event) {
            if(handleIt(event)) {
                emitter.on(event, handler = function() {
                    that.emit.apply(that, [event].concat(Array.prototype.slice.call(arguments)))
                })
            }
        })
        this.ifoff(function(event) {
            if(handleIt(event))
                emitter.off(event, handler)
        })
    }

    /*override*/ this.on = this.addListener = function(event, callback) {
        var triggerIfOn = this.listeners(event).length === 0
        superclass.prototype.on.apply(this,arguments)
        if(triggerIfOn) triggerIfHandlers(this, 'ifonHandlers', event)
    }

    /*override*/ this.off = this.removeListener = function(event, callback) {
        var triggerIfOff = this.listeners(event).length === 1
        superclass.prototype.removeListener.apply(this,arguments)
        if(triggerIfOff) triggerIfHandlers(this, 'ifoffHandlers', event)
    }
    /*override*/ this.removeAllListeners = function(event) {
        var triggerIfOffForEvents = []
        if(event !== undefined) {
            if(this.listeners(event).length > 0) {
                triggerIfOffForEvents.push(event)
            }
        } else {
            for(var event in this._events) {
                if(this.listeners(event).length > 0) {
                    triggerIfOffForEvents.push(event)
                }
            }
        }

        superclass.prototype.removeAllListeners.apply(this,arguments)

        for(var n=0; n<triggerIfOffForEvents.length; n++) {
            triggerIfHandlers(this, 'ifoffHandlers', triggerIfOffForEvents[n])
        }
    }

})


// triggers the if handlers from the normal list and the "all" list
function triggerIfHandlers(that, handlerListName, event) {
    triggerIfHandlerList(that[handlerListName][event], event)
    triggerIfHandlerList(that[normalHandlerToAllHandlerProperty(handlerListName)], event)
}


// triggers the if handlers from a specific list
// ya these names are confusing, sorry : (
function triggerIfHandlerList(handlerList, event) {
    if(handlerList !== undefined) {
        for(var n=0; n<handlerList.length; n++) {
            handlerList[n](event)
        }
    }
}

function addHandlerToList(that, handlerListName, event, callback) {
    if(event instanceof Function) {
        // correct arguments
        callback = event
        event = undefined
    }

    if(event !== undefined && callback !== undefined) {
        var handlerList = that[handlerListName][event]
        if(handlerList === undefined) {
            handlerList = that[handlerListName][event] = []
        }

        handlerList.push(callback)
    } else {
        that[normalHandlerToAllHandlerProperty(handlerListName)].push(callback)
    }
}

function removeFromHandlerList(that, handlerListName, event, callback) {
    if(event instanceof Function) {
        // correct arguments
        callback = event
        event = undefined
    }

    if(event !== undefined && callback !== undefined) {
        removeCallbackFromList(that[handlerListName][event], callback)
    } else if(event !== undefined) {
        delete that[handlerListName][event]
    } else if(callback !== undefined) {
        var allHandlerListName = normalHandlerToAllHandlerProperty(handlerListName)
        removeCallbackFromList(that[allHandlerListName], callback)
    } else {
        var allHandlerListName = normalHandlerToAllHandlerProperty(handlerListName)
        that[handlerListName] = {}
        that[allHandlerListName] = []
    }
}

function normalHandlerToAllHandlerProperty(handlerListName) {
    if(handlerListName === 'ifonHandlers')
        return 'ifonAllHandlers'
    if(handlerListName === 'ifoffHandlers')
        return 'ifoffAllHandlers'
}

function removeCallbackFromList(list, callback) {
    var index = list.indexOf(callback)
    list.splice(index,1)
}

/***/ }),
/* 57 */
/*!****************************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/trimArguments/trimArguments.js ***!
  \****************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// resolves varargs variable into more usable form
// args - should be a function arguments variable
// returns a javascript Array object of arguments that doesn't count trailing undefined values in the length
module.exports = function(theArguments) {
    var args = Array.prototype.slice.call(theArguments, 0)

    var count = 0;
    for(var n=args.length-1; n>=0; n--) {
        if(args[n] === undefined)
            count++
        else
            break
    }
    args.splice(args.length-count, count)
    return args
}

/***/ }),
/* 58 */
/*!******************************************!*\
  !*** ../node_modules/observe/observe.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var proto = __webpack_require__(/*! proto */ 13)
var EventEmitter = __webpack_require__(/*! events */ 26).EventEmitter
var utils = __webpack_require__(/*! ./utils */ 59)


// emits the event:
    // change - the event data is an object of one of the following forms:
        // {data:_, type: 'set', property: propertyList}
        // {data:_, type: 'added', property: propertyList, index:_, count: numberOfElementsAdded}
        // {data:_, type: 'removed', property: propertyList, index:_, removed: removedValues}
var Observe = module.exports = proto(EventEmitter, function(superclass) {

    // static members

    this.init = function(obj) {
        this.subject = obj
        this.internalChangeListeners = []

        this.setMaxListeners(1000)
    }

    // instance members

    // gets an element or member of the subject and returns another Observee
    // changes to the returned Observee will be emitted by its parent as well
    this.get = function(property) {
        return ObserveeChild(this, parsePropertyList(property))
    }

    // sets a value on the subject
    // property - either an array of members to select, or a string where properties to select are separated by dots
    // value - the value to set
    this.set = function(property, value) {
        setInternal(this, parsePropertyList(property), value, {})
    }

    // pushes a value onto a list
    this.push = function(/*value...*/) {
        pushInternal(this, [], arguments, {})
    }

    this.pop = function() {
        var elements = spliceInternal(this, [], [this.subject.length-1,1], {})
        return elements[0]
    }

    this.unshift = function(/*value...*/) {
        spliceInternal(this, [], [0,0].concat(Array.prototype.slice.call(arguments, 0)), {})
    }
    this.shift = function() {
        var elements = spliceInternal(this, [], [0,1], {})
        return elements[0]
    }

    this.reverse = function() {
        this.subject.reverse()
        this.emit('change', {
            type:'set', property: []
        })
    }

    this.sort = function() {
        this.subject.sort.apply(this.subject, arguments)
        this.emit('change', {
            type:'set', property: []
        })
    }

    // index is the index to remove/insert at
    // countToRemove is the number to remove
    // elementsToAdd is a list of elements to add
    this.splice = function(/*index, countToRemove[, elementsToAdd]*/) {
        return spliceInternal(this, [], arguments, {})
    }

    // use this instead of concat for mutation behavior
    this.append = function(arrayToAppend) {
        appendInternal(this, [], arguments, {})
    }

    this.data = this.id = function(data) {
        return ObserveeChild(this, [], {data: data})
    }

    /*override*/ this.emit = function(type) {
        if(type === 'change') {
            var args = Array.prototype.slice.call(arguments, 1)
            this.internalChangeListeners.forEach(function(handler) {
                handler.apply(this, args)
            }.bind(this))
        }
        superclass.prototype.emit.apply(this, arguments)
    }

    // For the returned object, any property added via set, push, splice, or append joins an internal observee together with this observee, so that
    //      the internal observee and the containing observee will both send 'change' events appropriately
    // collapse - (default: false) if true, any property added will be set to the subject of the value added (so that value won't be an observee anymore
        // note: only use collapse:true if the observees you're unioning isn't actually an object that inherits from an observee - any instance methods on the observee that come from child classes won't be accessible anymore
        // e.g. var x = observe({a:5})
        //      var b = observe({})
        //      x.subject.a === 5    ;; true
        //      b.union(true).set('x', x)
        //      b.subject.x.a === 5            ;; true
        //      b.subject.x.subject.a === 5    ;; false
    this.union = function(collapse) {
        if(collapse === undefined) collapse = false
        return ObserveeChild(this, [], {union: collapse})
    }


    /* pause and unpause may cause weird affects in certain cases (e.g. if you remove an element at index 4 and *then* add an element at index 2)
    // pause sending events (for when you want to do a lot of things to an object)
    this.pause = function() {
        this.paused = true
    }
    this.unpause = function() {
        this.paused = undefined
        sendEvent(this)
    }*/

    // private

    this.onChangeInternal = function(handler) {
        this.internalChangeListeners.push(handler)
    }
    this.offChangeInternal = function(handler) {
        var index = this.internalChangeListeners.indexOf(handler)
        this.internalChangeListeners.splice(index,1)
    }
})


function parsePropertyList(property) {
    if(!(property instanceof Array)) {
        property = property.toString().split('.')
    }

    return property
}

function getPropertyPointer(subject, propertyList) {
    var current = subject
    for(var n=0; n<propertyList.length-1; n++) {
        current = current[propertyList[n]]
    }

    return {obj: current, key:propertyList[n]}
}

var getPropertyValue = module.exports.getPropertyValue = function(subject, property) {
    var pointer = getPropertyPointer(subject, property)
    if(pointer.key !== undefined) {
        return pointer.obj[pointer.key]
    } else {
        return pointer.obj
    }
}

// private

// options can have the properties:
    // union - if true, any value set, pushed, appended, or spliced onto the observee is unioned
var ObserveeChild = proto(EventEmitter, function() {

    this.init = function(parent, propertyList, options) {
        if(options === undefined) this.options = {}
        else                      this.options = options

        if(parent._observeeParent !== undefined)
            this._observeeParent = parent._observeeParent
        else
            this._observeeParent = parent

        this.property = propertyList
        this.subject = getPropertyValue(parent.subject, propertyList)

        var that = this, changeHandler
        parent.onChangeInternal(changeHandler=function(change) {
            var answers = changeQuestions(that.property, change, that.options.union)

            if(answers.isWithin) {
                if(change.type === 'set' && change.property.length <= that.property.length && that.options.union === undefined) { // if the subject may have been replaced with a new subject
                    var pointer = getPropertyPointer(parent.subject, propertyList)
                    if(pointer.obj !== undefined) {
                        if(pointer.key !== undefined) {
                            that.subject =pointer.obj[pointer.key]
                        } else {
                            that.subject =pointer.obj
                        }
                    }
                }

                that.emit('change', {
                    type:change.type, property: change.property.slice(that.property.length),
                    index:change.index, count:change.count, removed: change.removed, data: change.data
                })
            } else if(answers.couldRelocate) {
                if(change.type === 'removed') {
                    var relevantIndex = that.property[change.property.length]
                    var lastRemovedIndex = change.index + change.removed.length - 1
                    if(lastRemovedIndex < relevantIndex) {
                        that.property[change.property.length] = relevantIndex - change.removed.length // change the propertyList to match the new index
                    } else if(lastRemovedIndex === relevantIndex) {
                        parent.offChangeInternal(changeHandler)
                    }
                } else if(change.type === 'added') {
                    var relevantIndex = parseInt(that.property[change.property.length])
                    if(change.index <= relevantIndex) {
                        that.property[change.property.length] = relevantIndex + change.count // change the propertyList to match the new index
                    }
                } else if(change.type === 'set') {
                    parent.offChangeInternal(changeHandler)
                }
            }
        })
    }

    this.get = function(property) {
        return this._observeeParent.get(this.property.concat(parsePropertyList(property)))
    }

    this.set = function(property, value) {
        setInternal(this._observeeParent, this.property.concat(parsePropertyList(property)), value, this.options)
    }

    this.push = function(/*values...*/) {
        pushInternal(this._observeeParent, this.property, arguments, this.options)
    }
    this.pop = function() {
        var elements = spliceInternal(this._observeeParent, this.property, [this.subject.length-1,1], this.options)
        return elements[0]
    }

    this.unshift = function(/*value...*/) {
        spliceInternal(this._observeeParent, this.property, [0,0].concat(Array.prototype.slice.call(arguments,0)), this.options)
    }
    this.shift = function() {
        var elements = spliceInternal(this._observeeParent, this.property, [0,1], this.options)
        return elements[0]
    }

    this.splice = function(index, countToRemove/*[, elementsToAdd....]*/) {
        return spliceInternal(this._observeeParent, this.property, arguments, this.options)
    }

    this.reverse = function() {
        this.subject.reverse()
        this.emit('change', {
            type:'set', property: []
        })
    }

    this.sort = function() {
        this.subject.sort.apply(this.subject, arguments)
        this.emit('change', {
            type:'set', property: []
        })
    }

    this.append = function(/*[property,] arrayToAppend*/) {
        appendInternal(this._observeeParent, this.property, arguments, this.options)
    }

    this.data = this.id = function(data) {
        return ObserveeChild(this._observeeParent, this.property, utils.merge({}, this.options, {data: data}))
    }

    this.union = function(collapse) {
        if(collapse === undefined) collapse = false
        return ObserveeChild(this, [], utils.merge({}, this.options, {union: collapse}))
    }

})



// that - the Observee object
function setInternal(that, propertyList, value, options) {
    if(propertyList.length === 0) throw new Error("You can't set at the top-level, setting like that only works for ObserveeChild (sub-observees created with 'get')")

    var pointer = getPropertyPointer(that.subject, propertyList)

    var internalObservee = value
    if(options.union === true) {
        value = value.subject
    }

    pointer.obj[pointer.key] = value

    var event = {type: 'set', property: propertyList}
    if(options.data !== undefined) event.data = event.id = options.data
    that.emit('change',event)

    if(options.union !== undefined)
        unionizeEvents(that, internalObservee, propertyList, options.union)
}

function pushInternal(that, propertyList, args, options) {
    var array = getPropertyValue(that.subject, propertyList)
    var originalLength = array.length
    array.push.apply(array, args)

    var internalObservees = unionizeList(array, originalLength, args.length, options.union)

    var event = {type: 'added', property: propertyList, index: originalLength, count: args.length}
    if(options.data !== undefined) event.data = event.id = options.data
    that.emit('change', event)

    unionizeListEvents(that, internalObservees, propertyList, options.union)
}

function spliceInternal(that, propertyList, args, options) {
    var index = args[0]
    var countToRemove = args[1]

    var array = getPropertyValue(that.subject, propertyList)
    var result = array.splice.apply(array, args)

    if(countToRemove > 0) {
        var event = {type: 'removed', property: propertyList, index: index, removed: result}
        if(options.data !== undefined) event.data = event.id = options.data
        that.emit('change', event)
    }
    if(args.length > 2) {
        var event = {type: 'added', property: propertyList, index: index, count: args.length-2}

        var internalObservees = unionizeList(array, index, event.count, options.union)

        if(options.data !== undefined) event.data = event.id = options.data
        that.emit('change', event)

        unionizeListEvents(that, internalObservees, propertyList, options.union)
    }

    return result
}

// note: I'm not using splice to do this as an optimization (because otherwise the property list would have to be parsed twice and the value gotten twice) - maybe this optimization wasn't worth it but its already done
function appendInternal(that, propertyList, args, options) {
    var arrayToAppend = args[0]
    if(arrayToAppend.length === 0) return; //nothing to do

    var array = getPropertyValue(that.subject, propertyList)
    var originalLength = array.length

    var spliceArgs = [originalLength, 0]
    spliceArgs = spliceArgs.concat(arrayToAppend)
    var oldLength = array.length
    array.splice.apply(array, spliceArgs)

    var internalObservees = unionizeList(array, oldLength, array.length, options.union)

    var event = {type: 'added', property: propertyList, index: originalLength, count: arrayToAppend.length}
    if(options.data !== undefined) event.data = event.id = options.data
    that.emit('change', event)

    unionizeListEvents(that, internalObservees, propertyList, options.union)
}

// sets a slice of elements to their subjects and
// returns the original observee objects along with their indexes
function unionizeList(array, start, count, union) {
    var internalObservees = [] // list of observees and their property path
    if(union !== undefined) {
        var afterEnd = start+count
        for(var n=start; n<afterEnd; n++) {
            internalObservees.push({obj: array[n], index: n})
            if(union === true)
                array[n] = array[n].subject
        }
    }

    return internalObservees
}

// runs unionizeEvents for elements in a list
// internalObservees should be the result from `unionizeList`
function unionizeListEvents(that, internalObservees, propertyList, collapse) {
    for(var n=0; n<internalObservees.length; n++) {
        unionizeEvents(that, internalObservees[n].obj, propertyList.concat(internalObservees[n].index+''), collapse)
    }
}


// sets up the union change events for an observee with one of its inner properties
// parameters:
    // that - the container observee
    // innerObservee - the contained observee
    // propertyList - the propertyList to unionize
    // collapse - the union option (true for collapse)
function unionizeEvents(that, innerObservee, propertyList, collapse) {
    var propertyListDepth = propertyList.length

    if(innerObservee.on === undefined || innerObservee.emit === undefined || innerObservee.removeListener === undefined || innerObservee.set === undefined) {
        throw new Error("Attempting to union a value that isn't an observee")
    }

    var innerChangeHandler, containerChangeHandler
    var ignorableContainerEvents = [], ignorableInnerEvents = []
    innerObservee.on('change', innerChangeHandler = function(change) {
        if(ignorableInnerEvents.indexOf(change) === -1) {        // don't run this for events generated by the union event handlers
            if(collapse) {
                var property = propertyList.concat(change.property)
            } else {
                var property = propertyList.concat(['subject']).concat(change.property)
            }

            var containerChange = utils.merge({}, change, {property: property})
            ignorableContainerEvents.push(containerChange)
            that.emit('change', containerChange)
        }
    })
    that.onChangeInternal(containerChangeHandler = function(change) {
        var changedPropertyDepth = change.property.length

        if(collapse) {
            var propertyListToAskFor = propertyList
        } else {
            var propertyListToAskFor = propertyList.concat(['subject'])
        }

        var answers = changeQuestions(propertyListToAskFor, change, true)
        var changeIsWithinInnerProperty = answers.isWithin
        var changeCouldRelocateInnerProperty = answers.couldRelocate

        if(changeIsWithinInnerProperty && ignorableContainerEvents.indexOf(change) === -1) {   // don't run this for events generated by the union event handlers
            if(collapse) {
                var property = change.property.slice(propertyListDepth)
            } else {
                var property = change.property.slice(propertyListDepth+1) // +1 for the 'subject'
            }

            var innerObserveeEvent = utils.merge({}, change, {property: property})
            ignorableInnerEvents.push(innerObserveeEvent)
            innerObservee.emit('change', innerObserveeEvent)
        } else if(changeCouldRelocateInnerProperty) {
            if(change.type === 'set' /*&& changedPropertyDepth <= propertyListDepth  - this part already done above*/) {
                removeUnion()
            } else if(change.type === 'removed') {
                var relevantIndex = propertyList[change.property.length]
                var removedIndexesContainsIndexOfInnerObservee = change.index <= relevantIndex && relevantIndex <= change.index + change.removed.length - 1
                var removedIndexesAreBeforeIndexOfInnerObservee = change.index + change.removed.length - 1 < relevantIndex && relevantIndex

                if(removedIndexesContainsIndexOfInnerObservee && changedPropertyDepth <= propertyListDepth+1) {
                    removeUnion()
                } else if(removedIndexesAreBeforeIndexOfInnerObservee) {
                    propertyList[change.property.length] = relevantIndex - change.removed.length // change the propertyList to match the new index
                }
            } else if(change.type === 'added') {
                var relevantIndex = propertyList[change.property.length]
                if(change.index < relevantIndex) {
                    propertyList[change.property.length] = relevantIndex + change.count // change the propertyList to match the new index
                }
            }
        }
    })

    var removeUnion = function() {
        innerObservee.removeListener('change', innerChangeHandler)
        that.offChangeInternal(containerChangeHandler)
    }
}


// answers certain questions about a change compared to a property list
// returns an object like: {
    // isWithin: _,           // true if changeIsWithinInnerProperty
    // couldRelocate: _       // true if changeCouldRelocateInnerProperty or if innerProperty might be removed
// }
function changeQuestions(propertyList, change, union) {
    var propertyListDepth = propertyList.length
    var unioned = union!==undefined

    var changeIsWithinInnerProperty = true // assume true until proven otherwise
    var changeCouldRelocateInnerProperty = true // assume true until prove otherwise
    for(var n=0; n<propertyListDepth; n++) {
        // stringifying the property parts so that indexes can either be strings or integers, but must ensure we don't stringify undefined (possible todo: when/if you get rid of dot notation, this might not be necessary anymore? not entirely sure)
        if(change.property[n] === undefined || change.property[n]+'' !== propertyList[n]+'') {
            changeIsWithinInnerProperty = false
            if(n<change.property.length) {
                changeCouldRelocateInnerProperty = false
            }
        }
    }

    if(!unioned && change.property.length < propertyListDepth
       || unioned && (change.type === 'set' && change.property.length <= propertyListDepth   // if this is a unioned observee, replacing it actually removes it
                   || change.type !== 'set' && change.property.length < propertyListDepth)
    ) {
        changeIsWithinInnerProperty = false
    } else {
        changeCouldRelocateInnerProperty = false
    }

    return {couldRelocate: changeCouldRelocateInnerProperty, isWithin: changeIsWithinInnerProperty}
}

/***/ }),
/* 59 */
/*!****************************************!*\
  !*** ../node_modules/observe/utils.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// utilities needed by the configuration (excludes dependencies the configs don't need so the webpack bundle is lean)

var path = __webpack_require__(/*! path */ 3)


// Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
// any number of objects can be passed into the function and will be merged into the first argument in order
// returns obj1 (now mutated)
var merge = exports.merge = function(obj1, obj2/*, moreObjects...*/){
    return mergeInternal(arrayify(arguments), false)
}

// like merge, but traverses the whole object tree
// the result is undefined for objects with circular references
var deepMerge = exports.deepMerge = function(obj1, obj2/*, moreObjects...*/) {
    return mergeInternal(arrayify(arguments), true)
}

function mergeInternal(objects, deep) {
    var obj1 = objects[0]
    var obj2 = objects[1]

    for(var key in obj2){
       if(Object.hasOwnProperty.call(obj2, key)) {
            if(deep && obj1[key] instanceof Object && obj2[key] instanceof Object) {
                mergeInternal([obj1[key], obj2[key]], true)
            } else {
                obj1[key] = obj2[key]
            }
       }
    }

    if(objects.length > 2) {
        var newObjects = [obj1].concat(objects.slice(2))
        return mergeInternal(newObjects, deep)
    } else {
        return obj1
    }
}

function arrayify(a) {
    return Array.prototype.slice.call(a, 0)
}


/***/ }),
/* 60 */
/*!************************************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/src/node_modules/domUtils.js ***!
  \************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


// creates a dom element optionally with a class and attributes
 var node = module.exports.node = function(type, className, options) {
    var elem = document.createElement(type)

    if(options !== undefined) {
        if(options.attr !== undefined) {
            for(var attribute in options.attr) {
                createAttribute(elem, attribute, options.attr[attribute])
            }
        }
        if(options.textContent !== undefined) {
            elem.textContent = options.textContent
        }
    }

    if(className !== undefined)
        elem.className = className

    return elem
}

// convenience function for creating a div
module.exports.div = function(className, options) {
    return node('div', className, options)
}

// adds an attribute to a domNode
var setAttribute = module.exports.setAttribute = function(/*[domNode,] type, value*/) {
    if (arguments.length === 2) {
        var domNode = this.domNode;
        var type = arguments[0];
        var value = arguments[1];
    } else if (arguments.length === 3) {
        var domNode = arguments[0];
        var type = arguments[1];
        var value = arguments[2];
    } else {
        throw new Error("This function expects arguments to be: [domNode,] type, value");
    }
    var attr = document.createAttribute(type)
    attr.value = value
    domNode.setAttributeNode(attr)
}


// sets the selection
//
// works for contenteditable elements
exports.setSelectionRange = function(containerEl, start, end) {

    if(containerEl.nodeName === 'INPUT' || containerEl.nodeName === 'TEXTAREA') {
        containerEl.setSelectionRange(start, end)
    } else {
        var charIndex = 0, range = document.createRange();
        range.setStart(containerEl, 0);
        range.collapse(true);
        var foundStart = false;

        iterateThroughLeafNodes(containerEl, function(node) {
            var hiddenCharacters = findHiddenCharacters(node, node.length)
            var nextCharIndex = charIndex + node.length - hiddenCharacters;

            if (!foundStart && start >= charIndex && start <= nextCharIndex) {
                var nodeIndex = start-charIndex
                var hiddenCharactersBeforeStart = findHiddenCharacters(node, nodeIndex)
                range.setStart(node, nodeIndex + hiddenCharactersBeforeStart);
                foundStart = true;
            }

            if (foundStart && end >= charIndex && end <= nextCharIndex) {
                var nodeIndex = end-charIndex
                var hiddenCharactersBeforeEnd = findHiddenCharacters(node, nodeIndex)
                range.setEnd(node, nodeIndex + hiddenCharactersBeforeEnd);
                return true; // stop the iteration - we're done here
            }

            charIndex = nextCharIndex
        })

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

// gets the character offsets of a selection within a particular dom node
// returns undefined if there is no selection in the element
// note: yes this code doesn't work in older versions of IE (or possibly any versions) - if you want it to work in IE, please use http://modernizr.com/ or a polyfill for ranges
exports.getSelectionRange = function (element) {

    var selection = window.getSelection()
    var isInputOrArea = element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA'

    for(var n=0; n<selection.rangeCount; n++) {
        var range = selection.getRangeAt(0)
        if(isInputOrArea) {
            if(range.startOffset === range.endOffset && range.startContainer.children[range.startOffset] === element /*|| range.startContainer === element || */) { // I don't think the input or textarea itself will ever be the startContainer
                return [element.selectionStart, element.selectionEnd]
            }
        } else {
            var startsInElement = element.contains(range.startContainer)
            if(startsInElement) {
                var elementToIterateThrough = element
                var startFound = true
            } else {
                var elementToIterateThrough = range.commonAncestorContainer
                var startFound = false
                var startContainerFound = false
            }

            var visibleCharacterOffset = 0, start, end;
            iterateThroughLeafNodes(elementToIterateThrough, function(leaf) {
                if(!startFound) {
                    if(leaf === range.startContainer) {
                        startContainerFound = true
                    }

                    if(!element.contains(leaf) || !startContainerFound)
                        return; // continue
                    else if(startContainerFound)
                       startFound = true
                } else if(!startsInElement && !element.contains(leaf)) {
                    return true // done!
                }

                if(leaf === range.startContainer) {
                    start = visibleCharacterOffset + range.startOffset - findHiddenCharacters(leaf, range.startOffset)
                }
                if(leaf === range.endContainer) {
                    end = visibleCharacterOffset + range.endOffset - findHiddenCharacters(leaf, range.endOffset)
                    return true // done!
                }

                visibleCharacterOffset += leaf.length - findHiddenCharacters(leaf, leaf.length)
            })

            if(start === undefined && !startFound) {
                return undefined
            } else {
                if(start === undefined) {
                    start = 0 // start is at the beginning
                }
                if(end === undefined) {
                    end = visibleCharacterOffset // end is all the way at the end (the selection may continue in other elements)
                }

                return [start, end]
            }
        }
    }
}


// iterate through the leaf nodes inside element
// callback(node) - a function called for each leaf node
    // returning true from this ends the iteration
function iterateThroughLeafNodes(element, callback) {
    var nodeStack = [element], node;

    while (node = nodeStack.pop()) {
        if (node.nodeType == 3) {
            if(callback(node) === true)
                break;
        } else {
            var i = node.childNodes.length;
            while (i--) {
                nodeStack.push(node.childNodes[i]);
            }
        }
    }
}

function findHiddenCharacters(node, beforeCaretIndex) {
    var hiddenCharacters = 0
    var lastCharWasWhiteSpace=true
    for(var n=0; n-hiddenCharacters<beforeCaretIndex &&n<node.length; n++) {
        if([' ','\n','\t','\r'].indexOf(node.textContent[n]) !== -1) {
            if(lastCharWasWhiteSpace)
                hiddenCharacters++
            else
                lastCharWasWhiteSpace = true
        } else {
            lastCharWasWhiteSpace = false
        }
    }

    return hiddenCharacters
}

/***/ }),
/* 61 */
/*!***************************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/src/external/jss.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*
 * JSS v0.6 - JavaScript Stylesheets
 * https://github.com/Box9/jss
 *
 * Copyright (c) 2011, David Tang
 * MIT Licensed (http://www.opensource.org/licenses/mit-license.php)
 */
var jss = (function() {
    var adjSelAttrRegex = /((?:\.|#)[^\.\s#]+)((?:\.|#)[^\.\s#]+)/g;
    var doubleColonPseudoElRegex = /(::)(before|after|first-line|first-letter|selection)/;
    var singleColonPseudoElRegex = /([^:])(:)(before|after|first-line|first-letter|selection)/;
    var singleColonForPseudoElements; // flag for older browsers

    function getSelectorsAndRules(sheet) {
        var rules = sheet.cssRules || sheet.rules || [];
        var results = {};
        for (var i = 0; i < rules.length; i++) {
            // Older browsers and FF report pseudo element selectors in an outdated format
            var selectorText = toDoubleColonPseudoElements(rules[i].selectorText);
            if (!results[selectorText]) {
                results[selectorText] = [];
            }
            results[selectorText].push({
                sheet: sheet,
                index: i,
                style: rules[i].style
            });
        }
        return results;
    }

    function getRules(sheet, selector) {
        var rules = sheet.cssRules || sheet.rules || [];
        var results = [];
        // Browsers report selectors in lowercase
        selector = selector.toLowerCase();
        for (var i = 0; i < rules.length; i++) {
            var selectorText = rules[i].selectorText;
            // Note - certain rules (e.g. @rules) don't have selectorText
            if (selectorText && (selectorText == selector || selectorText == swapAdjSelAttr(selector) || selectorText == swapPseudoElSyntax(selector))) {
                results.push({
                    sheet: sheet,
                    index: i,
                    style: rules[i].style
                });
            }
        }
        return results;
    }

    function addRule(sheet, selector) {
        var rules = sheet.cssRules || sheet.rules || [];
        var index = rules.length;
        var pseudoElementRule = addPseudoElementRule(sheet, selector, rules, index);

        if (!pseudoElementRule) {
            addRuleToSheet(sheet, selector, index);
        }

        return {
            sheet: sheet,
            index: index,
            style: rules[index].style
        };
    };

    function addRuleToSheet(sheet, selector, index) {
        if (sheet.insertRule) {
            sheet.insertRule(selector + ' { }', index);
        } else {
            sheet.addRule(selector, null, index);
        }
    }

    // Handles single colon syntax for older browsers and bugzilla.mozilla.org/show_bug.cgi?id=949651
    function addPseudoElementRule(sheet, selector, rules, index) {
        var doubleColonSelector;
        var singleColonSelector;

        if (doubleColonPseudoElRegex.exec(selector)) {
            doubleColonSelector = selector;
            singleColonSelector = toSingleColonPseudoElements(selector);
        } else if (singleColonPseudoElRegex.exec(selector)) {
            doubleColonSelector = toDoubleColonPseudoElements(selector);
            singleColonSelector = selector;
        } else {
            return false; // Not dealing with a pseudo element
        }

        if (!singleColonForPseudoElements) {
            // Assume modern browser and then check if successful
            addRuleToSheet(sheet, doubleColonSelector, index);
            if (rules.length <= index) {
                singleColonForPseudoElements = true;
            }
        }
        if (singleColonForPseudoElements) {
            addRuleToSheet(sheet, singleColonSelector, index);
        }

        return true;
    }

    function toDoubleColonPseudoElements(selector) {
        return selector.replace(singleColonPseudoElRegex, function (match, submatch1, submatch2, submatch3) {
            return submatch1 + '::' + submatch3;
        });
    }

    function toSingleColonPseudoElements(selector) {
        return selector.replace(doubleColonPseudoElRegex, function(match, submatch1, submatch2) {
            return ':' + submatch2;
        })
    }

    function removeRule(rule) {
        var sheet = rule.sheet;
        if (sheet.deleteRule) {
            sheet.deleteRule(rule.index);
        } else if (sheet.removeRule) {
            sheet.removeRule(rule.index);
        }
    }

    function extend(dest, src) {
        for (var key in src) {
            if (!src.hasOwnProperty(key))
                continue;
            dest[key] = src[key];
        }
        return dest;
    }

    function aggregateStyles(rules) {
        var aggregate = {};
        for (var i = 0; i < rules.length; i++) {
            extend(aggregate, declaredProperties(rules[i].style));
        }
        return aggregate;
    }

    function declaredProperties(style) {
        var declared = {};
        for (var i = 0; i < style.length; i++) {
            declared[style[i]] = style[toCamelCase(style[i])];
        }
        return declared;
    }

    // IE9 stores rules with attributes (classes or ID's) adjacent in the opposite order as defined
    // causing them to not be found, so this method swaps [#|.]sel1[#|.]sel2 to become [#|.]sel2[#|.]sel1
    function swapAdjSelAttr(selector) {
        var swap = '';
        var lastIndex = 0;

        while ((match = adjSelAttrRegex.exec(selector)) != null) {
            if (match[0] === '')
                break;
            swap += selector.substring(lastIndex, match.index);
            swap += selector.substr(match.index + match[1].length, match[2].length);
            swap += selector.substr(match.index, match[1].length);
            lastIndex = match.index + match[0].length;
        }
        swap += selector.substr(lastIndex);

        return swap;
    };

    // FF and older browsers store rules with pseudo elements using single-colon syntax
    function swapPseudoElSyntax(selector) {
        if (doubleColonPseudoElRegex.exec(selector)) {
            return toSingleColonPseudoElements(selector);
        }
        return selector;
    }

    function setStyleProperties(rule, properties) {
        for (var key in properties) {
            var value = properties[key];
            var importantIndex = value.indexOf(' !important');

            // Modern browsers seem to handle overrides fine, but IE9 doesn't
            rule.style.removeProperty(key);
            if (importantIndex > 0) {
                rule.style.setProperty(key, value.substr(0, importantIndex), 'important');
            } else {
                rule.style.setProperty(key, value);
            }
        }
    }

    function toCamelCase(str) {
        return str.replace(/-([a-z])/g, function (match, submatch) {
            return submatch.toUpperCase();
        });
    }

    function transformCamelCasedPropertyNames(oldProps) {
        var newProps = {};
        for (var key in oldProps) {
            newProps[unCamelCase(key)] = oldProps[key];
        }
        return newProps;
    }

    function unCamelCase(str) {
        return str.replace(/([A-Z])/g, function(match, submatch) {
            return '-' + submatch.toLowerCase();
        });
    }

    var Jss = function(doc) {
        this.doc = doc;
        this.head = this.doc.head || this.doc.getElementsByTagName('head')[0];
        this.sheets = this.doc.styleSheets || [];
    };

    Jss.prototype = {
        // Returns JSS rules (selector is optional)
        get: function(selector) {
            if (!this.defaultSheet) {
                return {};
            }
            if (selector) {
                return aggregateStyles(getRules(this.defaultSheet, selector));
            }
            var rules = getSelectorsAndRules(this.defaultSheet);
            for (selector in rules) {
                rules[selector] = aggregateStyles(rules[selector]);
            }
            return rules;
        },
        // Returns all rules (selector is required)
        getAll: function(selector) {
            var properties = {};
            for (var i = 0; i < this.sheets.length; i++) {
                extend(properties, aggregateStyles(getRules(this.sheets[i], selector)));
            }
            return properties;
        },
        // Adds JSS rules for the selector based on the given properties
        set: function(selector, properties) {
            if (!this.defaultSheet) {
                this.defaultSheet = this._createSheet();
            }
            properties = transformCamelCasedPropertyNames(properties);
            var rules = getRules(this.defaultSheet, selector);
            if (!rules.length) {
                rules = [addRule(this.defaultSheet, selector)];
            }
            for (var i = 0; i < rules.length; i++) {
                setStyleProperties(rules[i], properties);
            }
        },
        // Removes JSS rules (selector is optional)
        remove: function(selector) {
            if (!this.defaultSheet)
                return;
            if (!selector) {
                this._removeSheet(this.defaultSheet);
                delete this.defaultSheet;
                return;
            }
            var rules = getRules(this.defaultSheet, selector);
            for (var i = 0; i < rules.length; i++) {
                removeRule(rules[i]);
            }
            return rules.length;
        },
        _createSheet: function() {
            var styleNode = this.doc.createElement('style');
            styleNode.type = 'text/css';
            styleNode.rel = 'stylesheet';
            this.head.appendChild(styleNode);
            return styleNode.sheet;
        },
        _removeSheet: function(sheet) {
            var node = sheet.ownerNode;
            node.parentNode.removeChild(node);
        }
    };

    var exports = new Jss(document);
    exports.forDocument = function(doc) {
        return new Jss(doc);
    };
    return exports;
})();

typeof module !== 'undefined' && module.exports && (module.exports = jss); // CommonJS support

/***/ }),
/* 62 */
/*!***************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/Text.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// This file just contains a proxies to the actual source file, so that you can access standard blocks via require('blocks/Text')
module.exports = __webpack_require__(/*! ./src/node_modules/Components/Text */ 63)

/***/ }),
/* 63 */
/*!*******************************************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/src/node_modules/Components/Text.js ***!
  \*******************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Block = __webpack_require__(/*! ../Block */ 12)
var proto = __webpack_require__(/*! proto */ 2)
var Style = __webpack_require__(/*! Style */ 8)

module.exports = proto(Block, function(superclass) {

    //static properties

    this.name = 'Text'

    this.defaultStyle = Style({
        whiteSpace: 'pre-wrap' // so whitespace is displayed (e.g. multiple spaces don't collapse)
    })

    this.init = function(/*[label,] text*/) {
        if(arguments.length === 1) {
            var text = arguments[0]
        } else {
            var label = arguments[0]
            var text = arguments[1]
        }

        if (text === undefined) text = '';

        superclass.init.call(this) // superclass constructor

        var that = this

        this.label = label
        this.text = text

        this.on("input",function(data) {
            var eventData = {newText:data.srcElement.textContent,oldText:that.oldText};
            that.oldText = eventData.newText;
            //that.emit("input",eventData);
        });

        this.on("blur",function(data) {
            var eventData = {newText:data.srcElement.textContent,oldText:that.lastFocus};
            that.lastFocus = eventData.newText;
            //that.emit("blur",eventData);
        });
    }

    // instance properties

    Object.defineProperty(this, 'text', {
        get: function() {
            return this.domNode.textContent
        }, set: function(v) {
            this.domNode.innerText = v   // apparently textContent can't be set or something
        }
    })
});


/***/ }),
/* 64 */
/*!****************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/Block.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// This file just contains a proxies to the actual source file, so that you can access standard blocks via require('blocks/Select')
module.exports = __webpack_require__(/*! ./src/node_modules/Block */ 12)

/***/ }),
/* 65 */
/*!****************************************************************!*\
  !*** ../node_modules/deadunit/node_modules/blocks.js/Style.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// This file just contains a proxies to the actual source file, so that you can access standard blocks via require('blocks/Select')
module.exports = __webpack_require__(/*! ./src/node_modules/Style */ 8)

/***/ }),
/* 66 */
/*!*****************************************************!*\
  !*** ../node_modules/deadunit/deadunit.internal.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2013 Billy Tetrud - Free to use for any purpose: MIT License*/

module.exports = function(options) {
    var exports = {}

    var deadunitCore = options.deadunitCore
    var proto = __webpack_require__(/*! proto */ 22)

    var defaultFormats = __webpack_require__(/*! ./defaultFormats */ 23)
    exports.format = __webpack_require__(/*! ./basicFormatter */ 24)

    exports.error = deadunitCore.error

    exports.test = proto(deadunitCore.test, function() {
        this.string = function() {
            return defaultFormats.text(this, undefined, /*printOnTheFly=*/false, /*printLateEvents=*/false)
        }

        this.html = function() {
            return defaultFormats.html(this, false)
        }

        this.results = function() {
            arguments[0] = false
            return deadunitCore.test.results.apply(this, arguments)
        }

        options.environmentSpecificMethods.call(this)
    })

    return exports
}



/***/ }),
/* 67 */
/*!*****************************************************************!*\
  !*** ../node_modules/deadunit-core/src/deadunitCore.browser.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2014 Billy Tetrud - Free to use for any purpose: MIT License*/

var deadunitCore = __webpack_require__(/*! ./deadunitCore */ 29)
var browserConfig = __webpack_require__(/*! ./deadunitCore.browserConfig */ 83)

module.exports = deadunitCore(browserConfig())

/***/ }),
/* 68 */
/*!**********************************!*\
  !*** ../node_modules/url/url.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ 69);
var util = __webpack_require__(/*! ./util */ 71);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ 72);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 69 */
/*!********************************************!*\
  !*** ../node_modules/punycode/punycode.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/module.js */ 70)(module), __webpack_require__(/*! ./../webpack/buildin/global.js */ 6)))

/***/ }),
/* 70 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 71 */
/*!***********************************!*\
  !*** ../node_modules/url/util.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 72 */
/*!************************************************!*\
  !*** ../node_modules/querystring-es3/index.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ 73);
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ 74);


/***/ }),
/* 73 */
/*!*************************************************!*\
  !*** ../node_modules/querystring-es3/decode.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 74 */
/*!*************************************************!*\
  !*** ../node_modules/querystring-es3/encode.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 75 */
/*!***************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/source-map/source-map.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(/*! ./lib/source-map-generator */ 32).SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(/*! ./lib/source-map-consumer */ 78).SourceMapConsumer;
exports.SourceNode = __webpack_require__(/*! ./lib/source-node */ 81).SourceNode;


/***/ }),
/* 76 */
/*!***************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/source-map/lib/base64.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),
/* 77 */
/*!*********************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/source-map/lib/mapping-list.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ 4);

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;


/***/ }),
/* 78 */
/*!****************************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/source-map/lib/source-map-consumer.js ***!
  \****************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ 4);
var binarySearch = __webpack_require__(/*! ./binary-search */ 79);
var ArraySet = __webpack_require__(/*! ./array-set */ 34).ArraySet;
var base64VLQ = __webpack_require__(/*! ./base64-vlq */ 33);
var quickSort = __webpack_require__(/*! ./quick-sort */ 80).quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
}

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

exports.SourceMapConsumer = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };

exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ }),
/* 79 */
/*!**********************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/source-map/lib/binary-search.js ***!
  \**********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};


/***/ }),
/* 80 */
/*!*******************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/source-map/lib/quick-sort.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
exports.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};


/***/ }),
/* 81 */
/*!********************************************************************************!*\
  !*** ../node_modules/deadunit-core/node_modules/source-map/lib/source-node.js ***!
  \********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(/*! ./source-map-generator */ 32).SourceMapGenerator;
var util = __webpack_require__(/*! ./util */ 4);

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex] || '';
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || '';
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

exports.SourceNode = SourceNode;


/***/ }),
/* 82 */
/*!***********************************************************!*\
  !*** ../node_modules/deadunit-core/src/processResults.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function returnResults(unitTestObject) {

    var results;
    var groups = {}
    var groupMetadata = {}

    var primaryGroup;
    var ended = false

    unitTestObject.events({
        group: function(e) {
            var g = {
               parent: e.parent,
               id: e.id,              // a unique id for the test group
               type: 'group',         // indicates a test group (either a `Unit.test` call or `this.test`)
               name: e.name,          // the name of the test
               results: [],           // An array of test results, which can be of an `UnitTest` Result Types
               exceptions: [],        // An array of uncaught exceptions thrown in the test,
               time: e.time,
               duration: 0            // the duration of the test from its start til the last test action (assert, log, etc)
               //                       including asynchronous parts and including subtests
               //syncDuration: _,      // the synchronous duration of the test (not including any asynchronous parts)
               //totalSyncDuration: _  // syncDuration plus the before and after (if applicable)
            }

            if(primaryGroup === undefined) primaryGroup = g

            groups[e.id] = g
            groupMetadata[e.id] = {}
            if(e.parent === undefined) {
                results = g
            } else {
                groups[e.parent].results.push(g)
            }
        },
        assert: function(e) {
            e.type = 'assert'
            groups[e.parent].results.push(e)
            setGroupDuration(e.parent, e.time)
        },
        count: function(e) {
            e.type = 'assert'
            setGroupDuration(e.parent, e.time)

            groupMetadata[e.parent].countInfo = e
        },
        exception: function(e) {
            groups[e.parent].exceptions.push(e.error)
            setGroupDuration(e.parent, e.time)
        },
        log: function(e) {
            e.type = 'log'
            groups[e.parent].results.push(e)
            setGroupDuration(e.parent, e.time)
        },
        before: function(e) {
            groups[e.parent].beforeStart = e.time
        },
        after: function(e) {
            groups[e.parent].afterStart = e.time
        },
        beforeEnd: function(e) {
            groups[e.parent].beforeDuration = e.time - groups[e.parent].beforeStart
        },
        afterEnd: function(e) {
            groups[e.parent].afterDuration = e.time - groups[e.parent].afterStart
        },
        groupEnd: function(e) {
            setGroupDuration(e.id, e.time)
        },
        end: function(e) {
            primaryGroup.timeout = e.type === 'timeout'
            setGroupDuration(primaryGroup.id, e.time)

            // make the count assertions
            eachTest(primaryGroup, function(subtest, parenttest) {
                var countInfo = groupMetadata[subtest.id].countInfo
                if(countInfo !== undefined) {
                    var info = countInfo
                    var actualCount = 0
                    subtest.results.forEach(function(a) {
                        if(a.type === 'assert' || a.type === 'group')
                            actualCount++
                    })

                    subtest.results.splice(0,0,{
                        parent: subtest.id,
                        type: 'assert',
                        success: actualCount === info.expected,
                        time: info.time,
                        sourceLines: info.sourceLines,
                        file: info.file,
                        line: info.line,
                        column: info.column,
                        expected: info.expected,
                        actual: actualCount
                    })
                }
            })

            ended = true
        }
    })

    function setGroupDuration(groupid, time) {
        var newDuration = time - groups[groupid].time
        if(newDuration > groups[groupid].duration) {
            groups[groupid].duration = newDuration
        }

        if(groups[groupid].parent) {
            setGroupDuration(groups[groupid].parent, time)
        }
    }

    return results
}


// iterates through the tests and subtests leaves first (depth first)
function eachTest(test, callback, parent) {
    test.results.forEach(function(result) {
        if(result.type === 'group') {
            eachTest(result, callback, test)
        }
    })

    callback(test, parent)
}

/***/ }),
/* 83 */
/*!***********************************************************************!*\
  !*** ../node_modules/deadunit-core/src/deadunitCore.browserConfig.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2014 Billy Tetrud - Free to use for any purpose: MIT License*/

var path = __webpack_require__(/*! path */ 3);

var Future = __webpack_require__(/*! async-future */ 31)
var proto = __webpack_require__(/*! proto */ 30)
var stackinfo = __webpack_require__(/*! stackinfo */ 84)
var ajax = __webpack_require__(/*! ajax */ 88)
var resolveSourceMap = Future.wrap(__webpack_require__(/*! source-map-resolve */ 89).resolveSourceMap)

var deadunitCore = __webpack_require__(/*! ./deadunitCore */ 29)
var isRelative = __webpack_require__(/*! ./isRelative */ 35)

ajax.setSynchronous(true) // todo: REMOVE THIS once this chrome bug is fixed in a public release: https://code.google.com/p/chromium/issues/detail?id=368444

// add sourceFile contents into stacktrace.js's cache
var sourceCache = {}
var cacheGet = function(url) {
    return sourceCache[url]
}
var cacheSet = function(url, responseFuture) {
    sourceCache[url] = responseFuture
    if(stackinfo.sourceCache[url] === undefined) {
        responseFuture.then(function(response) {
            stackinfo.sourceCache[url] = response.text.split('\n')
        }).done()
    }
}

// source-map-resolve assumed the availability of setImmediate
if(window.setImmediate === undefined) {
    window.setImmediate = function(fn, params) {
        setTimeout(function() {
            fn.apply(this,params)
        },0)
    }
}

ajax.cacheGet(cacheGet)
ajax.cacheSet(cacheSet)


var config = module.exports = proto(function() {
    this.init = function() {
        var that = this
        // node.js errback style readFile
        /*private*/ this.readFile = function(url, callback) {
            that.ajax(url).then(function(response) { // need to use 'that' because readFile will not be called with this config object as the context
                callback(undefined, response.text)
            }).catch(callback).done()
        }
    }

    this.ajax = ajax

    this.initialize = function() {}

    this.initializeMainTest = function(testState) {
        //testState.active = true // make sure

        testState.oldOnerror = window.onerror
        testState.newOnerror = window.onerror = function(errorMessage, filename, line, column) {
            if(column === undefined) var columnText = ''
            else                     var columnText = "/"+column

            try {
                throw new Error("Uncaught error in "+filename+" line "+line+columnText+": "+errorMessage) // IE needs the exception to actually be thrown before it will have a stack trace
            } catch(e) {
                testState.unhandledErrorHandler(e, true)
                if(testState.oldOnerror)
                    testState.oldOnerror.apply(this, arguments)
            }
        }
    }
    this.mainTestDone= function(testState) {
        //testState.active = false // make sure the test-specific onerror code is no longer run
        /*if(testState.newOnerror === window.onerror) {
            window.onerror = testState.oldOnerror // otherwise something else has overwritten onerror, so don't mess with it
        }*/
    }

    this.getDomain= function() {
        return undefined // domains don't exist in-browser
    }

    this.runTestGroup= function(deadunitState, tester, runTest, handleError, handleUnhandledError) {
        runTest()
    }
    this.getScriptSourceLines= function(path) {
        if(stackinfo.sourceCache[path] !== undefined) {
            return Future(stackinfo.sourceCache[path])
        } else {
            return this.ajax(path).then(function(response) {
                return Future(response.text.split('\n'))
            })
        }

    }
    this.getSourceMapObject = function(url, warningHandler) {
        var that = this
        return this.ajax(url).then(function(response) {
            var headers = response.headers
            if(headers['SourceMap'] !== undefined) {
                var headerSourceMap = headers['SourceMap']
            } else if(headers['X-SourceMap']) {
                var headerSourceMap = headers['X-SourceMap']
            }

            if(headerSourceMap !== undefined) {
                if(isRelative(headerSourceMap)) {
                    headerSourceMap = path.join(path.dirname(url),headerSourceMap)
                }

                return that.ajax(headerSourceMap).then(function(response) {
                    return Future(JSON.parse(response.text))
                })

            } else {
                return resolveSourceMap(response.text, url, that.readFile).catch(function(e){
                    warningHandler(e)
                    return Future(null)

                }).then(function(sourceMapObject) {
                    if(sourceMapObject !== null) {
                        return Future(sourceMapObject.map)
                    } else {
                        return Future(undefined)
                    }
                })
            }
        })
    }

    this.defaultUnhandledErrorHandler= function(e) {
        //if(e !== undefined)
            setTimeout(function() {
                if(e.stack)
                    console.log(e.stack)
                else
                    console.log(e)
            },0)
    }
    this.defaultTestErrorHandler= function(tester) {
        return function(e) {
            tester.manager.emit('exception', {
                parent: tester.mainSubTest.id,
                time: (new Date()).getTime(),
                error: e
            })
        }
    }

    this.getLineInfo= function(stackIncrease) {
        return Future(stackinfo()[3+stackIncrease])
    }

    this.getExceptionInfo= function(e) {
        return Future(stackinfo(e))
    }

    this.throwAsyncException = function(e) {
        setTimeout(function() {
            if(e.stack !== undefined) throw e.stack
            else                      throw e
        },0)
    }
})


/***/ }),
/* 84 */
/*!**********************************************!*\
  !*** ../node_modules/stackinfo/stackinfo.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var printStackTrace = __webpack_require__(/*! stacktrace-js */ 85)
var parsers = __webpack_require__(/*! ./tracelineParser */ 86)
var mode = __webpack_require__(/*! ./exceptionMode */ 87)

module.exports = function(ex) {
    if(parsers[mode] === undefined)
        throw new Error("browser "+mode+" not supported")

    var options = undefined
    if(ex !== undefined) {
        if(mode === 'ie' && ex.number === undefined)
            ex.number = 1    // work around for this: https://github.com/stacktracejs/stacktrace.js/issues/80
        options = {e:ex, guess: true}
    }
    var trace = printStackTrace(options)

    if(ex === undefined) {
        trace.splice(0,4) // strip stacktrace-js internals
    }

    return parseStacktrace(trace)
}

function TraceInfo(traceline) {
    this.traceline = traceline
}
TraceInfo.prototype = {
    get file() {
        return getInfo(this).file
    },
    get function() {
        return getInfo(this).function
    },
    get line() {
        return getInfo(this).line
    },
    get column() {
        return getInfo(this).column
    },
    get info() {
        return getInfo(this)
    }
}

function getInfo(traceInfo) {
    if(traceInfo.cache === undefined) {
        var info = parsers[mode](traceInfo.traceline)
        if(info.line !== undefined)
            info.line = parseInt(info.line, 10)
        if(info.column !== undefined)
            info.column = parseInt(info.column, 10)

        traceInfo.cache = info
    }

    return traceInfo.cache
}

function parseStacktrace(trace) {
    var results = []
    for(var n = 0; n<trace.length; n++) {
        results.push(new TraceInfo(trace[n]))
    }
    return results
}

// here because i'm lazy, they're here for testing only
module.exports.parsers = parsers
module.exports.mode = mode
module.exports.sourceCache = printStackTrace.implementation.prototype.sourceCache // expose this so you can consolidate caches together from different libraries


/***/ }),
/* 85 */
/*!***************************************************!*\
  !*** ../node_modules/stacktrace-js/stacktrace.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Domain Public by Eric Wendelin http://eriwen.com/ (2008)
//                  Luke Smith http://lucassmith.name/ (2008)
//                  Loic Dachary <loic@dachary.org> (2008)
//                  Johan Euphrosine <proppy@aminche.com> (2008)
//                  Oyvind Sean Kinsey http://kinsey.no/blog (2010)
//                  Victor Homyakov <victor-homyakov@users.sourceforge.net> (2010)
(function(global, factory) {
  // Node
  if (true) {
    module.exports = factory();

  // AMD
  } else if (typeof define === 'function' && define.amd) {
    define(factory);

  // Browser globals
  } else {
    global.printStackTrace = factory();
  }
}(this, function() {
	/**
	 * Main function giving a function stack trace with a forced or passed in Error
	 *
	 * @cfg {Error} e The error to create a stacktrace from (optional)
	 * @cfg {Boolean} guess If we should try to resolve the names of anonymous functions
	 * @return {Array} of Strings with functions, lines, files, and arguments where possible
	 */
	function printStackTrace(options) {
	    options = options || {guess: true};
	    var ex = options.e || null, guess = !!options.guess;
	    var p = new printStackTrace.implementation(), result = p.run(ex);
	    return (guess) ? p.guessAnonymousFunctions(result) : result;
	}

	printStackTrace.implementation = function() {
	};

	printStackTrace.implementation.prototype = {
	    /**
	     * @param {Error} ex The error to create a stacktrace from (optional)
	     * @param {String} mode Forced mode (optional, mostly for unit tests)
	     */
	    run: function(ex, mode) {
	        ex = ex || this.createException();
	        // examine exception properties w/o debugger
	        //for (var prop in ex) {alert("Ex['" + prop + "']=" + ex[prop]);}
	        mode = mode || this.mode(ex);
	        if (mode === 'other') {
	            return this.other(arguments.callee);
	        } else {
	            return this[mode](ex);
	        }
	    },

	    createException: function() {
	        try {
	            this.undef();
	        } catch (e) {
	            return e;
	        }
	    },

	    /**
	     * Mode could differ for different exception, e.g.
	     * exceptions in Chrome may or may not have arguments or stack.
	     *
	     * @return {String} mode of operation for the exception
	     */
	    mode: function(e) {
	        if (e['arguments'] && e.stack) {
	            return 'chrome';
	        } else if (e.stack && e.sourceURL) {
	            return 'safari';
	        } else if (e.stack && e.number) {
	            return 'ie';
	        } else if (typeof e.message === 'string' && typeof window !== 'undefined' && window.opera) {
	            // e.message.indexOf("Backtrace:") > -1 -> opera
	            // !e.stacktrace -> opera
	            if (!e.stacktrace) {
	                return 'opera9'; // use e.message
	            }
	            // 'opera#sourceloc' in e -> opera9, opera10a
	            if (e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
	                return 'opera9'; // use e.message
	            }
	            // e.stacktrace && !e.stack -> opera10a
	            if (!e.stack) {
	                return 'opera10a'; // use e.stacktrace
	            }
	            // e.stacktrace && e.stack -> opera10b
	            if (e.stacktrace.indexOf("called from line") < 0) {
	                return 'opera10b'; // use e.stacktrace, format differs from 'opera10a'
	            }
	            // e.stacktrace && e.stack -> opera11
	            return 'opera11'; // use e.stacktrace, format differs from 'opera10a', 'opera10b'
	        } else if (e.stack && !e.fileName) {
	            // Chrome 27 does not have e.arguments as earlier versions,
	            // but still does not have e.fileName as Firefox
	            return 'chrome';
	        } else if (e.stack) {
	            return 'firefox';
	        }
	        return 'other';
	    },

	    /**
	     * Given a context, function name, and callback function, overwrite it so that it calls
	     * printStackTrace() first with a callback and then runs the rest of the body.
	     *
	     * @param {Object} context of execution (e.g. window)
	     * @param {String} functionName to instrument
	     * @param {Function} callback function to call with a stack trace on invocation
	     */
	    instrumentFunction: function(context, functionName, callback) {
	        context = context || window;
	        var original = context[functionName];
	        context[functionName] = function instrumented() {
	            callback.call(this, printStackTrace().slice(4));
	            return context[functionName]._instrumented.apply(this, arguments);
	        };
	        context[functionName]._instrumented = original;
	    },

	    /**
	     * Given a context and function name of a function that has been
	     * instrumented, revert the function to it's original (non-instrumented)
	     * state.
	     *
	     * @param {Object} context of execution (e.g. window)
	     * @param {String} functionName to de-instrument
	     */
	    deinstrumentFunction: function(context, functionName) {
	        if (context[functionName].constructor === Function &&
	                context[functionName]._instrumented &&
	                context[functionName]._instrumented.constructor === Function) {
	            context[functionName] = context[functionName]._instrumented;
	        }
	    },

	    /**
	     * Given an Error object, return a formatted Array based on Chrome's stack string.
	     *
	     * @param e - Error object to inspect
	     * @return Array<String> of function calls, files and line numbers
	     */
	    chrome: function(e) {
	        var stack = (e.stack + '\n').replace(/^\S[^\(]+?[\n$]/gm, '').
	          replace(/^\s+(at eval )?at\s+/gm, '').
	          replace(/^([^\(]+?)([\n$])/gm, '{anonymous}()@$1$2').
	          replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}()@$1').split('\n');
	        stack.pop();
	        return stack;
	    },

	    /**
	     * Given an Error object, return a formatted Array based on Safari's stack string.
	     *
	     * @param e - Error object to inspect
	     * @return Array<String> of function calls, files and line numbers
	     */
	    safari: function(e) {
	        return e.stack.replace(/\[native code\]\n/m, '')
	            .replace(/^(?=\w+Error\:).*$\n/m, '')
	            .replace(/^@/gm, '{anonymous}()@')
	            .split('\n');
	    },

	    /**
	     * Given an Error object, return a formatted Array based on IE's stack string.
	     *
	     * @param e - Error object to inspect
	     * @return Array<String> of function calls, files and line numbers
	     */
	    ie: function(e) {
	        var lineRE = /^.*at (\w+) \(([^\)]+)\)$/gm;
	        return e.stack.replace(/at Anonymous function /gm, '{anonymous}()@')
	            .replace(/^(?=\w+Error\:).*$\n/m, '')
	            .replace(lineRE, '$1@$2')
	            .split('\n');
	    },

	    /**
	     * Given an Error object, return a formatted Array based on Firefox's stack string.
	     *
	     * @param e - Error object to inspect
	     * @return Array<String> of function calls, files and line numbers
	     */
	    firefox: function(e) {
	        return e.stack.replace(/(?:\n@:0)?\s+$/m, '').replace(/^[\(@]/gm, '{anonymous}()@').split('\n');
	    },

	    opera11: function(e) {
	        var ANON = '{anonymous}', lineRE = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;
	        var lines = e.stacktrace.split('\n'), result = [];

	        for (var i = 0, len = lines.length; i < len; i += 2) {
	            var match = lineRE.exec(lines[i]);
	            if (match) {
	                var location = match[4] + ':' + match[1] + ':' + match[2];
	                var fnName = match[3] || "global code";
	                fnName = fnName.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, ANON);
	                result.push(fnName + '@' + location + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
	            }
	        }

	        return result;
	    },

	    opera10b: function(e) {
	        // "<anonymous function: run>([arguments not available])@file://localhost/G:/js/stacktrace.js:27\n" +
	        // "printStackTrace([arguments not available])@file://localhost/G:/js/stacktrace.js:18\n" +
	        // "@file://localhost/G:/js/test/functional/testcase1.html:15"
	        var lineRE = /^(.*)@(.+):(\d+)$/;
	        var lines = e.stacktrace.split('\n'), result = [];

	        for (var i = 0, len = lines.length; i < len; i++) {
	            var match = lineRE.exec(lines[i]);
	            if (match) {
	                var fnName = match[1]? (match[1] + '()') : "global code";
	                result.push(fnName + '@' + match[2] + ':' + match[3]);
	            }
	        }

	        return result;
	    },

	    /**
	     * Given an Error object, return a formatted Array based on Opera 10's stacktrace string.
	     *
	     * @param e - Error object to inspect
	     * @return Array<String> of function calls, files and line numbers
	     */
	    opera10a: function(e) {
	        // "  Line 27 of linked script file://localhost/G:/js/stacktrace.js\n"
	        // "  Line 11 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html: In function foo\n"
	        var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
	        var lines = e.stacktrace.split('\n'), result = [];

	        for (var i = 0, len = lines.length; i < len; i += 2) {
	            var match = lineRE.exec(lines[i]);
	            if (match) {
	                var fnName = match[3] || ANON;
	                result.push(fnName + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
	            }
	        }

	        return result;
	    },

	    // Opera 7.x-9.2x only!
	    opera9: function(e) {
	        // "  Line 43 of linked script file://localhost/G:/js/stacktrace.js\n"
	        // "  Line 7 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html\n"
	        var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
	        var lines = e.message.split('\n'), result = [];

	        for (var i = 2, len = lines.length; i < len; i += 2) {
	            var match = lineRE.exec(lines[i]);
	            if (match) {
	                result.push(ANON + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
	            }
	        }

	        return result;
	    },

	    // Safari 5-, IE 9-, and others
	    other: function(curr) {
	        var ANON = '{anonymous}', fnRE = /function\s*([\w\-$]+)?\s*\(/i, stack = [], fn, args, maxStackSize = 10;
	        while (curr && curr['arguments'] && stack.length < maxStackSize) {
	            fn = fnRE.test(curr.toString()) ? RegExp.$1 || ANON : ANON;
	            args = Array.prototype.slice.call(curr['arguments'] || []);
	            stack[stack.length] = fn + '(' + this.stringifyArguments(args) + ')';
	            curr = curr.caller;
	        }
	        return stack;
	    },

	    /**
	     * Given arguments array as a String, substituting type names for non-string types.
	     *
	     * @param {Arguments,Array} args
	     * @return {String} stringified arguments
	     */
	    stringifyArguments: function(args) {
	        var result = [];
	        var slice = Array.prototype.slice;
	        for (var i = 0; i < args.length; ++i) {
	            var arg = args[i];
	            if (arg === undefined) {
	                result[i] = 'undefined';
	            } else if (arg === null) {
	                result[i] = 'null';
	            } else if (arg.constructor) {
	                if (arg.constructor === Array) {
	                    if (arg.length < 3) {
	                        result[i] = '[' + this.stringifyArguments(arg) + ']';
	                    } else {
	                        result[i] = '[' + this.stringifyArguments(slice.call(arg, 0, 1)) + '...' + this.stringifyArguments(slice.call(arg, -1)) + ']';
	                    }
	                } else if (arg.constructor === Object) {
	                    result[i] = '#object';
	                } else if (arg.constructor === Function) {
	                    result[i] = '#function';
	                } else if (arg.constructor === String) {
	                    result[i] = '"' + arg + '"';
	                } else if (arg.constructor === Number) {
	                    result[i] = arg;
	                }
	            }
	        }
	        return result.join(',');
	    },

	    sourceCache: {},

	    /**
	     * @return the text from a given URL
	     */
	    ajax: function(url) {
	        var req = this.createXMLHTTPObject();
	        if (req) {
	            try {
	                req.open('GET', url, false);
	                //req.overrideMimeType('text/plain');
	                //req.overrideMimeType('text/javascript');
	                req.send(null);
	                //return req.status == 200 ? req.responseText : '';
	                return req.responseText;
	            } catch (e) {
	            }
	        }
	        return '';
	    },

	    /**
	     * Try XHR methods in order and store XHR factory.
	     *
	     * @return <Function> XHR function or equivalent
	     */
	    createXMLHTTPObject: function() {
	        var xmlhttp, XMLHttpFactories = [
	            function() {
	                return new XMLHttpRequest();
	            }, function() {
	                return new ActiveXObject('Msxml2.XMLHTTP');
	            }, function() {
	                return new ActiveXObject('Msxml3.XMLHTTP');
	            }, function() {
	                return new ActiveXObject('Microsoft.XMLHTTP');
	            }
	        ];
	        for (var i = 0; i < XMLHttpFactories.length; i++) {
	            try {
	                xmlhttp = XMLHttpFactories[i]();
	                // Use memoization to cache the factory
	                this.createXMLHTTPObject = XMLHttpFactories[i];
	                return xmlhttp;
	            } catch (e) {
	            }
	        }
	    },

	    /**
	     * Given a URL, check if it is in the same domain (so we can get the source
	     * via Ajax).
	     *
	     * @param url <String> source url
	     * @return <Boolean> False if we need a cross-domain request
	     */
	    isSameDomain: function(url) {
	        return typeof location !== "undefined" && url.indexOf(location.hostname) !== -1; // location may not be defined, e.g. when running from nodejs.
	    },

	    /**
	     * Get source code from given URL if in the same domain.
	     *
	     * @param url <String> JS source URL
	     * @return <Array> Array of source code lines
	     */
	    getSource: function(url) {
	        // TODO reuse source from script tags?
	        if (!(url in this.sourceCache)) {
	            this.sourceCache[url] = this.ajax(url).split('\n');
	        }
	        return this.sourceCache[url];
	    },

	    guessAnonymousFunctions: function(stack) {
	        for (var i = 0; i < stack.length; ++i) {
	            var reStack = /\{anonymous\}\(.*\)@(.*)/,
	                reRef = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,
	                frame = stack[i], ref = reStack.exec(frame);

	            if (ref) {
	                var m = reRef.exec(ref[1]);
	                if (m) { // If falsey, we did not get any file/line information
	                    var file = m[1], lineno = m[2], charno = m[3] || 0;
	                    if (file && this.isSameDomain(file) && lineno) {
	                        var functionName = this.guessAnonymousFunction(file, lineno, charno);
	                        stack[i] = frame.replace('{anonymous}', functionName);
	                    }
	                }
	            }
	        }
	        return stack;
	    },

	    guessAnonymousFunction: function(url, lineNo, charNo) {
	        var ret;
	        try {
	            ret = this.findFunctionName(this.getSource(url), lineNo);
	        } catch (e) {
	            ret = 'getSource failed with url: ' + url + ', exception: ' + e.toString();
	        }
	        return ret;
	    },

	    findFunctionName: function(source, lineNo) {
	        // FIXME findFunctionName fails for compressed source
	        // (more than one function on the same line)
	        // function {name}({args}) m[1]=name m[2]=args
	        var reFunctionDeclaration = /function\s+([^(]*?)\s*\(([^)]*)\)/;
	        // {name} = function ({args}) TODO args capture
	        // /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function(?:[^(]*)/
	        var reFunctionExpression = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/;
	        // {name} = eval()
	        var reFunctionEvaluation = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/;
	        // Walk backwards in the source lines until we find
	        // the line which matches one of the patterns above
	        var code = "", line, maxLines = Math.min(lineNo, 20), m, commentPos;
	        for (var i = 0; i < maxLines; ++i) {
	            // lineNo is 1-based, source[] is 0-based
	            line = source[lineNo - i - 1];
	            commentPos = line.indexOf('//');
	            if (commentPos >= 0) {
	                line = line.substr(0, commentPos);
	            }
	            // TODO check other types of comments? Commented code may lead to false positive
	            if (line) {
	                code = line + code;
	                m = reFunctionExpression.exec(code);
	                if (m && m[1]) {
	                    return m[1];
	                }
	                m = reFunctionDeclaration.exec(code);
	                if (m && m[1]) {
	                    //return m[1] + "(" + (m[2] || "") + ")";
	                    return m[1];
	                }
	                m = reFunctionEvaluation.exec(code);
	                if (m && m[1]) {
	                    return m[1];
	                }
	            }
	        }
	        return '(?)';
	    }
	};

	return printStackTrace;
}));

/***/ }),
/* 86 */
/*!****************************************************!*\
  !*** ../node_modules/stackinfo/tracelineParser.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


module.exports = {
    chrome: function(line) {
        var m = line.match(CHROME_STACK_LINE);
        if (m) {
            var file = m[9] || m[18] || m[26]
            var fn = m[4] || m[7] || m[14] || m[23]
            var lineNumber = m[11] || m[20]
            var column = m[13] || m[22]
        } else {
            //throw new Error("Couldn't parse exception line: "+line)
        }
        
        return {
            file: file,
            function: fn,
            line: lineNumber,
            column: column
        }
    },
    
    firefox: function(line) {
        var m = line.match(FIREFOX_STACK_LINE);
        if (m) {
            var file = m[8]
            var fn = m[1]
            var lineNumber = m[10]
            var column = m[12]
        }
        
        return {
            file: file,
            function: fn,
            line: lineNumber,
            column: column
        }
    },
    
    ie: function(line) {
        var m = line.match(IE_STACK_LINE);
        if (m) {
            var file = m[3] || m[10]
            var fn = m[2] || m[9]
            var lineNumber = m[5] || m[12]
            var column = m[7] || m[14]
        }
        
        return {
            file: file,
            function: fn,
            line: lineNumber,
            column: column
        }
    }
}

// The following 2 regex patterns were originally taken from google closure library: https://code.google.com/p/closure-library/source/browse/closure/goog/testing/stacktrace.js
// RegExp pattern for JavaScript identifiers. We don't support Unicode identifiers defined in ECMAScript v3.
var IDENTIFIER_PATTERN_ = '[\\w$]*';
// RegExp pattern for an URL + position inside the file.
var URL_PATTERN_ = '((?:http|https|file)://[^\\s)]+?|javascript:.*)';
var FILE_AND_LINE = URL_PATTERN_+'(:(\\d*)(:(\\d*))?)'

var STACKTRACE_JS_GETSOURCE_FAILURE = 'getSource failed with url'

var CHROME_STACKTRACE_JS_GETSOURCE_FAILURE = STACKTRACE_JS_GETSOURCE_FAILURE+'((?!'+'\\(\\)@'+').)*'

var CHROME_FILE_AND_LINE = FILE_AND_LINE//URL_PATTERN_+'(:(\\d*):(\\d*))'
var CHROME_IDENTIFIER_PATTERN = '\\<?'+IDENTIFIER_PATTERN_+'\\>?'
var CHROME_COMPOUND_IDENTIFIER = "((new )?"+CHROME_IDENTIFIER_PATTERN+'(\\.'+CHROME_IDENTIFIER_PATTERN+')*)( \\[as '+IDENTIFIER_PATTERN_+'])?'
var CHROME_UNKNOWN_IDENTIFIER = "(\\(\\?\\))"

// output from stacktrace.js is: "name()@..." instead of "name (...)"
var CHROME_ANONYMOUS_FUNCTION = '('+CHROME_STACKTRACE_JS_GETSOURCE_FAILURE+'|'+CHROME_COMPOUND_IDENTIFIER+'|'+CHROME_UNKNOWN_IDENTIFIER+')'
                                    +'\\(\\)'+'@'+CHROME_FILE_AND_LINE
var CHROME_NORMAL_FUNCTION = CHROME_COMPOUND_IDENTIFIER+' \\('+CHROME_FILE_AND_LINE+'\\)'
var CHROME_NATIVE_FUNCTION = CHROME_COMPOUND_IDENTIFIER+' (\\(native\\))'

var CHROME_FUNCTION_CALL = '('+CHROME_ANONYMOUS_FUNCTION+"|"+CHROME_NORMAL_FUNCTION+"|"+CHROME_NATIVE_FUNCTION+')'

var CHROME_STACK_LINE = new RegExp('^'+CHROME_FUNCTION_CALL+'$')  // precompile them so its faster


var FIREFOX_STACKTRACE_JS_GETSOURCE_FAILURE = STACKTRACE_JS_GETSOURCE_FAILURE+'((?!'+'\\(\\)@'+').)*'+'\\(\\)'
var FIREFOX_FILE_AND_LINE = FILE_AND_LINE//URL_PATTERN_+'((:(\\d*):(\\d*))|(:(\\d*)))'
var FIREFOX_ARRAY_PART = '\\[\\d*\\]'
var FIREFOX_WEIRD_PART = '\\(\\?\\)'
var FIREFOX_COMPOUND_IDENTIFIER = '(('+IDENTIFIER_PATTERN_+'|'+FIREFOX_ARRAY_PART+'|'+FIREFOX_WEIRD_PART+')((\\(\\))?|(\\.|\\<|/)*))*'
var FIREFOX_FUNCTION_CALL = '('+FIREFOX_COMPOUND_IDENTIFIER+'|'+FIREFOX_STACKTRACE_JS_GETSOURCE_FAILURE+')@'+FIREFOX_FILE_AND_LINE
var FIREFOX_STACK_LINE = new RegExp('^'+FIREFOX_FUNCTION_CALL+'$')

var IE_WHITESPACE = '[\\w \\t]'
var IE_FILE_AND_LINE = FILE_AND_LINE
var IE_ANONYMOUS = '('+IE_WHITESPACE+'*({anonymous}\\(\\)))@\\('+IE_FILE_AND_LINE+'\\)'
var IE_NORMAL_FUNCTION = '('+IDENTIFIER_PATTERN_+')@'+IE_FILE_AND_LINE
var IE_FUNCTION_CALL = '('+IE_NORMAL_FUNCTION+'|'+IE_ANONYMOUS+')'+IE_WHITESPACE+'*'
var IE_STACK_LINE = new RegExp('^'+IE_FUNCTION_CALL+'$')

/***/ }),
/* 87 */
/*!**************************************************!*\
  !*** ../node_modules/stackinfo/exceptionMode.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



module.exports = exceptionMode(createException()) // basically what browser this is

// verbatim from `mode` in stacktrace.js as of 2014-01-23
function exceptionMode(e) {
    if (e['arguments'] && e.stack) {
        return 'chrome';
    } else if (e.stack && e.sourceURL) {
        return 'safari';
    } else if (e.stack && e.number) {
        return 'ie';
    } else if (typeof e.message === 'string' && typeof window !== 'undefined' && window.opera) {
        // e.message.indexOf("Backtrace:") > -1 -> opera
        // !e.stacktrace -> opera
        if (!e.stacktrace) {
            return 'opera9'; // use e.message
        }
        // 'opera#sourceloc' in e -> opera9, opera10a
        if (e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
            return 'opera9'; // use e.message
        }
        // e.stacktrace && !e.stack -> opera10a
        if (!e.stack) {
            return 'opera10a'; // use e.stacktrace
        }
        // e.stacktrace && e.stack -> opera10b
        if (e.stacktrace.indexOf("called from line") < 0) {
            return 'opera10b'; // use e.stacktrace, format differs from 'opera10a'
        }
        // e.stacktrace && e.stack -> opera11
        return 'opera11'; // use e.stacktrace, format differs from 'opera10a', 'opera10b'
    } else if (e.stack && !e.fileName) {
        // Chrome 27 does not have e.arguments as earlier versions,
        // but still does not have e.fileName as Firefox
        return 'chrome';
    } else if (e.stack) {
        return 'firefox';
    }
    return 'other';
}

function createException() {
    try {
        this.undef();
    } catch (e) {
        return e;
    }
}


/***/ }),
/* 88 */
/*!************************************!*\
  !*** ../node_modules/ajax/ajax.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Future = __webpack_require__(/*! async-future */ 5)

// returns the XHR function or equivalent for use with ajax
// memoizes the function for faster repeated use
var createXMLHTTPObject = function() {
    var versions = ["Msxml2.XMLHTTP",
                    "Msxml3.XMLHTTP",
                    "Microsoft.XMLHTTP",
                    "MSXML2.XmlHttp.6.0",
                    "MSXML2.XmlHttp.5.0",
                    "MSXML2.XmlHttp.4.0",
                    "MSXML2.XmlHttp.3.0",
                    "MSXML2.XmlHttp.2.0"
    ]

    if(XMLHttpRequest !== undefined) {  // For non-IE browsers
        createXMLHTTPObject = function() {  // Use memoization to cache the factory
            return new XMLHttpRequest()
        }
        return createXMLHTTPObject()

    } else { // IE
        for(var i=0, n=versions.length; i<n; i++) {
            try {
                var version = versions[i]
                var fn = function() {
                    return new ActiveXObject(version)
                }
                createXMLHTTPObject = fn   // Use memoization to cache the factory
                return createXMLHTTPObject()

            } catch(e) {   }
        }
    }

    throw new Error('Cant get XmlHttpRequest object')
}



var HEADER = "([^\\s]+): (.*)"

// returns the contents and headers from a given URL
exports = module.exports = function(url) {
    if(getFromCache(url))
        return getFromCache(url)

    var futureResult = new Future
    setOnCache(url, futureResult)

    var req = createXMLHTTPObject()
    req.onreadystatechange = function() {
        if( req.readyState === 4 ) {
            if( req.status === 200 ) {
                var headers = {}
                req.getAllResponseHeaders().split('\n').forEach(function(line) {
                    var match = line.match(HEADER)
                    if(match !== null) {
                        var name = match[1]
                        var value = match[2]

                        headers[name] = value
                    }
                })

                futureResult.return({text: req.responseText, headers: headers})

            } else {
                var error = new Error('Error in request: Status '+req.status)
                error.status = req.status
                futureResult.throw(error)
            }
        }
    }

    req.onerror = function(e) {
        futureResult.throw(e)
    }


    req.open('GET', url, asynchronous)
    try {
        req.send()
    } catch(e) {
        futureResult.throw(e)
    }

    return futureResult
}

var cache = {}
var getFromCache = function(url) {
    return cache[url]
}
var setOnCache = function(url, futureResponse) {
    cache[url] = futureResponse
}

var asynchronous = true
exports.setSynchronous = function(synchronous) { // this is here so I can work around this bug in chrome: https://code.google.com/p/chromium/issues/detail?id=368444
    asynchronous = !synchronous
}

exports.cacheGet = function(fn) {
    getFromCache = fn
}
exports.cacheSet = function(fn) {
    setOnCache = fn
}

/***/ }),
/* 89 */
/*!****************************************************************!*\
  !*** ../node_modules/source-map-resolve/source-map-resolve.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

// Note: source-map-resolve.js is generated from source-map-resolve-node.js and
// source-map-resolve-template.js. Only edit the two latter files, _not_
// source-map-resolve.js!

void (function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! source-map-url */ 92), __webpack_require__(/*! resolve-url */ 93)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof exports === "object") {
    var sourceMappingURL = require("source-map-url")
    var resolveUrl = require("resolve-url")
    module.exports = factory(sourceMappingURL, resolveUrl)
  } else {
    root.sourceMapResolve = factory(root.sourceMappingURL, root.resolveUrl)
  }
}(this, function(sourceMappingURL, resolveUrl) {

  function callbackAsync(callback, error, result) {
    setImmediate(function() { callback(error, result) })
  }

  function sig(name, codeOrMap, url, read, callback) {
    var type = (name.indexOf("Sources") >= 0 ? "map" : "code")

    var throwError = function(num, what, got) {
      throw new Error(
        name + " requires argument " + num + " to be " + what + ". Got:\n" + got
      )
    }

    if (type === "map") {
      if (typeof codeOrMap !== "object" || codeOrMap === null) {
        throwError(1, "a source map", codeOrMap)
      }
    } else {
      if (typeof codeOrMap !== "string") {
        throwError(1, "some code", codeOrMap)
      }
    }
    if (typeof url !== "string") {
      throwError(2, "the " + type + " url", url)
    }
    if (typeof read !== "function") {
      throwError(3, "a reading function", read)
    }
    if (arguments.length === 1 + 4 && typeof callback !== "function") {
      throwError(4, "a callback function", callback)
    }
  }

  function parseMapToJSON(string) {
    return JSON.parse(string.replace(/^\)\]\}'/, ""))
  }



  function resolveSourceMap(code, codeUrl, read, callback) {
    sig("resolveSourceMap", code, codeUrl, read, callback)
    var mapData
    try {
      mapData = resolveSourceMapHelper(code, codeUrl)
    } catch (error) {
      return callbackAsync(callback, error)
    }
    if (!mapData || mapData.map) {
      return callbackAsync(callback, null, mapData)
    }
    read(mapData.url, function(error, result) {
      if (error) {
        return callback(error)
      }
      try {
        mapData.map = parseMapToJSON(String(result))
      } catch (error) {
        return callback(error)
      }
      callback(null, mapData)
    })
  }

  function resolveSourceMapSync(code, codeUrl, read) {
    sig("resolveSourceMapSync", code, codeUrl, read)
    var mapData = resolveSourceMapHelper(code, codeUrl)
    if (!mapData || mapData.map) {
      return mapData
    }
    mapData.map = parseMapToJSON(String(read(mapData.url)))
    return mapData
  }

  var dataUriRegex = /^data:([^,;]*)(;[^,;]*)*(?:,(.*))?$/
  var jsonMimeTypeRegex = /^(?:application|text)\/json$/

  function resolveSourceMapHelper(code, codeUrl) {
    var url = sourceMappingURL.get(code)
    if (!url) {
      return null
    }

    var dataUri = url.match(dataUriRegex)
    if (dataUri) {
      var mimeType = dataUri[1]
      var lastParameter = dataUri[2]
      var encoded = dataUri[3]
      if (!jsonMimeTypeRegex.test(mimeType)) {
        throw new Error("Unuseful data uri mime type: " + (mimeType || "text/plain"))
      }
      return {
        sourceMappingURL: url,
        url: null,
        sourcesRelativeTo: codeUrl,
        map: parseMapToJSON(lastParameter === ";base64" ? atob(encoded) : decodeURIComponent(encoded))
      }
    }

    var mapUrl = resolveUrl(codeUrl, url)
    return {
      sourceMappingURL: url,
      url: mapUrl,
      sourcesRelativeTo: mapUrl,
      map: null
    }
  }



  function resolveSources(map, mapUrl, read, callback) {
    sig("resolveSources", map, mapUrl, read, callback)
    var pending = map.sources.length
    var errored = false
    var sources = []

    var done = function(error) {
      if (errored) {
        return
      }
      if (error) {
        errored = true
        return callback(error)
      }
      pending--
      if (pending === 0) {
        callback(null, sources)
      }
    }

    resolveSourcesHelper(map, mapUrl, function(fullUrl, sourceContent, index) {
      if (typeof sourceContent === "string") {
        sources[index] = sourceContent
        callbackAsync(done, null)
      } else {
        read(fullUrl, function(error, result) {
          sources[index] = String(result)
          done(error)
        })
      }
    })
  }

  function resolveSourcesSync(map, mapUrl, read) {
    sig("resolveSourcesSync", map, mapUrl, read)
    var sources = []
    resolveSourcesHelper(map, mapUrl, function(fullUrl, sourceContent, index) {
      if (typeof sourceContent === "string") {
        sources[index] = sourceContent
      } else {
        sources[index] = String(read(fullUrl))
      }
    })
    return sources
  }

  var endingSlash = /\/?$/

  function resolveSourcesHelper(map, mapUrl, fn) {
    var fullUrl
    var sourceContent
    for (var index = 0, len = map.sources.length; index < len; index++) {
      if (map.sourceRoot) {
        // Make sure that the sourceRoot ends with a slash, so that `/scripts/subdir` becomes
        // `/scripts/subdir/<source>`, not `/scripts/<source>`. Pointing to a file as source root
        // does not make sense.
        fullUrl = resolveUrl(mapUrl, map.sourceRoot.replace(endingSlash, "/"), map.sources[index])
      } else {
        fullUrl = resolveUrl(mapUrl, map.sources[index])
      }
      sourceContent = (map.sourceContents || [])[index]
      fn(fullUrl, sourceContent, index)
    }
  }



  function resolve(code, codeUrl, read, callback) {
    sig("resolve", code, codeUrl, read, callback)
    resolveSourceMap(code, codeUrl, read, function(error, mapData) {
      if (error) {
        return callback(error)
      }
      if (!mapData) {
        return callback(null, null)
      }
      resolveSources(mapData.map, mapData.sourcesRelativeTo, read, function(error, sources) {
        if (error) {
          return callback(error)
        }
        mapData.sources = sources
        callback(null, mapData)
      })
    })
  }

  function resolveSync(code, codeUrl, read) {
    sig("resolveSync", code, codeUrl, read)
    var mapData = resolveSourceMapSync(code, codeUrl, read)
    if (!mapData) {
      return null
    }
    mapData.sources = resolveSourcesSync(mapData.map, mapData.sourcesRelativeTo, read)
    return mapData
  }



  return {
    resolveSourceMap:     resolveSourceMap,
    resolveSourceMapSync: resolveSourceMapSync,
    resolveSources:       resolveSources,
    resolveSourcesSync:   resolveSourcesSync,
    resolve:              resolve,
    resolveSync:          resolveSync
  }

}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../timers-browserify/main.js */ 90).setImmediate))

/***/ }),
/* 90 */
/*!*************************************************!*\
  !*** ../node_modules/timers-browserify/main.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ 91);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 91 */
/*!****************************************************!*\
  !*** ../node_modules/setimmediate/setImmediate.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 6), __webpack_require__(/*! ./../process/browser.js */ 1)))

/***/ }),
/* 92 */
/*!********************************************************!*\
  !*** ../node_modules/source-map-url/source-map-url.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// Copyright 2014 Simon Lydell

void (function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof exports === "object") {
    module.exports = factory()
  } else {
    root.sourceMappingURL = factory()
  }
}(this, function(undefined) {

  var innerRegex = /[#@] sourceMappingURL=([^\s'"]*)/
  var newlineRegex = /\r\n?|\n/

  var regex = RegExp(
    "(^|(?:" + newlineRegex.source + "))" +
    "(?:" +
      "/\\*" +
      "(?:\\s*(?:" + newlineRegex.source + ")(?://)?)?" +
      "(?:" + innerRegex.source + ")" +
      "\\s*" +
      "\\*/" +
      "|" +
      "//(?:" + innerRegex.source + ")" +
    ")" +
    "\\s*$"
  )

  function SourceMappingURL(commentSyntax) {
    this._commentSyntax = commentSyntax
  }

  SourceMappingURL.prototype.regex = regex
  SourceMappingURL.prototype._innerRegex = innerRegex
  SourceMappingURL.prototype._newlineRegex = newlineRegex

  SourceMappingURL.prototype.get = function(code) {
    var match = code.match(this.regex)
    if (!match) {
      return null
    }
    return match[2] || match[3] || ""
  }

  SourceMappingURL.prototype.set = function(code, url, commentSyntax) {
    if (!commentSyntax) {
      commentSyntax = this._commentSyntax
    }
    // Use a newline present in the code, or fall back to '\n'.
    var newline = String(code.match(this._newlineRegex) || "\n")
    var open = commentSyntax[0], close = commentSyntax[1] || ""
    code = this.remove(code)
    return code + newline + open + "# sourceMappingURL=" + url + close
  }

  SourceMappingURL.prototype.remove = function(code) {
    return code.replace(this.regex, "")
  }

  SourceMappingURL.prototype.insertBefore = function(code, string) {
    var match = code.match(this.regex)
    if (match) {
      var hasNewline = Boolean(match[1])
      return code.slice(0, match.index) +
        string +
        (hasNewline ? "" : "\n") +
        code.slice(match.index)
    } else {
      return code + string
    }
  }

  SourceMappingURL.prototype.SourceMappingURL = SourceMappingURL

  return new SourceMappingURL(["/*", " */"])

}));


/***/ }),
/* 93 */
/*!**************************************************!*\
  !*** ../node_modules/resolve-url/resolve-url.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

void (function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof exports === "object") {
    module.exports = factory()
  } else {
    root.resolveUrl = factory()
  }
}(this, function() {

  function resolveUrl(/* ...urls */) {
    var numUrls = arguments.length

    if (numUrls === 0) {
      throw new Error("resolveUrl requires at least one argument; got none.")
    }

    var base = document.createElement("base")
    base.href = arguments[0]

    if (numUrls === 1) {
      return base.href
    }

    var head = document.getElementsByTagName("head")[0]
    head.insertBefore(base, head.firstChild)

    var a = document.createElement("a")
    var resolved

    for (var index = 1; index < numUrls; index++) {
      a.href = arguments[index]
      resolved = a.href
      base.href = resolved
    }

    head.removeChild(base)

    return resolved
  }

  return resolveUrl

}));


/***/ }),
/* 94 */
/*!**********************************************************!*\
  !*** ./node_modules/websocket.transport.browser.test.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var testUtils = __webpack_require__(/*! testUtils */ 14)

var json = __webpack_require__(/*! ../../serialization/json */ 97)
var wsBrowser = __webpack_require__(/*! ../../transport/ws.browser */ 98)
var msgpack = __webpack_require__(/*! ../../serialization/msgpack */ 99)

module.exports = function() {
    this.timeout(5000)
    
    var clientTests = __webpack_require__(/*! rpep.client.test */ 38)

    var testOptions = {
        clientErrorOptions: ['localhost', 6080],
        clientError: "Connection couldn\'t be opened: \nError: Websocket error event (probably means the connection couldn\'t be made or has been closed)",
        listenerErrorOptions: ['notAValidPort'], listenerError: "listen EACCES notAValidPort",
        rawMessages: testUtils.createRawMessageTests(json),
        nextClientOptions: function(lastOptions) {
            if(lastOptions === undefined) lastOptions = testOptions.clientErrorOptions
            return ['localhost', lastOptions[1]+1]
        }
    }



    var that = this
    this.test('rpep browser client with websockets', clientTests(wsBrowser, json, testOptions)).complete.then(function() {
        function getTransport() {
            return wsBrowser()
        }
                
        testOptions.rawMessages = testUtils.createRawMessageTests(msgpack)
        testOptions.clientErrorOptions[1] = 7080
        testOptions.nextClientOptions = function(lastOptions) {
            if(lastOptions === undefined) lastOptions = testOptions.clientErrorOptions
            return ['localhost', lastOptions[1]+1, {binaryType:'arraybuffer'}]
        }

        that.test('rpep browser client with binary websockets', clientTests(getTransport, msgpack, testOptions))
    })

}

/***/ }),
/* 95 */
/*!******************************************!*\
  !*** ./node_modules/rpep.server.test.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(/*! ../../utils */ 9)
var seq = __webpack_require__(/*! testUtils */ 14).seq
var rpep = __webpack_require__(/*! ../../rpep */ 36)

// options
    // listenerOptions - options to pass into each server.listen in the test
    // rawMessages - An array of 3 elements, where each element is an array with two elements:
        // the first element of each is the string message
        // the second element of each is a function that's passed the resulting raw message, and should return true if it matches what's expected based on the first element
module.exports = function(getTestTransport, testSerialization, options) {
    var lastOptions;
    var nextOptions = function() {
        lastOptions = options.nextListenerOptions(lastOptions)
        return lastOptions
    }

    return function() {

        //*

        this.test("connect and close", function() {
            this.test('basic successful connection, closed on connecting end', function(t) {
                this.count(2)
                
                var server = rpep(getTestTransport(), testSerialization)
                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                    t.ok(conn.connection !== undefined) // just check that its there
                    t.ok(conn.rawConnection !== undefined) // just check that its there
                    server.close()
                }))
            })
            this.test('basic successful connection, closed on listening end', function(t) {
                var connectionResolver = utils.resolver()

                var server = rpep(getTestTransport(), testSerialization)
                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                    setTimeout(function() {
                        conn.close()
                        server.close()
                    })
                }))
            })
            this.test('basic connection error(s)', function(t) {
                // nothing needs to happen here
            })
        })

        this.test("listen and close", function() {
            this.test('basic listen, closed on listening end', function(t) {
                this.count(5)

                var server = rpep(getTestTransport(), testSerialization)
                server.listen.apply(server, nextOptions().concat(function(request) {
                    t.ok(request.rawRequest !== undefined)

                    var conn = request.accept()
                    t.ok(conn !== undefined)
                    conn.on('close', function() {
                        t.ok(true)
                    })

                    conn.close()
                    server.close()
                })).then(function(){
                    t.ok(true)
                })

                server.on('close', function() {
                    t.ok(true)
                })
            })
            this.test('basic listen, closed on connecting end', function(t) {
                this.count(4)

                var server = rpep(getTestTransport(), testSerialization)
                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                    t.ok(conn !== undefined)
                    conn.on('close', function() {
                        t.ok(true)
                        server.close()
                    })
                })).then(function(){
                    t.ok(true)
                })

                server.on('close', function() {
                    t.ok(true)
                })
            })
            this.test('basic listen, rejection', function(t) {
                var server = rpep(getTestTransport(), testSerialization)
                server.listen.apply(server, nextOptions().concat(function(request) {
                    request.reject()
                    server.close()
                }))
            })
            this.test('basic listen error', function(t) {
                this.count(1)

                var server = rpep(getTestTransport(), testSerialization)
                server.on('error', function(e) {
                    t.eq(e.message, options.listenerError)
                })

                var listener = server.listen.apply(server, options.listenerErrorOptions.concat(function(request) {
                    t.ok(false)
                })).catch(function() {
                    server.close()
                })
            })
        })

        this.test("fire and receive", function(t) {
            this.count(10)

            var event = seq(function(eventName, req) {
                t.eq(eventName,'a')
                t.eq(req,undefined)
            },function(eventName, req) {
                t.eq(eventName,'b')
                t.eq(req,5)
            },function(eventName, e) {
                t.eq(eventName,'server error')
                t.ok(e instanceof Error)
                t.eq(e.message, 'error from client')
                t.eq(e.someData, 'client data')
            },function(eventName, e) {
                t.eq(eventName,'connection error')
                t.eq(e.message, 'ughhh')
            })


            var server = rpep(getTestTransport(), testSerialization)
            server.receive('a', function(req) {
                event('a', req)
                this.fire('d', 3, 4)
            })
            server.receive('b', function(req) {
                event('b', req)
                this.fire('error', new Error("error from server"))
            })
            server.receive('error', function(e) {
                event('server error', e)
                throw new Error("ughhh")
            })

            server.listen.apply(server, nextOptions().concat(function(request) {
                var conn = request.accept()
                conn.on('error', function(e) {
                    event('connection error', e)
                    server.close()
                })

                conn.fire('c')
            }))
        })

        this.test("request/response", function(t) {
            this.test("basic request/response", function(t) {
                this.count(20)

                var event = seq(function(eventName, id) {
                    t.eq(eventName,'a')
                    t.eq(id,1)
                },function(eventName, one, id) {
                    t.eq(eventName,'b')
                    t.eq(one,'hi')
                    t.eq(id,3)
                },function(eventName, one, two, id) {
                    t.eq(eventName,'c')
                    t.eq(one,99)
                    t.eq(two,'bwak')
                    t.eq(id,5)
                },function(eventName, result) {
                    t.eq(eventName,'d result')
                    t.eq(result, 3)
                },function(eventName, e) {
                    t.eq(eventName,'e error')
                    t.ok(e instanceof Error)
                    t.eq(e.message, "e error")
                },function(eventName, e) {
                    t.eq(eventName,'f error')
                    t.ok(e instanceof Error)
                    t.eq(e.message, "unexpectedPeerError")
                },function(eventName, e) {
                    t.eq(eventName,'server error')
                    t.ok(e instanceof Error)
                    t.eq(e.message, "Ay yay yaaay!")
                })


                var server = rpep(getTestTransport(), testSerialization)
                server.respond('a', function(id) {   // return normal value
                    event('a', id)
                    return 1
                })
                server.respond('b', function(one, id) {   // return promise error
                    event('b', one, id)

                    return new Promise(function(resolve, reject){
                        var error = new rpep.PeerError("b error")
                        error.someData = 'data'
                        throw error
                    })
                })
                server.respond('c', function(one, two, id) {   // fail on promise error (non-PeerError)
                    event('c', one, two, id)

                    var that = this
                    return this.request("d", 'yo', 'boy').then(function(result) {
                        event('d result', result)
                        return that.request('e')
                    }).catch(function(e){
                        event('e error', e)
                        return that.request('f')
                    }).catch(function(e) {
                        event('f error', e)
                        throw new Error("Ay yay yaaay!")
                    })
                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                    conn.on('error', function(e) {
                        event('server error',e)
                    })
                    conn.on('close', function() {
                        server.close()
                    })
                }))
            })

            this.test("multiple outstanding calls to the same request", function(t) {
                var server = rpep(getTestTransport(), testSerialization)
                var AResolvers = [], BResovler = utils.resolver()
                server.respond('a', function() {
                    var r = utils.resolver()
                    AResolvers.push(r)
                    if(AResolvers.length == 2) {
                        BResovler.resolve()
                    }

                    return r.f
                })
                server.receive('b', function() {
                    BResovler.f.then(function() {
                        AResolvers.forEach(function(r, index) {
                            r.resolve(index)
                        })
                    })
                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                    conn.on('close', function() {
                        server.close()
                    })
                }))
            })

            this.test('id discontinuity', function(t) {
                this.count(9)

                var event2;
                var event = seq(function(eventName, id) {
                    t.eq(eventName,'a')
                    t.eq(id,1)
                },function(eventName, prev,next) {
                    event2 = eventName
                    if(eventName === 'idDiscontinuity') {
                        t.eq(eventName, 'idDiscontinuity')
                        t.eq(prev, 3)
                        t.eq(next, 1)
                    } else {
                        var id = prev
                        t.eq(eventName,'a')
                        t.eq(id,3)
                    }
                },function(eventName, id, thirdParam) {
                    if(event2 === 'idDiscontinuity') {
                        t.eq(eventName,'a')
                        t.eq(id,3)
                    } else {
                        var prev = id, next = thirdParam
                        t.eq(eventName, 'idDiscontinuity')
                        t.eq(prev, 3)
                        t.eq(next, 1)
                    }
                },function(eventName, id) {
                    t.eq(eventName,'a')
                    t.eq(id,1)
                })

                
                var server = rpep(getTestTransport(), testSerialization)
                server.respond('a', function(id) {   // return normal value
                    event('a', id)
                    return 10
                })
                server.receive('idDiscontinuity', function(prev,next) {
                    event('idDiscontinuity', prev,next)
                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                    conn.on('close', function() {
                        server.close()
                    })
                }))
            })
        })

        this.test("event streams", function(t) {
            this.test('basic event streams', function(t) {
                this.count(20)

                var event = seq(function(eventName, id) {       // client-started event-stream
                    t.eq(eventName,'server a')
                    t.eq(id,1)
                },function(eventName, args) {
                    t.eq(eventName,'server two')
                    t.eq(args.length, 2)
                    t.eq(args[0], 'a')
                    t.eq(args[1], 'b')
                },function(eventName) {
                    t.eq(eventName,'server sendError')
                },function(eventName) {
                    t.eq(eventName,'server sendEnd')
                },function(eventName, e) {
                    t.eq(eventName,'server connection error')
                    t.eq(e.message, "NOOOOOOO")
                },function(eventName) {
                    t.eq(eventName,'server end')

                },function(eventName) {
                    t.eq(eventName,'server one2')
                },function(eventName, x) {
                    t.eq(eventName,'server two2')
                    t.eq(x,2)
                },function(eventName, x,y) {
                    t.eq(eventName,'server three2')
                    t.eq(x,3)
                    t.eq(y,4)
                },function(eventName, e) {
                    t.eq(eventName,'server error2')
                    t.eq(e.message, "whats up")
                },function(eventName) {
                    t.eq(eventName,'server end2')
                })


                var server = rpep(getTestTransport(), testSerialization)
                server.stream('a', function(stream, id) {   // return normal value
                    event('server a', id)
                    stream.emit('one')

                    var that = this
                    stream.onAny(function(eventName, args) {
                        var args = Array.prototype.slice.call(arguments,1)
                        event('server '+eventName, args)

                        if(eventName === 'two') {
                            stream.emit('two', 2)
                            stream.emit('three', 3, 4)
                        } else if(eventName === 'sendError') {
                            stream.emit('error', new Error("wut up"))
                        } else if(eventName === 'sendEnd') {
                            stream.emit('end')
                            throw new Error("NOOOOOOO")
                        } else if(eventName === 'end') {
                            var stream2 = that.streamConnect('b', 'one','two')
                            stream2.on('one', function() {
                                event('server one2')
                                stream2.emit('two', 'x','y')
                            })
                            stream2.on('two', function(x) {
                                event('server two2', x)
                            })
                            stream2.on('three', function(x, y) {
                                event('server three2', x, y)
                                stream2.emit('sendError')
                            })
                            stream2.on('error', function(e) {
                                event('server error2', e)
                                stream2.emit('doError')
                                stream2.emit('end', 5,6)
                            })
                            stream2.on('end', function() {
                                event('server end2')

                                server.close()
                            })
                        }
                    })
                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                    conn.on('error', function(e) {
                        event('server connection error',e)
                    })
                }))
            })

            this.test("multiple outstanding streams of the same command", function(t) {
                var endsReceived = 0

                var server = rpep(getTestTransport(), testSerialization)
                server.stream('a', function(stream, number, id) {   // return normal value
                    stream.on('x', function() {
                        stream.emit('hi', number)
                    })

                    stream.on('end', function() {
                        stream.emit('end') // confirm end

                        endsReceived++
                        if(endsReceived === 2) {
                            server.close()
                        }
                    })
                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                }))
            })

            this.test('event order numbers and order number discontinuity', function(t) {
                var server = rpep(getTestTransport(), testSerialization, {maxId: 2})
                server.stream('a', function(stream, number, id) {   // return normal value
                    stream.on('x', function() {
                        var args = Array.prototype.slice.call(arguments)
                        stream.emit.apply(stream, ['hi'].concat(args))
                    })
                    stream.on('end', function() {
                        stream.emit('end') // confirm end

                        server.close()
                    })
                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                }))
            })
        })

        this.test('sessionData', function(t) {
            this.count(7*2) // times 2 because two clients will connect

            var server = rpep(getTestTransport(), testSerialization), n=0
            server.receive('a', function() {
                t.eq(Object.keys(this.sessionData).length, 0)
                this.sessionData.x = 1
            })
            server.respond('b', function() {
                t.eq(Object.keys(this.sessionData).length, 1)
                t.eq(this.sessionData.x, 1)
                this.sessionData.x = 2
            })
            server.stream('c', function(stream) {   // return normal value
                t.eq(Object.keys(this.sessionData).length, 1)
                t.eq(this.sessionData.x, 2)
                this.sessionData.x = 3
                stream.emit('end')
            })
            server.receive('d', function() {
                t.eq(Object.keys(this.sessionData).length, 1)
                t.eq(this.sessionData.x, 3)

                n++
                if(n==2)
                    server.close()
            })

            server.listen.apply(server, nextOptions().concat(function(request) {
                var conn = request.accept()
            }))
        })

        this.test("rawHandle, preHandle, and default", function(t) {
            this.count(15)

            var event = seq(function(eventName, rawMessage) {   // first call
                t.eq(eventName,'server rawHandle')
                t.ok(options.rawMessages[0].matchTest(rawMessage), rawMessage)
            },function(eventName, message) {
                t.eq(eventName,'server preHandle')
                t.eq(message.length,1)
                t.eq(message[0],options.rawMessages[0].message)
            },function(eventName, message) {
                t.eq(eventName,'server default')
                t.eq(message.length,1)
                t.eq(message[0],'x')

            },function(eventName, rawMessage) {                  // second call
                t.eq(eventName,'server rawHandle')
                t.ok(options.rawMessages[1].matchTest(rawMessage), rawMessage)
            },function(eventName, message) {
                t.eq(eventName,'server preHandle')
                t.eq(message.length,1)
                t.eq(message[0],options.rawMessages[1].message)

            },function(eventName, rawMessage) {                  // third call
                t.eq(eventName,'server rawHandle')
                t.ok(options.rawMessages[2].matchTest(rawMessage), rawMessage)

                server.close()
            })


            var server = rpep(getTestTransport(), testSerialization)
            server.rawHandle(function(rawMessage) {
                event('server rawHandle',rawMessage)
                if(rawMessage.indexOf('ignoreMeRaw') !== -1) {
                    return 'ignore'
                }
            })
            server.preHandle(function(message) {
                event('server preHandle',message)
                if(message[0] === 'ignoreMe') {
                    return 'ignore'
                }
            })
            server.default(function(message) {
                event('server default',message)
            })

            server.listen.apply(server, nextOptions().concat(function(request) {
                var conn = request.accept()
            }))
        })

        this.test('default error handlers', function() {
            this.test("no 'error' receive handler", function(t) {
                this.count(1)

                var server = rpep(getTestTransport(), testSerialization)

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                    conn.on('error', function(e) {
                        t.eq(e.message, "unhandled error")

                        server.close()
                    })
                }))
            })
            this.test("no 'error' event handler", function(t) {
                this.count(1)

                var server = rpep(getTestTransport(), testSerialization)
                server.stream('a', function(stream) {

                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                    conn.on('error', function(e) {
                        t.eq(e.message, "unhandled error")

                        server.close()
                    })
                }))
            })
        })

        if(options.listenerNoOnClose) {
            this.test("close messages for transports that don't have onClose handlers", function(t) {
                this.count(2)

                var testTransportCopy = {}, testTransport = getTestTransport()
                for(var k in testTransport) {
                    testTransportCopy[k] = testTransport[k]
                }
                delete testTransportCopy.onClose

                var server = rpep(testTransportCopy, testSerialization)
                server.preHandle(function(c) {
                    t.eq(c[0], 'close')
                })

                server.listen.apply(server, options.listenerNoOnClose.concat(function(request) {
                    var conn = request.accept()

                    conn.on('close', function() {
                        t.ok(true)

                        server.close()
                    })
                }))
            })
        }

        if(options.testAcceptParameters) {
            this.test("test that you can pass transport-specific accept parameters", function(t) {
                this.count(1)

                var server = rpep(getTestTransport(), testSerialization)
                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept(t)
                    conn.close()
                    server.close()
                }))
            })
            this.test("test that you can pass transport-specific reject parameters", function(t) {
                this.count(1)

                var server = rpep(getTestTransport(), testSerialization)
                server.listen.apply(server, nextOptions().concat(function(request) {
                    request.reject(t)
                    server.close()
                }))
            })
        }

        this.test('errors', function(t) {
            this.test("basic errors", function(t) {
                var server = rpep(getTestTransport(), testSerialization)
                server.receive('endTest', function() {
                    server.close()
                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                }))
            })

            this.test("invalidId error", function(t) {
                var server = rpep(getTestTransport(), testSerialization)
                server.respond('a', function() {
                    t.ok(false) // won't get here
                })
                server.receive('endTest', function() {
                    server.close()
                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                }))
            })

            this.test("ensure no events can be emitted after sending 'end'", function(t) {
                var server = rpep(getTestTransport(), testSerialization)
                server.stream('a', function(emitter) {
                    emitter.on('end', function() {
                        server.close()
                    })
                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                }))
            })

            this.test("ensure no events can be received after receiving and sending 'end'", function(t) {
                this.count(1)

                var server = rpep(getTestTransport(), testSerialization)
                server.stream('a', function(emitter,id) {
                    var conn = this
                    emitter.on('end', function() {
                        emitter.emit('end')

                        setTimeout(function() { // ensure this \/ happens after the end event sent above
                            conn.connection.send(testSerialization.serialize([id, 'somethingElse']))
                        })
                    })
                })
                server.receive('error', function(e) {
                    t.eq(e.message, 'rpepIdNotFound')

                    server.close()
                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                }))
            })

            this.test("closeTimeout", function(t) {
                this.count(1)

                var server = rpep(getTestTransport(), testSerialization)
                server.respond('a', function() {
                    return this.request('x') // will never resolve
                })
                server.stream('b', function(emitter) {
                    // never sends 'end' event
                })
                server.stream('c', function(emitter) {
                    emitter.emit('end')       // never receives 'end' event
                })
                server.stream('d', function(emitter) {
                    // never sends nor receives an 'end' event
                })

                server.listen.apply(server, nextOptions().concat(function(request) {
                    var conn = request.accept()
                    conn.on('close', function() {
                        server.close()
                        t.ok(true)
                    })
                }))
            })
        })

        //*/
    }

}

/***/ }),
/* 96 */
/*!********************************!*\
  !*** ../DuplexEventEmitter.js ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var proto = __webpack_require__(/*! proto */ 13);
var EventEmitter = __webpack_require__(/*! eventemitter2 */ 37);
module.exports = proto(function () {
    this.init = function (onEmitHandler) {
        this._external = new EventEmitter({
            newListener: false
        });
        this._onEmitHandler = onEmitHandler;
    };
    this.emit = function (event) {
        if (this.ended) 
            throw new Error("Duplex Stream has already been ended.");
        this._onEmitHandler.apply(this._onEmitHandler, arguments);
    };
    this.on = function (event, handler) {
        this._external.on(event, handler);
    };
    this.off = (this.removeListener = function (event, handler) {
        this._external.removeListener(event, handler);
    });
    this.onAny = function (handler) {
        this._external.onAny(handler);
    };
    this.offAny = function (handler) {
        this._external.offAny(handler);
    };
});


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFxEdXBsZXhFdmVudEVtaXR0ZXIuanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEdBQUEsQ0FBSSxRQUFRLE9BQUEsQ0FBUTtBQUNwQixHQUFBLENBQUksZUFBZSxPQUFBLENBQVE7QUFHM0IsTUFBQSxDQUFPLE9BQVAsQ0FBQSxDQUFBLENBQWlCLEtBQUEsQ0FBTSxZQUFXO0lBQzlCLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZLFVBQVMsZUFBZTtRQUNoQyxJQUFBLENBQUssU0FBTCxDQUFBLENBQUEsQ0FBaUIsSUFBSSxZQUFKLENBQWlCO1lBQUMsYUFBYTs7UUFDaEQsSUFBQSxDQUFLLGNBQUwsQ0FBQSxDQUFBLENBQXNCO0lBQzlCO0lBRUksSUFBQSxDQUFLLElBQUwsQ0FBQSxDQUFBLENBQVksVUFBUyxPQUF5QjtRQUMxQyxJQUFHLElBQUEsQ0FBSztZQUFPLE1BQU0sSUFBSSxLQUFKLENBQVU7UUFDL0IsSUFBQSxDQUFLLGNBQUwsQ0FBb0IsS0FBcEIsQ0FBMEIsSUFBQSxDQUFLLGdCQUFnQjtJQUN2RDtJQUNJLElBQUEsQ0FBSyxFQUFMLENBQUEsQ0FBQSxDQUFVLFVBQVMsS0FBTSxFQUFBLFNBQVM7UUFDOUIsSUFBQSxDQUFLLFNBQUwsQ0FBZSxFQUFmLENBQWtCLE9BQU07SUFDaEM7SUFDSSxJQUFBLENBQUssR0FBTCxDQUFBLENBQUEsRUFBVyxJQUFBLENBQUssY0FBTCxDQUFBLENBQUEsQ0FBc0IsVUFBUyxLQUFPLEVBQUEsU0FBUztRQUN0RCxJQUFBLENBQUssU0FBTCxDQUFlLGNBQWYsQ0FBOEIsT0FBTTtJQUM1QztJQUNJLElBQUEsQ0FBSyxLQUFMLENBQUEsQ0FBQSxDQUFhLFVBQVMsU0FBUztRQUMzQixJQUFBLENBQUssU0FBTCxDQUFlLEtBQWYsQ0FBcUI7SUFDN0I7SUFDSSxJQUFBLENBQUssTUFBTCxDQUFBLENBQUEsQ0FBYyxVQUFTLFNBQVM7UUFDNUIsSUFBQSxDQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCO0lBQzlCO0FBQ0E7QUExQkEiLCJmaWxlIjoiRDpcXGJpbGx5c0ZpbGVcXGNvZGVcXGphdmFzY3JpcHRcXG1vZHVsZXNcXHJwZXAuanNcXER1cGxleEV2ZW50RW1pdHRlci5qcyhvcmlnaW5hbCkiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcHJvdG8gPSByZXF1aXJlKFwicHJvdG9cIilcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIyJylcblxuLy8gYW4gZXZlbnQgZW1pdHRlciB3aGVyZSBsaXN0ZW5pbmcgdG8gaXQgbGlzdGVucyB0byB0aGUgb3RoZXIgZW5kIGFuZCBlbWl0dGluZyBlbWl0cyB0byB0aGUgb3RoZXIgZW5kXG5tb2R1bGUuZXhwb3J0cyA9IHByb3RvKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKG9uRW1pdEhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fZXh0ZXJuYWwgPSBuZXcgRXZlbnRFbWl0dGVyKHtuZXdMaXN0ZW5lcjogZmFsc2V9KVxuICAgICAgICB0aGlzLl9vbkVtaXRIYW5kbGVyID0gb25FbWl0SGFuZGxlclxuICAgIH1cblxuICAgIHRoaXMuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50LyosIGFyZ3VtZW50cy4uLiovKSB7XG4gICAgICAgIGlmKHRoaXMuZW5kZWQpIHRocm93IG5ldyBFcnJvcihcIkR1cGxleCBTdHJlYW0gaGFzIGFscmVhZHkgYmVlbiBlbmRlZC5cIilcbiAgICAgICAgdGhpcy5fb25FbWl0SGFuZGxlci5hcHBseSh0aGlzLl9vbkVtaXRIYW5kbGVyLCBhcmd1bWVudHMpXG4gICAgfVxuICAgIHRoaXMub24gPSBmdW5jdGlvbihldmVudCxoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2V4dGVybmFsLm9uKGV2ZW50LGhhbmRsZXIpXG4gICAgfVxuICAgIHRoaXMub2ZmID0gdGhpcy5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2V4dGVybmFsLnJlbW92ZUxpc3RlbmVyKGV2ZW50LGhhbmRsZXIpXG4gICAgfVxuICAgIHRoaXMub25BbnkgPSBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2V4dGVybmFsLm9uQW55KGhhbmRsZXIpXG4gICAgfVxuICAgIHRoaXMub2ZmQW55ID0gZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICB0aGlzLl9leHRlcm5hbC5vZmZBbnkoaGFuZGxlcilcbiAgICB9XG59KSJdfQ==


/***/ }),
/* 97 */
/*!********************************!*\
  !*** ../serialization/json.js ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {
    serialize: function (javascriptObject) {
        return JSON.stringify(javascriptObject);
    },
    deserialize: function (serializedObject) {
        return JSON.parse(serializedObject);
    }
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFxzZXJpYWxpemF0aW9uXFxqc29uLmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFBLENBQU8sT0FBUCxDQUFBLENBQUEsQ0FBaUI7SUFDYixXQUFXLFVBQVMsa0JBQWtCO1FBQ2xDLE9BQU8sSUFBQSxDQUFLLFNBQUwsQ0FBZTtJQUM5QixDQUhpQixDQUFBO0lBSWIsYUFBYSxVQUFTLGtCQUFrQjtRQUNwQyxPQUFPLElBQUEsQ0FBSyxLQUFMLENBQVc7SUFDMUI7O0FBTkEiLCJmaWxlIjoiRDpcXGJpbGx5c0ZpbGVcXGNvZGVcXGphdmFzY3JpcHRcXG1vZHVsZXNcXHJwZXAuanNcXHNlcmlhbGl6YXRpb25cXGpzb24uanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uKGphdmFzY3JpcHRPYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoamF2YXNjcmlwdE9iamVjdClcclxuICAgIH0sXHJcbiAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24oc2VyaWFsaXplZE9iamVjdCkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNlcmlhbGl6ZWRPYmplY3QpXHJcbiAgICB9XHJcbn0iXX0=


/***/ }),
/* 98 */
/*!**********************************!*\
  !*** ../transport/ws.browser.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (transportOptions) {
    return {
        connect: function (host, port) {
            if (arguments.length <= 3) {
                var rpepOptions = arguments[2];
            } else {
                var connectionOptions = arguments[2];
                var rpepOptions = arguments[3];
            }
            if (!connectionOptions) 
                connectionOptions = {};
            if (!connectionOptions.protocol) 
                connectionOptions.protocol = 'ws';
            var wsConnection = new WebSocket(connectionOptions.protocol + '://' + host + ':' + port);
            if (connectionOptions.binaryType) 
                wsConnection.binaryType = connectionOptions.binaryType;
            return {
                send: function (m) {
                    wsConnection.send(m);
                },
                close: function () {
                    wsConnection.close();
                },
                onOpen: function (cb) {
                    wsConnection.onopen = cb;
                },
                onClose: function (cb) {
                    wsConnection.onclose = cb;
                },
                onMessage: function (cb) {
                    wsConnection.onmessage = function (m) {
                        cb(m.data);
                    };
                },
                onError: function (cb) {
                    wsConnection.onerror = function (e) {
                        if (e instanceof Event) {
                            var error = new Error('Websocket error event (probably means the connection couldn\'t be made or has been closed)');
                            error.event = e;
                            cb(error);
                        } else {
                            cb(e);
                        }
                    };
                },
                rawConnection: wsConnection
            };
        }
    };
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFx0cmFuc3BvcnRcXHdzLmJyb3dzZXIuanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQUEsQ0FBTyxPQUFQLENBQUEsQ0FBQSxDQUFpQixVQUFTLGtCQUFrQjtJQUN4QyxPQUFPO1FBSUgsU0FBUyxVQUFTLElBQU0sRUFBQSxNQUE0QztZQUNoRSxJQUFHLFNBQUEsQ0FBVSxNQUFWLENBQUEsRUFBQSxDQUFvQixHQUFHO2dCQUN0QixHQUFBLENBQUksY0FBYyxTQUFBLENBQVU7WUFDNUMsT0FBbUI7Z0JBQ0gsR0FBQSxDQUFJLG9CQUFvQixTQUFBLENBQVU7Z0JBQ2xDLEdBQUEsQ0FBSSxjQUFjLFNBQUEsQ0FBVTtZQUM1QztZQUVZLElBQUcsQ0FBQztnQkFBbUIsaUJBQUEsQ0FBQSxDQUFBLENBQW9CO1lBQzNDLElBQUcsQ0FBQyxpQkFBQSxDQUFrQjtnQkFBVSxpQkFBQSxDQUFrQixRQUFsQixDQUFBLENBQUEsQ0FBNkI7WUFFN0QsR0FBQSxDQUFJLGVBQWUsSUFBSSxTQUFKLENBQWMsaUJBQUEsQ0FBa0IsUUFBbEIsQ0FBQSxDQUFBLENBQTJCLEtBQTNCLENBQUEsQ0FBQSxDQUFpQyxJQUFqQyxDQUFBLENBQUEsQ0FBc0MsR0FBdEMsQ0FBQSxDQUFBLENBQTBDO1lBQzNFLElBQUcsaUJBQUEsQ0FBa0I7Z0JBQ2pCLFlBQUEsQ0FBYSxVQUFiLENBQUEsQ0FBQSxDQUEwQixpQkFBQSxDQUFrQjtZQUVoRCxPQUFPO2dCQUNILE1BQU0sVUFBUyxHQUFHO29CQUNkLFlBQUEsQ0FBYSxJQUFiLENBQWtCO2dCQUN0QyxDQUhtQixDQUFBO2dCQUlILE9BQU8sWUFBVztvQkFDZCxZQUFBLENBQWEsS0FBYjtnQkFDcEIsQ0FObUIsQ0FBQTtnQkFPSCxRQUFRLFVBQVMsSUFBSTtvQkFDakIsWUFBQSxDQUFhLE1BQWIsQ0FBQSxDQUFBLENBQXNCO2dCQUMxQyxDQVRtQixDQUFBO2dCQVVILFNBQVMsVUFBUyxJQUFJO29CQUNsQixZQUFBLENBQWEsT0FBYixDQUFBLENBQUEsQ0FBdUI7Z0JBQzNDLENBWm1CLENBQUE7Z0JBYUgsV0FBVyxVQUFTLElBQUk7b0JBQ3BCLFlBQUEsQ0FBYSxTQUFiLENBQUEsQ0FBQSxDQUF5QixVQUFTLEdBQUc7d0JBQ2pDLEVBQUEsQ0FBRyxDQUFBLENBQUU7b0JBQzdCO2dCQUNBLENBakJtQixDQUFBO2dCQWtCSCxTQUFTLFVBQVMsSUFBSTtvQkFDbEIsWUFBQSxDQUFhLE9BQWIsQ0FBQSxDQUFBLENBQXVCLFVBQVMsR0FBRzt3QkFDL0IsSUFBRyxDQUFBLENBQUEsVUFBQSxDQUFhLE9BQU87NEJBQ25CLEdBQUEsQ0FBSSxRQUFRLElBQUksS0FBSixDQUFVOzRCQUN0QixLQUFBLENBQU0sS0FBTixDQUFBLENBQUEsQ0FBYzs0QkFDZCxFQUFBLENBQUc7d0JBQy9CLE9BQStCOzRCQUNILEVBQUEsQ0FBRzt3QkFDL0I7b0JBQ0E7Z0JBQ0EsQ0E1Qm1CLENBQUE7Z0JBNkJILGVBQWU7O1FBRS9COztBQUVBO0FBckRBIiwiZmlsZSI6IkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFx0cmFuc3BvcnRcXHdzLmJyb3dzZXIuanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0cmFuc3BvcnRPcHRpb25zKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vIGNvbm5lY3Rpb25PcHRpb25zXHJcbiAgICAgICAgICAgIC8vIGJpbmFyeVR5cGUgLSBUaGUgYmluYXJ5VHlwZSBwcm9wZXJ0eSBvZiBhIHdlYnNvY2tldCBjb25uZWN0aW9uXHJcbiAgICAgICAgICAgIC8vIHByb3RvY29sIC0gKERlZmF1bHQ6ICd3cycpIEVpdGhlciAnd3NzJyBvciAnd3MnXHJcbiAgICAgICAgY29ubmVjdDogZnVuY3Rpb24oaG9zdCwgcG9ydC8qLCBbY29ubmVjdGlvbk9wdGlvbnMsXSBycGVwT3B0aW9ucyovKSB7XHJcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPD0gMykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJwZXBPcHRpb25zID0gYXJndW1lbnRzWzJdXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29ubmVjdGlvbk9wdGlvbnMgPSBhcmd1bWVudHNbMl1cclxuICAgICAgICAgICAgICAgIHZhciBycGVwT3B0aW9ucyA9IGFyZ3VtZW50c1szXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighY29ubmVjdGlvbk9wdGlvbnMpIGNvbm5lY3Rpb25PcHRpb25zID0ge31cclxuICAgICAgICAgICAgaWYoIWNvbm5lY3Rpb25PcHRpb25zLnByb3RvY29sKSBjb25uZWN0aW9uT3B0aW9ucy5wcm90b2NvbCA9ICd3cydcclxuXHJcbiAgICAgICAgICAgIHZhciB3c0Nvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KGNvbm5lY3Rpb25PcHRpb25zLnByb3RvY29sKyc6Ly8nK2hvc3QrJzonK3BvcnQpXHJcbiAgICAgICAgICAgIGlmKGNvbm5lY3Rpb25PcHRpb25zLmJpbmFyeVR5cGUpXHJcbiAgICAgICAgICAgICAgICB3c0Nvbm5lY3Rpb24uYmluYXJ5VHlwZSA9IGNvbm5lY3Rpb25PcHRpb25zLmJpbmFyeVR5cGVcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzZW5kOiBmdW5jdGlvbihtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3NDb25uZWN0aW9uLnNlbmQobSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3NDb25uZWN0aW9uLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbk9wZW46IGZ1bmN0aW9uKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3NDb25uZWN0aW9uLm9ub3BlbiA9IGNiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DbG9zZTogZnVuY3Rpb24oY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICB3c0Nvbm5lY3Rpb24ub25jbG9zZSA9IGNiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25NZXNzYWdlOiBmdW5jdGlvbihjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdzQ29ubmVjdGlvbi5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKG0uZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25FcnJvcjogZnVuY3Rpb24oY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICB3c0Nvbm5lY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZSBpbnN0YW5jZW9mIEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ1dlYnNvY2tldCBlcnJvciBldmVudCAocHJvYmFibHkgbWVhbnMgdGhlIGNvbm5lY3Rpb24gY291bGRuXFwndCBiZSBtYWRlIG9yIGhhcyBiZWVuIGNsb3NlZCknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IuZXZlbnQgPSBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmF3Q29ubmVjdGlvbjogd3NDb25uZWN0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=


/***/ }),
/* 99 */
/*!***********************************!*\
  !*** ../serialization/msgpack.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var msgpack = __webpack_require__(/*! msgpack-lite */ 100);
module.exports = {
    serialize: function (javascriptObject) {
        return msgpack.encode(javascriptObject);
    },
    deserialize: function (serializedObject) {
        if (serializedObject instanceof ArrayBuffer) {
            serializedObject = new Uint8Array(serializedObject);
        }
        return msgpack.decode(serializedObject);
    }
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFxzZXJpYWxpemF0aW9uXFxtc2dwYWNrLmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxHQUFBLENBQUksVUFBVSxPQUFBLENBQVE7QUFFdEIsTUFBQSxDQUFPLE9BQVAsQ0FBQSxDQUFBLENBQWlCO0lBQ2IsV0FBVyxVQUFTLGtCQUFrQjtRQUNsQyxPQUFPLE9BQUEsQ0FBUSxNQUFSLENBQWU7SUFDOUIsQ0FIaUIsQ0FBQTtJQUliLGFBQWEsVUFBUyxrQkFBa0I7UUFHcEMsSUFBRyxnQkFBQSxDQUFBLFVBQUEsQ0FBNEIsYUFBYTtZQUN4QyxnQkFBQSxDQUFBLENBQUEsQ0FBbUIsSUFBSSxVQUFKLENBQWU7UUFDOUM7UUFFUSxPQUFPLE9BQUEsQ0FBUSxNQUFSLENBQWU7SUFDOUI7O0FBZEEiLCJmaWxlIjoiRDpcXGJpbGx5c0ZpbGVcXGNvZGVcXGphdmFzY3JpcHRcXG1vZHVsZXNcXHJwZXAuanNcXHNlcmlhbGl6YXRpb25cXG1zZ3BhY2suanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1zZ3BhY2sgPSByZXF1aXJlKFwibXNncGFjay1saXRlXCIpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24oamF2YXNjcmlwdE9iamVjdCkge1xyXG4gICAgICAgIHJldHVybiBtc2dwYWNrLmVuY29kZShqYXZhc2NyaXB0T2JqZWN0KVxyXG4gICAgfSxcclxuICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbihzZXJpYWxpemVkT2JqZWN0KSB7XHJcbiAgICAgICAgLy8gbm90IHN1cmUgaWYgdGhpcyBpcyB0aGUgcmlnaHQgcGxhY2UgdG8gZG8gdGhpcywgYnV0IHdpdGhvdXQgaXQsIGRlc2VyaWFsaXphdGlvbiBmYWlscyBmb3IgYnJvd3NlciB3ZWJzb2NrZXRzXHJcbiAgICAgICAgLy8gc2hvdWxkIHRoaXMgYmUgZG9uZSBpbiB0aGUgd3MuYnJvd3NlciB0cmFuc3BvcnQgbW9kdWxlLCBpbnN0ZWFkP1xyXG4gICAgICAgIGlmKHNlcmlhbGl6ZWRPYmplY3QgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgICAgICBzZXJpYWxpemVkT2JqZWN0ID0gbmV3IFVpbnQ4QXJyYXkoc2VyaWFsaXplZE9iamVjdClcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG1zZ3BhY2suZGVjb2RlKHNlcmlhbGl6ZWRPYmplY3QpXHJcbiAgICB9XHJcbn0iXX0=


/***/ }),
/* 100 */
/*!***************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/browser.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// browser.js

exports.encode = __webpack_require__(/*! ./encode */ 39).encode;
exports.decode = __webpack_require__(/*! ./decode */ 44).decode;

exports.Encoder = __webpack_require__(/*! ./encoder */ 112).Encoder;
exports.Decoder = __webpack_require__(/*! ./decoder */ 113).Decoder;

exports.createCodec = __webpack_require__(/*! ./ext */ 114).createCodec;
exports.codec = __webpack_require__(/*! ./codec */ 115).codec;


/***/ }),
/* 101 */
/*!*********************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/buffer-global.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/* globals Buffer */

module.exports =
  c(("undefined" !== typeof Buffer) && Buffer) ||
  c(this.Buffer) ||
  c(("undefined" !== typeof window) && window.Buffer) ||
  this.Buffer;

function c(B) {
  return B && B.isBuffer && B;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../buffer/index.js */ 41).Buffer))

/***/ }),
/* 102 */
/*!******************************************!*\
  !*** ../node_modules/base64-js/index.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 103 */
/*!***********************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/bufferish-array.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// bufferish-array.js

var Bufferish = __webpack_require__(/*! ./bufferish */ 0);

var exports = module.exports = alloc(0);

exports.alloc = alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Array(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Array}
 */

function from(value) {
  if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) {
    // TypedArray to Uint8Array
    value = Bufferish.Uint8Array.from(value);
  } else if (Bufferish.isArrayBuffer(value)) {
    // ArrayBuffer to Uint8Array
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    // String to Array
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  // Array-like to Array
  return Array.prototype.slice.call(value);
}


/***/ }),
/* 104 */
/*!************************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/bufferish-buffer.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// bufferish-buffer.js

var Bufferish = __webpack_require__(/*! ./bufferish */ 0);
var Buffer = Bufferish.global;

var exports = module.exports = Bufferish.hasBuffer ? alloc(0) : [];

exports.alloc = Bufferish.hasBuffer && Buffer.alloc || alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Buffer(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer}
 */

function from(value) {
  if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) {
    // TypedArray to Uint8Array
    value = Bufferish.Uint8Array.from(value);
  } else if (Bufferish.isArrayBuffer(value)) {
    // ArrayBuffer to Uint8Array
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    // String to Buffer
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  // Array-like to Buffer
  if (Buffer.from && Buffer.from.length !== 1) {
    return Buffer.from(value); // node v6+
  } else {
    return new Buffer(value); // node v4
  }
}


/***/ }),
/* 105 */
/*!****************************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/bufferish-uint8array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// bufferish-uint8array.js

var Bufferish = __webpack_require__(/*! ./bufferish */ 0);

var exports = module.exports = Bufferish.hasArrayBuffer ? alloc(0) : [];

exports.alloc = alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Uint8Array(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Uint8Array}
 */

function from(value) {
  if (Bufferish.isView(value)) {
    // TypedArray to ArrayBuffer
    var byteOffset = value.byteOffset;
    var byteLength = value.byteLength;
    value = value.buffer;
    if (value.byteLength !== byteLength) {
      if (value.slice) {
        value = value.slice(byteOffset, byteOffset + byteLength);
      } else {
        // Android 4.1 does not have ArrayBuffer.prototype.slice
        value = new Uint8Array(value);
        if (value.byteLength !== byteLength) {
          // TypedArray to ArrayBuffer to Uint8Array to Array
          value = Array.prototype.slice.call(value, byteOffset, byteOffset + byteLength);
        }
      }
    }
  } else if (typeof value === "string") {
    // String to Uint8Array
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  return new Uint8Array(value);
}


/***/ }),
/* 106 */
/*!*******************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/buffer-lite.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// buffer-lite.js

var MAXBUFLEN = 8192;

exports.copy = copy;
exports.toString = toString;
exports.write = write;

/**
 * Buffer.prototype.write()
 *
 * @param string {String}
 * @param [offset] {Number}
 * @returns {Number}
 */

function write(string, offset) {
  var buffer = this;
  var index = offset || (offset |= 0);
  var length = string.length;
  var chr = 0;
  var i = 0;
  while (i < length) {
    chr = string.charCodeAt(i++);

    if (chr < 128) {
      buffer[index++] = chr;
    } else if (chr < 0x800) {
      // 2 bytes
      buffer[index++] = 0xC0 | (chr >>> 6);
      buffer[index++] = 0x80 | (chr & 0x3F);
    } else if (chr < 0xD800 || chr > 0xDFFF) {
      // 3 bytes
      buffer[index++] = 0xE0 | (chr  >>> 12);
      buffer[index++] = 0x80 | ((chr >>> 6)  & 0x3F);
      buffer[index++] = 0x80 | (chr          & 0x3F);
    } else {
      // 4 bytes - surrogate pair
      chr = (((chr - 0xD800) << 10) | (string.charCodeAt(i++) - 0xDC00)) + 0x10000;
      buffer[index++] = 0xF0 | (chr >>> 18);
      buffer[index++] = 0x80 | ((chr >>> 12) & 0x3F);
      buffer[index++] = 0x80 | ((chr >>> 6)  & 0x3F);
      buffer[index++] = 0x80 | (chr          & 0x3F);
    }
  }
  return index - offset;
}

/**
 * Buffer.prototype.toString()
 *
 * @param [encoding] {String} ignored
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {String}
 */

function toString(encoding, start, end) {
  var buffer = this;
  var index = start|0;
  if (!end) end = buffer.length;
  var string = '';
  var chr = 0;

  while (index < end) {
    chr = buffer[index++];
    if (chr < 128) {
      string += String.fromCharCode(chr);
      continue;
    }

    if ((chr & 0xE0) === 0xC0) {
      // 2 bytes
      chr = (chr & 0x1F) << 6 |
            (buffer[index++] & 0x3F);

    } else if ((chr & 0xF0) === 0xE0) {
      // 3 bytes
      chr = (chr & 0x0F)             << 12 |
            (buffer[index++] & 0x3F) << 6  |
            (buffer[index++] & 0x3F);

    } else if ((chr & 0xF8) === 0xF0) {
      // 4 bytes
      chr = (chr & 0x07)             << 18 |
            (buffer[index++] & 0x3F) << 12 |
            (buffer[index++] & 0x3F) << 6  |
            (buffer[index++] & 0x3F);
    }

    if (chr >= 0x010000) {
      // A surrogate pair
      chr -= 0x010000;

      string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
    } else {
      string += String.fromCharCode(chr);
    }
  }

  return string;
}

/**
 * Buffer.prototype.copy()
 *
 * @param target {Buffer}
 * @param [targetStart] {Number}
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {number}
 */

function copy(target, targetStart, start, end) {
  var i;
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (!targetStart) targetStart = 0;
  var len = end - start;

  if (target === this && start < targetStart && targetStart < end) {
    // descending
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    // ascending
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start];
    }
  }

  return len;
}


/***/ }),
/* 107 */
/*!******************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/ext-packer.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// ext-packer.js

exports.setExtPackers = setExtPackers;

var Bufferish = __webpack_require__(/*! ./bufferish */ 0);
var Buffer = Bufferish.global;
var packTypedArray = Bufferish.Uint8Array.from;
var _encode;

var ERROR_COLUMNS = {name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1};

function setExtPackers(codec) {
  codec.addExtPacker(0x0E, Error, [packError, encode]);
  codec.addExtPacker(0x01, EvalError, [packError, encode]);
  codec.addExtPacker(0x02, RangeError, [packError, encode]);
  codec.addExtPacker(0x03, ReferenceError, [packError, encode]);
  codec.addExtPacker(0x04, SyntaxError, [packError, encode]);
  codec.addExtPacker(0x05, TypeError, [packError, encode]);
  codec.addExtPacker(0x06, URIError, [packError, encode]);

  codec.addExtPacker(0x0A, RegExp, [packRegExp, encode]);
  codec.addExtPacker(0x0B, Boolean, [packValueOf, encode]);
  codec.addExtPacker(0x0C, String, [packValueOf, encode]);
  codec.addExtPacker(0x0D, Date, [Number, encode]);
  codec.addExtPacker(0x0F, Number, [packValueOf, encode]);

  if ("undefined" !== typeof Uint8Array) {
    codec.addExtPacker(0x11, Int8Array, packTypedArray);
    codec.addExtPacker(0x12, Uint8Array, packTypedArray);
    codec.addExtPacker(0x13, Int16Array, packTypedArray);
    codec.addExtPacker(0x14, Uint16Array, packTypedArray);
    codec.addExtPacker(0x15, Int32Array, packTypedArray);
    codec.addExtPacker(0x16, Uint32Array, packTypedArray);
    codec.addExtPacker(0x17, Float32Array, packTypedArray);

    // PhantomJS/1.9.7 doesn't have Float64Array
    if ("undefined" !== typeof Float64Array) {
      codec.addExtPacker(0x18, Float64Array, packTypedArray);
    }

    // IE10 doesn't have Uint8ClampedArray
    if ("undefined" !== typeof Uint8ClampedArray) {
      codec.addExtPacker(0x19, Uint8ClampedArray, packTypedArray);
    }

    codec.addExtPacker(0x1A, ArrayBuffer, packTypedArray);
    codec.addExtPacker(0x1D, DataView, packTypedArray);
  }

  if (Bufferish.hasBuffer) {
    codec.addExtPacker(0x1B, Buffer, Bufferish.from);
  }
}

function encode(input) {
  if (!_encode) _encode = __webpack_require__(/*! ./encode */ 39).encode; // lazy load
  return _encode(input);
}

function packValueOf(value) {
  return (value).valueOf();
}

function packRegExp(value) {
  value = RegExp.prototype.toString.call(value).split("/");
  value.shift();
  var out = [value.pop()];
  out.unshift(value.join("/"));
  return out;
}

function packError(value) {
  var out = {};
  for (var key in ERROR_COLUMNS) {
    out[key] = value[key];
  }
  return out;
}


/***/ }),
/* 108 */
/*!******************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/write-type.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// write-type.js

var IS_ARRAY = __webpack_require__(/*! isarray */ 10);
var Int64Buffer = __webpack_require__(/*! int64-buffer */ 19);
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

var Bufferish = __webpack_require__(/*! ./bufferish */ 0);
var BufferProto = __webpack_require__(/*! ./bufferish-proto */ 18);
var WriteToken = __webpack_require__(/*! ./write-token */ 109);
var uint8 = __webpack_require__(/*! ./write-uint8 */ 42).uint8;
var ExtBuffer = __webpack_require__(/*! ./ext-buffer */ 16).ExtBuffer;

var HAS_UINT8ARRAY = ("undefined" !== typeof Uint8Array);
var HAS_MAP = ("undefined" !== typeof Map);

var extmap = [];
extmap[1] = 0xd4;
extmap[2] = 0xd5;
extmap[4] = 0xd6;
extmap[8] = 0xd7;
extmap[16] = 0xd8;

exports.getWriteType = getWriteType;

function getWriteType(options) {
  var token = WriteToken.getWriteToken(options);
  var useraw = options && options.useraw;
  var binarraybuffer = HAS_UINT8ARRAY && options && options.binarraybuffer;
  var isBuffer = binarraybuffer ? Bufferish.isArrayBuffer : Bufferish.isBuffer;
  var bin = binarraybuffer ? bin_arraybuffer : bin_buffer;
  var usemap = HAS_MAP && options && options.usemap;
  var map = usemap ? map_to_map : obj_to_map;

  var writeType = {
    "boolean": bool,
    "function": nil,
    "number": number,
    "object": (useraw ? object_raw : object),
    "string": _string(useraw ? raw_head_size : str_head_size),
    "symbol": nil,
    "undefined": nil
  };

  return writeType;

  // false -- 0xc2
  // true -- 0xc3
  function bool(encoder, value) {
    var type = value ? 0xc3 : 0xc2;
    token[type](encoder, value);
  }

  function number(encoder, value) {
    var ivalue = value | 0;
    var type;
    if (value !== ivalue) {
      // float 64 -- 0xcb
      type = 0xcb;
      token[type](encoder, value);
      return;
    } else if (-0x20 <= ivalue && ivalue <= 0x7F) {
      // positive fixint -- 0x00 - 0x7f
      // negative fixint -- 0xe0 - 0xff
      type = ivalue & 0xFF;
    } else if (0 <= ivalue) {
      // uint 8 -- 0xcc
      // uint 16 -- 0xcd
      // uint 32 -- 0xce
      type = (ivalue <= 0xFF) ? 0xcc : (ivalue <= 0xFFFF) ? 0xcd : 0xce;
    } else {
      // int 8 -- 0xd0
      // int 16 -- 0xd1
      // int 32 -- 0xd2
      type = (-0x80 <= ivalue) ? 0xd0 : (-0x8000 <= ivalue) ? 0xd1 : 0xd2;
    }
    token[type](encoder, ivalue);
  }

  // uint 64 -- 0xcf
  function uint64(encoder, value) {
    var type = 0xcf;
    token[type](encoder, value.toArray());
  }

  // int 64 -- 0xd3
  function int64(encoder, value) {
    var type = 0xd3;
    token[type](encoder, value.toArray());
  }

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  // fixstr -- 0xa0 - 0xbf
  function str_head_size(length) {
    return (length < 32) ? 1 : (length <= 0xFF) ? 2 : (length <= 0xFFFF) ? 3 : 5;
  }

  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  // fixraw -- 0xa0 - 0xbf
  function raw_head_size(length) {
    return (length < 32) ? 1 : (length <= 0xFFFF) ? 3 : 5;
  }

  function _string(head_size) {
    return string;

    function string(encoder, value) {
      // prepare buffer
      var length = value.length;
      var maxsize = 5 + length * 3;
      encoder.offset = encoder.reserve(maxsize);
      var buffer = encoder.buffer;

      // expected header size
      var expected = head_size(length);

      // expected start point
      var start = encoder.offset + expected;

      // write string
      length = BufferProto.write.call(buffer, value, start);

      // actual header size
      var actual = head_size(length);

      // move content when needed
      if (expected !== actual) {
        var targetStart = start + actual - expected;
        var end = start + length;
        BufferProto.copy.call(buffer, buffer, targetStart, start, end);
      }

      // write header
      var type = (actual === 1) ? (0xa0 + length) : (actual <= 3) ? (0xd7 + actual) : 0xdb;
      token[type](encoder, length);

      // move cursor
      encoder.offset += length;
    }
  }

  function object(encoder, value) {
    // null
    if (value === null) return nil(encoder, value);

    // Buffer
    if (isBuffer(value)) return bin(encoder, value);

    // Array
    if (IS_ARRAY(value)) return array(encoder, value);

    // int64-buffer objects
    if (Uint64BE.isUint64BE(value)) return uint64(encoder, value);
    if (Int64BE.isInt64BE(value)) return int64(encoder, value);

    // ext formats
    var packer = encoder.codec.getExtPacker(value);
    if (packer) value = packer(value);
    if (value instanceof ExtBuffer) return ext(encoder, value);

    // plain old Objects or Map
    map(encoder, value);
  }

  function object_raw(encoder, value) {
    // Buffer
    if (isBuffer(value)) return raw(encoder, value);

    // others
    object(encoder, value);
  }

  // nil -- 0xc0
  function nil(encoder, value) {
    var type = 0xc0;
    token[type](encoder, value);
  }

  // fixarray -- 0x90 - 0x9f
  // array 16 -- 0xdc
  // array 32 -- 0xdd
  function array(encoder, value) {
    var length = value.length;
    var type = (length < 16) ? (0x90 + length) : (length <= 0xFFFF) ? 0xdc : 0xdd;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    for (var i = 0; i < length; i++) {
      encode(encoder, value[i]);
    }
  }

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  function bin_buffer(encoder, value) {
    var length = value.length;
    var type = (length < 0xFF) ? 0xc4 : (length <= 0xFFFF) ? 0xc5 : 0xc6;
    token[type](encoder, length);
    encoder.send(value);
  }

  function bin_arraybuffer(encoder, value) {
    bin_buffer(encoder, new Uint8Array(value));
  }

  // fixext 1 -- 0xd4
  // fixext 2 -- 0xd5
  // fixext 4 -- 0xd6
  // fixext 8 -- 0xd7
  // fixext 16 -- 0xd8
  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  function ext(encoder, value) {
    var buffer = value.buffer;
    var length = buffer.length;
    var type = extmap[length] || ((length < 0xFF) ? 0xc7 : (length <= 0xFFFF) ? 0xc8 : 0xc9);
    token[type](encoder, length);
    uint8[value.type](encoder);
    encoder.send(buffer);
  }

  // fixmap -- 0x80 - 0x8f
  // map 16 -- 0xde
  // map 32 -- 0xdf
  function obj_to_map(encoder, value) {
    var keys = Object.keys(value);
    var length = keys.length;
    var type = (length < 16) ? (0x80 + length) : (length <= 0xFFFF) ? 0xde : 0xdf;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    keys.forEach(function(key) {
      encode(encoder, key);
      encode(encoder, value[key]);
    });
  }

  // fixmap -- 0x80 - 0x8f
  // map 16 -- 0xde
  // map 32 -- 0xdf
  function map_to_map(encoder, value) {
    if (!(value instanceof Map)) return obj_to_map(encoder, value);

    var length = value.size;
    var type = (length < 16) ? (0x80 + length) : (length <= 0xFFFF) ? 0xde : 0xdf;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    value.forEach(function(val, key, m) {
      encode(encoder, key);
      encode(encoder, val);
    });
  }

  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  // fixraw -- 0xa0 - 0xbf
  function raw(encoder, value) {
    var length = value.length;
    var type = (length < 32) ? (0xa0 + length) : (length <= 0xFFFF) ? 0xda : 0xdb;
    token[type](encoder, length);
    encoder.send(value);
  }
}


/***/ }),
/* 109 */
/*!*******************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/write-token.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// write-token.js

var ieee754 = __webpack_require__(/*! ieee754 */ 17);
var Int64Buffer = __webpack_require__(/*! int64-buffer */ 19);
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

var uint8 = __webpack_require__(/*! ./write-uint8 */ 42).uint8;
var Bufferish = __webpack_require__(/*! ./bufferish */ 0);
var Buffer = Bufferish.global;
var IS_BUFFER_SHIM = Bufferish.hasBuffer && ("TYPED_ARRAY_SUPPORT" in Buffer);
var NO_TYPED_ARRAY = IS_BUFFER_SHIM && !Buffer.TYPED_ARRAY_SUPPORT;
var Buffer_prototype = Bufferish.hasBuffer && Buffer.prototype || {};

exports.getWriteToken = getWriteToken;

function getWriteToken(options) {
  if (options && options.uint8array) {
    return init_uint8array();
  } else if (NO_TYPED_ARRAY || (Bufferish.hasBuffer && options && options.safe)) {
    return init_safe();
  } else {
    return init_token();
  }
}

function init_uint8array() {
  var token = init_token();

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, writeFloatBE);
  token[0xcb] = writeN(0xcb, 8, writeDoubleBE);

  return token;
}

// Node.js and browsers with TypedArray

function init_token() {
  // (immediate values)
  // positive fixint -- 0x00 - 0x7f
  // nil -- 0xc0
  // false -- 0xc2
  // true -- 0xc3
  // negative fixint -- 0xe0 - 0xff
  var token = uint8.slice();

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = write1(0xc4);
  token[0xc5] = write2(0xc5);
  token[0xc6] = write4(0xc6);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = write1(0xc7);
  token[0xc8] = write2(0xc8);
  token[0xc9] = write4(0xc9);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, (Buffer_prototype.writeFloatBE || writeFloatBE), true);
  token[0xcb] = writeN(0xcb, 8, (Buffer_prototype.writeDoubleBE || writeDoubleBE), true);

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = write1(0xcc);
  token[0xcd] = write2(0xcd);
  token[0xce] = write4(0xce);
  token[0xcf] = writeN(0xcf, 8, writeUInt64BE);

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = write1(0xd0);
  token[0xd1] = write2(0xd1);
  token[0xd2] = write4(0xd2);
  token[0xd3] = writeN(0xd3, 8, writeInt64BE);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = write1(0xd9);
  token[0xda] = write2(0xda);
  token[0xdb] = write4(0xdb);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = write2(0xdc);
  token[0xdd] = write4(0xdd);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = write2(0xde);
  token[0xdf] = write4(0xdf);

  return token;
}

// safe mode: for old browsers and who needs asserts

function init_safe() {
  // (immediate values)
  // positive fixint -- 0x00 - 0x7f
  // nil -- 0xc0
  // false -- 0xc2
  // true -- 0xc3
  // negative fixint -- 0xe0 - 0xff
  var token = uint8.slice();

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = writeN(0xc4, 1, Buffer.prototype.writeUInt8);
  token[0xc5] = writeN(0xc5, 2, Buffer.prototype.writeUInt16BE);
  token[0xc6] = writeN(0xc6, 4, Buffer.prototype.writeUInt32BE);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = writeN(0xc7, 1, Buffer.prototype.writeUInt8);
  token[0xc8] = writeN(0xc8, 2, Buffer.prototype.writeUInt16BE);
  token[0xc9] = writeN(0xc9, 4, Buffer.prototype.writeUInt32BE);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, Buffer.prototype.writeFloatBE);
  token[0xcb] = writeN(0xcb, 8, Buffer.prototype.writeDoubleBE);

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = writeN(0xcc, 1, Buffer.prototype.writeUInt8);
  token[0xcd] = writeN(0xcd, 2, Buffer.prototype.writeUInt16BE);
  token[0xce] = writeN(0xce, 4, Buffer.prototype.writeUInt32BE);
  token[0xcf] = writeN(0xcf, 8, writeUInt64BE);

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = writeN(0xd0, 1, Buffer.prototype.writeInt8);
  token[0xd1] = writeN(0xd1, 2, Buffer.prototype.writeInt16BE);
  token[0xd2] = writeN(0xd2, 4, Buffer.prototype.writeInt32BE);
  token[0xd3] = writeN(0xd3, 8, writeInt64BE);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = writeN(0xd9, 1, Buffer.prototype.writeUInt8);
  token[0xda] = writeN(0xda, 2, Buffer.prototype.writeUInt16BE);
  token[0xdb] = writeN(0xdb, 4, Buffer.prototype.writeUInt32BE);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = writeN(0xdc, 2, Buffer.prototype.writeUInt16BE);
  token[0xdd] = writeN(0xdd, 4, Buffer.prototype.writeUInt32BE);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = writeN(0xde, 2, Buffer.prototype.writeUInt16BE);
  token[0xdf] = writeN(0xdf, 4, Buffer.prototype.writeUInt32BE);

  return token;
}

function write1(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(2);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset] = value;
  };
}

function write2(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(3);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset++] = value >>> 8;
    buffer[offset] = value;
  };
}

function write4(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(5);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset++] = value >>> 24;
    buffer[offset++] = value >>> 16;
    buffer[offset++] = value >>> 8;
    buffer[offset] = value;
  };
}

function writeN(type, len, method, noAssert) {
  return function(encoder, value) {
    var offset = encoder.reserve(len + 1);
    encoder.buffer[offset++] = type;
    method.call(encoder.buffer, value, offset, noAssert);
  };
}

function writeUInt64BE(value, offset) {
  new Uint64BE(this, offset, value);
}

function writeInt64BE(value, offset) {
  new Int64BE(this, offset, value);
}

function writeFloatBE(value, offset) {
  ieee754.write(this, value, offset, false, 23, 4);
}

function writeDoubleBE(value, offset) {
  ieee754.write(this, value, offset, false, 52, 8);
}


/***/ }),
/* 110 */
/*!********************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/ext-unpacker.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// ext-unpacker.js

exports.setExtUnpackers = setExtUnpackers;

var Bufferish = __webpack_require__(/*! ./bufferish */ 0);
var Buffer = Bufferish.global;
var _decode;

var ERROR_COLUMNS = {name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1};

function setExtUnpackers(codec) {
  codec.addExtUnpacker(0x0E, [decode, unpackError(Error)]);
  codec.addExtUnpacker(0x01, [decode, unpackError(EvalError)]);
  codec.addExtUnpacker(0x02, [decode, unpackError(RangeError)]);
  codec.addExtUnpacker(0x03, [decode, unpackError(ReferenceError)]);
  codec.addExtUnpacker(0x04, [decode, unpackError(SyntaxError)]);
  codec.addExtUnpacker(0x05, [decode, unpackError(TypeError)]);
  codec.addExtUnpacker(0x06, [decode, unpackError(URIError)]);

  codec.addExtUnpacker(0x0A, [decode, unpackRegExp]);
  codec.addExtUnpacker(0x0B, [decode, unpackClass(Boolean)]);
  codec.addExtUnpacker(0x0C, [decode, unpackClass(String)]);
  codec.addExtUnpacker(0x0D, [decode, unpackClass(Date)]);
  codec.addExtUnpacker(0x0F, [decode, unpackClass(Number)]);

  if ("undefined" !== typeof Uint8Array) {
    codec.addExtUnpacker(0x11, unpackClass(Int8Array));
    codec.addExtUnpacker(0x12, unpackClass(Uint8Array));
    codec.addExtUnpacker(0x13, [unpackArrayBuffer, unpackClass(Int16Array)]);
    codec.addExtUnpacker(0x14, [unpackArrayBuffer, unpackClass(Uint16Array)]);
    codec.addExtUnpacker(0x15, [unpackArrayBuffer, unpackClass(Int32Array)]);
    codec.addExtUnpacker(0x16, [unpackArrayBuffer, unpackClass(Uint32Array)]);
    codec.addExtUnpacker(0x17, [unpackArrayBuffer, unpackClass(Float32Array)]);

    // PhantomJS/1.9.7 doesn't have Float64Array
    if ("undefined" !== typeof Float64Array) {
      codec.addExtUnpacker(0x18, [unpackArrayBuffer, unpackClass(Float64Array)]);
    }

    // IE10 doesn't have Uint8ClampedArray
    if ("undefined" !== typeof Uint8ClampedArray) {
      codec.addExtUnpacker(0x19, unpackClass(Uint8ClampedArray));
    }

    codec.addExtUnpacker(0x1A, unpackArrayBuffer);
    codec.addExtUnpacker(0x1D, [unpackArrayBuffer, unpackClass(DataView)]);
  }

  if (Bufferish.hasBuffer) {
    codec.addExtUnpacker(0x1B, unpackClass(Buffer));
  }
}

function decode(input) {
  if (!_decode) _decode = __webpack_require__(/*! ./decode */ 44).decode; // lazy load
  return _decode(input);
}

function unpackRegExp(value) {
  return RegExp.apply(null, value);
}

function unpackError(Class) {
  return function(value) {
    var out = new Class();
    for (var key in ERROR_COLUMNS) {
      out[key] = value[key];
    }
    return out;
  };
}

function unpackClass(Class) {
  return function(value) {
    return new Class(value);
  };
}

function unpackArrayBuffer(value) {
  return (new Uint8Array(value)).buffer;
}


/***/ }),
/* 111 */
/*!******************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/read-token.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// read-token.js

var ReadFormat = __webpack_require__(/*! ./read-format */ 46);

exports.getReadToken = getReadToken;

function getReadToken(options) {
  var format = ReadFormat.getReadFormat(options);

  if (options && options.useraw) {
    return init_useraw(format);
  } else {
    return init_token(format);
  }
}

function init_token(format) {
  var i;
  var token = new Array(256);

  // positive fixint -- 0x00 - 0x7f
  for (i = 0x00; i <= 0x7f; i++) {
    token[i] = constant(i);
  }

  // fixmap -- 0x80 - 0x8f
  for (i = 0x80; i <= 0x8f; i++) {
    token[i] = fix(i - 0x80, format.map);
  }

  // fixarray -- 0x90 - 0x9f
  for (i = 0x90; i <= 0x9f; i++) {
    token[i] = fix(i - 0x90, format.array);
  }

  // fixstr -- 0xa0 - 0xbf
  for (i = 0xa0; i <= 0xbf; i++) {
    token[i] = fix(i - 0xa0, format.str);
  }

  // nil -- 0xc0
  token[0xc0] = constant(null);

  // (never used) -- 0xc1
  token[0xc1] = null;

  // false -- 0xc2
  // true -- 0xc3
  token[0xc2] = constant(false);
  token[0xc3] = constant(true);

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = flex(format.uint8, format.bin);
  token[0xc5] = flex(format.uint16, format.bin);
  token[0xc6] = flex(format.uint32, format.bin);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = flex(format.uint8, format.ext);
  token[0xc8] = flex(format.uint16, format.ext);
  token[0xc9] = flex(format.uint32, format.ext);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = format.float32;
  token[0xcb] = format.float64;

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = format.uint8;
  token[0xcd] = format.uint16;
  token[0xce] = format.uint32;
  token[0xcf] = format.uint64;

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = format.int8;
  token[0xd1] = format.int16;
  token[0xd2] = format.int32;
  token[0xd3] = format.int64;

  // fixext 1 -- 0xd4
  // fixext 2 -- 0xd5
  // fixext 4 -- 0xd6
  // fixext 8 -- 0xd7
  // fixext 16 -- 0xd8
  token[0xd4] = fix(1, format.ext);
  token[0xd5] = fix(2, format.ext);
  token[0xd6] = fix(4, format.ext);
  token[0xd7] = fix(8, format.ext);
  token[0xd8] = fix(16, format.ext);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = flex(format.uint8, format.str);
  token[0xda] = flex(format.uint16, format.str);
  token[0xdb] = flex(format.uint32, format.str);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = flex(format.uint16, format.array);
  token[0xdd] = flex(format.uint32, format.array);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = flex(format.uint16, format.map);
  token[0xdf] = flex(format.uint32, format.map);

  // negative fixint -- 0xe0 - 0xff
  for (i = 0xe0; i <= 0xff; i++) {
    token[i] = constant(i - 0x100);
  }

  return token;
}

function init_useraw(format) {
  var i;
  var token = init_token(format).slice();

  // raw 8 -- 0xd9
  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  token[0xd9] = token[0xc4];
  token[0xda] = token[0xc5];
  token[0xdb] = token[0xc6];

  // fixraw -- 0xa0 - 0xbf
  for (i = 0xa0; i <= 0xbf; i++) {
    token[i] = fix(i - 0xa0, format.bin);
  }

  return token;
}

function constant(value) {
  return function() {
    return value;
  };
}

function flex(lenFunc, decodeFunc) {
  return function(decoder) {
    var len = lenFunc(decoder);
    return decodeFunc(decoder, len);
  };
}

function fix(len, method) {
  return function(decoder) {
    return method(decoder, len);
  };
}


/***/ }),
/* 112 */
/*!***************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/encoder.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// encoder.js

exports.Encoder = Encoder;

var EventLite = __webpack_require__(/*! event-lite */ 47);
var EncodeBuffer = __webpack_require__(/*! ./encode-buffer */ 40).EncodeBuffer;

function Encoder(options) {
  if (!(this instanceof Encoder)) return new Encoder(options);
  EncodeBuffer.call(this, options);
}

Encoder.prototype = new EncodeBuffer();

EventLite.mixin(Encoder.prototype);

Encoder.prototype.encode = function(chunk) {
  this.write(chunk);
  this.emit("data", this.read());
};

Encoder.prototype.end = function(chunk) {
  if (arguments.length) this.encode(chunk);
  this.flush();
  this.emit("end");
};


/***/ }),
/* 113 */
/*!***************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/decoder.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// decoder.js

exports.Decoder = Decoder;

var EventLite = __webpack_require__(/*! event-lite */ 47);
var DecodeBuffer = __webpack_require__(/*! ./decode-buffer */ 45).DecodeBuffer;

function Decoder(options) {
  if (!(this instanceof Decoder)) return new Decoder(options);
  DecodeBuffer.call(this, options);
}

Decoder.prototype = new DecodeBuffer();

EventLite.mixin(Decoder.prototype);

Decoder.prototype.decode = function(chunk) {
  if (arguments.length) this.write(chunk);
  this.flush();
};

Decoder.prototype.push = function(chunk) {
  this.emit("data", chunk);
};

Decoder.prototype.end = function(chunk) {
  this.decode(chunk);
  this.emit("end");
};


/***/ }),
/* 114 */
/*!***********************************************!*\
  !*** ../node_modules/msgpack-lite/lib/ext.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// ext.js

// load both interfaces
__webpack_require__(/*! ./read-core */ 20);
__webpack_require__(/*! ./write-core */ 15);

exports.createCodec = __webpack_require__(/*! ./codec-base */ 11).createCodec;


/***/ }),
/* 115 */
/*!*************************************************!*\
  !*** ../node_modules/msgpack-lite/lib/codec.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// codec.js

// load both interfaces
__webpack_require__(/*! ./read-core */ 20);
__webpack_require__(/*! ./write-core */ 15);

// @public
// msgpack.codec.preset

exports.codec = {
  preset: __webpack_require__(/*! ./codec-base */ 11).preset
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=test.browser.umd.js.map