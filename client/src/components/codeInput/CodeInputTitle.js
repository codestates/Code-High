import React from 'react';

function CodeInputTitle() {
  //리덕스 후 같이 보내줘야함.
  return (
    <div className='codeinputtitle'>
      <div className='codeinputtitle-container'>
        <span>제목</span>
        <input type='text' autofocus='true'></input>
      </div>
    </div>
  );
}

export default CodeInputTitle;
