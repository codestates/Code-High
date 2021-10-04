import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Alert from '../alert/Alert';
import resetPassword from '../../../images/resetPassword.svg';

const serverUrl = 'https://api.codehigh.club';
// const serverUrl = 'http://localhost:4000';

function ResetPassword(){
  const [infoForFinding, setInfoForFinding] = useState({
    password:''
  });
  const [alertModal, setAlertModal] = useState(false);

  const history = useHistory();

  const handleInputValue = (key) => (e) => {
    setInfoForFinding({ ...infoForFinding, [key]: e.target.value });
  };

  const togglePopUp = () => {
    setAlertModal(!alertModal);
  };

  const handleButtonhome = () => {
    history.push('/');
  };

  const handleFindingPassword = () => {
    const { password } = infoForFinding;
    const url = new URL(window.location.href);
    const checkCode = url.searchParams.get('code');
    console.log('checkCode',checkCode)

    axios
      .patch(
        `${serverUrl}/user/password?code=${checkCode}`,
        { password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((data) => {
        console.log(data)
        if (data.status === 201) {
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
         <img src={resetPassword} alt='signup' />
        </div>
        <div className='signup-left'>
          <h1>새 비밀번호 설정</h1>
          <article>
            <div>비밀번호</div>
            <input
              placeholder='새로운 비밀번호를 입력해주세요.'
              type='password'
              onChange={handleInputValue('password')}
              onKeyPress={enterKeyPress}
            />
          </article>
          <div className='signup-button-container'>
            <button type='submit' onClick={handleFindingPassword}>
              다음
            </button>
          </div>
        </div>
      </div>
      {alertModal ? (
          <Alert
            content={'비밀번호가 재설정되었습니다.'}
            leftbutton={'로그인'}
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

export default ResetPassword;