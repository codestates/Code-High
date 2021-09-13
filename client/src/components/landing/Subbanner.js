import React from 'react';
import Button from '../basic/button/Button'
import Subbannerimg from '../../images/subbannerimg.svg';
import gif from '../../images/gif.png'

function Subbanner(){
  return (
    <div className='subbanner'>
      <div className='subbanner-container'>
        <div className='subbanner-left'>
          <img src={gif} alt='draganddrop'/>
        </div>
        <div className='subbanner-right'>
          <img src={Subbannerimg} alt='subbannerimg' />
          <div>
            <h1>코드저장소</h1>
            <p className='subbanner-p'>학습에 필요한 코드를<br/>보기 쉽게 관리할 수 있습니다.</p>
            <p className='subbanner-mobile-p'>학습에 필요한 코드를 보기 쉽게 관리할 수 있습니다.</p>
            <Button content='체험하기' backgroundColor='#2F8C4C' color='#fff'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subbanner;