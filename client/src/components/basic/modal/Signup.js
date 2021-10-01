import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Signupimg from '../../../images/Signupimg.svg';
import codehighlogo from '../../../images/codehighlogo.png';
import axios from 'axios';
import Alert from '../alert/Alert';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

function Signup() {
  const backgroundEl = useRef(null);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name: '',
  });
  const history = useHistory();

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

  const enterKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleSignup()
    }
  }

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
              onChange={handleInputValue('password')}
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
