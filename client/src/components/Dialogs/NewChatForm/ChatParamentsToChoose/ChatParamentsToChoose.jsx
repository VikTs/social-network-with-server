import React from 'react';
import './ChatParamentsToChoose.scss';

const ChatParamentsToChoose = ({ setChatDescription, setChatName }) => {
  const handleNameChange = e => {
    setChatName(e.target.value);
  }
  const handleDescriptionChange = e => {
    setChatDescription(e.target.value);
  }

  return (
    <div className="chat-inputs">
      <input 
      required 
      className="chat-inputs-name"
      type="text" 
      placeholder="Enter chat name" 
      name="name" 
      onChange={handleNameChange} 
      />
      <textarea 
      rows="4"
      className="chat-inputs-description"
      placeholder="Enter description" 
      name="description" 
      onChange={handleDescriptionChange} 
      />      
    </div>
  )
}

export default ChatParamentsToChoose;