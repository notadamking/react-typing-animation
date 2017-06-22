'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Reset = function Reset() {
  return _react2.default.createElement('noscript', null);
};

Reset.updateCursor = function (cursor, _ref) {
  var count = _ref.count,
      delay = _ref.delay,
      speed = _ref.speed;

  var nextCursor = cursor;
  nextCursor.numToErase = count;
  nextCursor.preEraseLineNum = nextCursor.lineNum;
  nextCursor.speed = speed > 0 ? speed : nextCursor.speed;
  nextCursor.delay = delay > 0 ? nextCursor.delay + delay : nextCursor.delay;
  nextCursor.step = 'line';
  return nextCursor;
};

Reset.getName = function () {
  return 'Reset';
};

Reset.propTypes = {
  count: _propTypes2.default.number,
  delay: _propTypes2.default.number,
  speed: _propTypes2.default.number
};

Reset.defaultProps = {
  count: 0,
  delay: 0,
  speed: -1
};

var _default = Reset;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Reset, 'Reset', 'src/Reset.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Reset.js');
}();

;