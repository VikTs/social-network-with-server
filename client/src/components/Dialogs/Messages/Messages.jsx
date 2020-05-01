import React, { useState, useEffect } from 'react';
import MessageList from './MessageList/MessageList';
import AddMessage from './AddMessage/AddMessage';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import { socket } from '../../../App';
import { useParams } from 'react-router-dom';

import './Messages.scss';

const MessagesWrapper = ({ chats, sendMessage, messages, myId, friends }) => {
  const { id } = useParams();

  const currentMessages = messages.filter(message => id === message.chat_id);

  const currentChat = chats.find(chat => chat.id === id);

  const addNewMessage = (values) => {
    socket.emit('chat message', values.newMessageBody);

    socket.on('output', function (data) {
      console.log(data, 'output');
    });
    const newMessage = {
      chat_id: id,
      user_id: myId,
      context: values.newMessageBody,
      date_create: new Date(),
  };
    sendMessage(newMessage);
    setFilteredMessages([...filteredMessages, newMessage]);
  }

  const [filteredMessages, setFilteredMessages] = useState(currentMessages);

  return (
    <div className="messages-container">
      <MessagesHeader friends={friends} chat={currentChat} setFilteredMessages={setFilteredMessages} messages={currentMessages} />
      <MessageList messages={filteredMessages} chat={currentChat} />
      <AddMessage addNewMessage={addNewMessage} chat={currentChat} />
    </div>
  )
}

export default MessagesWrapper;