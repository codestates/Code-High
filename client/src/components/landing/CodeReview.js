import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../basic/button/Button';

import gettingstartimg from '../../images/gettingstartimg.svg';

function CodeReview() {
  const state = useSelector((state) => state.userReducer);
  const { userInfo } = state;

  return (
    <div className='codereview'>
      <div className='codereview-container'>
        <div className='codereview-left up-on-scroll'>
          <div className='codereview-img-box'>
            <div className='codereview-left-rectangle' />
            <img src={gettingstartimg} alt='codereviwimg' />
            <div className='codereview-right-rectangle' />
          </div>
        </div>
        <div className='codereview-right up-on-scroll'>
          <h1>Getting Start</h1>
          {!userInfo ? (
            <Link to='/signup'>
              <Button
                content='회원가입'
                backgroundColor='#2F8C4C'
                color='#fff'
              />
            </Link>
          ) : (
            <Link to='/mypage'>
              <Button
                content='마이페이지'
                backgroundColor='#2F8C4C'
                color='#fff'
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeReview;
