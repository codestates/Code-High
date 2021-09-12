import React from 'react';

function SignIn(){
  return (
    <div className='signin-modal'>
      <div className='signin-modal-overlay'></div>
      <div className='signin-container'>
        <div className='signin-right'>
          <img src='/image/Mobile login-pana.svg' alt='signin' />
        </div>
        <div className='signin-left'>
          <div className='signin-close'>&times;</div>
          <img src='/image/codehighlogo.png' alt='logo' />
          <article>
            <input placeholder='Email'/>
            <input placeholder='Password'/>
          </article>
          <div className='signin-button-container'>
            <button>로그인</button>
          </div>
          <ul>
            <li><a href=''>비밀번호 찾기</a></li>
            <li><a href=''>회원가입</a></li>
          </ul>
          <div className='signin-oauth-container'>
            <a href=''><img src='/image/github.png' alt='github' /></a>
            <a href=''><img src='/image/kakao.png' alt='kakao' /></a>
            <a href=''><img src='/image/naver.png' alt='naver' /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;