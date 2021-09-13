import React from 'react';
import loadinggif from '../../../images/loadinggif.gif';

function Loding(){
  return (
    <div className='loading-container'>
      <div>Loading..</div>
      <img src={loadinggif} alt='loading' />
    </div>
  );
};

export default Loding;