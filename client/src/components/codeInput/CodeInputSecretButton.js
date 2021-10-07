import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { getCodepost } from '../../redux/actions/codePostActions';

import Button from '../basic/button/Button';
import Alert from '../basic/alert/Alert';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

function CodeInputSecretButton({ codeInputInfo, setCodeInputInfo }) {
  const state = useSelector((state) => state.userReducer);
  const { userInfo } = state;

  const [alertModal, setAlertModal] = useState(false);
  const [isChecked, setIsChecked] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  const changeHandle = (checked, id) => {
    if (checked) {
      setIsChecked([...isChecked, id]);
    } else {
      setIsChecked(isChecked.filter((el) => el !== id));
    }
  };

  useEffect(() => {
    if (isChecked[0] === 'check') {
      setCodeInputInfo({ ...codeInputInfo, secret: false });
    } else if (isChecked.length === 0) {
      setCodeInputInfo({ ...codeInputInfo, secret: true });
    }
  }, [isChecked]);

  const togglePopUp = () => {
    setAlertModal(!alertModal);
  };

  const handleSaveButton = () => {
    if (!userInfo) {
      togglePopUp();
      return;
    }
    if (userInfo.name === '게스트') {
      togglePopUp();
      return;
    }

    const { loginType, accessToken } = userInfo;

    axios
      .post(`${serverUrl}/post`, codeInputInfo, {
        headers: {
          login_type: `${loginType}`,
          Authorization: `bearer ${accessToken}`,
        },
        'Content-Type': 'application/json',
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          const data = {
            postId: res.data.postId,
            accessToken: userInfo.accessToken,
          };
          dispatch(getCodepost(data));
          setTimeout(() => {
            history.push('/post');
          }, 1000);
        }
      });
  };

  const handleCancelButton = () => {
    window.history.back();
  };

  const handleButtonSignup = () => {
    history.push('/signup');
  };

  return (
    <div className='codeinputsecretbutton'>
      <div className='codeinputsecretbutton-container'>
        <div className='codeinputsecretbutton-checkbox'>
          <input
            type='checkbox'
            onChange={(e) => changeHandle(e.currentTarget.checked, 'check')}
          />
          <span>코드 리뷰 공개</span>
        </div>
        <div className='codeinputsecretbutton-button'>
          <Button
            content='SAVE'
            backgroundColor='#2F8C4C'
            color='#fff'
            onClickHandle={handleSaveButton}
          />
          <Button
            content='CANCEL'
            backgroundColor='#E1E1E1'
            color='#fff'
            onClickHandle={handleCancelButton}
          />
        </div>
      </div>
      {alertModal ? (
        <Alert
          content={'회원 로그인 후 이용가능합니다'}
          leftbutton={'회원가입'}
          rightbutton={'닫기'}
          onClickHandleLeft={handleButtonSignup}
          onClickHandleRight={togglePopUp}
          togglePopUp={togglePopUp}
        />
      ) : null}
    </div>
  );
}

export default CodeInputSecretButton;
