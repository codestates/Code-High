import React, { useEffect } from 'react';
import Mainbanner from '../components/landing/Mainbanner';
import Subbanner from '../components/landing/Subbanner';
import GettingStart from '../components/landing/GettingStart';
import Uploadvideo from '../components/landing/Uploadvideo';
import UserReview from '../components/landing/UserReview';
import CodeReview from '../components/landing/CodeReview';
import ButtonContainer from '../components/landing/ButtonContainer';
import CodeReviewPlus from '../components/landing/CodeReviewPlus';
import BlackFooter from '../components/basic/footer/BlackFooter';

function Landing() {
  useEffect(() => {
    const isElementUnderBottom = (elem, triggerDiff) => {
      const { top } = elem.getBoundingClientRect();
      const { innerHeight } = window;
      return top > innerHeight + (triggerDiff || 0);
    };

    const handleScroll = () => {
      const elems = document.querySelectorAll('.up-on-scroll');
      elems.forEach((elem) => {
        if (isElementUnderBottom(elem, -20)) {
          elem.style.opacity = '0';
          elem.style.transform = 'translateY(70px)';
        } else {
          elem.style.opacity = '1';
          elem.style.transform = 'translateY(0px)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Mainbanner />
      <Subbanner />
      <Uploadvideo />
      <CodeReviewPlus />
      <UserReview />
      {/* <GettingStart /> */}
      {/* <CodeReview /> */}
      <ButtonContainer />
      <BlackFooter />
    </>
  );
}

export default Landing;
