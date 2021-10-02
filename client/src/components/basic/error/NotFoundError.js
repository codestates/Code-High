import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../button/Button';

import notfound from '../../../images/notfound.svg';

const NotFoundError = () => {
  const history = useHistory();

  const handleButtonSignup = () => {
    history.push('/signup');
  };

  return (
    <div className='login-error-container'>
      <img src={notfound} al='loginerror' />
      <div>
        회원정보를 찾을 수 없습니다.
        <br />
        회원가입 후 이용해주세요.
      </div>
      <Button
        content={'회원가입'}
        backgroundColor='#2F8C4C'
        color='#fff'
        onClickHandle={handleButtonSignup}
      />
    </div>
  );
};

export default NotFoundError;
