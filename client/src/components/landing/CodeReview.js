import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../basic/button/Button';

import codereviwimg from '../../images/codereview.svg';
import gettingstartimg from '../../images/gettingstartimg.svg';

function CodeReview () {
  const state = useSelector(state => state.userReducer);
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
          <p>
            코드 공개를 원하지 않으신다면, <br />
            비공개 설정으로 개인적인 보관이 가능합니다.<br /> 
            또한, 빠른 검색 기능을 사용하여 코드를 찾을 수 있습니다.
          </p>

          {!userInfo 
          ?<Link to='/signup'>
            <Button content='회원가입' backgroundColor='#2F8C4C' color='#fff' />
          </Link>
          :<Link to='/mypage'>
            <Button content='마이페이지' backgroundColor='#2F8C4C' color='#fff' />
          </Link>}
        </div>
      </div>
    </div>
  );
}

export default CodeReview;
