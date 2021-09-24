import React, { useEffect, useState } from 'react';
import { getReviewPost } from '../../redux/actions/codePostActions';
import { resetCodereviewPost } from '../../redux/actions/codePostActions';
import { useSelector, useDispatch } from 'react-redux';
import SearchInput from '../basic/search/SearchInput';

function CodeReviewBoard () {
  const state = useSelector(state => state.codePostReducer);
  const userState = useSelector(state => state.userReducer);
  const { postList } = state;
  const { userInfo } = userState;

  const dispatch = useDispatch();

  //!새로고침하면 첫 15개만 나타남
  useEffect(()=>{
    dispatch(resetCodereviewPost())
  },[])
  console.log('코드리뷰보드에서의 코드리스트', postList)

  const onScroll = (e) => {
    //window.innerHeight=1006 , window.scrollY=1, document.body.offsetHeight=1007
    console.log(window.innerHeight , window.scrollY, document.body.offsetHeight)
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setTimeout(() => {
        let count = 1;
        const addContent = document.createElement("div");
        addContent.classList.add("codereviewboard-card")
        // dispatch(getReviewPost(count+1))
        addContent.innerHTML = `{postList.map((item) => {
          return (<h1>item.title</h1>
              <div>item.codeContent</div>);
      })}`
        document.querySelector('section').appendChild(addContent);
      },1000)
    }
  }


  return (
    <div className='codereviewboard'>
      <div className='codereviewboard-container'>
        <div className='codereviewboard-header'>
          <SearchInput />
        </div>
        <section className='codereviewboard-cardbox' onScroll={onScroll}>
          {postList.map((item) => {
              return (<div className='codereviewboard-card'>
                  <h1>{item.title}</h1>
                  <div>{item.codeContent}</div>
                </div>);
          })}
        </section>
      </div>
    </div>
  );
}

export default CodeReviewBoard;
