import React from 'react';

const Backspace = () => <noscript />;

Backspace.updateCursor = (cursor, { speed, count, delay }) => {
  return {
    ...cursor,
    numToErase: count,
    preEraseLineNum: cursor.lineNum,
    speed: speed > 0 ? speed : cursor.speed,
    delay: delay > 0 ? cursor.delay + delay : cursor.delay,
  };
};

Backspace.getName = () => 'Backspace';

export default Backspace;
