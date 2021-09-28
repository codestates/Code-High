import React from 'react';
import Button from '../basic/button/Button';
import codereviwimg from '../../images/codereview.svg';
import gettingstartimg from '../../images/gettingstartimg.svg';
import { Link } from 'react-router-dom';

function CodeReview () {
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
            풀어본 코드를 이해도에 따라 <br /> 칸반보드에 분류할 수 있습니다.
          </p>

          <Link to='/codestorage'>
            <Button content='바로가기' backgroundColor='#2F8C4C' color='#fff' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CodeReview;
