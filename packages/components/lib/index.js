import { Fragment, isVNode, Comment, Text, defineComponent, reactive, getCurrentInstance, onMounted, onUpdated, onUnmounted, watch, inject, computed, createVNode, provide, Transition, Teleport, ref, TransitionGroup, render, h as h$1, nextTick, watchEffect, cloneVNode, onBeforeUnmount, withDirectives, openBlock, createElementBlock, withCtx, createTextVNode } from "vue";
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
function _toPrimitive(input, hint) {
  if (_typeof$1(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof$1(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key2 = _toPrimitive(arg, "string");
  return _typeof$1(key2) === "symbol" ? key2 : String(key2);
}
function _defineProperty$g(obj, key2, value) {
  key2 = _toPropertyKey(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = null != arguments[i2] ? arguments[i2] : {};
    i2 % 2 ? ownKeys(Object(source), true).forEach(function(key2) {
      _defineProperty$g(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var isArray = Array.isArray;
var isString = function isString2(val) {
  return typeof val === "string";
};
var isObject = function isObject2(val) {
  return val !== null && _typeof$1(val) === "object";
};
function renderHelper(v2) {
  var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var defaultV = arguments.length > 2 ? arguments[2] : void 0;
  if (typeof v2 === "function") {
    return v2(props);
  }
  return v2 !== null && v2 !== void 0 ? v2 : defaultV;
}
function classNames() {
  var classes = [];
  for (var i2 = 0; i2 < arguments.length; i2++) {
    var value = i2 < 0 || arguments.length <= i2 ? void 0 : arguments[i2];
    if (!value)
      continue;
    if (isString(value)) {
      classes.push(value);
    } else if (isArray(value)) {
      for (var _i = 0; _i < value.length; _i++) {
        var inner = classNames(value[_i]);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (isObject(value)) {
      for (var name in value) {
        if (value[name]) {
          classes.push(name);
        }
      }
    }
  }
  return classes.join(" ");
}
var MapShim = function() {
  if (typeof Map !== "undefined") {
    return Map;
  }
  function getIndex(arr, key2) {
    var result = -1;
    arr.some(function(entry, index2) {
      if (entry[0] === key2) {
        result = index2;
        return true;
      }
      return false;
    });
    return result;
  }
  return (
    /** @class */
    function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key2) {
        var index2 = getIndex(this.__entries__, key2);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key2, value) {
        var index2 = getIndex(this.__entries__, key2);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key2, value]);
        }
      };
      class_1.prototype.delete = function(key2) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key2);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key2) {
        return !!~getIndex(this.__entries__, key2);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    }()
  );
}();
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
var global$1 = function() {
  if (typeof global !== "undefined" && global.Math === Math) {
    return global;
  }
  if (typeof self !== "undefined" && self.Math === Math) {
    return self;
  }
  if (typeof window !== "undefined" && window.Math === Math) {
    return window;
  }
  return Function("return this")();
}();
var requestAnimationFrame$1 = function() {
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame.bind(global$1);
  }
  return function(callback) {
    return setTimeout(function() {
      return callback(Date.now());
    }, 1e3 / 60);
  };
}();
var trailingTimeout = 2;
function throttle(callback, delay) {
  var leadingCall = false, trailingCall = false, lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
var mutationObserverSupported = typeof MutationObserver !== "undefined";
var ResizeObserverController = (
  /** @class */
  function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
      var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key2) {
        return !!~propertyName.indexOf(key2);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }()
);
var defineConfigurable = function(target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key2 = _a[_i];
    Object.defineProperty(target, key2, {
      value: props[key2],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }
  return target;
};
var getWindowOf = function(target) {
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global$1;
};
var emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(value) {
  return parseFloat(value) || 0;
}
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function(size, position) {
    var value = styles["border-" + position + "-width"];
    return size + toFloat(value);
  }, 0);
}
function getPaddings(styles) {
  var positions = ["top", "right", "bottom", "left"];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles["padding-" + position];
    paddings[position] = toFloat(value);
  }
  return paddings;
}
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
function getHTMLElementContentRect(target) {
  var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  var width = toFloat(styles.width), height = toFloat(styles.height);
  if (styles.boxSizing === "border-box") {
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, "left", "right") + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, "top", "bottom") + vertPad;
    }
  }
  if (!isDocumentElement(target)) {
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
var isSVGGraphicsElement = function() {
  if (typeof SVGGraphicsElement !== "undefined") {
    return function(target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  return function(target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
  };
}();
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
function createReadOnlyRect(_a) {
  var x2 = _a.x, y2 = _a.y, width = _a.width, height = _a.height;
  var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  defineConfigurable(rect, {
    x: x2,
    y: y2,
    width,
    height,
    top: y2,
    right: x2 + width,
    bottom: height + y2,
    left: x2
  });
  return rect;
}
function createRectInit(x2, y2, width, height) {
  return { x: x2, y: y2, width, height };
}
var ResizeObservation = (
  /** @class */
  function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }()
);
var ResizeObserverEntry = (
  /** @class */
  function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  }()
);
var ResizeObserverSPI = (
  /** @class */
  function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }()
);
var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
var ResizeObserver$1 = (
  /** @class */
  function() {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(method) {
  ResizeObserver$1.prototype[method] = function() {
    var _a;
    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});
var index$3 = function() {
  if (typeof global$1.ResizeObserver !== "undefined") {
    return global$1.ResizeObserver;
  }
  return ResizeObserver$1;
}();
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit$2(arr, i2) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i2) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i2); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
    arr2[i2] = arr[i2];
  return arr2;
}
function _unsupportedIterableToArray$2(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray$2(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$2(o2, minLen);
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray$2(arr, i2) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i2) || _unsupportedIterableToArray$2(arr, i2) || _nonIterableRest$2();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$2(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
var nativeObjectToString$1 = objectProto$2.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$1 = Object.prototype;
var nativeObjectToString = objectProto$1.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var objectTag = "[object Object]";
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype$1(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isValid$1 = function isValid(value) {
  return value !== void 0 && value !== null && value !== "";
};
const isValid$2 = isValid$1;
var initDefaultProps = function initDefaultProps2(types, defaultProps) {
  var propTypes = _objectSpread2({}, types);
  Object.keys(defaultProps).forEach(function(k2) {
    var prop = propTypes[k2];
    if (prop) {
      if (prop.type || prop.default) {
        prop.default = defaultProps[k2];
      } else if (prop.def) {
        prop.def(defaultProps[k2]);
      } else {
        propTypes[k2] = {
          type: prop,
          default: defaultProps[k2]
        };
      }
    } else {
      throw new Error("not have ".concat(k2, " prop"));
    }
  });
  return propTypes;
};
const initDefaultProps$1 = initDefaultProps;
var flattenChildren = function flattenChildren2() {
  var children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var filterEmpty2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  var temp = Array.isArray(children) ? children : [children];
  var res = [];
  temp.forEach(function(child) {
    if (Array.isArray(child)) {
      res.push.apply(res, _toConsumableArray(flattenChildren2(child, filterEmpty2)));
    } else if (child && child.type === Fragment) {
      res.push.apply(res, _toConsumableArray(flattenChildren2(child.children, filterEmpty2)));
    } else if (child && isVNode(child)) {
      if (filterEmpty2 && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty2) {
        res.push(child);
      }
    } else if (isValid$2(child)) {
      res.push(child);
    }
  });
  return res;
};
var findDOMNode = function findDOMNode2(instance) {
  var _instance$vnode;
  var node = (instance === null || instance === void 0 ? void 0 : (_instance$vnode = instance.vnode) === null || _instance$vnode === void 0 ? void 0 : _instance$vnode.el) || instance && (instance.$el || instance);
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};
function isEmptyElement(c2) {
  return c2 && (c2.type === Comment || c2.type === Fragment && c2.children.length === 0 || c2.type === Text && c2.children.trim() === "");
}
function filterEmpty() {
  var children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var res = [];
  children.forEach(function(child) {
    if (Array.isArray(child)) {
      res.push.apply(res, _toConsumableArray(child));
    } else if ((child === null || child === void 0 ? void 0 : child.type) === Fragment) {
      res.push.apply(res, _toConsumableArray(filterEmpty(child.children)));
    } else {
      res.push(child);
    }
  });
  return res.filter(function(c2) {
    return !isEmptyElement(c2);
  });
}
function isValidElement(element) {
  if (Array.isArray(element) && element.length === 1) {
    element = element[0];
  }
  return element && element.__v_isVNode && _typeof$1(element.type) !== "symbol";
}
const ResizeObserver = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ResizeObserver",
  props: {
    disabled: Boolean,
    onResize: Function
  },
  emits: ["resize"],
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var state = reactive({
      width: 0,
      height: 0,
      offsetHeight: 0,
      offsetWidth: 0
    });
    var currentElement = null;
    var resizeObserver = null;
    var destroyObserver = function destroyObserver2() {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    };
    var onResize = function onResize2(entries) {
      var onResize3 = props.onResize;
      var target = entries[0].target;
      var _target$getBoundingCl = target.getBoundingClientRect(), width = _target$getBoundingCl.width, height = _target$getBoundingCl.height;
      var offsetWidth = target.offsetWidth, offsetHeight = target.offsetHeight;
      var fixedWidth = Math.floor(width);
      var fixedHeight = Math.floor(height);
      if (state.width !== fixedWidth || state.height !== fixedHeight || state.offsetWidth !== offsetWidth || state.offsetHeight !== offsetHeight) {
        var size = {
          width: fixedWidth,
          height: fixedHeight,
          offsetWidth,
          offsetHeight
        };
        _extends(state, size);
        if (onResize3) {
          Promise.resolve().then(function() {
            onResize3(_objectSpread2(_objectSpread2({}, size), {}, {
              offsetWidth,
              offsetHeight
            }), target);
          });
        }
      }
    };
    var instance = getCurrentInstance();
    var registerObserver = function registerObserver2() {
      var disabled = props.disabled;
      if (disabled) {
        destroyObserver();
        return;
      }
      var element = findDOMNode(instance);
      var elementChanged = element !== currentElement;
      if (elementChanged) {
        destroyObserver();
        currentElement = element;
      }
      if (!resizeObserver && element) {
        resizeObserver = new index$3(onResize);
        resizeObserver.observe(element);
      }
    };
    onMounted(function() {
      registerObserver();
    });
    onUpdated(function() {
      registerObserver();
    });
    onUnmounted(function() {
      destroyObserver();
    });
    watch(function() {
      return props.disabled;
    }, function() {
      registerObserver();
    }, {
      flush: "post"
    });
    return function() {
      var _slots$default;
      return (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)[0];
    };
  }
});
var raf = function raf2(callback) {
  return setTimeout(callback, 16);
};
var caf = function caf2(num) {
  return clearTimeout(num);
};
if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
  raf = function raf3(callback) {
    return window.requestAnimationFrame(callback);
  };
  caf = function caf3(handle) {
    return window.cancelAnimationFrame(handle);
  };
}
var rafUUID = 0;
var rafIds = /* @__PURE__ */ new Map();
function cleanup(id) {
  rafIds.delete(id);
}
function wrapperRaf(callback) {
  var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  rafUUID += 1;
  var id = rafUUID;
  function callRef(leftTimes) {
    if (leftTimes === 0) {
      cleanup(id);
      callback();
    } else {
      var realId = raf(function() {
        callRef(leftTimes - 1);
      });
      rafIds.set(id, realId);
    }
  }
  callRef(times);
  return id;
}
wrapperRaf.cancel = function(id) {
  var realId = rafIds.get(id);
  cleanup(realId);
  return caf(realId);
};
var tuple = function tuple2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args;
};
var withInstall = function withInstall2(comp) {
  var c2 = comp;
  c2.install = function(app) {
    app.component(c2.displayName || c2.name, comp);
  };
  return comp;
};
function _objectWithoutPropertiesLoose$2(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key2 = sourceKeys[i2];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function _objectWithoutProperties$2(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose$2(source, excluded);
  var key2, i2;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
      key2 = sourceSymbolKeys[i2];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
const enUS$1 = {
  // Options.jsx
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "",
  // Pagination.jsx
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages"
};
var locale$2 = {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "Ok",
  clear: "Clear",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  yearFormat: "YYYY",
  dateFormat: "M/D/YYYY",
  dayFormat: "D",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  monthBeforeYear: true,
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
};
const CalendarLocale = locale$2;
var locale$1 = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
const TimePicker = locale$1;
var locale = {
  lang: _objectSpread2({
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"]
  }, CalendarLocale),
  timePickerLocale: _objectSpread2({}, TimePicker)
};
const enUS = locale;
var typeTemplate = "${label} is not a valid ${type}";
var localeValues = {
  locale: "en",
  Pagination: enUS$1,
  DatePicker: enUS,
  TimePicker,
  Calendar: enUS,
  global: {
    placeholder: "Please select"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    filterCheckall: "Select all items",
    filterSearchPlaceholder: "Search in filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No Data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand"
  },
  PageHeader: {
    back: "Back"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  Image: {
    preview: "Preview"
  }
};
const defaultLocale = localeValues;
const LocaleReceiver = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "LocaleReceiver",
  props: {
    componentName: String,
    defaultLocale: {
      type: [Object, Function]
    },
    children: {
      type: Function
    }
  },
  setup: function setup2(props, _ref) {
    var slots = _ref.slots;
    var localeData = inject("localeData", {});
    var locale2 = computed(function() {
      var _props$componentName = props.componentName, componentName = _props$componentName === void 0 ? "global" : _props$componentName, defaultLocale$1 = props.defaultLocale;
      var locale3 = defaultLocale$1 || defaultLocale[componentName || "global"];
      var antLocale = localeData.antLocale;
      var localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
      return _objectSpread2(_objectSpread2({}, typeof locale3 === "function" ? locale3() : locale3), localeFromContext || {});
    });
    var localeCode = computed(function() {
      var antLocale = localeData.antLocale;
      var localeCode2 = antLocale && antLocale.locale;
      if (antLocale && antLocale.exist && !localeCode2) {
        return defaultLocale.locale;
      }
      return localeCode2;
    });
    return function() {
      var children = props.children || slots.default;
      var antLocale = localeData.antLocale;
      return children === null || children === void 0 ? void 0 : children(locale2.value, localeCode.value, antLocale);
    };
  }
});
var Empty$2 = function Empty() {
  var _useConfigInject = useConfigInject("empty", {}), getPrefixCls2 = _useConfigInject.getPrefixCls;
  var prefixCls = getPrefixCls2("empty-img-default");
  return createVNode("svg", {
    "class": prefixCls,
    "width": "184",
    "height": "152",
    "viewBox": "0 0 184 152"
  }, [createVNode("g", {
    "fill": "none",
    "fill-rule": "evenodd"
  }, [createVNode("g", {
    "transform": "translate(24 31.67)"
  }, [createVNode("ellipse", {
    "class": "".concat(prefixCls, "-ellipse"),
    "cx": "67.797",
    "cy": "106.89",
    "rx": "67.797",
    "ry": "12.668"
  }, null), createVNode("path", {
    "class": "".concat(prefixCls, "-path-1"),
    "d": "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
  }, null), createVNode("path", {
    "class": "".concat(prefixCls, "-path-2"),
    "d": "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
    "transform": "translate(13.56)"
  }, null), createVNode("path", {
    "class": "".concat(prefixCls, "-path-3"),
    "d": "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
  }, null), createVNode("path", {
    "class": "".concat(prefixCls, "-path-4"),
    "d": "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
  }, null)]), createVNode("path", {
    "class": "".concat(prefixCls, "-path-5"),
    "d": "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
  }, null), createVNode("g", {
    "class": "".concat(prefixCls, "-g"),
    "transform": "translate(149.65 15.383)"
  }, [createVNode("ellipse", {
    "cx": "20.654",
    "cy": "3.167",
    "rx": "2.849",
    "ry": "2.815"
  }, null), createVNode("path", {
    "d": "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
  }, null)])])]);
};
Empty$2.PRESENTED_IMAGE_DEFAULT = true;
const DefaultEmptyImg = Empty$2;
var Simple = function Simple2() {
  var _useConfigInject = useConfigInject("empty", {}), getPrefixCls2 = _useConfigInject.getPrefixCls;
  var prefixCls = getPrefixCls2("empty-img-simple");
  return createVNode("svg", {
    "class": prefixCls,
    "width": "64",
    "height": "41",
    "viewBox": "0 0 64 41"
  }, [createVNode("g", {
    "transform": "translate(0 1)",
    "fill": "none",
    "fill-rule": "evenodd"
  }, [createVNode("ellipse", {
    "class": "".concat(prefixCls, "-ellipse"),
    "fill": "#F5F5F5",
    "cx": "32",
    "cy": "33",
    "rx": "32",
    "ry": "7"
  }, null), createVNode("g", {
    "class": "".concat(prefixCls, "-g"),
    "fill-rule": "nonzero",
    "stroke": "#D9D9D9"
  }, [createVNode("path", {
    "d": "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
  }, null), createVNode("path", {
    "d": "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
    "fill": "#FAFAFA",
    "class": "".concat(prefixCls, "-path")
  }, null)])])]);
};
Simple.PRESENTED_IMAGE_SIMPLE = true;
const SimpleEmptyImg = Simple;
function e(e2, t2) {
  for (var n2 = 0; n2 < t2.length; n2++) {
    var r2 = t2[n2];
    r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e2, r2.key, r2);
  }
}
function t(t2, n2, r2) {
  return n2 && e(t2.prototype, n2), r2 && e(t2, r2), t2;
}
function n() {
  return (n = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }).apply(this, arguments);
}
function r(e2, t2) {
  e2.prototype = Object.create(t2.prototype), e2.prototype.constructor = e2, e2.__proto__ = t2;
}
function i(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, i2 = {}, o2 = Object.keys(e2);
  for (r2 = 0; r2 < o2.length; r2++)
    t2.indexOf(n2 = o2[r2]) >= 0 || (i2[n2] = e2[n2]);
  return i2;
}
function o(e2) {
  return 1 == (null != (t2 = e2) && "object" == typeof t2 && false === Array.isArray(t2)) && "[object Object]" === Object.prototype.toString.call(e2);
  var t2;
}
var u = Object.prototype, a = u.toString, f = u.hasOwnProperty, c = /^\s*function (\w+)/;
function l(e2) {
  var t2, n2 = null !== (t2 = null == e2 ? void 0 : e2.type) && void 0 !== t2 ? t2 : e2;
  if (n2) {
    var r2 = n2.toString().match(c);
    return r2 ? r2[1] : "";
  }
  return "";
}
var s = function(e2) {
  var t2, n2;
  return false !== o(e2) && "function" == typeof (t2 = e2.constructor) && false !== o(n2 = t2.prototype) && false !== n2.hasOwnProperty("isPrototypeOf");
}, v = function(e2) {
  return e2;
}, y = v;
if ("production" !== process.env.NODE_ENV) {
  var p = "undefined" != typeof console;
  y = p ? function(e2) {
    console.warn("[VueTypes warn]: " + e2);
  } : v;
}
var d = function(e2, t2) {
  return f.call(e2, t2);
}, h = Number.isInteger || function(e2) {
  return "number" == typeof e2 && isFinite(e2) && Math.floor(e2) === e2;
}, b = Array.isArray || function(e2) {
  return "[object Array]" === a.call(e2);
}, O = function(e2) {
  return "[object Function]" === a.call(e2);
}, g = function(e2) {
  return s(e2) && d(e2, "_vueTypes_name");
}, m = function(e2) {
  return s(e2) && (d(e2, "type") || ["_vueTypes_name", "validator", "default", "required"].some(function(t2) {
    return d(e2, t2);
  }));
};
function j(e2, t2) {
  return Object.defineProperty(e2.bind(t2), "__original", { value: e2 });
}
function _(e2, t2, n2) {
  var r2;
  void 0 === n2 && (n2 = false);
  var i2 = true, o2 = "";
  r2 = s(e2) ? e2 : { type: e2 };
  var u2 = g(r2) ? r2._vueTypes_name + " - " : "";
  if (m(r2) && null !== r2.type) {
    if (void 0 === r2.type || true === r2.type)
      return i2;
    if (!r2.required && void 0 === t2)
      return i2;
    b(r2.type) ? (i2 = r2.type.some(function(e3) {
      return true === _(e3, t2, true);
    }), o2 = r2.type.map(function(e3) {
      return l(e3);
    }).join(" or ")) : i2 = "Array" === (o2 = l(r2)) ? b(t2) : "Object" === o2 ? s(t2) : "String" === o2 || "Number" === o2 || "Boolean" === o2 || "Function" === o2 ? function(e3) {
      if (null == e3)
        return "";
      var t3 = e3.constructor.toString().match(c);
      return t3 ? t3[1] : "";
    }(t2) === o2 : t2 instanceof r2.type;
  }
  if (!i2) {
    var a2 = u2 + 'value "' + t2 + '" should be of type "' + o2 + '"';
    return false === n2 ? (y(a2), false) : a2;
  }
  if (d(r2, "validator") && O(r2.validator)) {
    var f2 = y, v2 = [];
    if (y = function(e3) {
      v2.push(e3);
    }, i2 = r2.validator(t2), y = f2, !i2) {
      var p = (v2.length > 1 ? "* " : "") + v2.join("\n* ");
      return v2.length = 0, false === n2 ? (y(p), i2) : p;
    }
  }
  return i2;
}
function T(e2, t2) {
  var n2 = Object.defineProperties(t2, { _vueTypes_name: { value: e2, writable: true }, isRequired: { get: function() {
    return this.required = true, this;
  } }, def: { value: function(e3) {
    return void 0 !== e3 || this.default ? O(e3) || true === _(this, e3, true) ? (this.default = b(e3) ? function() {
      return [].concat(e3);
    } : s(e3) ? function() {
      return Object.assign({}, e3);
    } : e3, this) : (y(this._vueTypes_name + ' - invalid default value: "' + e3 + '"'), this) : this;
  } } }), r2 = n2.validator;
  return O(r2) && (n2.validator = j(r2, n2)), n2;
}
function w(e2, t2) {
  var n2 = T(e2, t2);
  return Object.defineProperty(n2, "validate", { value: function(e3) {
    return O(this.validator) && y(this._vueTypes_name + " - calling .validate() will overwrite the current custom validator function. Validator info:\n" + JSON.stringify(this)), this.validator = j(e3, this), this;
  } });
}
function k(e2, t2, n2) {
  var r2, o2, u2 = (r2 = t2, o2 = {}, Object.getOwnPropertyNames(r2).forEach(function(e3) {
    o2[e3] = Object.getOwnPropertyDescriptor(r2, e3);
  }), Object.defineProperties({}, o2));
  if (u2._vueTypes_name = e2, !s(n2))
    return u2;
  var a2, f2, c2 = n2.validator, l2 = i(n2, ["validator"]);
  if (O(c2)) {
    var v2 = u2.validator;
    v2 && (v2 = null !== (f2 = (a2 = v2).__original) && void 0 !== f2 ? f2 : a2), u2.validator = j(v2 ? function(e3) {
      return v2.call(this, e3) && c2.call(this, e3);
    } : c2, u2);
  }
  return Object.assign(u2, l2);
}
function P(e2) {
  return e2.replace(/^(?!\s*$)/gm, "  ");
}
var x = function() {
  return w("any", {});
}, A = function() {
  return w("function", { type: Function });
}, E = function() {
  return w("boolean", { type: Boolean });
}, N = function() {
  return w("string", { type: String });
}, q = function() {
  return w("number", { type: Number });
}, S = function() {
  return w("array", { type: Array });
}, V = function() {
  return w("object", { type: Object });
}, F = function() {
  return T("integer", { type: Number, validator: function(e2) {
    return h(e2);
  } });
}, D = function() {
  return T("symbol", { validator: function(e2) {
    return "symbol" == typeof e2;
  } });
};
function L(e2, t2) {
  if (void 0 === t2 && (t2 = "custom validation failed"), "function" != typeof e2)
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return T(e2.name || "<<anonymous function>>", { validator: function(n2) {
    var r2 = e2(n2);
    return r2 || y(this._vueTypes_name + " - " + t2), r2;
  } });
}
function Y(e2) {
  if (!b(e2))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  var t2 = 'oneOf - value should be one of "' + e2.join('", "') + '".', n2 = e2.reduce(function(e3, t3) {
    if (null != t3) {
      var n3 = t3.constructor;
      -1 === e3.indexOf(n3) && e3.push(n3);
    }
    return e3;
  }, []);
  return T("oneOf", { type: n2.length > 0 ? n2 : void 0, validator: function(n3) {
    var r2 = -1 !== e2.indexOf(n3);
    return r2 || y(t2), r2;
  } });
}
function B(e2) {
  if (!b(e2))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  for (var t2 = false, n2 = [], r2 = 0; r2 < e2.length; r2 += 1) {
    var i2 = e2[r2];
    if (m(i2)) {
      if (g(i2) && "oneOf" === i2._vueTypes_name) {
        n2 = n2.concat(i2.type);
        continue;
      }
      if (O(i2.validator) && (t2 = true), true !== i2.type && i2.type) {
        n2 = n2.concat(i2.type);
        continue;
      }
    }
    n2.push(i2);
  }
  return n2 = n2.filter(function(e3, t3) {
    return n2.indexOf(e3) === t3;
  }), T("oneOfType", t2 ? { type: n2, validator: function(t3) {
    var n3 = [], r3 = e2.some(function(e3) {
      var r4 = _(g(e3) && "oneOf" === e3._vueTypes_name ? e3.type || null : e3, t3, true);
      return "string" == typeof r4 && n3.push(r4), true === r4;
    });
    return r3 || y("oneOfType - provided value does not match any of the " + n3.length + " passed-in validators:\n" + P(n3.join("\n"))), r3;
  } } : { type: n2 });
}
function I(e2) {
  return T("arrayOf", { type: Array, validator: function(t2) {
    var n2, r2 = t2.every(function(t3) {
      return true === (n2 = _(e2, t3, true));
    });
    return r2 || y("arrayOf - value validation error:\n" + P(n2)), r2;
  } });
}
function J(e2) {
  return T("instanceOf", { type: e2 });
}
function M(e2) {
  return T("objectOf", { type: Object, validator: function(t2) {
    var n2, r2 = Object.keys(t2).every(function(r3) {
      return true === (n2 = _(e2, t2[r3], true));
    });
    return r2 || y("objectOf - value validation error:\n" + P(n2)), r2;
  } });
}
function R(e2) {
  var t2 = Object.keys(e2), n2 = t2.filter(function(t3) {
    var n3;
    return !!(null === (n3 = e2[t3]) || void 0 === n3 ? void 0 : n3.required);
  }), r2 = T("shape", { type: Object, validator: function(r3) {
    var i2 = this;
    if (!s(r3))
      return false;
    var o2 = Object.keys(r3);
    if (n2.length > 0 && n2.some(function(e3) {
      return -1 === o2.indexOf(e3);
    })) {
      var u2 = n2.filter(function(e3) {
        return -1 === o2.indexOf(e3);
      });
      return y(1 === u2.length ? 'shape - required property "' + u2[0] + '" is not defined.' : 'shape - required properties "' + u2.join('", "') + '" are not defined.'), false;
    }
    return o2.every(function(n3) {
      if (-1 === t2.indexOf(n3))
        return true === i2._vueTypes_isLoose || (y('shape - shape definition does not include a "' + n3 + '" property. Allowed keys: "' + t2.join('", "') + '".'), false);
      var o3 = _(e2[n3], r3[n3], true);
      return "string" == typeof o3 && y('shape - "' + n3 + '" property validation error:\n ' + P(o3)), true === o3;
    });
  } });
  return Object.defineProperty(r2, "_vueTypes_isLoose", { writable: true, value: false }), Object.defineProperty(r2, "loose", { get: function() {
    return this._vueTypes_isLoose = true, this;
  } }), r2;
}
var $ = function() {
  function e2() {
  }
  return e2.extend = function(e3) {
    var t2 = this;
    if (b(e3))
      return e3.forEach(function(e4) {
        return t2.extend(e4);
      }), this;
    var n2 = e3.name, r2 = e3.validate, o2 = void 0 !== r2 && r2, u2 = e3.getter, a2 = void 0 !== u2 && u2, f2 = i(e3, ["name", "validate", "getter"]);
    if (d(this, n2))
      throw new TypeError('[VueTypes error]: Type "' + n2 + '" already defined');
    var c2, l2 = f2.type;
    return g(l2) ? (delete f2.type, Object.defineProperty(this, n2, a2 ? { get: function() {
      return k(n2, l2, f2);
    } } : { value: function() {
      var e4, t3 = k(n2, l2, f2);
      return t3.validator && (t3.validator = (e4 = t3.validator).bind.apply(e4, [t3].concat([].slice.call(arguments)))), t3;
    } })) : (c2 = a2 ? { get: function() {
      var e4 = Object.assign({}, f2);
      return o2 ? w(n2, e4) : T(n2, e4);
    }, enumerable: true } : { value: function() {
      var e4, t3, r3 = Object.assign({}, f2);
      return e4 = o2 ? w(n2, r3) : T(n2, r3), r3.validator && (e4.validator = (t3 = r3.validator).bind.apply(t3, [e4].concat([].slice.call(arguments)))), e4;
    }, enumerable: true }, Object.defineProperty(this, n2, c2));
  }, t(e2, null, [{ key: "any", get: function() {
    return x();
  } }, { key: "func", get: function() {
    return A().def(this.defaults.func);
  } }, { key: "bool", get: function() {
    return E().def(this.defaults.bool);
  } }, { key: "string", get: function() {
    return N().def(this.defaults.string);
  } }, { key: "number", get: function() {
    return q().def(this.defaults.number);
  } }, { key: "array", get: function() {
    return S().def(this.defaults.array);
  } }, { key: "object", get: function() {
    return V().def(this.defaults.object);
  } }, { key: "integer", get: function() {
    return F().def(this.defaults.integer);
  } }, { key: "symbol", get: function() {
    return D();
  } }]), e2;
}();
function z(e2) {
  var i2;
  return void 0 === e2 && (e2 = { func: function() {
  }, bool: true, string: "", number: 0, array: function() {
    return [];
  }, object: function() {
    return {};
  }, integer: 0 }), (i2 = function(i3) {
    function o2() {
      return i3.apply(this, arguments) || this;
    }
    return r(o2, i3), t(o2, null, [{ key: "sensibleDefaults", get: function() {
      return n({}, this.defaults);
    }, set: function(t2) {
      this.defaults = false !== t2 ? n({}, true !== t2 ? t2 : e2) : {};
    } }]), o2;
  }($)).defaults = n({}, e2), i2;
}
$.defaults = {}, $.custom = L, $.oneOf = Y, $.instanceOf = J, $.oneOfType = B, $.arrayOf = I, $.objectOf = M, $.shape = R, $.utils = { validate: function(e2, t2) {
  return true === _(t2, e2, true);
}, toType: function(e2, t2, n2) {
  return void 0 === n2 && (n2 = false), n2 ? w(e2, t2) : T(e2, t2);
} };
(function(e2) {
  function t2() {
    return e2.apply(this, arguments) || this;
  }
  return r(t2, e2), t2;
})(z());
var PropTypes = z({
  func: void 0,
  bool: void 0,
  string: void 0,
  number: void 0,
  array: void 0,
  object: void 0,
  integer: void 0
});
PropTypes.extend([{
  name: "looseBool",
  getter: true,
  type: Boolean,
  default: void 0
}, {
  name: "style",
  getter: true,
  type: [String, Object],
  default: void 0
}, {
  name: "VueNode",
  getter: true,
  type: null
}]);
const PropTypes$1 = PropTypes;
var _excluded$5 = ["image", "description", "imageStyle", "class"];
var defaultEmptyImg = createVNode(DefaultEmptyImg, null, null);
var simpleEmptyImg = createVNode(SimpleEmptyImg, null, null);
var Empty2 = function Empty3(props, _ref) {
  var _slots$description;
  var _ref$slots = _ref.slots, slots = _ref$slots === void 0 ? {} : _ref$slots, attrs = _ref.attrs;
  var _useConfigInject = useConfigInject("empty", props), direction = _useConfigInject.direction, prefixClsRef = _useConfigInject.prefixCls;
  var prefixCls = prefixClsRef.value;
  var _props$attrs = _objectSpread2(_objectSpread2({}, props), attrs), _props$attrs$image = _props$attrs.image, image = _props$attrs$image === void 0 ? defaultEmptyImg : _props$attrs$image, _props$attrs$descript = _props$attrs.description, description = _props$attrs$descript === void 0 ? ((_slots$description = slots.description) === null || _slots$description === void 0 ? void 0 : _slots$description.call(slots)) || void 0 : _props$attrs$descript, imageStyle = _props$attrs.imageStyle, _props$attrs$class = _props$attrs.class, className = _props$attrs$class === void 0 ? "" : _props$attrs$class, restProps = _objectWithoutProperties$2(_props$attrs, _excluded$5);
  return createVNode(LocaleReceiver, {
    "componentName": "Empty",
    "children": function children(locale2) {
      var _classNames;
      var des = typeof description !== "undefined" ? description : locale2.description;
      var alt = typeof des === "string" ? des : "empty";
      var imageNode = null;
      if (typeof image === "string") {
        imageNode = createVNode("img", {
          "alt": alt,
          "src": image
        }, null);
      } else {
        imageNode = image;
      }
      return createVNode("div", _objectSpread2({
        "class": classNames(prefixCls, className, (_classNames = {}, _defineProperty$g(_classNames, "".concat(prefixCls, "-normal"), image === simpleEmptyImg), _defineProperty$g(_classNames, "".concat(prefixCls, "-rtl"), direction.value === "rtl"), _classNames))
      }, restProps), [createVNode("div", {
        "class": "".concat(prefixCls, "-image"),
        "style": imageStyle
      }, [imageNode]), des && createVNode("p", {
        "class": "".concat(prefixCls, "-description")
      }, [des]), slots.default && createVNode("div", {
        "class": "".concat(prefixCls, "-footer")
      }, [filterEmpty(slots.default())])]);
    }
  }, null);
};
Empty2.displayName = "AEmpty";
Empty2.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty2.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
Empty2.inheritAttrs = false;
Empty2.props = {
  prefixCls: String,
  image: PropTypes$1.any,
  description: PropTypes$1.any,
  imageStyle: {
    type: Object,
    default: void 0
  }
};
const Empty$1 = withInstall(Empty2);
var RenderEmpty = function RenderEmpty2(props) {
  var _useConfigInject = useConfigInject("empty", props), prefixCls = _useConfigInject.prefixCls;
  var renderHtml = function renderHtml2(componentName) {
    switch (componentName) {
      case "Table":
      case "List":
        return createVNode(Empty$1, {
          "image": Empty$1.PRESENTED_IMAGE_SIMPLE
        }, null);
      case "Select":
      case "TreeSelect":
      case "Cascader":
      case "Transfer":
      case "Mentions":
        return createVNode(Empty$1, {
          "image": Empty$1.PRESENTED_IMAGE_SIMPLE,
          "class": "".concat(prefixCls.value, "-small")
        }, null);
      default:
        return createVNode(Empty$1, null, null);
    }
  };
  return renderHtml(props.componentName);
};
function renderEmpty(componentName) {
  return createVNode(RenderEmpty, {
    "componentName": componentName
  }, null);
}
var warned = {};
function warning$2(valid, message2) {
  if (process.env.NODE_ENV !== "production" && !valid && console !== void 0) {
    console.error("Warning: ".concat(message2));
  }
}
function call(method, valid, message2) {
  if (!valid && !warned[message2]) {
    method(false, message2);
    warned[message2] = true;
  }
}
function warningOnce(valid, message2) {
  call(warning$2, valid, message2);
}
const warning$1 = function(valid, component) {
  var message2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  warningOnce(valid, "[antdv: ".concat(component, "] ").concat(message2));
};
var ANT_MARK = "internalMark";
var LocaleProvider = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ALocaleProvider",
  props: {
    locale: {
      type: Object
    },
    ANT_MARK__: String
  },
  setup: function setup3(props, _ref) {
    var slots = _ref.slots;
    warning$1(props.ANT_MARK__ === ANT_MARK, "LocaleProvider", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead");
    var state = reactive({
      antLocale: _objectSpread2(_objectSpread2({}, props.locale), {}, {
        exist: true
      }),
      ANT_MARK__: ANT_MARK
    });
    provide("localeData", state);
    watch(function() {
      return props.locale;
    }, function() {
      state.antLocale = _objectSpread2(_objectSpread2({}, props.locale), {}, {
        exist: true
      });
    }, {
      immediate: true
    });
    return function() {
      var _slots$default;
      return (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots);
    };
  }
});
LocaleProvider.install = function(app) {
  app.component(LocaleProvider.name, LocaleProvider);
  return app;
};
const LocaleProvider$1 = withInstall(LocaleProvider);
tuple("bottomLeft", "bottomRight", "topLeft", "topRight");
var getTransitionGroupProps = function getTransitionGroupProps2(transitionName2) {
  var opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var transitionProps = transitionName2 ? _objectSpread2({
    name: transitionName2,
    appear: true,
    // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
    appearActiveClass: "".concat(transitionName2),
    appearToClass: "".concat(transitionName2, "-appear ").concat(transitionName2, "-appear-active"),
    enterFromClass: "".concat(transitionName2, "-appear ").concat(transitionName2, "-enter ").concat(transitionName2, "-appear-prepare ").concat(transitionName2, "-enter-prepare"),
    enterActiveClass: "".concat(transitionName2),
    enterToClass: "".concat(transitionName2, "-enter ").concat(transitionName2, "-appear ").concat(transitionName2, "-appear-active ").concat(transitionName2, "-enter-active"),
    leaveActiveClass: "".concat(transitionName2, " ").concat(transitionName2, "-leave"),
    leaveToClass: "".concat(transitionName2, "-leave-active")
  }, opt) : _objectSpread2({
    css: false
  }, opt);
  return transitionProps;
};
const Notice = defineComponent({
  name: "Notice",
  inheritAttrs: false,
  props: ["prefixCls", "duration", "updateMark", "noticeKey", "closeIcon", "closable", "props", "onClick", "onClose", "holder", "visible"],
  setup: function setup4(props, _ref) {
    var attrs = _ref.attrs, slots = _ref.slots;
    var closeTimer;
    var isUnMounted = false;
    var duration = computed(function() {
      return props.duration === void 0 ? 4.5 : props.duration;
    });
    var startCloseTimer = function startCloseTimer2() {
      if (duration.value && !isUnMounted) {
        closeTimer = setTimeout(function() {
          close2();
        }, duration.value * 1e3);
      }
    };
    var clearCloseTimer = function clearCloseTimer2() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    };
    var close2 = function close3(e2) {
      if (e2) {
        e2.stopPropagation();
      }
      clearCloseTimer();
      var onClose = props.onClose, noticeKey = props.noticeKey;
      if (onClose) {
        onClose(noticeKey);
      }
    };
    var restartCloseTimer = function restartCloseTimer2() {
      clearCloseTimer();
      startCloseTimer();
    };
    onMounted(function() {
      startCloseTimer();
    });
    onUnmounted(function() {
      isUnMounted = true;
      clearCloseTimer();
    });
    watch([duration, function() {
      return props.updateMark;
    }, function() {
      return props.visible;
    }], function(_ref2, _ref3) {
      var _ref4 = _slicedToArray$2(_ref2, 3), preDuration = _ref4[0], preUpdateMark = _ref4[1], preVisible = _ref4[2];
      var _ref5 = _slicedToArray$2(_ref3, 3), newDuration = _ref5[0], newUpdateMark = _ref5[1], newVisible = _ref5[2];
      if (preDuration !== newDuration || preUpdateMark !== newUpdateMark || preVisible !== newVisible && newVisible) {
        restartCloseTimer();
      }
    }, {
      flush: "post"
    });
    return function() {
      var _slots$closeIcon, _slots$default;
      var prefixCls = props.prefixCls, closable = props.closable, _props$closeIcon = props.closeIcon, closeIcon = _props$closeIcon === void 0 ? (_slots$closeIcon = slots.closeIcon) === null || _slots$closeIcon === void 0 ? void 0 : _slots$closeIcon.call(slots) : _props$closeIcon, onClick = props.onClick, holder = props.holder;
      var className = attrs.class, style = attrs.style;
      var componentClass = "".concat(prefixCls, "-notice");
      var dataOrAriaAttributeProps = Object.keys(attrs).reduce(function(acc, key2) {
        if (key2.substr(0, 5) === "data-" || key2.substr(0, 5) === "aria-" || key2 === "role") {
          acc[key2] = attrs[key2];
        }
        return acc;
      }, {});
      var node = createVNode("div", _objectSpread2({
        "class": classNames(componentClass, className, _defineProperty$g({}, "".concat(componentClass, "-closable"), closable)),
        "style": style,
        "onMouseenter": clearCloseTimer,
        "onMouseleave": startCloseTimer,
        "onClick": onClick
      }, dataOrAriaAttributeProps), [createVNode("div", {
        "class": "".concat(componentClass, "-content")
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]), closable ? createVNode("a", {
        "tabindex": 0,
        "onClick": close2,
        "class": "".concat(componentClass, "-close")
      }, [closeIcon || createVNode("span", {
        "class": "".concat(componentClass, "-close-x")
      }, null)]) : null]);
      if (holder) {
        return createVNode(Teleport, {
          "to": holder
        }, {
          default: function _default2() {
            return node;
          }
        });
      }
      return node;
    };
  }
});
var _excluded$4 = ["name", "getContainer", "appContext", "prefixCls", "rootPrefixCls", "transitionName", "hasTransitionName"];
var seed = 0;
var now = Date.now();
function getUuid() {
  var id = seed;
  seed += 1;
  return "rcNotification_".concat(now, "_").concat(id);
}
var Notification = defineComponent({
  name: "Notification",
  inheritAttrs: false,
  props: ["prefixCls", "transitionName", "animation", "maxCount", "closeIcon"],
  setup: function setup5(props, _ref) {
    var attrs = _ref.attrs, expose = _ref.expose, slots = _ref.slots;
    var hookRefs = /* @__PURE__ */ new Map();
    var notices = ref([]);
    var transitionProps = computed(function() {
      var prefixCls = props.prefixCls, _props$animation = props.animation, animation = _props$animation === void 0 ? "fade" : _props$animation;
      var name = props.transitionName;
      if (!name && animation) {
        name = "".concat(prefixCls, "-").concat(animation);
      }
      return getTransitionGroupProps(name);
    });
    var add = function add2(originNotice, holderCallback) {
      var key2 = originNotice.key || getUuid();
      var notice2 = _objectSpread2(_objectSpread2({}, originNotice), {}, {
        key: key2
      });
      var maxCount2 = props.maxCount;
      var noticeIndex = notices.value.map(function(v2) {
        return v2.notice.key;
      }).indexOf(key2);
      var updatedNotices = notices.value.concat();
      if (noticeIndex !== -1) {
        updatedNotices.splice(noticeIndex, 1, {
          notice: notice2,
          holderCallback
        });
      } else {
        if (maxCount2 && notices.value.length >= maxCount2) {
          notice2.key = updatedNotices[0].notice.key;
          notice2.updateMark = getUuid();
          notice2.userPassKey = key2;
          updatedNotices.shift();
        }
        updatedNotices.push({
          notice: notice2,
          holderCallback
        });
      }
      notices.value = updatedNotices;
    };
    var remove = function remove2(removeKey) {
      notices.value = notices.value.filter(function(_ref2) {
        var _ref2$notice = _ref2.notice, key2 = _ref2$notice.key, userPassKey = _ref2$notice.userPassKey;
        var mergedKey = userPassKey || key2;
        return mergedKey !== removeKey;
      });
    };
    expose({
      add,
      remove,
      notices
    });
    return function() {
      var _slots$closeIcon, _className;
      var prefixCls = props.prefixCls, _props$closeIcon = props.closeIcon, closeIcon = _props$closeIcon === void 0 ? (_slots$closeIcon = slots.closeIcon) === null || _slots$closeIcon === void 0 ? void 0 : _slots$closeIcon.call(slots, {
        prefixCls
      }) : _props$closeIcon;
      var noticeNodes = notices.value.map(function(_ref3, index2) {
        var notice2 = _ref3.notice, holderCallback = _ref3.holderCallback;
        var updateMark = index2 === notices.value.length - 1 ? notice2.updateMark : void 0;
        var key2 = notice2.key, userPassKey = notice2.userPassKey;
        var content = notice2.content;
        var noticeProps = _objectSpread2(_objectSpread2(_objectSpread2({
          prefixCls,
          closeIcon: typeof closeIcon === "function" ? closeIcon({
            prefixCls
          }) : closeIcon
        }, notice2), notice2.props), {}, {
          key: key2,
          noticeKey: userPassKey || key2,
          updateMark,
          onClose: function onClose(noticeKey) {
            var _notice$onClose;
            remove(noticeKey);
            (_notice$onClose = notice2.onClose) === null || _notice$onClose === void 0 ? void 0 : _notice$onClose.call(notice2);
          },
          onClick: notice2.onClick
        });
        if (holderCallback) {
          return createVNode("div", {
            "key": key2,
            "class": "".concat(prefixCls, "-hook-holder"),
            "ref": function ref2(div) {
              if (typeof key2 === "undefined") {
                return;
              }
              if (div) {
                hookRefs.set(key2, div);
                holderCallback(div, noticeProps);
              } else {
                hookRefs.delete(key2);
              }
            }
          }, null);
        }
        return createVNode(Notice, noticeProps, {
          default: function _default2() {
            return [typeof content === "function" ? content({
              prefixCls
            }) : content];
          }
        });
      });
      var className = (_className = {}, _defineProperty$g(_className, prefixCls, 1), _defineProperty$g(_className, attrs.class, !!attrs.class), _className);
      return createVNode("div", {
        "class": className,
        "style": attrs.style || {
          top: "65px",
          left: "50%"
        }
      }, [createVNode(TransitionGroup, _objectSpread2({
        "tag": "div"
      }, transitionProps.value), {
        default: function _default2() {
          return [noticeNodes];
        }
      })]);
    };
  }
});
Notification.newInstance = function newNotificationInstance(properties, callback) {
  var _ref4 = properties || {}, _ref4$name = _ref4.name, name = _ref4$name === void 0 ? "notification" : _ref4$name, getContainer3 = _ref4.getContainer, appContext = _ref4.appContext, customizePrefixCls = _ref4.prefixCls, customRootPrefixCls = _ref4.rootPrefixCls, customTransitionName = _ref4.transitionName, hasTransitionName2 = _ref4.hasTransitionName, props = _objectWithoutProperties$2(_ref4, _excluded$4);
  var div = document.createElement("div");
  if (getContainer3) {
    var root2 = getContainer3();
    root2.appendChild(div);
  } else {
    document.body.appendChild(div);
  }
  var Wrapper = defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "NotificationWrapper",
    setup: function setup19(_props, _ref5) {
      var attrs = _ref5.attrs;
      var notiRef = ref();
      onMounted(function() {
        callback({
          notice: function notice2(noticeProps) {
            var _notiRef$value;
            (_notiRef$value = notiRef.value) === null || _notiRef$value === void 0 ? void 0 : _notiRef$value.add(noticeProps);
          },
          removeNotice: function removeNotice(key2) {
            var _notiRef$value2;
            (_notiRef$value2 = notiRef.value) === null || _notiRef$value2 === void 0 ? void 0 : _notiRef$value2.remove(key2);
          },
          destroy: function destroy3() {
            render(null, div);
            if (div.parentNode) {
              div.parentNode.removeChild(div);
            }
          },
          component: notiRef
        });
      });
      return function() {
        var global2 = globalConfigForApi;
        var prefixCls = global2.getPrefixCls(name, customizePrefixCls);
        var rootPrefixCls = global2.getRootPrefixCls(customRootPrefixCls, prefixCls);
        var transitionName2 = hasTransitionName2 ? customTransitionName : "".concat(rootPrefixCls, "-").concat(customTransitionName);
        return createVNode(ConfigProvider, _objectSpread2(_objectSpread2({}, global2), {}, {
          "notUpdateGlobalConfig": true,
          "prefixCls": rootPrefixCls
        }), {
          default: function _default2() {
            return [createVNode(Notification, _objectSpread2(_objectSpread2({
              "ref": notiRef
            }, attrs), {}, {
              "prefixCls": prefixCls,
              "transitionName": transitionName2
            }), null)];
          }
        });
      };
    }
  });
  var vm = createVNode(Wrapper, props);
  vm.appContext = appContext || vm.appContext;
  render(vm, div);
};
const Notification$1 = Notification;
var LoadingOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, "name": "loading", "theme": "outlined" };
const LoadingOutlinedSvg = LoadingOutlined$2;
function bound01(n2, max) {
  if (isOnePointZero(n2)) {
    n2 = "100%";
  }
  var isPercent = isPercentage(n2);
  n2 = max === 360 ? n2 : Math.min(max, Math.max(0, parseFloat(n2)));
  if (isPercent) {
    n2 = parseInt(String(n2 * max), 10) / 100;
  }
  if (Math.abs(n2 - max) < 1e-6) {
    return 1;
  }
  if (max === 360) {
    n2 = (n2 < 0 ? n2 % max + max : n2 % max) / parseFloat(String(max));
  } else {
    n2 = n2 % max / parseFloat(String(max));
  }
  return n2;
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function isOnePointZero(n2) {
  return typeof n2 === "string" && n2.indexOf(".") !== -1 && parseFloat(n2) === 1;
}
function isPercentage(n2) {
  return typeof n2 === "string" && n2.indexOf("%") !== -1;
}
function boundAlpha(a2) {
  a2 = parseFloat(a2);
  if (isNaN(a2) || a2 < 0 || a2 > 1) {
    a2 = 1;
  }
  return a2;
}
function convertToPercentage(n2) {
  if (n2 <= 1) {
    return "".concat(Number(n2) * 100, "%");
  }
  return n2;
}
function pad2(c2) {
  return c2.length === 1 ? "0" + c2 : String(c2);
}
function rgbToRgb(r2, g2, b2) {
  return {
    r: bound01(r2, 255) * 255,
    g: bound01(g2, 255) * 255,
    b: bound01(b2, 255) * 255
  };
}
function rgbToHsl(r2, g2, b2) {
  r2 = bound01(r2, 255);
  g2 = bound01(g2, 255);
  b2 = bound01(b2, 255);
  var max = Math.max(r2, g2, b2);
  var min = Math.min(r2, g2, b2);
  var h2 = 0;
  var s2 = 0;
  var l2 = (max + min) / 2;
  if (max === min) {
    s2 = 0;
    h2 = 0;
  } else {
    var d2 = max - min;
    s2 = l2 > 0.5 ? d2 / (2 - max - min) : d2 / (max + min);
    switch (max) {
      case r2:
        h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
        break;
      case g2:
        h2 = (b2 - r2) / d2 + 2;
        break;
      case b2:
        h2 = (r2 - g2) / d2 + 4;
        break;
    }
    h2 /= 6;
  }
  return { h: h2, s: s2, l: l2 };
}
function hue2rgb(p, q2, t2) {
  if (t2 < 0) {
    t2 += 1;
  }
  if (t2 > 1) {
    t2 -= 1;
  }
  if (t2 < 1 / 6) {
    return p + (q2 - p) * (6 * t2);
  }
  if (t2 < 1 / 2) {
    return q2;
  }
  if (t2 < 2 / 3) {
    return p + (q2 - p) * (2 / 3 - t2) * 6;
  }
  return p;
}
function hslToRgb(h2, s2, l2) {
  var r2;
  var g2;
  var b2;
  h2 = bound01(h2, 360);
  s2 = bound01(s2, 100);
  l2 = bound01(l2, 100);
  if (s2 === 0) {
    g2 = l2;
    b2 = l2;
    r2 = l2;
  } else {
    var q2 = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
    var p = 2 * l2 - q2;
    r2 = hue2rgb(p, q2, h2 + 1 / 3);
    g2 = hue2rgb(p, q2, h2);
    b2 = hue2rgb(p, q2, h2 - 1 / 3);
  }
  return { r: r2 * 255, g: g2 * 255, b: b2 * 255 };
}
function rgbToHsv(r2, g2, b2) {
  r2 = bound01(r2, 255);
  g2 = bound01(g2, 255);
  b2 = bound01(b2, 255);
  var max = Math.max(r2, g2, b2);
  var min = Math.min(r2, g2, b2);
  var h2 = 0;
  var v2 = max;
  var d2 = max - min;
  var s2 = max === 0 ? 0 : d2 / max;
  if (max === min) {
    h2 = 0;
  } else {
    switch (max) {
      case r2:
        h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
        break;
      case g2:
        h2 = (b2 - r2) / d2 + 2;
        break;
      case b2:
        h2 = (r2 - g2) / d2 + 4;
        break;
    }
    h2 /= 6;
  }
  return { h: h2, s: s2, v: v2 };
}
function hsvToRgb(h2, s2, v2) {
  h2 = bound01(h2, 360) * 6;
  s2 = bound01(s2, 100);
  v2 = bound01(v2, 100);
  var i2 = Math.floor(h2);
  var f2 = h2 - i2;
  var p = v2 * (1 - s2);
  var q2 = v2 * (1 - f2 * s2);
  var t2 = v2 * (1 - (1 - f2) * s2);
  var mod = i2 % 6;
  var r2 = [v2, q2, p, p, t2, v2][mod];
  var g2 = [t2, v2, v2, q2, p, p][mod];
  var b2 = [p, p, t2, v2, v2, q2][mod];
  return { r: r2 * 255, g: g2 * 255, b: b2 * 255 };
}
function rgbToHex(r2, g2, b2, allow3Char) {
  var hex = [
    pad2(Math.round(r2).toString(16)),
    pad2(Math.round(g2).toString(16)),
    pad2(Math.round(b2).toString(16))
  ];
  if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
function rgbaToHex(r2, g2, b2, a2, allow4Char) {
  var hex = [
    pad2(Math.round(r2).toString(16)),
    pad2(Math.round(g2).toString(16)),
    pad2(Math.round(b2).toString(16)),
    pad2(convertDecimalToHex(a2))
  ];
  if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}
function convertDecimalToHex(d2) {
  return Math.round(parseFloat(d2) * 255).toString(16);
}
function convertHexToDecimal(h2) {
  return parseIntFromHex(h2) / 255;
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function numberInputToObject(color) {
  return {
    r: color >> 16,
    g: (color & 65280) >> 8,
    b: color & 255
  };
}
var names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function inputToRGB(color) {
  var rgb = { r: 0, g: 0, b: 0 };
  var a2 = 1;
  var s2 = null;
  var v2 = null;
  var l2 = null;
  var ok = false;
  var format = false;
  if (typeof color === "string") {
    color = stringInputToObject(color);
  }
  if (typeof color === "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s2 = convertToPercentage(color.s);
      v2 = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s2, v2);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s2 = convertToPercentage(color.s);
      l2 = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s2, l2);
      ok = true;
      format = "hsl";
    }
    if (Object.prototype.hasOwnProperty.call(color, "a")) {
      a2 = color.a;
    }
  }
  a2 = boundAlpha(a2);
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a: a2
  };
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
  color = color.trim().toLowerCase();
  if (color.length === 0) {
    return false;
  }
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  }
  var match2 = matchers.rgb.exec(color);
  if (match2) {
    return { r: match2[1], g: match2[2], b: match2[3] };
  }
  match2 = matchers.rgba.exec(color);
  if (match2) {
    return { r: match2[1], g: match2[2], b: match2[3], a: match2[4] };
  }
  match2 = matchers.hsl.exec(color);
  if (match2) {
    return { h: match2[1], s: match2[2], l: match2[3] };
  }
  match2 = matchers.hsla.exec(color);
  if (match2) {
    return { h: match2[1], s: match2[2], l: match2[3], a: match2[4] };
  }
  match2 = matchers.hsv.exec(color);
  if (match2) {
    return { h: match2[1], s: match2[2], v: match2[3] };
  }
  match2 = matchers.hsva.exec(color);
  if (match2) {
    return { h: match2[1], s: match2[2], v: match2[3], a: match2[4] };
  }
  match2 = matchers.hex8.exec(color);
  if (match2) {
    return {
      r: parseIntFromHex(match2[1]),
      g: parseIntFromHex(match2[2]),
      b: parseIntFromHex(match2[3]),
      a: convertHexToDecimal(match2[4]),
      format: named ? "name" : "hex8"
    };
  }
  match2 = matchers.hex6.exec(color);
  if (match2) {
    return {
      r: parseIntFromHex(match2[1]),
      g: parseIntFromHex(match2[2]),
      b: parseIntFromHex(match2[3]),
      format: named ? "name" : "hex"
    };
  }
  match2 = matchers.hex4.exec(color);
  if (match2) {
    return {
      r: parseIntFromHex(match2[1] + match2[1]),
      g: parseIntFromHex(match2[2] + match2[2]),
      b: parseIntFromHex(match2[3] + match2[3]),
      a: convertHexToDecimal(match2[4] + match2[4]),
      format: named ? "name" : "hex8"
    };
  }
  match2 = matchers.hex3.exec(color);
  if (match2) {
    return {
      r: parseIntFromHex(match2[1] + match2[1]),
      g: parseIntFromHex(match2[2] + match2[2]),
      b: parseIntFromHex(match2[3] + match2[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}
var TinyColor = (
  /** @class */
  function() {
    function TinyColor2(color, opts) {
      if (color === void 0) {
        color = "";
      }
      if (opts === void 0) {
        opts = {};
      }
      var _a;
      if (color instanceof TinyColor2) {
        return color;
      }
      if (typeof color === "number") {
        color = numberInputToObject(color);
      }
      this.originalInput = color;
      var rgb = inputToRGB(color);
      this.originalInput = color;
      this.r = rgb.r;
      this.g = rgb.g;
      this.b = rgb.b;
      this.a = rgb.a;
      this.roundA = Math.round(100 * this.a) / 100;
      this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
      this.gradientType = opts.gradientType;
      if (this.r < 1) {
        this.r = Math.round(this.r);
      }
      if (this.g < 1) {
        this.g = Math.round(this.g);
      }
      if (this.b < 1) {
        this.b = Math.round(this.b);
      }
      this.isValid = rgb.ok;
    }
    TinyColor2.prototype.isDark = function() {
      return this.getBrightness() < 128;
    };
    TinyColor2.prototype.isLight = function() {
      return !this.isDark();
    };
    TinyColor2.prototype.getBrightness = function() {
      var rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
    };
    TinyColor2.prototype.getLuminance = function() {
      var rgb = this.toRgb();
      var R2;
      var G;
      var B2;
      var RsRGB = rgb.r / 255;
      var GsRGB = rgb.g / 255;
      var BsRGB = rgb.b / 255;
      if (RsRGB <= 0.03928) {
        R2 = RsRGB / 12.92;
      } else {
        R2 = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      }
      if (GsRGB <= 0.03928) {
        G = GsRGB / 12.92;
      } else {
        G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      }
      if (BsRGB <= 0.03928) {
        B2 = BsRGB / 12.92;
      } else {
        B2 = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * R2 + 0.7152 * G + 0.0722 * B2;
    };
    TinyColor2.prototype.getAlpha = function() {
      return this.a;
    };
    TinyColor2.prototype.setAlpha = function(alpha) {
      this.a = boundAlpha(alpha);
      this.roundA = Math.round(100 * this.a) / 100;
      return this;
    };
    TinyColor2.prototype.isMonochrome = function() {
      var s2 = this.toHsl().s;
      return s2 === 0;
    };
    TinyColor2.prototype.toHsv = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    TinyColor2.prototype.toHsvString = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      var h2 = Math.round(hsv.h * 360);
      var s2 = Math.round(hsv.s * 100);
      var v2 = Math.round(hsv.v * 100);
      return this.a === 1 ? "hsv(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%)") : "hsva(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHsl = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    TinyColor2.prototype.toHslString = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      var h2 = Math.round(hsl.h * 360);
      var s2 = Math.round(hsl.s * 100);
      var l2 = Math.round(hsl.l * 100);
      return this.a === 1 ? "hsl(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%)") : "hsla(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHex = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    TinyColor2.prototype.toHexString = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return "#" + this.toHex(allow3Char);
    };
    TinyColor2.prototype.toHex8 = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    TinyColor2.prototype.toHex8String = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return "#" + this.toHex8(allow4Char);
    };
    TinyColor2.prototype.toHexShortString = function(allowShortChar) {
      if (allowShortChar === void 0) {
        allowShortChar = false;
      }
      return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
    };
    TinyColor2.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toRgbString = function() {
      var r2 = Math.round(this.r);
      var g2 = Math.round(this.g);
      var b2 = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(r2, ", ").concat(g2, ", ").concat(b2, ")") : "rgba(".concat(r2, ", ").concat(g2, ", ").concat(b2, ", ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toPercentageRgb = function() {
      var fmt = function(x2) {
        return "".concat(Math.round(bound01(x2, 255) * 100), "%");
      };
      return {
        r: fmt(this.r),
        g: fmt(this.g),
        b: fmt(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toPercentageRgbString = function() {
      var rnd = function(x2) {
        return Math.round(bound01(x2, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toName = function() {
      if (this.a === 0) {
        return "transparent";
      }
      if (this.a < 1) {
        return false;
      }
      var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
      for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
        var _b = _a[_i], key2 = _b[0], value = _b[1];
        if (hex === value) {
          return key2;
        }
      }
      return false;
    };
    TinyColor2.prototype.toString = function(format) {
      var formatSet = Boolean(format);
      format = format !== null && format !== void 0 ? format : this.format;
      var formattedString = false;
      var hasAlpha = this.a < 1 && this.a >= 0;
      var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith("hex") || format === "name");
      if (needsAlphaFormat) {
        if (format === "name" && this.a === 0) {
          return this.toName();
        }
        return this.toRgbString();
      }
      if (format === "rgb") {
        formattedString = this.toRgbString();
      }
      if (format === "prgb") {
        formattedString = this.toPercentageRgbString();
      }
      if (format === "hex" || format === "hex6") {
        formattedString = this.toHexString();
      }
      if (format === "hex3") {
        formattedString = this.toHexString(true);
      }
      if (format === "hex4") {
        formattedString = this.toHex8String(true);
      }
      if (format === "hex8") {
        formattedString = this.toHex8String();
      }
      if (format === "name") {
        formattedString = this.toName();
      }
      if (format === "hsl") {
        formattedString = this.toHslString();
      }
      if (format === "hsv") {
        formattedString = this.toHsvString();
      }
      return formattedString || this.toHexString();
    };
    TinyColor2.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor2.prototype.clone = function() {
      return new TinyColor2(this.toString());
    };
    TinyColor2.prototype.lighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.brighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var rgb = this.toRgb();
      rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
      rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
      rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
      return new TinyColor2(rgb);
    };
    TinyColor2.prototype.darken = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.tint = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("white", amount);
    };
    TinyColor2.prototype.shade = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("black", amount);
    };
    TinyColor2.prototype.desaturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.saturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.greyscale = function() {
      return this.desaturate(100);
    };
    TinyColor2.prototype.spin = function(amount) {
      var hsl = this.toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.mix = function(color, amount) {
      if (amount === void 0) {
        amount = 50;
      }
      var rgb1 = this.toRgb();
      var rgb2 = new TinyColor2(color).toRgb();
      var p = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
      };
      return new TinyColor2(rgba);
    };
    TinyColor2.prototype.analogous = function(results, slices) {
      if (results === void 0) {
        results = 6;
      }
      if (slices === void 0) {
        slices = 30;
      }
      var hsl = this.toHsl();
      var part = 360 / slices;
      var ret = [this];
      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(new TinyColor2(hsl));
      }
      return ret;
    };
    TinyColor2.prototype.complement = function() {
      var hsl = this.toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.monochromatic = function(results) {
      if (results === void 0) {
        results = 6;
      }
      var hsv = this.toHsv();
      var h2 = hsv.h;
      var s2 = hsv.s;
      var v2 = hsv.v;
      var res = [];
      var modification = 1 / results;
      while (results--) {
        res.push(new TinyColor2({ h: h2, s: s2, v: v2 }));
        v2 = (v2 + modification) % 1;
      }
      return res;
    };
    TinyColor2.prototype.splitcomplement = function() {
      var hsl = this.toHsl();
      var h2 = hsl.h;
      return [
        this,
        new TinyColor2({ h: (h2 + 72) % 360, s: hsl.s, l: hsl.l }),
        new TinyColor2({ h: (h2 + 216) % 360, s: hsl.s, l: hsl.l })
      ];
    };
    TinyColor2.prototype.onBackground = function(background) {
      var fg = this.toRgb();
      var bg = new TinyColor2(background).toRgb();
      var alpha = fg.a + bg.a * (1 - fg.a);
      return new TinyColor2({
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
        a: alpha
      });
    };
    TinyColor2.prototype.triad = function() {
      return this.polyad(3);
    };
    TinyColor2.prototype.tetrad = function() {
      return this.polyad(4);
    };
    TinyColor2.prototype.polyad = function(n2) {
      var hsl = this.toHsl();
      var h2 = hsl.h;
      var result = [this];
      var increment = 360 / n2;
      for (var i2 = 1; i2 < n2; i2++) {
        result.push(new TinyColor2({ h: (h2 + i2 * increment) % 360, s: hsl.s, l: hsl.l }));
      }
      return result;
    };
    TinyColor2.prototype.equals = function(color) {
      return this.toRgbString() === new TinyColor2(color).toRgbString();
    };
    return TinyColor2;
  }()
);
var hueStep = 2;
var saturationStep = 0.16;
var saturationStep2 = 0.05;
var brightnessStep1 = 0.05;
var brightnessStep2 = 0.15;
var lightColorCount = 5;
var darkColorCount = 4;
var darkColorMap = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}];
function toHsv(_ref) {
  var r2 = _ref.r, g2 = _ref.g, b2 = _ref.b;
  var hsv = rgbToHsv(r2, g2, b2);
  return {
    h: hsv.h * 360,
    s: hsv.s,
    v: hsv.v
  };
}
function toHex(_ref2) {
  var r2 = _ref2.r, g2 = _ref2.g, b2 = _ref2.b;
  return "#".concat(rgbToHex(r2, g2, b2, false));
}
function mix(rgb1, rgb2, amount) {
  var p = amount / 100;
  var rgb = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b
  };
  return rgb;
}
function getHue(hsv, i2, light) {
  var hue;
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i2 : Math.round(hsv.h) + hueStep * i2;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i2 : Math.round(hsv.h) - hueStep * i2;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}
function getSaturation(hsv, i2, light) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  var saturation;
  if (light) {
    saturation = hsv.s - saturationStep * i2;
  } else if (i2 === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i2;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (light && i2 === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Number(saturation.toFixed(2));
}
function getValue(hsv, i2, light) {
  var value;
  if (light) {
    value = hsv.v + brightnessStep1 * i2;
  } else {
    value = hsv.v - brightnessStep2 * i2;
  }
  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
}
function generate$1(color) {
  var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var patterns = [];
  var pColor = inputToRGB(color);
  for (var i2 = lightColorCount; i2 > 0; i2 -= 1) {
    var hsv = toHsv(pColor);
    var colorString = toHex(inputToRGB({
      h: getHue(hsv, i2, true),
      s: getSaturation(hsv, i2, true),
      v: getValue(hsv, i2, true)
    }));
    patterns.push(colorString);
  }
  patterns.push(toHex(pColor));
  for (var _i = 1; _i <= darkColorCount; _i += 1) {
    var _hsv = toHsv(pColor);
    var _colorString = toHex(inputToRGB({
      h: getHue(_hsv, _i),
      s: getSaturation(_hsv, _i),
      v: getValue(_hsv, _i)
    }));
    patterns.push(_colorString);
  }
  if (opts.theme === "dark") {
    return darkColorMap.map(function(_ref3) {
      var index2 = _ref3.index, opacity = _ref3.opacity;
      var darkColorString = toHex(mix(inputToRGB(opts.backgroundColor || "#141414"), inputToRGB(patterns[index2]), opacity * 100));
      return darkColorString;
    });
  }
  return patterns;
}
var presetPrimaryColors = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1890FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
};
var presetPalettes = {};
var presetDarkPalettes = {};
Object.keys(presetPrimaryColors).forEach(function(key2) {
  presetPalettes[key2] = generate$1(presetPrimaryColors[key2]);
  presetPalettes[key2].primary = presetPalettes[key2][5];
  presetDarkPalettes[key2] = generate$1(presetPrimaryColors[key2], {
    theme: "dark",
    backgroundColor: "#141414"
  });
  presetDarkPalettes[key2].primary = presetDarkPalettes[key2][5];
});
var containers = [];
var styleElements = [];
var usage = "insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).";
function createStyleElement() {
  var styleElement = document.createElement("style");
  styleElement.setAttribute("type", "text/css");
  return styleElement;
}
function insertCss(css, options) {
  options = options || {};
  if (css === void 0) {
    throw new Error(usage);
  }
  var position = options.prepend === true ? "prepend" : "append";
  var container = options.container !== void 0 ? options.container : document.querySelector("head");
  var containerId = containers.indexOf(container);
  if (containerId === -1) {
    containerId = containers.push(container) - 1;
    styleElements[containerId] = {};
  }
  var styleElement;
  if (styleElements[containerId] !== void 0 && styleElements[containerId][position] !== void 0) {
    styleElement = styleElements[containerId][position];
  } else {
    styleElement = styleElements[containerId][position] = createStyleElement();
    if (position === "prepend") {
      container.insertBefore(styleElement, container.childNodes[0]);
    } else {
      container.appendChild(styleElement);
    }
  }
  if (css.charCodeAt(0) === 65279) {
    css = css.substr(1, css.length);
  }
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText += css;
  } else {
    styleElement.textContent += css;
  }
  return styleElement;
}
function _objectSpread$f(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$f(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$f(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function warn(valid, message2) {
  if (process.env.NODE_ENV !== "production" && !valid && console !== void 0) {
    console.error("Warning: ".concat(message2));
  }
}
function warning(valid, message2) {
  warn(valid, "[@ant-design/icons-vue] ".concat(message2));
}
function isIconDefinition(target) {
  return typeof target === "object" && typeof target.name === "string" && typeof target.theme === "string" && (typeof target.icon === "object" || typeof target.icon === "function");
}
function generate(node, key2, rootProps) {
  if (!rootProps) {
    return h$1(node.tag, _objectSpread$f({
      key: key2
    }, node.attrs), (node.children || []).map(function(child, index2) {
      return generate(child, "".concat(key2, "-").concat(node.tag, "-").concat(index2));
    }));
  }
  return h$1(node.tag, _objectSpread$f({
    key: key2
  }, rootProps, node.attrs), (node.children || []).map(function(child, index2) {
    return generate(child, "".concat(key2, "-").concat(node.tag, "-").concat(index2));
  }));
}
function getSecondaryColor(primaryColor) {
  return generate$1(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}
var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var cssInjectedFlag = false;
var useInsertStyles = function useInsertStyles2() {
  var styleStr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : iconStyles;
  nextTick(function() {
    if (!cssInjectedFlag) {
      if (typeof window !== "undefined" && window.document && window.document.documentElement) {
        insertCss(styleStr, {
          prepend: true
        });
      }
      cssInjectedFlag = true;
    }
  });
};
var _excluded$3 = ["icon", "primaryColor", "secondaryColor"];
function _objectWithoutProperties$1(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key2, i2;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
      key2 = sourceSymbolKeys[i2];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key2 = sourceKeys[i2];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function _objectSpread$e(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$e(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$e(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var twoToneColorPalette = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: false
};
function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return _objectSpread$e({}, twoToneColorPalette);
}
var IconBase = function IconBase2(props, context) {
  var _props$context$attrs = _objectSpread$e({}, props, context.attrs), icon = _props$context$attrs.icon, primaryColor = _props$context$attrs.primaryColor, secondaryColor = _props$context$attrs.secondaryColor, restProps = _objectWithoutProperties$1(_props$context$attrs, _excluded$3);
  var colors = twoToneColorPalette;
  if (primaryColor) {
    colors = {
      primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }
  useInsertStyles();
  warning(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));
  if (!isIconDefinition(icon)) {
    return null;
  }
  var target = icon;
  if (target && typeof target.icon === "function") {
    target = _objectSpread$e({}, target, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }
  return generate(target.icon, "svg-".concat(target.name), _objectSpread$e({}, restProps, {
    "data-icon": target.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }));
};
IconBase.props = {
  icon: Object,
  primaryColor: String,
  secondaryColor: String,
  focusable: String
};
IconBase.inheritAttrs = false;
IconBase.displayName = "IconBase";
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
const VueIcon = IconBase;
function _slicedToArray$1(arr, i2) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i2) || _unsupportedIterableToArray$1(arr, i2) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray$1(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$1(o2, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}
function _iterableToArrayLimit$1(arr, i2) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i2 && _arr.length === i2)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return VueIcon.setTwoToneColors({
    primaryColor,
    secondaryColor
  });
}
function getTwoToneColor() {
  var colors = VueIcon.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}
var _excluded$2 = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];
function _slicedToArray(arr, i2) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o2, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i2) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i2 && _arr.length === i2)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _objectSpread$d(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$d(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$d(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key2, i2;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
      key2 = sourceSymbolKeys[i2];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key2 = sourceKeys[i2];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
setTwoToneColor("#1890ff");
var Icon = function Icon2(props, context) {
  var _classObj;
  var _props$context$attrs = _objectSpread$d({}, props, context.attrs), cls = _props$context$attrs["class"], icon = _props$context$attrs.icon, spin = _props$context$attrs.spin, rotate = _props$context$attrs.rotate, tabindex = _props$context$attrs.tabindex, twoToneColor = _props$context$attrs.twoToneColor, onClick = _props$context$attrs.onClick, restProps = _objectWithoutProperties(_props$context$attrs, _excluded$2);
  var classObj = (_classObj = {
    anticon: true
  }, _defineProperty$d(_classObj, "anticon-".concat(icon.name), Boolean(icon.name)), _defineProperty$d(_classObj, cls, cls), _classObj);
  var svgClassString = spin === "" || !!spin || icon.name === "loading" ? "anticon-spin" : "";
  var iconTabIndex = tabindex;
  if (iconTabIndex === void 0 && onClick) {
    iconTabIndex = -1;
    restProps.tabindex = iconTabIndex;
  }
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : void 0;
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return createVNode("span", _objectSpread$d({
    "role": "img",
    "aria-label": icon.name
  }, restProps, {
    "onClick": onClick,
    "class": classObj
  }), [createVNode(VueIcon, {
    "class": svgClassString,
    "icon": icon,
    "primaryColor": primaryColor,
    "secondaryColor": secondaryColor,
    "style": svgStyle
  }, null)]);
};
Icon.props = {
  spin: Boolean,
  rotate: Number,
  icon: Object,
  twoToneColor: String
};
Icon.displayName = "AntdIcon";
Icon.inheritAttrs = false;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
const AntdIcon = Icon;
function _objectSpread$c(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$c(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$c(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var LoadingOutlined = function LoadingOutlined2(props, context) {
  var p = _objectSpread$c({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$c({}, p, {
    "icon": LoadingOutlinedSvg
  }), null);
};
LoadingOutlined.displayName = "LoadingOutlined";
LoadingOutlined.inheritAttrs = false;
const LoadingOutlined$1 = LoadingOutlined;
var ExclamationCircleFilled$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, "name": "exclamation-circle", "theme": "filled" };
const ExclamationCircleFilledSvg = ExclamationCircleFilled$2;
function _objectSpread$b(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$b(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$b(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var ExclamationCircleFilled = function ExclamationCircleFilled2(props, context) {
  var p = _objectSpread$b({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$b({}, p, {
    "icon": ExclamationCircleFilledSvg
  }), null);
};
ExclamationCircleFilled.displayName = "ExclamationCircleFilled";
ExclamationCircleFilled.inheritAttrs = false;
const ExclamationCircleFilled$1 = ExclamationCircleFilled;
var CloseCircleFilled$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" } }] }, "name": "close-circle", "theme": "filled" };
const CloseCircleFilledSvg = CloseCircleFilled$2;
function _objectSpread$a(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$a(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$a(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var CloseCircleFilled = function CloseCircleFilled2(props, context) {
  var p = _objectSpread$a({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$a({}, p, {
    "icon": CloseCircleFilledSvg
  }), null);
};
CloseCircleFilled.displayName = "CloseCircleFilled";
CloseCircleFilled.inheritAttrs = false;
const CloseCircleFilled$1 = CloseCircleFilled;
var CheckCircleFilled$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" } }] }, "name": "check-circle", "theme": "filled" };
const CheckCircleFilledSvg = CheckCircleFilled$2;
function _objectSpread$9(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$9(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$9(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var CheckCircleFilled = function CheckCircleFilled2(props, context) {
  var p = _objectSpread$9({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$9({}, p, {
    "icon": CheckCircleFilledSvg
  }), null);
};
CheckCircleFilled.displayName = "CheckCircleFilled";
CheckCircleFilled.inheritAttrs = false;
const CheckCircleFilled$1 = CheckCircleFilled;
var InfoCircleFilled$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, "name": "info-circle", "theme": "filled" };
const InfoCircleFilledSvg = InfoCircleFilled$2;
function _objectSpread$8(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$8(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$8(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var InfoCircleFilled = function InfoCircleFilled2(props, context) {
  var p = _objectSpread$8({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$8({}, p, {
    "icon": InfoCircleFilledSvg
  }), null);
};
InfoCircleFilled.displayName = "InfoCircleFilled";
InfoCircleFilled.inheritAttrs = false;
const InfoCircleFilled$1 = InfoCircleFilled;
var defaultDuration$1 = 3;
var defaultTop$1;
var messageInstance;
var key = 1;
var localPrefixCls = "";
var transitionName = "move-up";
var hasTransitionName = false;
var getContainer$1 = function getContainer() {
  return document.body;
};
var maxCount$1;
var rtl$1 = false;
function getKeyThenIncreaseKey() {
  return key++;
}
function setMessageConfig(options) {
  if (options.top !== void 0) {
    defaultTop$1 = options.top;
    messageInstance = null;
  }
  if (options.duration !== void 0) {
    defaultDuration$1 = options.duration;
  }
  if (options.prefixCls !== void 0) {
    localPrefixCls = options.prefixCls;
  }
  if (options.getContainer !== void 0) {
    getContainer$1 = options.getContainer;
    messageInstance = null;
  }
  if (options.transitionName !== void 0) {
    transitionName = options.transitionName;
    messageInstance = null;
    hasTransitionName = true;
  }
  if (options.maxCount !== void 0) {
    maxCount$1 = options.maxCount;
    messageInstance = null;
  }
  if (options.rtl !== void 0) {
    rtl$1 = options.rtl;
  }
}
function getMessageInstance(args, callback) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }
  Notification$1.newInstance({
    appContext: args.appContext,
    prefixCls: args.prefixCls || localPrefixCls,
    rootPrefixCls: args.rootPrefixCls,
    transitionName,
    hasTransitionName,
    style: {
      top: defaultTop$1
    },
    getContainer: getContainer$1 || args.getPopupContainer,
    maxCount: maxCount$1,
    name: "message"
  }, function(instance) {
    if (messageInstance) {
      callback(messageInstance);
      return;
    }
    messageInstance = instance;
    callback(instance);
  });
}
var typeToIcon$1 = {
  info: InfoCircleFilled$1,
  success: CheckCircleFilled$1,
  error: CloseCircleFilled$1,
  warning: ExclamationCircleFilled$1,
  loading: LoadingOutlined$1
};
function notice$1(args) {
  var duration = args.duration !== void 0 ? args.duration : defaultDuration$1;
  var target = args.key || getKeyThenIncreaseKey();
  var closePromise = new Promise(function(resolve) {
    var callback = function callback2() {
      if (typeof args.onClose === "function") {
        args.onClose();
      }
      return resolve(true);
    };
    getMessageInstance(args, function(instance) {
      instance.notice({
        key: target,
        duration,
        style: args.style || {},
        class: args.class,
        content: function content(_ref) {
          var _classNames;
          var prefixCls = _ref.prefixCls;
          var Icon3 = typeToIcon$1[args.type];
          var iconNode = Icon3 ? createVNode(Icon3, null, null) : "";
          var messageClass = classNames("".concat(prefixCls, "-custom-content"), (_classNames = {}, _defineProperty$g(_classNames, "".concat(prefixCls, "-").concat(args.type), args.type), _defineProperty$g(_classNames, "".concat(prefixCls, "-rtl"), rtl$1 === true), _classNames));
          return createVNode("div", {
            "class": messageClass
          }, [typeof args.icon === "function" ? args.icon() : args.icon || iconNode, createVNode("span", null, [typeof args.content === "function" ? args.content() : args.content])]);
        },
        onClose: callback,
        onClick: args.onClick
      });
    });
  });
  var result = function result2() {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };
  result.then = function(filled, rejected) {
    return closePromise.then(filled, rejected);
  };
  result.promise = closePromise;
  return result;
}
function isArgsProps(content) {
  return Object.prototype.toString.call(content) === "[object Object]" && !!content.content;
}
var api$1 = {
  open: notice$1,
  config: setMessageConfig,
  destroy: function destroy(messageKey) {
    if (messageInstance) {
      if (messageKey) {
        var _messageInstance = messageInstance, removeNotice = _messageInstance.removeNotice;
        removeNotice(messageKey);
      } else {
        var _messageInstance2 = messageInstance, destroy3 = _messageInstance2.destroy;
        destroy3();
        messageInstance = null;
      }
    }
  }
};
function attachTypeApi(originalApi, type) {
  originalApi[type] = function(content, duration, onClose) {
    if (isArgsProps(content)) {
      return originalApi.open(_objectSpread2(_objectSpread2({}, content), {}, {
        type
      }));
    }
    if (typeof duration === "function") {
      onClose = duration;
      duration = void 0;
    }
    return originalApi.open({
      content,
      duration,
      type,
      onClose
    });
  };
}
["success", "info", "warning", "error", "loading"].forEach(function(type) {
  return attachTypeApi(api$1, type);
});
api$1.warn = api$1.warning;
const message = api$1;
var regeneratorRuntimeExports = {};
var regeneratorRuntime$1 = {
  get exports() {
    return regeneratorRuntimeExports;
  },
  set exports(v2) {
    regeneratorRuntimeExports = v2;
  }
};
var _typeofExports = {};
var _typeof = {
  get exports() {
    return _typeofExports;
  },
  set exports(v2) {
    _typeofExports = v2;
  }
};
(function(module) {
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    return module.exports = _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof2(obj);
  }
  module.exports = _typeof2, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_typeof);
(function(module) {
  var _typeof2 = _typeofExports["default"];
  function _regeneratorRuntime() {
    module.exports = _regeneratorRuntime = function _regeneratorRuntime2() {
      return exports;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key2, desc) {
      obj[key2] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key2, value) {
      return Object.defineProperty(obj, key2, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }), obj[key2];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function define2(obj, key2, value) {
        return obj[key2] = value;
      };
    }
    function wrap(innerFn, outerFn, self2, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self2, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
      return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg, value = result.value;
          return value && "object" == _typeof2(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value2) {
            invoke("next", value2, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function(unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function(error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function value(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function(resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self2, context) {
      var state = "suspendedStart";
      return function(method, arg) {
        if ("executing" === state)
          throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method)
            throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg; ; ) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel)
                continue;
              return delegateResult;
            }
          }
          if ("next" === context.method)
            context.sent = context._sent = context.arg;
          else if ("throw" === context.method) {
            if ("suspendedStart" === state)
              throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else
            "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self2, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
              continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method, method = delegate.iterator[methodName];
      if (void 0 === method)
        return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type)
        return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod)
          return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next)
          return iterable;
        if (!isNaN(iterable.length)) {
          var i2 = -1, next = function next2() {
            for (; ++i2 < iterable.length; )
              if (hasOwn.call(iterable, i2))
                return next2.value = iterable[i2], next2.done = false, next2;
            return next2.value = void 0, next2.done = true, next2;
          };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: void 0,
        done: true
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: true
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: true
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function(genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function(arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self2, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
      return this;
    }), define(Gp, "toString", function() {
      return "[object Generator]";
    }), exports.keys = function(val) {
      var object = Object(val), keys = [];
      for (var key2 in object)
        keys.push(key2);
      return keys.reverse(), function next() {
        for (; keys.length; ) {
          var key3 = keys.pop();
          if (key3 in object)
            return next.value = key3, next.done = false, next;
        }
        return next.done = true, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset)
          for (var name in this)
            "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
      },
      stop: function stop() {
        this.done = true;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type)
          throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done)
          throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
        }
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2], record = entry.completion;
          if ("root" === entry.tryLoc)
            return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc)
                return handle(entry.catchLoc, true);
              if (this.prev < entry.finallyLoc)
                return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc)
                return handle(entry.catchLoc, true);
            } else {
              if (!hasFinally)
                throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc)
                return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if ("throw" === record.type)
          throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2];
          if (entry.finallyLoc === finallyLoc)
            return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName,
          nextLoc
        }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
      }
    }, exports;
  }
  module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(regeneratorRuntime$1);
var runtime = regeneratorRuntimeExports();
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
var CheckCircleOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" } }, { "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] }, "name": "check-circle", "theme": "outlined" };
const CheckCircleOutlinedSvg = CheckCircleOutlined$2;
function _objectSpread$7(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$7(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$7(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var CheckCircleOutlined = function CheckCircleOutlined2(props, context) {
  var p = _objectSpread$7({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$7({}, p, {
    "icon": CheckCircleOutlinedSvg
  }), null);
};
CheckCircleOutlined.displayName = "CheckCircleOutlined";
CheckCircleOutlined.inheritAttrs = false;
const CheckCircleOutlined$1 = CheckCircleOutlined;
var InfoCircleOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { "tag": "path", "attrs": { "d": "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" } }] }, "name": "info-circle", "theme": "outlined" };
const InfoCircleOutlinedSvg = InfoCircleOutlined$2;
function _objectSpread$6(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$6(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$6(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var InfoCircleOutlined = function InfoCircleOutlined2(props, context) {
  var p = _objectSpread$6({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$6({}, p, {
    "icon": InfoCircleOutlinedSvg
  }), null);
};
InfoCircleOutlined.displayName = "InfoCircleOutlined";
InfoCircleOutlined.inheritAttrs = false;
const InfoCircleOutlined$1 = InfoCircleOutlined;
var CloseCircleOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" } }, { "tag": "path", "attrs": { "d": "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] }, "name": "close-circle", "theme": "outlined" };
const CloseCircleOutlinedSvg = CloseCircleOutlined$2;
function _objectSpread$5(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$5(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$5(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var CloseCircleOutlined = function CloseCircleOutlined2(props, context) {
  var p = _objectSpread$5({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$5({}, p, {
    "icon": CloseCircleOutlinedSvg
  }), null);
};
CloseCircleOutlined.displayName = "CloseCircleOutlined";
CloseCircleOutlined.inheritAttrs = false;
const CloseCircleOutlined$1 = CloseCircleOutlined;
var ExclamationCircleOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { "tag": "path", "attrs": { "d": "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" } }] }, "name": "exclamation-circle", "theme": "outlined" };
const ExclamationCircleOutlinedSvg = ExclamationCircleOutlined$2;
function _objectSpread$4(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$4(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$4(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var ExclamationCircleOutlined = function ExclamationCircleOutlined2(props, context) {
  var p = _objectSpread$4({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$4({}, p, {
    "icon": ExclamationCircleOutlinedSvg
  }), null);
};
ExclamationCircleOutlined.displayName = "ExclamationCircleOutlined";
ExclamationCircleOutlined.inheritAttrs = false;
const ExclamationCircleOutlined$1 = ExclamationCircleOutlined;
var CloseOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" } }] }, "name": "close", "theme": "outlined" };
const CloseOutlinedSvg = CloseOutlined$2;
function _objectSpread$3(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$3(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$3(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var CloseOutlined = function CloseOutlined2(props, context) {
  var p = _objectSpread$3({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$3({}, p, {
    "icon": CloseOutlinedSvg
  }), null);
};
CloseOutlined.displayName = "CloseOutlined";
CloseOutlined.inheritAttrs = false;
const CloseOutlined$1 = CloseOutlined;
var notificationInstance = {};
var defaultDuration = 4.5;
var defaultTop = "24px";
var defaultBottom = "24px";
var defaultPrefixCls$1 = "";
var defaultPlacement = "topRight";
var defaultGetContainer = function defaultGetContainer2() {
  return document.body;
};
var defaultCloseIcon = null;
var rtl = false;
var maxCount;
function setNotificationConfig(options) {
  var duration = options.duration, placement = options.placement, bottom = options.bottom, top = options.top, getContainer3 = options.getContainer, closeIcon = options.closeIcon, prefixCls = options.prefixCls;
  if (prefixCls !== void 0) {
    defaultPrefixCls$1 = prefixCls;
  }
  if (duration !== void 0) {
    defaultDuration = duration;
  }
  if (placement !== void 0) {
    defaultPlacement = placement;
  }
  if (bottom !== void 0) {
    defaultBottom = typeof bottom === "number" ? "".concat(bottom, "px") : bottom;
  }
  if (top !== void 0) {
    defaultTop = typeof top === "number" ? "".concat(top, "px") : top;
  }
  if (getContainer3 !== void 0) {
    defaultGetContainer = getContainer3;
  }
  if (closeIcon !== void 0) {
    defaultCloseIcon = closeIcon;
  }
  if (options.rtl !== void 0) {
    rtl = options.rtl;
  }
  if (options.maxCount !== void 0) {
    maxCount = options.maxCount;
  }
}
function getPlacementStyle(placement) {
  var top = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultTop;
  var bottom = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultBottom;
  var style;
  switch (placement) {
    case "topLeft":
      style = {
        left: "0px",
        top,
        bottom: "auto"
      };
      break;
    case "topRight":
      style = {
        right: "0px",
        top,
        bottom: "auto"
      };
      break;
    case "bottomLeft":
      style = {
        left: "0px",
        top: "auto",
        bottom
      };
      break;
    default:
      style = {
        right: "0px",
        top: "auto",
        bottom
      };
      break;
  }
  return style;
}
function getNotificationInstance(_ref, callback) {
  var customizePrefixCls = _ref.prefixCls, _ref$placement = _ref.placement, placement = _ref$placement === void 0 ? defaultPlacement : _ref$placement, _ref$getContainer = _ref.getContainer, getContainer3 = _ref$getContainer === void 0 ? defaultGetContainer : _ref$getContainer, top = _ref.top, bottom = _ref.bottom, _ref$closeIcon = _ref.closeIcon, _closeIcon = _ref$closeIcon === void 0 ? defaultCloseIcon : _ref$closeIcon, appContext = _ref.appContext;
  var _globalConfig = globalConfig(), getPrefixCls2 = _globalConfig.getPrefixCls;
  var prefixCls = getPrefixCls2("notification", customizePrefixCls || defaultPrefixCls$1);
  var cacheKey = "".concat(prefixCls, "-").concat(placement, "-").concat(rtl);
  var cacheInstance = notificationInstance[cacheKey];
  if (cacheInstance) {
    Promise.resolve(cacheInstance).then(function(instance) {
      callback(instance);
    });
    return;
  }
  var notificationClass = classNames("".concat(prefixCls, "-").concat(placement), _defineProperty$g({}, "".concat(prefixCls, "-rtl"), rtl === true));
  Notification$1.newInstance({
    name: "notification",
    prefixCls: customizePrefixCls || defaultPrefixCls$1,
    class: notificationClass,
    style: getPlacementStyle(placement, top, bottom),
    appContext,
    getContainer: getContainer3,
    closeIcon: function closeIcon(_ref2) {
      var prefixCls2 = _ref2.prefixCls;
      var closeIconToRender = createVNode("span", {
        "class": "".concat(prefixCls2, "-close-x")
      }, [renderHelper(_closeIcon, {}, createVNode(CloseOutlined$1, {
        "class": "".concat(prefixCls2, "-close-icon")
      }, null))]);
      return closeIconToRender;
    },
    maxCount,
    hasTransitionName: true
  }, function(notification2) {
    notificationInstance[cacheKey] = notification2;
    callback(notification2);
  });
}
var typeToIcon = {
  success: CheckCircleOutlined$1,
  info: InfoCircleOutlined$1,
  error: CloseCircleOutlined$1,
  warning: ExclamationCircleOutlined$1
};
function notice(args) {
  var icon = args.icon, type = args.type, description = args.description, message2 = args.message, btn = args.btn;
  var duration = args.duration === void 0 ? defaultDuration : args.duration;
  getNotificationInstance(args, function(notification2) {
    notification2.notice({
      content: function content(_ref3) {
        var outerPrefixCls = _ref3.prefixCls;
        var prefixCls = "".concat(outerPrefixCls, "-notice");
        var iconNode = null;
        if (icon) {
          iconNode = function iconNode2() {
            return createVNode("span", {
              "class": "".concat(prefixCls, "-icon")
            }, [renderHelper(icon)]);
          };
        } else if (type) {
          var Icon3 = typeToIcon[type];
          iconNode = function iconNode2() {
            return createVNode(Icon3, {
              "class": "".concat(prefixCls, "-icon ").concat(prefixCls, "-icon-").concat(type)
            }, null);
          };
        }
        return createVNode("div", {
          "class": iconNode ? "".concat(prefixCls, "-with-icon") : ""
        }, [iconNode && iconNode(), createVNode("div", {
          "class": "".concat(prefixCls, "-message")
        }, [!description && iconNode ? createVNode("span", {
          "class": "".concat(prefixCls, "-message-single-line-auto-margin")
        }, null) : null, renderHelper(message2)]), createVNode("div", {
          "class": "".concat(prefixCls, "-description")
        }, [renderHelper(description)]), btn ? createVNode("span", {
          "class": "".concat(prefixCls, "-btn")
        }, [renderHelper(btn)]) : null]);
      },
      duration,
      closable: true,
      onClose: args.onClose,
      onClick: args.onClick,
      key: args.key,
      style: args.style || {},
      class: args.class
    });
  });
}
var api = {
  open: notice,
  close: function close(key2) {
    Object.keys(notificationInstance).forEach(function(cacheKey) {
      return Promise.resolve(notificationInstance[cacheKey]).then(function(instance) {
        instance.removeNotice(key2);
      });
    });
  },
  config: setNotificationConfig,
  destroy: function destroy2() {
    Object.keys(notificationInstance).forEach(function(cacheKey) {
      Promise.resolve(notificationInstance[cacheKey]).then(function(instance) {
        instance.destroy();
      });
      delete notificationInstance[cacheKey];
    });
  }
};
var iconTypes = ["success", "info", "warning", "error"];
iconTypes.forEach(function(type) {
  api[type] = function(args) {
    return api.open(_objectSpread2(_objectSpread2({}, args), {}, {
      type
    }));
  };
});
api.warn = api.warning;
const notification = api;
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var MARK_KEY = "vc-util-key";
function getMark() {
  var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, mark = _ref.mark;
  if (mark) {
    return mark.startsWith("data-") ? mark : "data-".concat(mark);
  }
  return MARK_KEY;
}
function getContainer2(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  var head = document.querySelector("head");
  return head || document.body;
}
function injectCSS(css) {
  var _option$csp;
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!canUseDom()) {
    return null;
  }
  var styleNode = document.createElement("style");
  if ((_option$csp = option.csp) !== null && _option$csp !== void 0 && _option$csp.nonce) {
    var _option$csp2;
    styleNode.nonce = (_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce;
  }
  styleNode.innerHTML = css;
  var container = getContainer2(option);
  var firstChild = container.firstChild;
  if (option.prepend && container.prepend) {
    container.prepend(styleNode);
  } else if (option.prepend && firstChild) {
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
var containerCache = /* @__PURE__ */ new Map();
function findExistNode(key2) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var container = getContainer2(option);
  return Array.from(containerCache.get(container).children).find(function(node) {
    return node.tagName === "STYLE" && node.getAttribute(getMark(option)) === key2;
  });
}
function updateCSS(css, key2) {
  var option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var container = getContainer2(option);
  if (!containerCache.has(container)) {
    var placeholderStyle = injectCSS("", option);
    var parentNode = placeholderStyle.parentNode;
    containerCache.set(container, parentNode);
    parentNode.removeChild(placeholderStyle);
  }
  var existNode = findExistNode(key2, option);
  if (existNode) {
    var _option$csp3, _option$csp4;
    if ((_option$csp3 = option.csp) !== null && _option$csp3 !== void 0 && _option$csp3.nonce && existNode.nonce !== ((_option$csp4 = option.csp) === null || _option$csp4 === void 0 ? void 0 : _option$csp4.nonce)) {
      var _option$csp5;
      existNode.nonce = (_option$csp5 = option.csp) === null || _option$csp5 === void 0 ? void 0 : _option$csp5.nonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  var newNode = injectCSS(css, option);
  newNode.setAttribute(getMark(option), key2);
  return newNode;
}
const devWarning = function(valid, component, message2) {
  warningOnce(valid, "[ant-design-vue: ".concat(component, "] ").concat(message2));
};
var dynamicStyleMark = "-ant-".concat(Date.now(), "-").concat(Math.random());
function registerTheme(globalPrefixCls, theme) {
  var variables = {};
  var formatColor = function formatColor2(color, updater) {
    var clone = color.clone();
    clone = (updater === null || updater === void 0 ? void 0 : updater(clone)) || clone;
    return clone.toRgbString();
  };
  var fillColor = function fillColor2(colorVal, type) {
    var baseColor = new TinyColor(colorVal);
    var colorPalettes = generate$1(baseColor.toRgbString());
    variables["".concat(type, "-color")] = formatColor(baseColor);
    variables["".concat(type, "-color-disabled")] = colorPalettes[1];
    variables["".concat(type, "-color-hover")] = colorPalettes[4];
    variables["".concat(type, "-color-active")] = colorPalettes[6];
    variables["".concat(type, "-color-outline")] = baseColor.clone().setAlpha(0.2).toRgbString();
    variables["".concat(type, "-color-deprecated-bg")] = colorPalettes[1];
    variables["".concat(type, "-color-deprecated-border")] = colorPalettes[3];
  };
  if (theme.primaryColor) {
    fillColor(theme.primaryColor, "primary");
    var primaryColor = new TinyColor(theme.primaryColor);
    var primaryColors = generate$1(primaryColor.toRgbString());
    primaryColors.forEach(function(color, index2) {
      variables["primary-".concat(index2 + 1)] = color;
    });
    variables["primary-color-deprecated-l-35"] = formatColor(primaryColor, function(c2) {
      return c2.lighten(35);
    });
    variables["primary-color-deprecated-l-20"] = formatColor(primaryColor, function(c2) {
      return c2.lighten(20);
    });
    variables["primary-color-deprecated-t-20"] = formatColor(primaryColor, function(c2) {
      return c2.tint(20);
    });
    variables["primary-color-deprecated-t-50"] = formatColor(primaryColor, function(c2) {
      return c2.tint(50);
    });
    variables["primary-color-deprecated-f-12"] = formatColor(primaryColor, function(c2) {
      return c2.setAlpha(c2.getAlpha() * 0.12);
    });
    var primaryActiveColor = new TinyColor(primaryColors[0]);
    variables["primary-color-active-deprecated-f-30"] = formatColor(primaryActiveColor, function(c2) {
      return c2.setAlpha(c2.getAlpha() * 0.3);
    });
    variables["primary-color-active-deprecated-d-02"] = formatColor(primaryActiveColor, function(c2) {
      return c2.darken(2);
    });
  }
  if (theme.successColor) {
    fillColor(theme.successColor, "success");
  }
  if (theme.warningColor) {
    fillColor(theme.warningColor, "warning");
  }
  if (theme.errorColor) {
    fillColor(theme.errorColor, "error");
  }
  if (theme.infoColor) {
    fillColor(theme.infoColor, "info");
  }
  var cssList = Object.keys(variables).map(function(key2) {
    return "--".concat(globalPrefixCls, "-").concat(key2, ": ").concat(variables[key2], ";");
  });
  if (canUseDom()) {
    updateCSS("\n  :root {\n    ".concat(cssList.join("\n"), "\n  }\n  "), "".concat(dynamicStyleMark, "-dynamic-theme"));
  } else {
    devWarning(false, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
  }
}
var GlobalFormContextKey = Symbol("GlobalFormContextKey");
var useProvideGlobalForm = function useProvideGlobalForm2(state) {
  provide(GlobalFormContextKey, state);
};
var configProviderProps = function configProviderProps2() {
  return {
    getTargetContainer: {
      type: Function
    },
    getPopupContainer: {
      type: Function
    },
    prefixCls: String,
    getPrefixCls: {
      type: Function
    },
    renderEmpty: {
      type: Function
    },
    transformCellText: {
      type: Function
    },
    csp: {
      type: Object,
      default: void 0
    },
    input: {
      type: Object
    },
    autoInsertSpaceInButton: {
      type: Boolean,
      default: void 0
    },
    locale: {
      type: Object,
      default: void 0
    },
    pageHeader: {
      type: Object
    },
    componentSize: {
      type: String
    },
    direction: {
      type: String
    },
    space: {
      type: Object
    },
    virtual: {
      type: Boolean,
      default: void 0
    },
    dropdownMatchSelectWidth: {
      type: [Number, Boolean],
      default: true
    },
    form: {
      type: Object,
      default: void 0
    },
    // internal use
    notUpdateGlobalConfig: Boolean
  };
};
var defaultPrefixCls = "ant";
function getGlobalPrefixCls() {
  return globalConfigForApi.prefixCls || defaultPrefixCls;
}
var globalConfigByCom = reactive({});
var globalConfigBySet = reactive({});
var globalConfigForApi = reactive({});
watchEffect(function() {
  _extends(globalConfigForApi, globalConfigByCom, globalConfigBySet);
  globalConfigForApi.prefixCls = getGlobalPrefixCls();
  globalConfigForApi.getPrefixCls = function(suffixCls, customizePrefixCls) {
    if (customizePrefixCls)
      return customizePrefixCls;
    return suffixCls ? "".concat(globalConfigForApi.prefixCls, "-").concat(suffixCls) : globalConfigForApi.prefixCls;
  };
  globalConfigForApi.getRootPrefixCls = function(rootPrefixCls, customizePrefixCls) {
    if (rootPrefixCls) {
      return rootPrefixCls;
    }
    if (globalConfigForApi.prefixCls) {
      return globalConfigForApi.prefixCls;
    }
    if (customizePrefixCls && customizePrefixCls.includes("-")) {
      return customizePrefixCls.replace(/^(.*)-[^-]*$/, "$1");
    }
    return getGlobalPrefixCls();
  };
});
var stopWatchEffect;
var setGlobalConfig = function setGlobalConfig2(params) {
  if (stopWatchEffect) {
    stopWatchEffect();
  }
  stopWatchEffect = watchEffect(function() {
    _extends(globalConfigBySet, reactive(params));
    _extends(globalConfigForApi, reactive(params));
  });
  if (params.theme) {
    registerTheme(getGlobalPrefixCls(), params.theme);
  }
};
var globalConfig = function globalConfig2() {
  return {
    getPrefixCls: function getPrefixCls2(suffixCls, customizePrefixCls) {
      if (customizePrefixCls)
        return customizePrefixCls;
      return suffixCls ? "".concat(getGlobalPrefixCls(), "-").concat(suffixCls) : getGlobalPrefixCls();
    },
    getRootPrefixCls: function getRootPrefixCls(rootPrefixCls, customizePrefixCls) {
      if (rootPrefixCls) {
        return rootPrefixCls;
      }
      if (globalConfigForApi.prefixCls) {
        return globalConfigForApi.prefixCls;
      }
      if (customizePrefixCls && customizePrefixCls.includes("-")) {
        return customizePrefixCls.replace(/^(.*)-[^-]*$/, "$1");
      }
      return getGlobalPrefixCls();
    }
  };
};
var ConfigProvider = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AConfigProvider",
  inheritAttrs: false,
  props: configProviderProps(),
  setup: function setup6(props, _ref) {
    var slots = _ref.slots;
    var getPrefixCls2 = function getPrefixCls3(suffixCls, customizePrefixCls) {
      var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "ant" : _props$prefixCls;
      if (customizePrefixCls)
        return customizePrefixCls;
      return suffixCls ? "".concat(prefixCls, "-").concat(suffixCls) : prefixCls;
    };
    var renderEmptyComponent = function renderEmptyComponent2(name) {
      var renderEmpty$1 = props.renderEmpty || slots.renderEmpty || renderEmpty;
      return renderEmpty$1(name);
    };
    var getPrefixClsWrapper = function getPrefixClsWrapper2(suffixCls, customizePrefixCls) {
      var prefixCls = props.prefixCls;
      if (customizePrefixCls)
        return customizePrefixCls;
      var mergedPrefixCls = prefixCls || getPrefixCls2("");
      return suffixCls ? "".concat(mergedPrefixCls, "-").concat(suffixCls) : mergedPrefixCls;
    };
    var configProvider = reactive(_objectSpread2(_objectSpread2({}, props), {}, {
      getPrefixCls: getPrefixClsWrapper,
      renderEmpty: renderEmptyComponent
    }));
    Object.keys(props).forEach(function(key2) {
      watch(function() {
        return props[key2];
      }, function() {
        configProvider[key2] = props[key2];
      });
    });
    if (!props.notUpdateGlobalConfig) {
      _extends(globalConfigByCom, configProvider);
      watch(configProvider, function() {
        _extends(globalConfigByCom, configProvider);
      });
    }
    var validateMessagesRef = computed(function() {
      var validateMessages = {};
      if (props.locale) {
        var _props$locale$Form, _defaultLocale$Form;
        validateMessages = ((_props$locale$Form = props.locale.Form) === null || _props$locale$Form === void 0 ? void 0 : _props$locale$Form.defaultValidateMessages) || ((_defaultLocale$Form = defaultLocale.Form) === null || _defaultLocale$Form === void 0 ? void 0 : _defaultLocale$Form.defaultValidateMessages) || {};
      }
      if (props.form && props.form.validateMessages) {
        validateMessages = _objectSpread2(_objectSpread2({}, validateMessages), props.form.validateMessages);
      }
      return validateMessages;
    });
    useProvideGlobalForm({
      validateMessages: validateMessagesRef
    });
    provide("configProvider", configProvider);
    var renderProvider = function renderProvider2(legacyLocale) {
      var _slots$default;
      return createVNode(LocaleProvider$1, {
        "locale": props.locale || legacyLocale,
        "ANT_MARK__": ANT_MARK
      }, {
        default: function _default2() {
          return [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)];
        }
      });
    };
    watchEffect(function() {
      if (props.direction) {
        message.config({
          rtl: props.direction === "rtl"
        });
        notification.config({
          rtl: props.direction === "rtl"
        });
      }
    });
    return function() {
      return createVNode(LocaleReceiver, {
        "children": function children(_2, __, legacyLocale) {
          return renderProvider(legacyLocale);
        }
      }, null);
    };
  }
});
var defaultConfigProvider = reactive({
  getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
    if (customizePrefixCls)
      return customizePrefixCls;
    return suffixCls ? "ant-".concat(suffixCls) : "ant";
  },
  renderEmpty,
  direction: "ltr"
});
ConfigProvider.config = setGlobalConfig;
ConfigProvider.install = function(app) {
  app.component(ConfigProvider.name, ConfigProvider);
};
const useConfigInject = function(name, props) {
  var configProvider = inject("configProvider", defaultConfigProvider);
  var prefixCls = computed(function() {
    return configProvider.getPrefixCls(name, props.prefixCls);
  });
  var direction = computed(function() {
    var _props$direction;
    return (_props$direction = props.direction) !== null && _props$direction !== void 0 ? _props$direction : configProvider.direction;
  });
  var rootPrefixCls = computed(function() {
    return configProvider.getPrefixCls();
  });
  var autoInsertSpaceInButton = computed(function() {
    return configProvider.autoInsertSpaceInButton;
  });
  var renderEmpty2 = computed(function() {
    return configProvider.renderEmpty;
  });
  var space = computed(function() {
    return configProvider.space;
  });
  var pageHeader = computed(function() {
    return configProvider.pageHeader;
  });
  var form = computed(function() {
    return configProvider.form;
  });
  var getTargetContainer = computed(function() {
    return props.getTargetContainer || configProvider.getTargetContainer;
  });
  var getPopupContainer = computed(function() {
    return props.getPopupContainer || configProvider.getPopupContainer;
  });
  var dropdownMatchSelectWidth = computed(function() {
    var _props$dropdownMatchS;
    return (_props$dropdownMatchS = props.dropdownMatchSelectWidth) !== null && _props$dropdownMatchS !== void 0 ? _props$dropdownMatchS : configProvider.dropdownMatchSelectWidth;
  });
  var virtual = computed(function() {
    return (props.virtual === void 0 ? configProvider.virtual !== false : props.virtual !== false) && dropdownMatchSelectWidth.value !== false;
  });
  var size = computed(function() {
    return props.size || configProvider.componentSize;
  });
  var autocomplete = computed(function() {
    var _configProvider$input;
    return props.autocomplete || ((_configProvider$input = configProvider.input) === null || _configProvider$input === void 0 ? void 0 : _configProvider$input.autocomplete);
  });
  var csp = computed(function() {
    return configProvider.csp;
  });
  return {
    configProvider,
    prefixCls,
    direction,
    size,
    getTargetContainer,
    getPopupContainer,
    space,
    pageHeader,
    form,
    autoInsertSpaceInButton,
    renderEmpty: renderEmpty2,
    virtual,
    dropdownMatchSelectWidth,
    rootPrefixCls,
    getPrefixCls: configProvider.getPrefixCls,
    autocomplete,
    csp
  };
};
function omit(obj, fields) {
  var shallowCopy = _extends({}, obj);
  for (var i2 = 0; i2 < fields.length; i2 += 1) {
    var key2 = fields[i2];
    delete shallowCopy[key2];
  }
  return shallowCopy;
}
function cloneElement(vnode) {
  var nodeProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var mergeRef = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var ele = vnode;
  if (Array.isArray(vnode)) {
    ele = filterEmpty(vnode)[0];
  }
  if (!ele) {
    return null;
  }
  var node = cloneVNode(ele, nodeProps, mergeRef);
  node.props = override ? _objectSpread2(_objectSpread2({}, node.props), nodeProps) : node.props;
  warning$1(_typeof$1(node.props.class) !== "object", "class must be string");
  return node;
}
function onCompositionStart(e2) {
  e2.target.composing = true;
}
function onCompositionEnd(e2) {
  if (!e2.target.composing)
    return;
  e2.target.composing = false;
  trigger(e2.target, "input");
}
function trigger(el, type) {
  var e2 = document.createEvent("HTMLEvents");
  e2.initEvent(type, true, true);
  el.dispatchEvent(e2);
}
function addEventListener$1(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
var antInput = {
  created: function created(el, binding) {
    if (!binding.modifiers || !binding.modifiers.lazy) {
      addEventListener$1(el, "compositionstart", onCompositionStart);
      addEventListener$1(el, "compositionend", onCompositionEnd);
      addEventListener$1(el, "change", onCompositionEnd);
    }
  }
};
const antInputDirective = antInput;
var SearchOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" } }] }, "name": "search", "theme": "outlined" };
const SearchOutlinedSvg = SearchOutlined$2;
function _objectSpread$2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$2(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$2(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var SearchOutlined = function SearchOutlined2(props, context) {
  var p = _objectSpread$2({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$2({}, p, {
    "icon": SearchOutlinedSvg
  }), null);
};
SearchOutlined.displayName = "SearchOutlined";
SearchOutlined.inheritAttrs = false;
const SearchOutlined$1 = SearchOutlined;
var ContextKey = Symbol("ContextProps");
var InternalContextKey = Symbol("InternalContextProps");
var defaultContext = {
  id: computed(function() {
    return void 0;
  }),
  onFieldBlur: function onFieldBlur() {
  },
  onFieldChange: function onFieldChange() {
  },
  clearValidate: function clearValidate() {
  }
};
var defaultInternalContext = {
  addFormItemField: function addFormItemField() {
  },
  removeFormItemField: function removeFormItemField() {
  }
};
var useInjectFormItemContext = function useInjectFormItemContext2() {
  var internalContext = inject(InternalContextKey, defaultInternalContext);
  var formItemFieldKey = Symbol("FormItemFieldKey");
  var instance = getCurrentInstance();
  internalContext.addFormItemField(formItemFieldKey, instance.type);
  onBeforeUnmount(function() {
    internalContext.removeFormItemField(formItemFieldKey);
  });
  provide(InternalContextKey, defaultInternalContext);
  provide(ContextKey, defaultContext);
  return inject(ContextKey, defaultContext);
};
defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AFormItemRest",
  setup: function setup7(_2, _ref) {
    var slots = _ref.slots;
    provide(InternalContextKey, defaultInternalContext);
    provide(ContextKey, defaultContext);
    return function() {
      var _slots$default;
      return (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots);
    };
  }
});
var START_EVENT_NAME_MAP = {
  transitionstart: {
    transition: "transitionstart",
    WebkitTransition: "webkitTransitionStart",
    MozTransition: "mozTransitionStart",
    OTransition: "oTransitionStart",
    msTransition: "MSTransitionStart"
  },
  animationstart: {
    animation: "animationstart",
    WebkitAnimation: "webkitAnimationStart",
    MozAnimation: "mozAnimationStart",
    OAnimation: "oAnimationStart",
    msAnimation: "MSAnimationStart"
  }
};
var END_EVENT_NAME_MAP = {
  transitionend: {
    transition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "mozTransitionEnd",
    OTransition: "oTransitionEnd",
    msTransition: "MSTransitionEnd"
  },
  animationend: {
    animation: "animationend",
    WebkitAnimation: "webkitAnimationEnd",
    MozAnimation: "mozAnimationEnd",
    OAnimation: "oAnimationEnd",
    msAnimation: "MSAnimationEnd"
  }
};
var startEvents = [];
var endEvents = [];
function detectEvents() {
  var testEl = document.createElement("div");
  var style = testEl.style;
  if (!("AnimationEvent" in window)) {
    delete START_EVENT_NAME_MAP.animationstart.animation;
    delete END_EVENT_NAME_MAP.animationend.animation;
  }
  if (!("TransitionEvent" in window)) {
    delete START_EVENT_NAME_MAP.transitionstart.transition;
    delete END_EVENT_NAME_MAP.transitionend.transition;
  }
  function process2(EVENT_NAME_MAP, events) {
    for (var baseEventName in EVENT_NAME_MAP) {
      if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
        var baseEvents = EVENT_NAME_MAP[baseEventName];
        for (var styleName in baseEvents) {
          if (styleName in style) {
            events.push(baseEvents[styleName]);
            break;
          }
        }
      }
    }
  }
  process2(START_EVENT_NAME_MAP, startEvents);
  process2(END_EVENT_NAME_MAP, endEvents);
}
if (typeof window !== "undefined" && typeof document !== "undefined") {
  detectEvents();
}
function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}
function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}
var TransitionEvents = {
  // Start events
  startEvents,
  addStartEventListener: function addStartEventListener(node, eventListener) {
    if (startEvents.length === 0) {
      setTimeout(eventListener, 0);
      return;
    }
    startEvents.forEach(function(startEvent) {
      addEventListener(node, startEvent, eventListener);
    });
  },
  removeStartEventListener: function removeStartEventListener(node, eventListener) {
    if (startEvents.length === 0) {
      return;
    }
    startEvents.forEach(function(startEvent) {
      removeEventListener(node, startEvent, eventListener);
    });
  },
  // End events
  endEvents,
  addEndEventListener: function addEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function(endEvent) {
      addEventListener(node, endEvent, eventListener);
    });
  },
  removeEndEventListener: function removeEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function(endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  }
};
const TransitionEvents$1 = TransitionEvents;
var styleForPesudo;
function isHidden(element) {
  if (process.env.NODE_ENV === "test") {
    return false;
  }
  return !element || element.offsetParent === null;
}
function isNotGrey(color) {
  var match2 = (color || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
  if (match2 && match2[1] && match2[2] && match2[3]) {
    return !(match2[1] === match2[2] && match2[2] === match2[3]);
  }
  return true;
}
const Wave = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Wave",
  props: {
    insertExtraNode: Boolean,
    disabled: Boolean
  },
  setup: function setup8(props, _ref) {
    var slots = _ref.slots, expose = _ref.expose;
    var instance = getCurrentInstance();
    var _useConfigInject = useConfigInject("", props), csp = _useConfigInject.csp, prefixCls = _useConfigInject.prefixCls;
    expose({
      csp
    });
    var eventIns = null;
    var clickWaveTimeoutId = null;
    var animationStartId = null;
    var animationStart = false;
    var extraNode = null;
    var isUnmounted = false;
    var onTransitionStart = function onTransitionStart2(e2) {
      if (isUnmounted)
        return;
      var node = findDOMNode(instance);
      if (!e2 || e2.target !== node) {
        return;
      }
      if (!animationStart) {
        resetEffect(node);
      }
    };
    var onTransitionEnd = function onTransitionEnd2(e2) {
      if (!e2 || e2.animationName !== "fadeEffect") {
        return;
      }
      resetEffect(e2.target);
    };
    var getAttributeName = function getAttributeName2() {
      var insertExtraNode = props.insertExtraNode;
      return insertExtraNode ? "".concat(prefixCls.value, "-click-animating") : "".concat(prefixCls.value, "-click-animating-without-extra-node");
    };
    var onClick = function onClick2(node, waveColor) {
      var insertExtraNode = props.insertExtraNode, disabled = props.disabled;
      if (disabled || !node || isHidden(node) || node.className.indexOf("-leave") >= 0) {
        return;
      }
      extraNode = document.createElement("div");
      extraNode.className = "".concat(prefixCls.value, "-click-animating-node");
      var attributeName = getAttributeName();
      node.removeAttribute(attributeName);
      node.setAttribute(attributeName, "true");
      styleForPesudo = styleForPesudo || document.createElement("style");
      if (waveColor && waveColor !== "#ffffff" && waveColor !== "rgb(255, 255, 255)" && isNotGrey(waveColor) && !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) && // any transparent rgba color
      waveColor !== "transparent") {
        var _csp$value;
        if ((_csp$value = csp.value) !== null && _csp$value !== void 0 && _csp$value.nonce) {
          styleForPesudo.nonce = csp.value.nonce;
        }
        extraNode.style.borderColor = waveColor;
        styleForPesudo.innerHTML = "\n        [".concat(prefixCls.value, "-click-animating-without-extra-node='true']::after, .").concat(prefixCls.value, "-click-animating-node {\n          --antd-wave-shadow-color: ").concat(waveColor, ";\n        }");
        if (!document.body.contains(styleForPesudo)) {
          document.body.appendChild(styleForPesudo);
        }
      }
      if (insertExtraNode) {
        node.appendChild(extraNode);
      }
      TransitionEvents$1.addStartEventListener(node, onTransitionStart);
      TransitionEvents$1.addEndEventListener(node, onTransitionEnd);
    };
    var resetEffect = function resetEffect2(node) {
      if (!node || node === extraNode || !(node instanceof Element)) {
        return;
      }
      var insertExtraNode = props.insertExtraNode;
      var attributeName = getAttributeName();
      node.setAttribute(attributeName, "false");
      if (styleForPesudo) {
        styleForPesudo.innerHTML = "";
      }
      if (insertExtraNode && extraNode && node.contains(extraNode)) {
        node.removeChild(extraNode);
      }
      TransitionEvents$1.removeStartEventListener(node, onTransitionStart);
      TransitionEvents$1.removeEndEventListener(node, onTransitionEnd);
    };
    var bindAnimationEvent = function bindAnimationEvent2(node) {
      if (!node || !node.getAttribute || node.getAttribute("disabled") || node.className.indexOf("disabled") >= 0) {
        return;
      }
      var newClick = function newClick2(e2) {
        if (e2.target.tagName === "INPUT" || isHidden(e2.target)) {
          return;
        }
        resetEffect(node);
        var waveColor = getComputedStyle(node).getPropertyValue("border-top-color") || // Firefox Compatible
        getComputedStyle(node).getPropertyValue("border-color") || getComputedStyle(node).getPropertyValue("background-color");
        clickWaveTimeoutId = setTimeout(function() {
          return onClick(node, waveColor);
        }, 0);
        wrapperRaf.cancel(animationStartId);
        animationStart = true;
        animationStartId = wrapperRaf(function() {
          animationStart = false;
        }, 10);
      };
      node.addEventListener("click", newClick, true);
      return {
        cancel: function cancel() {
          node.removeEventListener("click", newClick, true);
        }
      };
    };
    onMounted(function() {
      nextTick(function() {
        var node = findDOMNode(instance);
        if (node.nodeType !== 1) {
          return;
        }
        eventIns = bindAnimationEvent(node);
      });
    });
    onBeforeUnmount(function() {
      if (eventIns) {
        eventIns.cancel();
      }
      clearTimeout(clickWaveTimeoutId);
      isUnmounted = true;
    });
    return function() {
      var _slots$default;
      return (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)[0];
    };
  }
});
var buttonProps = function buttonProps2() {
  return {
    prefixCls: String,
    type: String,
    htmlType: {
      type: String,
      default: "button"
    },
    shape: {
      type: String
    },
    size: {
      type: String
    },
    loading: {
      type: [Boolean, Object],
      default: function _default2() {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    ghost: {
      type: Boolean,
      default: void 0
    },
    block: {
      type: Boolean,
      default: void 0
    },
    danger: {
      type: Boolean,
      default: void 0
    },
    icon: PropTypes$1.any,
    href: String,
    target: String,
    title: String,
    onClick: {
      type: Function
    },
    onMousedown: {
      type: Function
    }
  };
};
const buttonTypes = buttonProps;
var getCollapsedWidth = function getCollapsedWidth2(node) {
  if (node) {
    node.style.width = "0px";
    node.style.opacity = "0";
    node.style.transform = "scale(0)";
  }
};
var getRealWidth = function getRealWidth2(node) {
  nextTick(function() {
    if (node) {
      node.style.width = "".concat(node.scrollWidth, "px");
      node.style.opacity = "1";
      node.style.transform = "scale(1)";
    }
  });
};
var resetStyle = function resetStyle2(node) {
  if (node && node.style) {
    node.style.width = null;
    node.style.opacity = null;
    node.style.transform = null;
  }
};
const LoadingIcon = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "LoadingIcon",
  props: {
    prefixCls: String,
    loading: [Boolean, Object],
    existIcon: Boolean
  },
  setup: function setup9(props) {
    return function() {
      var existIcon = props.existIcon, prefixCls = props.prefixCls, loading = props.loading;
      if (existIcon) {
        return createVNode("span", {
          "class": "".concat(prefixCls, "-loading-icon")
        }, [createVNode(LoadingOutlined$1, null, null)]);
      }
      var visible = !!loading;
      return createVNode(Transition, {
        "name": "".concat(prefixCls, "-loading-icon-motion"),
        "onBeforeEnter": getCollapsedWidth,
        "onEnter": getRealWidth,
        "onAfterEnter": resetStyle,
        "onBeforeLeave": getRealWidth,
        "onLeave": function onLeave(node) {
          setTimeout(function() {
            getCollapsedWidth(node);
          });
        },
        "onAfterLeave": resetStyle
      }, {
        default: function _default2() {
          return [visible ? createVNode("span", {
            "class": "".concat(prefixCls, "-loading-icon")
          }, [createVNode(LoadingOutlined$1, null, null)]) : null];
        }
      });
    };
  }
});
var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isUnborderedButtonType(type) {
  return type === "text" || type === "link";
}
const Button = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AButton",
  inheritAttrs: false,
  __ANT_BUTTON: true,
  props: initDefaultProps$1(buttonTypes(), {
    type: "default"
  }),
  slots: ["icon"],
  // emits: ['click', 'mousedown'],
  setup: function setup10(props, _ref) {
    var slots = _ref.slots, attrs = _ref.attrs, emit = _ref.emit;
    var _useConfigInject = useConfigInject("btn", props), prefixCls = _useConfigInject.prefixCls, autoInsertSpaceInButton = _useConfigInject.autoInsertSpaceInButton, direction = _useConfigInject.direction, size = _useConfigInject.size;
    var buttonNodeRef = ref(null);
    var delayTimeoutRef = ref(void 0);
    var isNeedInserted = false;
    var innerLoading = ref(false);
    var hasTwoCNChar = ref(false);
    var autoInsertSpace = computed(function() {
      return autoInsertSpaceInButton.value !== false;
    });
    var loadingOrDelay = computed(function() {
      return _typeof$1(props.loading) === "object" && props.loading.delay ? props.loading.delay || true : !!props.loading;
    });
    watch(loadingOrDelay, function(val) {
      clearTimeout(delayTimeoutRef.value);
      if (typeof loadingOrDelay.value === "number") {
        delayTimeoutRef.value = setTimeout(function() {
          innerLoading.value = val;
        }, loadingOrDelay.value);
      } else {
        innerLoading.value = val;
      }
    }, {
      immediate: true
    });
    var classes = computed(function() {
      var _ref2;
      var type = props.type, _props$shape = props.shape, shape = _props$shape === void 0 ? "default" : _props$shape, ghost = props.ghost, block = props.block, danger = props.danger;
      var pre = prefixCls.value;
      var sizeClassNameMap = {
        large: "lg",
        small: "sm",
        middle: void 0
      };
      var sizeFullname = size.value;
      var sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || "" : "";
      return _ref2 = {}, _defineProperty$g(_ref2, "".concat(pre), true), _defineProperty$g(_ref2, "".concat(pre, "-").concat(type), type), _defineProperty$g(_ref2, "".concat(pre, "-").concat(shape), shape !== "default" && shape), _defineProperty$g(_ref2, "".concat(pre, "-").concat(sizeCls), sizeCls), _defineProperty$g(_ref2, "".concat(pre, "-loading"), innerLoading.value), _defineProperty$g(_ref2, "".concat(pre, "-background-ghost"), ghost && !isUnborderedButtonType(type)), _defineProperty$g(_ref2, "".concat(pre, "-two-chinese-chars"), hasTwoCNChar.value && autoInsertSpace.value), _defineProperty$g(_ref2, "".concat(pre, "-block"), block), _defineProperty$g(_ref2, "".concat(pre, "-dangerous"), !!danger), _defineProperty$g(_ref2, "".concat(pre, "-rtl"), direction.value === "rtl"), _ref2;
    });
    var fixTwoCNChar = function fixTwoCNChar2() {
      var node = buttonNodeRef.value;
      if (!node || autoInsertSpaceInButton.value === false) {
        return;
      }
      var buttonText = node.textContent;
      if (isNeedInserted && isTwoCNChar(buttonText)) {
        if (!hasTwoCNChar.value) {
          hasTwoCNChar.value = true;
        }
      } else if (hasTwoCNChar.value) {
        hasTwoCNChar.value = false;
      }
    };
    var handleClick = function handleClick2(event) {
      if (innerLoading.value || props.disabled) {
        event.preventDefault();
        return;
      }
      emit("click", event);
    };
    var insertSpace = function insertSpace2(child, needInserted) {
      var SPACE = needInserted ? " " : "";
      if (child.type === Text) {
        var text = child.children.trim();
        if (isTwoCNChar(text)) {
          text = text.split("").join(SPACE);
        }
        return createVNode("span", null, [text]);
      }
      return child;
    };
    watchEffect(function() {
      devWarning(!(props.ghost && isUnborderedButtonType(props.type)), "Button", "`link` or `text` button can't be a `ghost` button.");
    });
    onMounted(fixTwoCNChar);
    onUpdated(fixTwoCNChar);
    onBeforeUnmount(function() {
      delayTimeoutRef.value && clearTimeout(delayTimeoutRef.value);
    });
    return function() {
      var _slots$icon, _slots$default;
      var _props$icon = props.icon, icon = _props$icon === void 0 ? (_slots$icon = slots.icon) === null || _slots$icon === void 0 ? void 0 : _slots$icon.call(slots) : _props$icon;
      var children = flattenChildren((_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots));
      isNeedInserted = children.length === 1 && !icon && !isUnborderedButtonType(props.type);
      var type = props.type, htmlType = props.htmlType, disabled = props.disabled, href = props.href, title = props.title, target = props.target, onMousedown = props.onMousedown;
      var iconType = innerLoading.value ? "loading" : icon;
      var buttonProps3 = _objectSpread2(_objectSpread2({}, attrs), {}, {
        title,
        disabled,
        class: [classes.value, attrs.class, _defineProperty$g({}, "".concat(prefixCls.value, "-icon-only"), children.length === 0 && !!iconType)],
        onClick: handleClick,
        onMousedown
      });
      if (!disabled) {
        delete buttonProps3.disabled;
      }
      var iconNode = icon && !innerLoading.value ? icon : createVNode(LoadingIcon, {
        "existIcon": !!icon,
        "prefixCls": prefixCls.value,
        "loading": !!innerLoading.value
      }, null);
      var kids = children.map(function(child) {
        return insertSpace(child, isNeedInserted && autoInsertSpace.value);
      });
      if (href !== void 0) {
        return createVNode("a", _objectSpread2(_objectSpread2({}, buttonProps3), {}, {
          "href": href,
          "target": target,
          "ref": buttonNodeRef
        }), [iconNode, kids]);
      }
      var buttonNode = createVNode("button", _objectSpread2(_objectSpread2({}, buttonProps3), {}, {
        "ref": buttonNodeRef,
        "type": htmlType
      }), [iconNode, kids]);
      if (isUnborderedButtonType(type)) {
        return buttonNode;
      }
      return createVNode(Wave, {
        "ref": "wave",
        "disabled": !!innerLoading.value
      }, {
        default: function _default2() {
          return [buttonNode];
        }
      });
    };
  }
});
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var UnreachableException = /* @__PURE__ */ _createClass(function UnreachableException2(value) {
  _classCallCheck(this, UnreachableException2);
  this.error = new Error("unreachable case: ".concat(JSON.stringify(value)));
});
var buttonGroupProps = function buttonGroupProps2() {
  return {
    prefixCls: String,
    size: {
      type: String
    }
  };
};
const ButtonGroup = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AButtonGroup",
  props: buttonGroupProps(),
  setup: function setup11(props, _ref) {
    var slots = _ref.slots;
    var _useConfigInject = useConfigInject("btn-group", props), prefixCls = _useConfigInject.prefixCls, direction = _useConfigInject.direction;
    var classes = computed(function() {
      var _ref2;
      var size = props.size;
      var sizeCls = "";
      switch (size) {
        case "large":
          sizeCls = "lg";
          break;
        case "small":
          sizeCls = "sm";
          break;
        case "middle":
        case void 0:
          break;
        default:
          console.warn(new UnreachableException(size).error);
      }
      return _ref2 = {}, _defineProperty$g(_ref2, "".concat(prefixCls.value), true), _defineProperty$g(_ref2, "".concat(prefixCls.value, "-").concat(sizeCls), sizeCls), _defineProperty$g(_ref2, "".concat(prefixCls.value, "-rtl"), direction.value === "rtl"), _ref2;
    });
    return function() {
      var _slots$default;
      return createVNode("div", {
        "class": classes.value
      }, [flattenChildren((_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots))]);
    };
  }
});
Button.Group = ButtonGroup;
Button.install = function(app) {
  app.component(Button.name, Button);
  app.component(ButtonGroup.name, ButtonGroup);
  return app;
};
var inputProps = function inputProps2() {
  return {
    id: String,
    prefixCls: String,
    inputPrefixCls: String,
    defaultValue: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]),
    value: {
      type: [String, Number, Symbol],
      default: void 0
    },
    placeholder: {
      type: [String, Number]
    },
    autocomplete: String,
    type: {
      type: String,
      default: "text"
    },
    name: String,
    size: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    readonly: {
      type: Boolean,
      default: void 0
    },
    addonBefore: PropTypes$1.any,
    addonAfter: PropTypes$1.any,
    prefix: PropTypes$1.any,
    suffix: PropTypes$1.any,
    autofocus: {
      type: Boolean,
      default: void 0
    },
    allowClear: {
      type: Boolean,
      default: void 0
    },
    lazy: {
      type: Boolean,
      default: true
    },
    maxlength: Number,
    loading: {
      type: Boolean,
      default: void 0
    },
    bordered: {
      type: Boolean,
      default: void 0
    },
    showCount: {
      type: [Boolean, Object]
    },
    htmlSize: Number,
    onPressEnter: Function,
    onKeydown: Function,
    onKeyup: Function,
    onFocus: Function,
    onBlur: Function,
    onChange: Function,
    onInput: Function,
    "onUpdate:value": Function,
    valueModifiers: Object,
    hidden: Boolean
  };
};
const inputProps$1 = inputProps;
var textAreaProps = function textAreaProps2() {
  return _objectSpread2(_objectSpread2({}, omit(inputProps(), ["prefix", "addonBefore", "addonAfter", "suffix"])), {}, {
    rows: Number,
    autosize: {
      type: [Boolean, Object],
      default: void 0
    },
    autoSize: {
      type: [Boolean, Object],
      default: void 0
    },
    onResize: {
      type: Function
    },
    onCompositionstart: Function,
    onCompositionend: Function,
    valueModifiers: Object
  });
};
function getInputClassName(prefixCls, bordered, size, disabled, direction) {
  var _classNames;
  return classNames(prefixCls, (_classNames = {}, _defineProperty$g(_classNames, "".concat(prefixCls, "-sm"), size === "small"), _defineProperty$g(_classNames, "".concat(prefixCls, "-lg"), size === "large"), _defineProperty$g(_classNames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty$g(_classNames, "".concat(prefixCls, "-rtl"), direction === "rtl"), _defineProperty$g(_classNames, "".concat(prefixCls, "-borderless"), !bordered), _classNames));
}
var isValid2 = function isValid3(value) {
  return value !== void 0 && value !== null && (Array.isArray(value) ? filterEmpty(value).length : true);
};
function hasPrefixSuffix(propsAndSlots) {
  return isValid2(propsAndSlots.prefix) || isValid2(propsAndSlots.suffix) || isValid2(propsAndSlots.allowClear);
}
function hasAddon(propsAndSlots) {
  return isValid2(propsAndSlots.addonBefore) || isValid2(propsAndSlots.addonAfter);
}
var ClearableInputType = ["text", "input"];
const ClearableLabeledInput = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ClearableLabeledInput",
  inheritAttrs: false,
  props: {
    prefixCls: String,
    inputType: PropTypes$1.oneOf(tuple("text", "input")),
    value: PropTypes$1.any,
    defaultValue: PropTypes$1.any,
    allowClear: {
      type: Boolean,
      default: void 0
    },
    element: PropTypes$1.any,
    handleReset: Function,
    disabled: {
      type: Boolean,
      default: void 0
    },
    direction: {
      type: String
    },
    size: {
      type: String
    },
    suffix: PropTypes$1.any,
    prefix: PropTypes$1.any,
    addonBefore: PropTypes$1.any,
    addonAfter: PropTypes$1.any,
    readonly: {
      type: Boolean,
      default: void 0
    },
    focused: {
      type: Boolean,
      default: void 0
    },
    bordered: {
      type: Boolean,
      default: true
    },
    triggerFocus: {
      type: Function
    },
    hidden: Boolean
  },
  setup: function setup12(props, _ref) {
    var slots = _ref.slots, attrs = _ref.attrs;
    var containerRef = ref();
    var onInputMouseUp = function onInputMouseUp2(e2) {
      var _containerRef$value;
      if ((_containerRef$value = containerRef.value) !== null && _containerRef$value !== void 0 && _containerRef$value.contains(e2.target)) {
        var triggerFocus2 = props.triggerFocus;
        triggerFocus2 === null || triggerFocus2 === void 0 ? void 0 : triggerFocus2();
      }
    };
    var renderClearIcon = function renderClearIcon2(prefixCls) {
      var _classNames;
      var allowClear = props.allowClear, value = props.value, disabled = props.disabled, readonly = props.readonly, handleReset = props.handleReset, _props$suffix = props.suffix, suffix = _props$suffix === void 0 ? slots.suffix : _props$suffix;
      if (!allowClear) {
        return null;
      }
      var needClear = !disabled && !readonly && value;
      var className = "".concat(prefixCls, "-clear-icon");
      return createVNode(CloseCircleFilled$1, {
        "onClick": handleReset,
        "onMousedown": function onMousedown(e2) {
          return e2.preventDefault();
        },
        "class": classNames((_classNames = {}, _defineProperty$g(_classNames, "".concat(className, "-hidden"), !needClear), _defineProperty$g(_classNames, "".concat(className, "-has-suffix"), !!suffix), _classNames), className),
        "role": "button"
      }, null);
    };
    var renderSuffix = function renderSuffix2(prefixCls) {
      var _slots$suffix;
      var _props$suffix2 = props.suffix, suffix = _props$suffix2 === void 0 ? (_slots$suffix = slots.suffix) === null || _slots$suffix === void 0 ? void 0 : _slots$suffix.call(slots) : _props$suffix2, allowClear = props.allowClear;
      if (suffix || allowClear) {
        return createVNode("span", {
          "class": "".concat(prefixCls, "-suffix")
        }, [renderClearIcon(prefixCls), suffix]);
      }
      return null;
    };
    var renderLabeledIcon = function renderLabeledIcon2(prefixCls, element) {
      var _slots$prefix, _slots$suffix2, _classNames2;
      var focused = props.focused, value = props.value, _props$prefix = props.prefix, prefix = _props$prefix === void 0 ? (_slots$prefix = slots.prefix) === null || _slots$prefix === void 0 ? void 0 : _slots$prefix.call(slots) : _props$prefix, size = props.size, _props$suffix3 = props.suffix, suffix = _props$suffix3 === void 0 ? (_slots$suffix2 = slots.suffix) === null || _slots$suffix2 === void 0 ? void 0 : _slots$suffix2.call(slots) : _props$suffix3, disabled = props.disabled, allowClear = props.allowClear, direction = props.direction, readonly = props.readonly, bordered = props.bordered, hidden = props.hidden, _props$addonAfter = props.addonAfter, addonAfter = _props$addonAfter === void 0 ? slots.addonAfter : _props$addonAfter, _props$addonBefore = props.addonBefore, addonBefore = _props$addonBefore === void 0 ? slots.addonBefore : _props$addonBefore;
      var suffixNode = renderSuffix(prefixCls);
      if (!hasPrefixSuffix({
        prefix,
        suffix,
        allowClear
      })) {
        return cloneElement(element, {
          value
        });
      }
      var prefixNode = prefix ? createVNode("span", {
        "class": "".concat(prefixCls, "-prefix")
      }, [prefix]) : null;
      var affixWrapperCls = classNames("".concat(prefixCls, "-affix-wrapper"), (_classNames2 = {}, _defineProperty$g(_classNames2, "".concat(prefixCls, "-affix-wrapper-focused"), focused), _defineProperty$g(_classNames2, "".concat(prefixCls, "-affix-wrapper-disabled"), disabled), _defineProperty$g(_classNames2, "".concat(prefixCls, "-affix-wrapper-sm"), size === "small"), _defineProperty$g(_classNames2, "".concat(prefixCls, "-affix-wrapper-lg"), size === "large"), _defineProperty$g(_classNames2, "".concat(prefixCls, "-affix-wrapper-input-with-clear-btn"), suffix && allowClear && value), _defineProperty$g(_classNames2, "".concat(prefixCls, "-affix-wrapper-rtl"), direction === "rtl"), _defineProperty$g(_classNames2, "".concat(prefixCls, "-affix-wrapper-readonly"), readonly), _defineProperty$g(_classNames2, "".concat(prefixCls, "-affix-wrapper-borderless"), !bordered), _defineProperty$g(_classNames2, "".concat(attrs.class), !hasAddon({
        addonAfter,
        addonBefore
      }) && attrs.class), _classNames2));
      return createVNode("span", {
        "ref": containerRef,
        "class": affixWrapperCls,
        "style": attrs.style,
        "onMouseup": onInputMouseUp,
        "hidden": hidden
      }, [prefixNode, cloneElement(element, {
        style: null,
        value,
        class: getInputClassName(prefixCls, bordered, size, disabled)
      }), suffixNode]);
    };
    var renderInputWithLabel = function renderInputWithLabel2(prefixCls, labeledElement) {
      var _slots$addonBefore, _slots$addonAfter, _classNames4;
      var _props$addonBefore2 = props.addonBefore, addonBefore = _props$addonBefore2 === void 0 ? (_slots$addonBefore = slots.addonBefore) === null || _slots$addonBefore === void 0 ? void 0 : _slots$addonBefore.call(slots) : _props$addonBefore2, _props$addonAfter2 = props.addonAfter, addonAfter = _props$addonAfter2 === void 0 ? (_slots$addonAfter = slots.addonAfter) === null || _slots$addonAfter === void 0 ? void 0 : _slots$addonAfter.call(slots) : _props$addonAfter2, size = props.size, direction = props.direction, hidden = props.hidden;
      if (!hasAddon({
        addonBefore,
        addonAfter
      })) {
        return labeledElement;
      }
      var wrapperClassName = "".concat(prefixCls, "-group");
      var addonClassName = "".concat(wrapperClassName, "-addon");
      var addonBeforeNode = addonBefore ? createVNode("span", {
        "class": addonClassName
      }, [addonBefore]) : null;
      var addonAfterNode = addonAfter ? createVNode("span", {
        "class": addonClassName
      }, [addonAfter]) : null;
      var mergedWrapperClassName = classNames("".concat(prefixCls, "-wrapper"), wrapperClassName, _defineProperty$g({}, "".concat(wrapperClassName, "-rtl"), direction === "rtl"));
      var mergedGroupClassName = classNames("".concat(prefixCls, "-group-wrapper"), (_classNames4 = {}, _defineProperty$g(_classNames4, "".concat(prefixCls, "-group-wrapper-sm"), size === "small"), _defineProperty$g(_classNames4, "".concat(prefixCls, "-group-wrapper-lg"), size === "large"), _defineProperty$g(_classNames4, "".concat(prefixCls, "-group-wrapper-rtl"), direction === "rtl"), _classNames4), attrs.class);
      return createVNode("span", {
        "class": mergedGroupClassName,
        "style": attrs.style,
        "hidden": hidden
      }, [createVNode("span", {
        "class": mergedWrapperClassName
      }, [addonBeforeNode, cloneElement(labeledElement, {
        style: null
      }), addonAfterNode])]);
    };
    var renderTextAreaWithClearIcon = function renderTextAreaWithClearIcon2(prefixCls, element) {
      var _classNames5;
      var value = props.value, allowClear = props.allowClear, direction = props.direction, bordered = props.bordered, hidden = props.hidden, _props$addonAfter3 = props.addonAfter, addonAfter = _props$addonAfter3 === void 0 ? slots.addonAfter : _props$addonAfter3, _props$addonBefore3 = props.addonBefore, addonBefore = _props$addonBefore3 === void 0 ? slots.addonBefore : _props$addonBefore3;
      if (!allowClear) {
        return cloneElement(element, {
          value
        });
      }
      var affixWrapperCls = classNames("".concat(prefixCls, "-affix-wrapper"), "".concat(prefixCls, "-affix-wrapper-textarea-with-clear-btn"), (_classNames5 = {}, _defineProperty$g(_classNames5, "".concat(prefixCls, "-affix-wrapper-rtl"), direction === "rtl"), _defineProperty$g(_classNames5, "".concat(prefixCls, "-affix-wrapper-borderless"), !bordered), _defineProperty$g(_classNames5, "".concat(attrs.class), !hasAddon({
        addonAfter,
        addonBefore
      }) && attrs.class), _classNames5));
      return createVNode("span", {
        "class": affixWrapperCls,
        "style": attrs.style,
        "hidden": hidden
      }, [cloneElement(element, {
        style: null,
        value
      }), renderClearIcon(prefixCls)]);
    };
    return function() {
      var _slots$element;
      var prefixCls = props.prefixCls, inputType = props.inputType, _props$element = props.element, element = _props$element === void 0 ? (_slots$element = slots.element) === null || _slots$element === void 0 ? void 0 : _slots$element.call(slots) : _props$element;
      if (inputType === ClearableInputType[0]) {
        return renderTextAreaWithClearIcon(prefixCls, element);
      }
      return renderInputWithLabel(prefixCls, renderLabeledIcon(prefixCls, element));
    };
  }
});
function fixControlledValue(value) {
  if (typeof value === "undefined" || value === null) {
    return "";
  }
  return String(value);
}
function resolveOnChange(target, e2, onChange, targetValue) {
  if (!onChange) {
    return;
  }
  var event = e2;
  if (e2.type === "click") {
    Object.defineProperty(event, "target", {
      writable: true
    });
    Object.defineProperty(event, "currentTarget", {
      writable: true
    });
    var currentTarget = target.cloneNode(true);
    event.target = currentTarget;
    event.currentTarget = currentTarget;
    currentTarget.value = "";
    onChange(event);
    return;
  }
  if (targetValue !== void 0) {
    Object.defineProperty(event, "target", {
      writable: true
    });
    Object.defineProperty(event, "currentTarget", {
      writable: true
    });
    event.target = target;
    event.currentTarget = target;
    target.value = targetValue;
    onChange(event);
    return;
  }
  onChange(event);
}
function triggerFocus(element, option) {
  if (!element)
    return;
  element.focus(option);
  var _ref = option || {}, cursor = _ref.cursor;
  if (cursor) {
    var len = element.value.length;
    switch (cursor) {
      case "start":
        element.setSelectionRange(0, 0);
        break;
      case "end":
        element.setSelectionRange(len, len);
        break;
      default:
        element.setSelectionRange(0, len);
    }
  }
}
const Input = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AInput",
  inheritAttrs: false,
  props: inputProps$1(),
  setup: function setup13(props, _ref2) {
    var slots = _ref2.slots, attrs = _ref2.attrs, expose = _ref2.expose, emit = _ref2.emit;
    var inputRef = ref();
    var clearableInputRef = ref();
    var removePasswordTimeout;
    var formItemContext = useInjectFormItemContext();
    var _useConfigInject = useConfigInject("input", props), direction = _useConfigInject.direction, prefixCls = _useConfigInject.prefixCls, size = _useConfigInject.size, autocomplete = _useConfigInject.autocomplete;
    var stateValue = ref(props.value === void 0 ? props.defaultValue : props.value);
    var focused = ref(false);
    watch(function() {
      return props.value;
    }, function() {
      stateValue.value = props.value;
    });
    watch(function() {
      return props.disabled;
    }, function() {
      if (props.value !== void 0) {
        stateValue.value = props.value;
      }
      if (props.disabled) {
        focused.value = false;
      }
    });
    var clearPasswordValueAttribute = function clearPasswordValueAttribute2() {
      removePasswordTimeout = setTimeout(function() {
        var _inputRef$value;
        if (((_inputRef$value = inputRef.value) === null || _inputRef$value === void 0 ? void 0 : _inputRef$value.getAttribute("type")) === "password" && inputRef.value.hasAttribute("value")) {
          inputRef.value.removeAttribute("value");
        }
      });
    };
    var focus = function focus2(option) {
      triggerFocus(inputRef.value, option);
    };
    var blur = function blur2() {
      var _inputRef$value2;
      (_inputRef$value2 = inputRef.value) === null || _inputRef$value2 === void 0 ? void 0 : _inputRef$value2.blur();
    };
    var setSelectionRange = function setSelectionRange2(start, end, direction2) {
      var _inputRef$value3;
      (_inputRef$value3 = inputRef.value) === null || _inputRef$value3 === void 0 ? void 0 : _inputRef$value3.setSelectionRange(start, end, direction2);
    };
    var select = function select2() {
      var _inputRef$value4;
      (_inputRef$value4 = inputRef.value) === null || _inputRef$value4 === void 0 ? void 0 : _inputRef$value4.select();
    };
    expose({
      focus,
      blur,
      input: inputRef,
      stateValue,
      setSelectionRange,
      select
    });
    var onFocus = function onFocus2(e2) {
      var onFocus3 = props.onFocus;
      focused.value = true;
      onFocus3 === null || onFocus3 === void 0 ? void 0 : onFocus3(e2);
      nextTick(function() {
        clearPasswordValueAttribute();
      });
    };
    var onBlur = function onBlur2(e2) {
      var onBlur3 = props.onBlur;
      focused.value = false;
      onBlur3 === null || onBlur3 === void 0 ? void 0 : onBlur3(e2);
      formItemContext.onFieldBlur();
      nextTick(function() {
        clearPasswordValueAttribute();
      });
    };
    var triggerChange = function triggerChange2(e2) {
      emit("update:value", e2.target.value);
      emit("change", e2);
      emit("input", e2);
      formItemContext.onFieldChange();
    };
    var instance = getCurrentInstance();
    var setValue = function setValue2(value, callback) {
      if (stateValue.value === value) {
        return;
      }
      if (props.value === void 0) {
        stateValue.value = value;
      } else {
        nextTick(function() {
          if (inputRef.value.value !== stateValue.value) {
            instance.update();
          }
        });
      }
      nextTick(function() {
        callback && callback();
      });
    };
    var handleReset = function handleReset2(e2) {
      resolveOnChange(inputRef.value, e2, triggerChange);
      setValue("", function() {
        focus();
      });
    };
    var handleChange = function handleChange2(e2) {
      var _e$target = e2.target, value = _e$target.value, composing = _e$target.composing;
      if ((e2.isComposing || composing) && props.lazy || stateValue.value === value)
        return;
      var newVal = e2.target.value;
      resolveOnChange(inputRef.value, e2, triggerChange);
      setValue(newVal, function() {
        clearPasswordValueAttribute();
      });
    };
    var handleKeyDown = function handleKeyDown2(e2) {
      if (e2.keyCode === 13) {
        emit("pressEnter", e2);
      }
      emit("keydown", e2);
    };
    onMounted(function() {
      clearPasswordValueAttribute();
    });
    onBeforeUnmount(function() {
      clearTimeout(removePasswordTimeout);
    });
    var renderInput = function renderInput2() {
      var _otherProps$id;
      var _props$addonBefore = props.addonBefore, addonBefore = _props$addonBefore === void 0 ? slots.addonBefore : _props$addonBefore, _props$addonAfter = props.addonAfter, addonAfter = _props$addonAfter === void 0 ? slots.addonAfter : _props$addonAfter, disabled = props.disabled, _props$bordered = props.bordered, bordered = _props$bordered === void 0 ? true : _props$bordered, _props$valueModifiers = props.valueModifiers, valueModifiers = _props$valueModifiers === void 0 ? {} : _props$valueModifiers, htmlSize = props.htmlSize;
      var otherProps = omit(props, [
        "prefixCls",
        "onPressEnter",
        "addonBefore",
        "addonAfter",
        "prefix",
        "suffix",
        "allowClear",
        // Input elements must be either controlled or uncontrolled,
        // specify either the value prop, or the defaultValue prop, but not both.
        "defaultValue",
        "size",
        "bordered",
        "htmlSize",
        "lazy",
        "showCount",
        "valueModifiers"
      ]);
      var inputProps3 = _objectSpread2(_objectSpread2(_objectSpread2({}, otherProps), attrs), {}, {
        autocomplete: autocomplete.value,
        onChange: handleChange,
        onInput: handleChange,
        onFocus,
        onBlur,
        onKeydown: handleKeyDown,
        class: classNames(getInputClassName(prefixCls.value, bordered, size.value, disabled, direction.value), _defineProperty$g({}, attrs.class, attrs.class && !addonBefore && !addonAfter)),
        ref: inputRef,
        key: "ant-input",
        size: htmlSize,
        id: (_otherProps$id = otherProps.id) !== null && _otherProps$id !== void 0 ? _otherProps$id : formItemContext.id.value
      });
      if (valueModifiers.lazy) {
        delete inputProps3.onInput;
      }
      if (!inputProps3.autofocus) {
        delete inputProps3.autofocus;
      }
      var inputNode = createVNode("input", omit(inputProps3, ["size"]), null);
      return withDirectives(inputNode, [[antInputDirective]]);
    };
    var renderShowCountSuffix = function renderShowCountSuffix2() {
      var _slots$suffix;
      var value = stateValue.value;
      var maxlength = props.maxlength, _props$suffix = props.suffix, suffix = _props$suffix === void 0 ? (_slots$suffix = slots.suffix) === null || _slots$suffix === void 0 ? void 0 : _slots$suffix.call(slots) : _props$suffix, showCount = props.showCount;
      var hasMaxLength = Number(maxlength) > 0;
      if (suffix || showCount) {
        var valueLength = _toConsumableArray(fixControlledValue(value)).length;
        var dataCount = null;
        if (_typeof$1(showCount) === "object") {
          dataCount = showCount.formatter({
            count: valueLength,
            maxlength
          });
        } else {
          dataCount = "".concat(valueLength).concat(hasMaxLength ? " / ".concat(maxlength) : "");
        }
        return createVNode(Fragment, null, [!!showCount && createVNode("span", {
          "class": classNames("".concat(prefixCls.value, "-show-count-suffix"), _defineProperty$g({}, "".concat(prefixCls.value, "-show-count-has-suffix"), !!suffix))
        }, [dataCount]), suffix]);
      }
      return null;
    };
    return function() {
      var inputProps3 = _objectSpread2(_objectSpread2(_objectSpread2({}, attrs), props), {}, {
        prefixCls: prefixCls.value,
        inputType: "input",
        value: fixControlledValue(stateValue.value),
        handleReset,
        focused: focused.value && !props.disabled
      });
      return createVNode(ClearableLabeledInput, _objectSpread2(_objectSpread2({}, omit(inputProps3, ["element", "valueModifiers", "suffix", "showCount"])), {}, {
        "ref": clearableInputRef
      }), _objectSpread2(_objectSpread2({}, slots), {}, {
        element: renderInput,
        suffix: renderShowCountSuffix
      }));
    };
  }
});
const Group = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AInputGroup",
  props: {
    prefixCls: String,
    size: {
      type: String
    },
    compact: {
      type: Boolean,
      default: void 0
    },
    onMouseenter: {
      type: Function
    },
    onMouseleave: {
      type: Function
    },
    onFocus: {
      type: Function
    },
    onBlur: {
      type: Function
    }
  },
  setup: function setup14(props, _ref) {
    var slots = _ref.slots;
    var _useConfigInject = useConfigInject("input-group", props), prefixCls = _useConfigInject.prefixCls, direction = _useConfigInject.direction;
    var cls = computed(function() {
      var _ref2;
      var pre = prefixCls.value;
      return _ref2 = {}, _defineProperty$g(_ref2, "".concat(pre), true), _defineProperty$g(_ref2, "".concat(pre, "-lg"), props.size === "large"), _defineProperty$g(_ref2, "".concat(pre, "-sm"), props.size === "small"), _defineProperty$g(_ref2, "".concat(pre, "-compact"), props.compact), _defineProperty$g(_ref2, "".concat(pre, "-rtl"), direction.value === "rtl"), _ref2;
    });
    return function() {
      var _slots$default;
      return createVNode("span", {
        "class": cls.value,
        "onMouseenter": props.onMouseenter,
        "onMouseleave": props.onMouseleave,
        "onFocus": props.onFocus,
        "onBlur": props.onBlur
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});
var applePhone = /iPhone/i;
var appleIpod = /iPod/i;
var appleTablet = /iPad/i;
var androidPhone = /\bAndroid(?:.+)Mobile\b/i;
var androidTablet = /Android/i;
var amazonPhone = /\bAndroid(?:.+)SD4930UR\b/i;
var amazonTablet = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i;
var windowsPhone = /Windows Phone/i;
var windowsTablet = /\bWindows(?:.+)ARM\b/i;
var otherBlackberry = /BlackBerry/i;
var otherBlackberry10 = /BB10/i;
var otherOpera = /Opera Mini/i;
var otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
var otherFirefox = /Mobile(?:.+)Firefox\b/i;
function match(regex, userAgent) {
  return regex.test(userAgent);
}
function isMobile(userAgent) {
  var ua = userAgent || (typeof navigator !== "undefined" ? navigator.userAgent : "");
  var tmp = ua.split("[FBAN");
  if (typeof tmp[1] !== "undefined") {
    var _tmp = tmp;
    var _tmp2 = _slicedToArray$2(_tmp, 1);
    ua = _tmp2[0];
  }
  tmp = ua.split("Twitter");
  if (typeof tmp[1] !== "undefined") {
    var _tmp3 = tmp;
    var _tmp4 = _slicedToArray$2(_tmp3, 1);
    ua = _tmp4[0];
  }
  var result = {
    apple: {
      phone: match(applePhone, ua) && !match(windowsPhone, ua),
      ipod: match(appleIpod, ua),
      tablet: !match(applePhone, ua) && match(appleTablet, ua) && !match(windowsPhone, ua),
      device: (match(applePhone, ua) || match(appleIpod, ua) || match(appleTablet, ua)) && !match(windowsPhone, ua)
    },
    amazon: {
      phone: match(amazonPhone, ua),
      tablet: !match(amazonPhone, ua) && match(amazonTablet, ua),
      device: match(amazonPhone, ua) || match(amazonTablet, ua)
    },
    android: {
      phone: !match(windowsPhone, ua) && match(amazonPhone, ua) || !match(windowsPhone, ua) && match(androidPhone, ua),
      tablet: !match(windowsPhone, ua) && !match(amazonPhone, ua) && !match(androidPhone, ua) && (match(amazonTablet, ua) || match(androidTablet, ua)),
      device: !match(windowsPhone, ua) && (match(amazonPhone, ua) || match(amazonTablet, ua) || match(androidPhone, ua) || match(androidTablet, ua)) || match(/\bokhttp\b/i, ua)
    },
    windows: {
      phone: match(windowsPhone, ua),
      tablet: match(windowsTablet, ua),
      device: match(windowsPhone, ua) || match(windowsTablet, ua)
    },
    other: {
      blackberry: match(otherBlackberry, ua),
      blackberry10: match(otherBlackberry10, ua),
      opera: match(otherOpera, ua),
      firefox: match(otherFirefox, ua),
      chrome: match(otherChrome, ua),
      device: match(otherBlackberry, ua) || match(otherBlackberry10, ua) || match(otherOpera, ua) || match(otherFirefox, ua) || match(otherChrome, ua)
    },
    // Additional
    any: null,
    phone: null,
    tablet: null
  };
  result.any = result.apple.device || result.android.device || result.windows.device || result.other.device;
  result.phone = result.apple.phone || result.android.phone || result.windows.phone;
  result.tablet = result.apple.tablet || result.android.tablet || result.windows.tablet;
  return result;
}
var defaultResult = _objectSpread2(_objectSpread2({}, isMobile()), {}, {
  isMobile
});
const isMobile$1 = defaultResult;
var _excluded$1 = ["disabled", "loading", "addonAfter", "suffix"];
const Search = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AInputSearch",
  inheritAttrs: false,
  props: _objectSpread2(_objectSpread2({}, inputProps$1()), {}, {
    inputPrefixCls: String,
    // 不能设置默认值 https://github.com/vueComponent/ant-design-vue/issues/1916
    enterButton: PropTypes$1.any,
    onSearch: {
      type: Function
    }
  }),
  setup: function setup15(props, _ref) {
    var slots = _ref.slots, attrs = _ref.attrs, expose = _ref.expose, emit = _ref.emit;
    var inputRef = ref();
    var focus = function focus2() {
      var _inputRef$value;
      (_inputRef$value = inputRef.value) === null || _inputRef$value === void 0 ? void 0 : _inputRef$value.focus();
    };
    var blur = function blur2() {
      var _inputRef$value2;
      (_inputRef$value2 = inputRef.value) === null || _inputRef$value2 === void 0 ? void 0 : _inputRef$value2.blur();
    };
    expose({
      focus,
      blur
    });
    var onChange = function onChange2(e2) {
      emit("update:value", e2.target.value);
      if (e2 && e2.target && e2.type === "click") {
        emit("search", e2.target.value, e2);
      }
      emit("change", e2);
    };
    var onMousedown = function onMousedown2(e2) {
      var _inputRef$value3;
      if (document.activeElement === ((_inputRef$value3 = inputRef.value) === null || _inputRef$value3 === void 0 ? void 0 : _inputRef$value3.input)) {
        e2.preventDefault();
      }
    };
    var onSearch = function onSearch2(e2) {
      var _inputRef$value4;
      emit("search", (_inputRef$value4 = inputRef.value) === null || _inputRef$value4 === void 0 ? void 0 : _inputRef$value4.stateValue, e2);
      if (!isMobile$1.tablet) {
        inputRef.value.focus();
      }
    };
    var _useConfigInject = useConfigInject("input-search", props), prefixCls = _useConfigInject.prefixCls, getPrefixCls2 = _useConfigInject.getPrefixCls, direction = _useConfigInject.direction, size = _useConfigInject.size;
    var inputPrefixCls = computed(function() {
      return getPrefixCls2("input", props.inputPrefixCls);
    });
    return function() {
      var _slots$addonAfter, _slots$suffix, _slots$enterButton, _slots$enterButton2, _classNames;
      var disabled = props.disabled, loading = props.loading, _props$addonAfter = props.addonAfter, addonAfter = _props$addonAfter === void 0 ? (_slots$addonAfter = slots.addonAfter) === null || _slots$addonAfter === void 0 ? void 0 : _slots$addonAfter.call(slots) : _props$addonAfter, _props$suffix = props.suffix, suffix = _props$suffix === void 0 ? (_slots$suffix = slots.suffix) === null || _slots$suffix === void 0 ? void 0 : _slots$suffix.call(slots) : _props$suffix, restProps = _objectWithoutProperties$2(props, _excluded$1);
      var _props$enterButton = props.enterButton, enterButton = _props$enterButton === void 0 ? (_slots$enterButton = (_slots$enterButton2 = slots.enterButton) === null || _slots$enterButton2 === void 0 ? void 0 : _slots$enterButton2.call(slots)) !== null && _slots$enterButton !== void 0 ? _slots$enterButton : false : _props$enterButton;
      enterButton = enterButton || enterButton === "";
      var searchIcon = typeof enterButton === "boolean" ? createVNode(SearchOutlined$1, null, null) : null;
      var btnClassName = "".concat(prefixCls.value, "-button");
      var enterButtonAsElement = Array.isArray(enterButton) ? enterButton[0] : enterButton;
      var button;
      var isAntdButton = enterButtonAsElement.type && isPlainObject(enterButtonAsElement.type) && enterButtonAsElement.type.__ANT_BUTTON;
      if (isAntdButton || enterButtonAsElement.tagName === "button") {
        button = cloneElement(enterButtonAsElement, _objectSpread2({
          onMousedown,
          onClick: onSearch,
          key: "enterButton"
        }, isAntdButton ? {
          class: btnClassName,
          size: size.value
        } : {}), false);
      } else {
        var iconOnly = searchIcon && !enterButton;
        button = createVNode(Button, {
          "class": btnClassName,
          "type": enterButton ? "primary" : void 0,
          "size": size.value,
          "disabled": disabled,
          "key": "enterButton",
          "onMousedown": onMousedown,
          "onClick": onSearch,
          "loading": loading,
          "icon": iconOnly ? searchIcon : null
        }, {
          default: function _default2() {
            return [iconOnly ? null : searchIcon || enterButton];
          }
        });
      }
      if (addonAfter) {
        button = [button, addonAfter];
      }
      var cls = classNames(prefixCls.value, (_classNames = {}, _defineProperty$g(_classNames, "".concat(prefixCls.value, "-rtl"), direction.value === "rtl"), _defineProperty$g(_classNames, "".concat(prefixCls.value, "-").concat(size.value), !!size.value), _defineProperty$g(_classNames, "".concat(prefixCls.value, "-with-button"), !!enterButton), _classNames), attrs.class);
      return createVNode(Input, _objectSpread2(_objectSpread2(_objectSpread2({
        "ref": inputRef
      }, omit(restProps, ["onUpdate:value", "onSearch", "enterButton"])), attrs), {}, {
        "onPressEnter": onSearch,
        "size": size.value,
        "prefixCls": inputPrefixCls.value,
        "addonAfter": button,
        "suffix": suffix,
        "onChange": onChange,
        "class": cls,
        "disabled": disabled
      }), slots);
    };
  }
});
var HIDDEN_TEXTAREA_STYLE = "\n min-height:0 !important;\n max-height:none !important;\n height:0 !important;\n visibility:hidden !important;\n overflow:hidden !important;\n position:absolute !important;\n z-index:-1000 !important;\n top:0 !important;\n right:0 !important\n";
var SIZING_STYLE = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "font-variant", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing", "word-break"];
var computedStyleCache = {};
var hiddenTextarea;
function calculateNodeStyling(node) {
  var useCache = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var nodeRef = node.getAttribute("id") || node.getAttribute("data-reactid") || node.getAttribute("name");
  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }
  var style = window.getComputedStyle(node);
  var boxSizing = style.getPropertyValue("box-sizing") || style.getPropertyValue("-moz-box-sizing") || style.getPropertyValue("-webkit-box-sizing");
  var paddingSize = parseFloat(style.getPropertyValue("padding-bottom")) + parseFloat(style.getPropertyValue("padding-top"));
  var borderSize = parseFloat(style.getPropertyValue("border-bottom-width")) + parseFloat(style.getPropertyValue("border-top-width"));
  var sizingStyle = SIZING_STYLE.map(function(name) {
    return "".concat(name, ":").concat(style.getPropertyValue(name));
  }).join(";");
  var nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing
  };
  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }
  return nodeInfo;
}
function calculateNodeHeight(uiTextNode) {
  var useCache = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var minRows = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
  var maxRows = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tab-index", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    document.body.appendChild(hiddenTextarea);
  }
  if (uiTextNode.getAttribute("wrap")) {
    hiddenTextarea.setAttribute("wrap", uiTextNode.getAttribute("wrap"));
  } else {
    hiddenTextarea.removeAttribute("wrap");
  }
  var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache), paddingSize = _calculateNodeStyling.paddingSize, borderSize = _calculateNodeStyling.borderSize, boxSizing = _calculateNodeStyling.boxSizing, sizingStyle = _calculateNodeStyling.sizingStyle;
  hiddenTextarea.setAttribute("style", "".concat(sizingStyle, ";").concat(HIDDEN_TEXTAREA_STYLE));
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || "";
  var minHeight = Number.MIN_SAFE_INTEGER;
  var maxHeight = Number.MAX_SAFE_INTEGER;
  var height = hiddenTextarea.scrollHeight;
  var overflowY;
  if (boxSizing === "border-box") {
    height += borderSize;
  } else if (boxSizing === "content-box") {
    height -= paddingSize;
  }
  if (minRows !== null || maxRows !== null) {
    hiddenTextarea.value = " ";
    var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === "border-box") {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === "border-box") {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      overflowY = height > maxHeight ? "" : "hidden";
      height = Math.min(maxHeight, height);
    }
  }
  return {
    height: "".concat(height, "px"),
    minHeight: "".concat(minHeight, "px"),
    maxHeight: "".concat(maxHeight, "px"),
    overflowY,
    resize: "none"
  };
}
var RESIZE_STATUS_NONE = 0;
var RESIZE_STATUS_RESIZING = 1;
var RESIZE_STATUS_RESIZED = 2;
var ResizableTextArea = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ResizableTextArea",
  inheritAttrs: false,
  props: textAreaProps(),
  setup: function setup16(props, _ref) {
    var attrs = _ref.attrs, emit = _ref.emit, expose = _ref.expose;
    var nextFrameActionId;
    var resizeFrameId;
    var textAreaRef = ref();
    var textareaStyles = ref({});
    var resizeStatus = ref(RESIZE_STATUS_NONE);
    onBeforeUnmount(function() {
      wrapperRaf.cancel(nextFrameActionId);
      wrapperRaf.cancel(resizeFrameId);
    });
    var fixFirefoxAutoScroll = function fixFirefoxAutoScroll2() {
      try {
        if (document.activeElement === textAreaRef.value) {
          var currentStart = textAreaRef.value.selectionStart;
          var currentEnd = textAreaRef.value.selectionEnd;
          textAreaRef.value.setSelectionRange(currentStart, currentEnd);
        }
      } catch (e2) {
      }
    };
    var resizeTextarea = function resizeTextarea2() {
      var autoSize = props.autoSize || props.autosize;
      if (!autoSize || !textAreaRef.value) {
        return;
      }
      var minRows = autoSize.minRows, maxRows = autoSize.maxRows;
      textareaStyles.value = calculateNodeHeight(textAreaRef.value, false, minRows, maxRows);
      resizeStatus.value = RESIZE_STATUS_RESIZING;
      wrapperRaf.cancel(resizeFrameId);
      resizeFrameId = wrapperRaf(function() {
        resizeStatus.value = RESIZE_STATUS_RESIZED;
        resizeFrameId = wrapperRaf(function() {
          resizeStatus.value = RESIZE_STATUS_NONE;
          fixFirefoxAutoScroll();
        });
      });
    };
    var resizeOnNextFrame = function resizeOnNextFrame2() {
      wrapperRaf.cancel(nextFrameActionId);
      nextFrameActionId = wrapperRaf(resizeTextarea);
    };
    var handleResize = function handleResize2(size) {
      if (resizeStatus.value !== RESIZE_STATUS_NONE) {
        return;
      }
      emit("resize", size);
      var autoSize = props.autoSize || props.autosize;
      if (autoSize) {
        resizeOnNextFrame();
      }
    };
    warning$1(props.autosize === void 0, "Input.TextArea", "autosize is deprecated, please use autoSize instead.");
    var renderTextArea = function renderTextArea2() {
      var prefixCls = props.prefixCls, autoSize = props.autoSize, autosize = props.autosize, disabled = props.disabled;
      var otherProps = omit(props, ["prefixCls", "onPressEnter", "autoSize", "autosize", "defaultValue", "allowClear", "type", "lazy", "maxlength", "valueModifiers"]);
      var cls = classNames(prefixCls, attrs.class, _defineProperty$g({}, "".concat(prefixCls, "-disabled"), disabled));
      var style = [attrs.style, textareaStyles.value, resizeStatus.value === RESIZE_STATUS_RESIZING ? {
        overflowX: "hidden",
        overflowY: "hidden"
      } : null];
      var textareaProps = _objectSpread2(_objectSpread2(_objectSpread2({}, otherProps), attrs), {}, {
        style,
        class: cls
      });
      if (!textareaProps.autofocus) {
        delete textareaProps.autofocus;
      }
      if (textareaProps.rows === 0) {
        delete textareaProps.rows;
      }
      return createVNode(ResizeObserver, {
        "onResize": handleResize,
        "disabled": !(autoSize || autosize)
      }, {
        default: function _default2() {
          return [withDirectives(createVNode("textarea", _objectSpread2(_objectSpread2({}, textareaProps), {}, {
            "ref": textAreaRef
          }), null), [[antInputDirective]])];
        }
      });
    };
    watch(function() {
      return props.value;
    }, function() {
      nextTick(function() {
        resizeTextarea();
      });
    });
    onMounted(function() {
      nextTick(function() {
        resizeTextarea();
      });
    });
    var instance = getCurrentInstance();
    expose({
      resizeTextarea,
      textArea: textAreaRef,
      instance
    });
    return function() {
      return renderTextArea();
    };
  }
});
const ResizableTextArea$1 = ResizableTextArea;
function fixEmojiLength(value, maxLength) {
  return _toConsumableArray(value || "").slice(0, maxLength).join("");
}
function setTriggerValue(isCursorInEnd, preValue, triggerValue, maxLength) {
  var newTriggerValue = triggerValue;
  if (isCursorInEnd) {
    newTriggerValue = fixEmojiLength(triggerValue, maxLength);
  } else if (_toConsumableArray(preValue || "").length < triggerValue.length && _toConsumableArray(triggerValue || "").length > maxLength) {
    newTriggerValue = preValue;
  }
  return newTriggerValue;
}
const TextArea = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ATextarea",
  inheritAttrs: false,
  props: textAreaProps(),
  setup: function setup17(props, _ref) {
    var attrs = _ref.attrs, expose = _ref.expose, emit = _ref.emit;
    var formItemContext = useInjectFormItemContext();
    var stateValue = ref(props.value === void 0 ? props.defaultValue : props.value);
    var resizableTextArea = ref();
    var mergedValue = ref("");
    var _useConfigInject = useConfigInject("input", props), prefixCls = _useConfigInject.prefixCls, size = _useConfigInject.size, direction = _useConfigInject.direction;
    var showCount = computed(function() {
      return props.showCount === "" || props.showCount || false;
    });
    var hasMaxLength = computed(function() {
      return Number(props.maxlength) > 0;
    });
    var compositing = ref(false);
    var oldCompositionValueRef = ref();
    var oldSelectionStartRef = ref(0);
    var onInternalCompositionStart = function onInternalCompositionStart2(e2) {
      compositing.value = true;
      oldCompositionValueRef.value = mergedValue.value;
      oldSelectionStartRef.value = e2.currentTarget.selectionStart;
      emit("compositionstart", e2);
    };
    var onInternalCompositionEnd = function onInternalCompositionEnd2(e2) {
      compositing.value = false;
      var triggerValue = e2.currentTarget.value;
      if (hasMaxLength.value) {
        var _oldCompositionValueR;
        var isCursorInEnd = oldSelectionStartRef.value >= props.maxlength + 1 || oldSelectionStartRef.value === ((_oldCompositionValueR = oldCompositionValueRef.value) === null || _oldCompositionValueR === void 0 ? void 0 : _oldCompositionValueR.length);
        triggerValue = setTriggerValue(isCursorInEnd, oldCompositionValueRef.value, triggerValue, props.maxlength);
      }
      if (triggerValue !== mergedValue.value) {
        setValue(triggerValue);
        resolveOnChange(e2.currentTarget, e2, triggerChange, triggerValue);
      }
      emit("compositionend", e2);
    };
    var instance = getCurrentInstance();
    watch(function() {
      return props.value;
    }, function() {
      if ("value" in instance.vnode.props || {}) {
        var _props$value;
        stateValue.value = (_props$value = props.value) !== null && _props$value !== void 0 ? _props$value : "";
      }
    });
    var focus = function focus2(option) {
      var _resizableTextArea$va;
      triggerFocus((_resizableTextArea$va = resizableTextArea.value) === null || _resizableTextArea$va === void 0 ? void 0 : _resizableTextArea$va.textArea, option);
    };
    var blur = function blur2() {
      var _resizableTextArea$va2, _resizableTextArea$va3;
      (_resizableTextArea$va2 = resizableTextArea.value) === null || _resizableTextArea$va2 === void 0 ? void 0 : (_resizableTextArea$va3 = _resizableTextArea$va2.textArea) === null || _resizableTextArea$va3 === void 0 ? void 0 : _resizableTextArea$va3.blur();
    };
    var setValue = function setValue2(value, callback) {
      if (stateValue.value === value) {
        return;
      }
      if (props.value === void 0) {
        stateValue.value = value;
      } else {
        nextTick(function() {
          if (resizableTextArea.value.textArea.value !== mergedValue.value) {
            var _resizableTextArea$va4, _resizableTextArea$va5, _resizableTextArea$va6;
            (_resizableTextArea$va4 = resizableTextArea.value) === null || _resizableTextArea$va4 === void 0 ? void 0 : (_resizableTextArea$va5 = (_resizableTextArea$va6 = _resizableTextArea$va4.instance).update) === null || _resizableTextArea$va5 === void 0 ? void 0 : _resizableTextArea$va5.call(_resizableTextArea$va6);
          }
        });
      }
      nextTick(function() {
        callback && callback();
      });
    };
    var handleKeyDown = function handleKeyDown2(e2) {
      if (e2.keyCode === 13) {
        emit("pressEnter", e2);
      }
      emit("keydown", e2);
    };
    var onBlur = function onBlur2(e2) {
      var onBlur3 = props.onBlur;
      onBlur3 === null || onBlur3 === void 0 ? void 0 : onBlur3(e2);
      formItemContext.onFieldBlur();
    };
    var triggerChange = function triggerChange2(e2) {
      emit("update:value", e2.target.value);
      emit("change", e2);
      emit("input", e2);
      formItemContext.onFieldChange();
    };
    var handleReset = function handleReset2(e2) {
      resolveOnChange(resizableTextArea.value.textArea, e2, triggerChange);
      setValue("", function() {
        focus();
      });
    };
    var handleChange = function handleChange2(e2) {
      var composing = e2.target.composing;
      var triggerValue = e2.target.value;
      compositing.value = !!(e2.isComposing || composing);
      if (compositing.value && props.lazy || stateValue.value === triggerValue)
        return;
      if (hasMaxLength.value) {
        var target = e2.target;
        var isCursorInEnd = target.selectionStart >= props.maxlength + 1 || target.selectionStart === triggerValue.length || !target.selectionStart;
        triggerValue = setTriggerValue(isCursorInEnd, mergedValue.value, triggerValue, props.maxlength);
      }
      resolveOnChange(e2.currentTarget, e2, triggerChange, triggerValue);
      setValue(triggerValue);
    };
    var renderTextArea = function renderTextArea2() {
      var _class, _props$valueModifiers, _resizeProps$id;
      var style = attrs.style, customClass = attrs.class;
      var _props$bordered = props.bordered, bordered = _props$bordered === void 0 ? true : _props$bordered;
      var resizeProps = _objectSpread2(_objectSpread2(_objectSpread2({}, omit(props, ["allowClear"])), attrs), {}, {
        style: showCount.value ? {} : style,
        class: (_class = {}, _defineProperty$g(_class, "".concat(prefixCls.value, "-borderless"), !bordered), _defineProperty$g(_class, "".concat(customClass), customClass && !showCount.value), _defineProperty$g(_class, "".concat(prefixCls.value, "-sm"), size.value === "small"), _defineProperty$g(_class, "".concat(prefixCls.value, "-lg"), size.value === "large"), _class),
        showCount: null,
        prefixCls: prefixCls.value,
        onInput: handleChange,
        onChange: handleChange,
        onBlur,
        onKeydown: handleKeyDown,
        onCompositionstart: onInternalCompositionStart,
        onCompositionend: onInternalCompositionEnd
      });
      if ((_props$valueModifiers = props.valueModifiers) !== null && _props$valueModifiers !== void 0 && _props$valueModifiers.lazy) {
        delete resizeProps.onInput;
      }
      return createVNode(ResizableTextArea$1, _objectSpread2(_objectSpread2({}, resizeProps), {}, {
        "id": (_resizeProps$id = resizeProps.id) !== null && _resizeProps$id !== void 0 ? _resizeProps$id : formItemContext.id.value,
        "ref": resizableTextArea,
        "maxlength": props.maxlength
      }), null);
    };
    expose({
      focus,
      blur,
      resizableTextArea
    });
    watchEffect(function() {
      var val = fixControlledValue(stateValue.value);
      if (!compositing.value && hasMaxLength.value && (props.value === null || props.value === void 0)) {
        val = fixEmojiLength(val, props.maxlength);
      }
      mergedValue.value = val;
    });
    return function() {
      var maxlength = props.maxlength, _props$bordered2 = props.bordered, bordered = _props$bordered2 === void 0 ? true : _props$bordered2, hidden = props.hidden;
      var style = attrs.style, customClass = attrs.class;
      var inputProps3 = _objectSpread2(_objectSpread2(_objectSpread2({}, props), attrs), {}, {
        prefixCls: prefixCls.value,
        inputType: "text",
        handleReset,
        direction: direction.value,
        bordered,
        style: showCount.value ? void 0 : style
      });
      var textareaNode = createVNode(ClearableLabeledInput, _objectSpread2(_objectSpread2({}, inputProps3), {}, {
        "value": mergedValue.value
      }), {
        element: renderTextArea
      });
      if (showCount.value) {
        var valueLength = _toConsumableArray(mergedValue.value).length;
        var dataCount = "";
        if (_typeof$1(showCount.value) === "object") {
          dataCount = showCount.value.formatter({
            count: valueLength,
            maxlength
          });
        } else {
          dataCount = "".concat(valueLength).concat(hasMaxLength.value ? " / ".concat(maxlength) : "");
        }
        textareaNode = createVNode("div", {
          "hidden": hidden,
          "class": classNames("".concat(prefixCls.value, "-textarea"), _defineProperty$g({}, "".concat(prefixCls.value, "-textarea-rtl"), direction.value === "rtl"), "".concat(prefixCls.value, "-textarea-show-count"), customClass),
          "style": style,
          "data-count": _typeof$1(dataCount) !== "object" ? dataCount : void 0
        }, [textareaNode]);
      }
      return textareaNode;
    };
  }
});
var EyeOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" } }] }, "name": "eye", "theme": "outlined" };
const EyeOutlinedSvg = EyeOutlined$2;
function _objectSpread$1(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty$1(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty$1(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var EyeOutlined = function EyeOutlined2(props, context) {
  var p = _objectSpread$1({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$1({}, p, {
    "icon": EyeOutlinedSvg
  }), null);
};
EyeOutlined.displayName = "EyeOutlined";
EyeOutlined.inheritAttrs = false;
const EyeOutlined$1 = EyeOutlined;
var EyeInvisibleOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" } }, { "tag": "path", "attrs": { "d": "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" } }] }, "name": "eye-invisible", "theme": "outlined" };
const EyeInvisibleOutlinedSvg = EyeInvisibleOutlined$2;
function _objectSpread(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key2) {
      _defineProperty(target, key2, source[key2]);
    });
  }
  return target;
}
function _defineProperty(obj, key2, value) {
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
var EyeInvisibleOutlined = function EyeInvisibleOutlined2(props, context) {
  var p = _objectSpread({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread({}, p, {
    "icon": EyeInvisibleOutlinedSvg
  }), null);
};
EyeInvisibleOutlined.displayName = "EyeInvisibleOutlined";
EyeInvisibleOutlined.inheritAttrs = false;
const EyeInvisibleOutlined$1 = EyeInvisibleOutlined;
var _excluded = ["size", "visibilityToggle"];
var ActionMap = {
  click: "onClick",
  hover: "onMouseover"
};
var defaultIconRender = function defaultIconRender2(visible) {
  return visible ? createVNode(EyeOutlined$1, null, null) : createVNode(EyeInvisibleOutlined$1, null, null);
};
const Password = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AInputPassword",
  inheritAttrs: false,
  props: _objectSpread2(_objectSpread2({}, inputProps$1()), {}, {
    prefixCls: String,
    inputPrefixCls: String,
    action: {
      type: String,
      default: "click"
    },
    visibilityToggle: {
      type: Boolean,
      default: true
    },
    iconRender: Function
  }),
  setup: function setup18(props, _ref) {
    var slots = _ref.slots, attrs = _ref.attrs, expose = _ref.expose;
    var visible = ref(false);
    var onVisibleChange = function onVisibleChange2() {
      var disabled = props.disabled;
      if (disabled) {
        return;
      }
      visible.value = !visible.value;
    };
    var inputRef = ref();
    var focus = function focus2() {
      var _inputRef$value;
      (_inputRef$value = inputRef.value) === null || _inputRef$value === void 0 ? void 0 : _inputRef$value.focus();
    };
    var blur = function blur2() {
      var _inputRef$value2;
      (_inputRef$value2 = inputRef.value) === null || _inputRef$value2 === void 0 ? void 0 : _inputRef$value2.blur();
    };
    expose({
      focus,
      blur
    });
    var getIcon = function getIcon2(prefixCls2) {
      var _iconProps;
      var action = props.action, _props$iconRender = props.iconRender, iconRender = _props$iconRender === void 0 ? slots.iconRender || defaultIconRender : _props$iconRender;
      var iconTrigger = ActionMap[action] || "";
      var icon = iconRender(visible.value);
      var iconProps = (_iconProps = {}, _defineProperty$g(_iconProps, iconTrigger, onVisibleChange), _defineProperty$g(_iconProps, "class", "".concat(prefixCls2, "-icon")), _defineProperty$g(_iconProps, "key", "passwordIcon"), _defineProperty$g(_iconProps, "onMousedown", function onMousedown(e2) {
        e2.preventDefault();
      }), _defineProperty$g(_iconProps, "onMouseup", function onMouseup(e2) {
        e2.preventDefault();
      }), _iconProps);
      return cloneElement(isValidElement(icon) ? icon : createVNode("span", null, [icon]), iconProps);
    };
    var _useConfigInject = useConfigInject("input-password", props), prefixCls = _useConfigInject.prefixCls, getPrefixCls2 = _useConfigInject.getPrefixCls;
    var inputPrefixCls = computed(function() {
      return getPrefixCls2("input", props.inputPrefixCls);
    });
    var renderPassword = function renderPassword2() {
      var size = props.size, visibilityToggle = props.visibilityToggle, restProps = _objectWithoutProperties$2(props, _excluded);
      var suffixIcon = visibilityToggle && getIcon(prefixCls.value);
      var inputClassName = classNames(prefixCls.value, attrs.class, _defineProperty$g({}, "".concat(prefixCls.value, "-").concat(size), !!size));
      var omittedProps = _objectSpread2(_objectSpread2(_objectSpread2({}, omit(restProps, ["suffix", "iconRender", "action"])), attrs), {}, {
        type: visible.value ? "text" : "password",
        class: inputClassName,
        prefixCls: inputPrefixCls.value,
        suffix: suffixIcon
      });
      if (size) {
        omittedProps.size = size;
      }
      return createVNode(Input, _objectSpread2({
        "ref": inputRef
      }, omittedProps), slots);
    };
    return function() {
      return renderPassword();
    };
  }
});
Input.Group = Group;
Input.Search = Search;
Input.TextArea = TextArea;
Input.Password = Password;
Input.install = function(app) {
  app.component(Input.name, Input);
  app.component(Input.Group.name, Input.Group);
  app.component(Input.Search.name, Input.Search);
  app.component(Input.TextArea.name, Input.TextArea);
  app.component(Input.Password.name, Input.Password);
  return app;
};
const _default = "";
const index$2 = "";
const _hoisted_1$1 = { class: "myButton" };
const __default__$1 = defineComponent({
  name: "MyButton"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  setup(__props) {
    console.log("MyButton");
    return (_ctx, _cache) => {
      const _component_a_button = Button;
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(_component_a_button, { type: "primary" }, {
          default: withCtx(() => [
            createTextVNode("我的按钮")
          ]),
          _: 1
        })
      ]);
    };
  }
});
const myButton_vue_vue_type_style_index_0_scoped_182aa9ff_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key2, val] of props) {
    target[key2] = val;
  }
  return target;
};
const MyButtonVue = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-182aa9ff"]]);
MyButtonVue.install = function(app) {
  app.component(MyButtonVue.name, MyButtonVue);
};
const index$1 = "";
const _hoisted_1 = { class: "myInput" };
const __default__ = defineComponent({
  name: "MyInput"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  setup(__props) {
    console.log("MyInput");
    return (_ctx, _cache) => {
      const _component_a_input = Input;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_a_input, { placeholder: "Basic usage" })
      ]);
    };
  }
});
const myInput_vue_vue_type_style_index_0_scoped_19f93f3c_lang = "";
const MyInputVue = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-19f93f3c"]]);
MyInputVue.install = function(app) {
  app.component(MyInputVue.name, MyInputVue);
};
const components = [MyButtonVue, MyInputVue];
const install = (app) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};
const index = {
  install,
  MyButton: MyButtonVue,
  MyInput: MyInputVue
};
export {
  MyButtonVue as MyButton,
  MyInputVue as MyInput,
  index as default,
  install
};
