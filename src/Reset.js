import React from 'react';

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

export default Reset;
