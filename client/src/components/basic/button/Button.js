import React from 'react';

function GreenButton(props){
  const { content, onClickHandle, backgroundColor, color } = props;
  //backgroundColor: `#191A20` -> 형식
  //props 넘겨줄 때는 content={'확인'}

  return (
    <div
      style={{
        backgroundColor,
        color
      }}
      onClick={onClickHandle}
    >{content}</div>
  );
};

export default GreenButton;