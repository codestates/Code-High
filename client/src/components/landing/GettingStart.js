import React from 'react';
import gettingstartimg from '../../images/gettingstartimg.svg';
import codereviwimg from '../../images/codereview.svg';
import Button from '../basic/button/Button';
import { Link } from 'react-router-dom';

function GettingStart () {
  return (
    <div className='gettingstart'>
      <div className='gettingstart-container'>
        <div className='gettingstart-rectangle up-on-scroll' />
        <div className='gettingstart-img-container up-on-scroll'>
          <img src={codereviwimg} alt='gettingstartimg' />
        </div>
        <div className='gettingstart-box up-on-scroll'>
          <h1>코드리뷰</h1>
          <p>
            코드리뷰를 통해
            <br />
            오타, 버그 가능성 등에 대한 의견,
            <br />
            또는 좋은 코드에 대한 긍정적인 피드백을
            <br />
            주고 받을 수 있습니다.
          </p>
          <Link to='/codereview'>
            <Button content='Start' backgroundColor='#2F8C4C' color='#fff' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GettingStart;
