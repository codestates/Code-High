import React from 'react';
import gettingstartimg from '../../images/gettingstartimg.svg';
import Button from '../basic/button/Button';
import { Link } from 'react-router-dom';

function GettingStart() {
  return (
    <div className='gettingstart'>
      <div className='gettingstart-container'>
        <div className='gettingstart-rectangle up-on-scroll'></div>
        <div className='gettingstart-img-container up-on-scroll'>
          <img src={gettingstartimg} alt='gettingstartimg' />
        </div>
        <div className='gettingstart-box up-on-scroll'>
          <h1>Getting Start</h1>
          <p>
            풀어본 코드를 이해도에 따라 <br /> 칸반보드에 분류할 수 있습니다.
          </p>
          <Link to='/codestorage'>
            <Button content='Start' backgroundColor='#2F8C4C' color='#fff' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GettingStart;
