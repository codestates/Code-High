import React from 'react';

function Mainbanner() {
  return (
    <div className='mainbanner'>
      <div className='mainbanner-container'>
        <div className='mainbanner-left'>
          <h1>
            알고리즘 풀이 코드
            <br />
            어떻게 관리하고 계신가요?
          </h1>
          <p>
            Code High를 이용해 내가 작성한 코드를 업로드하고
            <br />
            이해도에 따라 알고리즘 코드를 분류해 실력을 높혀보세요.
          </p>
          <div className='mainbanner-button-container'>
            <button>시작하기</button>
            <button>시작하기</button>
          </div>
        </div>
        <div className='mainbanner-right'>
          <img src='' alt='' />
        </div>
      </div>
    </div>
  );
}

export default Mainbanner;
