import React from 'react';
import './SearchNewChatMembers.scss';

const SearchNewChatMembers = ({ setFilteredFriends, friends }) => {
  const handleChange = (e) => {
    const filter = e.target.value;
    setFilteredFriends(friends.filter(({ name, surname, city }) =>
      name.includes(filter) || 
      surname.includes(filter) ||
      city.includes(filter)
      ))
  }

  return (
    <div className="new-chat-search">
      <input
        type="text"
        name="searchFriend"
        placeholder="Enter friend name"
        className="search-field"
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchNewChatMembers;