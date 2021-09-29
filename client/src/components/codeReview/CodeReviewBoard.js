import React, { useEffect, useState } from 'react';
import { getReviewPost, getCodepost} from '../../redux/actions/codePostActions';
import { resetCodereviewPost } from '../../redux/actions/codePostActions';
import { useSelector, useDispatch } from 'react-redux';
import SearchInput from '../basic/search/SearchInput';
import scrollImg from '../../images/scrollImg.gif'
import { useHistory } from 'react-router-dom';

function CodeReviewBoard() {
  const [count, setCount] = useState(2);
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;
  const postState = useSelector((state) => state.codePostReducer);
  const { postList } = postState;
  const dispatch = useDispatch();
  const history = useHistory();
  console.log('코드리뷰보드에서의 코드리스트', count, postList);

  //!새로고침 시, 스크롤 상단
  window.onload = function () {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 100);
  };

  //!새로고침하면 첫 15개만 나타남
  useEffect(() => {
    dispatch(resetCodereviewPost());
  },[]);

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

  const handleClickPost = (e) => {
    const postId = e.target.id
    dispatch(getCodepost(postId))
    setTimeout(()=>{
      history.push('/post')
    },1000)
  }

  return (
    <div className='codereviewboard'>
      <div className='codereviewboard-container'>
        <div className='codereviewboard-header'>
          <SearchInput />
        </div>
        <section className='codereviewboard-cardbox' onScroll={onScroll}>
          {postList.map((item, index) => {
            return (
              <div id={item.id} className='codereviewboard-card' key={index} onClick={(e)=>handleClickPost(e)}>
                <h1 id={item.id}>{item.title}</h1>
                <div id={item.id}>{item.codeContent}</div>
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
