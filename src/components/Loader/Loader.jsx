import React from 'react';
import PropTypes from 'prop-types';
import { Circles } from 'react-loader-spinner';

const Loader = ({ type, color, height, width }) => {
  return (
    <div className="loader">
      <Circles type={type} color={color} height={height} width={width} />
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Loader;