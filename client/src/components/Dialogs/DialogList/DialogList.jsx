import React from 'react';
import './DialogList.scss';
import DialogItem from '../DialogItem/DialogItem';
import DialogHeader from '../DialogsHeader/DialogsHeader';

const DialogList = ({ chats, myId }) => {
  const dialogItems = chats.map(chat => (
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
      <DialogHeader />
      {dialogItems}
    </div>
  )
}

export default DialogList;