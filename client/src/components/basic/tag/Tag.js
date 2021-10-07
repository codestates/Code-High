import React from 'react';

const Tag = (props) => {
  const { content, onClickHandle, backgroundColor, className } = props;
  return (
    <div
      className={`tag-button ${className}`}
      style={{
        backgroundColor,
      }}
      onClick={onClickHandle}
    >
      {content}
    </div>
  );
};

export default Tag;
