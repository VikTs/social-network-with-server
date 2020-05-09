import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

import './MessagesHeader.scss';
import MessagesInfoModal from './MessagesInfoModal/MessagesInfoModal';

const MessagesHeader = ({
  chat,
  getMyData,
  setFilteredMessages,
  deleteMemberFromChat,
  setCurrentMessages,
  addNewChatMember,
  setCurrentChat,
  messages,
  friends,
  myId,
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

  const handleGoBack = () => {
    goBack(); 
  }

  return (
    <div className="messages-header">
      {open && <MessagesInfoModal
        deleteMemberFromChat={deleteMemberFromChat}
        addNewChatMember={addNewChatMember}
        getMyData={getMyData}
        friends={friends}
        chat={chat}
        myId={myId}
        open={open}
        handleClose={handleClose}
      />}
      <button type="button" className="go-back messages-header-btn">
        <ArrowBackIcon onClick={handleGoBack} />
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