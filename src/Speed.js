import React from 'react';

const Speed = () => <noscript />;

Speed.updateCursor = (cursor, { ms }) => {
  return {
    ...cursor,
    speed: ms,
  };
};

Speed.getName = () => 'Speed';

export default Speed;
