import React from 'react';
import Mainbanner from '../components/landing/Mainbanner';
import Subbanner from '../components/landing/Subbanner';
import GettingStart from '../components/landing/GettingStart';
import Uploadvideo from '../components/landing/Uploadvideo';
import UserReview from '../components/landing/UserReview';
import CodeReview from '../components/landing/CodeReview';

function Landing() {
  return (
    <>
      <Mainbanner />
      <Subbanner />
      <GettingStart />
      <Uploadvideo />
      <UserReview />
      <CodeReview />
    </>
  );
}

export default Landing;
