import React from 'react';

import './MessagesHeader.scss';

const MessagesHeader = ({ chat }) => {
  return (
    <div className="messages-header">
      <button type="button" onClick={() => { }}> Messages </button>
      <div className='header-chat-info'>
        <h3 className='chat-name'>{chat.chat_name}</h3>
        <p className='chat-members-number'>{chat.members.length} members</p>
      </div>
      <button type="button" onClick={() => { }}> Search </button>
    </div>
  );
};

export default MessagesHeader;