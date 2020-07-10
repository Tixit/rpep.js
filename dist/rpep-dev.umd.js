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
var utils = __webpack_require__(/*! ./utils */ 4);
var DuplexEventEmitter = __webpack_require__(/*! ./DuplexEventEmitter */ 5);
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
        EventEmitter.call(this);
        if (!options) 
            options = {};
        this.transport = transport;
        this.serialization = serialization;
        this.options = options;
        if (this.options.maxId === undefined) 
            this.options.maxId = defaultMaxId;
        if (this.options.sendCommandErrorInfo === undefined) 
            this.options.sendCommandErrorInfo = true;
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
                        var e = err("connectionFailure", message);
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
                that.emit('listening');
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
        EventEmitter.call(this);
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
        var connectionHasBeenOpened = false;
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
        this.connection.onOpen(function () {
            connectionHasBeenOpened = true;
        });
        this.connection.onError(function (e) {
            if (connectionHasBeenOpened) 
                that.emit('error', e);
        });
    };
    this.close = function () {
        var that = this;
        if (this.connected && !this.closing) {
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
            var e = err('maxMessageSizeExceeded');
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
                that.emit('error', createUnparsableCommandError(rawMessage));
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
                    emitter.command = message[0];
                    try {
                        commandInfo.handler.apply(that, [emitter].concat(getArrayData(message[2])).concat([id]));
                    } catch (e) {
                        that.emit('error', e);
                    }
                } else {
                    throw err("invalidCommandType", "Invalid command type: " + commandInfo.type);
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
                        throw err("invalidStreamMessage", "Received invalid stream message: couldn't find string event name at position 1 or 2 in the message");
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
                that.emit('error', createUnparsableCommandError(rawMessage));
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
function createUnparsableCommandError(rawMessage) {
    var unparsableCommmandError = err("unparsableCommand", "'" + rawMessage + "'");
    unparsableCommmandError.name = 'UnparsableCommand';
    return unparsableCommmandError;
}

function err(code, message) {
    var error = new Error(message || code);
    error.code = code;
    return error;
}



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxtb2R1bGVzXFxycGVwLmpzXFxycGVwLmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxHQUFBLENBQUksZUFBZSxPQUFBLENBQVE7QUFDM0IsR0FBQSxDQUFJLFFBQVEsT0FBQSxDQUFRO0FBRXBCLEdBQUEsQ0FBSSxRQUFRLE9BQUEsQ0FBUTtBQUNwQixHQUFBLENBQUkscUJBQXFCLE9BQUEsQ0FBUTtBQUdqQyxHQUFBLENBQUksVUFBVTtBQUNkLEdBQUEsQ0FBSSxVQUFVO0FBQ2QsR0FBQSxDQUFJLFNBQVM7QUFFYixHQUFBLENBQUksZUFBZTtBQUNuQixHQUFBLENBQUksdUJBQXVCO0lBQUMsT0FBTSxDQUFQLENBQUE7SUFBUyxpQkFBZ0I7O0FBQ3BELEdBQUEsQ0FBSSxtQ0FBbUM7SUFBQyxPQUFNLENBQVAsQ0FBQTtJQUFTLGlCQUFnQjs7QUFDaEUsR0FBQSxDQUFJLHVDQUF1QztJQUFDLE9BQU07O0FBQ2xELEdBQUEsQ0FBSSw0QkFBNEI7SUFBQyxPQUFNOztBQUN2QyxHQUFBLENBQUkseUNBQXlDO0lBQUMsaUJBQWdCOztBQUM5RCxHQUFBLENBQUksK0JBQStCO0lBQUMsT0FBTTs7QUFDMUMsR0FBQSxDQUFJLCtCQUErQjtJQUFDLDBCQUF5Qjs7QUFHN0QsR0FBQSxDQUFJLFNBQVM7QUFFYixHQUFBLENBQUksWUFBWSxLQUFBLENBQU0sT0FBTyxZQUFXO0lBQ3BDLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZO0FBQ2hCO0FBS0EsTUFBQSxDQUFPLE9BQVAsQ0FBQSxDQUFBLENBQWlCLEtBQUEsQ0FBTSxjQUFjLFlBQVc7SUFLNUMsSUFBQSxDQUFLLFNBQUwsQ0FBQSxDQUFBLENBQWlCO0lBa0RqQixJQUFBLENBQUssSUFBTCxDQUFBLENBQUEsQ0FBWSxVQUFTLFNBQVcsRUFBQSxhQUFlLEVBQUEsU0FBUztRQUNwRCxZQUFBLENBQWEsSUFBYixDQUFrQjtRQUVsQixJQUFH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QUM5QixJQUFHLEtBQUEsQ0FBQSxFQUFBLENBQVM7WUFDUixNQUFNLElBQUksS0FBSixDQUFVLHVCQUFBLENBQUEsQ0FBQSxDQUF3QixLQUF4QixDQUFBLENBQUEsQ0FBOEIseUJBQTlCLENBQUEsQ0FBQSxDQUF3RCxLQUF4RCxDQUFBLENBQUEsQ0FBOEQ7UUFFbEYsVUFBQSxDQUFXLEVBQVgsQ0FBYyxJQUFkLENBQW1CLE1BQU0sT0FBTTtJQUN2QztJQUVJLElBQUEsQ0FBSyxLQUFMLENBQUEsQ0FBQSxDQUFhLFVBQVMsVUFBVTtRQUM1QixVQUFBLENBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFzQixPQUFNLFVBQVMsV0FBVztZQUM1QyxJQUFHLEVBQUUsU0FBQSxDQUFBLEVBQUEsQ0FBYSwrQkFBK0I7Z0JBQzdDLFFBQUEsQ0FBUyxLQUFULENBQWUsTUFBTTtZQUNyQztRQUNBLEVBSm9DLENBSTFCLElBSjBCLENBSXJCO0lBQ2Y7QUFDQTtBQUVBLFNBQVMsNkJBQTZCLFlBQVk7SUFDOUMsR0FBQSxDQUFJLDBCQUEwQixHQUFBLENBQUkscUJBQXFCLEdBQUEsQ0FBQSxDQUFBLENBQUksVUFBSixDQUFBLENBQUEsQ0FBZTtJQUN0RSx1QkFBQSxDQUF3QixJQUF4QixDQUFBLENBQUEsQ0FBK0I7SUFDL0IsT0FBTztBQUNYOztBQUVBLFNBQVMsSUFBSSxJQUFNLEVBQUEsU0FBUztJQUN4QixHQUFBLENBQUksUUFBUSxJQUFJLEtBQUosQ0FBVSxPQUFBLENBQUEsRUFBQSxDQUFXO0lBQ2pDLEtBQUEsQ0FBTSxJQUFOLENBQUEsQ0FBQSxDQUFhO0lBQ2IsT0FBTztBQUNYOztBQTkwQkEiLCJmaWxlIjoiRDpcXGJpbGx5c0ZpbGVcXGNvZGVcXG1vZHVsZXNcXHJwZXAuanNcXHJwZXAuanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjInKVxyXG52YXIgcHJvdG8gPSByZXF1aXJlKFwicHJvdG9cIilcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpXHJcbnZhciBEdXBsZXhFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL0R1cGxleEV2ZW50RW1pdHRlcicpXHJcblxyXG4vLyBlbnVtc1xyXG52YXIgcmVjZWl2ZSA9IDBcclxudmFyIHJlc3BvbmQgPSAxXHJcbnZhciBzdHJlYW0gPSAyXHJcblxyXG52YXIgZGVmYXVsdE1heElkID0gOTAwNzE5OTI1NDc0MDk5MiAvLyAyXjUzXHJcbnZhciByZXNlcnZlZEZpcmVDb21tYW5kcyA9IHtjbG9zZToxLGlkRGlzY29udGludWl0eToxfVxyXG52YXIgcmVzZXJ2ZWRSZXF1ZXN0QW5kU3RyZWFtQ29tbWFuZHMgPSB7Y2xvc2U6MSxpZERpc2NvbnRpbnVpdHk6MX1cclxudmFyIHJlc2VydmVkUmVxdWVzdEFuZFN0cmVhbUVycm9yQ29tbWFuZCA9IHtlcnJvcjoxfVxyXG52YXIgcmVzZXJ2ZWRMaXN0ZW5pbmdDb21tYW5kcyA9IHtjbG9zZToxfVxyXG52YXIgcmVzZXJ2ZWRSZXNwb25kQW5kU3RyZWFtTGlzdGVuQ29tbWFuZHMgPSB7aWREaXNjb250aW51aXR5OjF9XHJcbnZhciByZXNlcnZlZEV2ZW50TGlzdGVuaW5nRXZlbnRzID0ge29yZGVyOjF9XHJcbnZhciByZXNlcnZlZFN0cmVhbUVtaXNzaW9uRXZlbnRzID0ge29yZGVyTnVtYmVyRGlzY29udGludWl0eToxfVxyXG5cclxuXHJcbnZhciBidWZmZXIgPSA1MCAvLyBzb21lIGJ1ZmZlciBmb3IgbWVzc2FnZSBoZWFkZXIgc3R1ZmZcclxuXHJcbnZhciBQZWVyRXJyb3IgPSBwcm90byhFcnJvciwgZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBcIlBlZXJFcnJvclwiXHJcbn0pXHJcblxyXG4vLyBBbiBpbnN0YW5jZSBvZiBScGVwQ29yZSBjYW4gZW1pdCB0aGUgZm9sbG93aW5nIGV2ZW50czpcclxuICAgIC8vICdjbG9zZScgLSBGaXJlZCBvbmNlIHRoZSBsaXN0ZW5pbmcgc2VydmVyIGhhcyBiZWVuIGNsb3NlZFxyXG4gICAgLy8gJ2Vycm9yJyAtIEZpcmVkIGlmIHRoZXJlIHdhcyBhbiBlcnJvciByZWxhdGVkIHRvIGxpc3RlbmluZ1xyXG5tb2R1bGUuZXhwb3J0cyA9IHByb3RvKEV2ZW50RW1pdHRlciwgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gc3RhdGljIHByb3BlcnRpZXNcclxuXHJcbiAgICAvLyBhbiBlcnJvciB0aGF0LCB3aGVuIHRocm93biwgc2VuZHMgdGhlIGVycm9yIGFzIGFuIGVycm9yIHJlc3BvbnNlIHRvIHRoZSBvdGhlciBQZWVyIChpbmNsdWRpbmcgaXRlcmFibGUgcHJvcGVydGllcywgYnV0IG5vdCBpbmNsdWRpbmcgdGhlIHN0YWNrKVxyXG4gICAgdGhpcy5QZWVyRXJyb3IgPSBQZWVyRXJyb3JcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBwcm9wZXJ0aWVzXHJcblxyXG4gICAgLy8gdHJhbnNwb3J0IGlzIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kczpcclxuICAgICAgICAvLyBjb25uZWN0KC8qdHJhbnNwb3J0IGNvbm5lY3QgcGFyYW1ldGVycy4uLiAqLywgcnBlcE9wdGlvbnMpIC0gY29ubmVjdHMgdG8gYSB3ZWJzb2NrZXQgc2VydmVyXHJcbiAgICAgICAgICAgIC8vIHRyYW5zcG9ydCBjb25uZWN0IHBhcmFtZXRlcnMuLi4gLSBBIHZhcmlhYmxlIG51bWJlciBvZiB0cmFuc3BvcnQgY29ubmVjdCBwYXJhbWV0ZXJzIHBhc3NlZCBpbnRvIHJwZXBQZWVyLmNvbm5lY3RcclxuICAgICAgICAgICAgLy8gcnBlcE9wdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWF4U2VuZFNpemUgYW5kIG1heFJlY2VpdmVTaXplIG9wdGlvbnNcclxuICAgICAgICAgICAgLy8gcmV0dXJucyBhIGNvbm5lY3Rpb24gb2JqZWN0XHJcbiAgICAgICAgICAgICAgIC8vIHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzOlxyXG4gICAgICAgICAgICAgICAgLy8gc2VuZChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgLy8gY2xvc2UoKSAtIENsb3NlcyB0aGUgY29ubmVjdGlvbiBpbiBhIHdheSB0aGF0IGFjdGl2ZWx5IGluZm9ybXMgdGhlIG90aGVyIFBlZXIgYWJvdXQgY2xvc3VyZS5cclxuICAgICAgICAgICAgICAgIC8vIGRyb3AoKSAtIChPcHRpb25hbCkgQ2xvc2VzIHRoZSBjb25uZWN0aW9uIHdpdGhvdXQgaW5mb3JtaW5nIHRoZSBvdGhlciBQZWVyLlxyXG4gICAgICAgICAgICAgICAvLyBhbmQgdGhlIGZvbGxvd2luZyBldmVudC1oYW5kbGVyIGZ1bmN0aW9ucyAod2hpY2ggd2lsbCBvbmx5IGJlIGNhbGxlZCBvbmNlKTpcclxuICAgICAgICAgICAgICAgIC8vIG9uT3BlbihjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIC8vIG9uQ2xvc2UoY2FsbGJhY2spIC0gKE9wdGlvbmFsKSBJZiBhbiBlcnJvciBoYXBwZW5zIHRoYXQgY2F1c2VzIGNvbm5lY3Rpb24gY2xvc3VyZSwgdGhpcyBzaG91bGQgc3RpbGwgYmUgZmlyZWQsIG9yIHRoZSBjb25uZWN0aW9uIHdpbGwgYmUgYXNzdW1lZCB0byBzdGlsbCBiZSBvcGVuLiBJZiBub3QgZ2l2ZW4sIGEgXCJjbG9zZVwiIGZpcmUtYW5kLWZvcmdldCBtZXNzYWdlIHdpbGwgYmUgc2VudCBiZWZvcmUgY29ubmVjdGlvbiBjbG9zdXJlIGlmIHRoZSBQZWVyIGlzIGEgc2VydmVyLCBhbmQgdGhhdCBcImNsb3NlXCIgbWVzc2FnZSB3aWxsIGJlIGxpc3RlbmVkIGZvciBpZiBpdHMgYSBjbGllbnQgUGVlci5cclxuICAgICAgICAgICAgICAgIC8vIG9uTWVzc2FnZShjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIC8vIG9uRXJyb3IoY2FsbGJhY2spXHJcbiAgICAgICAgLy8gbGlzdGVuKC8qdHJhbnNwb3J0IGxpc3RlbiBwYXJhbWV0ZXJzLi4uICovLCBycGVwT3B0aW9ucywgY2FsbGJhY2spIC0gKE9wdGlvbmFsKSBMaXN0ZW5zIGZvciBjb25uZWN0aW9zbiBhbmQgY2FsbHMgYGNhbGxiYWNrYCB3aGVuIGEgY29ubmVjdGlvbiBjb21lcyB0aHJvdWdoLlxyXG4gICAgICAgICAgICAvLyB0cmFuc3BvcnQgbGlzdGVuIHBhcmFtZXRlcnMuLi4gLSBBIHZhcmlhYmxlIG51bWJlciBvZiB0cmFuc3BvcnQgbGlzdGVuIHBhcmFtZXRlcnMgcGFzc2VkIGludG8gcnBlcFBlZXIubGlzdGVuXHJcbiAgICAgICAgICAgIC8vIFBhcmFtZXRlcnM6XHJcbiAgICAgICAgICAgICAgICAvLyBycGVwT3B0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXhTZW5kU2l6ZSBhbmQgbWF4UmVjZWl2ZVNpemUgb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2socmVxdWVzdCkgLSBDYWxsZWQgd2hlbiBhIGNvbm5lY3Rpb24gcmVxdWVzdCBjb21lcyB0aHJvdWdoLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGByZXF1ZXN0YCBoYXMgdGhlIG1ldGhvZHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFjY2VwdCgpIC0gUmV0dXJucyBhIGNvbm5lY3Rpb24gb2JqZWN0ICh3aXRoIHRoZSBzYW1lIEFQSSBhcyB0aGUgb2JqZWN0IHRoYXQgYGNvbm5lY3RgIHJldHVybnMpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgZm9sbG93aW5nIHByb3BlcnR5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByYXdSZXF1ZXN0IC0gVGhlIHJhdyByZXF1ZXN0IGZyb20gdGhlIHRyYW5zcG9ydFxyXG4gICAgICAgICAgICAvLyByZXR1cm5zIGFuIG9iamVjdFxyXG4gICAgICAgICAgICAgICAvLyB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kOlxyXG4gICAgICAgICAgICAgICAgLy8gY2xvc2UoKSAtIGNsb3NlcyB0aGUgbGlzdGVuaW5nIHNlcnZlclxyXG4gICAgICAgICAgICAgICAvLyBhbmQgdGhlIGZvbGxvd2luZyBldmVudC1oYW5kbGVyIGZ1bmN0aW9ucyAod2hpY2ggd2lsbCBvbmx5IGJlIGNhbGxlZCBvbmNlKTpcclxuICAgICAgICAgICAgICAgIC8vIG9uTGlzdGVuaW5nKGNhbGxiYWNrKSAtIENhbGxlZCB3aGVuIHRoZSBzZXJ2ZXIgc3RhcnRzIGxpc3RlbmluZ1xyXG4gICAgICAgICAgICAgICAgLy8gb25DbG9zZShjYWxsYmFjaykgLSBDYWxsZWQgd2hlbiB0aGUgc2VydmVyIHN0b3BzIGxpc3RlbmluZ1xyXG4gICAgICAgICAgICAgICAgLy8gb25FcnJvcihjYWxsYmFjaykgLSBDYWxsZWQgaWYgbGlzdGVuaW5nIGNvdWxkbid0IGJlIHN0YXJ0ZWRcclxuICAgICAgICAvLyBjb25uZWN0aW9uKGNvbm5lY3Rpb25Bcmd1bWVudCkgLSBSZXR1cm5zIGEgY29ubmVjdGlvbiBvYmplY3RcclxuICAgICAgICAgICAgLy8gY29ubmVjdGlvbkFyZ3VtZW50IC0gVGhlIHZhbHVlIHJldHVybmVkIGZyb20gYGNvbm5lY3RgIGFib3ZlIG9yIGZyb20gdGhlIGBhY2NlcHRgIGZ1bmN0aW9uIGluIGEgYGxpc3RlbmAgY2FsbGJhY2tcclxuICAgIC8vIHNlcmlhbGl6YXRpb24gaXMgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzOlxyXG4gICAgICAgIC8vIHNlcmlhbGl6ZShqYXZhc2NyaXB0T2JqZWN0KSAtIFJldHVybnMgdGhlIGphdmFzY3JpcHQgb2JqZWN0IGluIHNlcmlhbGl6ZWQgZm9ybSAoc29tZXRoaW5nIHRoZSB0cmFuc3BvcnQgY2FuIHByb2Nlc3MsIG1vc3QgbGlrZWx5IGEgc3RyaW5nIG9yIEJ1ZmZlcilcclxuICAgICAgICAvLyBkZXNlcmlhbGl6ZShzZXJpYWxpemVkT2JqZWN0KSAtIFJldHVybnMgYSBqYXZhc2NyaXB0IG9iamVjdCByZXByZW50ZWQgYnkgdGhlIHNlcmlhbGl6ZWRPYmplY3RcclxuICAgIC8vIG9wdGlvbnM6XHJcbiAgICAgICAgLy8gbWF4U2VuZFNpemUgLSBUaGUgbWF4aW11bSBieXRlLWxlbmd0aCBhIHNlbnQgbWVzc2FnZSBjYW4gYmUgKERlZmF1bHQ6IG5vIGxpbWl0KVxyXG4gICAgICAgIC8vIG1heFJlY2VpdmVTaXplIC0gVGhlIG1heGltdW0gYnl0ZS1sZW5ndGggYSByZWNlaXZlZCBtZXNzYWdlIGNhbiBiZSAoRGVmYXVsdDogbm8gbGltaXQpXHJcbiAgICAgICAgLy8gbWF4SWQgLSAoRGVmYXVsdDogMl41MykgVGhlIG1heGltdW0gaWQgdG8gdXNlIGZvciByZXF1ZXN0IGFuZCBzdHJlYW0gY29tbWFuZHMsIGFzIHdlbGwgYXMgc3RyZWFtIG9yZGVyIGlkIG51bWJlcnNcclxuICAgICAgICAvLyBjbG9zZVRpbWVvdXQgLSAoRGVmYXVsdDogMzAsMDAwIG1zKSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGZvciBvdXRzdGFuZGluZyByZXF1ZXN0cyBhbmQgc3RyZWFtcyB0byBjb21wbGV0ZSBiZWZvcmUgY2xvc2luZyB0aGUgY29ubmVjdGlvbi4gSWYgdGhlIHRpbWVvdXQgaXMgcmVhY2hlZCwgYW4gJ2Vycm9yJ1xyXG4gICAgICAgIC8vIHNlbmRDb21tYW5kRXJyb3JJbmZvIC0gKERlZmF1bHQ6dHJ1ZSlcclxuICAgICAgICAgICAgLy8gSWYgdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vIGVycm9ycyB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgc2VudCB0byB0aGUgb3RoZXIgUGVlciBpZiB0aGVpciBjb21tYW5kIGlzIHVucGFyc2FibGUsIGFuZFxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGZpcnN0IHBhcnQgb2YgdGhlIGNvbW1hbmQgd2lsbCBiZSBzZW50IHdpdGggYW4gXCJpbnZhbGlkTWVzc2FnZVwiIGVycm9yXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgdGhlIGVycm9yIHdpbGwgYmUgaWdub3JlZCAoYnV0IGhhbmRsZWFibGUgdmlhIHJhd0hhbmRsZSBvciBwcmVIYW5kbGUsIGRlcGVuZGluZyBvbiB0aGUgY2FzZSkuXHJcbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbih0cmFuc3BvcnQsIHNlcmlhbGl6YXRpb24sIG9wdGlvbnMpIHtcclxuICAgICAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKSAvLyBzdXBlcmNsYXNzIGNvbnN0cnVjdG9yXHJcblxyXG4gICAgICAgIGlmKCFvcHRpb25zKSBvcHRpb25zID0ge31cclxuXHJcbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnRcclxuICAgICAgICB0aGlzLnNlcmlhbGl6YXRpb24gPSBzZXJpYWxpemF0aW9uXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5tYXhJZCA9PT0gdW5kZWZpbmVkKSB0aGlzLm9wdGlvbnMubWF4SWQgPSBkZWZhdWx0TWF4SWRcclxuICAgICAgICBpZih0aGlzLm9wdGlvbnMuc2VuZENvbW1hbmRFcnJvckluZm8gPT09IHVuZGVmaW5lZCkgdGhpcy5vcHRpb25zLnNlbmRDb21tYW5kRXJyb3JJbmZvID0gdHJ1ZVxyXG5cclxuICAgICAgICB0aGlzLmNvbW1hbmRzID0ge31cclxuICAgICAgICAvLyB0aGlzLmRlZmF1bHRIYW5kbGVyXHJcbiAgICAgICAgLy8gdGhpcy5wcmVIYW5kbGVyXHJcbiAgICAgICAgLy8gdGhpcy5yYXdIYW5kbGVyXHJcblxyXG4gICAgICAgIC8vIHRoaXMubGlzdGVuZXJcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm5zIGEgZnV0dXJlIG9wZW4gY29ubmVjdGlvblxyXG4gICAgLy8gdGFrZXMgaW4gYW55IG51bWJlciBvZiB0cmFuc3BvcnQgc3BlY2lmaWMgY29ubmVjdGlvbiBhcmd1bWVudHNcclxuICAgIHRoaXMuY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxyXG5cclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhhdC50cmFuc3BvcnQuY29ubmVjdC5hcHBseSh0aGF0LnRyYW5zcG9ydC5jb25uZWN0LCBhcmdzLmNvbmNhdChbdGhhdC5vcHRpb25zXSkpXHJcblxyXG4gICAgICAgICAgICB2YXIgb25PcGVuQ2FsbGVkID0gZmFsc2UsIGVycm9ycyA9IFtdXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ub25PcGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgb25PcGVuQ2FsbGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShycGVwQ29ubilcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHZhciBycGVwQ29ubiA9IFJwZXBDb25uZWN0aW9uKHRoYXQsIGNvbm5lY3Rpb24sIHtpc1NlcnZlcjpmYWxzZSwgb25DbG9zZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZighb25PcGVuQ2FsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIkNvbm5lY3Rpb24gY291bGRuJ3QgYmUgb3BlbmVkXCJcclxuICAgICAgICAgICAgICAgICAgICBpZihlcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlKz0nOiBcXG4nK2Vycm9ycy5qb2luKCdcXG4nKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBlcnIoXCJjb25uZWN0aW9uRmFpbHVyZVwiLCBtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIGUuZXJyb3JzID0gZXJyb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH19KVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5vbkVycm9yKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm5zIGEgZnV0dXJlIHRoYXQgcmVzb2x2ZXMgc3VjY2Vzc2Z1bGx5IHdoZW4gdGhlIHNlcnZlciBoYXMgYmVndW4gbGlzdGVuaW5nIGFuZCByZXNvbHZlcyB0byBhbiBlcnJvciBpZiBsaXN0ZW5pbmcgY291bGRuJ3QgYmUgc3RhcnRlZFxyXG4gICAgdGhpcy5saXN0ZW4gPSBmdW5jdGlvbigvKnZhcmlhYmxlIG51bWJlciBvZiBsaXN0ZW4gcGFyYW1ldGVycywgcmVxdWVzdEhhbmRsZXIqLykge1xyXG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxyXG4gICAgICAgIHZhciByZXF1ZXN0SGFuZGxlciA9IGFyZ3NbYXJncy5sZW5ndGgtMV1cclxuICAgICAgICB2YXIgdHJhbnNwb3J0TGlzdGVuQXJndW1lbnRzID0gYXJncy5zbGljZSgwLC0xKVxyXG5cclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmKHRoYXQubGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUnBlcCBvYmplY3QgYWxyZWFkeSBsaXN0ZW5pbmchXCIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoYXQubGlzdGVuZXIgPSB0aGF0LnRyYW5zcG9ydC5saXN0ZW4uYXBwbHkodGhhdC50cmFuc3BvcnQsIHRyYW5zcG9ydExpc3RlbkFyZ3VtZW50cy5jb25jYXQoW3RoYXQub3B0aW9ucywgZnVuY3Rpb24ocmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEhhbmRsZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gcmVxdWVzdC5hY2NlcHQuYXBwbHkodGhhdCxhcmd1bWVudHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBScGVwQ29ubmVjdGlvbih0aGF0LCBjb25uZWN0aW9uLCB7aXNTZXJ2ZXI6dHJ1ZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnJlamVjdC5hcHBseSh0aGF0LCBhcmd1bWVudHMpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByYXdSZXF1ZXN0OiByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XSkpXHJcblxyXG4gICAgICAgICAgICB2YXIgbGlzdGVuaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgdGhhdC5saXN0ZW5lci5vbkxpc3RlbmluZyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmluZyA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoYXQuZW1pdCgnbGlzdGVuaW5nJylcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGF0Lmxpc3RlbmVyLm9uRXJyb3IoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhhdC5saXN0ZW5lci5vbkNsb3NlKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubGlzdGVuZXIgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIHRoYXQuZW1pdCgnY2xvc2UnKVxyXG4gICAgICAgICAgICAgICAgaWYobGlzdGVuaW5nID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2xvc2VzIGEgbGlzdGVuaW5nIHdlYnNvY2tldCBzZXJ2ZXJcclxuICAgIC8vIG5vLW9wIGlmIHRoZSBzZXJ2ZXIgaXMgYWxyZWFkeSBjbG9zZWRcclxuICAgIHRoaXMuY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZih0aGlzLmxpc3RlbmVyKVxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyLmNsb3NlKClcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXRzIHVwIGEgaGFuZGxlciB0byByZWNlaXZlIGEgZmlyZUFuZEZvcmdldCBjYWxsXHJcbiAgICB0aGlzLnJlY2VpdmUgPSBmdW5jdGlvbihjb21tYW5kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgYWRkQ29tbWFuZCh0aGlzLCByZWNlaXZlLCBjb21tYW5kLCBoYW5kbGVyKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNldHMgdXAgYSBoYW5kbGVyIHRvIGhhbmRsZSByZXF1ZXN0LXJlc3BvbnNlIGNhbGxzXHJcbiAgICAvLyB0aGUgaGFuZGxlciBjYW4gZWl0aGVyIHJldHVyblxyXG4gICAgICAgIC8vIEEgKHBvc3NpYmx5IGZ1dHVyZSkgdmFsdWUsIHdoaWNoIHdpbGwgYmUgc2VudCBhcyBhIHJlc3BvbnNlLiBPcixcclxuICAgICAgICAvLyBBIChwb3NzaWJseSBmdXR1cmUpIEVycm9yIG9iamVjdC4gVGhlICdtZXNzYWdlJyB3aWxsIGJlIHNlbnQgYXMgdGhlIGBlcnJvcmAsIGFuZCBhbnkgb3RoZXIgaXRlcmFibGUgcHJvcGVydGllcyBvZiB0aGUgb2JqZWN0IHdpbGwgYmUgYWRkZWQgYXMgdGhlIGBkYXRhYC5cclxuICAgIHRoaXMucmVzcG9uZCA9IGZ1bmN0aW9uKGNvbW1hbmQsIGhhbmRsZXIpIHtcclxuICAgICAgICBhZGRDb21tYW5kKHRoaXMsIHJlc3BvbmQsIGNvbW1hbmQsIGhhbmRsZXIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0cyB1cCBhIGhhbmRsZXIgdG8gaGFuZGxlIGV2ZW50LXN0ZWFtIGNhbGxzXHJcbiAgICB0aGlzLnN0cmVhbSA9IGZ1bmN0aW9uKGNvbW1hbmQsIGhhbmRsZXIpIHtcclxuICAgICAgICBpZighKGhhbmRsZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicnBlcC5zdHJlYW0gcmVxdWlyZXMgYSBjYWxsYmFjayBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50XCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFkZENvbW1hbmQodGhpcywgc3RyZWFtLCBjb21tYW5kLCBoYW5kbGVyKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldHMgYSBkZWZhdWx0IGNvbW1hbmQgaGFuZGxlclxyXG4gICAgdGhpcy5kZWZhdWx0ID0gZnVuY3Rpb24oaGFuZGxlcikge1xyXG4gICAgICAgIGlmKHRoaXMuZGVmYXVsdEhhbmRsZXIgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgaGFuZGxlckVycm9yKCdkZWZhdWx0IGhhbmRsZXInKVxyXG5cclxuICAgICAgICB0aGlzLmRlZmF1bHRIYW5kbGVyID0gaGFuZGxlclxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldHMgdXAgYSBmdW5jdGlvbiB0aGF0IGlzIHJ1biBiZWZvcmUgZXZlcnkgY29tbWFuZFxyXG4gICAgLy8gSWYgXCJpZ25vcmVcIiBpcyByZXR1cm5lZCBmcm9tIGBoYW5kbGVyYCwgdGhlIGNvcnJlc3BvbmRpbmcgcmVjZWl2ZSwgcmVzcG9uZCwgc3RyZWFtLCBvciBkZWZhdWx0IGhhbmRsZXIgd2lsbCBub3QgYmUgY2FsbGVkXHJcbiAgICB0aGlzLnByZUhhbmRsZSA9IGZ1bmN0aW9uKGhhbmRsZXIpIHtcclxuICAgICAgICBpZih0aGlzLnByZUhhbmRsZXIgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgaGFuZGxlckVycm9yKCdwcmVIYW5kbGUnKVxyXG5cclxuICAgICAgICB0aGlzLnByZUhhbmRsZXIgPSBoYW5kbGVyXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0cyB1cCBhIGZ1bmN0aW9uIHRoYXQgaXMgcnVuIGJlZm9yZSB0aGUgY29tbWFuZCBpcyBldmVuIHBhcnNlZFxyXG4gICAgLy8gSWYgXCJpZ25vcmVcIiBpcyByZXR1cm5lZCBmcm9tIGBoYW5kbGVyYCwgcHJlSGFuZGxlIGFuZCB0aGUgY29ycmVzcG9uZGluZyByZWNlaXZlLCByZXNwb25kLCBzdHJlYW0sIG9yIGRlZmF1bHQgaGFuZGxlciB3aWxsIG5vdCBiZSBjYWxsZWRcclxuICAgIHRoaXMucmF3SGFuZGxlID0gZnVuY3Rpb24oaGFuZGxlcikge1xyXG4gICAgICAgIGlmKHRoaXMucmF3SGFuZGxlciAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBoYW5kbGVyRXJyb3IoJ3Jhd0hhbmRsZScpXHJcblxyXG4gICAgICAgIHRoaXMucmF3SGFuZGxlciA9IGhhbmRsZXJcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlXHJcblxyXG4gICAgLy8gdHlwZSBzaG91bGQgZWl0aGVyIGJlIGByZWNlaXZlYCwgYHJlc3BvbmRgLCBvciBgc3RyZWFtYFxyXG4gICAgZnVuY3Rpb24gYWRkQ29tbWFuZCh0aGF0LCB0eXBlLCBjb21tYW5kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgaWYodGhhdC5jb21tYW5kc1tjb21tYW5kXSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBoYW5kbGVyRXJyb3IoJ2hhbmRsZXIgZm9yIFwiJytjb21tYW5kKydcIicpXHJcbiAgICAgICAgaWYoY29tbWFuZCBpbiByZXNlcnZlZExpc3RlbmluZ0NvbW1hbmRzKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBzZXR1cCBhIGhhbmRsZXIgZm9yIHRoZSBjb21tYW5kICdcIitjb21tYW5kK1wiJywgYmVjYXVzZSBpdCdzIHJlc2VydmVkIGZvciBpbnRlcm5hbCB1c2UuXCIpXHJcbiAgICAgICAgaWYoKHR5cGUgPT09IHJlc3BvbmQgfHwgdHlwZSA9PT0gc3RyZWFtKSAmJiBjb21tYW5kIGluIHJlc2VydmVkUmVzcG9uZEFuZFN0cmVhbUxpc3RlbkNvbW1hbmRzKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBzZXR1cCBhIHJlY2VpdmUgb3Igc3RyZWFtIGhhbmRsZXIgZm9yIHRoZSBjb21tYW5kICdcIitjb21tYW5kK1wiJywgYmVjYXVzZSBpdCdzIHJlc2VydmVkIGZvciBhcyBhIHJlY2VpdmUgY29tbWFuZC4gSWYgeW91J2QgbGlrZSB0byBsaXN0ZW4gZm9yIHRoaXMgY29tbWFuZCwgdXNlIGByZWNlaXZlYC5cIilcclxuXHJcbiAgICAgICAgdGhhdC5jb21tYW5kc1tjb21tYW5kXSA9IHt0eXBlOiB0eXBlLCBoYW5kbGVyOiBoYW5kbGVyfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZXJFcnJvcihoYW5kbGVyTmFtZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0EgJytoYW5kbGVyTmFtZSsnIGFscmVhZHkgZXhpc3RzISBZb3UgY2FuIG9ubHkgaGF2ZSBvbmUgaGFuZGxlciBwZXIgY29tbWFuZC4nKVxyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gQW4gaW5zdGFuY2Ugb2YgUnBlcENvbm5lY3Rpb24gY2FuIGVtaXQgdGhlIGZvbGxvd2luZyBldmVudHM6XHJcbiAgICAvLyBjbG9zZSgpIC0gRmlyZWQgb25jZSB0aGUgY29ubmVjdGlvbiBoYXMgYmVlbiBjbG9zZWRcclxuICAgIC8vIG9wZW5NZXNzYWdlKCkgLSBGaXJlZCB3aGVuIGFuICdvcGVuJyBtZXNzYWdlIGlzIHJlY2VpdmVkLiBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXHJcbiAgICAvLyBjbG9zZU1lc3NhZ2UoKSAtIEZpcmVkIHdoZW4gYSAnY2xvc2UnIG1lc3NhZ2UgaXMgcmVjZWl2ZWQuIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cclxuICAgIC8vIGVycm9yKGUpIC0gQW4gZXJyb3IgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBjb25uZWN0aW9uIGluIHRoZSBmb2xsb3dpbmcgY2FzZXM6XHJcbiAgICAgICAgLy8gV2hlbiB0aGUgdHJhbnNwb3J0IGNhbGxzIGl0cyBvbkVycm9yIGNhbGxiYWNrXHJcbiAgICAgICAgLy8gV2hlbiBhbiBlcnJvciBpcyB0aHJvd24gZnJvbSBhIHN0cmVhbSBvciByZWNlaXZlIGhhbmRsZXJcclxuICAgICAgICAvLyBXaGVuIGFuIGVycm9yIHRoYXQgaXNuJ3QgYSBQZWVyRXJyb3IgaXMgdGhyb3duIGZyb20gYSByZXNwb25kIGhhbmRsZXJcclxuICAgICAgICAvLyBJZiBhbiB1bmV4cGVjdGVkIGludGVybmFsIGV4Y2VwdGlvbiBpcyB0aHJvd24gd2hlbiBoYW5kbGluZyBhIG1lc3NhZ2VcclxuICAgICAgICAvLyBJZiB0aGUgY2xvc2VUaW1lb3V0IGlzIHJlYWNoZWQgYW5kIHRoZXJlIGFyZSBzdGlsbCBvcGVuIHJlcXVlc3RzIG9yIHN0cmVhbXMuIFRoaXMgZXJyb3Igd2lsbCBjb250YWluIGluZm8gYWJvdXQgd2hhdCByZXF1ZXN0cyBhbmQgc3RyZWFtcyBhcmUgc3RpbGwgb3Blbi5cclxudmFyIFJwZXBDb25uZWN0aW9uID0gcHJvdG8oRXZlbnRFbWl0dGVyLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyBjb25uZWN0aW9uT3B0aW9uc1xyXG4gICAgICAgIC8vIGlzU2VydmVyIC0gU2hvdWxkIGJlIHRydWUgaWYgdGhlIGNvbm5lY3Rpb24gaXMgYmVpbmcgY3JlYXRkIGJ5IGEgc2VydmVyLCBmYWxzZSBvdGhlcndpc2VcclxuICAgICAgICAvLyBvbkNsb3NlIC0gQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIGluIHRoZSBvbkNsb3NlIGV2ZW50IGJlZm9yZSB0aGUgJ2Nsb3NlJyBldmVudCBpcyBlbWl0dGVkXHJcbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbihycGVwQ29yZU9iamVjdCwgY29ubmVjdGlvbk9iamVjdCwgY29ubmVjdGlvbk9wdGlvbnMpIHtcclxuICAgICAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKSAvLyBzdXBlcmNsYXNzIGNvbnN0cnVjdG9yXHJcblxyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gcnBlcENvcmVPYmplY3QudHJhbnNwb3J0XHJcbiAgICAgICAgdGhpcy5zZXJpYWxpemF0aW9uID0gcnBlcENvcmVPYmplY3Quc2VyaWFsaXphdGlvblxyXG4gICAgICAgIHRoaXMuY29tbWFuZHMgPSBycGVwQ29yZU9iamVjdC5jb21tYW5kc1xyXG5cclxuICAgICAgICB0aGlzLmRlZmF1bHRIYW5kbGVyID0gcnBlcENvcmVPYmplY3QuZGVmYXVsdEhhbmRsZXJcclxuICAgICAgICB0aGlzLnByZUhhbmRsZXIgPSBycGVwQ29yZU9iamVjdC5wcmVIYW5kbGVyXHJcbiAgICAgICAgdGhpcy5yYXdIYW5kbGVyID0gcnBlcENvcmVPYmplY3QucmF3SGFuZGxlclxyXG5cclxuICAgICAgICB0aGlzLm1heFNlbmRTaXplID0gcnBlcENvcmVPYmplY3Qub3B0aW9ucy5tYXhTZW5kU2l6ZVxyXG4gICAgICAgIHRoaXMubWF4UmVjZWl2ZVNpemUgPSBycGVwQ29yZU9iamVjdC5vcHRpb25zLm1heFJlY2VpdmVTaXplXHJcbiAgICAgICAgdGhpcy5zZW5kQ29tbWFuZEVycm9ySW5mbyA9IHJwZXBDb3JlT2JqZWN0Lm9wdGlvbnMuc2VuZENvbW1hbmRFcnJvckluZm9cclxuICAgICAgICB0aGlzLm1heElkID0gcnBlcENvcmVPYmplY3Qub3B0aW9ucy5tYXhJZFxyXG4gICAgICAgIHRoaXMuY2xvc2VUaW1lb3V0ID0gcnBlcENvcmVPYmplY3Qub3B0aW9ucy5jbG9zZVRpbWVvdXQgfHwgMzAwMDBcclxuICAgICAgICB0aGlzLnNlcnZlciA9IGNvbm5lY3Rpb25PcHRpb25zLmlzU2VydmVyXHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb25PYmplY3RcclxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWVcclxuICAgICAgICB0aGlzLmNsb3NpbmcgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuc2Vzc2lvbkRhdGEgPSB7fVxyXG4gICAgICAgIHRoaXMuY29tbWFuZFN0YXRlID0ge31cclxuICAgICAgICB2YXIgY29ubmVjdGlvbkhhc0JlZW5PcGVuZWQgPSBmYWxzZVxyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Jhd0Nvbm5lY3Rpb24nLCB7IGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24ucmF3Q29ubmVjdGlvblxyXG4gICAgICAgIH19KVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuc2VydmVyKVxyXG4gICAgICAgICAgICB0aGlzLm5leHRJZCA9IDBcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMubmV4dElkID0gMVxyXG5cclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcclxuXHJcbiAgICAgICAgaWYodGhpcy5jb25uZWN0aW9uLm9uQ2xvc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uQ2xvc2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZihjb25uZWN0aW9uT3B0aW9ucy5vbkNsb3NlKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25PcHRpb25zLm9uQ2xvc2UoKVxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuY29ubmVjdGVkID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZW1pdCgnY2xvc2UnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub24oJ2Nsb3NlTWVzc2FnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jb25uZWN0ZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbWl0KCdjbG9zZScpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25NZXNzYWdlKGZ1bmN0aW9uKHJhd01lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaGFuZGxlKHRoYXQsIHJhd01lc3NhZ2UpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25PcGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uSGFzQmVlbk9wZW5lZCA9IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbkVycm9yKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYoY29ubmVjdGlvbkhhc0JlZW5PcGVuZWQpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVtaXQoJ2Vycm9yJywgZSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsb3NlcyB0aGUgY29ubmVjdGlvblxyXG4gICAgdGhpcy5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdGVkICYmICF0aGlzLmNsb3NpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zaW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICBpZihPYmplY3Qua2V5cyh0aGlzLmNvbW1hbmRTdGF0ZSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZUludGVybmFsKHRoaXMpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlVGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZVRpbWVvdXRIYW5kbGUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUludGVybmFsKHRoYXQpXHJcbiAgICAgICAgICAgICAgICB9LHRoaXMuY2xvc2VUaW1lb3V0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gZHJvcHMgdGhlIGNvbm5lY3Rpb24gd2l0aG91dCBpbmZvcm1pbmcgdGhlIG90aGVyIFBlZXIgaWYgc3VwcG9ydGVkLCBvdGhlcndpc2Ugd2l0aCBpbmZvcm1pbmcgdGhlIG90aGVyIFBlZXJcclxuICAgIHRoaXMuZHJvcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdGVkICYmIHRoaXMuY29ubmVjdGlvbi5kcm9wKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5kcm9wKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmlyZSBhbmQgZm9yZ2V0IG1lc3NhZ2VcclxuICAgIC8vIElmIGBjb21tYW5kYCBpcyBcImVycm9yXCIsIHRoZSBkYXRhIG11c3QgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBtZXNzYWdlIHByb3BlcnR5IChlZyBhbiBFcnJvciBvYmplY3QpLiBBbnkgb3RoZXIgaXRlcmFibGUgcHJvcGVydGllcyB3aWxsIGJlIGFkZGVkIGFzIGRhdGEuXHJcbiAgICB0aGlzLmZpcmUgPSBmdW5jdGlvbihjb21tYW5kLyosIGRhdGEuLi4qLykge1xyXG4gICAgICAgIGlmKGNvbW1hbmQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgaWYoYXJndW1lbnRzWzFdLm1lc3NhZ2UgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBkYXRhIGZvciBhbiAnZXJyb3InIGZpcmUtYW5kLWZvcmdldCBtZXNzYWdlIG11c3QgaGF2ZSBhICdtZXNzYWdlJyBwcm9wZXJ0eSAoZWcgYW4gRXJyb3Igb2JqZWN0IGhhcyBhIG1lc3NhZ2UgcHJvcGVydHkpXCIpXHJcbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCAhPT0gMilcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuICdlcnJvcicgZmlyZS1hbmQtZm9yZ2V0IG1lc3NhZ2UgY2FuIG9ubHkgdGFrZSBvbmUgYXJndW1lbnQgLSB0aGUgZXJyb3IuXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjb21tYW5kIGluIHJlc2VydmVkRmlyZUNvbW1hbmRzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGZpcmUgYW4gJ1wiK2NvbW1hbmQrXCInIGV2ZW50IGRpcmVjdGx5OyAnXCIrY29tbWFuZCtcIicgaXMgYSBnbG9iYWwgY29tbWFuZCByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNlLlwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBbY29tbWFuZF1cclxuICAgICAgICBpZihjb21tYW5kID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IGFyZ3VtZW50c1sxXVxyXG4gICAgICAgICAgICB2YXIgZXJyb3JEYXRhID0ge31cclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZihrICE9PSAnbWVzc2FnZScpXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JEYXRhW2tdID0gZXJyb3Jba11cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVzc2FnZS5wdXNoKGVycm9yLm1lc3NhZ2UsIGVycm9yRGF0YSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhZGREYXRhKG1lc3NhZ2UsIGFyZ3VtZW50cylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbmQodGhpcywgbWVzc2FnZSlcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXF1ZXN0IHJlc3BvbnNlXHJcbiAgICB0aGlzLnJlcXVlc3QgPSBmdW5jdGlvbihjb21tYW5kLyosIGRhdGEuLi4qLykge1xyXG4gICAgICAgIGlmKGNvbW1hbmQgaW4gcmVzZXJ2ZWRSZXF1ZXN0QW5kU3RyZWFtQ29tbWFuZHMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGRvIGEgJ1wiK2NvbW1hbmQrXCInIHJlcXVlc3QgZGlyZWN0bHk7ICdcIitjb21tYW5kK1wiJyBpcyBhIGdsb2JhbCBjb21tYW5kIHJlc2VydmVkIGZvciBpbnRlcm5hbCB1c2UuXCIpXHJcbiAgICAgICAgaWYoY29tbWFuZCBpbiByZXNlcnZlZFJlcXVlc3RBbmRTdHJlYW1FcnJvckNvbW1hbmQpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGRvIGFuICdlcnJvcicgcmVxdWVzdDsgJ2Vycm9yJyBpcyByZXNlcnZlZCBmb3IgZ2xvYmFsIGZpcmUtYW5kLWZvcmdldCBlcnJvcnMuXCIpXHJcbiAgICAgICAgaWYodGhpcy5jb21tYW5kU3RhdGVbdGhpcy5uZXh0SWRdICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgaXMgYWxyZWFkeSBhIGNhbGxiYWNrIGZvciBpZDogJyt0aGlzLm5leHRJZClcclxuXHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBbY29tbWFuZCwgdGhpcy5uZXh0SWRdXHJcbiAgICAgICAgYWRkRGF0YShtZXNzYWdlLCBhcmd1bWVudHMpXHJcblxyXG4gICAgICAgIHNlbmQodGhpcywgbWVzc2FnZSlcclxuXHJcbiAgICAgICAgdmFyIHRoZVJlc29sdmVyID0gdXRpbHMucmVzb2x2ZXIoKVxyXG4gICAgICAgIHRoZVJlc29sdmVyLmNvbW1hbmQgPSBjb21tYW5kXHJcbiAgICAgICAgdGhpcy5jb21tYW5kU3RhdGVbdGhpcy5uZXh0SWRdID0gdGhlUmVzb2x2ZXJcclxuXHJcbiAgICAgICAgaW5jcmVtZW50SWQodGhpcylcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoZVJlc29sdmVyLmZcclxuICAgIH1cclxuXHJcbiAgICAvLyBmdWxsLWR1cGxleCBldmVudCBzdHJlYW1cclxuICAgIHRoaXMuc3RyZWFtQ29ubmVjdCA9IGZ1bmN0aW9uKGNvbW1hbmQvKiwgZGF0YS4uLiovKSB7XHJcbiAgICAgICAgaWYoY29tbWFuZCBpbiByZXNlcnZlZFJlcXVlc3RBbmRTdHJlYW1Db21tYW5kcylcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgb3BlbiBhICdcIitjb21tYW5kK1wiJyBzdHJlYW0gZGlyZWN0bHk7ICdcIitjb21tYW5kK1wiJyBpcyBhIGdsb2JhbCBjb21tYW5kIHJlc2VydmVkIGZvciBpbnRlcm5hbCB1c2UuXCIpXHJcbiAgICAgICAgaWYoY29tbWFuZCBpbiByZXNlcnZlZFJlcXVlc3RBbmRTdHJlYW1FcnJvckNvbW1hbmQpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IG9wZW4gYW4gJ2Vycm9yJyBzdHJlYW07ICdlcnJvcicgaXMgcmVzZXJ2ZWQgZm9yIGdsb2JhbCBmaXJlLWFuZC1mb3JnZXQgZXJyb3JzLlwiKVxyXG4gICAgICAgIGlmKHRoaXMuY29tbWFuZFN0YXRlW3RoaXMubmV4dElkXSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIGFscmVhZHkgYSBjYWxsYmFjayBmb3IgaWQ6ICcrdGhpcy5uZXh0SWQpXHJcblxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gW2NvbW1hbmQsIHRoaXMubmV4dElkXVxyXG4gICAgICAgIGFkZERhdGEobWVzc2FnZSwgYXJndW1lbnRzKVxyXG5cclxuICAgICAgICB2YXIgZW1pdHRlciA9IHRoaXMuY29tbWFuZFN0YXRlW3RoaXMubmV4dElkXSA9IGNyZWF0ZVN0cmVhbUVtaXRlcih0aGlzLCB0aGlzLm5leHRJZClcclxuICAgICAgICBlbWl0dGVyLmNvbW1hbmQgPSBjb21tYW5kXHJcbiAgICAgICAgc2VuZCh0aGlzLCBtZXNzYWdlKVxyXG5cclxuICAgICAgICBpbmNyZW1lbnRJZCh0aGlzKVxyXG5cclxuICAgICAgICByZXR1cm4gZW1pdHRlclxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaXZhdGVcclxuXHJcbiAgICBmdW5jdGlvbiBzZXJpYWxpemUodGhhdCxkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuc2VyaWFsaXphdGlvbi5zZXJpYWxpemUoZGF0YSlcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGRlc2VyaWFsaXplKHRoYXQsc2VyaWFsaXplZERhdGEpIHtcclxuICAgICAgICByZXR1cm4gdGhhdC5zZXJpYWxpemF0aW9uLmRlc2VyaWFsaXplKHNlcmlhbGl6ZWREYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlSW50ZXJuYWwodGhhdCkge1xyXG4gICAgICAgIGlmKHRoYXQuY2xvc2VUaW1lb3V0SGFuZGxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoYXQuY2xvc2VUaW1lb3V0SGFuZGxlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGlkcyA9IE9iamVjdC5rZXlzKHRoYXQuY29tbWFuZFN0YXRlKVxyXG4gICAgICAgIGlmKGlkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcIkNvbm5lY3Rpb24gaGFzIGJlZW4gY2xvc2VkIGFmdGVyIGEgXCIrdGhhdC5jbG9zZVRpbWVvdXQrXCJtcyB0aW1lb3V0IGFuZCBzb21lIHBlbmRpbmcgcmVxdWVzdHMgYW5kIHN0cmVhbXMgcmVtYWluIHVuZnVsZmlsbGVkLiBcIitcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSBmb2xsb3dpbmcgcmVxdWVzdHMgYW5kIHN0cmVhbXMgd2VyZSBzdGlsbCBhY3RpdmUgdXAgdW50aWwgdGhlIHRpbWVvdXQ6XFxuXCJcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBhY3RpdmVDb21tYW5kU3RhdGVzID0gW11cclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHRoYXQuY29tbWFuZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mbyA9IHRoYXQuY29tbWFuZFN0YXRlW2tdXHJcbiAgICAgICAgICAgICAgICBpZihpbmZvIGluc3RhbmNlb2YgUnBlcER1cGxleEV2ZW50RW1pdHRlcikgeyAvLyBzdHJlYW1cclxuICAgICAgICAgICAgICAgICAgICBpZihpbmZvLmVuZE1lc3NhZ2VTZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNvbW1hbmRTdGF0ZXMucHVzaChcIiogU3RyZWFtIFwiK2srXCIgJ1wiK2luZm8uY29tbWFuZCtcIicgd2FpdGluZyBmb3Igb3RoZXIgc2lkZSB0byAnZW5kJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpbmZvLmVuZE1lc3NhZ2VSZWNlaXZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVDb21tYW5kU3RhdGVzLnB1c2goXCIqIFN0cmVhbSBcIitrK1wiICdcIitpbmZvLmNvbW1hbmQrXCInIGhhcyByZWNlaXZlZCAnZW5kJyBidXQgaGFzbid0IHNlbnQgJ2VuZCdcIilcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVDb21tYW5kU3RhdGVzLnB1c2goXCIqIFN0cmVhbSBcIitrK1wiICdcIitpbmZvLmNvbW1hbmQrXCInIGlzIHN0aWxsIGFjdGl2ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpbmZvLmYgIT09IHVuZGVmaW5lZCkgeyAvLyByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29tbWFuZFN0YXRlcy5wdXNoKFwiKiBSZXF1ZXN0IFwiK2srXCIgdG8gJ1wiK2luZm8uY29tbWFuZCtcIidcIilcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29tbWFuZFN0YXRlcy5wdXNoKFwiKiBSZXNwb25zZSBcIitrK1wiIGZvciAnXCIraW5mby5jb21tYW5kK1wiJ1wiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UrPWFjdGl2ZUNvbW1hbmRTdGF0ZXMuam9pbignXFxuJylcclxuICAgICAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKVxyXG4gICAgICAgICAgICBlLmlkcyA9IGlkc1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kU3RhdGUgPSB7fSAvLyBjbGVhciBjb21tYW5kIHN0YXRlIHNvIGFueXRoaW5nIHRoYXQgY29tZXMgdGhyb3VnaCB3aWxsIGVycm9yIC0gdG9kbzogc2hvdWxkIHdlIGp1c3QgbGVhdmUgaXQgYmUgdGhvP1xyXG5cclxuICAgICAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGF0LmNvbm5lY3Rpb24ub25DbG9zZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNlbmQodGhhdCwgWydjbG9zZSddKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhhdC5jb25uZWN0aW9uLmNsb3NlKClcclxuICAgICAgICB0aGF0LmNvbm5lY3Rpb24gPSB1bmRlZmluZWRcclxuICAgIH1cclxuICAgIC8vIElmIHRoZSBjb25uZWN0aW9uIGlzIGNsb3NpbmcgYW5kIGl0J3MgYSBjbGVhbiBjbG9zZSwgY2xvc2UgaXQgb3V0LlxyXG4gICAgZnVuY3Rpb24gY2hlY2tDbGVhbkNsb3NlKHRoYXQpIHtcclxuICAgICAgICBpZih0aGF0LmNsb3NpbmcgJiYgT2JqZWN0LmtleXModGhhdC5jb21tYW5kU3RhdGUpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjbG9zZUludGVybmFsKHRoYXQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1heSBzZW5kIGFuIGlkRGlzY29udGludWl0eSBtZXNzYWdlXHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRJZCh0aGF0KSB7XHJcbiAgICAgICAgdmFyIHByZXZJZCA9IHRoYXQubmV4dElkXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICB0aGF0Lm5leHRJZCArPSAyXHJcbiAgICAgICAgICAgIGlmKHRoYXQubmV4dElkID4gdGhhdC5tYXhJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5uZXh0SWQgPSB0aGF0Lm5leHRJZCUyIC8vIHJlc2V0IHRvIDAgb3IgMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSB3aGlsZSh0aGF0Lm5leHRJZCBpbiB0aGF0LmNvbW1hbmRTdGF0ZSAmJiBwcmV2SWQgIT09IHRoYXQubmV4dElkKVxyXG5cclxuICAgICAgICBpZihwcmV2SWQgPT09IHRoYXQubmV4dElkKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB2YWxpZCBycGVwIElEcyBsZWZ0IHRvIHVzZS5cIilcclxuICAgICAgICBpZih0aGF0Lm5leHRJZCAhPT0gcHJldklkKzIpXHJcbiAgICAgICAgICAgIHNlbmQodGhhdCwgWydpZERpc2NvbnRpbnVpdHknLCBbcHJldklkLHRoYXQubmV4dElkXV0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkRGF0YShtZXNzYWdlLCB0aGVBcmd1bWVudHMpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoZUFyZ3VtZW50cywgMSlcclxuICAgICAgICBpZihkYXRhLmxlbmd0aCA9PT0gMSlcclxuICAgICAgICAgICAgbWVzc2FnZS5wdXNoKGRhdGFbMF0pXHJcbiAgICAgICAgZWxzZSBpZihkYXRhLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgIG1lc3NhZ2UucHVzaChkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybnMgdGhlIGFyZ3VtZW50IGlmIGl0cyBhcnJheSwgb3Igd3JhcHMgaXQgaW4gYW4gYXJyYXkgaWYgbm90XHJcbiAgICBmdW5jdGlvbiBnZXRBcnJheURhdGEoZGF0YSkge1xyXG4gICAgICAgIGlmKGRhdGEgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIFtdXHJcbiAgICAgICAgZWxzZSBpZihkYXRhIGluc3RhbmNlb2YgQXJyYXkpXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gW2RhdGFdXHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWF5IHNlbmQgYW4gZGlzY3RvbnRpbnVpdHkgbWVzc2FnZVxyXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50T3JkZXJOdW1iZXIodGhhdCwgZW1pdHRlcikge1xyXG4gICAgICAgIGVtaXR0ZXIubmV4dE9yZGVyTnVtYmVyICs9IDFcclxuICAgICAgICBpZihlbWl0dGVyLm5leHRPcmRlck51bWJlciA+IHRoYXQubWF4SWQpIHtcclxuICAgICAgICAgICAgdmFyIHByZXZOdW1iZXIgPSBlbWl0dGVyLm5leHRPcmRlck51bWJlci0xXHJcbiAgICAgICAgICAgIGVtaXR0ZXIubmV4dE9yZGVyTnVtYmVyID0gMFxyXG4gICAgICAgICAgICBzZW5kRXZlbnQodGhhdCwgZW1pdHRlciwgIGVtaXR0ZXIuaWQsICdvcmRlck51bWJlckRpc2NvbnRpbnVpdHknLCBbJycsIHByZXZOdW1iZXIsIGVtaXR0ZXIubmV4dE9yZGVyTnVtYmVyXSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXJyb3IgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gZXhjZXB0aW9uIG9iamVjdCAod2l0aCBhIG1lc3NhZ2UgcHJvcGVydHkgYXQgbGVhc3QpXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFcnJvckluZm8oZXJyb3IpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHt9LCBhbnkgPSBmYWxzZVxyXG4gICAgICAgIGZvcih2YXIgayBpbiBlcnJvcikge1xyXG4gICAgICAgICAgICBpZihrICE9PSAnbWVzc2FnZScpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFba10gPSBlcnJvcltrXVxyXG4gICAgICAgICAgICAgICAgYW55ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZXJyb3JJbmZvID0gW2Vycm9yLm1lc3NhZ2VdXHJcbiAgICAgICAgaWYoYW55KSB7XHJcbiAgICAgICAgICAgIGVycm9ySW5mby5wdXNoKGRhdGEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JJbmZvXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXJyb3JGcm9tTWVzc2FnZShlcnJvck1lc3NhZ2UsIGVycm9yRGF0YSkge1xyXG4gICAgICAgIHZhciBlID0gbmV3IEVycm9yKGVycm9yTWVzc2FnZSlcclxuICAgICAgICBmb3IodmFyIGsgaW4gZXJyb3JEYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKGsgIT09ICdtZXNzYWdlJylcclxuICAgICAgICAgICAgICAgIGVba10gPSBlcnJvckRhdGFba11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlU3RyZWFtRW1pdGVyKHRoYXQsIGlkKSB7XHJcbiAgICAgICAgdmFyIGVtaXR0ZXIgPSBScGVwRHVwbGV4RXZlbnRFbWl0dGVyKGZ1bmN0aW9uIG9uRW1pdChldmVudC8qLCBkYXRhKi8pIHtcclxuICAgICAgICAgICAgaWYoZW1pdHRlci5lbmRNZXNzYWdlU2VudClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmVhbSAnZW5kJyBldmVudCBoYXMgYmVlbiBzZW50LCBjYW4ndCBzZW5kIG1vcmUgZXZlbnRzLlwiKVxyXG4gICAgICAgICAgICBpZihldmVudCBpbiByZXNlcnZlZFN0cmVhbUVtaXNzaW9uRXZlbnRzKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZW1pdCB0aGUgJ1wiK2V2ZW50K1wiJyBldmVudCBkaXJlY3RseTsgJ1wiK2V2ZW50K1wiJyBpcyByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNlLlwiKVxyXG4gICAgICAgICAgICBpZihldmVudCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgICAgaWYoYXJndW1lbnRzWzFdLm1lc3NhZ2UgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZGF0YSBmb3IgYW4gJ2Vycm9yJyBldmVudCBtdXN0IGhhdmUgYSAnbWVzc2FnZScgcHJvcGVydHkgKGVnIGFuIEVycm9yIG9iamVjdCBoYXMgYSBtZXNzYWdlIHByb3BlcnR5KVwiKVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoICE9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgdGFrZSBvbmUgYXJndW1lbnQgLSB0aGUgZXJyb3IuXCIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbmRFdmVudCh0aGF0LCBlbWl0dGVyLCBpZCwgZXZlbnQsIGFyZ3VtZW50cylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBlbWl0dGVyLmlkID0gaWRcclxuICAgICAgICBlbWl0dGVyLm9yZGVyaW5nRGF0YSA9IGZhbHNlXHJcbiAgICAgICAgZW1pdHRlci5uZXh0T3JkZXJOdW1iZXIgPSAwXHJcbiAgICAgICAgZW1pdHRlci5lbmRNZXNzYWdlU2VudCA9IGZhbHNlXHJcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXJcclxuICAgIH1cclxuXHJcbiAgICAvLyByYXcgc2VuZFxyXG4gICAgZnVuY3Rpb24gc2VuZCh0aGF0LCBtZXNzYWdlKSB7XHJcbiAgICAgICAgdmFyIHNlcmlhbGl6ZWRNZXNzYWdlID0gc2VyaWFsaXplKHRoYXQsIG1lc3NhZ2UpXHJcbiAgICAgICAgaWYodGhhdC5tYXhTZW5kU2l6ZSAhPT0gdW5kZWZpbmVkICYmIHNlcmlhbGl6ZWRNZXNzYWdlLmxlbmd0aCA+IHRoYXQubWF4U2VuZFNpemUpIHtcclxuICAgICAgICAgICAgdmFyIGUgPSBlcnIoJ21heE1lc3NhZ2VTaXplRXhjZWVkZWQnKVxyXG4gICAgICAgICAgICBlLm1lc3NhZ2VTaXplID0gc2VyaWFsaXplZE1lc3NhZ2UubGVuZ3RoXHJcbiAgICAgICAgICAgIHRocm93IGVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoYXQuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoYXQuY29ubmVjdGlvbi5zZW5kKHNlcmlhbGl6ZWRNZXNzYWdlKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDb25uZWN0aW9uIGlzIGNsb3NlZCcpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFyZ3Mgd2lsbCBjb250YWluIFtldmVudCwgZGF0YS4uLl1cclxuICAgIGZ1bmN0aW9uIHNlbmRFdmVudCh0aGF0LCBlbWl0dGVyLCBpZCwgZXZlbnQsIGFyZ3MpIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFtpZF1cclxuICAgICAgICBpZihlbWl0dGVyLm9yZGVyaW5nRGF0YSlcclxuICAgICAgICAgICAgbWVzc2FnZS5wdXNoKGVtaXR0ZXIubmV4dE9yZGVyTnVtYmVyKVxyXG5cclxuICAgICAgICBtZXNzYWdlLnB1c2goZXZlbnQpXHJcblxyXG4gICAgICAgIGlmKGV2ZW50ID09PSAnZXJyb3InKVxyXG4gICAgICAgICAgICBtZXNzYWdlLnB1c2goY3JlYXRlRXJyb3JJbmZvKGFyZ3NbMV0pKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYWRkRGF0YShtZXNzYWdlLCBhcmdzKVxyXG5cclxuICAgICAgICBzZW5kKHRoYXQsIG1lc3NhZ2UpXHJcblxyXG4gICAgICAgIGlmKGV2ZW50ID09PSAnZW5kJykge1xyXG4gICAgICAgICAgICBlbWl0dGVyLmVuZE1lc3NhZ2VTZW50ID0gdHJ1ZVxyXG4gICAgICAgICAgICBpZihlbWl0dGVyLmVuZE1lc3NhZ2VSZWNlaXZlZCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoYXQuY29tbWFuZFN0YXRlW2lkXSAvLyBlbnN1cmVzIHRoYXQgXCJycGVwSWROb3RGb3VuZFwiIHdpbGwgYmUgcmV0dXJuZWQgaWYgdGhpcyBzdHJlYW0gY29udGludWVzIHRvIGJlIGNvbW11bmljYXRlZCBvblxyXG4gICAgICAgICAgICAgICAgY2hlY2tDbGVhbkNsb3NlKHRoYXQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYoZW1pdHRlci5vcmRlcmluZ0RhdGEpIHtcclxuICAgICAgICAgICAgaW5jcmVtZW50T3JkZXJOdW1iZXIodGhhdCwgZW1pdHRlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlKHRoYXQsIHJhd01lc3NhZ2UpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZih0aGF0LnJhd0hhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoYXQucmF3SGFuZGxlci5jYWxsKHRoYXQsIHJhd01lc3NhZ2UpID09PSAnaWdub3JlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBkZXNlcmlhbGl6ZSh0aGF0LCByYXdNZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoYXQuc2VuZENvbW1hbmRFcnJvckluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpcmUoXCJlcnJvclwiLCB7bWVzc2FnZTogXCJ1bnBhcnNhYmxlQ29tbWFuZFwiLCByYXdNZXNzYWdlOiByYXdNZXNzYWdlfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZS5tZXNzYWdlID09PSAnbWF4TWVzc2FnZVNpemVFeGNlZWRlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpcmUoXCJlcnJvclwiLCB7bWVzc2FnZTogXCJ1bnBhcnNhYmxlQ29tbWFuZFwiLCByYXdNZXNzYWdlOiByYXdNZXNzYWdlLnNsaWNlKDAsMjAwKX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgdGhyb3cgZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVtaXQoJ2Vycm9yJywgY3JlYXRlVW5wYXJzYWJsZUNvbW1hbmRFcnJvcihyYXdNZXNzYWdlKSlcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGF0LnByZUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoYXQucHJlSGFuZGxlci5jYWxsKHRoYXQsIG1lc3NhZ2UpID09PSAnaWdub3JlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZTAgPSB0eXBlb2YobWVzc2FnZVswXSlcclxuICAgICAgICAgICAgaWYodHlwZTAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvcGVuIGFuZCBjbG9zZSBmaXJlLWFuZC1mb3JnZXQgY29ubmVjdGlvbiBlc3RhYmxpc2htZW50IG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UubGVuZ3RoID09PSAxICYmIG1lc3NhZ2VbMF0gPT09ICdjbG9zZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVtaXQoXCJjbG9zZU1lc3NhZ2VcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29tbWFuZEluZm8gPSB0aGF0LmNvbW1hbmRzW21lc3NhZ2VbMF1dXHJcbiAgICAgICAgICAgICAgICBpZihjb21tYW5kSW5mbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5kZWZhdWx0SGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEhhbmRsZXIuY2FsbCh0aGF0LG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlWzBdID09PSAnZXJyb3InKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVFcnJvckZyb21NZXNzYWdlKG1lc3NhZ2VbMV0sIG1lc3NhZ2VbMl0pXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZVswXSAhPT0gJ2lkRGlzY29udGludWl0eScpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpcmUoJ2Vycm9yJywge21lc3NhZ2U6IFwibm9TdWNoQ29tbWFuZFwiLCBjb21tYW5kOiBtZXNzYWdlWzBdfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY29tbWFuZEluZm8udHlwZSA9PT0gcmVjZWl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2VbMF0gPT09ICdlcnJvcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gW2NyZWF0ZUVycm9yRnJvbU1lc3NhZ2UobWVzc2FnZVsxXSwgbWVzc2FnZVsyXSldXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGdldEFycmF5RGF0YShtZXNzYWdlWzFdKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kSW5mby5oYW5kbGVyLmFwcGx5KHRoYXQsIGRhdGEpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY29tbWFuZEluZm8udHlwZSA9PT0gcmVzcG9uZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IG1lc3NhZ2VbMV1cclxuICAgICAgICAgICAgICAgICAgICBpZighdmFsaWRhdGVJZCh0aGF0LCBpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbW1hbmRTdGF0ZVtpZF0gPSB7Y29tbWFuZDogbWVzc2FnZVswXX1cclxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZEluZm8uaGFuZGxlci5hcHBseSh0aGF0LCBnZXRBcnJheURhdGEobWVzc2FnZVsyXSkuY29uY2F0KFtpZF0pKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGF0LmNvbW1hbmRTdGF0ZVtpZF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZCh0aGF0LCBbaWQscmVzdWx0XSlcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGF0LmNvbW1hbmRTdGF0ZVtpZF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZSBpbnN0YW5jZW9mIFBlZXJFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9ySW5mbyA9IGNyZWF0ZUVycm9ySW5mbyhlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9ySW5mbyA9IFsndW5leHBlY3RlZFBlZXJFcnJvcicsIHt9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmQodGhhdCwgW2lkXS5jb25jYXQoZXJyb3JJbmZvKSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvbW1hbmRJbmZvLnR5cGUgPT09IHN0cmVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IG1lc3NhZ2VbMV1cclxuICAgICAgICAgICAgICAgICAgICBpZighdmFsaWRhdGVJZCh0aGF0LCBpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbWl0dGVyID0gdGhhdC5jb21tYW5kU3RhdGVbaWRdID0gY3JlYXRlU3RyZWFtRW1pdGVyKHRoYXQsaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5jb21tYW5kID0gbWVzc2FnZVswXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kSW5mby5oYW5kbGVyLmFwcGx5KHRoYXQsIFtlbWl0dGVyXS5jb25jYXQoZ2V0QXJyYXlEYXRhKG1lc3NhZ2VbMl0pKS5jb25jYXQoW2lkXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW1pdCgnZXJyb3InLCBlKSAvLyBub3RlIHRoYXQgUGVlckVycm9yIG9iamVjdHMgYXJlIHRyZWF0ZWQgbGlrZSBub3JtYWwgRXJyb3JzIGhlcmUgLSB0byBlbWl0IGFuIGVycm9yLCB5b3UgbXVzdCBlbWl0IGFuICdlcnJvcicgZXZlbnQgZnJvbSB0aGUgcGFzc2VkIGVtaXR0ZXJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycihcImludmFsaWRDb21tYW5kVHlwZVwiLCBcIkludmFsaWQgY29tbWFuZCB0eXBlOiBcIitjb21tYW5kSW5mby50eXBlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmKHR5cGUwID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgaWYoIShtZXNzYWdlWzBdIGluIHRoYXQuY29tbWFuZFN0YXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmlyZShcImVycm9yXCIsIHttZXNzYWdlOiBcInJwZXBJZE5vdEZvdW5kXCIsIGlkOiBtZXNzYWdlWzBdfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mbyA9IHRoYXQuY29tbWFuZFN0YXRlW21lc3NhZ2VbMF1dXHJcbiAgICAgICAgICAgICAgICBpZihpbmZvIGluc3RhbmNlb2YgUnBlcER1cGxleEV2ZW50RW1pdHRlcikgeyAvL3N0cmVhbVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbWl0dGVyID0gaW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihtZXNzYWdlWzFdKSA9PT0gJ3N0cmluZycpIHsgICAgICAgICAgLy8gbWVzc2FnZSB3aXRob3V0IG9yZGVyIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBtZXNzYWdlWzFdLCBldmVudERhdGEgPSBtZXNzYWdlWzJdXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHR5cGVvZihtZXNzYWdlWzJdKSA9PT0gJ3N0cmluZycpIHsgICAvLyBtZXNzYWdlIHdpdGggb3JkZXIgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlck51bWJlciA9IG1lc3NhZ2VbMV0sIGV2ZW50ID0gbWVzc2FnZVsyXSwgZXZlbnREYXRhID0gbWVzc2FnZVszXVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycihcImludmFsaWRTdHJlYW1NZXNzYWdlXCIsIFwiUmVjZWl2ZWQgaW52YWxpZCBzdHJlYW0gbWVzc2FnZTogY291bGRuJ3QgZmluZCBzdHJpbmcgZXZlbnQgbmFtZSBhdCBwb3NpdGlvbiAxIG9yIDIgaW4gdGhlIG1lc3NhZ2VcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50ID09PSAnb3JkZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIub3JkZXJpbmdEYXRhID0gZXZlbnREYXRhID09PSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IGNyZWF0ZUVycm9yRnJvbU1lc3NhZ2UoZXZlbnREYXRhWzBdLCBldmVudERhdGFbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLl9leHRlcm5hbC5lbWl0KCdlcnJvcicsIGVycm9yLCBvcmRlck51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbWl0QXJncyA9IFtldmVudF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50RGF0YSAhPT0gdW5kZWZpbmVkKSBlbWl0QXJncyA9IGVtaXRBcmdzLmNvbmNhdChldmVudERhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvcmRlck51bWJlciAhPT0gdW5kZWZpbmVkKSBlbWl0QXJncy5wdXNoKG9yZGVyTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5fZXh0ZXJuYWwuZW1pdC5hcHBseShlbWl0dGVyLl9leHRlcm5hbCwgZW1pdEFyZ3MpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQgPT09ICdlbmQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5lbmRNZXNzYWdlUmVjZWl2ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZW1pdHRlci5lbmRNZXNzYWdlU2VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhhdC5jb21tYW5kU3RhdGVbbWVzc2FnZVswXV0gLy8gZW5zdXJlcyB0aGF0IFwicnBlcElkTm90Rm91bmRcIiB3aWxsIGJlIHJldHVybmVkIGlmIHRoaXMgc3RyZWFtIGNvbnRpbnVlcyB0byBiZSBjb21tdW5pY2F0ZWQgb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDbGVhbkNsb3NlKHRoYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGluZm8uZiAhPT0gdW5kZWZpbmVkKSB7IC8vIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZVJlc29sdmVyID0gaW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UubGVuZ3RoID09PSAzKSB7IC8vIGVycm9yIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVJlc29sdmVyLnJlamVjdChjcmVhdGVFcnJvckZyb21NZXNzYWdlKG1lc3NhZ2VbMV0sIG1lc3NhZ2VbMl0pKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5vcm1hbCByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVSZXNvbHZlci5yZXNvbHZlKG1lc3NhZ2VbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhhdC5jb21tYW5kU3RhdGVbbWVzc2FnZVswXV1cclxuICAgICAgICAgICAgICAgICAgICBjaGVja0NsZWFuQ2xvc2UodGhhdClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hvdWxkbid0IGdldCBoZXJlIFwiK0pTT04uc3RyaW5naWZ5KGluZm8pKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGNyZWF0ZVVucGFyc2FibGVDb21tYW5kRXJyb3IocmF3TWVzc2FnZSkpXHJcbiAgICAgICAgICAgICAgICBpZih0aGF0LnNlbmRDb21tYW5kRXJyb3JJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maXJlKFwiZXJyb3JcIiwge21lc3NhZ2U6IFwiaW52YWxpZE1lc3NhZ2VcIiwgcmF3TWVzc2FnZTogcmF3TWVzc2FnZS5zbGljZSgwLDIwMCl9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpcmUoXCJlcnJvclwiLCB7bWVzc2FnZTogXCJpbnZhbGlkTWVzc2FnZVwifSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICB0aGF0LmVtaXQoJ2Vycm9yJywgZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcblxyXG4vLyBzZW5kcyBhbiBycGVwSW52YWxpZElkIGVycm9yIGZpcmUtYW5kLWZvcmdldCBtZXNzYWdlIGlmIHRoZSBpZCBpc24ndCB2YWxpZFxyXG4vLyByZXR1cm5zIHRydWUgaWYgdGhlIGlkIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2VcclxuZnVuY3Rpb24gdmFsaWRhdGVJZCh0aGF0LCBpZCkge1xyXG4gICAgaWYoaWQgPiB0aGF0Lm1heElkKSB7XHJcbiAgICAgICAgdmFyIHJlYXNvbiA9IFwiSWQgZ3JlYXRlciB0aGFuIFwiXHJcbiAgICAgICAgaWYodGhhdC5tYXhJZCA9PT0gZGVmYXVsdE1heElkKSByZWFzb24gKz0gXCIyXjUzXCJcclxuICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYXNvbiArPSB0aGF0Lm1heElkXHJcbiAgICB9IGVsc2UgaWYodGhhdC5zZXJ2ZXIpIHtcclxuICAgICAgICBpZihpZCUyICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciByZWFzb24gPSBcIklkIGZyb20gY2xpZW50IG5vdCBvZGRcIlxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZihpZCUyICE9PSAwKSB7XHJcbiAgICAgICAgdmFyIHJlYXNvbiA9IFwiSWQgZnJvbSBzZXJ2ZXIgbm90IGV2ZW5cIlxyXG4gICAgfVxyXG5cclxuICAgIGlmKHJlYXNvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhhdC5maXJlKFwiZXJyb3JcIiwge21lc3NhZ2U6ICdycGVwSW52YWxpZElkJywgcmVhc29uOiByZWFzb259KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxudmFyIFJwZXBEdXBsZXhFdmVudEVtaXR0ZXIgPSBwcm90byhEdXBsZXhFdmVudEVtaXR0ZXIsIGZ1bmN0aW9uKHN1cGVyY2xhc3MpIHtcclxuICAgIHRoaXMub24gPSBmdW5jdGlvbihldmVudCxoYW5kbGVyKSB7XHJcbiAgICAgICAgaWYoZXZlbnQgaW4gcmVzZXJ2ZWRFdmVudExpc3RlbmluZ0V2ZW50cylcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgbGlzdGVuIG9uIHRoZSAnXCIrZXZlbnQrXCInIGV2ZW50IGRpcmVjdGx5OyB0aGUgJ1wiK2V2ZW50K1wiJyBldmVudCBpcyByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNlLlwiKVxyXG5cclxuICAgICAgICBzdXBlcmNsYXNzLm9uLmNhbGwodGhpcywgZXZlbnQsaGFuZGxlcilcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uQW55ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBzdXBlcmNsYXNzLm9uQW55LmNhbGwodGhpcywgZnVuY3Rpb24oZXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgIGlmKCEoZXZlbnROYW1lIGluIHJlc2VydmVkRXZlbnRMaXN0ZW5pbmdFdmVudHMpKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICB9XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVVbnBhcnNhYmxlQ29tbWFuZEVycm9yKHJhd01lc3NhZ2UpIHtcclxuICAgIHZhciB1bnBhcnNhYmxlQ29tbW1hbmRFcnJvciA9IGVycihcInVucGFyc2FibGVDb21tYW5kXCIsIFwiJ1wiK3Jhd01lc3NhZ2UrXCInXCIpXHJcbiAgICB1bnBhcnNhYmxlQ29tbW1hbmRFcnJvci5uYW1lID0gJ1VucGFyc2FibGVDb21tYW5kJ1xyXG4gICAgcmV0dXJuIHVucGFyc2FibGVDb21tbWFuZEVycm9yXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVycihjb2RlLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSB8fCBjb2RlKVxyXG4gICAgZXJyb3IuY29kZSA9IGNvZGVcclxuICAgIHJldHVybiBlcnJvclxyXG59Il19


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
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxtb2R1bGVzXFxycGVwLmpzXFx1dGlscy5qcyhvcmlnaW5hbCkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBQSxDQUFRLFFBQVIsQ0FBQSxDQUFBLENBQW1CLFlBQVc7SUFDMUIsR0FBQSxDQUFJLFNBQVM7SUFDYixHQUFBLENBQUksSUFBSSxJQUFJLE9BQUosQ0FBWSxVQUFTLFNBQVcsRUFBQSxVQUFVO1FBQzlDLE9BQUEsQ0FBQSxDQUFBLENBQVU7UUFDVixNQUFBLENBQUEsQ0FBQSxDQUFTO0lBQ2pCO0lBRUksT0FBTztRQUFDLEdBQUcsQ0FBSixDQUFBO1FBQU8sU0FBUSxPQUFmLENBQUE7UUFBd0IsUUFBTzs7QUFDMUM7QUFHQSxPQUFBLENBQVEsS0FBUixDQUFBLENBQUEsQ0FBZ0IsVUFBUyxDQUFFLEVBQUEsR0FBRztJQUMxQixJQUFHLENBQUEsQ0FBQSxVQUFBLENBQWEsT0FBTztRQUNuQixJQUFHLEVBQUUsQ0FBQSxDQUFBLFVBQUEsQ0FBYTtZQUNkLE9BQU87UUFDWCxJQUFHLENBQUEsQ0FBRSxNQUFGLENBQUEsR0FBQSxDQUFhLENBQUEsQ0FBRSxRQUFRO1lBQ3RCLE9BQU87UUFDbkIsT0FBZTtZQUNILEtBQUksR0FBQSxDQUFJLElBQUUsRUFBRyxDQUFBLENBQUEsQ0FBQSxDQUFFLENBQUEsQ0FBRSxRQUFRLENBQUEsSUFBSztnQkFDMUIsSUFBRyxDQUFDLE9BQUEsQ0FBUSxLQUFSLENBQWMsQ0FBQSxDQUFFLElBQUcsQ0FBQSxDQUFFLEtBQUs7b0JBQzFCLE9BQU87Z0JBQzNCO1lBQ0E7WUFFWSxPQUFPO1FBQ25CO0lBQ0EsT0FBVyxJQUFHLENBQUEsQ0FBQSxVQUFBLENBQWEsUUFBUTtRQUMzQixJQUFHLEVBQUUsQ0FBQSxDQUFBLFVBQUEsQ0FBYTtZQUNkLE9BQU87UUFFWCxHQUFBLENBQUksUUFBUSxPQUFBLENBQVE7UUFDcEIsR0FBQSxDQUFJLFFBQVEsT0FBQSxDQUFRO1FBRXBCLElBQUcsS0FBQSxDQUFNLE1BQU4sQ0FBQSxHQUFBLENBQWlCLEtBQUEsQ0FBTSxRQUFRO1lBQzlCLE9BQU87UUFDbkIsT0FBZTtZQUNILEtBQUksR0FBQSxDQUFJLElBQUUsRUFBRyxDQUFBLENBQUEsQ0FBQSxDQUFFLEtBQUEsQ0FBTSxRQUFRLENBQUEsSUFBSztnQkFDOUIsR0FBQSxDQUFJLE1BQU0sS0FBQSxDQUFNO2dCQUNoQixHQUFBLENBQUksT0FBTyxDQUFBLENBQUU7Z0JBQ2IsR0FBQSxDQUFJLE9BQU8sQ0FBQSxDQUFFO2dCQUViLElBQUcsQ0FBQyxPQUFBLENBQVEsS0FBUixDQUFjLE1BQUssT0FBTztvQkFDMUIsT0FBTztnQkFDM0I7WUFDQTtZQUVZLE9BQU87UUFDbkI7SUFDQSxPQUFXO1FBQ0gsT0FBTyxDQUFBLENBQUEsR0FBQSxDQUFJLENBQUosQ0FBQSxFQUFBLENBQVMsTUFBQSxDQUFPLEtBQVAsQ0FBYSxFQUFiLENBQUEsRUFBQSxDQUFtQixNQUFBLENBQU8sS0FBUCxDQUFhO0lBQ3hEO0FBQ0E7QUFHQSxTQUFTLFFBQVEsR0FBRztJQUNoQixHQUFBLENBQUksT0FBSztJQUNULEtBQUksR0FBQSxDQUFJLEtBQUssR0FBRztRQUNaLElBQUcsQ0FBQSxDQUFFLEVBQUYsQ0FBQSxHQUFBLENBQVMsU0FBVCxDQUFBLEVBQUEsQ0FBc0IsTUFBQSxDQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBRSxJQUFJO1lBQ2hFLElBQUEsQ0FBSyxJQUFMLENBQVU7UUFDdEI7SUFDQTtJQUVJLE9BQU87QUFDWDs7QUFqRUEiLCJmaWxlIjoiRDpcXGJpbGx5c0ZpbGVcXGNvZGVcXG1vZHVsZXNcXHJwZXAuanNcXHV0aWxzLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuZXhwb3J0cy5yZXNvbHZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJlc29sdmUsIHJlamVjdFxyXG4gICAgdmFyIGYgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihpblJlc29sdmUsIGluUmVqZWN0KSB7XHJcbiAgICAgICAgcmVzb2x2ZSA9IGluUmVzb2x2ZVxyXG4gICAgICAgIHJlamVjdCA9IGluUmVqZWN0XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiB7ZjogZiwgcmVzb2x2ZTpyZXNvbHZlLCByZWplY3Q6cmVqZWN0fVxyXG59XHJcblxyXG4vLyBjb21wYXJlcyBhcnJheXMgYW5kIG9iamVjdHMgZm9yIHZhbHVlIGVxdWFsaXR5IChhbGwgZWxlbWVudHMgYW5kIG1lbWJlcnMgbXVzdCBtYXRjaClcclxuZXhwb3J0cy5lcXVhbCA9IGZ1bmN0aW9uKGEsYikge1xyXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgaWYoIShiIGluc3RhbmNlb2YgQXJyYXkpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICBpZihhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yKHZhciBuPTA7IG48YS5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWV4cG9ydHMuZXF1YWwoYVtuXSxiW25dKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYoYSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgIGlmKCEoYiBpbnN0YW5jZW9mIE9iamVjdCkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG5cclxuICAgICAgICB2YXIgYUtleXMgPSBnZXRLZXlzKGEpXHJcbiAgICAgICAgdmFyIGJLZXlzID0gZ2V0S2V5cyhiKVxyXG5cclxuICAgICAgICBpZihhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IodmFyIG49MDsgbjxhS2V5cy5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGFLZXlzW25dXHJcbiAgICAgICAgICAgICAgICB2YXIgYVZhbCA9IGFba2V5XVxyXG4gICAgICAgICAgICAgICAgdmFyIGJWYWwgPSBiW2tleV1cclxuXHJcbiAgICAgICAgICAgICAgICBpZighZXhwb3J0cy5lcXVhbChhVmFsLGJWYWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGE9PT1iIHx8IE51bWJlci5pc05hTihhKSAmJiBOdW1iZXIuaXNOYU4oYilcclxuICAgIH1cclxufVxyXG5cclxuLy8gY291bnRzIG9iamVjdCBvd24ta2V5cyBpZ25vcmluZyBwcm9wZXJ0aWVzIHRoYXQgYXJlIHVuZGVmaW5lZFxyXG5mdW5jdGlvbiBnZXRLZXlzKHgpIHtcclxuICAgIHZhciBrZXlzPVtdXHJcbiAgICBmb3IodmFyIGsgaW4geCkge1xyXG4gICAgICAgIGlmKHhba10gIT09IHVuZGVmaW5lZCAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCxrKSkge1xyXG4gICAgICAgICAgICBrZXlzLnB1c2goaylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGtleXNcclxufSJdfQ==


/***/ }),
/* 5 */
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


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxtb2R1bGVzXFxycGVwLmpzXFxEdXBsZXhFdmVudEVtaXR0ZXIuanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEdBQUEsQ0FBSSxRQUFRLE9BQUEsQ0FBUTtBQUNwQixHQUFBLENBQUksZUFBZSxPQUFBLENBQVE7QUFHM0IsTUFBQSxDQUFPLE9BQVAsQ0FBQSxDQUFBLENBQWlCLEtBQUEsQ0FBTSxZQUFXO0lBQzlCLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZLFVBQVMsZUFBZTtRQUNoQyxJQUFBLENBQUssU0FBTCxDQUFBLENBQUEsQ0FBaUIsSUFBSSxZQUFKLENBQWlCO1lBQUMsYUFBYTs7UUFDaEQsSUFBQSxDQUFLLGNBQUwsQ0FBQSxDQUFBLENBQXNCO0lBQzlCO0lBRUksSUFBQSxDQUFLLElBQUwsQ0FBQSxDQUFBLENBQVksVUFBUyxPQUF5QjtRQUMxQyxJQUFHLElBQUEsQ0FBSztZQUFPLE1BQU0sSUFBSSxLQUFKLENBQVU7UUFDL0IsSUFBQSxDQUFLLGNBQUwsQ0FBb0IsS0FBcEIsQ0FBMEIsSUFBQSxDQUFLLGdCQUFnQjtJQUN2RDtJQUNJLElBQUEsQ0FBSyxFQUFMLENBQUEsQ0FBQSxDQUFVLFVBQVMsS0FBTSxFQUFBLFNBQVM7UUFDOUIsSUFBQSxDQUFLLFNBQUwsQ0FBZSxFQUFmLENBQWtCLE9BQU07SUFDaEM7SUFDSSxJQUFBLENBQUssR0FBTCxDQUFBLENBQUEsRUFBVyxJQUFBLENBQUssY0FBTCxDQUFBLENBQUEsQ0FBc0IsVUFBUyxLQUFPLEVBQUEsU0FBUztRQUN0RCxJQUFBLENBQUssU0FBTCxDQUFlLGNBQWYsQ0FBOEIsT0FBTTtJQUM1QztJQUNJLElBQUEsQ0FBSyxLQUFMLENBQUEsQ0FBQSxDQUFhLFVBQVMsU0FBUztRQUMzQixJQUFBLENBQUssU0FBTCxDQUFlLEtBQWYsQ0FBcUI7SUFDN0I7SUFDSSxJQUFBLENBQUssTUFBTCxDQUFBLENBQUEsQ0FBYyxVQUFTLFNBQVM7UUFDNUIsSUFBQSxDQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCO0lBQzlCO0FBQ0E7QUExQkEiLCJmaWxlIjoiRDpcXGJpbGx5c0ZpbGVcXGNvZGVcXG1vZHVsZXNcXHJwZXAuanNcXER1cGxleEV2ZW50RW1pdHRlci5qcyhvcmlnaW5hbCkiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcHJvdG8gPSByZXF1aXJlKFwicHJvdG9cIilcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIyJylcblxuLy8gYW4gZXZlbnQgZW1pdHRlciB3aGVyZSBsaXN0ZW5pbmcgdG8gaXQgbGlzdGVucyB0byB0aGUgb3RoZXIgZW5kIGFuZCBlbWl0dGluZyBlbWl0cyB0byB0aGUgb3RoZXIgZW5kXG5tb2R1bGUuZXhwb3J0cyA9IHByb3RvKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKG9uRW1pdEhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fZXh0ZXJuYWwgPSBuZXcgRXZlbnRFbWl0dGVyKHtuZXdMaXN0ZW5lcjogZmFsc2V9KVxuICAgICAgICB0aGlzLl9vbkVtaXRIYW5kbGVyID0gb25FbWl0SGFuZGxlclxuICAgIH1cblxuICAgIHRoaXMuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50LyosIGFyZ3VtZW50cy4uLiovKSB7XG4gICAgICAgIGlmKHRoaXMuZW5kZWQpIHRocm93IG5ldyBFcnJvcihcIkR1cGxleCBTdHJlYW0gaGFzIGFscmVhZHkgYmVlbiBlbmRlZC5cIilcbiAgICAgICAgdGhpcy5fb25FbWl0SGFuZGxlci5hcHBseSh0aGlzLl9vbkVtaXRIYW5kbGVyLCBhcmd1bWVudHMpXG4gICAgfVxuICAgIHRoaXMub24gPSBmdW5jdGlvbihldmVudCxoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2V4dGVybmFsLm9uKGV2ZW50LGhhbmRsZXIpXG4gICAgfVxuICAgIHRoaXMub2ZmID0gdGhpcy5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2V4dGVybmFsLnJlbW92ZUxpc3RlbmVyKGV2ZW50LGhhbmRsZXIpXG4gICAgfVxuICAgIHRoaXMub25BbnkgPSBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2V4dGVybmFsLm9uQW55KGhhbmRsZXIpXG4gICAgfVxuICAgIHRoaXMub2ZmQW55ID0gZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICB0aGlzLl9leHRlcm5hbC5vZmZBbnkoaGFuZGxlcilcbiAgICB9XG59KSJdfQ==


/***/ })
/******/ ]);
});
//# sourceMappingURL=rpep-dev.umd.js.map