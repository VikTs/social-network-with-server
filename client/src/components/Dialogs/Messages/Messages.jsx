import React, { useState } from 'react';
import MessageList from './MessageList/MessageList';
import AddMessage from './AddMessage/AddMessage';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import { socket } from '../../../App';
import { useParams } from 'react-router-dom';

import './Messages.scss';

const Messages = ({
  chats,
  sendMessage,
  messages,
  myId,
  friends,
  addNewChatMember,
  getMyData
}) => {
  const { id } = useParams();

  // const watchForMessagesUpdate = () => {
  //   // socket.emit('chat message', values.newMessageBody);
  //   socket.on('output', function (data) {
  //     console.log(data, 'output');
  //   });
  // }

  // watchForMessagesUpdate();



  const currentMessages = messages.filter(message => id === message.chat_id);
  
  const currentChat = chats.find(chat => chat._id === id);

  const addNewMessage = (values) => {
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
      <MessagesHeader
        addNewChatMember={addNewChatMember}
        friends={friends} chat={currentChat}
        setFilteredMessages={setFilteredMessages}
        messages={currentMessages}
        getMyData={getMyData}
      />
      <MessageList messages={filteredMessages} chat={currentChat} />
      <AddMessage addNewMessage={addNewMessage} chat={currentChat} />
    </div>
  )
}

export default Messages;