import React, { useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Alert from '../alert/Alert';

function FindingPassword(){
  const [infoForFinding, setInfoForFinding] = useState({
    email:'',
  });
  const [signupNotice, setSignupNotice] = useState('비밀번호를 찾고자 하는 아이디를 입력해 주세요.');
  const [alertModal, setAlertModal] = useState(false);

  const handleInputValue = (key) => (e) => {
    setInfoForFinding({ ...infoForFinding, [key]: e.target.value });
  };

  function isEmail(asValue) {
    var regExp =
      /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  }

  const togglePopUp = () => {
    setAlertModal(!alertModal);
  };

  const handleButtonhome = () => {
    history.push('/');
  };

  const handleFindingPassword = () => {
    const { email } = infoForFinding;

    if (!isEmail(email)) {
      setSignupNotice('이메일 형식을 맞춰주세요.');
      return;
    }

    axios
      .post(
        `https://api.codehigh.club/email/password`,
        { email },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((data) => {
        console.log(data)
        if (data.status === 200) {
          togglePopUp()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFindingPassword();
    }
  };

  return (
    <>
   <div className='signup-modal'>
      <div className='signup-container'>
        <div className='signup-right'>
        </div>
        <div className='signup-left'>
          <h1>비밀번호 찾기</h1>
          <article>
            <div>이메일</div>
            <input
              placeholder='이메일을 입력해주세요.'
              type='email'
              onChange={handleInputValue('email')}
              onKeyPress={enterKeyPress}
            />
          </article>
          <div className='signup-notice-container'>
            <div className='signup-notice'>
              <FontAwesomeIcon icon={faExclamationTriangle} /> {signupNotice}
            </div>
          </div>
          <div className='signup-button-container'>
            <button type='submit' onClick={handleFindingPassword}>
              다음
            </button>
          </div>
        </div>
      </div>
      {alertModal ? (
          <Alert
            content={'새로운 비밀번호 설정을 위해 이메일을 확인해주세요.'}
            leftbutton={'확인'}
            rightbutton={'닫기'}
            onClickHandleLeft={handleButtonhome}
            onClickHandleRight={handleButtonhome}
            togglePopUp={togglePopUp}
          />
        ) : null}
    </div>
    </>
  );
};

export default FindingPassword;