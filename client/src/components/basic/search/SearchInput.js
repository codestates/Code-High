import React from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchInput(){
  return (
    <div className='searchinput'>
      <div className='searchinput-container'>
        <span><FontAwesomeIcon icon={faSearch}/></span>
        <input type='search' placeholder='Search'/>
      </div>
    </div>
  );
};

export default SearchInput;