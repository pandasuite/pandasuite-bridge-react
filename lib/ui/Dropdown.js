"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DropdownItem = _interopRequireDefault(require("./DropdownItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Dropdown = function Dropdown(props) {
  var children = props.children,
      className = props.className,
      rest = _objectWithoutProperties(props, ["children", "className"]);

  return (/*#__PURE__*/_react["default"].createElement("select", _extends({
      className: "py-1 px-3 bg-no-repeat appearance-none rounded text-sm bg-gray-100 border-none hover:bg-gray-200 focus:ring-0 focus:outline-none ".concat(className || ''),
      style: {
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path fill='currentColor' d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'></path></svg>\")",
        backgroundPosition: 'right center',
        backgroundPositionY: 'center',
        backgroundPositionX: 'calc(100% - 0.75em)',
        backgroundSize: '9px',
        paddingRight: 'calc(1.5em + 9px)'
      }
    }, rest), children)
  );
};

Dropdown.propTypes = {
  children: _propTypes["default"].func.isRequired
};
Dropdown.Item = _DropdownItem["default"];
var _default = Dropdown;
exports["default"] = _default;