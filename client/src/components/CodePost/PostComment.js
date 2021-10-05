import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import {
  getCommentPost,
  resetGetCommentPost,
  deleteUserPost,
  modifyComment,
  deleteComment,
} from '../../redux/actions/codePostActions';

import Alert from '../basic/alert/Alert';
import Button from '../basic/button/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

const serverUrl = 'https://api.codehigh.club';

function PostComment() {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost, postComment, message } = postState;

  const [alertModal, setAlertModal] = useState(false);
  const [count, setCount] = useState(2);
  const [userComment, setUserComment] = useState({
    content: '',
    postId: '',
  });
  const [modifyCommetButton, setModifyCommetButton] = useState(0);
  const [modifyUserComment, setModifyUserComment] = useState({
    content: ''
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

  const handleInputValue = (key) => (e) => {
    setUserComment({ ...userComment, [key]: e.target.value });
  };

  const handleInputValueModify = (key) => (e) => {
    setModifyUserComment({ ...modifyUserComment, [key]: e.target.value });
  };

  //무한 스크롤
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
  const onScroll = (e) => {
    const { clientHeight, scrollTop, scrollHeight } = e.target;
    if (clientHeight + scrollTop === scrollHeight) {
      getMorecomment();
    }
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

  //글 삭제
  const handleDeletePost = () => {
    const { accessToken } = userInfo;
    const data = {
      id: codePost.id,
      accessToken: accessToken,
    };
    dispatch(deleteUserPost(data));

    if (message === 200) {
      history.push('/codestorage');
    }
  };

  //댓글 등록
  const handleButtonClick = () => {
    if (!userInfo) {
      togglePopUp();
      return;
    }
    if (userInfo.name === '게스트') {
      togglePopUp();
      return;
    }

    const { loginType, accessToken } = userInfo;

    axios
      .post(`${serverUrl}/comment`, userComment, {
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
  const handlemodifyComment = (id) => {
    setModifyCommetButton(id);
  };

  const handleButtonModifyComment = (id) => {
    const { accessToken } = userInfo;
    const data = {
      id: id,
      accessToken: accessToken,
      modify:modifyUserComment
    };
    dispatch(modifyComment(data));
    setModifyCommetButton(0);
    window.location.reload();
  };

  //댓글 삭제
  const handleDeleteComment = (id) => {
    const { accessToken } = userInfo;
    const data = {
      id: id,
      accessToken: accessToken,
    };
    dispatch(deleteComment(data));
    window.location.reload();
  };

  const handleButtonSignup = () => {
    history.push('/signup');
  };

  return (
    <>
      <div className='postcomment-button-warp'>
        <div className='postcomment-button-container'>
          {userInfo === undefined ? null : userInfo.id === codePost.userId ? (
            <span className='postcomment-buttons'>
              <Button
                content={'Edit'}
                backgroundColor='#2F8C4C'
                onClickHandle={handleEditPost}
              />
              <Button
                content={'Delete'}
                backgroundColor='#2F8C4C'
                onClickHandle={handleDeletePost}
              />
            </span>
          ) : null}
        </div>
      </div>

      <div className='postcomment'>
        <div className='postcomment-container'>
          <div className='postcomment-input-container'>
            {userInfo ? (
              userInfo.name === '게스트' ? (
                <textarea disabled />
              ) : (
                <textarea
                  type='text'
                  autoFocus={true}
                  onChange={handleInputValue('content')}
                  placeholder='댓글을 입력해주세요.'
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
                      {userInfo === undefined ? null : userInfo.id ===
                        item.userId ? (
                        <div className='postcomment-deleteButton-container'>
                          <button
                            className='postcomment-modifyButton'
                            onClick={() => handlemodifyComment(item.id)}
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
                      ) : null}
                    </div>
                    {modifyCommetButton === item.id ? (
                      <div className='postcomment-modifyinput-container'>
                        <textarea
                          className='postcomment-input'
                          defaultValue={item.content}
                          onChange={handleInputValueModify('content')}
                        ></textarea>
                        <button className='postcomment-input-button'onClick={()=>handleButtonModifyComment(item.id)}>수정</button>
                      </div>
                    ) : (
                      <div className='postcomment-message'>{item.content}</div>
                    )}
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
