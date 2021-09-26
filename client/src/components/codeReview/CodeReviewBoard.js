import React, { useEffect, useState } from 'react';
import { getReviewPost } from '../../redux/actions/codePostActions';
import { resetCodereviewPost } from '../../redux/actions/codePostActions';
import { useSelector, useDispatch } from 'react-redux';
import SearchInput from '../basic/search/SearchInput';
import scrollImg from '../../images/scrollImg.gif'

function CodeReviewBoard() {
  const [count, setCount] = useState(2);
  const state = useSelector((state) => state.codePostReducer);
  const { postList } = state;
  const dispatch = useDispatch();
  // console.log('코드리뷰보드에서의 코드리스트', count, postList);

  //!새로고침 시, 스크롤 상단
  window.onload = function () {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 100);
  };

  //!새로고침하면 첫 15개만 나타남
  useEffect(() => {
    dispatch(resetCodereviewPost());
  }, []);

  const getMorePost = () => {
    setTimeout(() => {
      dispatch(getReviewPost(count));
      setCount(count + 1);
    }, 1000);
  };

  const onScroll = (e) => {
    const { clientHeight, scrollTop, scrollHeight } = e.target;
    if (clientHeight + scrollTop === scrollHeight) {
      getMorePost();
    } 
  };

  return (
    <div className='codereviewboard'>
      <div className='codereviewboard-container'>
        <div className='codereviewboard-header'>
          <SearchInput />
        </div>
        <section className='codereviewboard-cardbox' onScroll={onScroll}>
          {postList.map((item, index) => {
            return (
              <div className='codereviewboard-card' key={index}>
                <h1>{item.title}</h1>
                <div>{item.codeContent}</div>
              </div>
            );
          })}
          {/* <div className='codereviewboard-loding'></div>
          <div className='codereviewboard-loding'><img src={scrollImg} alt=''/></div>
          <div className='codereviewboard-loding'></div> */}
        </section>
      </div>
    </div>
  );
}

export default CodeReviewBoard;
