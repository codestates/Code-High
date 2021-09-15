import React from 'react';
import Tag from '../basic/tag/Tag';

function CodeInputTagBox(){
  return (
    <div className='codeinputtagbox'>
      <div className='codeinputtagbox-container'>
        <div className='codeinputtagbox-tagbox'>
          <span>알고리즘</span>
          <div><Tag/><Tag/><Tag/><Tag/></div>
        </div>
        <div className='codeinputtagbox-tagbox'>
          <span>플랫폼</span>
          <div><Tag/><Tag/><Tag/><Tag/></div>
        </div>
        <div className='codeinputtagbox-tagbox'>
          <span>난이도</span>
          <div><Tag/><Tag/><Tag/><Tag/></div>
        </div>
        <div className='codeinputtagbox-tagbox'>
          <span>이해도</span>
          <div><Tag/><Tag/><Tag/><Tag/></div>
        </div>
      </div>
    </div>
  );
};

export default CodeInputTagBox;