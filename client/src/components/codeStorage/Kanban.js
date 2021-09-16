import React, { useEffect } from 'react';
import SearchInput from '../basic/search/SearchInput';
import Button from '../basic/button/Button';

function Kanban () {
  // Redux 사용 후 상태 유지, 데이터 전송 관리하기
  const mockCode = [
    {
      subject: '알고리즘1',
      date: '2021.09.14',
      code: 'if(now === night){return `I have to go to bed.`}'
    },
    {
      subject: '알고리즘2',
      date: '2021.09.14',
      code: 'if(now === night){return `I have to go to bed.`}'
    },
    {
      subject: '알고리즘3',
      date: '2021.09.14',
      code: 'if(now === lunch){return `I wanna sleep`}'
    },
    {
      subject: '알고리즘4',
      date: '2021.09.14',
      code: 'if(now === night){return `I have to go to bed.`}'
    },
    {
      subject: '알고리즘5',
      date: '2021.09.14',
      code: 'if(now === morning){return `OMG`}'
    },
    {
      subject: '알고리즘6',
      date: '2021.09.14',
      code: 'if(now === night){return `I have to go to bed.`}'
    },
    {
      subject: '알고리즘7',
      date: '2021.09.14',
      code: 'if(now === richguy){return `I will run.!`}'
    },
    {
      subject: '알고리즘8',
      date: '2021.09.14',
      code: 'if(now === night){return `I have to go to bed.`}'
    }
  ];

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

  return (
    <div className='kanban'>
      <div className='kanban-container'>
        {/* 헤더 */}
        <div className='kanban-header'>
          <SearchInput />
          <Button content='NEW' backgroundColor='#2F8C4C' color='#fff' />
        </div>
        <div className='kanban-subject'>
          <div>이해도 (하)</div>
          <div>이해도 (중)</div>
          <div>이해도 (상)</div>
        </div>
        <div className='kanban-list-container'>
          <section className='kanban-list'>
            {mockCode.map((item) => {
              return (
                <div className='kanban-list-item' draggable='true'>
                  <h1>[ {item.subject} ]</h1>
                  <div>{item.date}</div>
                  <div>{item.code}</div>
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
