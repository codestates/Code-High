import React, { useEffect, useState } from 'react';

function CodeInputMain ({ codeInputInfo, setCodeInputInfo }) {
  const [userCodeCard, setUserCodeCard] = useState({
    codeContent: '',
    textContent: ''
  });

  const handleInputValue = (key) => (e) => {
    setUserCodeCard({ ...userCodeCard, [key]: e.target.value });
  };

  useEffect(()=>{
    setCodeInputInfo({ ...codeInputInfo, codeContent: userCodeCard.codeContent, textContent: userCodeCard.textContent});
  },[userCodeCard])
  // console.log(codeInputInfo)

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
