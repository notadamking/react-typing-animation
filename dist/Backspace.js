'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Backspace = function Backspace() {
  return _react2.default.createElement('noscript', null);
};

Backspace.updateCursor = function (cursor, _ref) {
  var speed = _ref.speed,
      count = _ref.count,
      delay = _ref.delay;

  var nextCursor = cursor;
  nextCursor.numToErase = count;
  nextCursor.preEraseLineNum = nextCursor.lineNum;
  nextCursor.speed = speed > 0 ? speed : nextCursor.speed;
  nextCursor.delay = delay > 0 ? nextCursor.delay + delay : nextCursor.delay;
  return nextCursor;
};

Backspace.getName = function () {
  return 'Backspace';
};

Backspace.propTypes = {
  count: _propTypes2.default.number,
  delay: _propTypes2.default.number,
  speed: _propTypes2.default.number
};

Backspace.defaultProps = {
  count: 1,
  delay: 0,
  speed: -1
};

var _default = Backspace;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Backspace, 'Backspace', 'src/Backspace.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Backspace.js');
}();

;