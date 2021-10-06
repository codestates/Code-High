import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Signupimg from '../../../images/Signupimg.svg';
import Alert from '../alert/Alert';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

function Signup() {
  const [signupNotice, setSignupNotice] = useState(
    'Gmail은 소셜 로그인만 이용가능합니다.'
  );
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passwordcheck: '',
    name: '',
  });
  const [alertModal, setAlertModal] = useState(false);

  const history = useHistory();

  const togglePopUp = () => {
    setAlertModal(!alertModal);
  };

  //회원가입 정보 모으기
  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  //정규표현식
  function isEmail(asValue) {
    var regExp =
      /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  }

  //회원가입
  const handleSignup = () => {
    const { email, password, passwordcheck, name } = userInfo;

    if (!isEmail(email)) {
      setSignupNotice('이메일 형식을 맞춰주세요.');
      return;
    }

    if (password !== passwordcheck) {
      setSignupNotice('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!email || !password || !name) {
      setSignupNotice('모든 항목을 채워주세요.');
      return;
    }

    axios
      .post(
        `${serverUrl}/auth/signup`,
        { email, password, name },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((data) => {
        if (data.status === 200) {
          togglePopUp();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  const handleGoHome = () => {
    history.push('/');
  };

  return (
    <div className='signup-modal'>
      <div className='signup-container'>
        <div className='signup-right'>
          <img src={Signupimg} alt='signup' />
        </div>
        <div className='signup-left'>
          <h1>회원가입</h1>
          <article>
            <div>이메일</div>
            <input
              placeholder='이메일을 입력해주세요.'
              type='email'
              onChange={handleInputValue('email')}
              onKeyPress={enterKeyPress}
            />
            <div>비밀번호</div>
            <input
              placeholder='비밀번호를 입력해주세요.'
              type='password'
              onChange={handleInputValue('password')}
              onKeyPress={enterKeyPress}
            />
            <div>비밀번호 확인</div>
            <input
              placeholder='비밀번호를 확인해주세요.'
              type='password'
              onChange={handleInputValue('passwordcheck')}
              onKeyPress={enterKeyPress}
            />
            <div>닉네임</div>
            <input
              placeholder='닉네임을 입력해주세요.'
              type='name'
              onChange={handleInputValue('name')}
              onKeyPress={enterKeyPress}
            />
          </article>
          <div className='signup-notice-container'>
            <div className='signup-notice'>
              <FontAwesomeIcon icon={faExclamationTriangle} /> {signupNotice}
            </div>
          </div>
          <div className='signup-button-container'>
            <button type='submit' onClick={handleSignup}>
              회원가입
            </button>
          </div>
        </div>
      </div>
      {alertModal ? (
        <Alert
          content={'이메일이 전송되었습니다. 이메일 인증을 진행해주세요.'}
          leftbutton={'확인'}
          rightbutton={'닫기'}
          onClickHandleLeft={handleGoHome}
          onClickHandleRight={handleGoHome}
          togglePopUp={togglePopUp}
        />
      ) : null}
    </div>
  );
}

export default Signup;
