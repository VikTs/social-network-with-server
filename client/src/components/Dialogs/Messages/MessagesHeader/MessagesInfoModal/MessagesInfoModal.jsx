import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './MessagesInfoModal.scss';

const MessagesInfoModal = ({ chat, open, handleClose, friends }) => {
  const { chat_name, members, chat_description } = chat;

  const [isAddMember, setIsAddMember] = useState(false);

  const openAddMember = () => setIsAddMember(true);
  const closeAddMember = () => setIsAddMember(false);

  const membersInfo = members.map(member => (
    <div className="chat-modal-member">
      <p className="chat-modal-member-name">{member.name}</p>
    </div>
  )
  )
  const friendsInfo = friends.map(friend => (
    <div className="chat-modal-member">
      <p className="chat-modal-member-name">{friend.name}</p>
    </div>
  ))

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Chat info"
      aria-describedby="Chat description"
      className="messages-chat-modal"
    >
      <div className="chat-modal-container">
        <IconButton onClick={handleClose} className="chat-modal-close">
          <CloseIcon classes={{ root: 'chat-modal-close-icon' }} />
        </IconButton>
        <div className="chat-modal-info">
          <ChatIcon classes={{ root: 'chat-modal-chat-icon' }} />
          <div>
            <h3 className="chat-modal-name">{chat_name}</h3>
            <p className="chat-modal-memb-number">{members.length} members</p>
            <p className="chat-modal-description">{chat_description}</p>
          </div>
        </div>
        <div className="chat-modal-members">
          {!isAddMember ? (
            <>
              <div className="chat-modal-member member-add" onClick={openAddMember}>
                <PersonAddIcon classes={{ root: 'modal-member-add-icon' }} />
                <p className="modal-member-add-text">Add member</p>
              </div>
              {membersInfo}
            </>
          ) : (
              <>
                <button type="button">
                  <ArrowBackIcon onClick={closeAddMember} />
                </button>
                {friendsInfo}
                <button type="button">Add</button>
              </>
            )
          }
        </div>
      </div>
    </Modal>
  );
};

export default MessagesInfoModal;
