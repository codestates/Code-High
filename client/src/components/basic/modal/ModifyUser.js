import React, { useRef, useState,  }from 'react';
import modifyimg from '../../../images/modifyimg.png';
import codehighlogo from '../../../images/codehighlogo.png';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import userInfoPopUp from '../../mypage/MyPageSub'
import { modifyUserInfo } from '../../../redux/actions/userActions';
import { getMypageInfo } from '../../../redux/actions/userActions';
import { useHistory } from 'react-router-dom';

function ModifyUser({ userInfoPopUp, setShowUserInfoPopUp }) {
  const ModifyUserBackgroundEl = useRef(null);
  const state = useSelector((state) => state.userReducer);
  const { userInfo } = state;
  const serverUrl = 'https://api.codehigh.club';
  const [signupNotice, setSignupNotice] = useState('비밀번호를 입력해 주세요');
  const [modifyInfo, setModifyInfo] = useState({
    password: '',
    passwordcheck: '',
    nickname: userInfo.name
  })
   const ModifyUserBackgroundClick = (e) => {
    if (e.target === ModifyUserBackgroundEl.current) {
      setShowUserInfoPopUp(!userInfoPopUp);
    }
  };

  const handleInputValue = (key) => (e) => {
    setModifyInfo({ ...modifyInfo, [key]: e.target.value });
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const handlemodify = () => {
    const { newpassword, passwordcheck, nickname } = modifyInfo;
    if (!newpassword && !passwordcheck && nickname !== undefined) {
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
            const data = {
              accessToken: userInfo ? userInfo.accessToken : undefined,
              };
            dispatch(getMypageInfo(data));
            userInfoPopUp()
            history.push('/mypage')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (newpassword !== passwordcheck) {
      setSignupNotice('비밀번호가 일치하지 않습니다.');
      return;
    } else if (newpassword === passwordcheck) {
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
            userInfoPopUp()
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  }

  const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlemodify(e);
    }
  };

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
            <input type='password' placeholder='변경할 비밀번호를 입력해주세요.' onChange={handleInputValue('newpassword')} onKeyPress={enterKeyPress} />
            <div>비밀번호 확인</div>
            <input type='password' placeholder='변경할 비밀번호를 확인해주세요.' onChange={handleInputValue('passwordcheck')} onKeyPress={enterKeyPress} />
            <div>닉네임</div>
            <input placeholder='변경할 닉네임을 입력해주세요.' onChange={handleInputValue('nickname')} onKeyPress={enterKeyPress} />
          </article>
          <div className='modifyuser-button-container'>
            <button type='submit' onClick={handlemodify}>회원정보 수정</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifyUser;
