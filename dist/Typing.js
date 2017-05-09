'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

var _Backspace = require('./Backspace');

var _Backspace2 = _interopRequireDefault(_Backspace);

var _Reset = require('./Reset');

var _Reset2 = _interopRequireDefault(_Reset);

var _Delay = require('./Delay');

var _Delay2 = _interopRequireDefault(_Delay);

var _Speed = require('./Speed');

var _Speed2 = _interopRequireDefault(_Speed);

var _Cursor = require('./Cursor');

var _Cursor2 = _interopRequireDefault(_Cursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Typing = function (_Component) {
  _inherits(Typing, _Component);

  function Typing(props) {
    _classCallCheck(this, Typing);

    var _this = _possibleConstructorReturn(this, (Typing.__proto__ || Object.getPrototypeOf(Typing)).call(this, props));

    _this.beginTyping = function () {
      var recurse = function recurse() {
        var _this$state = _this.state,
            toType = _this$state.toType,
            cursor = _this$state.cursor,
            loop = _this$state.loop;

        if (toType.length > 0 || cursor.numToErase > 0) {
          _this.type().then(recurse);
        } else {
          Promise.resolve(_this.props.onFinishedTyping()).then(function () {
            if (loop) {
              cursor.lineNum = 0;
              cursor.charPos = 0;
              cursor.numToErase = 0;
              cursor.preEraseLineNum = 0;
              cursor.delay = _this.props.startDelay;
              cursor.speed = _this.props.speed;
              cursor.step = 'char';

              _this.setState({ cursor: cursor, text: [], toType: (0, _utils.extractText)(_this.props.children) }, recurse);
            }
          });
        }
      };
      recurse();
    };

    _this.state = {
      text: [],
      toType: [],
      loop: props.loop,
      cursor: {
        lineNum: 0,
        charPos: 0,
        numToErase: 0,
        preEraseLineNum: 0,
        delay: props.startDelay,
        speed: props.speed,
        step: 'char'
      }
    };
    return _this;
  }

  _createClass(Typing, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      requestAnimationFrame(function () {
        _this2.setState({
          toType: (0, _utils.extractText)(_this2.props.children)
        }, function () {
          _this2.beginTyping();
        });
      });
    }
  }, {
    key: 'type',
    value: function type() {
      var _this3 = this;

      var toType = this.state.toType;
      var cursor = this.state.cursor;


      while (toType[0] && toType[0].type && toType[0].type.updateCursor && cursor.numToErase < 1) {
        cursor = toType[0].type.updateCursor(cursor, toType[0].props);
        toType.shift();
      }

      var delay = cursor.delay;
      cursor.delay = 0;

      return new Promise(function (resolve) {
        _this3.setState({ cursor: cursor, toType: toType }, function () {
          setTimeout(function () {
            if (cursor.step === 'char' && cursor.numToErase < 1) {
              if (toType.length > 0) {
                _this3.typeCharacter().then(resolve);
              } else {
                resolve();
              }
            } else {
              _this3.erase().then(resolve);
            }
          }, delay);
        });
      });
    }
  }, {
    key: 'typeCharacter',
    value: function typeCharacter() {
      var _this4 = this;

      var _state = this.state,
          cursor = _state.cursor,
          text = _state.text,
          toType = _state.toType;


      return new Promise(function (resolve) {
        if (text.length - 1 < cursor.lineNum) {
          text[cursor.lineNum] = '';
        }

        text[cursor.lineNum] += toType[0][cursor.charPos];
        cursor.charPos += 1;

        if (toType[0].length - 1 < cursor.charPos) {
          cursor.lineNum += 1;
          cursor.charPos = 0;
          toType.shift();
        }

        _this4.setState({ cursor: cursor, text: text, toType: toType }, function () {
          setTimeout(resolve, cursor.speed);
        });
      });
    }
  }, {
    key: 'erase',
    value: function erase() {
      var _this5 = this;

      var cursor = this.state.cursor;
      var text = this.state.text;


      return new Promise(function (resolve) {
        while (cursor.lineNum > text.length - 1 || cursor.charPos < 0) {
          cursor.lineNum -= 1;
          cursor.charPos = text[cursor.lineNum].length ? text[cursor.lineNum].length - 1 : 0;
        }

        if (cursor.step === 'char') {
          text[cursor.lineNum] = text[cursor.lineNum].substr(0, text[cursor.lineNum].length - 1);
        } else if (cursor.numToErase > 0) {
          text[cursor.lineNum] = '';
        } else {
          text = text.map(function () {
            return '';
          });
        }

        cursor.charPos -= 1;
        cursor.numToErase -= 1;

        if (cursor.numToErase < 1) {
          cursor.lineNum = cursor.preEraseLineNum;
          cursor.charPos = 0;
          cursor.step = 'char';
        }

        return _this5.setState({ cursor: cursor, text: text }, function () {
          setTimeout(resolve, cursor.speed);
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          cursor = _props.cursor;

      var filled = (0, _utils.replaceTreeText)(children, this.state.text, cursor);
      return _react2.default.createElement(
        'div',
        { className: className },
        filled
      );
    }
  }]);

  return Typing;
}(_react.Component);

Typing.propTypes = {
  children: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  cursor: _propTypes2.default.node,
  speed: _propTypes2.default.number,
  startDelay: _propTypes2.default.number,
  loop: _propTypes2.default.bool,
  onFinishedTyping: _propTypes2.default.func
};

Typing.defaultProps = {
  className: '',
  cursor: _react2.default.createElement(_Cursor2.default, null),
  speed: 50,
  startDelay: 0,
  loop: false,
  onFinishedTyping: function onFinishedTyping() {
    return Promise.resolve();
  }
};

Typing.Backspace = _Backspace2.default;
Typing.Reset = _Reset2.default;
Typing.Delay = _Delay2.default;
Typing.Speed = _Speed2.default;
Typing.Cursor = _Cursor2.default;

exports.default = Typing;