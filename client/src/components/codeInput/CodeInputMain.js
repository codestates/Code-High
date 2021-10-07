import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CodeEditor from '@uiw/react-textarea-code-editor';

function CodeInputMain({ codeInputInfo, setCodeInputInfo }) {
  const [userCodeCard, setUserCodeCard] = useState({
    codeContent: '',
    textContent: '',
  });
  const [selectLanguage, setSelectLanguage] = useState('');

  useEffect(() => {
    if (codeInputInfo.tagList && codeInputInfo.tagList.language.length !== 0) {
      if (codeInputInfo.tagList.language[0].name === 'C#') {
        setSelectLanguage('cs');
      } else if (codeInputInfo.tagList.language[0].name === 'C++') {
        setSelectLanguage('cpp');
      } else {
        setSelectLanguage(codeInputInfo.tagList.language[0].name);
      }
    }
  }, [codeInputInfo]);

  const handleInputValue = (key) => (e) => {
    setUserCodeCard({ ...userCodeCard, [key]: e.target.value });
  };

  useEffect(() => {
    setCodeInputInfo({
      ...codeInputInfo,
      codeContent: userCodeCard.codeContent,
      textContent: userCodeCard.textContent,
    });
  }, [userCodeCard]);

  return (
    <div className='codeinputmain'>
      <div className='codeinputmain-container'>
        <span className='codeinputmain-code'>
          <CodeEditor
            language={selectLanguage}
            placeholder='Please enter code.'
            onChange={handleInputValue('codeContent')}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: '#f5f5f5',
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
        </span>
        <textarea
          type='text'
          className='codeinputmain-text'
          placeholder='설명을 입력하세요.'
          onChange={handleInputValue('textContent')}
        ></textarea>
      </div>
    </div>
  );
}

export default CodeInputMain;
