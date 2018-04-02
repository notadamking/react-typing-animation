import React from 'react';

const Delay = () => <noscript />;

Delay.updateCursor = (cursor, { ms }) => {
  return {
    ...cursor,
    delay: cursor.delay + ms,
  };
};

Delay.getName = () => 'Delay';

export default Delay;
