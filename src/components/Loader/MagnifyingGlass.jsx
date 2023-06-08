import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <MagnifyingGlass
      visible={true}
      height={80}
      width={80}
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#b4dcea"
      color="#354391"
    />
  );
};

export default LoadingSpinner;