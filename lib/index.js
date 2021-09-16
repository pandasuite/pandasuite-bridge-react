"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PandaBridgeRoot = exports.usePandaBridge = void 0;

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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var localizedResources = function localizedResources(resources) {
  return (0, _mapValues["default"])((0, _keyBy["default"])(resources, 'id'), function (resource) {
    return {
      id: resource.id,
      path: _pandasuiteBridge["default"].resolvePath(resource.id),
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
  set: function set(_ref4, newMarkers) {
    var _set2 = _ref4.set,
        get = _ref4.get;
    var markers = get(markersState);

    _set2(markersState, (0, _uniqBy["default"])(markers.concat(newMarkers), function (marker) {
      return marker.id;
    }));
  }
});
var firstTime = true;

var usePandaBridge = function usePandaBridge(hooks) {
  var _useRecoilState = (0, _recoil.useRecoilState)(bridgeState),
      _useRecoilState2 = _slicedToArray(_useRecoilState, 2),
      bridge = _useRecoilState2[0],
      setBridge = _useRecoilState2[1];

  var addMarker = (0, _recoil.useSetRecoilState)(addMarkerState);

  var _ref5 = hooks || {},
      markersHooks = _ref5.markers,
      actionsHooks = _ref5.actions,
      synchHooks = _ref5.synchronization,
      componentHooks = _ref5.component;

  var _ref6 = markersHooks || {},
      getSnapshotDataHook = _ref6.getSnapshotDataHook,
      setSnapshotDataHook = _ref6.setSnapshotDataHook;

  var _ref7 = componentHooks || {},
      getScreenshotHook = _ref7.getScreenshotHook,
      onLanguageChanged = _ref7.onLanguageChanged;

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

    if (onLanguageChanged) {
      _pandasuiteBridge["default"].listen(_pandasuiteBridge["default"].LANGUAGE, function (args) {
        onLanguageChanged(args);
      });
    }

    if (getSnapshotDataHook) {
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
      _pandasuiteBridge["default"].setSnapshotData(function (pandaData) {
        if (setSnapshotDataHook) {
          setSnapshotDataHook(pandaData);
        }
      });
    }

    (0, _each["default"])(actionsHooks, function (func, name) {
      if ((0, _isFunction["default"])(func)) {
        _pandasuiteBridge["default"].listen(name, function (data) {
          return func.apply(void 0, _toConsumableArray(data));
        });
      }
    });
    (0, _each["default"])(synchHooks, function (func, name) {
      if ((0, _isFunction["default"])(func)) {
        _pandasuiteBridge["default"].synchronize(name, func);
      }
    });
  }, []);
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

exports.usePandaBridge = usePandaBridge;

var PandaBridgeRoot = function PandaBridgeRoot(props) {
  var children = props.children;
  return (/*#__PURE__*/_react["default"].createElement(_recoil.RecoilRoot, null, children)
  );
};

exports.PandaBridgeRoot = PandaBridgeRoot;
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
  markers: _propTypes["default"].objectOf(_propTypes["default"].func),
  actions: _propTypes["default"].objectOf(_propTypes["default"].func),
  synchronization: _propTypes["default"].objectOf(_propTypes["default"].func),
  component: _propTypes["default"].objectOf(_propTypes["default"].func),
  children: _propTypes["default"].func.isRequired
};
WrapperBridge.defaultProps = {
  markers: {},
  actions: {},
  synchronization: {},
  component: {}
};
var _default = WrapperBridge;
exports["default"] = _default;