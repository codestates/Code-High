import React, { useState } from 'react';
import Tag from '../basic/tag/Tag';

function CodeInputTagBox(){

   const tagNameMock = [
     ['Hash', 'BFS/DFS', 'DP', 'Tree', 'Graph', 'Sort', 'Stack/Queue', 'Heap', 'Greedy', 'BS'],
     ['Programmers', 'LeetCode', 'Beakjoon', 'HackerRank', 'etc'],
     ['⭐️', '⭐️⭐️', '⭐️⭐️⭐️', '⭐️⭐️⭐️⭐️', '⭐️⭐️⭐️⭐️⭐️'],
     ['☹️', '😐', '🙂']  
  ];
  
  const [choiceTag, setChoiceTag] = useState([]);

  const handleChangeColor = (e) => {
    //빈 배열이면 클릭한 정보를 배열에 넣습니다. 색 바꾸기
    //빈 배열이 아니라면, 배열을 필터해 있는지 없는지 살피고,
    //없다면 추가하고, 색을 바꿉니다.
    //있다면 색을 회색으로 바꾸고 tag를 뺍니다.
    
    const currentTag = e.target.innerHTML;
    const fillterTag = choiceTag.filter((ele) => ele === currentTag)
    const removeTag = choiceTag.filter((ele) => ele !== currentTag)

    if(choiceTag.length === 0) {
      setChoiceTag([currentTag])
      e.target.style.backgroundColor = '#2F8C4C'
    } 
    else if (fillterTag.length === 0) {
      setChoiceTag([...choiceTag, currentTag])
      e.target.style.backgroundColor = '#2F8C4C'
    }
    else if (fillterTag.length !== 0) {
      setChoiceTag(removeTag)
      e.target.style.backgroundColor = '#E1E1E1'
    }
  }
  
  return (
    <div className='codeinputtagbox'>
      <div className='codeinputtagbox-container'>
        <div className='codeinputtagbox-tagbox'>
          <span>알고리즘</span>
          <div>{tagNameMock[0].map((item)=> {
            return <Tag content={item} backgroundColor='#E1E1E1' onClickHandle={handleChangeColor}/>
          })}</div>
        </div>
        <div className='codeinputtagbox-tagbox'>
          <span>플랫폼</span>
          <div>{tagNameMock[1].map((item)=> {
            return <Tag content={item} backgroundColor='#E1E1E1' onClickHandle={handleChangeColor}/>
          })}</div>
        </div>
        <div className='codeinputtagbox-tagbox'>
          <span>난이도</span>
          <div>{tagNameMock[2].map((item)=> {
            return <Tag content={item} backgroundColor='#E1E1E1' onClickHandle={handleChangeColor}/>
          })}</div>
        </div>
        <div className='codeinputtagbox-tagbox'>
          <span>이해도</span>
          <div>{tagNameMock[3].map((item)=> {
            return <Tag content={item} onClickHandle={handleChangeColor}/>
          })}</div>
        </div>
      </div>
    </div>
  );
};

export default CodeInputTagBox;