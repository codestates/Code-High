import React from 'react';
import Tag from '../basic/tag/Tag';
import { useSelector } from 'react-redux';

function PostTagSet() {
  const postState = useSelector((state) => state.codePostReducer);
  const userState = useSelector((state) => state.userReducer);
  const { codePost } = postState;
  const { userInfo } = userState;
  
  return (
    <div className='posttagset'>
      <div className='posttagset-container'>
        {codePost.postTags.map((item, index) => {
          return <Tag key={index} content={item.tag.name} backgroundColor='#2F8C4C' />;
        })}
      </div>
    </div>
  );
}

export default PostTagSet;
