"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _each = _interopRequireDefault(require("lodash/each"));
var _map = _interopRequireDefault(require("lodash/map"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function getDefaultActiveKey(children) {
  var defaultActiveKey;
  (0, _each["default"])(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}
function renderContent(activeKey, children) {
  var content = null;
  (0, _each["default"])(children, function (child) {
    if (child.props.eventKey == activeKey) {
      content = child.props.children;
    }
  });
  return content;
}
var Tabs = function Tabs(props) {
  var children = _react["default"].Children.toArray(props.children);
  var _props$activeKey = props.activeKey,
    activeKey = _props$activeKey === void 0 ? getDefaultActiveKey(children) : _props$activeKey,
    className = props.className;
  var _useState = (0, _react.useState)(activeKey),
    _useState2 = _slicedToArray(_useState, 2),
    currentActiveKey = _useState2[0],
    setCurrentActiveKey = _useState2[1];
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex sticky top-0 z-50 bg-white w-full ".concat(className || '')
  }, (0, _map["default"])(children, function (child) {
    var _child$props = child.props,
      title = _child$props.title,
      eventKey = _child$props.eventKey;
    var isActive = currentActiveKey == eventKey;
    if (title == null) {
      return null;
    }
    return /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      eventKey: eventKey,
      className: "border-t-2 m-1 mt-0 p-1 focus:outline-none ".concat(isActive ? 'border-indigo-600' : 'border-white'),
      onClick: function onClick() {
        setCurrentActiveKey(eventKey);
      }
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "uppercase font-sans text-base pt-2.5 ".concat(isActive ? 'text-gray-700' : 'text-gray-400')
    }, title));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-2 pb-2.5"
  }, renderContent(currentActiveKey, children)));
};
Tabs.propTypes = {
  children: _propTypes["default"].func.isRequired,
  activeKey: _propTypes["default"].string
};
var _default = exports["default"] = Tabs;