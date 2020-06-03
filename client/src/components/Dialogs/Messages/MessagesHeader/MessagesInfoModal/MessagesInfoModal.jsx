import React, { useState } from 'react';
import { IconButton, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CancelIcon from '@material-ui/icons/Cancel';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import ModalMain from '../../../../common/Modal/Modal';

import './MessagesInfoModal.scss';
import { useHistory } from 'react-router-dom';

const MessagesInfoModal = ({
  // getMyData,
  myId,
  chat,
  open,
  friends,
  deleteChat,
  handleClose,
  deleteChatAC,
  filteredChats,
  addNewChatMember,
  setFilteredChats,
  deleteMemberFromChat,
}) => {
  const { chat_name, members, chat_description, owner_id, _id } = chat;

  const [isAddMember, setIsAddMember] = useState(false);
  const [newMembers, toggleNewMembers] = useState([]);

  const openAddMember = () => setIsAddMember(true);
  const closeAddMember = () => setIsAddMember(false);

  const toggleNewMembList = (newMembId) => {
    newMembers.includes(newMembId) ?
      toggleNewMembers(newMembers.filter(membId => membId !== newMembId)) :
      toggleNewMembers([...newMembers, newMembId]);
  }

  const addMembersToChat = () => {
    const newMembersFullInfo = friends.filter(friend => newMembers.includes(friend._id));
    const newMembersInfo = newMembersFullInfo.map(({ _id, name, surname }) => ({
      id: _id,
      name,
      surname,
    }));
    addNewChatMember(newMembersInfo, chat._id);
    toggleNewMembers([]);
  };

  const membersInfo = members.map(member => (
    <div className="chat-modal-member" key={member.id} >
      <span className="chat-modal-member-name">{member.name}</span>
      {myId === owner_id && myId !== member.id && (
        <CancelIcon
          onClick={() => setDelMember(member.id)}
          classes={{ root: 'chat-modal-member-delete' }}
        />
      )}
    </div>
  )
  )

  const membersId = members.map(({ id }) => id);
  const friendsInfo = [];
  friends.forEach(friend => {
    if (!membersId.includes(friend._id))
      friendsInfo.push(
        <div className="chat-modal-member" key={friend._id}>
          <FormControlLabel
            control={
              <Checkbox
                className="chat-modal-member-check"
                onChange={() => { toggleNewMembList(friend._id) }}
                name={friend._id}
                color="primary"
              />
            }
            label={friend.name}
          />
        </div>
      )
  });

  //HANDLE DELETE MEMBER
  const [isOpenDeleteMemberModal, toggleDeleteMemberModal] = useState(false);
  const [memberIdToDelete, setMemberIdToDelete] = useState(null);

  const openDeleteMemberModal = () => toggleDeleteMemberModal(true);
  const closeDeleteMemberModal = () => toggleDeleteMemberModal(false);

  const setDelMember = (memberId) => {
    setMemberIdToDelete(memberId);
    openDeleteMemberModal();
  };

  const handleDeleteMember = () => {
    deleteMemberFromChat(memberIdToDelete, _id);
    closeDeleteMemberModal();
  }

  //HANDLE LEAVE CHAT
  const [isOpenLeaveChatModal, toggleLeaveChat] = useState(false);
  const { push } = useHistory();

  const openLeaveChatModal = () => toggleLeaveChat(true);
  const closeLeaveChatModal = () => toggleLeaveChat(false);

  const setLeaveMember = () => {
    setMemberIdToDelete(myId);
    openLeaveChatModal();
  };

  const handleLeaveMember = () => {
    deleteMemberFromChat(memberIdToDelete, _id);
    deleteChatAC(_id);
    setFilteredChats(filteredChats.filter(fChat => fChat._id !== _id))
    closeLeaveChatModal();
    push('/dialogs');
  }

  //HANDLE DELETE CHAT
  const [isOpenDeleteChatModal, toggleDeleteChat] = useState(false);

  const openDeleteChatModal = () => toggleDeleteChat(true);
  const closeDeleteChatModal = () => toggleDeleteChat(false);

  const handleDeleteChat = () => {
    deleteChat(_id);
    setFilteredChats(filteredChats.filter(fChat => fChat._id !== _id))
    closeDeleteChatModal();
    push('/dialogs');
  }

  return (
    <>
      {isOpenDeleteMemberModal &&
        <ModalMain
          title="Do you really want to delete member from this chat?"
          onCloseMethod={closeDeleteMemberModal}
          onSubmit={handleDeleteMember}
        />
      }
      {isOpenLeaveChatModal &&
        <ModalMain
          title="Do you really want to leave this chat? After submit you can be joined only by chat members."
          onCloseMethod={closeLeaveChatModal}
          onSubmit={handleLeaveMember}
        />
      }
      {isOpenDeleteChatModal &&
        <ModalMain
          title="Do you really want to delete chat? All messages will be lost."
          onCloseMethod={closeDeleteChatModal}
          onSubmit={handleDeleteChat}
        />
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Chat info"
        aria-describedby="Chat description"
        className="messages-chat-modal"
      >
        <div className="chat-modal-container">
          <IconButton onClick={handleClose} id="chat-modal-close">
            <CloseIcon classes={{ root: 'chat-modal-close-icon' }} />
          </IconButton>
          <div className="chat-modal-info">
            <ChatIcon classes={{ root: 'chat-modal-chat-icon' }} />
            <div className="chat-modal-info-main">
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
                {myId === owner_id ?
                  <Button
                    onClick={openDeleteChatModal}
                    size="medium"
                    variant="outlined"
                    endIcon={<DeleteForeverIcon />}
                  > Delete chat </Button>
                  :
                  <Button
                    onClick={setLeaveMember}
                    size="medium"
                    variant="outlined"
                    endIcon={<DirectionsRunIcon />}
                  > Leave chat </Button>
                }
              </>
            ) : (
                <>
                  <button type="button">
                    <ArrowBackIcon onClick={closeAddMember} />
                  </button>
                  {friendsInfo.length ?
                    <div>
                      {friendsInfo}
                      <Button
                        className="chat-modal-add-members"
                        variant="outlined"
                        type="button"
                        onClick={addMembersToChat}
                      >
                        Add members</Button>
                    </div> :
                    <div>
                      <p>All your friends in this chat</p>
                    </div>}
                </>
              )
            }
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MessagesInfoModal;
