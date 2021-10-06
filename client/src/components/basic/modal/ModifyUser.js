import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import modifyimg from '../../../images/modifyimg.png';
import codehighlogo from '../../../images/codehighlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

function ModifyUser({ userInfoPopUp, setShowUserInfoPopUp }) {
  const state = useSelector((state) => state.userReducer);
  const { userInfo } = state;

  const ModifyUserBackgroundEl = useRef(null);

  const [modifyNotice, setModifyNotice] =
    useState('수정할 정보를 입력해 주세요.');
  const [modifyInfo, setModifyInfo] = useState({
    password: '',
    passwordcheck: '',
    nickname: userInfo.name,
  });
  const { newpassword, passwordcheck, nickname } = modifyInfo;

  const history = useHistory();

  const ModifyUserBackgroundClick = (e) => {
    if (e.target === ModifyUserBackgroundEl.current) {
      setShowUserInfoPopUp(!userInfoPopUp);
    }
  };

  const handleInputValue = (key) => (e) => {
    setModifyInfo({ ...modifyInfo, [key]: e.target.value });
  };

  const handlemodify = () => {
    if (!newpassword || (!passwordcheck && nickname !== undefined)) {
      axios
        .patch(
          `${serverUrl}/user`,
          { name: nickname },
          {
            headers: { Authorization: `bearer ${userInfo.accessToken}` },
          }
        )
        .then((data) => {
          if (data.status === 200) {
            userInfo.name = nickname;
            userInfoPopUp();
            history.push('/mypage');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (newpassword === passwordcheck && newpassword !== '') {
      axios
        .patch(
          `${serverUrl}/user`,
          { password: newpassword, name: nickname },
          {
            headers: { Authorization: `bearer ${userInfo.accessToken}` },
          }
        )
        .then((data) => {
          if (data.status === 200) {
            userInfo.name = nickname;
            userInfoPopUp();
            history.push('/mypage');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (newpassword !== passwordcheck) {
      setModifyNotice('비밀번호가 일치하지 않습니다.');
      return;
    }
  };

  const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlemodify(e);
    }
  };

  return (
    <div className='modifyuser-modal'>
      <div
        className='modifyuser-modal-overlay'
        onClick={(e) => ModifyUserBackgroundClick(e)}
        ref={ModifyUserBackgroundEl}
      />
      <div className='modifyuser-container'>
        <div className='modifyuser-right'>
          <img src={modifyimg} alt='modifyuser' />
        </div>
        <div className='modifyuser-left'>
          <div className='modifyuser-close' onClick={userInfoPopUp}>
            &times;
          </div>
          <img src={codehighlogo} alt='logo' />
          <article>
            <div>이메일</div>
            <input placeholder={userInfo.email} disabled />
            <div>비밀번호</div>
            <input
              type='password'
              placeholder='변경할 비밀번호를 입력해주세요.'
              onChange={handleInputValue('newpassword')}
              onKeyPress={enterKeyPress}
            />
            <div>비밀번호 확인</div>
            <input
              type='password'
              placeholder='변경할 비밀번호를 확인해주세요.'
              onChange={handleInputValue('passwordcheck')}
              onKeyPress={enterKeyPress}
            />
            <div>닉네임</div>
            <input
              placeholder='변경할 닉네임을 입력해주세요.'
              onChange={handleInputValue('nickname')}
              onKeyPress={enterKeyPress}
            />
          </article>
          <div className='signup-notice'>
            <FontAwesomeIcon icon={faExclamationTriangle} /> {modifyNotice}
          </div>
          <div className='modifyuser-button-container'>
            <button type='submit' onClick={handlemodify}>
              회원정보 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifyUser;
