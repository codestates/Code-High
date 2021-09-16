import React from 'react';
import CodeInputMain from '../components/codeInput/CodeInputMain';
import CodeInputSecretButton from '../components/codeInput/CodeInputSecretButton';
import CodeInputTitle from '../components/codeInput/CodeInputTitle';
import CodeInputTagBox from '../components/codeInput/CodeInputTagBox';
import WhiteFooter from '../components/basic/footer/WhiteFooter';
import NavBar from '../components/basic/navbar/NavBar';

function CodeInput () {
  return (
    <>
      <NavBar />
      <CodeInputTitle />
      <CodeInputTagBox />
      <CodeInputMain />
      <CodeInputSecretButton />
      <WhiteFooter />
    </>
  );
}

export default CodeInput;
