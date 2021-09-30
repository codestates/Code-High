import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function CodeEditMain ({ codeEditInfo, setCodeEditInfo }) {
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost } = postState;
  
  const [userCodeCard, setUserCodeCard] = useState({
    codeContent: '',
    textContent: ''
  });

  const handleInputValue = (key) => (e) => {
    setUserCodeCard({ ...userCodeCard, [key]: e.target.value });
  };

  useEffect(()=>{
    setCodeEditInfo({ ...codeEditInfo, codeContent: userCodeCard.codeContent, textContent: userCodeCard.textContent});
  },[userCodeCard])

  return (
    <div className='codeinputmain'>
      <div className='codeinputmain-container'>
        <textarea
          type='text'
          className='codeinputmain-code'
          placeholder='코드를 입력하세요.'
          onChange={handleInputValue('codeContent')}
          defaultValue={codePost.codeContent}
        ></textarea>
        <textarea
          type='text'
          className='codeinputmain-text'
          placeholder='설명을 입력하세요.'
          onChange={handleInputValue('textContent')}
          defaultValue={codePost.textContent}
        ></textarea>
      </div>
    </div>
  );
}

export default CodeEditMain;
