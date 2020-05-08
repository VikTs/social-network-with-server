import React, { useState, useEffect } from 'react';
import MessageList from './MessageList/MessageList';
import AddMessage from './AddMessage/AddMessage';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import { socket } from '../../../App';
import { useParams } from 'react-router-dom';

import './Messages.scss';

const Messages = ({
  chats,
  currentChat,
  sendMessage,
  messages,
  myId,
  myData,
  friends,
  addNewChatMember,
  getMyData,
  getMessages,
  getChats,
  setCurrentChat
}) => {
  const { id } = useParams();

  // const watchForMessagesUpdate = () => {
  //   // socket.emit('chat message', values.newMessageBody);
  //   socket.on('output', function (data) {
  //     console.log(data, 'output');
  //     // getMessages();
  //   });
  // }
  // watchForMessagesUpdate();

  const [filteredMessages, setFilteredMessages] = useState([]);
  let currentMessages = [];

  useEffect(() => {
    if (!messages) {
      getMessages();

      // Messages listener from DB
      socket.on('output', function (data) {
        getMessages();
      });
    }
    if (!chats) getChats();
    if (!myData) getMyData();
  }, []);

  useEffect(() => {
    if (messages) {
      currentMessages = messages.filter(message => id === message.chat_id);
      setFilteredMessages(currentMessages);
    }
  }, [messages]);

  useEffect(() => {
    if (chats) {
      setCurrentChat(chats.find(chat => `${chat._id}` == `${id}`))
    }
  }, [chats]);

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

  return (
    <>
      {filteredMessages && currentChat &&
        (<div className="messages-container">
          <MessagesHeader
            addNewChatMember={addNewChatMember}
            friends={friends} chat={currentChat}
            setFilteredMessages={setFilteredMessages}
            messages={filteredMessages}
            getMyData={getMyData}
          />
          <MessageList messages={filteredMessages} chat={currentChat} />
          <AddMessage addNewMessage={addNewMessage} chat={currentChat} />
        </div>)}
    </>
  )
}

export default Messages;