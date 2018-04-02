import React from 'react';

const Reset = () => <noscript />;

Reset.updateCursor = (cursor, { count, delay, speed }) => {
  return {
    ...cursor,
    numToErase: count,
    preEraseLineNum: cursor.lineNum,
    speed: speed > 0 ? speed : cursor.speed,
    delay: delay > 0 ? cursor.delay + delay : cursor.delay,
    step: 'line',
  };
};

Reset.getName = () => 'Reset';

export default Reset;
