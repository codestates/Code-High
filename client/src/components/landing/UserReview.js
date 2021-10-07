import React from 'react';

import user from '../../images/user.png';
import star from '../../images/star.png';

function UserReview() {
  const mockReview = [
    {
      img: `${user}`,
      username: 'kim***',
      score: 5,
      review: '와! 정말 좋아요! 엄청나 대단해~ 앞으로도 많이 쓸게요^^',
    },
    {
      img: `${user}`,
      username: 'jeon***',
      score: 5,
      review:
        '알고리즘 정리가 힘들었는데, 코드 하이를 통해 좀 더 보기 쉽게 만들어서 자주 사용합니다. 주로 깃헙, 혹은 블로깅했던 자료를 올리면 제 입맛대로 편리하게 사용할 수 있습니다.',
    },
    {
      img: `${user}`,
      username: 'park***',
      score: 5,
      review: '주변에도 추천하고 다녀요 :)',
    },
    {
      img: `${user}`,
      username: 'lee***',
      score: 5,
      review: '왜 이제 알았을까요! 코딩생활 퀄리티 상승입니다 ^_^',
    },
  ];

  return (
    <div className='userreview'>
      <div className='userreview-container'>
        <div className='userreview-subject up-on-scroll'>
          <h1>User Review</h1>
        </div>
        <div className='userreview-reverse up-on-scroll'>
          <div className='userreview-box-container up-on-scroll'>
            {mockReview.map((info, index) => {
              return (
                <span key={index}>
                  <img src={info.img} alt='userimage' />
                  <h5>{info.username}</h5>
                  <div>
                    {Array(info.score)
                      .fill()
                      .map((item, idx) => (
                        <img src={star} alt='star' key={idx} />
                      ))}
                  </div>
                  <p>{info.review}</p>
                </span>
              );
            })}
          </div>
          <div className='userreview-howmany-container up-on-scroll'>
            <div className='userreview-howmany up-on-scroll'>
              <h1>19,203,049명이 코드를 공유하고 있습니다.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserReview;
