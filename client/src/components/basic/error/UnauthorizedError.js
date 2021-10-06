import React from 'react';
import unauthorized from '../../../images/unauthorized.svg';

function UnauthorizedError() {
  return (
    <>
      <div className='error-container'>
        <img src={unauthorized} alt='Error' />
      </div>
    </>
  );
}

export default UnauthorizedError;
