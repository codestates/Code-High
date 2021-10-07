import React from 'react';
import loginerror from '../../../images/loginerror.svg';

function LoginError() {
  return (
    <>
      <div className='login-error-container'>
        <img src={loginerror} al='loginerror' />
        <div>
          로그인을 해주세요.
          <br />
          체험을 원하신다면, '게스트 로그인'으로 접속하시면 됩니다.
        </div>
      </div>
    </>
  );
}

export default LoginError;
