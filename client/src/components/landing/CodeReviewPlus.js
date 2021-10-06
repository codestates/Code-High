import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../basic/button/Button';

import codeinput from '../../images/commentgif.gif';
import Subbannerimg from '../../images/codereview.svg';

function CodeReviewPlus() {
  return (
    <>
      <div className='subbanner'>
        <div className='subbanner-container'>
          <div className='subbanner-left up-on-scroll'>
            <img src={codeinput} alt='draganddrop' />
          </div>
          <div className='subbanner-right up-on-scroll'>
            <img src={Subbannerimg} alt='subbannerimg' />
            <div>
              <h1>코드 리뷰</h1>
              <p className='subbanner-p'>
                코드 리뷰를 통해
                <br />
                피드백을 주고 받을 수 있습니다.
              </p>
              <p className='subbanner-mobile-p'>
                코드 리뷰를 통해
                <br />
                피드백을 주고 받을 수 있습니다.
              </p>
              <Link to='/codestorage'>
                <Button
                  content='바로가기'
                  backgroundColor='#2F8C4C'
                  color='#fff'
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeReviewPlus;
