import React from 'react';
import welcome from '../../../images/welcome.svg';

function NoticeForSignup() {
  return (
    <>
      <div className='login-error-container'>
        <img src={welcome} al='loginerror' />
        <div>
          이메일 인증이 미완료된 회원입니다.
          <br />
          가입하신 메일함을 확인해주세요.
        </div>
      </div>
    </>
  );
}

export default NoticeForSignup;
