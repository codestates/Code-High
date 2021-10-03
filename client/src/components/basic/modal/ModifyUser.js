import React, { useRef, useState }from 'react';
import modifyimg from '../../../images/modifyimg.png';
import codehighlogo from '../../../images/codehighlogo.png';
import { useSelector } from 'react-redux';

function ModifyUser ({userInfoPopUp,setShowUserInfoPopUp}) {
  const state = useSelector((state) => state.userReducer);
  const { userInfo } = state;
  const ModifyUserBackgroundEl = useRef(null);

  const ModifyUserBackgroundClick = (e) => {
    if (e.target === ModifyUserBackgroundEl.current) {
        setShowUserInfoPopUp(!userInfoPopUp);
    }
};


  const enterKeyPress = (e) => {}
    // if(e.key === 'Enter') {
      
    // }
  
  return (
    <div className='modifyuser-modal'>
      <div className='modifyuser-modal-overlay'
        onClick={(e) => ModifyUserBackgroundClick(e)}
        ref={ModifyUserBackgroundEl}
      />
      <div className='modifyuser-container'>
        <div className='modifyuser-right'>
          <img src={modifyimg} alt='modifyuser' />
        </div>
        <div className='modifyuser-left'>
          <div className='modifyuser-close' onClick={userInfoPopUp}>&times;</div>
          <img src={codehighlogo} alt='logo' />
          <article>
            <div>이메일</div>
            <input placeholder={userInfo.email} disabled />
            <div>비밀번호</div>
            <input placeholder='변경할 비밀번호를 입력해주세요.' onKeyPress={enterKeyPress}/>
            <div>비밀번호 확인</div>
            <input placeholder='변경할 비밀번호를 확인해주세요.' onKeyPress={enterKeyPress}/>
            <div>닉네임</div>
            <input placeholder='변경할 닉네임을 입력해주세요.' onKeyPress={enterKeyPress}/>
          </article>
          <div className='modifyuser-button-container'>
            <button>회원정보 수정</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifyUser;
