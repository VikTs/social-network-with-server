import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

import MessagesInfoModal from './MessagesInfoModal/MessagesInfoModalContainer';
import { compareIncludeStrings } from '../../../../utils/format/format';

import './MessagesHeader.scss';

const MessagesHeader = ({
  deleteMemberFromChat,
  setFilteredMessages,
  setCurrentMessages,
  addNewChatMember,
  setFilteredChats,
  setCurrentChat,
  filteredChats,
  deleteChatAC,
  getMyData,
  messages,
  friends,
  myId,
  chat,
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

  const handleChange = (e) => {
    setFilteredMessages(messages.filter(mess => compareIncludeStrings(mess.context, e.target.value)));
  }

  const handleGoBack = () => {
    goBack();
  }

  return (
    <div className="messages-header">
      {open && <MessagesInfoModal
        setFilteredChats={setFilteredChats}
        filteredChats={filteredChats}
        handleClose={handleClose}
        getMyData={getMyData}
        chat={chat}
        open={open}
      />}
      <button type="button" className="go-back messages-header-btn">
        <ArrowBackIcon onClick={handleGoBack} />
      </button>
      {isSearch ? <div className="message-search">
        <input
          type="text"
          placeholder="Search"
          className="message-search-input"
          onChange={handleChange}
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