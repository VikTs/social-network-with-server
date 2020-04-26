import React from 'react';
import DialogsNewButton from './DialogsNewButton/DialogsNewButton';
import DialogsSearch from './DialogsSearch/DialogsSearch';
import './DialogHeader.scss';

const DialogHeader = () => {
  return (
    <div className="dialog-header">
      <DialogsSearch />
      <DialogsNewButton />      
    </div>
  )
}

export default DialogHeader;