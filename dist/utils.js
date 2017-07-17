'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceTreeText = exports.extractText = exports.getRandomInRange = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flatten = function flatten(arr) {
  return arr.reduce(function (acc, item) {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
};

var removeUndefined = function removeUndefined(arr) {
  return arr.filter(function (node) {
    return node !== undefined;
  });
};

var isTypingComponent = function isTypingComponent(struct) {
  return ['Backspace', 'Delay', 'Speed', 'Reset'].some(function (sub) {
    return struct.type && struct.type.getName && struct.type.getName() === sub;
  });
};

var getRandomInRange = exports.getRandomInRange = function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var extractText = exports.extractText = function extractText() {
  var traverse = function traverse(node) {
    if (isTypingComponent(node)) {
      return node;
    } else if (_react2.default.isValidElement(node)) {
      if (!node.props.children || !node.props.children.length) {
        return '\n';
      }
      return _react.Children.map(node.props.children, function (child) {
        return traverse(child);
      });
    } else if (Array.isArray(node)) {
      return node.map(function (el) {
        return traverse(el);
      });
    }
    return String(node);
  };
  var text = traverse.apply(undefined, arguments);
  return Array.isArray(text) ? removeUndefined(flatten(text)) : removeUndefined([text]);
};

var replaceTreeText = exports.replaceTreeText = function replaceTreeText(tree, txt, cursor) {
  var i = 0;
  var traverse = function traverse(node, text) {
    if (text.length < 1) {
      return undefined;
    }

    if (isTypingComponent(node)) {
      return undefined;
    } else if (_react2.default.isValidElement(node)) {
      if (!node.props.children || !node.props.children.length) {
        if (text.length === 1) {
          return [text.shift() === '' ? undefined : node, cursor];
        }
        return text.shift() === '' ? undefined : node;
      }
      return _react2.default.createElement(node.type, _extends({}, node.props, {
        key: 'Typing.' + node.type + '.' + (i += 1)
      }), removeUndefined(_react.Children.toArray(node.props.children).map(function (child) {
        return traverse(child, text);
      })));
    } else if (Array.isArray(node)) {
      return removeUndefined(node.map(function (el) {
        return traverse(el, text);
      }));
    }
    return text.length === 1 ? [text.shift(), cursor] : text.shift() || '';
  };
  return traverse(tree, txt.slice());
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(flatten, 'flatten', 'src/utils.js');

  __REACT_HOT_LOADER__.register(removeUndefined, 'removeUndefined', 'src/utils.js');

  __REACT_HOT_LOADER__.register(isTypingComponent, 'isTypingComponent', 'src/utils.js');

  __REACT_HOT_LOADER__.register(getRandomInRange, 'getRandomInRange', 'src/utils.js');

  __REACT_HOT_LOADER__.register(extractText, 'extractText', 'src/utils.js');

  __REACT_HOT_LOADER__.register(replaceTreeText, 'replaceTreeText', 'src/utils.js');
}();

;