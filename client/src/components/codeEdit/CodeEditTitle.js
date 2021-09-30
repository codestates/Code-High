import React from 'react';
import { useSelector } from 'react-redux';

function CodeEditTitle({ codeEditInfo, setCodeEditInfo }) {
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost } = postState;

  const handleInputValue = (key) => (e) => {
    setCodeEditInfo({ ...codeEditInfo, [key]: e.target.value });
  };

  return (
    <div className='codeinputtitle'>
      <div className='codeinputtitle-container'>
        <span>제목</span>
        <input
          type='text'
          autoFocus={true}
          onChange={handleInputValue('title')}
          defaultValue={codePost.title}
        />
      </div>
    </div>
  );
}

export default CodeEditTitle;
