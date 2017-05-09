import React from 'react';
import PropTypes from 'prop-types';

const Speed = () => <noscript />;

Speed.updateCursor = (cursor, { ms }) => {
  const nextCursor = cursor;
  nextCursor.speed = ms;
  return nextCursor;
};

Speed.getName = () => 'Speed';

Speed.propTypes = { ms: PropTypes.number.isRequired };

export default Speed;
