import React from 'react';
import PropTypes from 'prop-types';

const Backspace = () => <noscript />;

Backspace.updateCursor = (cursor, { speed, count, delay }) => {
  const nextCursor = cursor;
  nextCursor.numToErase = count;
  nextCursor.preEraseLineNum = nextCursor.lineNum;
  nextCursor.speed = speed > 0 ? speed : nextCursor.speed;
  nextCursor.delay = delay > 0 ? nextCursor.delay + delay : nextCursor.delay;
  return nextCursor;
};

Backspace.getName = () => 'Backspace';

Backspace.propTypes = {
  count: PropTypes.number,
  delay: PropTypes.number,
  speed: PropTypes.number,
};

Backspace.defaultProps = {
  count: 1,
  delay: 0,
  speed: -1,
};

export default Backspace;
