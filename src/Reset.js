import React from 'react';
import PropTypes from 'prop-types';

const Reset = () => <noscript />;

Reset.updateCursor = (cursor, { count, delay, speed }) => {
  const nextCursor = cursor;
  nextCursor.numToErase = count;
  nextCursor.preEraseLineNum = nextCursor.lineNum;
  nextCursor.speed = speed > 0 ? speed : nextCursor.speed;
  nextCursor.delay = delay > 0 ? nextCursor.delay + delay : nextCursor.delay;
  nextCursor.step = 'line';
  return nextCursor;
};

Reset.getName = () => 'Reset';

Reset.propTypes = {
  count: PropTypes.number,
  delay: PropTypes.number,
  speed: PropTypes.number,
};

Reset.defaultProps = {
  count: 0,
  delay: 0,
  speed: -1,
};

export default Reset;
