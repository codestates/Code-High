import React from 'react';

const Tag = (props) => {
  const { content, onClickHandle, backgroundColor } = props;
  return (
    <div
      className='tag-button'
      style={{
        backgroundColor
      }}
      onClick={onClickHandle}
    >
      {content}
    </div>
  );
};

export default Tag;
