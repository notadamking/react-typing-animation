import React from 'react';

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

export default Backspace;
