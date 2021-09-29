import React from 'react';
import { useSelector } from 'react-redux';

const PostMain = () => {
  const postState = useSelector((state) => state.codePostReducer);
  const userState = useSelector((state) => state.userReducer);
  const { codePost } = postState;
  const { userInfo } = userState;

  return (
    <div className='codepostmain'>
      <div className='codepostview-container'>
        <span className='codepostview-code'>{codePost.codeContent}</span>
        <span className='codepostview-text'>{codePost.textContent}</span>
      </div>
    </div>
  );
};

export default PostMain;
