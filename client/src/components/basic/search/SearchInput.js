import React from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchInput(props) {
  const { onChangeHandle, handleClearInput, enterKeyPress } = props;

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
          onKeyPress={enterKeyPress}
        />
        <span className='searchinput-clear' onClick={handleClearInput}>
          &times;
        </span>
      </div>
    </div>
  );
}

export default SearchInput;
