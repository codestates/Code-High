import React from 'react';
import Signupimg from '../../../images/Signupimg.svg';
import codehighlogo from '../../../images/codehighlogo.png';

function Signup(){
  return (
    <div className='signup-modal'>
      <div className='signup-modal-overlay'></div>
      <div className='signup-container'>
        <div className='signup-right'>
          <img src={Signupimg} alt='signup' />
        </div>
        <div className='signup-left'>
          <div className='signup-close'>&times;</div>
          <img src={codehighlogo} alt='logo' />
          <article>
            <div>이메일</div>
            <input placeholder='이메일을 입력해주세요.'/>
            <div>비밀번호</div>
            <input placeholder='비밀번호를 입력해주세요.'/>
            <div>비밀번호 확인</div>
            <input placeholder='비밀번호를 확인해주세요.'/>
            <div>닉네임</div>
            <input placeholder='닉네임을 입력해주세요.'/>
          </article>
          <div className='signup-button-container'>
            <button>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;