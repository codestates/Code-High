import React from 'react';

function CodeInputTitle({ codeInputInfo, setCodeInputInfo }) {
  const handleInputValue = (key) => (e) => {
    setCodeInputInfo({ ...codeInputInfo, [key]: e.target.value });
  };

  return (
    <div className='codeinputtitle'>
      <div className='codeinputtitle-container'>
        <span>제목</span>
        <input
          type='text'
          autoFocus={true}
          onChange={handleInputValue('title')}
        />
      </div>
    </div>
  );
}

export default CodeInputTitle;
