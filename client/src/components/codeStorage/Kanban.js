import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import CodeEditor from '@uiw/react-textarea-code-editor';

import {
  getCodestoragePost,
  getCodepost,
  getStorageFilter,
} from '../../redux/actions/codePostActions';

import SearchInput from '../basic/search/SearchInput';
import Button from '../basic/button/Button';

const serverUrl = 'https://api.codehigh.club';
// const serverUrl = 'http://localhost:4000';

function Kanban() {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;
  const postState = useSelector((state) => state.codePostReducer);
  const { userPostList, codePost } = postState;

  const [searchValue, setSearchValue] = useState({
    search: '',
  });

  const history = useHistory();
  const dispatch = useDispatch();

  //!글 목록 불러오기 및 칸반보드
  useEffect(() => {
    async function getCodePost() {
      let data = {
        accessToken: userInfo.accessToken,
      };
      dispatch(getCodestoragePost(data));
    }

    getCodePost();

    const list_items = document.querySelectorAll('.kanban-list-item');
    const lists = document.querySelectorAll('.kanban-list');

    let draggedItem = null;
  
    for (let i = 0; i < list_items.length; i++) {
      const item = list_items[i];
      item.addEventListener('dragstart', function () {
        draggedItem = item;
        setTimeout(() => {
          item.style.display = 'none';
        }, 0);
      });

      item.addEventListener('dragend', function () {
        setTimeout(() => {
          draggedItem.style.display = 'block';
          draggedItem = null;
        }, 0);
      });

      for (let j = 0; j < lists.length; j++) {
        const list = lists[j];

        list.addEventListener('dragover', function (e) {
          e.preventDefault();
        });
        list.addEventListener('dragenter', function (e) {
          e.preventDefault();
          list.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        });
        list.addEventListener('dragleave', function (e) {
          list.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });
        list.addEventListener('drop', function (e) {
          list.append(draggedItem);
          list.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          handleChangeTag(
            list.className.substring(e.path[0].className.length - 4),
            draggedItem.id
            //여기서 null 오류 발생
          );
        });
      }
    }
  }, []);

  useEffect(() => {
    const data = {
      search: searchValue.search,
      accessToken: userInfo.accessToken,
    };
    dispatch(getStorageFilter(data));
  }, [searchValue]);

  //!태그 수정
  const handleChangeTag = async (understanding, id) => {
    try {
      const { loginType, accessToken } = userInfo;
      let understandingId = 40;

      if (understanding === 'poor') understandingId = 40;
      if (understanding === 'fair') understandingId = 41;
      if (understanding === 'good') understandingId = 42;

      axios
        .patch(
          `${serverUrl}/post/tag`,
          {
            postId: `${id}`,
            understanding: `${understandingId}`,
          },
          {
            headers: {
              login_type: `${loginType}`,
              Authorization: `bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 201) {
            return;
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  //!글 불러오기
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

  //!검색
  const handleInputValue = (key) => (e) => {
    setSearchValue({ [key]: e.target.value });
  };

  const handleClearInputValue = () => {
    const btnClear = document.querySelector('.searchinput-clear');

    btnClear.addEventListener('click', function () {
      btnClear.parentNode.querySelector('input').value = '';
    });
  };

  const enterKeyPress = (e) => {
    const data = {
      search: searchValue.search,
      accessToken: userInfo.accessToken,
    };
    if (e.key === 'Enter') {
      dispatch(getStorageFilter(data));
    }
  };

  return (
    <div className='kanban'>
      <div className='kanban-container'>
        <div className='kanban-header'>
          <SearchInput
            onChangeHandle={handleInputValue('search')}
            handleClearInput={handleClearInputValue}
            enterKeyPress={enterKeyPress}
          />
          <Link to='/codeinput'>
            <Button content='NEW' backgroundColor='#2F8C4C' color='#fff' />
          </Link>
        </div>
        <div className='kanban-subject'>
          <div>이해도 (하)</div>
          <div>이해도 (중)</div>
          <div>이해도 (상)</div>
        </div>
        <div className='kanban-list-container'>
          <section className='kanban-list poor'>
            {userPostList === undefined ? (
              <div>로딩 중</div>
            ) : (
              userPostList.map((item, index) => {
                if (item.understanding === 40 || item.understanding === null) {
                  return (
                    <div
                      className='kanban-list-item'
                      draggable='true'
                      key={index}
                      onDoubleClick={(e) => handleClickPost(e)}
                      id={item.id}
                    >
                      <h1 id={item.id}>{item.title}</h1>
                      <div id={item.id}>
                        <CodeEditor
                          readOnly
                          className='codeeditor'
                          value={item.codeContent}
                          language={item.language===null ? 'javascript' :`${item.language}`}
                          id={item.id}
                          style={{
                            width: '95%',
                            height: '100px',
                            margin: '5px',
                            fontSize: 15,
                            backgroundColor: '#f5f5f5',
                            fontWeight: 500,
                            fontFamily:
                              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              })
            )}
          </section>
          <section className='kanban-list fair'>
            {userPostList === undefined ? (
              <div>로딩 중</div>
            ) : (
              userPostList.map((item, index) => {
                if (item.understanding === 41) {
                  return (
                    <div
                      className='kanban-list-item'
                      draggable='true'
                      key={index}
                      onDoubleClick={(e) => handleClickPost(e)}
                      id={item.id}
                    >
                      <h1 id={item.id}>{item.title}</h1>
                      <div id={item.id}>
                        <CodeEditor
                          readOnly
                          value={item.codeContent}
                          className='codeeditor'
                          language={item.language===null ? 'javascript' :`${item.language}`}
                          id={item.id}
                          style={{
                            width: '95%',
                            height: '100px',
                            margin: '5px',
                            fontSize: 15,
                            backgroundColor: '#f5f5f5',
                            fontWeight: 500,
                            fontFamily:
                              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              })
            )}
          </section>
          <section className='kanban-list good'>
            {userPostList === undefined ? (
              <div>로딩 중</div>
            ) : (
              userPostList.map((item, index) => {
                if (item.understanding === 42) {
                  return (
                    <div
                      className='kanban-list-item'
                      draggable='true'
                      key={index}
                      onDoubleClick={(e) => handleClickPost(e)}
                      id={item.id}
                    >
                      <h1 id={item.id}>{item.title}</h1>
                      <div id={item.id}>
                        <CodeEditor
                          readOnly
                          value={item.codeContent}
                          className='codeeditor'
                          language={item.language===null ? 'javascript' :`${item.language}`}
                          id={item.id}
                          style={{
                            width: '95%',
                            height: '100px',
                            margin: '5px',
                            fontSize: 15,
                            backgroundColor: '#f5f5f5',
                            fontWeight: 500,
                            fontFamily:
                              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              })
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Kanban;
