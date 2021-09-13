import React from 'react';
import modifyimg from '../../../images/modifyimg.png';
import codehighlogo from '../../../images/codehighlogo.png';

function ModifyUser(){
  return (
    <div className='modifyuser-modal'>
      <div className='modifyuser-modal-overlay'></div>
      <div className='modifyuser-container'>
        <div className='modifyuser-right'>
          <img src={modifyimg} alt='modifyuser' />
        </div>
        <div className='modifyuser-left'>
          <div className='modifyuser-close'>&times;</div>
          <img src={codehighlogo} alt='logo' />
          <article>
            <div>이메일</div>
            <input placeholder='kimcoding@gmail.com' disabled/>
            <div>비밀번호</div>
            <input placeholder='변경할 비밀번호를 입력해주세요.'/>
            <div>비밀번호 확인</div>
            <input placeholder='변경할 비밀번호를 확인해주세요.'/>
            <div>닉네임</div>
            <input placeholder='변경할 닉네임을 입력해주세요.'/>
          </article>
          <div className='modifyuser-button-container'>
            <button>회원정보 수정</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyUser;