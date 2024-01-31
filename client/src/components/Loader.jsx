import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4e7cff"
        secondaryColor="#f65164"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p style={{ marginTop: '10px' }}>Please Wait</p>
    </div>
  )
}

export default Loader;
