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

var renderColor = function renderColor(type) {
  if (type === 'danger') {
    return 'bg-red-50 text-red-600';
  }

  return 'bg-blue-50 text-blue-600';
};

var renderPath = function renderPath(type) {
  if (type === 'danger') {
    return (/*#__PURE__*/_react["default"].createElement("path", {
        fillRule: "evenodd",
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
        clipRule: "evenodd"
      })
    );
  }

  return (/*#__PURE__*/_react["default"].createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
      clipRule: "evenodd"
    })
  );
};

var Alert = function Alert(props) {
  var children = props.children,
      type = props.type,
      className = props.className,
      rest = _objectWithoutProperties(props, ["children", "type", "className"]);

  return (/*#__PURE__*/_react["default"].createElement("div", _extends({
      className: "flex rounded-lg p-5 text-base place-items-center font-light ".concat(renderColor(type), " ").concat(className || '')
    }, rest), /*#__PURE__*/_react["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-4 w-4 mr-2 opacity-60",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }, renderPath(type)), children)
  );
};

Alert.defaultProps = {
  type: 'primary',
  className: ''
};
Alert.propTypes = {
  children: _propTypes["default"].func.isRequired,
  type: _propTypes["default"].string,
  className: _propTypes["default"].string
};
var _default = Alert;
exports["default"] = _default;