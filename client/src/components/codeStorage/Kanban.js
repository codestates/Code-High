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

function Kanban() {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;

  const postState = useSelector((state) => state.codePostReducer);
  const { userPostList } = postState;

  const [searchValue, setSearchValue] = useState({
    search: '',
  });

  const history = useHistory();
  const dispatch = useDispatch();

  //ํ๊ทธ ์์ 
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

  const kanban = () => {
    const list_items = document.querySelectorAll('.kanban-list-item');
    const lists = document.querySelectorAll('.kanban-list');

    let draggedItem = null;

    for (let i = 0; i < list_items.length; i++) {
      const item = list_items[i];
      item.addEventListener('dragstart', function () {
        draggedItem = item;
        if (draggedItem !== null) {
          setTimeout(() => {
            item.style.display = 'none';
          }, 0);
        }
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
          if (draggedItem !== null) {
            list.append(draggedItem);
            list.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            handleChangeTag(
              list.className.substring(e.path[0].className.length - 4),
              draggedItem.id
            );
          }
        });
      }
    }
  };

  //๊ธ ๋ถ๋ฌ์ค๊ธฐ
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

  //๊ฒ์
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

  //์นธ๋ฐ๋ณด๋
  useEffect(() => {
    kanban();
  });

  //๊ธ ๋ชฉ๋ก ๋ถ๋ฌ์ค๊ธฐ
  useEffect(() => {
    async function getCodePost() {
      let data = {
        accessToken: userInfo.accessToken,
      };
      dispatch(getCodestoragePost(data));
    }

    getCodePost();
  }, []);

  useEffect(() => {
    const data = {
      search: searchValue.search,
      accessToken: userInfo.accessToken,
    };
    dispatch(getStorageFilter(data));
  }, [searchValue]);

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
          <div>์ดํด๋ (ํ)</div>
          <div>์ดํด๋ (์ค)</div>
          <div>์ดํด๋ (์)</div>
        </div>
        <div className='kanban-list-container'>
          <section className='kanban-list poor'>
            {userPostList === undefined ? (
              <div>๋ก๋ฉ ์ค</div>
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
                          language={
                            item.language === null
                              ? 'javascript'
                              : `${item.language}`
                          }
                          id={item.id}
                          style={{
                            width: '95%',
                            height: '100px',
                            margin: '5px',
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
                }
              })
            )}
          </section>
          <section className='kanban-list fair'>
            {userPostList === undefined ? (
              <div>๋ก๋ฉ ์ค</div>
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
                          language={
                            item.language === null
                              ? 'javascript'
                              : `${item.language}`
                          }
                          id={item.id}
                          style={{
                            width: '95%',
                            height: '100px',
                            margin: '5px',
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
                }
              })
            )}
          </section>
          <section className='kanban-list good'>
            {userPostList === undefined ? (
              <div>๋ก๋ฉ ์ค</div>
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
                          language={
                            item.language === null
                              ? 'javascript'
                              : `${item.language}`
                          }
                          id={item.id}
                          style={{
                            width: '95%',
                            height: '100px',
                            margin: '5px',
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
