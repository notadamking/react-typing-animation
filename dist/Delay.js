'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Delay = function Delay() {
  return _react2.default.createElement('noscript', null);
};

Delay.updateCursor = function (cursor, _ref) {
  var ms = _ref.ms;

  var nextCursor = cursor;
  nextCursor.delay += ms;
  return nextCursor;
};

Delay.getName = function () {
  return 'Delay';
};

Delay.propTypes = { ms: _propTypes2.default.number.isRequired };

var _default = Delay;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Delay, 'Delay', 'src/Delay.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Delay.js');
}();

;