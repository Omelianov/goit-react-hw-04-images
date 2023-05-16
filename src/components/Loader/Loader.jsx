import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader = ({ type, color, height, width }) => {
  return (
    <div className="loader">
      <Circles type={type} color={color} height={height} width={width} />
    </div>
  );
};
<Loader type="Circles" color="blue" height={80} width={80} />


export default Loader;