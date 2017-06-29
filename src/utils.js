import React, { Children } from 'react';

const flatten = arr =>
  arr.reduce((acc, item) => acc.concat(Array.isArray(item) ? flatten(item) : item), []);

const removeUndefined = arr => arr.filter(node => node !== undefined);

const isTypingComponent = struct =>
  ['Backspace', 'Delay', 'Speed', 'Reset'].some(
    sub => struct.type && struct.type.getName && struct.type.getName() === sub,
  );

export const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const extractText = (...args) => {
  const traverse = (node) => {
    if (isTypingComponent(node)) {
      return node;
    } else if (React.isValidElement(node)) {
      if (!node.props.children || !node.props.children.length) {
        return '\n';
      }
      return Children.map(node.props.children, child => traverse(child));
    } else if (Array.isArray(node)) {
      return node.map(el => traverse(el));
    }
    return String(node);
  };
  const text = traverse(...args);
  return Array.isArray(text) ? removeUndefined(flatten(text)) : removeUndefined([text]);
};

export const replaceTreeText = (tree, txt, cursor) => {
  let i = 0;
  const traverse = (node, text) => {
    if (text.length < 1) {
      return undefined;
    }

    if (isTypingComponent(node)) {
      return undefined;
    } else if (React.isValidElement(node)) {
      if (!node.props.children || !node.props.children.length) {
        if (text.length === 1) {
          return [text.shift() === '' ? undefined : node, cursor];
        }
        return text.shift() === '' ? undefined : node;
      }
      return React.createElement(
        node.type,
        {
          ...node.props,
          key: `Typing.${node.type}.${(i += 1)}`,
        },
        removeUndefined(Children.toArray(node.props.children).map(child => traverse(child, text))),
      );
    } else if (Array.isArray(node)) {
      return removeUndefined(node.map(el => traverse(el, text)));
    }
    return text.length === 1 ? [text.shift(), cursor] : text.shift() || '';
  };
  return traverse(tree, txt.slice());
};
