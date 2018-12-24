import React, { Component } from 'react';
import PropTypes from 'prop-types';
import requestAnimationFrame from 'raf';

import {
  randomize,
  extractText,
  replaceTreeText,
  getCircularReplacer,
} from './utils';
import Backspace from './Backspace';
import Reset from './Reset';
import Delay from './Delay';
import Speed from './Speed';
import Cursor from './Cursor';

class Typing extends Component {
  state = {
    isFinished: false,
    text: [],
  };

  componentDidUpdate(prevProps) {
    const { children } = this.props;

    if (
      children !== undefined &&
      JSON.stringify(children, getCircularReplacer()) !==
        JSON.stringify(prevProps.children, getCircularReplacer())
    ) {
      this.resetState();
    }
  }

  componentDidMount() {
    this.hasMounted = true;
    this.resetState().then(async () => {
      await this.props.onStartedTyping();
      requestAnimationFrame(this.beginTyping);
    });
  }

  componentWillUnmount() {
    this.hasMounted = false;
  }

  updateState = async state => {
    if (this.hasMounted) {
      return new Promise(resolve => {
        this.setState(state, resolve);
      });
    }
  };

  resetState = async () =>
    this.updateState({
      toType: extractText(this.props.children),
      cursor: {
        lineNum: 0,
        charPos: 0,
        numToErase: 0,
        preEraseLineNum: 0,
        delay: this.props.startDelay,
        speed: this.props.speed,
        step: 'char',
      },
    });

  beginTyping = async () => {
    const cursor = { ...this.state.cursor };

    if (this.state.toType.length > 0 || cursor.numToErase > 0) {
      await this.props.onBeforeType(this.state.text);
      await this.type();
      await this.props.onAfterType(this.state.text);
    } else {
      await this.props.onFinishedTyping();

      if (this.props.loop) {
        await this.resetState();
      } else {
        return this.updateState({ isFinished: true });
      }
    }

    if (this.hasMounted) {
      return this.beginTyping();
    }
  };

  type = async () => {
    const toType = [...this.state.toType];
    let cursor = { ...this.state.cursor };

    while (
      toType &&
      toType[0] &&
      toType[0].type &&
      toType[0].type.updateCursor &&
      cursor.numToErase < 1
    ) {
      cursor = toType[0].type.updateCursor(cursor, toType[0].props);
      toType.shift();
    }

    await this.updateState({ cursor, toType });

    return this.animateNextStep();
  };

  animateNextStep = async () =>
    new Promise(resolve => {
      setTimeout(async () => {
        const { cursor, toType } = this.state;

        await this.updateState({ cursor: { ...cursor, delay: 0 } });

        if (cursor.step === 'char' && cursor.numToErase < 1) {
          if (toType.length > 0) {
            await this.typeCharacter();
          }
        } else {
          await this.erase();
        }

        resolve();
      }, this.state.cursor.delay);
    });

  typeCharacter = async () =>
    new Promise(async resolve => {
      const toType = [...this.state.toType];
      const text = [...this.state.text];
      const cursor = { ...this.state.cursor };

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

      await this.updateState({ cursor, text, toType });

      setTimeout(resolve, randomize(cursor.speed));
    });

  erase = async () =>
    new Promise(async resolve => {
      const text = [...this.state.text];
      const cursor = { ...this.state.cursor };

      while (cursor.lineNum > text.length - 1 || cursor.charPos < 0) {
        cursor.lineNum -= 1;

        if (cursor.lineNum < 0) {
          break;
        }

        cursor.charPos = text[cursor.lineNum].length
          ? text[cursor.lineNum].length - 1
          : 0;
      }

      if (cursor.step === 'char' && cursor.lineNum >= 0) {
        text[cursor.lineNum] = text[cursor.lineNum].substr(
          0,
          text[cursor.lineNum].length - 1
        );
      } else if (cursor.numToErase > 0) {
        text[cursor.lineNum] = '';
      } else {
        text.length = 0;
      }

      cursor.charPos -= 1;
      cursor.numToErase -= 1;

      if (cursor.numToErase < 1) {
        cursor.lineNum = cursor.preEraseLineNum;
        cursor.charPos = 0;
        cursor.step = 'char';
      }

      await this.updateState({ cursor, text });

      setTimeout(resolve, randomize(cursor.speed));
    });

  render() {
    const { children, className, cursorClassName, hideCursor } = this.props;
    const { isFinished, text } = this.state;

    const cursor = this.props.cursor || <Cursor className={cursorClassName} />;

    const filled = replaceTreeText(
      children,
      text,
      cursor,
      isFinished || hideCursor
    );

    return <div className={className}>{filled}</div>;
  }
}

Typing.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  cursor: PropTypes.node,
  cursorClassName: PropTypes.string,
  speed: PropTypes.number,
  startDelay: PropTypes.number,
  loop: PropTypes.bool,
  onStartedTyping: PropTypes.func,
  onBeforeType: PropTypes.func,
  onAfterType: PropTypes.func,
  onFinishedTyping: PropTypes.func,
};

Typing.defaultProps = {
  className: '',
  cursorClassName: '',
  speed: 50,
  startDelay: 0,
  loop: false,
  onStartedTyping: () => {},
  onBeforeType: () => {},
  onAfterType: () => {},
  onFinishedTyping: () => {},
};

Typing.Backspace = Backspace;
Typing.Reset = Reset;
Typing.Delay = Delay;
Typing.Speed = Speed;
Typing.Cursor = Cursor;

export default Typing;
