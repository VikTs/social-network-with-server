import React from 'react';
import DialogsNewButton from './DialogsNewButton/DialogsNewButton';
import DialogsSearch from './DialogsSearch/DialogsSearch';
import './DialogHeader.scss';

const DialogHeader = ({ chats, setFilteredChats }) => {
  return (
    <div className="dialog-header">
      <DialogsSearch chats={chats} setFilteredChats={setFilteredChats}/>
      <DialogsNewButton chats={chats} setFilteredChats={setFilteredChats} />      
    </div>
  )
}

export default DialogHeader;