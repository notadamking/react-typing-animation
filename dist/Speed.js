'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Speed = function Speed() {
  return _react2.default.createElement('noscript', null);
};

Speed.updateCursor = function (cursor, _ref) {
  var ms = _ref.ms;

  var nextCursor = cursor;
  nextCursor.speed = ms;
  return nextCursor;
};

Speed.getName = function () {
  return 'Speed';
};

Speed.propTypes = { ms: _propTypes2.default.number.isRequired };

var _default = Speed;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Speed, 'Speed', 'src/Speed.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Speed.js');
}();

;