"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePandaBridge = exports["default"] = exports.PandaBridgeRoot = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _isArray = _interopRequireDefault(require("lodash/isArray"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _each = _interopRequireDefault(require("lodash/each"));
var _keyBy = _interopRequireDefault(require("lodash/keyBy"));
var _mapValues = _interopRequireDefault(require("lodash/mapValues"));
var _uniqBy = _interopRequireDefault(require("lodash/uniqBy"));
var _map = _interopRequireDefault(require("lodash/map"));
var _assign = _interopRequireDefault(require("lodash/assign"));
var _isEqual = _interopRequireDefault(require("lodash/isEqual"));
var _pandasuiteBridge = _interopRequireDefault(require("pandasuite-bridge"));
var _html2canvas = _interopRequireDefault(require("html2canvas"));
var _recoil = require("recoil");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var localizedResources = function localizedResources(resources) {
  return (0, _mapValues["default"])((0, _keyBy["default"])(resources, 'id'), function (resource) {
    var r = _pandasuiteBridge["default"].resolveResource(resource.id);
    return {
      id: resource.id,
      path: (r || {}).path,
      srcsets: (r || {}).srcsets,
      local: !!resource.local,
      data: resource.data
    };
  });
};
var propertiesState = (0, _recoil.atom)({
  key: 'propertiesState',
  "default": undefined
});
var markersState = (0, _recoil.atom)({
  key: 'markersState',
  "default": []
});
var resourcesState = (0, _recoil.atom)({
  key: 'resourcesState',
  "default": []
});
var triggeredMarkerState = (0, _recoil.atom)({
  key: 'triggeredMarkerState',
  "default": undefined
});
var bridgeState = (0, _recoil.selector)({
  key: 'bridgeState',
  get: function get(_ref) {
    var _get = _ref.get;
    var properties = _get(propertiesState);
    var markers = _get(markersState);
    var resources = _get(resourcesState);
    var triggeredMarker = _get(triggeredMarkerState);
    return {
      properties: properties,
      markers: markers,
      resources: resources,
      triggeredMarker: triggeredMarker
    };
  },
  set: function set(_ref2, _ref3) {
    var _set = _ref2.set,
      get = _ref2.get;
    var properties = _ref3.properties,
      markers = _ref3.markers,
      resources = _ref3.resources,
      triggeredMarker = _ref3.triggeredMarker;
    if (properties !== undefined && !(0, _isEqual["default"])(properties, get(propertiesState))) {
      _set(propertiesState, properties);
    }
    if (markers !== undefined && !(0, _isEqual["default"])(markers, get(markersState))) {
      _set(markersState, markers);
    }
    if (resources !== undefined && !(0, _isEqual["default"])(resources, get(resourcesState))) {
      _set(resourcesState, resources);
    }
    if (triggeredMarker !== undefined && !(0, _isEqual["default"])(triggeredMarker, get(triggeredMarkerState))) {
      _set(triggeredMarkerState, triggeredMarker);
    }
  }
});
var addMarkerState = (0, _recoil.selector)({
  key: 'addMarkerState',
  get: function get(_ref4) {
    var _get2 = _ref4.get;
    return _get2(markersState);
  },
  set: function set(_ref5, newMarkers) {
    var _set2 = _ref5.set,
      get = _ref5.get;
    var markers = get(markersState);
    _set2(markersState, (0, _uniqBy["default"])(markers.concat(newMarkers), function (marker) {
      return marker.id;
    }));
  }
});
var firstTime = true;
var usePandaBridge = exports.usePandaBridge = function usePandaBridge(hooks) {
  var _useRecoilState = (0, _recoil.useRecoilState)(bridgeState),
    _useRecoilState2 = _slicedToArray(_useRecoilState, 2),
    bridge = _useRecoilState2[0],
    setBridge = _useRecoilState2[1];
  var addMarker = (0, _recoil.useSetRecoilState)(addMarkerState);
  var _ref6 = hooks || {},
    markersHooks = _ref6.markers,
    actionsHooks = _ref6.actions,
    synchHooks = _ref6.synchronization,
    componentHooks = _ref6.component;
  var _ref7 = markersHooks || {},
    getSnapshotDataHook = _ref7.getSnapshotDataHook,
    setSnapshotDataHook = _ref7.setSnapshotDataHook;
  var _ref8 = componentHooks || {},
    getScreenshotHook = _ref8.getScreenshotHook,
    onLanguageChanged = _ref8.onLanguageChanged;
  (0, _react.useEffect)(function () {
    if (firstTime) {
      _pandasuiteBridge["default"].init(function () {
        _pandasuiteBridge["default"].onLoad(function (pandaData) {
          setBridge({
            properties: pandaData.properties || {},
            markers: pandaData.markers || [],
            resources: localizedResources(pandaData.resources)
          });
          _pandasuiteBridge["default"].listen(_pandasuiteBridge["default"].LANGUAGE, function (args) {
            _pandasuiteBridge["default"].currentLanguage = args && args.language;
            setBridge({
              resources: localizedResources(_pandasuiteBridge["default"].resources)
            });
          });
          _pandasuiteBridge["default"].onUpdate(function (updatedPandaData) {
            setBridge({
              properties: updatedPandaData.properties,
              markers: updatedPandaData.markers,
              resources: localizedResources(updatedPandaData.resources)
            });
          });
        });
        _pandasuiteBridge["default"].setSnapshotData(function (pandaData) {
          setBridge({
            triggeredMarker: pandaData
          });
        });
      });
      firstTime = false;
    }
  }, []);
  if (onLanguageChanged) {
    _pandasuiteBridge["default"].unlisten(_pandasuiteBridge["default"].LANGUAGE);
    _pandasuiteBridge["default"].listen(_pandasuiteBridge["default"].LANGUAGE, function (args) {
      onLanguageChanged(args);
    });
  }
  if (getSnapshotDataHook) {
    _pandasuiteBridge["default"].unlisten(_pandasuiteBridge["default"].GET_SNAPSHOT_DATA);
    _pandasuiteBridge["default"].getSnapshotData(function () {
      var newMarkerData = getSnapshotDataHook();
      if ((0, _isArray["default"])(newMarkerData)) {
        addMarker(newMarkerData);
      } else {
        addMarker([newMarkerData]);
      }
      return newMarkerData;
    });
  }
  if (getScreenshotHook) {
    _pandasuiteBridge["default"].unlisten(_pandasuiteBridge["default"].GET_SCREENSHOT);
    _pandasuiteBridge["default"].getScreenshot(function (resultCallback) {
      return getScreenshotHook(resultCallback);
    });
  } else {
    _pandasuiteBridge["default"].unlisten(_pandasuiteBridge["default"].GET_SCREENSHOT);
    _pandasuiteBridge["default"].getScreenshot(function (resultCallback) {
      (0, _html2canvas["default"])(document.body, {
        backgroundColor: null,
        scale: 3
      }).then(function (canvas) {
        canvas.toBlob(function (blob) {
          var fileReader = new FileReader();
          fileReader.onload = function (e) {
            resultCallback(e.target.result);
          };
          fileReader.readAsDataURL(blob);
        });
      });
    });
  }
  if (setSnapshotDataHook) {
    _pandasuiteBridge["default"].unlisten(_pandasuiteBridge["default"].SET_SNAPSHOT_DATA);
    _pandasuiteBridge["default"].setSnapshotData(function (pandaData) {
      if (setSnapshotDataHook) {
        setSnapshotDataHook(pandaData);
      }
    });
  }
  (0, _each["default"])(actionsHooks, function (func, name) {
    if ((0, _isFunction["default"])(func)) {
      _pandasuiteBridge["default"].unlisten(name);
      _pandasuiteBridge["default"].listen(name, function (data) {
        return func.apply(void 0, _toConsumableArray(data));
      });
    }
  });
  _pandasuiteBridge["default"].unlisten(_pandasuiteBridge["default"].SYNCHRONIZE);
  (0, _each["default"])(synchHooks, function (func, name) {
    if ((0, _isFunction["default"])(func)) {
      _pandasuiteBridge["default"].synchronize(name, func);
    }
  });
  return _objectSpread(_objectSpread({}, bridge), {}, {
    setProperty: function setProperty(key, value) {
      _pandasuiteBridge["default"].send(_pandasuiteBridge["default"].UPDATED, {
        properties: [{
          id: key,
          value: value
        }]
      });
      setBridge({
        properties: _objectSpread(_objectSpread({}, bridge.properties), {}, _defineProperty({}, key, value))
      });
    },
    setProperties: function setProperties(properties) {
      _pandasuiteBridge["default"].send(_pandasuiteBridge["default"].UPDATED, {
        properties: (0, _map["default"])(properties, function (v, k) {
          return {
            id: k,
            value: v
          };
        })
      });
      setBridge({
        properties: (0, _assign["default"])({}, bridge.properties, properties)
      });
    },
    setResources: function setResources(resources) {
      _pandasuiteBridge["default"].send(_pandasuiteBridge["default"].UPDATED, {
        resources: resources
      });
      setBridge({
        resources: localizedResources(resources)
      });
    },
    addActions: function addActions(h, replace) {
      (0, _each["default"])(h, function (func, name) {
        if ((0, _isFunction["default"])(func)) {
          if (replace) {
            _pandasuiteBridge["default"].unlisten(name);
          }
          _pandasuiteBridge["default"].listen(name, function (data) {
            return func.apply(void 0, _toConsumableArray(data));
          });
        }
      });
    }
  });
};
var PandaBridgeRoot = exports.PandaBridgeRoot = function PandaBridgeRoot(props) {
  var children = props.children;
  return /*#__PURE__*/_react["default"].createElement(_recoil.RecoilRoot, null, children);
};
PandaBridgeRoot.propTypes = {
  children: _propTypes["default"].node.isRequired
};
var BridgeComponent = /*#__PURE__*/function (_Component) {
  _inherits(BridgeComponent, _Component);
  var _super = _createSuper(BridgeComponent);
  function BridgeComponent() {
    _classCallCheck(this, BridgeComponent);
    return _super.apply(this, arguments);
  }
  _createClass(BridgeComponent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        children = _this$props.children,
        rest = _objectWithoutProperties(_this$props, ["children"]);
      return children(rest);
    }
  }]);
  return BridgeComponent;
}(_react.Component);
BridgeComponent.propTypes = {
  children: _propTypes["default"].func.isRequired
};
var WrapperBridge = function WrapperBridge(props) {
  var markers = props.markers,
    actions = props.actions,
    synchronization = props.synchronization,
    component = props.component,
    children = props.children;
  var rest = usePandaBridge({}, {
    markers: markers,
    actions: actions,
    synchronization: synchronization,
    component: component
  });
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-props-no-spreading
    _react["default"].createElement(BridgeComponent, rest, children)
  );
};
WrapperBridge.propTypes = {
  markers: _propTypes["default"].shape({
    getSnapshotDataHook: _propTypes["default"].func,
    setSnapshotDataHook: _propTypes["default"].func
  }),
  actions: _propTypes["default"].objectOf(_propTypes["default"].func),
  synchronization: _propTypes["default"].objectOf(_propTypes["default"].func),
  component: _propTypes["default"].shape({
    getScreenshotHook: _propTypes["default"].func,
    onLanguageChanged: _propTypes["default"].func
  }),
  children: _propTypes["default"].func.isRequired
};
WrapperBridge.defaultProps = {
  markers: {},
  actions: {},
  synchronization: {},
  component: {}
};
var _default = exports["default"] = WrapperBridge;