import axios from 'axios';
import React, { useEffect } from 'react';

const serverUrl = 'https://api.codehigh.club';
// const serverUrl = 'http://localhost:4000';

function CheckEmail(){

  useEffect(()=>{
    const url = new URL(window.location.href);
    const checkCode = url.searchParams.get('code');
    console.log('checkCode',checkCode)

    axios
    .post(
      `${serverUrl}/auth/checkemail?code=${checkCode}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((data) => {
      if (data.status === 201) {
        console.log('이메일 체크 완료')
        //인증이 완료되었습니다 띄우기
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
  
  return (
    <>
      <h1>check email ! </h1>
    </>
  );
};

export default CheckEmail;