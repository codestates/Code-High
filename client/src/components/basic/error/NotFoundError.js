import React from 'react';
import notfound from '../../../images/notfound.svg';

const NotFoundError = () => {
  return (
    <div className='error-container'>
      <img src={notfound} alt='Error' />
    </div>
  );
};

export default NotFoundError;
