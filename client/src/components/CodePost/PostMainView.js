import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';

const PostMain = () => {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost } = postState;
  const [codeLanguage, setCodeLanguage] = useState('js')

  console.log(codePost.postTags);

useEffect(()=>{
  if(codePost.postTags.language.length !== 0) {
  if(codePost.postTags.language[0].name==='C#'){
    setCodeLanguage('cs')
  } else if(codePost.postTags.language[0].name==='C++'){
    setCodeLanguage('cpp')
  } else {
    setCodeLanguage(codePost.postTags.language[0].name)
  }
}
},[])

  return (
    <div className='codepostmain'>
      <div className='codepostview-container'>
        <span className='codepostview-code'>
          <CodeEditor
            readOnly
            value={codePost.codeContent}
            language={codeLanguage}
            style={{
              fontSize: 15,
              backgroundColor: '#f5f5f5',
              fontWeight:500,
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
        </span>
        <span className='codepostview-text'>{codePost.textContent}</span>
      </div>
    </div>
  );
};

export default PostMain;
