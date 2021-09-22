import React from 'react';
import MyPageSub from '../components/mypage/MyPageSub'
import WhiteFooter from '../components/basic/footer/WhiteFooter';
import NavBar from '../components/basic/navbar/NavBar';

function Mypage () {
  return (
    <>
    <NavBar/>
    <MyPageSub/>
    <WhiteFooter/>
    </>
  );
};

export default Mypage;