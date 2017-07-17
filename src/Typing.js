import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getRandomInRange, extractText, replaceTreeText } from './utils';
import Backspace from './Backspace';
import Reset from './Reset';
import Delay from './Delay';
import Speed from './Speed';
import Cursor from './Cursor';

class Typing extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        step: 'char',
      },
    };
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      if (!this.unmounted) {
        this.setState(
          {
            toType: extractText(this.props.children),
          },
          () => {
            this.beginTyping();
          },
        );
      }
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  beginTyping = () => {
    const recurse = () => {
      const { toType, cursor, loop } = this.state;
      if (toType.length > 0 || cursor.numToErase > 0) {
        this.type().then(recurse);
      } else {
        Promise.resolve(this.props.onFinishedTyping()).then(() => {
          if (loop) {
            cursor.lineNum = 0;
            cursor.charPos = 0;
            cursor.numToErase = 0;
            cursor.preEraseLineNum = 0;
            cursor.delay = this.props.startDelay;
            cursor.speed = this.props.speed;
            cursor.step = 'char';

            if (!this.unmounted) {
              this.setState(
                { cursor, text: [], toType: extractText(this.props.children) },
                recurse,
              );
            }
          }
        });
      }
    };
    recurse();
  };

  type() {
    const { toType } = this.state;
    let { cursor } = this.state;

    while (
      toType[0] &&
      toType[0].type &&
      toType[0].type.updateCursor &&
      cursor.numToErase < 1
    ) {
      cursor = toType[0].type.updateCursor(cursor, toType[0].props);
      toType.shift();
    }

    const delay = cursor.delay;
    cursor.delay = 0;

    return new Promise(resolve => {
      if (!this.unmounted) {
        this.setState({ cursor, toType }, () => {
          setTimeout(() => {
            if (cursor.step === 'char' && cursor.numToErase < 1) {
              if (toType.length > 0) {
                this.typeCharacter().then(resolve);
              } else {
                resolve();
              }
            } else {
              this.erase().then(resolve);
            }
          }, delay);
        });
      }
    });
  }

  typeCharacter() {
    const { cursor, text, toType } = this.state;

    return new Promise(resolve => {
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

      if (!this.unmounted) {
        this.setState({ cursor, text, toType }, () => {
          setTimeout(
            resolve,
            getRandomInRange(cursor.speed * 0.9, cursor.speed * 1.1),
          );
        });
      }
    });
  }

  erase() {
    const { cursor } = this.state;
    let { text } = this.state;

    return new Promise(resolve => {
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
          text[cursor.lineNum].length - 1,
        );
      } else if (cursor.numToErase > 0) {
        text[cursor.lineNum] = '';
      } else {
        text = text.map(() => '');
      }

      cursor.charPos -= 1;
      cursor.numToErase -= 1;

      if (cursor.numToErase < 1) {
        cursor.lineNum = cursor.preEraseLineNum;
        cursor.charPos = 0;
        cursor.step = 'char';
      }

      if (!this.unmounted) {
        return this.setState({ cursor, text }, () => {
          setTimeout(
            resolve,
            getRandomInRange(cursor.speed * 0.9, cursor.speed * 1.1),
          );
        });
      }
      return resolve();
    });
  }

  render() {
    const { children, className, cursor } = this.props;
    const filled = replaceTreeText(children, this.state.text, cursor);
    return (
      <div className={className}>
        {filled}
      </div>
    );
  }
}

Typing.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  cursor: PropTypes.node,
  speed: PropTypes.number,
  startDelay: PropTypes.number,
  loop: PropTypes.bool,
  onFinishedTyping: PropTypes.func,
};

Typing.defaultProps = {
  className: '',
  cursor: <Cursor />,
  speed: 50,
  startDelay: 0,
  loop: false,
  onFinishedTyping: () => Promise.resolve(),
};

Typing.Backspace = Backspace;
Typing.Reset = Reset;
Typing.Delay = Delay;
Typing.Speed = Speed;
Typing.Cursor = Cursor;

export default Typing;
