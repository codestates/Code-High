import React from 'react';
import gettingstartimg from '../../images/gettingstartimg.svg';
import codereviwimg from '../../images/codereview.svg';
import Button from '../basic/button/Button';
import { Link } from 'react-router-dom';

function GettingStart() {
  return (
    <div className='gettingstart'>
      <div className='gettingstart-container'>
        <div className='gettingstart-rectangle up-on-scroll' />
        <div className='gettingstart-img-container up-on-scroll'>
          <img src={codereviwimg} alt='gettingstartimg' />
        </div>
        <div className='gettingstart-box up-on-scroll'>
          <h1>Getting Start</h1>
          <p>
            코드 저장소, 코드 리뷰에서는
            <br />
            검색을 통해 작성한 글을 찾을 수 있습니다.
            <br />
            Code High는 기능 단위의 코드에 집중할 수 있는 서비스를 제공합니다.
          </p>
          <Link to='/signup'>
            <Button content='Start' backgroundColor='#2F8C4C' color='#fff' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GettingStart;
