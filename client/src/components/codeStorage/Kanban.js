import React, { useEffect } from 'react';
import SearchInput from '../basic/search/SearchInput';
import Button from '../basic/button/Button';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCodestoragePost } from '../../redux/actions/codePostActions';

function Kanban () {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.codePostReducer);
  const userState = useSelector(state => state.userReducer);
  const { userPostList } = postState;
  const { userInfo } = userState;
  const history = useHistory();

  useEffect(() => {
    const list_items = document.querySelectorAll('.kanban-list-item');
    const lists = document.querySelectorAll('.kanban-list');
    console.log('list', list_items); //! 빈객체임

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
          console.log('drop');
          list.append(draggedItem);
          list.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });
      }
    }
  }, []);

  useEffect(()=>{
    const data = {
      logintype:userInfo.loginType,
      accessToken:userInfo.accessToken
    }
    dispatch(getCodestoragePost(data))
    console.log('userPostList',userPostList)
  },[])  

  const handleClickPost = () => {
    //완성되면 리덕스 맞춰서 불러오는것도 같이하기
    history.push('/post')
  }

  return (
    <div className='kanban'>
      <div className='kanban-container'>
        {/* 헤더 */}
        <div className='kanban-header'>
          <SearchInput />
          <Link to='/codeinput'><Button content='NEW' backgroundColor='#2F8C4C' color='#fff' /></Link>
        </div>
        <div className='kanban-subject'>
          <div>이해도 (하)</div>
          <div>이해도 (중)</div>
          <div>이해도 (상)</div>
        </div>
        <div className='kanban-list-container'>
          <section className='kanban-list'>
            {userPostList.map((item, index) => {
              return (
                <div className='kanban-list-item' draggable='true' key={index} onDoubleClick={handleClickPost}>
                  <h1>{item.title}</h1>
                  <div>{item.createdAt}</div>
                  <div>{item.codeContent}</div>
                </div>
              );
            })}
          </section>
          <section className='kanban-list' />
          <section className='kanban-list' />
        </div>
        {/* 푸터 */}
      </div>
    </div>
  );
}

export default Kanban;
