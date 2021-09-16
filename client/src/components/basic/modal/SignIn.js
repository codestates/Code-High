import React, { useRef } from 'react';
import Signinimg from '../../../images/Signinimg.svg';
import codehighlogo from '../../../images/codehighlogo.png';
import github from '../../../images/github.png';
import kakao from '../../../images/kakao.png';
import naver from '../../../images/naver.png';

function Signin ({ togglePopUp, setShowLoginModal }) {
  const SigninBackgroundEl = useRef(null);

  const SigninBackgroundClick = (e) => {
    if (e.target === SigninBackgroundEl.current) {
      setShowLoginModal(!togglePopUp);
    }
  };

  const githubLoginHandler = () => {
    const client_id = '';
    const client_secret = '';
    const redirect_uri = 'http://localhost:3000';
    const scope = 'user';
    const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
    window.location.assign(githubLoginUrl);
  };

  const GoogleLoginHandler = () => {
    const client_id = '';
    const redirect_uri = 'http://localhost:3000';
    const response_type = 'code';
    const scope = 'https://www.googleapis.com/auth/userinfo.email';
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&access_type=offline`;
    window.location.assign(googleLoginUrl);
  };

  return (
    <div className='signin-modal'>
      <div
        className='signin-modal-overlay'
        onClick={(e) => SigninBackgroundClick(e)}
        ref={SigninBackgroundEl}
      />
      <div className='signin-container'>
        <div className='signin-right'>
          <img src={Signinimg} alt='signin' />
        </div>
        <div className='signin-left'>
          <div className='signin-close'>
            <span onClick={togglePopUp}>&times;</span>
          </div>
          <img src={codehighlogo} alt='logo' />
          <article>
            <input placeholder='Email' />
            <input placeholder='Password' />
          </article>
          <div className='signin-button-container'>
            <button>로그인</button>
          </div>
          <ul>
            <li>
              <a href=''>비밀번호 찾기</a>
            </li>
            <li>
              <a href=''>회원가입</a>
            </li>
          </ul>
          <div className='signin-oauth-container'>
            <div className='github-oauth' onClick={githubLoginHandler}>
              <img src={github} alt='github' />
            </div>
            <div className='kakao-oauth'>
              <img src={kakao} alt='kakao' />
            </div>
            <div className='google-oauth' onClick={GoogleLoginHandler}>
              <img src={naver} alt='naver' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
