import React from 'react';

import { useSelector } from 'react-redux';

import MyPageSub from '../components/mypage/MyPageSub'
import WhiteFooter from '../components/basic/footer/WhiteFooter';
import LoginError from '../components/basic/error/LoginError';

function Mypage () {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;

  return (
    <>
        {userInfo !== undefined 
      ? <>  <MyPageSub/>
      <WhiteFooter/></>
      :<LoginError/>
    }
    </>
  );
};

export default Mypage;