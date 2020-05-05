import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

import './MessagesHeader.scss';
import MessagesInfoModal from './MessagesInfoModal/MessagesInfoModal';

const MessagesHeader = ({
  getMyData,
  chat,
  setFilteredMessages,
  messages,
  friends,
  addNewChatMember
}) => {
  const { goBack } = useHistory();
  const [isSearch, toggleIsSearch] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openSearch = () => toggleIsSearch(true);
  const closeSearch = () => {
    setFilteredMessages(messages);
    toggleIsSearch(false);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setFilteredMessages(messages.filter(mess => mess.context.includes(e.target.value)));
    }
  }

  return (
    <div className="messages-header">
      {open && <MessagesInfoModal
        getMyData={getMyData}
        addNewChatMember={addNewChatMember}
        friends={friends}
        chat={chat}
        open={open}
        handleClose={handleClose}
      />}
      <button type="button" className="go-back messages-header-btn">
        <ArrowBackIcon onClick={() => { goBack() }} />
      </button>
      {isSearch ? <div className="message-search">
        <input
          type="text"
          placeholder="Search"
          className="message-search-input"
          onKeyPress={handleKeyPress}
        />
      </div> :
        <div className='header-chat-info' onClick={handleOpen}>
          <h3 className='chat-name'>{chat.chat_name}</h3>
          <p className='chat-members-number'>{chat.members && chat.members.length} members</p>
        </div>
      }
      <div className="header-chat-btns">
        <button type="button" className="messages-header-btn">
          {isSearch ?
            <CancelIcon
              onClick={closeSearch}
              classes={{ root: 'message-search-close' }}
            /> :
            <SearchIcon onClick={openSearch} />
          }
        </button>
      </div>
    </div>
  );
};

export default MessagesHeader;