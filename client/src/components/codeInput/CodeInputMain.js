import React, { useEffect, useState } from 'react';

function CodeInputMain () {
  const [userCodeCard, setUserCodeCard] = useState({
    codeContent: '',
    textContent: ''
  });

  const handleInputValue = (key) => (e) => {
    setUserCodeCard({ ...userCodeCard, [key]: e.target.value });
  };

  return (
    <div className='codeinputmain'>
      <div className='codeinputmain-container'>
        <textarea
          type='text'
          className='codeinputmain-code'
          placeholder='코드를 입력하세요.'
          onChange={handleInputValue('codeContent')}
        />
        <textarea
          type='text'
          className='codeinputmain-text'
          placeholder='설명을 입력하세요.'
          onChange={handleInputValue('textContent')}
        />
      </div>
    </div>
  );
}

export default CodeInputMain;