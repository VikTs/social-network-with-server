import React from 'react';
import './DialogsSearch.scss';

const DialogsSearch = ({ chats, setFilteredChats }) => {
  const handleChange = (e) => {
    if (e.key === 'Enter') {
      const inputValue = e.target.value;
      const filteredChats = chats.filter(
        (chat) =>
          chat.chat_name.includes(inputValue) ||
          chat.chat_description.includes(inputValue)
      )
      setFilteredChats(filteredChats);
    }
  }
  return (
    <div className="dialog-search">
      <input
        onKeyPress={handleChange}
        className="dialog-search-field"
        type="text"
        placeholder="Search dialog" />
    </div>
  )
}

export default DialogsSearch;