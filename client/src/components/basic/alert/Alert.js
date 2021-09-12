import React from 'react';

function Alert(){
  return (
    <div className='alert-modal'>
    <div className='alert-modal-overlay'></div>
    <div className='alert-container'>
      <div className='alert-box'>
        <div className='alert-close'>&times;</div>
        <article>
          <div>회원정보를 변경하시겠습니까?</div>
        </article>
        <div className='alert-button-container'>
          <button>확인</button>
          <button>취소</button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Alert;