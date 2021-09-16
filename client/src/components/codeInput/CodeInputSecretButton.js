import React from 'react';
import Button from '../basic/button/Button';

function CodeInputSecretButton() {
  //공개 비공개 여부 서버로 보내야함. T/F
  return (
    <div className='codeinputsecretbutton'>
      <div className='codeinputsecretbutton-container'>
        <div className='codeinputsecretbutton-checkbox'>
          <input type='checkbox' />
          <span>코드 리뷰 공개</span>
        </div>
        <div className='codeinputsecretbutton-button'>
          <Button content='SAVE' backgroundColor='#2F8C4C' color='#fff' />
        </div>
      </div>
    </div>
  );
}

export default CodeInputSecretButton;
