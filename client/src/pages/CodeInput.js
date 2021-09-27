import React, { useState, useEffect }from 'react';
import { useSelector } from 'react-redux';
import CodeInputMain from '../components/codeInput/CodeInputMain';
import CodeInputSecretButton from '../components/codeInput/CodeInputSecretButton';
import CodeInputTitle from '../components/codeInput/CodeInputTitle';
import CodeInputTagBox from '../components/codeInput/CodeInputTagBox';
import WhiteFooter from '../components/basic/footer/WhiteFooter';

function CodeInput () {
  const state = useSelector(state => state.userReducer);
  const { userInfo } = state;

  const [codeInputInfo, setCodeInputInfo] = useState({
    title:'',
    tag:'',
    codeContent:'',
    textContent:'',
    secret:true,
    userId:''
  });

  useEffect(()=>{
    if(userInfo) {
      setCodeInputInfo({...codeInputInfo, userId: userInfo.id})
    } else {
      setCodeInputInfo({...codeInputInfo, userId: 0})
    }
  },[])

  return (
    <>
      <CodeInputTitle codeInputInfo={codeInputInfo} setCodeInputInfo={setCodeInputInfo}/>
      <CodeInputTagBox codeInputInfo={codeInputInfo} setCodeInputInfo={setCodeInputInfo}/>
      <CodeInputMain codeInputInfo={codeInputInfo} setCodeInputInfo={setCodeInputInfo}/>
      <CodeInputSecretButton codeInputInfo={codeInputInfo} setCodeInputInfo={setCodeInputInfo}/>
      <WhiteFooter />
    </>
  );
}

export default CodeInput;
