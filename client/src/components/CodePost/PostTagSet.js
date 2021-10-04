import React from 'react';
import Tag from '../basic/tag/Tag';
import { useSelector } from 'react-redux';

function PostTagSet() {
  const postState = useSelector((state) => state.codePostReducer);
  const userState = useSelector((state) => state.userReducer);
  const { codePost } = postState;
  const { userInfo } = userState;

  const tagList = [];
console.log(codePost)
  tagList.push(...codePost.postTags.algorithm)
  tagList.push(...codePost.postTags.difficulty)
  tagList.push(...codePost.postTags.language)
  tagList.push(...codePost.postTags.platform)
  tagList.push(...codePost.postTags.understanding)
  
  return (
    <div className='posttagset'>
      <div className='posttagset-container'>
        {tagList.map((item, index) => {
          return <Tag key={index} content={item.name} backgroundColor='#2F8C4C' />;
        })}
      </div>
    </div>
  );
}

export default PostTagSet;
