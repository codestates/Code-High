import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CodeEditor, { SelectionText } from '@uiw/react-textarea-code-editor';

function CodeEditMain({ codeEditInfo, setCodeEditInfo }) {
  const textRef = React.useRef();
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost } = postState;

  const [userCodeCard, setUserCodeCard] = useState({
    codeContent: '',
    textContent: '',
  });

  const handleInputValue = (key) => (e) => {
    setUserCodeCard({ ...userCodeCard, [key]: e.target.value });
  };

  useEffect(() => {
    setCodeEditInfo({
      ...codeEditInfo,
      codeContent: userCodeCard.codeContent,
      textContent: userCodeCard.textContent,
    });
  }, [userCodeCard]);

  useEffect(() => {
    if (textRef.current) {
      const obj = new SelectionText(textRef.current);
      // console.log("obj:", obj);
    }
  }, []);

  return (
    <div className='codeinputmain'>
      <div className='codeinputmain-container'>
        <span className='codeinputmain-code'>
          <CodeEditor
            value={codePost.codeContent}
            ref={textRef}
            language='js'
            placeholder='Please enter code.'
            onChange={(evn) => setCode(evn.target.value)}
            onChange={handleInputValue('codeContent')}
            style={{
              fontSize: 15,
              backgroundColor: '#f5f5f5',
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
          {/* <textarea
          type='text'
          className='codeinputmain-code'
          placeholder='코드를 입력하세요.'
          onChange={handleInputValue('codeContent')}
          defaultValue={codePost.codeContent}
        ></textarea> */}
        </span>
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
