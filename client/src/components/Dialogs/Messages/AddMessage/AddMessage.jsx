import React from 'react';
import AddMessageFormRedux from './AddMessageForm/AddMessageForm';
import './AddMessage.scss';

const AddMessage = ({ addNewMessage, chat }) => {
  return (
    <div className="new-message-container">
      <AddMessageFormRedux onSubmit={addNewMessage} chat={chat} />
    </div>
  );
};

export default AddMessage;