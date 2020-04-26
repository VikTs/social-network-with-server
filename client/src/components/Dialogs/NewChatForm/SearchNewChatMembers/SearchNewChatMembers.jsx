import React, { useEffect } from 'react';
import './SearchNewChatMembers.scss';

const SearchNewChatMembers = (props) => {
  const handleChange = (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value);
    }
  }

  return (
    <div className="new-chat-search">
      <input
        type="text"
        name="searchFriend"
        placeholder="Enter friend name"
        className="search-field"
      // onKeyPress={handleChange}
      />
    </div>
  )
}

export default SearchNewChatMembers;