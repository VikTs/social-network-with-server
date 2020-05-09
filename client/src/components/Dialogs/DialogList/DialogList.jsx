import React, { useState, useEffect } from 'react';
import './DialogList.scss';
import DialogItem from '../DialogItem/DialogItem';
import DialogHeader from '../DialogsHeader/DialogsHeader';

const DialogList = ({ chats, myId, filteredChats=chats, setFilteredChats, deleteChat }) => {

  return (
    <div className="dialog-list">
      <DialogHeader chats={chats} setFilteredChats={setFilteredChats} />
      {filteredChats.length ? (
        filteredChats.map(chat => (
          <DialogItem
            owner={chat.members.find(member => member.id === chat.owner_id)}
            setFilteredChats={setFilteredChats}
            filteredChats={filteredChats}
            isOwner={chat.owner_id === myId}
            deleteChat={deleteChat}
            description={chat.chat_description}
            name={chat.chat_name}
            key={chat._id}
            id={chat._id}
          />
        ))
      ) : "No matched chats"}
    </div>
  )
}

export default DialogList;
