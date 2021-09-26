import React, { useEffect, useState } from 'react';
import Button from '../basic/button/Button';
import { useHistory } from 'react-router-dom';

function CodeInputSecretButton ({ codeInputInfo, setCodeInputInfo }) {
  const [isChecked, setIsChecked] = useState([]);
  const history = useHistory();

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
    //서버에 정보 보내주기 => codeInputInfo
    
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
          <Button content='SAVE' backgroundColor='#2F8C4C' color='#fff' />
          <Button content='CANCEL' backgroundColor='#E1E1E1' color='#fff' onClickHandle={handleCancelButton}/>
        </div>
      </div>
    </div>
  );
}

export default CodeInputSecretButton;
