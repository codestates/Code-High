import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../basic/button/Button';
import Subbannerimg from '../../images/subbannerimg.svg';
import gif from '../../images/gif.png';

function Subbanner() {

  return (
    <div className='subbanner'>
      <div className='subbanner-container'>
        <div className='subbanner-left up-on-scroll'>
          <img src={gif} alt='draganddrop' />
        </div>
        <div className='subbanner-right up-on-scroll'>
          <img src={Subbannerimg} alt='subbannerimg' />
          <div>
            <h1>코드저장소</h1>
            <p className='subbanner-p'>
              학습에 필요한 코드를
              <br />
              보기 쉽게 관리할 수 있습니다.
            </p>
            <p className='subbanner-mobile-p'>
              학습에 필요한 코드를 보기 쉽게 관리할 수 있습니다.
            </p>
            <Link to='/codestorage'><Button content='체험하기' backgroundColor='#2F8C4C' color='#fff' /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subbanner;
