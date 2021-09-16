import React, { useEffect } from 'react';

function CodeReviewBoard(){

  let mockCode = [
    {'subject':'알고리즘1', 'date':'2021.09.14', 'code':'if(now === night){return `I have to go to bed.`}'},
    {'subject':'알고리즘2', 'date':'2021.09.14', 'code':'if(now === night){return `I have to go to bed.`}'},
    {'subject':'알고리즘3', 'date':'2021.09.14', 'code':'if(now === lunch){return `I wanna sleep`}'},
    {'subject':'알고리즘4', 'date':'2021.09.14', 'code':'if(now === night){return `I have to go to bed.`}'},
    {'subject':'알고리즘5', 'date':'2021.09.14', 'code':'if(now === morning){return `OMG`}'},
    {'subject':'알고리즘6', 'date':'2021.09.14', 'code':'if(now === night){return `I have to go to bed.`}'},
    {'subject':'알고리즘7', 'date':'2021.09.14', 'code':'if(now === richguy){return `I will run.!`}'},
    {'subject':'알고리즘8', 'date':'2021.09.14', 'code':'if(now === night){return `I have to go to bed.`}'},
    {'subject':'알고리즘9', 'date':'2021.09.14', 'code':'if(now === morning){return `OMG`}'},
    {'subject':'알고리즘10', 'date':'2021.09.14', 'code':'if(now === night){return `I have to go to bed.`}'},
    {'subject':'알고리즘11', 'date':'2021.09.14', 'code':'if(now === night){return `I have to go to bed.`}'},
    {'subject':'알고리즘12', 'date':'2021.09.14', 'code':'if(now === lunch){return `I wanna sleep`}'},
    {'subject':'알고리즘13', 'date':'2021.09.14', 'code':'if(now === night){return `I have to go to bed.`}'},
    {'subject':'알고리즘14', 'date':'2021.09.14', 'code':'if(now === morning){return `OMG`}'},
    {'subject':'알고리즘15', 'date':'2021.09.14', 'code':'if(now === night){return `I have to go to bed.`}'},
    {'subject':'알고리즘16', 'date':'2021.09.14', 'code':'if(now === richguy){return `I will run.!`}'},
    {'subject':'알고리즘17', 'date':'2021.09.14', 'code':'if(now === night){return `I have to go to bed.`}'},
    {'subject':'알고리즘18', 'date':'2021.09.14', 'code':'if(now === morning){return `OMG`}'},
  ]

  return (
    <div className='codereviewboard'>
      <div className='codereviewboard-container'>
        <div className='codereviewboard-cardbox'>
          {mockCode.map((item) => {
              return <div className='codereviewboard-card'>
              <h1>제목 [ {item.subject} ]</h1>
              <div>{item.code}</div>
            </div>
            })}
        </div>
      </div>
    </div>
  );
};

export default CodeReviewBoard;