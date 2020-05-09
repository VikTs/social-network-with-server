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
  currentMessages,
  sendMessage,
  messages,
  myId,
  myData,
  friends,
  addNewChatMember,
  getMyData,
  getMessages,
  getChats,
  setCurrentChat,
  setCurrentMessages,
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

  useEffect(() => {
    if (!messages) {
      getMessages();

      // Messages listener from DB
      // socket.on('output', function (data) {
      //   getMessages();
      // });
    }
    if (!chats) getChats();
    if (!myData) getMyData();
  }, []);

  useEffect(() => {
    if (messages && !currentMessages) {
      const currentMessages = messages.filter(message => id === message.chat_id);
      setCurrentMessages(currentMessages)
      setFilteredMessages(currentMessages);
    }
  }, [messages, currentMessages]);

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
            messages={currentMessages}
            getMyData={getMyData}
          />
          <MessageList messages={filteredMessages} chat={currentChat} />
          <AddMessage addNewMessage={addNewMessage} chat={currentChat} />
        </div>)}
    </>
  )
}

export default Messages;