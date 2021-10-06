import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../button/Button';

import welcome from '../../../images/welcome.svg';

const serverUrl = 'https://api.codehigh.club';

function CheckEmail(){
  const history = useHistory();

  const handleButtonHome = () => {
    history.push('/');
  };

  useEffect(()=>{
    const url = new URL(window.location.href);
    const checkCode = url.searchParams.get('code');

    axios
    .post(
      `${serverUrl}/auth/checkemail?code=${checkCode}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((data) => {
      if (data.status === 201) {
        return;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
  
  return (
    <>
       <div className='login-error-container'>
      <img src={welcome} al='welcome' />
      <div>
        환영합니다.
        <br />
        회원가입이 완료되었습니다.
      </div>
      <Button
        content={'Home'}
        backgroundColor='#2F8C4C'
        color='#fff'
        onClickHandle={handleButtonHome}
      />
    </div>
    </>
  );
};

export default CheckEmail;