import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchInput(props) {
  const { onChangeHandle, handleClearInput } = props;

  // const handleClearInput = () => {
  //   const searchInput = document.querySelectorAll('.searchinput-input');
  //   const clearButton = document.querySelectorAll('.searchinput-clear');
  //   // 상태관리 지정한 후 설정
  //   console.log(searchInput)
  // };

  return (
    <div className='searchinput'>
      <div className='searchinput-container'>
        <span>
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type='search'
          placeholder='Search'
          className='searchinput-input'
          onChange={onChangeHandle}
        />
        <span className='searchinput-clear' onClick={handleClearInput}>
          &times;
        </span>
      </div>
    </div>
  );
}

export default SearchInput;
