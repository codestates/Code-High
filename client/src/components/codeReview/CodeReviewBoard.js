import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CodeEditor from '@uiw/react-textarea-code-editor';

import {
  getReviewPost,
  getCodepost,
  resetCodereviewPost,
  getReviewFilter,
} from '../../redux/actions/codePostActions';

import SearchInput from '../basic/search/SearchInput';

function CodeReviewBoard() {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;

  const postState = useSelector((state) => state.codePostReducer);
  const { postList } = postState;

  const [count, setCount] = useState(2);
  const [searchValue, setSearchValue] = useState({
    search: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();

  //로딩 시, 첫 15개 글만 나타남
  useEffect(() => {
    async function resetCodePost() {
      dispatch(resetCodereviewPost());
    }
    resetCodePost();
  }, []);

  useEffect(() => {
    const data = {
      search: searchValue.search,
    };
    dispatch(getReviewFilter(data));
  }, [searchValue]);

  const enterKeyPress = (e) => {
    const data = {
      search: searchValue.search,
    };
    if (e.key === 'Enter') {
      dispatch(getReviewFilter(data));
    }
  };

  //새로고침 시, 스크롤 상단
  window.onload = function () {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 1000);
  };

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
    const data = {
      postId: e.target.id,
      accessToken: userInfo ? userInfo.accessToken : undefined,
    };
    dispatch(getCodepost(data));
    setTimeout(() => {
      history.push('/post');
    }, 1000);
  };

  //검색
  const handleInputValue = (key) => (e) => {
    setSearchValue({ [key]: e.target.value });
  };

  const handleClearInputValue = () => {
    const btnClear = document.querySelector('.searchinput-clear');

    btnClear.addEventListener('click', function () {
      btnClear.parentNode.querySelector('input').value = '';
    });
  };

  return (
    <div className='codereviewboard'>
      <div className='codereviewboard-container'>
        <div className='codereviewboard-header'>
          <SearchInput
            onChangeHandle={handleInputValue('search')}
            handleClearInput={handleClearInputValue}
            enterKeyPress={enterKeyPress}
          />
        </div>
        <section className='codereviewboard-cardbox' onScroll={onScroll}>
          {postList === undefined ? (
            <h1>로딩 중</h1>
          ) : (
            postList.map((item, index) => {
              return (
                <div
                  id={item.id}
                  className='codereviewboard-card'
                  key={index}
                  onClick={(e) => handleClickPost(e)}
                >
                  <h1 id={item.id}>{item.title}</h1>
                  <div id={item.id}>
                    <CodeEditor
                      readOnly
                      value={item.codeContent}
                      language={
                        item.language === null
                          ? 'javascript'
                          : `${item.language}`
                      }
                      id={item.id}
                      style={{
                        zIndex:'0',
                        margin: '3px',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        fontWeight: 500,
                        fontFamily:
                          'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
}

export default CodeReviewBoard;
