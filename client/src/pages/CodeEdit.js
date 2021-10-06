import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CodeEditTitle from '../components/codeEdit/CodeEditTitle';
import CodeEditMain from '../components/codeEdit/CodeEditMain';
import CodeEditSecretButton from '../components/codeEdit/CodeEditSecretButton';
import CodeEditTagBox from '../components/codeEdit/CodeEditTagBox';
import WhiteFooter from '../components/basic/footer/WhiteFooter';

function CodeEdit() {
  const state = useSelector((state) => state.userReducer);
  const { userInfo } = state;
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost } = postState;

  const [codeEditInfo, setCodeEditInfo] = useState({
    title: '',
    postTags: '',
    codeContent: '',
    textContent: '',
    secret: true,
    userId: '',
  });

  useEffect(() => {
    setCodeEditInfo(codePost);
  }, []);

  return (
    <>
      <CodeEditTitle
        codeEditInfo={codeEditInfo}
        setCodeEditInfo={setCodeEditInfo}
      />
      <CodeEditTagBox
        codeEditInfo={codeEditInfo}
        setCodeEditInfo={setCodeEditInfo}
      />
      <CodeEditMain
        codeEditInfo={codeEditInfo}
        setCodeEditInfo={setCodeEditInfo}
      />
      <CodeEditSecretButton
        codeEditInfo={codeEditInfo}
        setCodeEditInfo={setCodeEditInfo}
      />
      <WhiteFooter />
    </>
  );
}

export default CodeEdit;
