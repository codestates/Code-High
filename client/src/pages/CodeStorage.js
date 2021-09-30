import React from 'react';
import { useSelector } from 'react-redux';
import Kanban from '../components/codeStorage/Kanban';
import WhiteFooter from '../components/basic/footer/WhiteFooter';
import LoginError from '../components/basic/error/LoginError';

function CodeStorage() {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;

  return (
    <>
    {userInfo !== undefined 
      ? <><Kanban />
      <WhiteFooter /></>
      :<LoginError/>
    }
    </>
  );
}

export default CodeStorage;
