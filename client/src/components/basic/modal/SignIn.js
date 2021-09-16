import React from 'react';
import Signinimg from '../../../images/Signinimg.svg';
import codehighlogo from '../../../images/codehighlogo.png';
import github from '../../../images/github.png';
import kakao from '../../../images/kakao.png';
import naver from '../../../images/naver.png';


function SignIn(){
  const CLIENT_ID = '797d18ff9367b68e06251728d174cc39';
  const REDIRECT_URI = 'http://localhost:3000';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  
  return (
    <div className='signin-modal'>
      <div className='signin-modal-overlay'></div>
      <div className='signin-container'>
        <div className='signin-right'>
          <img src={Signinimg} alt='signin' />
        </div>
        <div className='signin-left'>
          <div className='signin-close'>&times;</div>
          <img src={codehighlogo} alt='logo' />
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
            <a href=''><img src={github} alt='github' /></a>
            <a href={KAKAO_AUTH_URL}><img src={kakao} alt='kakao' /></a>
            <a href=''><img src={naver} alt='naver' /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;