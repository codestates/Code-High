import React from 'react';
import Button from '../basic/button/Button';
import codereviwimg from '../../images/codereview.svg';

function CodeReview() {
  return (
    <div className='codereview'>
      <div className='codereview-container'>
        <div className='codereview-left'>
          <div className='codereview-img-box'>
            <div className='codereview-left-rectangle'></div>
            <img src={codereviwimg} alt='codereviwimg' />
            <div className='codereview-right-rectangle'></div>
          </div>
        </div>
        <div className='codereview-right'>
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
          <Button content='바로가기' backgroundColor='#2F8C4C' color='#fff' />
        </div>
      </div>
    </div>
  );
}

export default CodeReview;
