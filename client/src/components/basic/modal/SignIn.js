import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signinUser } from '../../../redux/actions/userActions';
import Signinimg from '../../../images/Signinimg.svg';
import codehighlogo from '../../../images/codehighlogo.png';
import github from '../../../images/github.png';
import kakao from '../../../images/kakao.png';
import google from '../../../images/google.png';

function Signin({ togglePopUp, setShowLoginModal }) {
  const SigninBackgroundEl = useRef(null);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  //!모달 배경
  const SigninBackgroundClick = (e) => {
    if (e.target === SigninBackgroundEl.current) {
      setShowLoginModal(!togglePopUp);
    }
  };

<<<<<<< HEAD
    const githubLoginHandler = () => {
      const client_id = 'b312e50618463e185ac7';
      const client_secret = 'e772fe03abd53b7d788b0d93cc1908e9e7f572ad';
      const redirect_uri = 'http://localhost:3000';
      const scope = 'user';
      const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
      window.location.assign(githubLoginUrl);
    };
=======
  //!Oauth 로그인
  const githubLoginHandler = () => {
    const client_id = '';
    const client_secret = '';
    const redirect_uri = 'http://localhost:3000';
    const scope = 'user';
    const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
    window.location.assign(githubLoginUrl);
  };
>>>>>>> 0446f9118878168f54298a653e4e433f671bd75e

  const kakaoLoginHandler = () => {
    const client_id = 'b0af4994d1021581404c650cae659716';
    const redirect_uri = 'http://localhost:3000';
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.assign(kakaoLoginUrl);
  };

  const GoogleLoginHandler = () => {
    const client_id = '180842982829-e9aq2ak9nsagmmp20cnls25s0sstcpg6.apps.googleusercontent.com';
    const redirect_uri = 'http://localhost:3000';
    const response_type = 'code';
    const scope = 'https://www.googleapis.com/auth/userinfo.profile';
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&access_type=offline`;
    window.location.assign(googleLoginUrl);
  };

  //!로그인 정보
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  //!이메일 정규표현식
  function isEmail(asValue) {
    var regExp =
      /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  }

  //!email 로그인
  const handleLogin = () => {
    const { email, password } = loginInfo;
    console.log(loginInfo)

    if (!isEmail(email)) {
      console.log('이메일 확인');
      return;
    }

    if (!email || !password) {
      console.log('빈칸 채워');
      return;
    }

    dispatch(signinUser(loginInfo))
      .then((res) => {
        console.log(res)
      })

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
            <input
              placeholder='Email'
              type='email'
              onChange={handleInputValue('email')}
            />
            <input
              placeholder='Password'
              type='password'
              onChange={handleInputValue('password')}
            />
          </article>
          <div className='signin-button-container'>
            <button type='submit' onClick={handleLogin}>
              로그인
            </button>
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
            <div className='kakao-oauth' onClick={kakaoLoginHandler}>
              <img src={kakao} alt='kakao' />
            </div>
            <div className='google-oauth' onClick={GoogleLoginHandler}>
              <img src={google} alt='google' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
