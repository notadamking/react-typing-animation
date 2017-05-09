import React from 'react';
import PropTypes from 'prop-types';

const Delay = () => <noscript />;

Delay.updateCursor = (cursor, { ms }) => {
  const nextCursor = cursor;
  nextCursor.delay += ms;
  return nextCursor;
};

Delay.getName = () => 'Delay';

Delay.propTypes = { ms: PropTypes.number.isRequired };

export default Delay;
