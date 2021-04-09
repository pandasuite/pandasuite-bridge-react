"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _each = _interopRequireDefault(require("lodash/each"));

var _map = _interopRequireDefault(require("lodash/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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

  return (/*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex sticky top-0 z-50 bg-white w-full ".concat(className || '')
    }, (0, _map["default"])(children, function (child) {
      var _child$props = child.props,
          title = _child$props.title,
          eventKey = _child$props.eventKey;
      var isActive = currentActiveKey == eventKey;

      if (title == null) {
        return null;
      }

      return (/*#__PURE__*/_react["default"].createElement("button", {
          type: "button",
          eventKey: eventKey,
          className: "border-t-2 m-1 mt-0 p-1 focus:outline-none ".concat(isActive ? 'border-indigo-600' : 'border-white'),
          onClick: function onClick() {
            setCurrentActiveKey(eventKey);
          }
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "uppercase font-sans text-base pt-2.5 ".concat(isActive ? 'text-gray-700' : 'text-gray-400')
        }, title))
      );
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "px-2 pb-2.5"
    }, renderContent(currentActiveKey, children)))
  );
};

Tabs.propTypes = {
  children: _propTypes["default"].func.isRequired,
  activeKey: _propTypes["default"].string
};
var _default = Tabs;
exports["default"] = _default;