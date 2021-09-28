import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../basic/button/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

function CodeInputSecretButton ({ codeInputInfo, setCodeInputInfo }) {
  const [isChecked, setIsChecked] = useState([]);
  const state = useSelector(state => state.userReducer);
  const { userInfo } = state;
  const history = useHistory();
console.log(codeInputInfo)
  const changeHandle = (checked, id) => {
    if (checked) {
      setIsChecked([...isChecked, id]);
      console.log('공개');
    } else {
      setIsChecked(isChecked.filter(el => el !== id));
      console.log('비공개');
    }
  }

  useEffect(()=>{
    if(isChecked[0] === 'check') {
      setCodeInputInfo({ ...codeInputInfo, secret:false});
    } else if(isChecked.length === 0){
      setCodeInputInfo({ ...codeInputInfo, secret:true});
    }
  },[isChecked])

  const handleSaveButton = () => {
    const { loginType, accessToken } = userInfo;
    console.log('codeInputInfo',codeInputInfo)
    
    axios.post(
      `${serverUrl}/post`,
      codeInputInfo,
      {
        headers: {
          login_type: `${loginType}`,
          Authorization: `bearer ${accessToken}`,
        },
        'Content-Type': 'application/json',
        withCredentials: true,
      }
    ).then((res) => {
      console.log('메세지를 찾아보자',res)
      if(res.status === 201 || res.status === 200) {
        history.push('/post')
      }
    })
  }

  const handleCancelButton = () => {
    history.push('/codereview')
  }

  return (
    <div className='codeinputsecretbutton'>
      <div className='codeinputsecretbutton-container'>
        <div className='codeinputsecretbutton-checkbox'>
          <input type='checkbox' onChange={e => changeHandle(e.currentTarget.checked, 'check')}/>
          <span>코드 리뷰 공개</span>
        </div>
        <div className='codeinputsecretbutton-button'>
          <Button content='SAVE' backgroundColor='#2F8C4C' color='#fff' onClickHandle={handleSaveButton}/>
          <Button content='CANCEL' backgroundColor='#E1E1E1' color='#fff' onClickHandle={handleCancelButton}/>
        </div>
      </div>
    </div>
  );
}

export default CodeInputSecretButton;
