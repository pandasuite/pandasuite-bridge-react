"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Button = function Button(props) {
  var children = props.children,
      loading = props.loading,
      primary = props.primary,
      className = props.className,
      rest = _objectWithoutProperties(props, ["children", "loading", "primary", "className"]);

  return (/*#__PURE__*/_react["default"].createElement("button", _extends({
      className: "inline-flex items-center py-1 px-5 text-sm font-medium rounded ".concat(primary ? 'text-white bg-green-500 hover:bg-green-600' : 'text-purple-600 bg-gray-100 hover:bg-gray-200', " focus:outline-none transition ease-in-out duration-150 ").concat(className || '')
    }, rest), loading && /*#__PURE__*/_react["default"].createElement("svg", {
      className: "animate-spin -ml-1 mr-2 h-5 w-5 text-purple-300",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("circle", {
      className: "opacity-25",
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4"
    }), /*#__PURE__*/_react["default"].createElement("path", {
      className: "opacity-75",
      fill: "currentColor",
      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    })), children)
  );
};

Button.propTypes = {
  children: _propTypes["default"].func.isRequired
};
var _default = Button;
exports["default"] = _default;