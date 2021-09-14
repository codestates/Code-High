import React from 'react';
import { useEffect } from 'react';

function Kanban() {
  useEffect(() => {
    const list_items = document.querySelectorAll('.kanban-list-item');
    const lists = document.querySelectorAll('.kanban-list');
    console.log('list', list_items); //!빈객체임

    let draggedItem = null;

    for (let i = 0; i < list_items.length; i++) {
      const item = list_items[i];

      item.addEventListener('dragstart', function () {
        draggedItem = item;
        setTimeout(() => {
          item.style.display = 'none';
        },0)
      });

      item.addEventListener('dragend', function () {
        setTimeout(() => {
          draggedItem.style.display = 'block'
          draggedItem = null;
        }, 0);
      });

      for (let j = 0; j < lists.length; j++) {
        const list = lists[j];

        list.addEventListener('dragover', function(e){
          e.preventDefault();
        })
        list.addEventListener('dragenter', function(e){
          e.preventDefault();
        })
        list.addEventListener('drop', function(e){
          console.log('drop')
          list.append(draggedItem);
        })
      }
    }
  }, []);

  return (
    <div className='kanban'>
      <div className='kanban-container'>
        <section className='kanban-list'>
          <div className='kanban-list-item' draggable='true'>
            알고리즘 1
          </div>
          <div className='kanban-list-item' draggable='true'>
            알고리즘 2
          </div>
          <div className='kanban-list-item' draggable='true'>
            알고리즘 3
          </div>
          <div className='kanban-list-item' draggable='true'>
            알고리즘 4
          </div>
          <div className='kanban-list-item' draggable='true'>
            알고리즘 5
          </div>
          <div className='kanban-list-item' draggable='true'>
            알고리즘 6
          </div>
          <div className='kanban-list-item' draggable='true'>
            알고리즘 7
          </div>
        </section>
        <section className='kanban-list'></section>
        <section className='kanban-list'></section>
      </div>
    </div>
  );
}

export default Kanban;
