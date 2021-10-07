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
        아이디 또는 비밀번호가 일치하지 않거나, 회원정보를 찾을 수 없습니다.
        <br />
        비회원이시면 회원가입 후 이용해주세요.
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
