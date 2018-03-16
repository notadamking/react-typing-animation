import React from 'react';

const Speed = () => <noscript />;

Speed.updateCursor = (cursor, { ms }) => {
  const nextCursor = cursor;
  nextCursor.speed = ms;
  return nextCursor;
};

Speed.getName = () => 'Speed';

export default Speed;
