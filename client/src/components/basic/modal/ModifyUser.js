import React, { useRef, useState }from 'react';
import modifyimg from '../../../images/modifyimg.png';
import codehighlogo from '../../../images/codehighlogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { modifyUser } from '../../../redux/actions/userActions'
import { useHistory } from 'react-router-dom';

function ModifyUser ({userInfoPopUp,setShowUserInfoPopUp}) {
  const state = useSelector((state) => state.userReducer);
  const { userInfo } = state;
  const ModifyUserBackgroundEl = useRef(null);
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [newNickName, setNewNickName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const serverUrl = 'https://api.codehigh.club';

  const ModifyUserBackgroundClick = (e) => {
    if (e.target === ModifyUserBackgroundEl.current) {
        setShowUserInfoPopUp(!userInfoPopUp);
    }
};
  

  const handlemodify = (e) => {
    let changedClass = e.target.className;
    if (changedClass === 'newpassword') {
      setNewPassword(e.target.value);
    } else if (changedClass === 'renewpassword') {
      setReNewPassword(e.target.value);
    } 
    if (changedClass === 'nickname') { 
      setNewNickName(e.target.value);
    }
    
    axios
      .patch(
        `${serverUrl}/user`,
        { password: newPassword },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((data) => {
        if (data.status === 200) {
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  // const handleButtonClickModify = () => {
  //   if (newPassword === reNewPassword && newPassword !== undefined && newPassword !== '') {
  //     const data = {
  //       accessToken: userInfo ? userInfo.accessToken : undefined,
  //       password : newPassword
  //     };
  //     console.log(data);
  //     dispatch(modifyUser(data));
  //     history.push('/');
  //   }
  //   console.log(newPassword, 'newPassword');
  //   console.log(reNewPassword, 'reNewPassword');
  //   console.log('수정');
  // }

  const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlemodify();
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
            <input className='newpassword' type='password' placeholder='변경할 비밀번호를 입력해주세요.' onKeyPress={enterKeyPress}/>
            <div>비밀번호 확인</div>
            <input className='renewpassword' type='password' placeholder='변경할 비밀번호를 확인해주세요.' onKeyPress={enterKeyPress}/>
            <div>닉네임</div>
            <input className='nickname' placeholder='변경할 닉네임을 입력해주세요.' onKeyPress={enterKeyPress}/>
          </article>
          <div className='modifyuser-button-container'>
            <button type='submit' onClick={enterKeyPress}>회원정보 수정</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifyUser;
