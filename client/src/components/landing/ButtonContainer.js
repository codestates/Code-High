import React, { useState } from 'react';
import Button from '../basic/button/Button';
import Signup from '../basic/modal/Signup';

function ButtonContainer() {
  //!modal
  const [showSignupModal, setShowSignupModal] = useState(false);
  const SignupTogglePopUp = () => {
    setShowSignupModal(!showSignupModal);
  };
  console.log(showSignupModal);

  return (
    <div className='buttoncontainer'>
      <div className='buttoncontainer-container up-on-scroll'>
        <div>
          <Button
            content='가입하기'
            backgroundColor='#E1E1E1'
            onClickHandle={SignupTogglePopUp}
          />
        </div>
      </div>
      {showSignupModal ? (
        <Signup
          SignupTogglePopUp={SignupTogglePopUp}
          setShowSignupModal={setShowSignupModal}
        />
      ) : null}
    </div>
  );
}

export default ButtonContainer;
