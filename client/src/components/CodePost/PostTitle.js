import React from 'react';
import { useSelector } from 'react-redux';

function PostTitle() {
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost } = postState;

  return (
    <div className='posttitle'>
      <div className='posttitle-container'>
        <span>제목</span>
        <div>{codePost.title}</div>
      </div>
    </div>
  );
}

export default PostTitle;
