import React from 'react';
import Button from '../basic/button/Button';

function CodeInputSecretButton(){
  return (
    <div className='codeinputsecretbutton'>
      <div className='codeinputsecretbutton-container'>
        <div className='codeinputsecretbutton-checkbox'>
          <input type='checkbox' />
          <span>코드 리뷰 공개</span>
        </div>
        <div className='codeinputsecretbutton-button'>
          <Button content='SAVE' backgroundColor='#2F8C4C' color='#fff'/>
        </div>
      </div>
    </div>
  );
};

export default CodeInputSecretButton;