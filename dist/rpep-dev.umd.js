(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rpep"] = factory();
	else
		root["rpep"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************************************************!*\
  !*** ./node_modules/eventemitter2/lib/eventemitter2.js ***!
  \*********************************************************/
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ 3)))

/***/ }),
/* 1 */
/*!*************************************!*\
  !*** ./node_modules/proto/proto.js ***!
  \*************************************/
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
/* 2 */
/*!*****************!*\
  !*** ./rpep.js ***!
  \*****************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! eventemitter2 */ 0);
var proto = __webpack_require__(/*! proto */ 1);
var DuplexEventEmitter = __webpack_require__(/*! ./DuplexEventEmitter */ 4);
var receive = 0;
var respond = 0;
var stream = 0;
var maxId = 9007199254740992;
var reservedSendingCommands = {
    close: 1,
    idDiscontinuity: 1,
    e: 1,
    error: 1
};
var reservedListeningCommands = {
    close: 1,
    idDiscontinuity: 1
};
var reservedListeningErrorCommands = {
    e: 1,
    error: 1
};
var reservedEventListeningEvents = {
    order: 1
};
var reservedStreamEmissionEvents = {
    e: 1,
    orderNumberDiscontinuity: 1
};
var buffer = 50;
var PeerError = proto(Error, function () {
    this.name = "PeerError";
});
module.exports = proto(function () {
    this.PeerError = PeerError;
    this.init = function (transport, serialization, options) {
        if (!options) 
            options = {};
        this.transport = transport;
        this.serialization = serialization;
        this.options = options;
        this.commands = {};
    };
    this.connect = function () {
        var args = Array.prototype.slice.call(arguments);
        var that = this;
        return new Promise(function (resolve, reject) {
            var connection = this.transport.connect.apply(this.transport.connect, args.concat([that.options]));
            var onOpenCalled = false, errors = [];
            connection.onOpen(function () {
                onOpenCalled = true;
                resolve(rpepConn);
            });
            var rpepConn = RpepConnection(that, connection);
            connection.onError(function (e) {
                errors.push(e);
            });
            if (connection.onClose) {
                connection.onClose(function () {
                    if (!onOpenCalled) {
                        var message = "Connection couldn't be opened";
                        if (errors.length > 0) {
                            message + ': \n' + errors.join('\n');
                        }
                        var e = new Error(message);
                        e.errors = errors;
                        reject(e);
                    }
                });
            }
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
            var that = this;
            that.listener = this.transport.listen(port, that.options, function (request) {
                requestHandler(request, {
                    accept: function () {
                        var connection = request.accept();
                        return RpepConnection(that, connection);
                    },
                    reject: function () {
                        request.reject();
                    },
                    rawRequest: request
                });
            });
            that.listener.onListening(function () {
                resolve();
            });
            that.listener.onError(function (e) {
                reject(e);
            });
            that.listener.onClose(function (e) {
                that.listener = undefined;
            });
        });
    };
    Object.defineProperty(this, 'listening', {
        get: function () {
            this.listener !== undefined;
        }
    });
    this.close = function () {
        if (this.listener) 
            this.listener.close();
    };
    this.receive = function (command, handler) {
        addCommand(that, receive, command, handler);
    };
    this.respond = function (command, handler) {
        addCommand(that, respond, command, handler);
    };
    this.stream = function (command, handler) {
        addCommand(that, stream, command, handler);
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
        if (this.commands[command] !== undefined) 
            throw handlerError('handler for "' + command + '"');
        if (command in reservedFireAndForgetErrorCommands) 
            throw new Error("Can't setup a handler for the command '" + command + "', because it's reserved for global error messages. To handle global errors, listen to the connection's 'error' event.");
        if (command in reservedFireAndForgetCommands) 
            throw new Error("Can't setup a handler for the command '" + command + "', because it's reserved for internal use.");
        this.commands[command] = {
            type: type,
            handler: handler
        };
    }
    
    function handlerError(handlerName) {
        return new Error('A ' + handlerName + ' already exists! You can only have one handler per command.');
    }
    
});
var RpepConnection = proto(EventEmitter, function () {
    this.init = function (rpepCoreObject, connectionObject, rpepOptions) {
        this.transport = rpepCoreObject.transport;
        this.serialization = rpepCoreObject.serialization;
        this.commands = rpepCoreObject.commands;
        this.maxSendSize = rpepCoreObject.rpepOptions.maxSendSize;
        this.maxReceiveSize = rpepCoreObject.rpepOptions.maxReceiveSize;
        this.sendCommandErrorInfo = rpepCoreObject.rpepOptions.sendCommandErrorInfo;
        this.server = rpepOptions.server;
        this.connection = connectionObject;
        this.connected = true;
        this.sessionData = {};
        this.commandState = {};
        if (this.server) 
            this.nextId = 0;
         else 
            this.nextId = 1;
        var that = this;
        if (this.connection.onClose) {
            this.connection.onClose(function () {
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
            that.emit('rawMessage', rawMessage);
        });
        this.connection.onError(function (e) {
            that.emit('error', e);
        });
    };
    this.close = function () {
        if (this.connected) {
            if (this.connection.onClose === undefined) {
                send(that, ['close']);
            }
            this.connection.close();
            this.connection = undefined;
        }
    };
    this.drop = function () {
        if (this.connected && this.connection.drop) {
            this.connection.drop();
        } else {
            this.close();
        }
    };
    this.fire = function (command, data) {
        if (command in reservedSendingCommands) {
            throw new Error("Can't fire an '" + command + "' event directly; '" + command + "' is a global command reserved for internal use.");
        }
        send(this, [command,data]);
    };
    this.fireError = function (error) {
        send(this, ['e',[error,data]]);
    };
    this.request = function (command, data) {
        if (command in reservedSendingCommands) {
            throw new Error("Can't fire an '" + command + "' event directly; '" + command + "' is a global command reserved for internal use.");
        }
        if (this.commandState[this.nextId] !== undefined) 
            throw new Error('There is already a callback for id: ' + this.nextId);
        send(this, [command,this.nextId,data]);
        var resolver = resolver();
        this.requestFutures[this.nextId] = resolver;
        incrementId(this);
        return resolver.f;
    };
    this.streamConnect = function (command, data) {
        if (command in reservedSendingCommands) {
            throw new Error("Can't fire an '" + command + "' event directly; '" + command + "' is a global command reserved for internal use.");
        }
        if (this.commandState[this.nextId] !== undefined) 
            throw new Error('There is already a callback for id: ' + this.nextId);
        send(this, [command,this.nextId,data]);
        var emitter = createStreamEmiter(this, this.nextId);
        incrementId(this);
        return emitter;
    };
    function serialize(that, data) {
        return that.serialization.serialize(data);
    }
    
    function deserialize(that, serializedData) {
        return that.serialization.deserialize(serializedData);
    }
    
    function incrementId(that) {
        var prevId = that.nextId;
        do {
            that.nextId += 2;
            if (that.nextId > maxId) {
                that.nextId = that.nextId % 2;
            }
        } while (that.nextId in that.commandState);
        if (that.nextId !== prevId + 2) {
            send(that, ['idDiscontinuity',[prevId,that.nextid]]);
        }
    }
    
    function incrementOrderNumber(emitter) {
        emitter.orderNumber += 1;
        if (emitter.orderNumber > maxId) {
            var prevNumber = emitter.orderNumber - 1;
            emitter.orderNumber = 0;
            emitter.emit();
            send(that, [emitter.id,'orderNumberDiscontinuity',[prevNumber,that.orderNumber]]);
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
        var emitter = RpepDuplexEventEmitter(function onEmit(event, data) {
            if (emitter.endMessageSent) 
                throw new Error("Stream 'end' event has been sent, can't send more events.");
            if (event === 'error') {
                if (emitter.orderingData) {
                    send(that, [id,'e',createErrorInfo(data)]);
                    incrementOrderNumber(emitter);
                } else {
                    send(that, [id,'e',createErrorInfo(data)]);
                }
            } else if (event in reservedStreamEmissionEvents) {
                throw new Error("Can't emit the '" + event + "' event directly; '" + event + "' is reserved for internal use.");
            } else {
                send(that, [id,event,createErrorInfo(data)]);
                if (event === 'end') {
                    emitter.endMessageSent = true;
                    if (emitter.endMessageReceived) {
                        delete that.commandState[id];
                    }
                }
            }
        });
        emitter.id = id;
        emitter.orderingData = false;
        emitter.orderNumber = 0;
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
        if (this.connected) {
            this.connection.send(serializedMessage);
        } else {
            throw Error('Connection is closed');
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
                        that.fireError("unparsableCommand", {
                            message: rawMessage
                        });
                    } catch (e) {
                        if (e.message === 'maxMessageSizeExceeded') 
                            that.fireError("unparsableCommand", {
                            message: rawMessage.slice(0, 200)
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
                if (message.lengh === 0 && type0 === 'close') {
                    that.emit("closeMessage");
                    return;
                }
                var commandInfo = that.commands[command];
                if (commandInfo === undefined) {
                    that.fireError("noSuchCommand", {
                        command: message[1]
                    });
                    return;
                }
                if (commandInfo.type === receive) {
                    commandInfo.handler.call(that, message[1]);
                } else if (commandInfo.type === respond) {
                    var id = message[1];
                    if (!validateId(this, id)) {
                        return;
                    }
                    Promise.resolve().then(function () {
                        return commandInfo.handler.call(that, message[2], id);
                    }).then(function (result) {
                        send(that, [id,result]);
                    }).catch(function (e) {
                        if (e instanceof PeerError) {
                            send(that, [id,'e',createErrorInfo(e)]);
                        } else {
                            that.emit('error', e);
                            send(that, [id,'e',createErrorInfo({
                                message: 'serverError'
                            })]);
                        }
                    });
                } else if (commandInfo.type === stream) {
                    var id = message[1];
                    if (!validateId(this, id)) {
                        return;
                    }
                    var emitter = connection.commandState[id] = createStreamEmiter(that, id);
                    Promise.resolve().then(function () {
                        commandInfo.handler.call(that, emitter, message[2], id);
                    }).catch(function (e) {
                        that.emit('error', e);
                    });
                } else {
                    throw new Error("Invalid command type: " + commandInfo.type);
                }
            } else if (type0 === 'number') {
                if (!(type0 in that.commandState)) {
                    that.fireError("rpepIdNotFound", {
                        id: type0
                    });
                    return;
                }
                if (that.commandState[type0] instanceof RpepDuplexEventEmitter) {
                    var emitter = that.commandState[type0];
                    if (emitter.orderingData) {
                        var orderNumber = message[1], event = message[2], eventData = message[3];
                    } else {
                        var event = message[1], eventData = message[2];
                    }
                    if (event === 'order') {
                        emitter.orderingData = eventData !== true;
                    } else {
                        if (event === 'e') {
                            var error = createErrorFromMessage(eventData[0], eventData[1]);
                            emitter._external.emit('error', error, orderNumber);
                        } else {
                            emitter._external.emit(event, eventData, orderNumber);
                            if (event === 'end') {
                                emitter.endMessageReceived = true;
                                if (emitter.endMessageSent) {
                                    delete that.commandState[type0];
                                }
                            }
                        }
                    }
                } else {
                    var theResolver = that.commandState[type0];
                    if (message.length === 3) {
                        theResolver.reject(createErrorFromMessage(message[2][0], message[2][1]));
                    } else {
                        theResolver.resolve(message[1]);
                    }
                }
            } else {
                if (that.sendCommandErrorInfo) {
                    that.fireError("invalidMessage", {
                        message: rawMessage.slice(0, 200)
                    });
                } else {
                    that.fireError("invalidMessage");
                }
            }
        } catch (e) {
            connection.emit('error', e);
        }
    }
    
});
function validateId(that, id) {
    if (id > maxId) {
        var reason = "Id greater than 2^53";
    } else if (that.server) {
        if (id % 2 !== 1) {
            var reason = "Id from client not odd";
        }
    } else if (id % 2 !== 0) {
        var reason = "Id from server not even";
    }
    if (reason !== undefined) {
        that.fireError('rpepInvalidId', {
            reason: reason
        });
    }
}

function resolver() {
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
}

var RpepDuplexEventEmitter = proto(DuplexEventEmitter, function (superclass) {
    this.on = function (event, handler) {
        if (event in reservedEventListeningEvents) 
            throw new Error("Can't listen on the '" + event + "' event directly; the '" + event + "' event is reserved for internal use.");
        superclass.on.call(this, event, handler);
    };
});


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFxycGVwLmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxHQUFBLENBQUksZUFBZSxPQUFBLENBQVE7QUFDM0IsR0FBQSxDQUFJLFFBQVEsT0FBQSxDQUFRO0FBRXBCLEdBQUEsQ0FBSSxxQkFBcUIsT0FBQSxDQUFRO0FBR2pDLEdBQUEsQ0FBSSxVQUFVO0FBQ2QsR0FBQSxDQUFJLFVBQVU7QUFDZCxHQUFBLENBQUksU0FBUztBQUViLEdBQUEsQ0FBSSxRQUFRO0FBQ1osR0FBQSxDQUFJLDBCQUEwQjtJQUFDLE9BQU0sQ0FBUCxDQUFBO0lBQVMsaUJBQWdCLENBQXpCLENBQUE7SUFBNEIsR0FBRSxDQUE5QixDQUFBO0lBQWdDLE9BQU07O0FBQ3BFLEdBQUEsQ0FBSSw0QkFBNEI7SUFBQyxPQUFNLENBQVAsQ0FBQTtJQUFTLGlCQUFnQjs7QUFDekQsR0FBQSxDQUFJLGlDQUFpQztJQUFDLEdBQUUsQ0FBSCxDQUFBO0lBQUssT0FBTTs7QUFDaEQsR0FBQSxDQUFJLCtCQUErQjtJQUFDLE9BQU07O0FBQzFDLEdBQUEsQ0FBSSwrQkFBK0I7SUFBQyxHQUFFLENBQUgsQ0FBQTtJQUFLLDBCQUF5Qjs7QUFHakUsR0FBQSxDQUFJLFNBQVM7QUFFYixHQUFBLENBQUksWUFBWSxLQUFBLENBQU0sT0FBTyxZQUFXO0lBQ3BDLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZO0FBQ2hCO0FBS0EsTUFBQSxDQUFPLE9BQVAsQ0FBQSxDQUFBLENBQWlCLEtBQUEsQ0FBTSxZQUFXO0lBSzlCLElBQUEsQ0FBSyxTQUFMLENBQUEsQ0FBQSxDQUFpQjtJQThDakIsSUFBQSxDQUFLLElBQUwsQ0FBQSxDQUFBLENBQVksVUFBUyxTQUFXLEVBQUEsYUFBZSxFQUFBLFNBQVM7UUFDcEQsSUFBRyxDQUFDO1lBQVMsT0FBQSxDQUFBLENBQUEsQ0FBVTtRQUV2QixJ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QSxHQUFBLENBQVMsR0FBRztZQUNYLEdBQUEsQ0FBSSxTQUFTO1FBQ3pCO0lBQ0EsT0FBVyxJQUFHLEVBQUEsQ0FBQSxDQUFBLENBQUcsQ0FBSCxDQUFBLEdBQUEsQ0FBUyxHQUFHO1FBQ2xCLEdBQUEsQ0FBSSxTQUFTO0lBQ3JCO0lBRUksSUFBRyxNQUFBLENBQUEsR0FBQSxDQUFXLFdBQVc7UUFDckIsSUFBQSxDQUFLLFNBQUwsQ0FBZSxpQkFBaUI7WUFBQyxRQUFROztJQUNqRDtBQUNBOztBQUVBLFNBQVMsV0FBVztJQUNoQixHQUFBLENBQUksU0FBUztJQUNiLEdBQUEsQ0FBSSxJQUFJLElBQUksT0FBSixDQUFZLFVBQVMsU0FBVyxFQUFBLFVBQVU7UUFDOUMsT0FBQSxDQUFBLENBQUEsQ0FBVTtRQUNWLE1BQUEsQ0FBQSxDQUFBLENBQVM7SUFDakI7SUFFSSxPQUFPO1FBQUMsR0FBRyxDQUFKLENBQUE7UUFBTyxTQUFRLE9BQWYsQ0FBQTtRQUF3QixRQUFPOztBQUMxQzs7QUFHQSxHQUFBLENBQUkseUJBQXlCLEtBQUEsQ0FBTSxvQkFBb0IsVUFBUyxZQUFZO0lBQ3hFLElBQUEsQ0FBSyxFQUFMLENBQUEsQ0FBQSxDQUFVLFVBQVMsS0FBTSxFQUFBLFNBQVM7UUFDOUIsSUFBRyxLQUFBLENBQUEsRUFBQSxDQUFTO1lBQ1IsTUFBTSxJQUFJLEtBQUosQ0FBVSx1QkFBQSxDQUFBLENBQUEsQ0FBd0IsS0FBeEIsQ0FBQSxDQUFBLENBQThCLHlCQUE5QixDQUFBLENBQUEsQ0FBd0QsS0FBeEQsQ0FBQSxDQUFBLENBQThEO1FBRWxGLFVBQUEsQ0FBVyxFQUFYLENBQWMsSUFBZCxDQUFtQixNQUFNLE9BQU07SUFDdkM7QUFDQTtBQW5vQkEiLCJmaWxlIjoiRDpcXGJpbGx5c0ZpbGVcXGNvZGVcXGphdmFzY3JpcHRcXG1vZHVsZXNcXHJwZXAuanNcXHJwZXAuanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjInKVxyXG52YXIgcHJvdG8gPSByZXF1aXJlKFwicHJvdG9cIilcclxuXHJcbnZhciBEdXBsZXhFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL0R1cGxleEV2ZW50RW1pdHRlcicpXHJcblxyXG4vLyBlbnVtc1xyXG52YXIgcmVjZWl2ZSA9IDBcclxudmFyIHJlc3BvbmQgPSAwXHJcbnZhciBzdHJlYW0gPSAwXHJcblxyXG52YXIgbWF4SWQgPSA5MDA3MTk5MjU0NzQwOTkyIC8vIDJeNTNdXHJcbnZhciByZXNlcnZlZFNlbmRpbmdDb21tYW5kcyA9IHtjbG9zZToxLGlkRGlzY29udGludWl0eToxLCBlOjEsZXJyb3I6MX1cclxudmFyIHJlc2VydmVkTGlzdGVuaW5nQ29tbWFuZHMgPSB7Y2xvc2U6MSxpZERpc2NvbnRpbnVpdHk6MX1cclxudmFyIHJlc2VydmVkTGlzdGVuaW5nRXJyb3JDb21tYW5kcyA9IHtlOjEsZXJyb3I6MX1cclxudmFyIHJlc2VydmVkRXZlbnRMaXN0ZW5pbmdFdmVudHMgPSB7b3JkZXI6MX1cclxudmFyIHJlc2VydmVkU3RyZWFtRW1pc3Npb25FdmVudHMgPSB7ZToxLG9yZGVyTnVtYmVyRGlzY29udGludWl0eToxfVxyXG5cclxuXHJcbnZhciBidWZmZXIgPSA1MCAvLyBzb21lIGJ1ZmZlciBmb3IgbWVzc2FnZSBoZWFkZXIgc3R1ZmZcclxuXHJcbnZhciBQZWVyRXJyb3IgPSBwcm90byhFcnJvciwgZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBcIlBlZXJFcnJvclwiXHJcbn0pXHJcblxyXG4vLyBBbiBpbnN0YW5jZSBvZiBScGVwQ29yZSBjYW4gZW1pdCB0aGUgZm9sbG93aW5nIGV2ZW50czpcclxuICAgIC8vICdjbG9zZScgLSBGaXJlZCBvbmNlIHRoZSBsaXN0ZW5pbmcgc2VydmVyaGFzIGJlZW4gY2xvc2VkXHJcbiAgICAvLyAnZXJyb3InXHJcbm1vZHVsZS5leHBvcnRzID0gcHJvdG8oZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gc3RhdGljIHByb3BlcnRpZXNcclxuXHJcbiAgICAvLyBhbiBlcnJvciB0aGF0LCB3aGVuIHRocm93biwgc2VuZHMgdGhlIGVycm9yIGFzIGFuIGVycm9yIHJlc3BvbnNlIHRvIHRoZSBvdGhlciBQZWVyIChpbmNsdWRpbmcgaXRlcmFibGUgcHJvcGVydGllcywgYnV0IG5vdCBpbmNsdWRpbmcgdGhlIHN0YWNrKVxyXG4gICAgdGhpcy5QZWVyRXJyb3IgPSBQZWVyRXJyb3JcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBwcm9wZXJ0aWVzXHJcblxyXG4gICAgLy8gdHJhbnNwb3J0IGlzIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kczpcclxuICAgICAgICAvLyBjb25uZWN0KC8qdHJhbnNwb3J0IGNvbm5lY3QgcGFyYW1ldGVycy4uLiAqLywgcnBlcE9wdGlvbnMpIC0gY29ubmVjdHMgdG8gYSB3ZWJzb2NrZXQgc2VydmVyXHJcbiAgICAgICAgICAgIC8vIHRyYW5zcG9ydCBjb25uZWN0IHBhcmFtZXRlcnMuLi4gLSBBIHZhcmlhYmxlIG51bWJlciBvZiB0cmFuc3BvcnQgY29ubmVjdCBwYXJhbWV0ZXJzIHBhc3NlZCBpbnRvIHJwZXBQZWVyLmNvbm5lY3RcclxuICAgICAgICAgICAgLy8gcnBlcE9wdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWF4U2VuZFNpemUgYW5kIG1heFJlY2VpdmVTaXplIG9wdGlvbnNcclxuICAgICAgICAgICAgLy8gcmV0dXJucyBhIGNvbm5lY3Rpb24gb2JqZWN0XHJcbiAgICAgICAgICAgICAgIC8vIHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzOlxyXG4gICAgICAgICAgICAgICAgLy8gc2VuZChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgLy8gY2xvc2UoKSAtIENsb3NlcyB0aGUgY29ubmVjdGlvbiBpbiBhIHdheSB0aGF0IGFjdGl2ZWx5IGluZm9ybXMgdGhlIG90aGVyIFBlZXIgYWJvdXQgY2xvc3VyZS5cclxuICAgICAgICAgICAgICAgIC8vIGRyb3AoKSAtIChPcHRpb25hbCkgQ2xvc2VzIHRoZSBjb25uZWN0aW9uIHdpdGhvdXQgaW5mb3JtaW5nIHRoZSBvdGhlciBQZWVyLlxyXG4gICAgICAgICAgICAgICAvLyBhbmQgdGhlIGZvbGxvd2luZyBldmVudC1oYW5kbGVyIGZ1bmN0aW9ucyAod2hpY2ggd2lsbCBvbmx5IGJlIGNhbGxlZCBvbmNlKTpcclxuICAgICAgICAgICAgICAgIC8vIG9uT3BlbihjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIC8vIG9uQ2xvc2UoY2FsbGJhY2spIC0gKE9wdGlvbmFsKSBNdXN0IGJlIGZpcmVkIGV2ZW4gaWYgYW4gZXJyb3IgZXZlbnQgaGFzIGhhcHBlbmVkLCBvciB0aGUgY29ubmVjdGlvbiB3aWxsIGJlIGFzc3VtZWQgdG8gc3RpbGwgYmUgb3Blbi4gSWYgbm90IGdpdmVuLCBhIFwiY2xvc2VcIiBmaXJlLWFuZC1mb3JnZXQgbWVzc2FnZSB3aWxsIGJlIHNlbnQgYmVmb3JlIGNvbm5lY3Rpb24gY2xvc3VyZSBpZiB0aGUgUGVlciBpcyBhIHNlcnZlciwgYW5kIHRoYXQgXCJjbG9zZVwiIG1lc3NhZ2Ugd2lsbCBiZSBsaXN0ZW5lZCBmb3IgaWYgaXRzIGEgY2xpZW50IFBlZXIuXHJcbiAgICAgICAgICAgICAgICAvLyBvbk1lc3NhZ2UoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICAvLyBvbkVycm9yKGNhbGxiYWNrKVxyXG4gICAgICAgIC8vIGxpc3RlbigvKnRyYW5zcG9ydCBsaXN0ZW4gcGFyYW1ldGVycy4uLiAqLywgcnBlcE9wdGlvbnMsIGNhbGxiYWNrKSAtIChPcHRpb25hbCkgTGlzdGVucyBmb3IgY29ubmVjdGlvc24gYW5kIGNhbGxzIGBjYWxsYmFja2Agd2hlbiBhIGNvbm5lY3Rpb24gY29tZXMgdGhyb3VnaC5cclxuICAgICAgICAgICAgLy8gdHJhbnNwb3J0IGxpc3RlbiBwYXJhbWV0ZXJzLi4uIC0gQSB2YXJpYWJsZSBudW1iZXIgb2YgdHJhbnNwb3J0IGxpc3RlbiBwYXJhbWV0ZXJzIHBhc3NlZCBpbnRvIHJwZXBQZWVyLmxpc3RlblxyXG4gICAgICAgICAgICAvLyBQYXJhbWV0ZXJzOlxyXG4gICAgICAgICAgICAgICAgLy8gcnBlcE9wdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWF4U2VuZFNpemUgYW5kIG1heFJlY2VpdmVTaXplIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrKHJlcXVlc3QpIC0gQ2FsbGVkIHdoZW4gYSBjb25uZWN0aW9uIHJlcXVlc3QgY29tZXMgdGhyb3VnaC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBgcmVxdWVzdGAgaGFzIHRoZSBtZXRob2RzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhY2NlcHQoKSAtIFJldHVybnMgYSBjb25uZWN0aW9uIG9iamVjdCAod2l0aCB0aGUgc2FtZSBBUEkgYXMgdGhlIG9iamVjdCB0aGF0IGBjb25uZWN0YCByZXR1cm5zKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVqZWN0KClcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIGZvbGxvd2luZyBwcm9wZXJ0eTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmF3UmVxdWVzdCAtIFRoZSByYXcgcmVxdWVzdCBmcm9tIHRoZSB0cmFuc3BvcnRcclxuICAgICAgICAgICAgLy8gcmV0dXJucyBhbiBvYmplY3RcclxuICAgICAgICAgICAgICAgLy8gd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZDpcclxuICAgICAgICAgICAgICAgIC8vIGNsb3NlKCkgLSBjbG9zZXMgdGhlIGxpc3RlbmluZyBzZXJ2ZXJcclxuICAgICAgICAgICAgICAgLy8gYW5kIHRoZSBmb2xsb3dpbmcgZXZlbnQtaGFuZGxlciBmdW5jdGlvbnMgKHdoaWNoIHdpbGwgb25seSBiZSBjYWxsZWQgb25jZSk6XHJcbiAgICAgICAgICAgICAgICAvLyBvbkxpc3RlbmluZyhjYWxsYmFjaykgLSBDYWxsZWQgd2hlbiB0aGUgc2VydmVyIHN0YXJ0cyBsaXN0ZW5pbmdcclxuICAgICAgICAgICAgICAgIC8vIG9uQ2xvc2UoY2FsbGJhY2spIC0gQ2FsbGVkIHdoZW4gdGhlIHNlcnZlciBzdG9wcyBsaXN0ZW5pbmdcclxuICAgICAgICAgICAgICAgIC8vIG9uRXJyb3IoY2FsbGJhY2spIC0gQ2FsbGVkIGlmIGxpc3RlbmluZyBjb3VsZG4ndCBiZSBzdGFydGVkXHJcbiAgICAvLyBzZXJpYWxpemF0aW9uIGlzIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kczpcclxuICAgICAgICAvLyBzZXJpYWxpemUoamF2YXNjcmlwdE9iamVjdCkgLSBSZXR1cm5zIHRoZSBqYXZhc2NyaXB0IG9iamVjdCBpbiBzZXJpYWxpemVkIGZvcm0gKHNvbWV0aGluZyB0aGUgdHJhbnNwb3J0IGNhbiBwcm9jZXNzLCBtb3N0IGxpa2VseSBhIHN0cmluZyBvciBCdWZmZXIpXHJcbiAgICAgICAgLy8gZGVzZXJpYWxpemUoc2VyaWFsaXplZE9iamVjdCkgLSBSZXR1cm5zIGEgamF2YXNjcmlwdCBvYmplY3QgcmVwcmVudGVkIGJ5IHRoZSBzZXJpYWxpemVkT2JqZWN0XHJcbiAgICAvLyBvcHRpb25zOlxyXG4gICAgICAgIC8vIG1heFNlbmRTaXplIC0gVGhlIG1heGltdW0gYnl0ZS1sZW5ndGggYSBzZW50IG1lc3NhZ2UgY2FuIGJlIChEZWZhdWx0OiBubyBsaW1pdClcclxuICAgICAgICAvLyBtYXhSZWNlaXZlU2l6ZSAtIFRoZSBtYXhpbXVtIGJ5dGUtbGVuZ3RoIGEgcmVjZWl2ZWQgbWVzc2FnZSBjYW4gYmUgKERlZmF1bHQ6IG5vIGxpbWl0KVxyXG4gICAgICAgIC8vIHNlbmRDb21tYW5kRXJyb3JJbmZvIC0gKERlZmF1bHQ6dHJ1ZSlcclxuICAgICAgICAgICAgLy8gSWYgdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vIGVycm9ycyB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgc2VudCB0byB0aGUgb3RoZXIgUGVlciBpZiB0aGVpciBjb21tYW5kIGlzIHVucGFyc2FibGUsIGFuZFxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGZpcnN0IHBhcnQgb2YgdGhlIGNvbW1hbmQgd2lsbCBiZSBzZW50IHdpdGggYW4gXCJpbnZhbGlkTWVzc2FnZVwiIGVycm9yXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgdGhlIGVycm9yIHdpbGwgYmUgaWdub3JlZCAoYnV0IGhhbmRsZWFibGUgdmlhIHJhd0hhbmRsZSBvciBwcmVIYW5kbGUsIGRlcGVuZGluZyBvbiB0aGUgY2FzZSkuXHJcbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbih0cmFuc3BvcnQsIHNlcmlhbGl6YXRpb24sIG9wdGlvbnMpIHtcclxuICAgICAgICBpZighb3B0aW9ucykgb3B0aW9ucyA9IHt9XHJcblxyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0XHJcbiAgICAgICAgdGhpcy5zZXJpYWxpemF0aW9uID0gc2VyaWFsaXphdGlvblxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcclxuXHJcbiAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9XHJcbiAgICAgICAgLy8gdGhpcy5saXN0ZW5lclxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybnMgYSBmdXR1cmUgb3BlbiBjb25uZWN0aW9uXHJcbiAgICAvLyBvcHRpb25zIC0gYW4gb2JqZWN0IHdpdGggdHJhbnNwb3J0LXNwZWNpZmljIG9wdGlvbnNcclxuICAgIHRoaXMuY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxyXG5cclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcy50cmFuc3BvcnQuY29ubmVjdC5hcHBseSh0aGlzLnRyYW5zcG9ydC5jb25uZWN0LCBhcmdzLmNvbmNhdChbdGhhdC5vcHRpb25zXSkpXHJcblxyXG4gICAgICAgICAgICB2YXIgb25PcGVuQ2FsbGVkID0gZmFsc2UsIGVycm9ycyA9IFtdXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ub25PcGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgb25PcGVuQ2FsbGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShycGVwQ29ubilcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHZhciBycGVwQ29ubiA9IFJwZXBDb25uZWN0aW9uKHRoYXQsIGNvbm5lY3Rpb24pXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLm9uRXJyb3IoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGlmKGNvbm5lY3Rpb24ub25DbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5vbkNsb3NlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFvbk9wZW5DYWxsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIkNvbm5lY3Rpb24gY291bGRuJ3QgYmUgb3BlbmVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UrJzogXFxuJytlcnJvcnMuam9pbignXFxuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5lcnJvcnMgPSBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJucyBhIGZ1dHVyZSB0aGF0IHJlc29sdmVzIHN1Y2Nlc3NmdWxseSB3aGVuIHRoZSBzZXJ2ZXIgaGFzIGJlZ3VuIGxpc3RlbmluZyBhbmQgcmVzb2x2ZXMgdG8gYW4gZXJyb3IgaWYgbGlzdGVuaW5nIGNvdWxkbid0IGJlIHN0YXJ0ZWRcclxuICAgIHRoaXMubGlzdGVuID0gZnVuY3Rpb24oLyp2YXJpYWJsZSBudW1iZXIgb2YgbGlzdGVuIHBhcmFtZXRlcnMsIHJlcXVlc3RIYW5kbGVyKi8pIHtcclxuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcclxuICAgICAgICB2YXIgcmVxdWVzdEhhbmRsZXIgPSBhcmdzW2FyZ3MubGVuZ3RoLTFdXHJcbiAgICAgICAgdmFyIHRyYW5zcG9ydExpc3RlbkFyZ3VtZW50cyA9IGFyZ3Muc2xpY2UoMCwtMSlcclxuXHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBpZih0aGF0Lmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJwZXAgb2JqZWN0IGFscmVhZHkgbGlzdGVuaW5nIVwiKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgICAgICAgdGhhdC5saXN0ZW5lciA9IHRoaXMudHJhbnNwb3J0Lmxpc3Rlbihwb3J0LCB0aGF0Lm9wdGlvbnMsIGZ1bmN0aW9uKHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RIYW5kbGVyKHJlcXVlc3QsIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2NlcHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHJlcXVlc3QuYWNjZXB0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJwZXBDb25uZWN0aW9uKHRoYXQsIGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnJlamVjdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByYXdSZXF1ZXN0OiByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhhdC5saXN0ZW5lci5vbkxpc3RlbmluZyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGF0Lmxpc3RlbmVyLm9uRXJyb3IoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoYXQubGlzdGVuZXIub25DbG9zZShmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lmxpc3RlbmVyID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKnRoaXMubGlzdGVuaW5nID0gKi9PYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2xpc3RlbmluZycsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyICE9PSB1bmRlZmluZWRcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIGNsb3NlcyBhIGxpc3RlbmluZyB3ZWJzb2NrZXQgc2VydmVyXHJcbiAgICAvLyBuby1vcCBpZiB0aGUgc2VydmVyIGlzIGFscmVhZHkgY2xvc2VkXHJcbiAgICB0aGlzLmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYodGhpcy5saXN0ZW5lcilcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5jbG9zZSgpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0cyB1cCBhIGhhbmRsZXIgdG8gcmVjZWl2ZSBhIGZpcmVBbmRGb3JnZXQgY2FsbFxyXG4gICAgdGhpcy5yZWNlaXZlID0gZnVuY3Rpb24oY29tbWFuZCwgaGFuZGxlcikge1xyXG4gICAgICAgIGFkZENvbW1hbmQodGhhdCwgcmVjZWl2ZSwgY29tbWFuZCwgaGFuZGxlcilcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXRzIHVwIGEgaGFuZGxlciB0byBoYW5kbGUgcmVxdWVzdC1yZXNwb25zZSBjYWxsc1xyXG4gICAgLy8gdGhlIGhhbmRsZXIgY2FuIGVpdGhlciByZXR1cm5cclxuICAgICAgICAvLyBBIChwb3NzaWJseSBmdXR1cmUpIHZhbHVlLCB3aGljaCB3aWxsIGJlIHNlbnQgYXMgYSByZXNwb25zZS4gT3IsXHJcbiAgICAgICAgLy8gQSAocG9zc2libHkgZnV0dXJlKSBFcnJvciBvYmplY3QuIFRoZSAnbWVzc2FnZScgd2lsbCBiZSBzZW50IGFzIHRoZSBgZXJyb3JgLCBhbmQgYW55IG90aGVyIGl0ZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIG9iamVjdCB3aWxsIGJlIGFkZGVkIGFzIHRoZSBgZGF0YWAuXHJcbiAgICB0aGlzLnJlc3BvbmQgPSBmdW5jdGlvbihjb21tYW5kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgYWRkQ29tbWFuZCh0aGF0LCByZXNwb25kLCBjb21tYW5kLCBoYW5kbGVyKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNldHMgdXAgYSBoYW5kbGVyIHRvIGhhbmRsZSBldmVudC1zdGVhbSBjYWxsc1xyXG4gICAgdGhpcy5zdHJlYW0gPSBmdW5jdGlvbihjb21tYW5kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgYWRkQ29tbWFuZCh0aGF0LCBzdHJlYW0sIGNvbW1hbmQsIGhhbmRsZXIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0cyBhIGRlZmF1bHQgY29tbWFuZCBoYW5kbGVyXHJcbiAgICB0aGlzLmRlZmF1bHQgPSBmdW5jdGlvbihoYW5kbGVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5kZWZhdWx0SGFuZGxlciAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBoYW5kbGVyRXJyb3IoJ2RlZmF1bHQgaGFuZGxlcicpXHJcblxyXG4gICAgICAgIHRoaXMuZGVmYXVsdEhhbmRsZXIgPSBoYW5kbGVyXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0cyB1cCBhIGZ1bmN0aW9uIHRoYXQgaXMgcnVuIGJlZm9yZSBldmVyeSBjb21tYW5kXHJcbiAgICAvLyBJZiBcImlnbm9yZVwiIGlzIHJldHVybmVkIGZyb20gYGhhbmRsZXJgLCB0aGUgY29ycmVzcG9uZGluZyByZWNlaXZlLCByZXNwb25kLCBzdHJlYW0sIG9yIGRlZmF1bHQgaGFuZGxlciB3aWxsIG5vdCBiZSBjYWxsZWRcclxuICAgIHRoaXMucHJlSGFuZGxlID0gZnVuY3Rpb24oaGFuZGxlcikge1xyXG4gICAgICAgIGlmKHRoaXMucHJlSGFuZGxlciAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBoYW5kbGVyRXJyb3IoJ3ByZUhhbmRsZScpXHJcblxyXG4gICAgICAgIHRoaXMucHJlSGFuZGxlciA9IGhhbmRsZXJcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXRzIHVwIGEgZnVuY3Rpb24gdGhhdCBpcyBydW4gYmVmb3JlIHRoZSBjb21tYW5kIGlzIGV2ZW4gcGFyc2VkXHJcbiAgICAvLyBJZiBcImlnbm9yZVwiIGlzIHJldHVybmVkIGZyb20gYGhhbmRsZXJgLCBwcmVIYW5kbGUgYW5kIHRoZSBjb3JyZXNwb25kaW5nIHJlY2VpdmUsIHJlc3BvbmQsIHN0cmVhbSwgb3IgZGVmYXVsdCBoYW5kbGVyIHdpbGwgbm90IGJlIGNhbGxlZFxyXG4gICAgdGhpcy5yYXdIYW5kbGUgPSBmdW5jdGlvbihoYW5kbGVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5yYXdIYW5kbGVyICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IGhhbmRsZXJFcnJvcigncmF3SGFuZGxlJylcclxuXHJcbiAgICAgICAgdGhpcy5yYXdIYW5kbGVyID0gaGFuZGxlclxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaXZhdGVcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDb21tYW5kKHRoYXQsIHR5cGUsIGNvbW1hbmQsIGhhbmRsZXIpIHtcclxuICAgICAgICBpZih0aGlzLmNvbW1hbmRzW2NvbW1hbmRdICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IGhhbmRsZXJFcnJvcignaGFuZGxlciBmb3IgXCInK2NvbW1hbmQrJ1wiJylcclxuICAgICAgICBpZihjb21tYW5kIGluIHJlc2VydmVkRmlyZUFuZEZvcmdldEVycm9yQ29tbWFuZHMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNldHVwIGEgaGFuZGxlciBmb3IgdGhlIGNvbW1hbmQgJ1wiK2NvbW1hbmQrXCInLCBiZWNhdXNlIGl0J3MgcmVzZXJ2ZWQgZm9yIGdsb2JhbCBlcnJvciBtZXNzYWdlcy4gVG8gaGFuZGxlIGdsb2JhbCBlcnJvcnMsIGxpc3RlbiB0byB0aGUgY29ubmVjdGlvbidzICdlcnJvcicgZXZlbnQuXCIpXHJcbiAgICAgICAgaWYoY29tbWFuZCBpbiByZXNlcnZlZEZpcmVBbmRGb3JnZXRDb21tYW5kcylcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgc2V0dXAgYSBoYW5kbGVyIGZvciB0aGUgY29tbWFuZCAnXCIrY29tbWFuZCtcIicsIGJlY2F1c2UgaXQncyByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNlLlwiKVxyXG5cclxuICAgICAgICB0aGlzLmNvbW1hbmRzW2NvbW1hbmRdID0ge3R5cGU6IHR5cGUsIGhhbmRsZXI6IGhhbmRsZXJ9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlckVycm9yKGhhbmRsZXJOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignQSAnK2hhbmRsZXJOYW1lKycgYWxyZWFkeSBleGlzdHMhIFlvdSBjYW4gb25seSBoYXZlIG9uZSBoYW5kbGVyIHBlciBjb21tYW5kLicpXHJcbiAgICB9XHJcbn0pXHJcblxyXG4vLyBBbiBpbnN0YW5jZSBvZiBScGVwQ29yZSBjYW4gZW1pdCB0aGUgZm9sbG93aW5nIGV2ZW50czpcclxuICAgIC8vIGNsb3NlKCkgLSBGaXJlZCBvbmNlIHRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZFxyXG4gICAgLy8gZXJyb3IoZSlcclxuICAgIC8vIG9wZW5NZXNzYWdlKCkgLSBGaXJlZCB3aGVuIGFuICdvcGVuJyBtZXNzYWdlIGlzIHJlY2VpdmVkLiBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXHJcbiAgICAvLyBjbG9zZU1lc3NhZ2UoKSAtIEZpcmVkIHdoZW4gYSAnY2xvc2UnIG1lc3NhZ2UgaXMgcmVjZWl2ZWQuIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cclxudmFyIFJwZXBDb25uZWN0aW9uID0gcHJvdG8oRXZlbnRFbWl0dGVyLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyBvcHRpb25zXHJcbiAgICAgICAgLy8gc2VydmVyIC0gU2hvdWxkIGJlIHRydWUgaWYgdGhlIGNvbm5lY3Rpb24gaXMgYmVpbmcgY3JlYXRkIGJ5IGEgc2VydmVyLCBmYWxzZSBvdGhlcndpc2VcclxuICAgICAgICAvLyBzZW5kQ29tbWFuZEVycm9ySW5mb1xyXG4gICAgICAgIC8vIG1heFNlbmRTaXplXHJcbiAgICAgICAgLy8gbWF4UmVjZWl2ZVNpemVcclxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKHJwZXBDb3JlT2JqZWN0LCBjb25uZWN0aW9uT2JqZWN0LCBycGVwT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gcnBlcENvcmVPYmplY3QudHJhbnNwb3J0XHJcbiAgICAgICAgdGhpcy5zZXJpYWxpemF0aW9uID0gcnBlcENvcmVPYmplY3Quc2VyaWFsaXphdGlvblxyXG4gICAgICAgIHRoaXMuY29tbWFuZHMgPSBycGVwQ29yZU9iamVjdC5jb21tYW5kc1xyXG5cclxuICAgICAgICB0aGlzLm1heFNlbmRTaXplID0gcnBlcENvcmVPYmplY3QucnBlcE9wdGlvbnMubWF4U2VuZFNpemVcclxuICAgICAgICB0aGlzLm1heFJlY2VpdmVTaXplID0gcnBlcENvcmVPYmplY3QucnBlcE9wdGlvbnMubWF4UmVjZWl2ZVNpemVcclxuICAgICAgICB0aGlzLnNlbmRDb21tYW5kRXJyb3JJbmZvID0gcnBlcENvcmVPYmplY3QucnBlcE9wdGlvbnMuc2VuZENvbW1hbmRFcnJvckluZm9cclxuICAgICAgICB0aGlzLnNlcnZlciA9IHJwZXBPcHRpb25zLnNlcnZlclxyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uT2JqZWN0XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5zZXNzaW9uRGF0YSA9IHt9XHJcbiAgICAgICAgdGhpcy5jb21tYW5kU3RhdGUgPSB7fVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuc2VydmVyKVxyXG4gICAgICAgICAgICB0aGlzLm5leHRJZCA9IDBcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMubmV4dElkID0gMVxyXG5cclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcclxuXHJcbiAgICAgICAgaWYodGhpcy5jb25uZWN0aW9uLm9uQ2xvc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uQ2xvc2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvbm5lY3RlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVtaXQoJ2Nsb3NlJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uKCdjbG9zZU1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29ubmVjdGVkID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZW1pdCgnY2xvc2UnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uTWVzc2FnZShmdW5jdGlvbihyYXdNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZSh0aGF0LCByYXdNZXNzYWdlKVxyXG4gICAgICAgICAgICB0aGF0LmVtaXQoJ3Jhd01lc3NhZ2UnLCByYXdNZXNzYWdlKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uRXJyb3IoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGF0LmVtaXQoJ2Vycm9yJywgZSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsb3NlcyB0aGUgY29ubmVjdGlvblxyXG4gICAgdGhpcy5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29ubmVjdGlvbi5vbkNsb3NlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNlbmQodGhhdCwgWydjbG9zZSddKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uY2xvc2UoKVxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSB1bmRlZmluZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBkcm9wcyB0aGUgY29ubmVjdGlvbiB3aXRob3V0IGluZm9ybWluZyB0aGUgb3RoZXIgUGVlciBpZiBzdXBwb3J0ZWQsIG90aGVyd2lzZSB3aXRoIGluZm9ybWluZyB0aGUgb3RoZXIgUGVlclxyXG4gICAgdGhpcy5kcm9wID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYodGhpcy5jb25uZWN0ZWQgJiYgdGhpcy5jb25uZWN0aW9uLmRyb3ApIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLmRyb3AoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmaXJlIGFuZCBmb3JnZXQgbWVzc2FnZVxyXG4gICAgdGhpcy5maXJlID0gZnVuY3Rpb24oY29tbWFuZCwgZGF0YSkge1xyXG4gICAgICAgIGlmKGNvbW1hbmQgaW4gcmVzZXJ2ZWRTZW5kaW5nQ29tbWFuZHMpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZmlyZSBhbiAnXCIrY29tbWFuZCtcIicgZXZlbnQgZGlyZWN0bHk7ICdcIitjb21tYW5kK1wiJyBpcyBhIGdsb2JhbCBjb21tYW5kIHJlc2VydmVkIGZvciBpbnRlcm5hbCB1c2UuXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZW5kKHRoaXMsIFtjb21tYW5kLCBkYXRhXSlcclxuICAgIH1cclxuICAgIC8vIGZpcmUgYW5kIGZvcmdldCBlcnJvclxyXG4gICAgLy8gVGhlIGVycm9yIG11c3QgY29udGFpbiBhIG1lc3NhZ2UgcHJvcGVydHkuIEFueSBvdGhlciBpdGVyYWJsZSBwcm9wZXJ0aWVzIHdpbGwgYmUgYWRkZWQgYXMgZGF0YS5cclxuICAgIHRoaXMuZmlyZUVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICBzZW5kKHRoaXMsIFsnZScsIFtlcnJvciwgZGF0YV1dKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlcXVlc3QgcmVzcG9uc2VcclxuICAgIHRoaXMucmVxdWVzdCA9IGZ1bmN0aW9uKGNvbW1hbmQsIGRhdGEpIHtcclxuICAgICAgICBpZihjb21tYW5kIGluIHJlc2VydmVkU2VuZGluZ0NvbW1hbmRzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGZpcmUgYW4gJ1wiK2NvbW1hbmQrXCInIGV2ZW50IGRpcmVjdGx5OyAnXCIrY29tbWFuZCtcIicgaXMgYSBnbG9iYWwgY29tbWFuZCByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNlLlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNvbW1hbmRTdGF0ZVt0aGlzLm5leHRJZF0gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBhbHJlYWR5IGEgY2FsbGJhY2sgZm9yIGlkOiAnK3RoaXMubmV4dElkKVxyXG5cclxuICAgICAgICBzZW5kKHRoaXMsIFtjb21tYW5kLCB0aGlzLm5leHRJZCwgZGF0YV0pXHJcblxyXG4gICAgICAgIHZhciByZXNvbHZlciA9IHJlc29sdmVyKClcclxuICAgICAgICB0aGlzLnJlcXVlc3RGdXR1cmVzW3RoaXMubmV4dElkXSA9IHJlc29sdmVyXHJcblxyXG4gICAgICAgIGluY3JlbWVudElkKHRoaXMpXHJcblxyXG4gICAgICAgIHJldHVybiByZXNvbHZlci5mXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZnVsbC1kdXBsZXggZXZlbnQgc3RyZWFtXHJcbiAgICB0aGlzLnN0cmVhbUNvbm5lY3QgPSBmdW5jdGlvbihjb21tYW5kLCBkYXRhKSB7XHJcbiAgICAgICAgaWYoY29tbWFuZCBpbiByZXNlcnZlZFNlbmRpbmdDb21tYW5kcykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBmaXJlIGFuICdcIitjb21tYW5kK1wiJyBldmVudCBkaXJlY3RseTsgJ1wiK2NvbW1hbmQrXCInIGlzIGEgZ2xvYmFsIGNvbW1hbmQgcmVzZXJ2ZWQgZm9yIGludGVybmFsIHVzZS5cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jb21tYW5kU3RhdGVbdGhpcy5uZXh0SWRdICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgaXMgYWxyZWFkeSBhIGNhbGxiYWNrIGZvciBpZDogJyt0aGlzLm5leHRJZClcclxuXHJcbiAgICAgICAgc2VuZCh0aGlzLCBbY29tbWFuZCwgdGhpcy5uZXh0SWQsIGRhdGFdKVxyXG4gICAgICAgIHZhciBlbWl0dGVyID0gY3JlYXRlU3RyZWFtRW1pdGVyKHRoaXMsIHRoaXMubmV4dElkKVxyXG5cclxuICAgICAgICBpbmNyZW1lbnRJZCh0aGlzKVxyXG5cclxuICAgICAgICByZXR1cm4gZW1pdHRlclxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaXZhdGVcclxuXHJcbiAgICBmdW5jdGlvbiBzZXJpYWxpemUodGhhdCxkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuc2VyaWFsaXphdGlvbi5zZXJpYWxpemUoZGF0YSlcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGRlc2VyaWFsaXplKHRoYXQsc2VyaWFsaXplZERhdGEpIHtcclxuICAgICAgICByZXR1cm4gdGhhdC5zZXJpYWxpemF0aW9uLmRlc2VyaWFsaXplKHNlcmlhbGl6ZWREYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1heSBzZW5kIGFuIGlkRGlzY29udGludWl0eSBtZXNzYWdlXHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRJZCh0aGF0KSB7XHJcbiAgICAgICAgdmFyIHByZXZJZCA9IHRoYXQubmV4dElkXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICB0aGF0Lm5leHRJZCArPSAyXHJcbiAgICAgICAgICAgIGlmKHRoYXQubmV4dElkID4gbWF4SWQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubmV4dElkID0gdGhhdC5uZXh0SWQlMiAvLyByZXNldCB0byAwIG9yIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gd2hpbGUodGhhdC5uZXh0SWQgaW4gdGhhdC5jb21tYW5kU3RhdGUpXHJcblxyXG4gICAgICAgIGlmKHRoYXQubmV4dElkICE9PSBwcmV2SWQrMikge1xyXG4gICAgICAgICAgICBzZW5kKHRoYXQsIFsnaWREaXNjb250aW51aXR5JywgW3ByZXZJZCx0aGF0Lm5leHRpZF1dKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBtYXkgc2VuZCBhbiBkaXNjdG9udGludWl0eSBtZXNzYWdlXHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRPcmRlck51bWJlcihlbWl0dGVyKSB7XHJcbiAgICAgICAgZW1pdHRlci5vcmRlck51bWJlciArPSAxXHJcbiAgICAgICAgaWYoZW1pdHRlci5vcmRlck51bWJlciA+IG1heElkKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2TnVtYmVyID0gZW1pdHRlci5vcmRlck51bWJlci0xXHJcbiAgICAgICAgICAgIGVtaXR0ZXIub3JkZXJOdW1iZXIgPSAwXHJcbiAgICAgICAgICAgIGVtaXR0ZXIuZW1pdCgpXHJcbiAgICAgICAgICAgIHNlbmQodGhhdCwgW2VtaXR0ZXIuaWQsICdvcmRlck51bWJlckRpc2NvbnRpbnVpdHknLCBbcHJldk51bWJlciwgdGhhdC5vcmRlck51bWJlcl1dKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBlcnJvciBpcyBleHBlY3RlZCB0byBiZSBhbiBleGNlcHRpb24gb2JqZWN0ICh3aXRoIGEgbWVzc2FnZSBwcm9wZXJ0eSBhdCBsZWFzdClcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVycm9ySW5mbyhlcnJvcikge1xyXG4gICAgICAgIHZhciBkYXRhID0ge30sIGFueSA9IGZhbHNlXHJcbiAgICAgICAgZm9yKHZhciBrIGluIGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmKGsgIT09ICdtZXNzYWdlJykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtrXSA9IGVycm9yW2tdXHJcbiAgICAgICAgICAgICAgICBhbnkgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBlcnJvckluZm8gPSBbZXJyb3IubWVzc2FnZV1cclxuICAgICAgICBpZihhbnkpIHtcclxuICAgICAgICAgICAgZXJyb3JJbmZvLnB1c2goZGF0YSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvckluZm9cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFcnJvckZyb21NZXNzYWdlKGVycm9yTWVzc2FnZSwgZXJyb3JEYXRhKSB7XHJcbiAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKVxyXG4gICAgICAgIGZvcih2YXIgayBpbiBlcnJvckRhdGEpIHtcclxuICAgICAgICAgICAgaWYoayAhPT0gJ21lc3NhZ2UnKVxyXG4gICAgICAgICAgICAgICAgZVtrXSA9IGVycm9yRGF0YVtrXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdHJlYW1FbWl0ZXIodGhhdCwgaWQpIHtcclxuICAgICAgICB2YXIgZW1pdHRlciA9IFJwZXBEdXBsZXhFdmVudEVtaXR0ZXIoZnVuY3Rpb24gb25FbWl0KGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKGVtaXR0ZXIuZW5kTWVzc2FnZVNlbnQpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJlYW0gJ2VuZCcgZXZlbnQgaGFzIGJlZW4gc2VudCwgY2FuJ3Qgc2VuZCBtb3JlIGV2ZW50cy5cIilcclxuXHJcbiAgICAgICAgICAgIGlmKGV2ZW50ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICBpZihlbWl0dGVyLm9yZGVyaW5nRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbmQodGhhdCwgW2lkLCdlJyxjcmVhdGVFcnJvckluZm8oZGF0YSldKVxyXG4gICAgICAgICAgICAgICAgICAgIGluY3JlbWVudE9yZGVyTnVtYmVyKGVtaXR0ZXIpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbmQodGhhdCwgW2lkLCdlJyxjcmVhdGVFcnJvckluZm8oZGF0YSldKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoZXZlbnQgaW4gcmVzZXJ2ZWRTdHJlYW1FbWlzc2lvbkV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZW1pdCB0aGUgJ1wiK2V2ZW50K1wiJyBldmVudCBkaXJlY3RseTsgJ1wiK2V2ZW50K1wiJyBpcyByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNlLlwiKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VuZCh0aGF0LCBbaWQsZXZlbnQsY3JlYXRlRXJyb3JJbmZvKGRhdGEpXSlcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50ID09PSAnZW5kJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW5kTWVzc2FnZVNlbnQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZW1pdHRlci5lbmRNZXNzYWdlUmVjZWl2ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoYXQuY29tbWFuZFN0YXRlW2lkXSAvLyBlbnN1cmVzIHRoYXQgXCJycGVwSWROb3RGb3VuZFwiIHdpbGwgYmUgcmV0dXJuZWQgaWYgdGhpcyBzdHJlYW0gY29udGludWVzIHRvIGJlIGNvbW11bmljYXRlZCBvblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGVtaXR0ZXIuaWQgPSBpZFxyXG4gICAgICAgIGVtaXR0ZXIub3JkZXJpbmdEYXRhID0gZmFsc2VcclxuICAgICAgICBlbWl0dGVyLm9yZGVyTnVtYmVyID0gMFxyXG4gICAgICAgIGVtaXR0ZXIuZW5kTWVzc2FnZVNlbnQgPSBmYWxzZVxyXG4gICAgICAgIHJldHVybiBlbWl0dGVyXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmF3IHNlbmRcclxuICAgIGZ1bmN0aW9uIHNlbmQodGhhdCwgbWVzc2FnZSkge1xyXG4gICAgICAgIHZhciBzZXJpYWxpemVkTWVzc2FnZSA9IHNlcmlhbGl6ZSh0aGF0LCBtZXNzYWdlKVxyXG4gICAgICAgIGlmKHRoYXQubWF4U2VuZFNpemUgIT09IHVuZGVmaW5lZCAmJiBzZXJpYWxpemVkTWVzc2FnZS5sZW5ndGggPiB0aGF0Lm1heFNlbmRTaXplKSB7XHJcbiAgICAgICAgICAgIHZhciBlID0gbmV3IEVycm9yKCdtYXhNZXNzYWdlU2l6ZUV4Y2VlZGVkJylcclxuICAgICAgICAgICAgZS5tZXNzYWdlU2l6ZSA9IHNlcmlhbGl6ZWRNZXNzYWdlLmxlbmd0aFxyXG4gICAgICAgICAgICB0aHJvdyBlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uc2VuZChzZXJpYWxpemVkTWVzc2FnZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQ29ubmVjdGlvbiBpcyBjbG9zZWQnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGUodGhhdCwgcmF3TWVzc2FnZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmKHRoYXQucmF3SGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5yYXdIYW5kbGVyLmNhbGwodGhhdCwgcmF3TWVzc2FnZSkgPT09ICdpZ25vcmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGRlc2VyaWFsaXplKHRoYXQsIHJhd01lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5zZW5kQ29tbWFuZEVycm9ySW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlyZUVycm9yKFwidW5wYXJzYWJsZUNvbW1hbmRcIiwge21lc3NhZ2U6IHJhd01lc3NhZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlLm1lc3NhZ2UgPT09ICdtYXhNZXNzYWdlU2l6ZUV4Y2VlZGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlyZUVycm9yKFwidW5wYXJzYWJsZUNvbW1hbmRcIiwge21lc3NhZ2U6IHJhd01lc3NhZ2Uuc2xpY2UoMCwyMDApfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB0aHJvdyBlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGF0LnByZUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoYXQucHJlSGFuZGxlci5jYWxsKHRoYXQsIG1lc3NhZ2UpID09PSAnaWdub3JlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZTAgPSB0eXBlb2YobWVzc2FnZVswXSlcclxuICAgICAgICAgICAgaWYodHlwZTAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvcGVuIGFuZCBjbG9zZSBmaXJlLWFuZC1mb3JnZXQgY29ubmVjdGlvbiBlc3RhYmxpc2htZW50IG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UubGVuZ2ggPT09IDAgJiYgdHlwZTAgPT09ICdjbG9zZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVtaXQoXCJjbG9zZU1lc3NhZ2VcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29tbWFuZEluZm8gPSB0aGF0LmNvbW1hbmRzW2NvbW1hbmRdXHJcbiAgICAgICAgICAgICAgICBpZihjb21tYW5kSW5mbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maXJlRXJyb3IoXCJub1N1Y2hDb21tYW5kXCIsIHtjb21tYW5kOiBtZXNzYWdlWzFdfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihjb21tYW5kSW5mby50eXBlID09PSByZWNlaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZEluZm8uaGFuZGxlci5jYWxsKHRoYXQsIG1lc3NhZ2VbMV0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY29tbWFuZEluZm8udHlwZSA9PT0gcmVzcG9uZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IG1lc3NhZ2VbMV1cclxuICAgICAgICAgICAgICAgICAgICBpZighdmFsaWRhdGVJZCh0aGlzLCBpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZEluZm8uaGFuZGxlci5jYWxsKHRoYXQsIG1lc3NhZ2VbMl0sIGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmQodGhhdCwgW2lkLHJlc3VsdF0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlIGluc3RhbmNlb2YgUGVlckVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kKHRoYXQsIFtpZCwnZScsY3JlYXRlRXJyb3JJbmZvKGUpXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW1pdCgnZXJyb3InLCBlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZCh0aGF0LCBbaWQsJ2UnLGNyZWF0ZUVycm9ySW5mbyh7bWVzc2FnZTonc2VydmVyRXJyb3InfSldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb21tYW5kSW5mby50eXBlID09PSBzdHJlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBtZXNzYWdlWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXZhbGlkYXRlSWQodGhpcywgaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW1pdHRlciA9IGNvbm5lY3Rpb24uY29tbWFuZFN0YXRlW2lkXSA9IGNyZWF0ZVN0cmVhbUVtaXRlcih0aGF0LGlkKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kSW5mby5oYW5kbGVyLmNhbGwodGhhdCwgZW1pdHRlciwgbWVzc2FnZVsyXSwgaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVtaXQoJ2Vycm9yJywgZSkgLy8gbm90ZSB0aGF0IFBlZXJFcnJvciBvYmplY3RzIGFyZSB0cmVhdGVkIGxpa2Ugbm9ybWFsIEVycm9ycyBoZXJlIC0gdG8gZW1pdCBhbiBlcnJvciwgeW91IG11c3QgZW1pdCBhbiAnZXJyb3InIGV2ZW50IGZyb20gdGhlIHBhc3NlZCBlbWl0dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBjb21tYW5kIHR5cGU6IFwiK2NvbW1hbmRJbmZvLnR5cGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZTAgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpZighKHR5cGUwIGluIHRoYXQuY29tbWFuZFN0YXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmlyZUVycm9yKFwicnBlcElkTm90Rm91bmRcIiwge2lkOiB0eXBlMH0pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5jb21tYW5kU3RhdGVbdHlwZTBdIGluc3RhbmNlb2YgUnBlcER1cGxleEV2ZW50RW1pdHRlcikgeyAvL3N0cmVhbVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbWl0dGVyID0gdGhhdC5jb21tYW5kU3RhdGVbdHlwZTBdXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZW1pdHRlci5vcmRlcmluZ0RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyTnVtYmVyID0gbWVzc2FnZVsxXSwgZXZlbnQgPSBtZXNzYWdlWzJdLCBldmVudERhdGEgPSBtZXNzYWdlWzNdXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbWVzc2FnZVsxXSwgZXZlbnREYXRhID0gbWVzc2FnZVsyXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQgPT09ICdvcmRlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5vcmRlcmluZ0RhdGEgPSBldmVudERhdGEgIT09IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihldmVudCA9PT0gJ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBjcmVhdGVFcnJvckZyb21NZXNzYWdlKGV2ZW50RGF0YVswXSwgZXZlbnREYXRhWzFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5fZXh0ZXJuYWwuZW1pdCgnZXJyb3InLCBlcnJvciwgb3JkZXJOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLl9leHRlcm5hbC5lbWl0KGV2ZW50LCBldmVudERhdGEsIG9yZGVyTnVtYmVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50ID09PSAnZW5kJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW5kTWVzc2FnZVJlY2VpdmVkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVtaXR0ZXIuZW5kTWVzc2FnZVNlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoYXQuY29tbWFuZFN0YXRlW3R5cGUwXSAvLyBlbnN1cmVzIHRoYXQgXCJycGVwSWROb3RGb3VuZFwiIHdpbGwgYmUgcmV0dXJuZWQgaWYgdGhpcyBzdHJlYW0gY29udGludWVzIHRvIGJlIGNvbW11bmljYXRlZCBvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZVJlc29sdmVyID0gdGhhdC5jb21tYW5kU3RhdGVbdHlwZTBdXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZS5sZW5ndGggPT09IDMpIHsgLy8gZXJyb3IgcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlUmVzb2x2ZXIucmVqZWN0KGNyZWF0ZUVycm9yRnJvbU1lc3NhZ2UobWVzc2FnZVsyXVswXSwgbWVzc2FnZVsyXVsxXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gbm9ybWFsIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVJlc29sdmVyLnJlc29sdmUobWVzc2FnZVsxXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGF0LnNlbmRDb21tYW5kRXJyb3JJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maXJlRXJyb3IoXCJpbnZhbGlkTWVzc2FnZVwiLCB7bWVzc2FnZTogcmF3TWVzc2FnZS5zbGljZSgwLDIwMCl9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpcmVFcnJvcihcImludmFsaWRNZXNzYWdlXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5lbWl0KCdlcnJvcicsIGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gc2VuZHMgYW4gcnBlcEludmFsaWRJZCBlcnJvciBmaXJlLWFuZC1mb3JnZXQgbWVzc2FnZSBpZiB0aGUgaWQgaXNuJ3QgdmFsaWRcclxuLy8gcmV0dXJucyB0cnVlIGlmIHRoZSBpZCBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlXHJcbmZ1bmN0aW9uIHZhbGlkYXRlSWQodGhhdCwgaWQpIHtcclxuICAgIGlmKGlkID4gbWF4SWQpIHtcclxuICAgICAgICB2YXIgcmVhc29uID0gXCJJZCBncmVhdGVyIHRoYW4gMl41M1wiXHJcbiAgICB9IGVsc2UgaWYodGhhdC5zZXJ2ZXIpIHtcclxuICAgICAgICBpZihpZCUyICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciByZWFzb24gPSBcIklkIGZyb20gY2xpZW50IG5vdCBvZGRcIlxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZihpZCUyICE9PSAwKSB7XHJcbiAgICAgICAgdmFyIHJlYXNvbiA9IFwiSWQgZnJvbSBzZXJ2ZXIgbm90IGV2ZW5cIlxyXG4gICAgfVxyXG5cclxuICAgIGlmKHJlYXNvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhhdC5maXJlRXJyb3IoJ3JwZXBJbnZhbGlkSWQnLCB7cmVhc29uOiByZWFzb259KVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNvbHZlcigpIHtcclxuICAgIHZhciByZXNvbHZlLCByZWplY3RcclxuICAgIHZhciBmID0gbmV3IFByb21pc2UoZnVuY3Rpb24oaW5SZXNvbHZlLCBpblJlamVjdCkge1xyXG4gICAgICAgIHJlc29sdmUgPSBpblJlc29sdmVcclxuICAgICAgICByZWplY3QgPSBpblJlamVjdFxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4ge2Y6IGYsIHJlc29sdmU6cmVzb2x2ZSwgcmVqZWN0OnJlamVjdH1cclxufVxyXG5cclxuXHJcbnZhciBScGVwRHVwbGV4RXZlbnRFbWl0dGVyID0gcHJvdG8oRHVwbGV4RXZlbnRFbWl0dGVyLCBmdW5jdGlvbihzdXBlcmNsYXNzKSB7XHJcbiAgICB0aGlzLm9uID0gZnVuY3Rpb24oZXZlbnQsaGFuZGxlcikge1xyXG4gICAgICAgIGlmKGV2ZW50IGluIHJlc2VydmVkRXZlbnRMaXN0ZW5pbmdFdmVudHMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGxpc3RlbiBvbiB0aGUgJ1wiK2V2ZW50K1wiJyBldmVudCBkaXJlY3RseTsgdGhlICdcIitldmVudCtcIicgZXZlbnQgaXMgcmVzZXJ2ZWQgZm9yIGludGVybmFsIHVzZS5cIilcclxuXHJcbiAgICAgICAgc3VwZXJjbGFzcy5vbi5jYWxsKHRoaXMsIGV2ZW50LGhhbmRsZXIpXHJcbiAgICB9XHJcbn0pIl19


/***/ }),
/* 3 */
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
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
/* 4 */
/*!*******************************!*\
  !*** ./DuplexEventEmitter.js ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var proto = __webpack_require__(/*! proto */ 1);
