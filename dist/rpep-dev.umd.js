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


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFxycGVwLmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxHQUFBLENBQUksZUFBZSxPQUFBLENBQVE7QUFDM0IsR0FBQSxDQUFJLFFBQVEsT0FBQSxDQUFRO0FBRXBCLEdBQUEsQ0FBSSxRQUFRLE9BQUEsQ0FBUTtBQUNwQixHQUFBLENBQUkscUJBQXFCLE9BQUEsQ0FBUTtBQUdqQyxHQUFBLENBQUksVUFBVTtBQUNkLEdBQUEsQ0FBSSxVQUFVO0FBQ2QsR0FBQSxDQUFJLFNBQVM7QUFFYixHQUFBLENBQUksZUFBZTtBQUNuQixHQUFBLENBQUksdUJBQXVCO0lBQUMsT0FBTSxDQUFQLENBQUE7SUFBUyxpQkFBZ0I7O0FBQ3BELEdBQUEsQ0FBSSxtQ0FBbUM7SUFBQyxPQUFNLENBQVAsQ0FBQTtJQUFTLGlCQUFnQjs7QUFDaEUsR0FBQSxDQUFJLHVDQUF1QztJQUFDLE9BQU07O0FBQ2xELEdBQUEsQ0FBSSw0QkFBNEI7SUFBQyxPQUFNOztBQUN2QyxHQUFBLENBQUkseUNBQXlDO0lBQUMsaUJBQWdCOztBQUM5RCxHQUFBLENBQUksK0JBQStCO0lBQUMsT0FBTTs7QUFDMUMsR0FBQSxDQUFJLCtCQUErQjtJQUFDLDBCQUF5Qjs7QUFHN0QsR0FBQSxDQUFJLFNBQVM7QUFFYixHQUFBLENBQUksWUFBWSxLQUFBLENBQU0sT0FBTyxZQUFXO0lBQ3BDLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZO0FBQ2hCO0FBS0EsTUFBQSxDQUFPLE9BQVAsQ0FBQSxDQUFBLENBQWlCLEtBQUEsQ0FBTSxjQUFjLFlBQVc7SUFLNUMsSUFBQSxDQUFLLFNBQUwsQ0FBQSxDQUFBLENBQWlCO0lBa0RqQixJQUFBLENBQUssSUFBTCxDQUFBLENBQUEsQ0FBWSxVQUFTLFNBQVcsRUFBQSxhQUFlLEVBQUEsU0FBUztRQUNwRCxJQUFHLENBQUM7WUFBUyxPQUFB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XFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFxycGVwLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbInZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIyJylcclxudmFyIHByb3RvID0gcmVxdWlyZShcInByb3RvXCIpXHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKVxyXG52YXIgRHVwbGV4RXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi9EdXBsZXhFdmVudEVtaXR0ZXInKVxyXG5cclxuLy8gZW51bXNcclxudmFyIHJlY2VpdmUgPSAwXHJcbnZhciByZXNwb25kID0gMVxyXG52YXIgc3RyZWFtID0gMlxyXG5cclxudmFyIGRlZmF1bHRNYXhJZCA9IDkwMDcxOTkyNTQ3NDA5OTIgLy8gMl41M11cclxudmFyIHJlc2VydmVkRmlyZUNvbW1hbmRzID0ge2Nsb3NlOjEsaWREaXNjb250aW51aXR5OjF9XHJcbnZhciByZXNlcnZlZFJlcXVlc3RBbmRTdHJlYW1Db21tYW5kcyA9IHtjbG9zZToxLGlkRGlzY29udGludWl0eToxfVxyXG52YXIgcmVzZXJ2ZWRSZXF1ZXN0QW5kU3RyZWFtRXJyb3JDb21tYW5kID0ge2Vycm9yOjF9XHJcbnZhciByZXNlcnZlZExpc3RlbmluZ0NvbW1hbmRzID0ge2Nsb3NlOjF9XHJcbnZhciByZXNlcnZlZFJlc3BvbmRBbmRTdHJlYW1MaXN0ZW5Db21tYW5kcyA9IHtpZERpc2NvbnRpbnVpdHk6MX1cclxudmFyIHJlc2VydmVkRXZlbnRMaXN0ZW5pbmdFdmVudHMgPSB7b3JkZXI6MX1cclxudmFyIHJlc2VydmVkU3RyZWFtRW1pc3Npb25FdmVudHMgPSB7b3JkZXJOdW1iZXJEaXNjb250aW51aXR5OjF9XHJcblxyXG5cclxudmFyIGJ1ZmZlciA9IDUwIC8vIHNvbWUgYnVmZmVyIGZvciBtZXNzYWdlIGhlYWRlciBzdHVmZlxyXG5cclxudmFyIFBlZXJFcnJvciA9IHByb3RvKEVycm9yLCBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMubmFtZSA9IFwiUGVlckVycm9yXCJcclxufSlcclxuXHJcbi8vIEFuIGluc3RhbmNlIG9mIFJwZXBDb3JlIGNhbiBlbWl0IHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxyXG4gICAgLy8gJ2Nsb3NlJyAtIEZpcmVkIG9uY2UgdGhlIGxpc3RlbmluZyBzZXJ2ZXIgaGFzIGJlZW4gY2xvc2VkXHJcbiAgICAvLyAnZXJyb3InIC0gRmlyZWQgaWYgdGhlcmUgd2FzIGFuIGVycm9yIHJlbGF0ZWQgdG8gbGlzdGVuaW5nXHJcbm1vZHVsZS5leHBvcnRzID0gcHJvdG8oRXZlbnRFbWl0dGVyLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyBzdGF0aWMgcHJvcGVydGllc1xyXG5cclxuICAgIC8vIGFuIGVycm9yIHRoYXQsIHdoZW4gdGhyb3duLCBzZW5kcyB0aGUgZXJyb3IgYXMgYW4gZXJyb3IgcmVzcG9uc2UgdG8gdGhlIG90aGVyIFBlZXIgKGluY2x1ZGluZyBpdGVyYWJsZSBwcm9wZXJ0aWVzLCBidXQgbm90IGluY2x1ZGluZyB0aGUgc3RhY2spXHJcbiAgICB0aGlzLlBlZXJFcnJvciA9IFBlZXJFcnJvclxyXG5cclxuICAgIC8vIGluc3RhbmNlIHByb3BlcnRpZXNcclxuXHJcbiAgICAvLyB0cmFuc3BvcnQgaXMgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzOlxyXG4gICAgICAgIC8vIGNvbm5lY3QoLyp0cmFuc3BvcnQgY29ubmVjdCBwYXJhbWV0ZXJzLi4uICovLCBycGVwT3B0aW9ucykgLSBjb25uZWN0cyB0byBhIHdlYnNvY2tldCBzZXJ2ZXJcclxuICAgICAgICAgICAgLy8gdHJhbnNwb3J0IGNvbm5lY3QgcGFyYW1ldGVycy4uLiAtIEEgdmFyaWFibGUgbnVtYmVyIG9mIHRyYW5zcG9ydCBjb25uZWN0IHBhcmFtZXRlcnMgcGFzc2VkIGludG8gcnBlcFBlZXIuY29ubmVjdFxyXG4gICAgICAgICAgICAvLyBycGVwT3B0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXhTZW5kU2l6ZSBhbmQgbWF4UmVjZWl2ZVNpemUgb3B0aW9uc1xyXG4gICAgICAgICAgICAvLyByZXR1cm5zIGEgY29ubmVjdGlvbiBvYmplY3RcclxuICAgICAgICAgICAgICAgLy8gd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHM6XHJcbiAgICAgICAgICAgICAgICAvLyBzZW5kKG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAvLyBjbG9zZSgpIC0gQ2xvc2VzIHRoZSBjb25uZWN0aW9uIGluIGEgd2F5IHRoYXQgYWN0aXZlbHkgaW5mb3JtcyB0aGUgb3RoZXIgUGVlciBhYm91dCBjbG9zdXJlLlxyXG4gICAgICAgICAgICAgICAgLy8gZHJvcCgpIC0gKE9wdGlvbmFsKSBDbG9zZXMgdGhlIGNvbm5lY3Rpb24gd2l0aG91dCBpbmZvcm1pbmcgdGhlIG90aGVyIFBlZXIuXHJcbiAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgZm9sbG93aW5nIGV2ZW50LWhhbmRsZXIgZnVuY3Rpb25zICh3aGljaCB3aWxsIG9ubHkgYmUgY2FsbGVkIG9uY2UpOlxyXG4gICAgICAgICAgICAgICAgLy8gb25PcGVuKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgLy8gb25DbG9zZShjYWxsYmFjaykgLSAoT3B0aW9uYWwpIElmIGFuIGVycm9yIGhhcHBlbnMgdGhhdCBjYXVzZXMgY29ubmVjdGlvbiBjbG9zdXJlLCB0aGlzIHNob3VsZCBzdGlsbCBiZSBmaXJlZCwgb3IgdGhlIGNvbm5lY3Rpb24gd2lsbCBiZSBhc3N1bWVkIHRvIHN0aWxsIGJlIG9wZW4uIElmIG5vdCBnaXZlbiwgYSBcImNsb3NlXCIgZmlyZS1hbmQtZm9yZ2V0IG1lc3NhZ2Ugd2lsbCBiZSBzZW50IGJlZm9yZSBjb25uZWN0aW9uIGNsb3N1cmUgaWYgdGhlIFBlZXIgaXMgYSBzZXJ2ZXIsIGFuZCB0aGF0IFwiY2xvc2VcIiBtZXNzYWdlIHdpbGwgYmUgbGlzdGVuZWQgZm9yIGlmIGl0cyBhIGNsaWVudCBQZWVyLlxyXG4gICAgICAgICAgICAgICAgLy8gb25NZXNzYWdlKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgLy8gb25FcnJvcihjYWxsYmFjaylcclxuICAgICAgICAvLyBsaXN0ZW4oLyp0cmFuc3BvcnQgbGlzdGVuIHBhcmFtZXRlcnMuLi4gKi8sIHJwZXBPcHRpb25zLCBjYWxsYmFjaykgLSAoT3B0aW9uYWwpIExpc3RlbnMgZm9yIGNvbm5lY3Rpb3NuIGFuZCBjYWxscyBgY2FsbGJhY2tgIHdoZW4gYSBjb25uZWN0aW9uIGNvbWVzIHRocm91Z2guXHJcbiAgICAgICAgICAgIC8vIHRyYW5zcG9ydCBsaXN0ZW4gcGFyYW1ldGVycy4uLiAtIEEgdmFyaWFibGUgbnVtYmVyIG9mIHRyYW5zcG9ydCBsaXN0ZW4gcGFyYW1ldGVycyBwYXNzZWQgaW50byBycGVwUGVlci5saXN0ZW5cclxuICAgICAgICAgICAgLy8gUGFyYW1ldGVyczpcclxuICAgICAgICAgICAgICAgIC8vIHJwZXBPcHRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1heFNlbmRTaXplIGFuZCBtYXhSZWNlaXZlU2l6ZSBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayhyZXF1ZXN0KSAtIENhbGxlZCB3aGVuIGEgY29ubmVjdGlvbiByZXF1ZXN0IGNvbWVzIHRocm91Z2guXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYHJlcXVlc3RgIGhhcyB0aGUgbWV0aG9kczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWNjZXB0KCkgLSBSZXR1cm5zIGEgY29ubmVjdGlvbiBvYmplY3QgKHdpdGggdGhlIHNhbWUgQVBJIGFzIHRoZSBvYmplY3QgdGhhdCBgY29ubmVjdGAgcmV0dXJucykuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlamVjdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIHRoZSBmb2xsb3dpbmcgcHJvcGVydHk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJhd1JlcXVlc3QgLSBUaGUgcmF3IHJlcXVlc3QgZnJvbSB0aGUgdHJhbnNwb3J0XHJcbiAgICAgICAgICAgIC8vIHJldHVybnMgYW4gb2JqZWN0XHJcbiAgICAgICAgICAgICAgIC8vIHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2Q6XHJcbiAgICAgICAgICAgICAgICAvLyBjbG9zZSgpIC0gY2xvc2VzIHRoZSBsaXN0ZW5pbmcgc2VydmVyXHJcbiAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgZm9sbG93aW5nIGV2ZW50LWhhbmRsZXIgZnVuY3Rpb25zICh3aGljaCB3aWxsIG9ubHkgYmUgY2FsbGVkIG9uY2UpOlxyXG4gICAgICAgICAgICAgICAgLy8gb25MaXN0ZW5pbmcoY2FsbGJhY2spIC0gQ2FsbGVkIHdoZW4gdGhlIHNlcnZlciBzdGFydHMgbGlzdGVuaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBvbkNsb3NlKGNhbGxiYWNrKSAtIENhbGxlZCB3aGVuIHRoZSBzZXJ2ZXIgc3RvcHMgbGlzdGVuaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBvbkVycm9yKGNhbGxiYWNrKSAtIENhbGxlZCBpZiBsaXN0ZW5pbmcgY291bGRuJ3QgYmUgc3RhcnRlZFxyXG4gICAgICAgIC8vIGNvbm5lY3Rpb24oY29ubmVjdGlvbkFyZ3VtZW50KSAtIFJldHVybnMgYSBjb25uZWN0aW9uIG9iamVjdFxyXG4gICAgICAgICAgICAvLyBjb25uZWN0aW9uQXJndW1lbnQgLSBUaGUgdmFsdWUgcmV0dXJuZWQgZnJvbSBgY29ubmVjdGAgYWJvdmUgb3IgZnJvbSB0aGUgYGFjY2VwdGAgZnVuY3Rpb24gaW4gYSBgbGlzdGVuYCBjYWxsYmFja1xyXG4gICAgLy8gc2VyaWFsaXphdGlvbiBpcyBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHM6XHJcbiAgICAgICAgLy8gc2VyaWFsaXplKGphdmFzY3JpcHRPYmplY3QpIC0gUmV0dXJucyB0aGUgamF2YXNjcmlwdCBvYmplY3QgaW4gc2VyaWFsaXplZCBmb3JtIChzb21ldGhpbmcgdGhlIHRyYW5zcG9ydCBjYW4gcHJvY2VzcywgbW9zdCBsaWtlbHkgYSBzdHJpbmcgb3IgQnVmZmVyKVxyXG4gICAgICAgIC8vIGRlc2VyaWFsaXplKHNlcmlhbGl6ZWRPYmplY3QpIC0gUmV0dXJucyBhIGphdmFzY3JpcHQgb2JqZWN0IHJlcHJlbnRlZCBieSB0aGUgc2VyaWFsaXplZE9iamVjdFxyXG4gICAgLy8gb3B0aW9uczpcclxuICAgICAgICAvLyBtYXhTZW5kU2l6ZSAtIFRoZSBtYXhpbXVtIGJ5dGUtbGVuZ3RoIGEgc2VudCBtZXNzYWdlIGNhbiBiZSAoRGVmYXVsdDogbm8gbGltaXQpXHJcbiAgICAgICAgLy8gbWF4UmVjZWl2ZVNpemUgLSBUaGUgbWF4aW11bSBieXRlLWxlbmd0aCBhIHJlY2VpdmVkIG1lc3NhZ2UgY2FuIGJlIChEZWZhdWx0OiBubyBsaW1pdClcclxuICAgICAgICAvLyBtYXhJZCAtIChEZWZhdWx0OiAyXjUzKSBUaGUgbWF4aW11bSBpZCB0byB1c2UgZm9yIHJlcXVlc3QgYW5kIHN0cmVhbSBjb21tYW5kcywgYXMgd2VsbCBhcyBzdHJlYW0gb3JkZXIgaWQgbnVtYmVyc1xyXG4gICAgICAgIC8vIGNsb3NlVGltZW91dCAtIChEZWZhdWx0OiAzMCwwMDAgbXMpIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgZm9yIG91dHN0YW5kaW5nIHJlcXVlc3RzIGFuZCBzdHJlYW1zIHRvIGNvbXBsZXRlIGJlZm9yZSBjbG9zaW5nIHRoZSBjb25uZWN0aW9uLiBJZiB0aGUgdGltZW91dCBpcyByZWFjaGVkLCBhbiAnZXJyb3InXHJcbiAgICAgICAgLy8gc2VuZENvbW1hbmRFcnJvckluZm8gLSAoRGVmYXVsdDp0cnVlKVxyXG4gICAgICAgICAgICAvLyBJZiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gZXJyb3JzIHdpbGwgYXV0b21hdGljYWxseSBiZSBzZW50IHRvIHRoZSBvdGhlciBQZWVyIGlmIHRoZWlyIGNvbW1hbmQgaXMgdW5wYXJzYWJsZSwgYW5kXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgcGFydCBvZiB0aGUgY29tbWFuZCB3aWxsIGJlIHNlbnQgd2l0aCBhbiBcImludmFsaWRNZXNzYWdlXCIgZXJyb3JcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB0aGUgZXJyb3Igd2lsbCBiZSBpZ25vcmVkIChidXQgaGFuZGxlYWJsZSB2aWEgcmF3SGFuZGxlIG9yIHByZUhhbmRsZSwgZGVwZW5kaW5nIG9uIHRoZSBjYXNlKS5cclxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKHRyYW5zcG9ydCwgc2VyaWFsaXphdGlvbiwgb3B0aW9ucykge1xyXG4gICAgICAgIGlmKCFvcHRpb25zKSBvcHRpb25zID0ge31cclxuXHJcbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnRcclxuICAgICAgICB0aGlzLnNlcmlhbGl6YXRpb24gPSBzZXJpYWxpemF0aW9uXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5tYXhJZCA9PT0gdW5kZWZpbmVkKSB0aGlzLm9wdGlvbnMubWF4SWQgPSBkZWZhdWx0TWF4SWRcclxuXHJcbiAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9XHJcbiAgICAgICAgLy8gdGhpcy5kZWZhdWx0SGFuZGxlclxyXG4gICAgICAgIC8vIHRoaXMucHJlSGFuZGxlclxyXG4gICAgICAgIC8vIHRoaXMucmF3SGFuZGxlclxyXG5cclxuICAgICAgICAvLyB0aGlzLmxpc3RlbmVyXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJucyBhIGZ1dHVyZSBvcGVuIGNvbm5lY3Rpb25cclxuICAgIC8vIHRha2VzIGluIGFueSBudW1iZXIgb2YgdHJhbnNwb3J0IHNwZWNpZmljIGNvbm5lY3Rpb24gYXJndW1lbnRzXHJcbiAgICB0aGlzLmNvbm5lY3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcclxuXHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoYXQudHJhbnNwb3J0LmNvbm5lY3QuYXBwbHkodGhhdC50cmFuc3BvcnQuY29ubmVjdCwgYXJncy5jb25jYXQoW3RoYXQub3B0aW9uc10pKVxyXG5cclxuICAgICAgICAgICAgdmFyIG9uT3BlbkNhbGxlZCA9IGZhbHNlLCBlcnJvcnMgPSBbXVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLm9uT3BlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG9uT3BlbkNhbGxlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocnBlcENvbm4pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgcnBlcENvbm4gPSBScGVwQ29ubmVjdGlvbih0aGF0LCBjb25uZWN0aW9uLCB7aXNTZXJ2ZXI6ZmFsc2UsIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYoIW9uT3BlbkNhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCJDb25uZWN0aW9uIGNvdWxkbid0IGJlIG9wZW5lZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSs9JzogXFxuJytlcnJvcnMuam9pbignXFxuJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgZS5lcnJvcnMgPSBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX0pXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLm9uRXJyb3IoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybnMgYSBmdXR1cmUgdGhhdCByZXNvbHZlcyBzdWNjZXNzZnVsbHkgd2hlbiB0aGUgc2VydmVyIGhhcyBiZWd1biBsaXN0ZW5pbmcgYW5kIHJlc29sdmVzIHRvIGFuIGVycm9yIGlmIGxpc3RlbmluZyBjb3VsZG4ndCBiZSBzdGFydGVkXHJcbiAgICB0aGlzLmxpc3RlbiA9IGZ1bmN0aW9uKC8qdmFyaWFibGUgbnVtYmVyIG9mIGxpc3RlbiBwYXJhbWV0ZXJzLCByZXF1ZXN0SGFuZGxlciovKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXHJcbiAgICAgICAgdmFyIHJlcXVlc3RIYW5kbGVyID0gYXJnc1thcmdzLmxlbmd0aC0xXVxyXG4gICAgICAgIHZhciB0cmFuc3BvcnRMaXN0ZW5Bcmd1bWVudHMgPSBhcmdzLnNsaWNlKDAsLTEpXHJcblxyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgaWYodGhhdC5saXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJScGVwIG9iamVjdCBhbHJlYWR5IGxpc3RlbmluZyFcIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5saXN0ZW5lciA9IHRoYXQudHJhbnNwb3J0Lmxpc3Rlbi5hcHBseSh0aGF0LnRyYW5zcG9ydCwgdHJhbnNwb3J0TGlzdGVuQXJndW1lbnRzLmNvbmNhdChbdGhhdC5vcHRpb25zLCBmdW5jdGlvbihyZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SGFuZGxlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSByZXF1ZXN0LmFjY2VwdC5hcHBseSh0aGF0LGFyZ3VtZW50cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJwZXBDb25uZWN0aW9uKHRoYXQsIGNvbm5lY3Rpb24sIHtpc1NlcnZlcjp0cnVlfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QucmVqZWN0LmFwcGx5KHRoYXQsIGFyZ3VtZW50cylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhd1JlcXVlc3Q6IHJlcXVlc3RcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1dKSlcclxuXHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5pbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGF0Lmxpc3RlbmVyLm9uTGlzdGVuaW5nKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuaW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoYXQubGlzdGVuZXIub25FcnJvcihmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVtaXQoJ2Vycm9yJyxlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGF0Lmxpc3RlbmVyLm9uQ2xvc2UoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5saXN0ZW5lciA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbWl0KCdjbG9zZScpXHJcbiAgICAgICAgICAgICAgICBpZihsaXN0ZW5pbmcgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBjbG9zZXMgYSBsaXN0ZW5pbmcgd2Vic29ja2V0IHNlcnZlclxyXG4gICAgLy8gbm8tb3AgaWYgdGhlIHNlcnZlciBpcyBhbHJlYWR5IGNsb3NlZFxyXG4gICAgdGhpcy5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKHRoaXMubGlzdGVuZXIpXHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuY2xvc2UoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNldHMgdXAgYSBoYW5kbGVyIHRvIHJlY2VpdmUgYSBmaXJlQW5kRm9yZ2V0IGNhbGxcclxuICAgIHRoaXMucmVjZWl2ZSA9IGZ1bmN0aW9uKGNvbW1hbmQsIGhhbmRsZXIpIHtcclxuICAgICAgICBhZGRDb21tYW5kKHRoaXMsIHJlY2VpdmUsIGNvbW1hbmQsIGhhbmRsZXIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0cyB1cCBhIGhhbmRsZXIgdG8gaGFuZGxlIHJlcXVlc3QtcmVzcG9uc2UgY2FsbHNcclxuICAgIC8vIHRoZSBoYW5kbGVyIGNhbiBlaXRoZXIgcmV0dXJuXHJcbiAgICAgICAgLy8gQSAocG9zc2libHkgZnV0dXJlKSB2YWx1ZSwgd2hpY2ggd2lsbCBiZSBzZW50IGFzIGEgcmVzcG9uc2UuIE9yLFxyXG4gICAgICAgIC8vIEEgKHBvc3NpYmx5IGZ1dHVyZSkgRXJyb3Igb2JqZWN0LiBUaGUgJ21lc3NhZ2UnIHdpbGwgYmUgc2VudCBhcyB0aGUgYGVycm9yYCwgYW5kIGFueSBvdGhlciBpdGVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBvYmplY3Qgd2lsbCBiZSBhZGRlZCBhcyB0aGUgYGRhdGFgLlxyXG4gICAgdGhpcy5yZXNwb25kID0gZnVuY3Rpb24oY29tbWFuZCwgaGFuZGxlcikge1xyXG4gICAgICAgIGFkZENvbW1hbmQodGhpcywgcmVzcG9uZCwgY29tbWFuZCwgaGFuZGxlcilcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXRzIHVwIGEgaGFuZGxlciB0byBoYW5kbGUgZXZlbnQtc3RlYW0gY2FsbHNcclxuICAgIHRoaXMuc3RyZWFtID0gZnVuY3Rpb24oY29tbWFuZCwgaGFuZGxlcikge1xyXG4gICAgICAgIGlmKCEoaGFuZGxlciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJycGVwLnN0cmVhbSByZXF1aXJlcyBhIGNhbGxiYWNrIGFzIHRoZSBzZWNvbmQgYXJndW1lbnRcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYWRkQ29tbWFuZCh0aGlzLCBzdHJlYW0sIGNvbW1hbmQsIGhhbmRsZXIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0cyBhIGRlZmF1bHQgY29tbWFuZCBoYW5kbGVyXHJcbiAgICB0aGlzLmRlZmF1bHQgPSBmdW5jdGlvbihoYW5kbGVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5kZWZhdWx0SGFuZGxlciAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBoYW5kbGVyRXJyb3IoJ2RlZmF1bHQgaGFuZGxlcicpXHJcblxyXG4gICAgICAgIHRoaXMuZGVmYXVsdEhhbmRsZXIgPSBoYW5kbGVyXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0cyB1cCBhIGZ1bmN0aW9uIHRoYXQgaXMgcnVuIGJlZm9yZSBldmVyeSBjb21tYW5kXHJcbiAgICAvLyBJZiBcImlnbm9yZVwiIGlzIHJldHVybmVkIGZyb20gYGhhbmRsZXJgLCB0aGUgY29ycmVzcG9uZGluZyByZWNlaXZlLCByZXNwb25kLCBzdHJlYW0sIG9yIGRlZmF1bHQgaGFuZGxlciB3aWxsIG5vdCBiZSBjYWxsZWRcclxuICAgIHRoaXMucHJlSGFuZGxlID0gZnVuY3Rpb24oaGFuZGxlcikge1xyXG4gICAgICAgIGlmKHRoaXMucHJlSGFuZGxlciAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBoYW5kbGVyRXJyb3IoJ3ByZUhhbmRsZScpXHJcblxyXG4gICAgICAgIHRoaXMucHJlSGFuZGxlciA9IGhhbmRsZXJcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXRzIHVwIGEgZnVuY3Rpb24gdGhhdCBpcyBydW4gYmVmb3JlIHRoZSBjb21tYW5kIGlzIGV2ZW4gcGFyc2VkXHJcbiAgICAvLyBJZiBcImlnbm9yZVwiIGlzIHJldHVybmVkIGZyb20gYGhhbmRsZXJgLCBwcmVIYW5kbGUgYW5kIHRoZSBjb3JyZXNwb25kaW5nIHJlY2VpdmUsIHJlc3BvbmQsIHN0cmVhbSwgb3IgZGVmYXVsdCBoYW5kbGVyIHdpbGwgbm90IGJlIGNhbGxlZFxyXG4gICAgdGhpcy5yYXdIYW5kbGUgPSBmdW5jdGlvbihoYW5kbGVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5yYXdIYW5kbGVyICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IGhhbmRsZXJFcnJvcigncmF3SGFuZGxlJylcclxuXHJcbiAgICAgICAgdGhpcy5yYXdIYW5kbGVyID0gaGFuZGxlclxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaXZhdGVcclxuXHJcbiAgICAvLyB0eXBlIHNob3VsZCBlaXRoZXIgYmUgYHJlY2VpdmVgLCBgcmVzcG9uZGAsIG9yIGBzdHJlYW1gXHJcbiAgICBmdW5jdGlvbiBhZGRDb21tYW5kKHRoYXQsIHR5cGUsIGNvbW1hbmQsIGhhbmRsZXIpIHtcclxuICAgICAgICBpZih0aGF0LmNvbW1hbmRzW2NvbW1hbmRdICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IGhhbmRsZXJFcnJvcignaGFuZGxlciBmb3IgXCInK2NvbW1hbmQrJ1wiJylcclxuICAgICAgICBpZihjb21tYW5kIGluIHJlc2VydmVkTGlzdGVuaW5nQ29tbWFuZHMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNldHVwIGEgaGFuZGxlciBmb3IgdGhlIGNvbW1hbmQgJ1wiK2NvbW1hbmQrXCInLCBiZWNhdXNlIGl0J3MgcmVzZXJ2ZWQgZm9yIGludGVybmFsIHVzZS5cIilcclxuICAgICAgICBpZigodHlwZSA9PT0gcmVzcG9uZCB8fCB0eXBlID09PSBzdHJlYW0pICYmIGNvbW1hbmQgaW4gcmVzZXJ2ZWRSZXNwb25kQW5kU3RyZWFtTGlzdGVuQ29tbWFuZHMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNldHVwIGEgcmVjZWl2ZSBvciBzdHJlYW0gaGFuZGxlciBmb3IgdGhlIGNvbW1hbmQgJ1wiK2NvbW1hbmQrXCInLCBiZWNhdXNlIGl0J3MgcmVzZXJ2ZWQgZm9yIGFzIGEgcmVjZWl2ZSBjb21tYW5kLiBJZiB5b3UnZCBsaWtlIHRvIGxpc3RlbiBmb3IgdGhpcyBjb21tYW5kLCB1c2UgYHJlY2VpdmVgLlwiKVxyXG5cclxuICAgICAgICB0aGF0LmNvbW1hbmRzW2NvbW1hbmRdID0ge3R5cGU6IHR5cGUsIGhhbmRsZXI6IGhhbmRsZXJ9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlckVycm9yKGhhbmRsZXJOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignQSAnK2hhbmRsZXJOYW1lKycgYWxyZWFkeSBleGlzdHMhIFlvdSBjYW4gb25seSBoYXZlIG9uZSBoYW5kbGVyIHBlciBjb21tYW5kLicpXHJcbiAgICB9XHJcbn0pXHJcblxyXG4vLyBBbiBpbnN0YW5jZSBvZiBScGVwQ29ubmVjdGlvbiBjYW4gZW1pdCB0aGUgZm9sbG93aW5nIGV2ZW50czpcclxuICAgIC8vIGNsb3NlKCkgLSBGaXJlZCBvbmNlIHRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZFxyXG4gICAgLy8gb3Blbk1lc3NhZ2UoKSAtIEZpcmVkIHdoZW4gYW4gJ29wZW4nIG1lc3NhZ2UgaXMgcmVjZWl2ZWQuIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cclxuICAgIC8vIGNsb3NlTWVzc2FnZSgpIC0gRmlyZWQgd2hlbiBhICdjbG9zZScgbWVzc2FnZSBpcyByZWNlaXZlZC4gRm9yIGludGVybmFsIHVzZSBvbmx5LlxyXG4gICAgLy8gZXJyb3IoZSkgLSBBbiBlcnJvciBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIGNvbm5lY3Rpb24gaW4gdGhlIGZvbGxvd2luZyBjYXNlczpcclxuICAgICAgICAvLyBXaGVuIHRoZSB0cmFuc3BvcnQgY2FsbHMgaXRzIG9uRXJyb3IgY2FsbGJhY2tcclxuICAgICAgICAvLyBXaGVuIGFuIGVycm9yIGlzIHRocm93biBmcm9tIGEgc3RyZWFtIG9yIHJlY2VpdmUgaGFuZGxlclxyXG4gICAgICAgIC8vIFdoZW4gYW4gZXJyb3IgdGhhdCBpc24ndCBhIFBlZXJFcnJvciBpcyB0aHJvd24gZnJvbSBhIHJlc3BvbmQgaGFuZGxlclxyXG4gICAgICAgIC8vIElmIGFuIHVuZXhwZWN0ZWQgaW50ZXJuYWwgZXhjZXB0aW9uIGlzIHRocm93biB3aGVuIGhhbmRsaW5nIGEgbWVzc2FnZVxyXG4gICAgICAgIC8vIElmIHRoZSBjbG9zZVRpbWVvdXQgaXMgcmVhY2hlZCBhbmQgdGhlcmUgYXJlIHN0aWxsIG9wZW4gcmVxdWVzdHMgb3Igc3RyZWFtcy4gVGhpcyBlcnJvciB3aWxsIGNvbnRhaW4gaW5mbyBhYm91dCB3aGF0IHJlcXVlc3RzIGFuZCBzdHJlYW1zIGFyZSBzdGlsbCBvcGVuLlxyXG52YXIgUnBlcENvbm5lY3Rpb24gPSBwcm90byhFdmVudEVtaXR0ZXIsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vIGNvbm5lY3Rpb25PcHRpb25zXHJcbiAgICAgICAgLy8gaXNTZXJ2ZXIgLSBTaG91bGQgYmUgdHJ1ZSBpZiB0aGUgY29ubmVjdGlvbiBpcyBiZWluZyBjcmVhdGQgYnkgYSBzZXJ2ZXIsIGZhbHNlIG90aGVyd2lzZVxyXG4gICAgICAgIC8vIG9uQ2xvc2UgLSBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgaW4gdGhlIG9uQ2xvc2UgZXZlbnQgYmVmb3JlIHRoZSAnY2xvc2UnIGV2ZW50IGlzIGVtaXR0ZWRcclxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKHJwZXBDb3JlT2JqZWN0LCBjb25uZWN0aW9uT2JqZWN0LCBjb25uZWN0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gcnBlcENvcmVPYmplY3QudHJhbnNwb3J0XHJcbiAgICAgICAgdGhpcy5zZXJpYWxpemF0aW9uID0gcnBlcENvcmVPYmplY3Quc2VyaWFsaXphdGlvblxyXG4gICAgICAgIHRoaXMuY29tbWFuZHMgPSBycGVwQ29yZU9iamVjdC5jb21tYW5kc1xyXG5cclxuICAgICAgICB0aGlzLmRlZmF1bHRIYW5kbGVyID0gcnBlcENvcmVPYmplY3QuZGVmYXVsdEhhbmRsZXJcclxuICAgICAgICB0aGlzLnByZUhhbmRsZXIgPSBycGVwQ29yZU9iamVjdC5wcmVIYW5kbGVyXHJcbiAgICAgICAgdGhpcy5yYXdIYW5kbGVyID0gcnBlcENvcmVPYmplY3QucmF3SGFuZGxlclxyXG5cclxuICAgICAgICB0aGlzLm1heFNlbmRTaXplID0gcnBlcENvcmVPYmplY3Qub3B0aW9ucy5tYXhTZW5kU2l6ZVxyXG4gICAgICAgIHRoaXMubWF4UmVjZWl2ZVNpemUgPSBycGVwQ29yZU9iamVjdC5vcHRpb25zLm1heFJlY2VpdmVTaXplXHJcbiAgICAgICAgdGhpcy5zZW5kQ29tbWFuZEVycm9ySW5mbyA9IHJwZXBDb3JlT2JqZWN0Lm9wdGlvbnMuc2VuZENvbW1hbmRFcnJvckluZm9cclxuICAgICAgICB0aGlzLm1heElkID0gcnBlcENvcmVPYmplY3Qub3B0aW9ucy5tYXhJZFxyXG4gICAgICAgIHRoaXMuY2xvc2VUaW1lb3V0ID0gcnBlcENvcmVPYmplY3Qub3B0aW9ucy5jbG9zZVRpbWVvdXQgfHwgMzAwMDBcclxuICAgICAgICB0aGlzLnNlcnZlciA9IGNvbm5lY3Rpb25PcHRpb25zLmlzU2VydmVyXHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb25PYmplY3RcclxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWVcclxuICAgICAgICB0aGlzLmNsb3NpbmcgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuc2Vzc2lvbkRhdGEgPSB7fVxyXG4gICAgICAgIHRoaXMuY29tbWFuZFN0YXRlID0ge31cclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyYXdDb25uZWN0aW9uJywgeyBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnJhd0Nvbm5lY3Rpb25cclxuICAgICAgICB9fSlcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLnNlcnZlcilcclxuICAgICAgICAgICAgdGhpcy5uZXh0SWQgPSAwXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLm5leHRJZCA9IDFcclxuXHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcblxyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdGlvbi5vbkNsb3NlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbkNsb3NlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYoY29ubmVjdGlvbk9wdGlvbnMub25DbG9zZSlcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uT3B0aW9ucy5vbkNsb3NlKClcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvbm5lY3RlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVtaXQoJ2Nsb3NlJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uKCdjbG9zZU1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29ubmVjdGVkID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZW1pdCgnY2xvc2UnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uTWVzc2FnZShmdW5jdGlvbihyYXdNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZSh0aGF0LCByYXdNZXNzYWdlKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uRXJyb3IoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGF0LmVtaXQoJ2Vycm9yJywgZSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsb3NlcyB0aGUgY29ubmVjdGlvblxyXG4gICAgdGhpcy5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2luZyA9IHRydWVcclxuICAgICAgICAgICAgaWYoT2JqZWN0LmtleXModGhpcy5jb21tYW5kU3RhdGUpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VJbnRlcm5hbCh0aGlzKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2VUaW1lb3V0SGFuZGxlID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VJbnRlcm5hbCh0aGF0KVxyXG4gICAgICAgICAgICAgICAgfSx0aGlzLmNsb3NlVGltZW91dClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGRyb3BzIHRoZSBjb25uZWN0aW9uIHdpdGhvdXQgaW5mb3JtaW5nIHRoZSBvdGhlciBQZWVyIGlmIHN1cHBvcnRlZCwgb3RoZXJ3aXNlIHdpdGggaW5mb3JtaW5nIHRoZSBvdGhlciBQZWVyXHJcbiAgICB0aGlzLmRyb3AgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZih0aGlzLmNvbm5lY3RlZCAmJiB0aGlzLmNvbm5lY3Rpb24uZHJvcCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uZHJvcCgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZpcmUgYW5kIGZvcmdldCBtZXNzYWdlXHJcbiAgICAvLyBJZiBgY29tbWFuZGAgaXMgXCJlcnJvclwiLCB0aGUgZGF0YSBtdXN0IGJlIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbWVzc2FnZSBwcm9wZXJ0eSAoZWcgYW4gRXJyb3Igb2JqZWN0KS4gQW55IG90aGVyIGl0ZXJhYmxlIHByb3BlcnRpZXMgd2lsbCBiZSBhZGRlZCBhcyBkYXRhLlxyXG4gICAgdGhpcy5maXJlID0gZnVuY3Rpb24oY29tbWFuZC8qLCBkYXRhLi4uKi8pIHtcclxuICAgICAgICBpZihjb21tYW5kID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50c1sxXS5tZXNzYWdlID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZGF0YSBmb3IgYW4gJ2Vycm9yJyBmaXJlLWFuZC1mb3JnZXQgbWVzc2FnZSBtdXN0IGhhdmUgYSAnbWVzc2FnZScgcHJvcGVydHkgKGVnIGFuIEVycm9yIG9iamVjdCBoYXMgYSBtZXNzYWdlIHByb3BlcnR5KVwiKVxyXG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggIT09IDIpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbiAnZXJyb3InIGZpcmUtYW5kLWZvcmdldCBtZXNzYWdlIGNhbiBvbmx5IHRha2Ugb25lIGFyZ3VtZW50IC0gdGhlIGVycm9yLlwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY29tbWFuZCBpbiByZXNlcnZlZEZpcmVDb21tYW5kcykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBmaXJlIGFuICdcIitjb21tYW5kK1wiJyBldmVudCBkaXJlY3RseTsgJ1wiK2NvbW1hbmQrXCInIGlzIGEgZ2xvYmFsIGNvbW1hbmQgcmVzZXJ2ZWQgZm9yIGludGVybmFsIHVzZS5cIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gW2NvbW1hbmRdXHJcbiAgICAgICAgaWYoY29tbWFuZCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBhcmd1bWVudHNbMV1cclxuICAgICAgICAgICAgdmFyIGVycm9yRGF0YSA9IHt9XHJcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaWYoayAhPT0gJ21lc3NhZ2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yRGF0YVtrXSA9IGVycm9yW2tdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2UucHVzaChlcnJvci5tZXNzYWdlLCBlcnJvckRhdGEpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWRkRGF0YShtZXNzYWdlLCBhcmd1bWVudHMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZW5kKHRoaXMsIG1lc3NhZ2UpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVxdWVzdCByZXNwb25zZVxyXG4gICAgdGhpcy5yZXF1ZXN0ID0gZnVuY3Rpb24oY29tbWFuZC8qLCBkYXRhLi4uKi8pIHtcclxuICAgICAgICBpZihjb21tYW5kIGluIHJlc2VydmVkUmVxdWVzdEFuZFN0cmVhbUNvbW1hbmRzKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBkbyBhICdcIitjb21tYW5kK1wiJyByZXF1ZXN0IGRpcmVjdGx5OyAnXCIrY29tbWFuZCtcIicgaXMgYSBnbG9iYWwgY29tbWFuZCByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNlLlwiKVxyXG4gICAgICAgIGlmKGNvbW1hbmQgaW4gcmVzZXJ2ZWRSZXF1ZXN0QW5kU3RyZWFtRXJyb3JDb21tYW5kKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBkbyBhbiAnZXJyb3InIHJlcXVlc3Q7ICdlcnJvcicgaXMgcmVzZXJ2ZWQgZm9yIGdsb2JhbCBmaXJlLWFuZC1mb3JnZXQgZXJyb3JzLlwiKVxyXG4gICAgICAgIGlmKHRoaXMuY29tbWFuZFN0YXRlW3RoaXMubmV4dElkXSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIGFscmVhZHkgYSBjYWxsYmFjayBmb3IgaWQ6ICcrdGhpcy5uZXh0SWQpXHJcblxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gW2NvbW1hbmQsIHRoaXMubmV4dElkXVxyXG4gICAgICAgIGFkZERhdGEobWVzc2FnZSwgYXJndW1lbnRzKVxyXG5cclxuICAgICAgICBzZW5kKHRoaXMsIG1lc3NhZ2UpXHJcblxyXG4gICAgICAgIHZhciB0aGVSZXNvbHZlciA9IHV0aWxzLnJlc29sdmVyKClcclxuICAgICAgICB0aGVSZXNvbHZlci5jb21tYW5kID0gY29tbWFuZFxyXG4gICAgICAgIHRoaXMuY29tbWFuZFN0YXRlW3RoaXMubmV4dElkXSA9IHRoZVJlc29sdmVyXHJcblxyXG4gICAgICAgIGluY3JlbWVudElkKHRoaXMpXHJcblxyXG4gICAgICAgIHJldHVybiB0aGVSZXNvbHZlci5mXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZnVsbC1kdXBsZXggZXZlbnQgc3RyZWFtXHJcbiAgICB0aGlzLnN0cmVhbUNvbm5lY3QgPSBmdW5jdGlvbihjb21tYW5kLyosIGRhdGEuLi4qLykge1xyXG4gICAgICAgIGlmKGNvbW1hbmQgaW4gcmVzZXJ2ZWRSZXF1ZXN0QW5kU3RyZWFtQ29tbWFuZHMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IG9wZW4gYSAnXCIrY29tbWFuZCtcIicgc3RyZWFtIGRpcmVjdGx5OyAnXCIrY29tbWFuZCtcIicgaXMgYSBnbG9iYWwgY29tbWFuZCByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNlLlwiKVxyXG4gICAgICAgIGlmKGNvbW1hbmQgaW4gcmVzZXJ2ZWRSZXF1ZXN0QW5kU3RyZWFtRXJyb3JDb21tYW5kKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBvcGVuIGFuICdlcnJvcicgc3RyZWFtOyAnZXJyb3InIGlzIHJlc2VydmVkIGZvciBnbG9iYWwgZmlyZS1hbmQtZm9yZ2V0IGVycm9ycy5cIilcclxuICAgICAgICBpZih0aGlzLmNvbW1hbmRTdGF0ZVt0aGlzLm5leHRJZF0gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBhbHJlYWR5IGEgY2FsbGJhY2sgZm9yIGlkOiAnK3RoaXMubmV4dElkKVxyXG5cclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFtjb21tYW5kLCB0aGlzLm5leHRJZF1cclxuICAgICAgICBhZGREYXRhKG1lc3NhZ2UsIGFyZ3VtZW50cylcclxuXHJcbiAgICAgICAgdmFyIGVtaXR0ZXIgPSB0aGlzLmNvbW1hbmRTdGF0ZVt0aGlzLm5leHRJZF0gPSBjcmVhdGVTdHJlYW1FbWl0ZXIodGhpcywgdGhpcy5uZXh0SWQpXHJcbiAgICAgICAgZW1pdHRlci5jb21tYW5kID0gY29tbWFuZFxyXG4gICAgICAgIHNlbmQodGhpcywgbWVzc2FnZSlcclxuXHJcbiAgICAgICAgaW5jcmVtZW50SWQodGhpcylcclxuXHJcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXJcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlXHJcblxyXG4gICAgZnVuY3Rpb24gc2VyaWFsaXplKHRoYXQsZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGF0LnNlcmlhbGl6YXRpb24uc2VyaWFsaXplKGRhdGEpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkZXNlcmlhbGl6ZSh0aGF0LHNlcmlhbGl6ZWREYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuc2VyaWFsaXphdGlvbi5kZXNlcmlhbGl6ZShzZXJpYWxpemVkRGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZUludGVybmFsKHRoYXQpIHtcclxuICAgICAgICBpZih0aGF0LmNsb3NlVGltZW91dEhhbmRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGF0LmNsb3NlVGltZW91dEhhbmRsZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpZHMgPSBPYmplY3Qua2V5cyh0aGF0LmNvbW1hbmRTdGF0ZSlcclxuICAgICAgICBpZihpZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJDb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZCBhZnRlciBhIFwiK3RoYXQuY2xvc2VUaW1lb3V0K1wibXMgdGltZW91dCBhbmQgc29tZSBwZW5kaW5nIHJlcXVlc3RzIGFuZCBzdHJlYW1zIHJlbWFpbiB1bmZ1bGZpbGxlZC4gXCIrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGUgZm9sbG93aW5nIHJlcXVlc3RzIGFuZCBzdHJlYW1zIHdlcmUgc3RpbGwgYWN0aXZlIHVwIHVudGlsIHRoZSB0aW1lb3V0OlxcblwiXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgYWN0aXZlQ29tbWFuZFN0YXRlcyA9IFtdXHJcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiB0aGF0LmNvbW1hbmRTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSB0aGF0LmNvbW1hbmRTdGF0ZVtrXVxyXG4gICAgICAgICAgICAgICAgaWYoaW5mbyBpbnN0YW5jZW9mIFJwZXBEdXBsZXhFdmVudEVtaXR0ZXIpIHsgLy8gc3RyZWFtXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5mby5lbmRNZXNzYWdlU2VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVDb21tYW5kU3RhdGVzLnB1c2goXCIqIFN0cmVhbSBcIitrK1wiICdcIitpbmZvLmNvbW1hbmQrXCInIHdhaXRpbmcgZm9yIG90aGVyIHNpZGUgdG8gJ2VuZCdcIilcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5mby5lbmRNZXNzYWdlUmVjZWl2ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29tbWFuZFN0YXRlcy5wdXNoKFwiKiBTdHJlYW0gXCIraytcIiAnXCIraW5mby5jb21tYW5kK1wiJyBoYXMgcmVjZWl2ZWQgJ2VuZCcgYnV0IGhhc24ndCBzZW50ICdlbmQnXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29tbWFuZFN0YXRlcy5wdXNoKFwiKiBTdHJlYW0gXCIraytcIiAnXCIraW5mby5jb21tYW5kK1wiJyBpcyBzdGlsbCBhY3RpdmVcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5mby5mICE9PSB1bmRlZmluZWQpIHsgLy8gcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNvbW1hbmRTdGF0ZXMucHVzaChcIiogUmVxdWVzdCBcIitrK1wiIHRvICdcIitpbmZvLmNvbW1hbmQrXCInXCIpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNvbW1hbmRTdGF0ZXMucHVzaChcIiogUmVzcG9uc2UgXCIraytcIiBmb3IgJ1wiK2luZm8uY29tbWFuZCtcIidcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlKz1hY3RpdmVDb21tYW5kU3RhdGVzLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgICAgIHZhciBlID0gbmV3IEVycm9yKGVycm9yTWVzc2FnZSlcclxuICAgICAgICAgICAgZS5pZHMgPSBpZHNcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZFN0YXRlID0ge30gLy8gY2xlYXIgY29tbWFuZCBzdGF0ZSBzbyBhbnl0aGluZyB0aGF0IGNvbWVzIHRocm91Z2ggd2lsbCBlcnJvciAtIHRvZG86IHNob3VsZCB3ZSBqdXN0IGxlYXZlIGl0IGJlIHRobz9cclxuXHJcbiAgICAgICAgICAgIHRoYXQuZW1pdCgnZXJyb3InLCBlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhhdC5jb25uZWN0aW9uLm9uQ2xvc2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZW5kKHRoYXQsIFsnY2xvc2UnXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoYXQuY29ubmVjdGlvbi5jbG9zZSgpXHJcbiAgICAgICAgdGhhdC5jb25uZWN0aW9uID0gdW5kZWZpbmVkXHJcbiAgICB9XHJcbiAgICAvLyBjaGVja3MgaWYgdGhlIGNvbm5lY3Rpb24gaXMgY2xvc2luZyBhbmQgaWYgaXQgaXMgYW5kIGl0J3MgYSBjbGVhbiBjbG9zZSwgY2xvc2UgaXQgb3V0XHJcbiAgICBmdW5jdGlvbiBjaGVja0NsZWFuQ2xvc2UodGhhdCkge1xyXG4gICAgICAgIGlmKHRoYXQuY2xvc2luZyAmJiBPYmplY3Qua2V5cyh0aGF0LmNvbW1hbmRTdGF0ZSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNsb3NlSW50ZXJuYWwodGhhdClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWF5IHNlbmQgYW4gaWREaXNjb250aW51aXR5IG1lc3NhZ2VcclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudElkKHRoYXQpIHtcclxuICAgICAgICB2YXIgcHJldklkID0gdGhhdC5uZXh0SWRcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIHRoYXQubmV4dElkICs9IDJcclxuICAgICAgICAgICAgaWYodGhhdC5uZXh0SWQgPiB0aGF0Lm1heElkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5leHRJZCA9IHRoYXQubmV4dElkJTIgLy8gcmVzZXQgdG8gMCBvciAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IHdoaWxlKHRoYXQubmV4dElkIGluIHRoYXQuY29tbWFuZFN0YXRlICYmIHByZXZJZCAhPT0gdGhhdC5uZXh0SWQpXHJcblxyXG4gICAgICAgIGlmKHByZXZJZCA9PT0gdGhhdC5uZXh0SWQpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHZhbGlkIHJwZXAgSURzIGxlZnQgdG8gdXNlLlwiKVxyXG4gICAgICAgIGlmKHRoYXQubmV4dElkICE9PSBwcmV2SWQrMilcclxuICAgICAgICAgICAgc2VuZCh0aGF0LCBbJ2lkRGlzY29udGludWl0eScsIFtwcmV2SWQsdGhhdC5uZXh0SWRdXSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGREYXRhKG1lc3NhZ2UsIHRoZUFyZ3VtZW50cykge1xyXG4gICAgICAgIHZhciBkYXRhID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhlQXJndW1lbnRzLCAxKVxyXG4gICAgICAgIGlmKGRhdGEubGVuZ3RoID09PSAxKVxyXG4gICAgICAgICAgICBtZXNzYWdlLnB1c2goZGF0YVswXSlcclxuICAgICAgICBlbHNlIGlmKGRhdGEubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgbWVzc2FnZS5wdXNoKGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJucyB0aGUgYXJndW1lbnQgaWYgaXRzIGFycmF5LCBvciB3cmFwcyBpdCBpbiBhbiBhcnJheSBpZiBub3RcclxuICAgIGZ1bmN0aW9uIGdldEFycmF5RGF0YShkYXRhKSB7XHJcbiAgICAgICAgaWYoZGF0YSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gW11cclxuICAgICAgICBlbHNlIGlmKGRhdGEgaW5zdGFuY2VvZiBBcnJheSlcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBbZGF0YV1cclxuICAgIH1cclxuXHJcbiAgICAvLyBtYXkgc2VuZCBhbiBkaXNjdG9udGludWl0eSBtZXNzYWdlXHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRPcmRlck51bWJlcih0aGF0LCBlbWl0dGVyKSB7XHJcbiAgICAgICAgZW1pdHRlci5uZXh0T3JkZXJOdW1iZXIgKz0gMVxyXG4gICAgICAgIGlmKGVtaXR0ZXIubmV4dE9yZGVyTnVtYmVyID4gdGhhdC5tYXhJZCkge1xyXG4gICAgICAgICAgICB2YXIgcHJldk51bWJlciA9IGVtaXR0ZXIubmV4dE9yZGVyTnVtYmVyLTFcclxuICAgICAgICAgICAgZW1pdHRlci5uZXh0T3JkZXJOdW1iZXIgPSAwXHJcbiAgICAgICAgICAgIHNlbmRFdmVudCh0aGF0LCBlbWl0dGVyLCAgZW1pdHRlci5pZCwgJ29yZGVyTnVtYmVyRGlzY29udGludWl0eScsIFsnJywgcHJldk51bWJlciwgZW1pdHRlci5uZXh0T3JkZXJOdW1iZXJdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBlcnJvciBpcyBleHBlY3RlZCB0byBiZSBhbiBleGNlcHRpb24gb2JqZWN0ICh3aXRoIGEgbWVzc2FnZSBwcm9wZXJ0eSBhdCBsZWFzdClcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVycm9ySW5mbyhlcnJvcikge1xyXG4gICAgICAgIHZhciBkYXRhID0ge30sIGFueSA9IGZhbHNlXHJcbiAgICAgICAgZm9yKHZhciBrIGluIGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmKGsgIT09ICdtZXNzYWdlJykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtrXSA9IGVycm9yW2tdXHJcbiAgICAgICAgICAgICAgICBhbnkgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBlcnJvckluZm8gPSBbZXJyb3IubWVzc2FnZV1cclxuICAgICAgICBpZihhbnkpIHtcclxuICAgICAgICAgICAgZXJyb3JJbmZvLnB1c2goZGF0YSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvckluZm9cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFcnJvckZyb21NZXNzYWdlKGVycm9yTWVzc2FnZSwgZXJyb3JEYXRhKSB7XHJcbiAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKVxyXG4gICAgICAgIGZvcih2YXIgayBpbiBlcnJvckRhdGEpIHtcclxuICAgICAgICAgICAgaWYoayAhPT0gJ21lc3NhZ2UnKVxyXG4gICAgICAgICAgICAgICAgZVtrXSA9IGVycm9yRGF0YVtrXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdHJlYW1FbWl0ZXIodGhhdCwgaWQpIHtcclxuICAgICAgICB2YXIgZW1pdHRlciA9IFJwZXBEdXBsZXhFdmVudEVtaXR0ZXIoZnVuY3Rpb24gb25FbWl0KGV2ZW50LyosIGRhdGEqLykge1xyXG4gICAgICAgICAgICBpZihlbWl0dGVyLmVuZE1lc3NhZ2VTZW50KVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyZWFtICdlbmQnIGV2ZW50IGhhcyBiZWVuIHNlbnQsIGNhbid0IHNlbmQgbW9yZSBldmVudHMuXCIpXHJcbiAgICAgICAgICAgIGlmKGV2ZW50IGluIHJlc2VydmVkU3RyZWFtRW1pc3Npb25FdmVudHMpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBlbWl0IHRoZSAnXCIrZXZlbnQrXCInIGV2ZW50IGRpcmVjdGx5OyAnXCIrZXZlbnQrXCInIGlzIHJlc2VydmVkIGZvciBpbnRlcm5hbCB1c2UuXCIpXHJcbiAgICAgICAgICAgIGlmKGV2ZW50ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICBpZihhcmd1bWVudHNbMV0ubWVzc2FnZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBkYXRhIGZvciBhbiAnZXJyb3InIGV2ZW50IG11c3QgaGF2ZSBhICdtZXNzYWdlJyBwcm9wZXJ0eSAoZWcgYW4gRXJyb3Igb2JqZWN0IGhhcyBhIG1lc3NhZ2UgcHJvcGVydHkpXCIpXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggIT09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gJ2Vycm9yJyBldmVudCBjYW4gb25seSB0YWtlIG9uZSBhcmd1bWVudCAtIHRoZSBlcnJvci5cIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VuZEV2ZW50KHRoYXQsIGVtaXR0ZXIsIGlkLCBldmVudCwgYXJndW1lbnRzKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGVtaXR0ZXIuaWQgPSBpZFxyXG4gICAgICAgIGVtaXR0ZXIub3JkZXJpbmdEYXRhID0gZmFsc2VcclxuICAgICAgICBlbWl0dGVyLm5leHRPcmRlck51bWJlciA9IDBcclxuICAgICAgICBlbWl0dGVyLmVuZE1lc3NhZ2VTZW50ID0gZmFsc2VcclxuICAgICAgICByZXR1cm4gZW1pdHRlclxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJhdyBzZW5kXHJcbiAgICBmdW5jdGlvbiBzZW5kKHRoYXQsIG1lc3NhZ2UpIHtcclxuICAgICAgICB2YXIgc2VyaWFsaXplZE1lc3NhZ2UgPSBzZXJpYWxpemUodGhhdCwgbWVzc2FnZSlcclxuICAgICAgICBpZih0aGF0Lm1heFNlbmRTaXplICE9PSB1bmRlZmluZWQgJiYgc2VyaWFsaXplZE1lc3NhZ2UubGVuZ3RoID4gdGhhdC5tYXhTZW5kU2l6ZSkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcignbWF4TWVzc2FnZVNpemVFeGNlZWRlZCcpXHJcbiAgICAgICAgICAgIGUubWVzc2FnZVNpemUgPSBzZXJpYWxpemVkTWVzc2FnZS5sZW5ndGhcclxuICAgICAgICAgICAgdGhyb3cgZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhhdC5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhhdC5jb25uZWN0aW9uLnNlbmQoc2VyaWFsaXplZE1lc3NhZ2UpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0Nvbm5lY3Rpb24gaXMgY2xvc2VkJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXJncyB3aWxsIGNvbnRhaW4gW2V2ZW50LCBkYXRhLi4uXVxyXG4gICAgZnVuY3Rpb24gc2VuZEV2ZW50KHRoYXQsIGVtaXR0ZXIsIGlkLCBldmVudCwgYXJncykge1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gW2lkXVxyXG4gICAgICAgIGlmKGVtaXR0ZXIub3JkZXJpbmdEYXRhKVxyXG4gICAgICAgICAgICBtZXNzYWdlLnB1c2goZW1pdHRlci5uZXh0T3JkZXJOdW1iZXIpXHJcblxyXG4gICAgICAgIG1lc3NhZ2UucHVzaChldmVudClcclxuXHJcbiAgICAgICAgaWYoZXZlbnQgPT09ICdlcnJvcicpXHJcbiAgICAgICAgICAgIG1lc3NhZ2UucHVzaChjcmVhdGVFcnJvckluZm8oYXJnc1sxXSkpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBhZGREYXRhKG1lc3NhZ2UsIGFyZ3MpXHJcblxyXG4gICAgICAgIHNlbmQodGhhdCwgbWVzc2FnZSlcclxuXHJcbiAgICAgICAgaWYoZXZlbnQgPT09ICdlbmQnKSB7XHJcbiAgICAgICAgICAgIGVtaXR0ZXIuZW5kTWVzc2FnZVNlbnQgPSB0cnVlXHJcbiAgICAgICAgICAgIGlmKGVtaXR0ZXIuZW5kTWVzc2FnZVJlY2VpdmVkKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhhdC5jb21tYW5kU3RhdGVbaWRdIC8vIGVuc3VyZXMgdGhhdCBcInJwZXBJZE5vdEZvdW5kXCIgd2lsbCBiZSByZXR1cm5lZCBpZiB0aGlzIHN0cmVhbSBjb250aW51ZXMgdG8gYmUgY29tbXVuaWNhdGVkIG9uXHJcbiAgICAgICAgICAgICAgICBjaGVja0NsZWFuQ2xvc2UodGhhdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZihlbWl0dGVyLm9yZGVyaW5nRGF0YSkge1xyXG4gICAgICAgICAgICBpbmNyZW1lbnRPcmRlck51bWJlcih0aGF0LCBlbWl0dGVyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGUodGhhdCwgcmF3TWVzc2FnZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmKHRoYXQucmF3SGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5yYXdIYW5kbGVyLmNhbGwodGhhdCwgcmF3TWVzc2FnZSkgPT09ICdpZ25vcmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGRlc2VyaWFsaXplKHRoYXQsIHJhd01lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5zZW5kQ29tbWFuZEVycm9ySW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlyZShcImVycm9yXCIsIHttZXNzYWdlOiBcInVucGFyc2FibGVDb21tYW5kXCIsIHJhd01lc3NhZ2U6IHJhd01lc3NhZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlLm1lc3NhZ2UgPT09ICdtYXhNZXNzYWdlU2l6ZUV4Y2VlZGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlyZShcImVycm9yXCIsIHttZXNzYWdlOiBcInVucGFyc2FibGVDb21tYW5kXCIsIHJhd01lc3NhZ2U6IHJhd01lc3NhZ2Uuc2xpY2UoMCwyMDApfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB0aHJvdyBlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGF0LnByZUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoYXQucHJlSGFuZGxlci5jYWxsKHRoYXQsIG1lc3NhZ2UpID09PSAnaWdub3JlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZTAgPSB0eXBlb2YobWVzc2FnZVswXSlcclxuICAgICAgICAgICAgaWYodHlwZTAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvcGVuIGFuZCBjbG9zZSBmaXJlLWFuZC1mb3JnZXQgY29ubmVjdGlvbiBlc3RhYmxpc2htZW50IG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UubGVuZ3RoID09PSAxICYmIG1lc3NhZ2VbMF0gPT09ICdjbG9zZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVtaXQoXCJjbG9zZU1lc3NhZ2VcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29tbWFuZEluZm8gPSB0aGF0LmNvbW1hbmRzW21lc3NhZ2VbMF1dXHJcbiAgICAgICAgICAgICAgICBpZihjb21tYW5kSW5mbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5kZWZhdWx0SGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEhhbmRsZXIuY2FsbCh0aGF0LG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlWzBdID09PSAnZXJyb3InKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVFcnJvckZyb21NZXNzYWdlKG1lc3NhZ2VbMV0sIG1lc3NhZ2VbMl0pXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZVswXSAhPT0gJ2lkRGlzY29udGludWl0eScpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpcmUoJ2Vycm9yJywge21lc3NhZ2U6IFwibm9TdWNoQ29tbWFuZFwiLCBjb21tYW5kOiBtZXNzYWdlWzBdfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY29tbWFuZEluZm8udHlwZSA9PT0gcmVjZWl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2VbMF0gPT09ICdlcnJvcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gW2NyZWF0ZUVycm9yRnJvbU1lc3NhZ2UobWVzc2FnZVsxXSwgbWVzc2FnZVsyXSldXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGdldEFycmF5RGF0YShtZXNzYWdlWzFdKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kSW5mby5oYW5kbGVyLmFwcGx5KHRoYXQsIGRhdGEpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY29tbWFuZEluZm8udHlwZSA9PT0gcmVzcG9uZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IG1lc3NhZ2VbMV1cclxuICAgICAgICAgICAgICAgICAgICBpZighdmFsaWRhdGVJZCh0aGF0LCBpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbW1hbmRTdGF0ZVtpZF0gPSB7Y29tbWFuZDogbWVzc2FnZVswXX1cclxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZEluZm8uaGFuZGxlci5hcHBseSh0aGF0LCBnZXRBcnJheURhdGEobWVzc2FnZVsyXSkuY29uY2F0KFtpZF0pKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGF0LmNvbW1hbmRTdGF0ZVtpZF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZCh0aGF0LCBbaWQscmVzdWx0XSlcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGF0LmNvbW1hbmRTdGF0ZVtpZF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZSBpbnN0YW5jZW9mIFBlZXJFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9ySW5mbyA9IGNyZWF0ZUVycm9ySW5mbyhlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9ySW5mbyA9IFsndW5leHBlY3RlZFBlZXJFcnJvcicsIHt9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmQodGhhdCwgW2lkXS5jb25jYXQoZXJyb3JJbmZvKSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvbW1hbmRJbmZvLnR5cGUgPT09IHN0cmVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IG1lc3NhZ2VbMV1cclxuICAgICAgICAgICAgICAgICAgICBpZighdmFsaWRhdGVJZCh0aGF0LCBpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbWl0dGVyID0gdGhhdC5jb21tYW5kU3RhdGVbaWRdID0gY3JlYXRlU3RyZWFtRW1pdGVyKHRoYXQsaWQpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRJbmZvLmhhbmRsZXIuYXBwbHkodGhhdCwgW2VtaXR0ZXJdLmNvbmNhdChnZXRBcnJheURhdGEobWVzc2FnZVsyXSkpLmNvbmNhdChbaWRdKSlcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGUpIC8vIG5vdGUgdGhhdCBQZWVyRXJyb3Igb2JqZWN0cyBhcmUgdHJlYXRlZCBsaWtlIG5vcm1hbCBFcnJvcnMgaGVyZSAtIHRvIGVtaXQgYW4gZXJyb3IsIHlvdSBtdXN0IGVtaXQgYW4gJ2Vycm9yJyBldmVudCBmcm9tIHRoZSBwYXNzZWQgZW1pdHRlclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBjb21tYW5kIHR5cGU6IFwiK2NvbW1hbmRJbmZvLnR5cGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZTAgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpZighKG1lc3NhZ2VbMF0gaW4gdGhhdC5jb21tYW5kU3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maXJlKFwiZXJyb3JcIiwge21lc3NhZ2U6IFwicnBlcElkTm90Rm91bmRcIiwgaWQ6IG1lc3NhZ2VbMF19KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbmZvID0gdGhhdC5jb21tYW5kU3RhdGVbbWVzc2FnZVswXV1cclxuICAgICAgICAgICAgICAgIGlmKGluZm8gaW5zdGFuY2VvZiBScGVwRHVwbGV4RXZlbnRFbWl0dGVyKSB7IC8vc3RyZWFtXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVtaXR0ZXIgPSBpbmZvXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKG1lc3NhZ2VbMV0pID09PSAnc3RyaW5nJykgeyAgICAgICAgICAvLyBtZXNzYWdlIHdpdGhvdXQgb3JkZXIgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBldmVudCA9IG1lc3NhZ2VbMV0sIGV2ZW50RGF0YSA9IG1lc3NhZ2VbMl1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKG1lc3NhZ2VbMl0pID09PSAnc3RyaW5nJykgeyAgIC8vIG1lc3NhZ2Ugd2l0aCBvcmRlciBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyTnVtYmVyID0gbWVzc2FnZVsxXSwgZXZlbnQgPSBtZXNzYWdlWzJdLCBldmVudERhdGEgPSBtZXNzYWdlWzNdXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVjZWl2ZWQgaW52YWxpZCBzdHJlYW0gbWVzc2FnZTogY291bGRuJ3QgZmluZCBzdHJpbmcgZXZlbnQgbmFtZSBhdCBwb3NpdGlvbiAxIG9yIDIgaW4gdGhlIG1lc3NhZ2VcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50ID09PSAnb3JkZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIub3JkZXJpbmdEYXRhID0gZXZlbnREYXRhID09PSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IGNyZWF0ZUVycm9yRnJvbU1lc3NhZ2UoZXZlbnREYXRhWzBdLCBldmVudERhdGFbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLl9leHRlcm5hbC5lbWl0KCdlcnJvcicsIGVycm9yLCBvcmRlck51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbWl0QXJncyA9IFtldmVudF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50RGF0YSAhPT0gdW5kZWZpbmVkKSBlbWl0QXJncyA9IGVtaXRBcmdzLmNvbmNhdChldmVudERhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvcmRlck51bWJlciAhPT0gdW5kZWZpbmVkKSBlbWl0QXJncy5wdXNoKG9yZGVyTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5fZXh0ZXJuYWwuZW1pdC5hcHBseShlbWl0dGVyLl9leHRlcm5hbCwgZW1pdEFyZ3MpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQgPT09ICdlbmQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5lbmRNZXNzYWdlUmVjZWl2ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZW1pdHRlci5lbmRNZXNzYWdlU2VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhhdC5jb21tYW5kU3RhdGVbbWVzc2FnZVswXV0gLy8gZW5zdXJlcyB0aGF0IFwicnBlcElkTm90Rm91bmRcIiB3aWxsIGJlIHJldHVybmVkIGlmIHRoaXMgc3RyZWFtIGNvbnRpbnVlcyB0byBiZSBjb21tdW5pY2F0ZWQgb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDbGVhbkNsb3NlKHRoYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGluZm8uZiAhPT0gdW5kZWZpbmVkKSB7IC8vIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZVJlc29sdmVyID0gaW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UubGVuZ3RoID09PSAzKSB7IC8vIGVycm9yIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVJlc29sdmVyLnJlamVjdChjcmVhdGVFcnJvckZyb21NZXNzYWdlKG1lc3NhZ2VbMV0sIG1lc3NhZ2VbMl0pKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5vcm1hbCByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVSZXNvbHZlci5yZXNvbHZlKG1lc3NhZ2VbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhhdC5jb21tYW5kU3RhdGVbbWVzc2FnZVswXV1cclxuICAgICAgICAgICAgICAgICAgICBjaGVja0NsZWFuQ2xvc2UodGhhdClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hvdWxkbid0IGdldCBoZXJlIFwiK0pTT04uc3RyaW5naWZ5KGluZm8pKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5zZW5kQ29tbWFuZEVycm9ySW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmlyZShcImVycm9yXCIsIHttZXNzYWdlOiBcImludmFsaWRNZXNzYWdlXCIsIHJhd01lc3NhZ2U6IHJhd01lc3NhZ2Uuc2xpY2UoMCwyMDApfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maXJlKFwiZXJyb3JcIiwge21lc3NhZ2U6IFwiaW52YWxpZE1lc3NhZ2VcIn0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gc2VuZHMgYW4gcnBlcEludmFsaWRJZCBlcnJvciBmaXJlLWFuZC1mb3JnZXQgbWVzc2FnZSBpZiB0aGUgaWQgaXNuJ3QgdmFsaWRcclxuLy8gcmV0dXJucyB0cnVlIGlmIHRoZSBpZCBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlXHJcbmZ1bmN0aW9uIHZhbGlkYXRlSWQodGhhdCwgaWQpIHtcclxuICAgIGlmKGlkID4gdGhhdC5tYXhJZCkge1xyXG4gICAgICAgIHZhciByZWFzb24gPSBcIklkIGdyZWF0ZXIgdGhhbiBcIlxyXG4gICAgICAgIGlmKHRoYXQubWF4SWQgPT09IGRlZmF1bHRNYXhJZCkgcmVhc29uICs9IFwiMl41M1wiXHJcbiAgICAgICAgZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFzb24gKz0gdGhhdC5tYXhJZFxyXG4gICAgfSBlbHNlIGlmKHRoYXQuc2VydmVyKSB7XHJcbiAgICAgICAgaWYoaWQlMiAhPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgcmVhc29uID0gXCJJZCBmcm9tIGNsaWVudCBub3Qgb2RkXCJcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYoaWQlMiAhPT0gMCkge1xyXG4gICAgICAgIHZhciByZWFzb24gPSBcIklkIGZyb20gc2VydmVyIG5vdCBldmVuXCJcclxuICAgIH1cclxuXHJcbiAgICBpZihyZWFzb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoYXQuZmlyZShcImVycm9yXCIsIHttZXNzYWdlOiAncnBlcEludmFsaWRJZCcsIHJlYXNvbjogcmVhc29ufSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxufVxyXG5cclxuXHJcbnZhciBScGVwRHVwbGV4RXZlbnRFbWl0dGVyID0gcHJvdG8oRHVwbGV4RXZlbnRFbWl0dGVyLCBmdW5jdGlvbihzdXBlcmNsYXNzKSB7XHJcbiAgICB0aGlzLm9uID0gZnVuY3Rpb24oZXZlbnQsaGFuZGxlcikge1xyXG4gICAgICAgIGlmKGV2ZW50IGluIHJlc2VydmVkRXZlbnRMaXN0ZW5pbmdFdmVudHMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGxpc3RlbiBvbiB0aGUgJ1wiK2V2ZW50K1wiJyBldmVudCBkaXJlY3RseTsgdGhlICdcIitldmVudCtcIicgZXZlbnQgaXMgcmVzZXJ2ZWQgZm9yIGludGVybmFsIHVzZS5cIilcclxuXHJcbiAgICAgICAgc3VwZXJjbGFzcy5vbi5jYWxsKHRoaXMsIGV2ZW50LGhhbmRsZXIpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbkFueSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgc3VwZXJjbGFzcy5vbkFueS5jYWxsKHRoaXMsIGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICBpZighKGV2ZW50TmFtZSBpbiByZXNlcnZlZEV2ZW50TGlzdGVuaW5nRXZlbnRzKSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG59KSJdfQ==


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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFx1dGlscy5qcyhvcmlnaW5hbCkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBQSxDQUFRLFFBQVIsQ0FBQSxDQUFBLENBQW1CLFlBQVc7SUFDMUIsR0FBQSxDQUFJLFNBQVM7SUFDYixHQUFBLENBQUksSUFBSSxJQUFJLE9BQUosQ0FBWSxVQUFTLFNBQVcsRUFBQSxVQUFVO1FBQzlDLE9BQUEsQ0FBQSxDQUFBLENBQVU7UUFDVixNQUFBLENBQUEsQ0FBQSxDQUFTO0lBQ2pCO0lBRUksT0FBTztRQUFDLEdBQUcsQ0FBSixDQUFBO1FBQU8sU0FBUSxPQUFmLENBQUE7UUFBd0IsUUFBTzs7QUFDMUM7QUFHQSxPQUFBLENBQVEsS0FBUixDQUFBLENBQUEsQ0FBZ0IsVUFBUyxDQUFFLEVBQUEsR0FBRztJQUMxQixJQUFHLENBQUEsQ0FBQSxVQUFBLENBQWEsT0FBTztRQUNuQixJQUFHLEVBQUUsQ0FBQSxDQUFBLFVBQUEsQ0FBYTtZQUNkLE9BQU87UUFDWCxJQUFHLENBQUEsQ0FBRSxNQUFGLENBQUEsR0FBQSxDQUFhLENBQUEsQ0FBRSxRQUFRO1lBQ3RCLE9BQU87UUFDbkIsT0FBZTtZQUNILEtBQUksR0FBQSxDQUFJLElBQUUsRUFBRyxDQUFBLENBQUEsQ0FBQSxDQUFFLENBQUEsQ0FBRSxRQUFRLENBQUEsSUFBSztnQkFDMUIsSUFBRyxDQUFDLE9BQUEsQ0FBUSxLQUFSLENBQWMsQ0FBQSxDQUFFLElBQUcsQ0FBQSxDQUFFLEtBQUs7b0JBQzFCLE9BQU87Z0JBQzNCO1lBQ0E7WUFFWSxPQUFPO1FBQ25CO0lBQ0EsT0FBVyxJQUFHLENBQUEsQ0FBQSxVQUFBLENBQWEsUUFBUTtRQUMzQixJQUFHLEVBQUUsQ0FBQSxDQUFBLFVBQUEsQ0FBYTtZQUNkLE9BQU87UUFFWCxHQUFBLENBQUksUUFBUSxPQUFBLENBQVE7UUFDcEIsR0FBQSxDQUFJLFFBQVEsT0FBQSxDQUFRO1FBRXBCLElBQUcsS0FBQSxDQUFNLE1BQU4sQ0FBQSxHQUFBLENBQWlCLEtBQUEsQ0FBTSxRQUFRO1lBQzlCLE9BQU87UUFDbkIsT0FBZTtZQUNILEtBQUksR0FBQSxDQUFJLElBQUUsRUFBRyxDQUFBLENBQUEsQ0FBQSxDQUFFLEtBQUEsQ0FBTSxRQUFRLENBQUEsSUFBSztnQkFDOUIsR0FBQSxDQUFJLE1BQU0sS0FBQSxDQUFNO2dCQUNoQixHQUFBLENBQUksT0FBTyxDQUFBLENBQUU7Z0JBQ2IsR0FBQSxDQUFJLE9BQU8sQ0FBQSxDQUFFO2dCQUViLElBQUcsQ0FBQyxPQUFBLENBQVEsS0FBUixDQUFjLE1BQUssT0FBTztvQkFDMUIsT0FBTztnQkFDM0I7WUFDQTtZQUVZLE9BQU87UUFDbkI7SUFDQSxPQUFXO1FBQ0gsT0FBTyxDQUFBLENBQUEsR0FBQSxDQUFJLENBQUosQ0FBQSxFQUFBLENBQVMsTUFBQSxDQUFPLEtBQVAsQ0FBYSxFQUFiLENBQUEsRUFBQSxDQUFtQixNQUFBLENBQU8sS0FBUCxDQUFhO0lBQ3hEO0FBQ0E7QUFHQSxTQUFTLFFBQVEsR0FBRztJQUNoQixHQUFBLENBQUksT0FBSztJQUNULEtBQUksR0FBQSxDQUFJLEtBQUssR0FBRztRQUNaLElBQUcsQ0FBQSxDQUFFLEVBQUYsQ0FBQSxHQUFBLENBQVMsU0FBVCxDQUFBLEVBQUEsQ0FBc0IsTUFBQSxDQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBRSxJQUFJO1lBQ2hFLElBQUEsQ0FBSyxJQUFMLENBQVU7UUFDdEI7SUFDQTtJQUVJLE9BQU87QUFDWDs7QUFqRUEiLCJmaWxlIjoiRDpcXGJpbGx5c0ZpbGVcXGNvZGVcXGphdmFzY3JpcHRcXG1vZHVsZXNcXHJwZXAuanNcXHV0aWxzLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuZXhwb3J0cy5yZXNvbHZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJlc29sdmUsIHJlamVjdFxyXG4gICAgdmFyIGYgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihpblJlc29sdmUsIGluUmVqZWN0KSB7XHJcbiAgICAgICAgcmVzb2x2ZSA9IGluUmVzb2x2ZVxyXG4gICAgICAgIHJlamVjdCA9IGluUmVqZWN0XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiB7ZjogZiwgcmVzb2x2ZTpyZXNvbHZlLCByZWplY3Q6cmVqZWN0fVxyXG59XHJcblxyXG4vLyBjb21wYXJlcyBhcnJheXMgYW5kIG9iamVjdHMgZm9yIHZhbHVlIGVxdWFsaXR5IChhbGwgZWxlbWVudHMgYW5kIG1lbWJlcnMgbXVzdCBtYXRjaClcclxuZXhwb3J0cy5lcXVhbCA9IGZ1bmN0aW9uKGEsYikge1xyXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgaWYoIShiIGluc3RhbmNlb2YgQXJyYXkpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICBpZihhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yKHZhciBuPTA7IG48YS5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWV4cG9ydHMuZXF1YWwoYVtuXSxiW25dKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYoYSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgIGlmKCEoYiBpbnN0YW5jZW9mIE9iamVjdCkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG5cclxuICAgICAgICB2YXIgYUtleXMgPSBnZXRLZXlzKGEpXHJcbiAgICAgICAgdmFyIGJLZXlzID0gZ2V0S2V5cyhiKVxyXG5cclxuICAgICAgICBpZihhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IodmFyIG49MDsgbjxhS2V5cy5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGFLZXlzW25dXHJcbiAgICAgICAgICAgICAgICB2YXIgYVZhbCA9IGFba2V5XVxyXG4gICAgICAgICAgICAgICAgdmFyIGJWYWwgPSBiW2tleV1cclxuXHJcbiAgICAgICAgICAgICAgICBpZighZXhwb3J0cy5lcXVhbChhVmFsLGJWYWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGE9PT1iIHx8IE51bWJlci5pc05hTihhKSAmJiBOdW1iZXIuaXNOYU4oYilcclxuICAgIH1cclxufVxyXG5cclxuLy8gY291bnRzIG9iamVjdCBvd24ta2V5cyBpZ25vcmluZyBwcm9wZXJ0aWVzIHRoYXQgYXJlIHVuZGVmaW5lZFxyXG5mdW5jdGlvbiBnZXRLZXlzKHgpIHtcclxuICAgIHZhciBrZXlzPVtdXHJcbiAgICBmb3IodmFyIGsgaW4geCkge1xyXG4gICAgICAgIGlmKHhba10gIT09IHVuZGVmaW5lZCAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCxrKSkge1xyXG4gICAgICAgICAgICBrZXlzLnB1c2goaylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGtleXNcclxufSJdfQ==


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


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxiaWxseXNGaWxlXFxjb2RlXFxqYXZhc2NyaXB0XFxtb2R1bGVzXFxycGVwLmpzXFxEdXBsZXhFdmVudEVtaXR0ZXIuanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEdBQUEsQ0FBSSxRQUFRLE9BQUEsQ0FBUTtBQUNwQixHQUFBLENBQUksZUFBZSxPQUFBLENBQVE7QUFHM0IsTUFBQSxDQUFPLE9BQVAsQ0FBQSxDQUFBLENBQWlCLEtBQUEsQ0FBTSxZQUFXO0lBQzlCLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZLFVBQVMsZUFBZTtRQUNoQyxJQUFBLENBQUssU0FBTCxDQUFBLENBQUEsQ0FBaUIsSUFBSSxZQUFKLENBQWlCO1lBQUMsYUFBYTs7UUFDaEQsSUFBQSxDQUFLLGNBQUwsQ0FBQSxDQUFBLENBQXNCO0lBQzlCO0lBRUksSUFBQSxDQUFLLElBQUwsQ0FBQSxDQUFBLENBQVksVUFBUyxPQUF5QjtRQUMxQyxJQUFHLElBQUEsQ0FBSztZQUFPLE1BQU0sSUFBSSxLQUFKLENBQVU7UUFDL0IsSUFBQSxDQUFLLGNBQUwsQ0FBb0IsS0FBcEIsQ0FBMEIsSUFBQSxDQUFLLGdCQUFnQjtJQUN2RDtJQUNJLElBQUEsQ0FBSyxFQUFMLENBQUEsQ0FBQSxDQUFVLFVBQVMsS0FBTSxFQUFBLFNBQVM7UUFDOUIsSUFBQSxDQUFLLFNBQUwsQ0FBZSxFQUFmLENBQWtCLE9BQU07SUFDaEM7SUFDSSxJQUFBLENBQUssR0FBTCxDQUFBLENBQUEsRUFBVyxJQUFBLENBQUssY0FBTCxDQUFBLENBQUEsQ0FBc0IsVUFBUyxLQUFPLEVBQUEsU0FBUztRQUN0RCxJQUFBLENBQUssU0FBTCxDQUFlLGNBQWYsQ0FBOEIsT0FBTTtJQUM1QztJQUNJLElBQUEsQ0FBSyxLQUFMLENBQUEsQ0FBQSxDQUFhLFVBQVMsU0FBUztRQUMzQixJQUFBLENBQUssU0FBTCxDQUFlLEtBQWYsQ0FBcUI7SUFDN0I7SUFDSSxJQUFBLENBQUssTUFBTCxDQUFBLENBQUEsQ0FBYyxVQUFTLFNBQVM7UUFDNUIsSUFBQSxDQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCO0lBQzlCO0FBQ0E7QUExQkEiLCJmaWxlIjoiRDpcXGJpbGx5c0ZpbGVcXGNvZGVcXGphdmFzY3JpcHRcXG1vZHVsZXNcXHJwZXAuanNcXER1cGxleEV2ZW50RW1pdHRlci5qcyhvcmlnaW5hbCkiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcHJvdG8gPSByZXF1aXJlKFwicHJvdG9cIilcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIyJylcblxuLy8gYW4gZXZlbnQgZW1pdHRlciB3aGVyZSBsaXN0ZW5pbmcgdG8gaXQgbGlzdGVucyB0byB0aGUgb3RoZXIgZW5kIGFuZCBlbWl0dGluZyBlbWl0cyB0byB0aGUgb3RoZXIgZW5kXG5tb2R1bGUuZXhwb3J0cyA9IHByb3RvKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKG9uRW1pdEhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fZXh0ZXJuYWwgPSBuZXcgRXZlbnRFbWl0dGVyKHtuZXdMaXN0ZW5lcjogZmFsc2V9KVxuICAgICAgICB0aGlzLl9vbkVtaXRIYW5kbGVyID0gb25FbWl0SGFuZGxlclxuICAgIH1cblxuICAgIHRoaXMuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50LyosIGFyZ3VtZW50cy4uLiovKSB7XG4gICAgICAgIGlmKHRoaXMuZW5kZWQpIHRocm93IG5ldyBFcnJvcihcIkR1cGxleCBTdHJlYW0gaGFzIGFscmVhZHkgYmVlbiBlbmRlZC5cIilcbiAgICAgICAgdGhpcy5fb25FbWl0SGFuZGxlci5hcHBseSh0aGlzLl9vbkVtaXRIYW5kbGVyLCBhcmd1bWVudHMpXG4gICAgfVxuICAgIHRoaXMub24gPSBmdW5jdGlvbihldmVudCxoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2V4dGVybmFsLm9uKGV2ZW50LGhhbmRsZXIpXG4gICAgfVxuICAgIHRoaXMub2ZmID0gdGhpcy5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2V4dGVybmFsLnJlbW92ZUxpc3RlbmVyKGV2ZW50LGhhbmRsZXIpXG4gICAgfVxuICAgIHRoaXMub25BbnkgPSBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2V4dGVybmFsLm9uQW55KGhhbmRsZXIpXG4gICAgfVxuICAgIHRoaXMub2ZmQW55ID0gZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICB0aGlzLl9leHRlcm5hbC5vZmZBbnkoaGFuZGxlcilcbiAgICB9XG59KSJdfQ==


/***/ })
/******/ ]);
});
//# sourceMappingURL=rpep-dev.umd.js.map