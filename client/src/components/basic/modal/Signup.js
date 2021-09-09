import React from 'react';

function Signup(){
  return (
    <div className='signup-background'>
      <div className='signup-container'>
        <div className='signup-right'>
          <img src='/image/Maintenance-bro.png' alt='signup' />
        </div>
        <div className='signup-left'>
          <img src='/image/codehighlogo.png' alt='logo' />
          <div>이메일</div>
          <input placeholder='이메일을 입력해주세요.'/>
          <div>비밀번호</div>
          <input placeholder='비밀번호를 입력해주세요.'/>
          <div>비밀번호 확인</div>
          <input placeholder='비밀번호를 확인해주세요.'/>
          <div>닉네임</div>
          <input placeholder='닉네임을 확인해주세요.'/>
        </div>
      </div>
    </div>
  );
};

export default Signup;