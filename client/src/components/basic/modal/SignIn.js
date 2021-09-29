import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signinUser } from '../../../redux/actions/userActions';
import Signinimg from '../../../images/Signinimg.svg';
import codehighlogo from '../../../images/codehighlogo.png';
import github from '../../../images/github.png';
import kakao from '../../../images/kakao.png';
import google from '../../../images/google.png';

function Signin({ togglePopUp, showLoginModal, setShowLoginModal }) {
  const SigninBackgroundEl = useRef(null);
  const state = useSelector(state => state.userReducer);
  const { userInfo } = state;
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  //!모달 배경
  const SigninBackgroundClick = (e) => {
    if (e.target === SigninBackgroundEl.current) {
      togglePopUp();
    }
  };

  const githubLoginHandler = () => {
    const client_id = process.env.GITHUB_CLIENT_ID;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;
    const redirect_uri = 'http://localhost:3000?login=github';
    const scope = 'user';
    const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
    window.location.assign(githubLoginUrl);
  };

  const kakaoLoginHandler = () => {
    const client_id = process.env.KAKAO_CLIENT_ID;
    const redirect_uri = 'http://localhost:3000?login=kakao';
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.assign(kakaoLoginUrl);
  };

  const GoogleLoginHandler = () => {
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const redirect_uri = 'http://localhost:3000?login=google';
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

    if (!isEmail(email)) {
      //axios 연결 후 alter 띄우기
      console.log('이메일 확인');
      return;
    }

    if (!email || !password) {
      console.log('빈칸 채워');
      return;
    }

    dispatch(signinUser(loginInfo))
  };

  const enterKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleLogin()
    }
  }

  //!guest login
  const handleGuestLogin = () => {
    const geustInfo = {
      email : 'guest12@codehigh.club',
      password: 'guest'
    }

    dispatch(signinUser(geustInfo))
  }

  useEffect(() => {
    if(userInfo) {
      setShowLoginModal(false);
    }
  })

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
              onKeyPress={enterKeyPress}
            />
            <input
              placeholder='Password'
              type='password'
              onChange={handleInputValue('password')}
              onKeyPress={enterKeyPress}
            />
          </article>
          <div className='signin-button-container'>
          <button type='submit' onClick={handleLogin}>
              로그인
            </button>
            <button type='submit' onClick={handleGuestLogin}>
              게스트 로그인
            </button>
          </div>
          <ul>
            <li>
              <span>비밀번호 찾기</span>
            </li>
            <li>
              <span>회원가입</span>
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
