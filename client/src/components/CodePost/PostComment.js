import React, { useEffect, useState } from 'react';
import Button from '../basic/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCommentPost,
  resetGetCommentPost,
} from '../../redux/actions/codePostActions';
import axios from 'axios';

function PostComment() {
  const [count, setCount] = useState(2);
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.codePostReducer);
  const userState = useSelector((state) => state.userReducer);
  const { codePost, postComment } = postState;
  const { userInfo } = userState;
  const [userComment, setUserComment] = useState({
    content: '',
    postId: '',
  });
console.log(userComment)
  window.onload = function () {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 100);
  };
  useEffect(() => {
    const postId = codePost.id;
    dispatch(resetGetCommentPost(postId));
    setUserComment({ ...userComment, postId: postId });
  }, []);

  const getMorecomment = () => {
    const data = {
      postId: codePost.id,
      count:count
    }
    setTimeout(() => {
      dispatch(getCommentPost(data));
      setCount(count + 1);
    }, 1000);
  };

  const onScroll = (e) => {
    const { clientHeight, scrollTop, scrollHeight } = e.target;
    if (clientHeight + scrollTop === scrollHeight) {
      getMorecomment();
    } 
  };

  const handleInputValue = (key) => (e) => {
    setUserComment({ ...userComment, [key]: e.target.value });
  };

  const handleButtonClick = () => {
    const { loginType, accessToken } = userInfo;
    console.log('userComment',userComment)
    
    axios.post(
      `https://api.codehigh.club/comment`,
      userComment,
      {
        headers: {
          login_type: `${loginType}`,
          Authorization: `bearer ${accessToken}`,
        },
        'Content-Type': 'application/json',
        withCredentials: true,
      }
    ).then((res) => {
      console.log('메세지를 찾아보자',res)
      if(res.status === 201 || res.status === 200) {
        // history.push('/post')
        console.log('되나?')
      }
    })
  }

  const handlemodifyComment = () => {
    console.log('handlemodifyComment');
  };

  const handleDeleteComment = () => {
    console.log('handleDeleteComment');
  };

  return (
    <>
      <div className='postcomment'>
        <div className='postcomment-container'>
          <div className='postcomment-button-container'>
            <span>댓글</span>
            <Button content={'Edit'} backgroundColor='#2F8C4C' />
          </div>
          <div className='postcomment-input-container'>
            <textarea
              type='text'
              autoFocus={true}
              onChange={handleInputValue('content')}
            />
            <Button content={'Enter'} backgroundColor='#E1E1E1' onClickHandle={handleButtonClick}/>
          </div>
          <ul className='postcomment-output-container' onScroll={onScroll}>
            {postComment.map((item, index) => {
              return (
                <li className='postcomment-comment' key={index}>
                  <div className='postcomment-userInfo'>
                    <div>
                      <span className='postcomment-username'>
                        {item.userName}
                      </span>
                      <span className='postcomment-createdAt'>
                        {item.createdAt}
                      </span>
                    </div>
                    <div className='postcomment-deleteButton-container'>
                      <button
                        className='postcomment-modifyButton'
                        //   onClick={() => handlemodifyComment(item.username, idx)}
                      >
                        <FontAwesomeIcon icon={faWrench} />
                      </button>
                      <button
                        className='postcomment-deleteButton'
                        //   onClick={() => handleDeleteComment(item.username, idx)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </div>
                  <div className='postcomment-message'>{item.content}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default PostComment;
