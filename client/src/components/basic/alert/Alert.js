import React from 'react';

function Alert (props) {
  const { content } = props;

  return (
    <div className='alert-modal'>
      <div className='alert-modal-overlay' />
      <div className='alert-container'>
        <div className='alert-box'>
          <div className='alert-close'>&times;</div>
          <article>
            <div>{content}</div>
          </article>
          <div className='alert-button-container'>
            <button>확인</button>
            <button>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alert;
