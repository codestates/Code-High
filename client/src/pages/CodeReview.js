import React from 'react';
import CodeReviewBoard from '../components/codeReview/codeReviewBoard';
import NavBar from '../components/basic/navbar/NavBar';
import WhiteFooter from '../components/basic/footer/WhiteFooter';

function CodeReview () {
  return (
    <>
      <NavBar />
      <CodeReviewBoard />
      <WhiteFooter />
    </>
  );
}

export default CodeReview;
