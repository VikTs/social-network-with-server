import React, { useState } from 'react';
import './DialogList.scss';
import DialogItem from '../DialogItem/DialogItem';
import DialogHeader from '../DialogsHeader/DialogsHeader';

const DialogList = ({ chats, myId }) => {
  const [filteredChats, setFilteredChats] = useState(chats);

  const dialogItems = filteredChats.map(chat => (
    <DialogItem
      owner={chat.members.find(member => member.id === chat.owner_id)}
      isOwner={chat.owner_id === myId}
      description={chat.chat_description}
      name={chat.chat_name}
      key={chat.id}
      id={chat.id}
    />
  ))

  return (
    <div className="dialog-list">
      <DialogHeader chats={chats} setFilteredChats={setFilteredChats} />
      {dialogItems.length ? dialogItems : "No matched chats"}
    </div>
  )
}

export default DialogList;