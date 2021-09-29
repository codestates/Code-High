import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../basic/button/Button';
import Signup from '../basic/modal/Signup';

function ButtonContainer () {
  const state = useSelector(state => state.userReducer);
  const { userInfo } = state;
  const history = useHistory();
  //! modal
  const [showSignupModal, setShowSignupModal] = useState(false);
  const SignupTogglePopUp = () => {
    setShowSignupModal(!showSignupModal);
  };
  const handleGoMypage = () => {
    history.push('/mypage')
  }

  return (
    <div className='buttoncontainer'>
      <div className='buttoncontainer-container up-on-scroll'>
        <div>
          {userInfo ?<Button
            content='마이페이지'
            backgroundColor='#E1E1E1'
            onClickHandle={handleGoMypage}
          />
          :<Button
            content='가입하기'
            backgroundColor='#E1E1E1'
            onClickHandle={SignupTogglePopUp}
          />
          } 
        </div>
      </div>
      {showSignupModal
        ? (
          <Signup
            SignupTogglePopUp={SignupTogglePopUp}
            setShowSignupModal={setShowSignupModal}
          />
          )
        : null}
    </div>
  );
}

export default ButtonContainer;
