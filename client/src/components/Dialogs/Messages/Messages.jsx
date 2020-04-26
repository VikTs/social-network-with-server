import React from 'react';
import MessageList from './MessageList/MessageList';
import AddMessage from './AddMessage/AddMessage';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import { socket } from '../../../App';
import { useParams } from 'react-router-dom';

import './Messages.scss';

const MessagesWrapper = ({ chats, sendMessage, messages, myId }) => {
  const { id } = useParams();
  const currentMessages = messages.filter(message => id === message.chat_id);
  const currentChat = chats.find(chat => chat.id === id);

  const addNewMessage = (values) => {
    socket.emit('chat message', values.newMessageBody);

    socket.on('output', function (data) {
      console.log(data, 'output');
    });

    sendMessage(id, myId, values.newMessageBody, new Date());
  }

  return (
    <div className="messages-container">
      <MessagesHeader chat={currentChat} />
      <MessageList messages={currentMessages} chat={currentChat} />
      <AddMessage addNewMessage={addNewMessage} chat={currentChat} />
    </div>
  )

}

export default MessagesWrapper;