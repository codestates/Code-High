import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../basic/button/Button';

import codeinput from '../../images/codehightag.gif';
import Subbannerimg from '../../images/tag.svg';

function Uploadvideo() {
  return (
    <div className='subbanner'>
      <div className='subbanner-container'>
        <div className='subbanner-left up-on-scroll'>
          <img src={codeinput} alt='draganddrop' />
        </div>
        <div className='subbanner-right up-on-scroll'>
          <img src={Subbannerimg} alt='subbannerimg' />
          <div>
            <h1>코드 포스팅</h1>
            <p className='subbanner-p'>
              클릭 한 번으로 태그를 추가, 변경할 수 있으며,
              <br />
              코드리뷰 공개를 설정할 수 있습니다.
            </p>
            <p className='subbanner-mobile-p'>
              클릭 한 번으로 태그를 추가, 변경할 수 있으며,
              <br />
              코드리뷰 공개를 설정할 수 있습니다.
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

export default Uploadvideo;
