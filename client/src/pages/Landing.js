import React from 'react';
import Mainbanner from '../components/landing/Mainbanner';
import Subbanner from '../components/landing/Subbanner';
import GettingStart from '../components/landing/GettingStart';
import Uploadvideo from '../components/landing/Uploadvideo';
import UserReview from '../components/landing/UserReview';
import CodeReview from '../components/landing/CodeReview';
import ButtonContainer from '../components/landing/ButtonContainer';
import NavBar from '../components/basic/navbar/NavBar'
import BlackFooter from '../components/basic/footer/BlackFooter';
import SideBar from '../components/basic/navbar/SideBar';

function Landing() {
  return (
    <>
      <NavBar/>
      <Mainbanner />
      <Subbanner />
      <GettingStart />
      <Uploadvideo />
      <UserReview />
      <CodeReview />
      <ButtonContainer />
      <BlackFooter />
    </>
  );
}

export default Landing;