var EventEmitter = __webpack_require__(/*! eventemitter2 */ 0);
module.exports = proto(function () {
    this.init = function (onEmitHandler) {
        this._external = new EventEmitter();
        this._onEmitHandler = onEmitHandler;
    };
    this.emit = function (event, data) {
        if (this.ended) 
            throw new Error("Duplex Stream has already been ended.");
        this._onEmitHandler(event, data);
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
    this.end = function () {
        this.emit('end');
        this.ended = true;
    };
});


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFxEdXBsZXhFdmVudEVtaXR0ZXIuanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEdBQUEsQ0FBSSxRQUFRLE9BQUEsQ0FBUTtBQUNwQixHQUFBLENBQUksZUFBZSxPQUFBLENBQVE7QUFHM0IsTUFBQSxDQUFPLE9BQVAsQ0FBQSxDQUFBLENBQWlCLEtBQUEsQ0FBTSxZQUFXO0lBQzlCLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZLFVBQVMsZUFBZTtRQUNoQyxJQUFBLENBQUssU0FBTCxDQUFBLENBQUEsQ0FBaUIsSUFBSSxZQUFKO1FBQ2pCLElBQUEsQ0FBSyxjQUFMLENBQUEsQ0FBQSxDQUFzQjtJQUM5QjtJQUVJLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZLFVBQVMsS0FBTyxFQUFBLE1BQU07UUFDOUIsSUFBRyxJQUFBLENBQUs7WUFBTyxNQUFNLElBQUksS0FBSixDQUFVO1FBQy9CLElBQUEsQ0FBSyxjQUFMLENBQW9CLE9BQU07SUFDbEM7SUFDSSxJQUFBLENBQUssRUFBTCxDQUFBLENBQUEsQ0FBVSxVQUFTLEtBQU0sRUFBQSxTQUFTO1FBQzlCLElBQUEsQ0FBSyxTQUFMLENBQWUsRUFBZixDQUFrQixPQUFNO0lBQ2hDO0lBQ0ksSUFBQSxDQUFLLEdBQUwsQ0FBQSxDQUFBLEVBQVcsSUFBQSxDQUFLLGNBQUwsQ0FBQSxDQUFBLENBQXNCLFVBQVMsS0FBTyxFQUFBLFNBQVM7UUFDdEQsSUFBQSxDQUFLLFNBQUwsQ0FBZSxjQUFmLENBQThCLE9BQU07SUFDNUM7SUFDSSxJQUFBLENBQUssS0FBTCxDQUFBLENBQUEsQ0FBYSxVQUFTLFNBQVM7UUFDM0IsSUFBQSxDQUFLLFNBQUwsQ0FBZSxLQUFmLENBQXFCO0lBQzdCO0lBRUksSUFBQSxDQUFLLEdBQUwsQ0FBQSxDQUFBLENBQVcsWUFBVztRQUNsQixJQUFBLENBQUssSUFBTCxDQUFVO1FBQ1YsSUFBQSxDQUFLLEtBQUwsQ0FBQSxDQUFBLENBQWE7SUFDckI7QUFDQTtBQTVCQSIsImZpbGUiOiJEOlxcYmlsbHlzRmlsZVxcY29kZVxcamF2YXNjcmlwdFxcbW9kdWxlc1xccnBlcC5qc1xcRHVwbGV4RXZlbnRFbWl0dGVyLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbInZhciBwcm90byA9IHJlcXVpcmUoXCJwcm90b1wiKVxudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjInKVxuXG4vLyBhbiBldmVudCBlbWl0dGVyIHdoZXJlIGxpc3RlbmluZyB0byBpdCBsaXN0ZW5zIHRvIHRoZSBvdGhlciBlbmQgYW5kIGVtaXR0aW5nIGVtaXRzIHRvIHRoZSBvdGhlciBlbmRcbm1vZHVsZS5leHBvcnRzID0gcHJvdG8oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24ob25FbWl0SGFuZGxlcikge1xuICAgICAgICB0aGlzLl9leHRlcm5hbCA9IG5ldyBFdmVudEVtaXR0ZXJcbiAgICAgICAgdGhpcy5fb25FbWl0SGFuZGxlciA9IG9uRW1pdEhhbmRsZXJcbiAgICB9XG5cbiAgICB0aGlzLmVtaXQgPSBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuICAgICAgICBpZih0aGlzLmVuZGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsZXggU3RyZWFtIGhhcyBhbHJlYWR5IGJlZW4gZW5kZWQuXCIpXG4gICAgICAgIHRoaXMuX29uRW1pdEhhbmRsZXIoZXZlbnQsZGF0YSlcbiAgICB9XG4gICAgdGhpcy5vbiA9IGZ1bmN0aW9uKGV2ZW50LGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fZXh0ZXJuYWwub24oZXZlbnQsaGFuZGxlcilcbiAgICB9XG4gICAgdGhpcy5vZmYgPSB0aGlzLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fZXh0ZXJuYWwucmVtb3ZlTGlzdGVuZXIoZXZlbnQsaGFuZGxlcilcbiAgICB9XG4gICAgdGhpcy5vbkFueSA9IGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fZXh0ZXJuYWwub25BbnkoaGFuZGxlcilcbiAgICB9XG5cbiAgICB0aGlzLmVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2VuZCcpXG4gICAgICAgIHRoaXMuZW5kZWQgPSB0cnVlXG4gICAgfVxufSkiXX0=


/***/ })
/******/ ]);
});
//# sourceMappingURL=rpep-dev.umd.js.map