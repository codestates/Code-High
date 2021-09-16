import React from 'react';
import Button from '../basic/button/Button';

function ButtonContainer(){
  
  return (
    <div className='buttoncontainer'>
      <div className='buttoncontainer-container up-on-scroll'>
        <div>
          <Button content='가입하기' backgroundColor='#E1E1E1'/>
        </div>
      </div>
    </div>
  );
};

export default ButtonContainer;