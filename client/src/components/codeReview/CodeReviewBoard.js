import React, { useEffect, useState } from 'react';
import { getReviewPost } from '../../redux/actions/codePostActions';
import { resetCodereviewPost } from '../../redux/actions/codePostActions';
import { useSelector, useDispatch } from 'react-redux';
import SearchInput from '../basic/search/SearchInput';

function CodeReviewBoard() {
  const [count, setCount] = useState(2);
  const state = useSelector((state) => state.codePostReducer);
  const userState = useSelector((state) => state.userReducer);
  const { postList, addList } = state;
  const { userInfo } = userState;
  const dispatch = useDispatch();

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
  console.log('코드리뷰보드에서의 코드리스트', postList);

  const getMorePost = async () => {
    dispatch(getReviewPost(count));
    setCount(count + 1);
    // if (addList.length !== 0 && addList.length <= 6) {
    //   const addContent = document.createElement('div');
    //   addContent.classList.add('codereviewboard-card');
    //   addContent.innerHTML = `{addList.map((item) => {
    //         return (<h1>item.title</h1>
    //             <div>item.codeContent</div>);
    //     })}`;
    //   document.querySelector('section').appendChild(addContent);
    // } else {
    //   return;
    // }
  };
  console.log(count);
  const onScroll = (e) => {
    //window.innerHeight=1006 , window.scrollY=1, document.body.offsetHeight=1007
    // console.log(document.querySelector('section').scrollTop);
    // console.log(e.target.scrollingElement.scrollTop);
    // console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);
    const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
    if (scrollTop + clientHeight === scrollHeight) {
      getMorePost();
    }
  };

  document.addEventListener('scroll', onScroll);

  return (
    <div className='codereviewboard'>
      <div className='codereviewboard-container'>
        <div className='codereviewboard-header'>
          <SearchInput />
        </div>
        <section className='codereviewboard-cardbox'>
          {postList.map((item) => {
            return (
              <div className='codereviewboard-card'>
                <h1>{item.title}</h1>
                <div>{item.codeContent}</div>
              </div>
            );
          })}
          {/* <div className='codereviewboard-loding'>로딩중</div> */}
        </section>
      </div>
    </div>
  );
}

export default CodeReviewBoard;
