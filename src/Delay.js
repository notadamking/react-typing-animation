import React from 'react';

const Delay = () => <noscript />;

Delay.updateCursor = (cursor, { ms }) => {
  const nextCursor = cursor;
  nextCursor.delay += ms;
  return nextCursor;
};

Delay.getName = () => 'Delay';

export default Delay;
