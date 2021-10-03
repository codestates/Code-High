import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import {
  getCommentPost,
  resetGetCommentPost,
  deleteComment,
} from '../../redux/actions/codePostActions';

import Alert from '../basic/alert/Alert';
import Button from '../basic/button/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

function PostComment() {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost, postComment } = postState;

  const [alertModal, setAlertModal] = useState(false);
  const [count, setCount] = useState(2);
  const [userComment, setUserComment] = useState({
    content: '',
    postId: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();

  //새로고침 시, 스크롤 가장 상단
  window.onload = function () {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 100);
  };
  //로딩 시
  useEffect(() => {
    const data = {
      postId: codePost.id,
      accessToken: userInfo ? userInfo.accessToken : undefined,
    };
    dispatch(resetGetCommentPost(data));
    setUserComment({ ...userComment, postId: codePost.id });
  }, []);
  //무한 스크롤 댓글 더 불러오기
  const getMorecomment = () => {
    const data = {
      postId: codePost.id,
      count: count,
      accessToken: userInfo ? userInfo.accessToken : undefined,
    };
    setTimeout(() => {
      dispatch(getCommentPost(data));
      setCount(count + 1);
    }, 1000);
  };
  //무한스크롤
  const onScroll = (e) => {
    const { clientHeight, scrollTop, scrollHeight } = e.target;
    if (clientHeight + scrollTop === scrollHeight) {
      getMorecomment();
    }
  };

  const handleInputValue = (key) => (e) => {
    setUserComment({ ...userComment, [key]: e.target.value });
  };
  //글 수정
  const handleEditPost = () => {
    setTimeout(() => {
      history.push('/codeedit');
    }, 1000);
  };

  const togglePopUp = () => {
    setAlertModal(!alertModal);
  };

  //댓글 등록
  const handleButtonClick = () => {
    if (!userInfo) {
      togglePopUp()
      return;
    }
    if (userInfo.name === '게스트') {
      togglePopUp()
      return;
    }

    const { loginType, accessToken } = userInfo;

    axios
      .post(`https://api.codehigh.club/comment`, userComment, {
        headers: {
          login_type: `${loginType}`,
          Authorization: `bearer ${accessToken}`,
        },
        'Content-Type': 'application/json',
        withCredentials: true,
      })
      .then((res) => {
        console.log('메세지를 찾아보자', res);
        if (res.status === 201 || res.status === 200) {
          window.location.reload();
        }
      });
  };
  //댓글 수정
  const handlemodifyComment = () => {
    console.log('handlemodifyComment');
  };
  //댓글 삭제
  const handleDeleteComment = (id) => {
    console.log(id);
    const { loginType, accessToken } = userInfo;
    const data = {
      id: id,
      logintype: loginType,
      accessToken: accessToken,
    };
    dispatch(deleteComment(data));
  };


  const handleButtonSignup = () => {
    history.push('/signup');
  };

  return (
    <>
      <div className='postcomment'>
        <div className='postcomment-container'>
          <div className='postcomment-button-container'>
            <span>댓글</span>
            {userInfo === undefined ? null : userInfo.id === codePost.userId ? (
              <Button
                content={'Edit'}
                backgroundColor='#2F8C4C'
                onClickHandle={handleEditPost} 
              />
            ) : null}
          </div>
          <div className='postcomment-input-container'>
            {userInfo ? (
              userInfo.name === '게스트' ? (
                <textarea disabled />
              ) : (
                <textarea
                  type='text'
                  autoFocus={true}
                  onChange={handleInputValue('content')}
                />
              )
            ) : (
              <textarea disabled />
            )}
            <Button
              content={'Enter'}
              backgroundColor='#E1E1E1'
              onClickHandle={handleButtonClick}
            />
          </div>
          <ul className='postcomment-output-container' onScroll={onScroll}>
            {postComment === undefined || postComment === [] ? (
              <h2>첫 댓글을 달아보세요!</h2>
            ) : (
              postComment.map((item, index) => {
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
                          onClick={() => handleDeleteComment(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    </div>
                    <div className='postcomment-message'>{item.content}</div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
        {alertModal ? (
          <Alert
            content={'회원 로그인 후 이용가능합니다'}
            leftbutton={'회원가입'}
            rightbutton={'닫기'}
            onClickHandleLeft={handleButtonSignup}
            onClickHandleRight={togglePopUp}
            togglePopUp={togglePopUp}
          />
        ) : null}
      </div>
    </>
  );
}

export default PostComment;
