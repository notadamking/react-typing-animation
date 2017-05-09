'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  from, to {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n  }\n'], ['\n  from, to {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  font-weight: 100;\n  color: black;\n  font-size: 1em;\n  padding-left: 2px;\n  animation: ', ' 1s step-end infinite;\n'], ['\n  font-weight: 100;\n  color: black;\n  font-size: 1em;\n  padding-left: 2px;\n  animation: ', ' 1s step-end infinite;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var blink = (0, _styledComponents.keyframes)(_templateObject);

var CursorSpan = _styledComponents2.default.span(_templateObject2, blink);

var Cursor = function Cursor(_ref) {
  var className = _ref.className;
  return _react2.default.createElement(
    CursorSpan,
    { className: className },
    '|'
  );
};

Cursor.propTypes = { className: _propTypes2.default.string };
Cursor.defaultProps = { className: '' };

exports.default = Cursor;