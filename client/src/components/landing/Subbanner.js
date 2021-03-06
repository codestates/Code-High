import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../basic/button/Button';

import Subbannerimg from '../../images/subbannerimg.svg';
import codestorage from '../../images/codestorage1.gif';

function Subbanner() {
  return (
    <div className='subbanner' style={{background:'#f2f2f2'}}>
      <div className='subbanner-container'>
        <div className='subbanner-left up-on-scroll'>
          <img src={codestorage} alt='draganddrop' />
        </div>
        <div className='subbanner-right up-on-scroll'>
          <img src={Subbannerimg} alt='subbannerimg' />
          <div>
            <h1>코드저장소</h1>
            <p className='subbanner-p'>
              학습에 필요한 코드를
              <br />
              이해도에 따라 분류하여 관리할 수 있습니다.
            </p>
            <p className='subbanner-mobile-p'>
              학습에 필요한 코드를
              <br />
              이해도에 따라 분류하여 관리할 수 있습니다.
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
  );
}

export default Subbanner;
