import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Signupimg from '../../../images/Signupimg.svg';
import codehighlogo from '../../../images/codehighlogo.png';
import axios from 'axios';
import Alert from '../alert/Alert';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

function Signup({ SignupTogglePopUp, setShowSignupModal }) {
  const backgroundEl = useRef(null);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name: '',
  });
  const history = useHistory();

  //!모달 배경
  const backgroundClick = (e) => {
    if (e.target === backgroundEl.current) {
      setShowSignupModal(!SignupTogglePopUp);
    }
  };

  //!회원가입 정보 모으기
  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };
  
  //!정규표현식
  function isEmail(asValue) {
    var regExp =
      /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  }

  //!회원가입
  const handleSignup = () => {
    const { email, password, name } = userInfo;

    if (!isEmail(email)) {
      console.log('이메일 이상해')
      return;
    }

    if (!email || !password || !name ) {
      console.log('다 비었어')
      return;
    } 

    axios
      .post(
        `${serverUrl}/auth/signup`,
        { email, password, name },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      .then((data) => {
        if (data.status === 200) {
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };


  return (
    <div className='signup-modal'>
      <div
        className='signup-modal-overlay'
        onClick={(e) => backgroundClick(e)}
        ref={backgroundEl}
      />
      <div className='signup-container'>
        <div className='signup-right'>
          <img src={Signupimg} alt='signup' />
        </div>
        <div className='signup-left'>
          <div className='signup-close'>
            <span onClick={SignupTogglePopUp}>&times;</span>
          </div>
          <img src={codehighlogo} alt='logo' />
          <article>
            <div>이메일</div>
            <input
              placeholder='이메일을 입력해주세요.'
              type='email'
              onChange={handleInputValue('email')}
            />
            <div>비밀번호</div>
            <input
              placeholder='비밀번호를 입력해주세요.'
              type='password'
              onChange={handleInputValue('password')}
            />
            <div>비밀번호 확인</div>
            <input
              placeholder='비밀번호를 확인해주세요.'
              type='password'
              onChange={handleInputValue('password')}
            />
            <div>닉네임</div>
            <input
              placeholder='닉네임을 입력해주세요.'
              type='name'
              onChange={handleInputValue('name')}
            />
          </article>
          <div className='signup-button-container'>
            <button type='submit' onClick={handleSignup}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
