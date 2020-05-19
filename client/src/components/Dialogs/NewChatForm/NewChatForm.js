import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import SearchNewChatMembers from './SearchNewChatMembers/SearchNewChatMembers'
import MembersList from './MembersList/MembersList';
import ChatParamentsToChoose from './ChatParamentsToChoose/ChatParamentsToChoose';

import './NewChatForm.scss';

const NewChatForm = ({
  createChat,
  myData = {},
  friends = [],
  filteredChats = [],
  setFilteredChats,
  getMyData
}) => {
  const { push } = useHistory();
  const [choosedMembersId, setNewMemberId] = useState([]);
  const [chatName, setChatName] = useState('');
  const [chatDescription, setChatDescription] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);

  useEffect(() => {
    if (!myData) getMyData();
  }, [myData]);

  useEffect(() => {
    if (friends) setFilteredFriends(friends);
  }, [friends]);

  const handleSubmit = e => {
    e.preventDefault();
    const choosedMembers = [];
    friends.forEach(({ _id, name, surname }) => {
      if (choosedMembersId.includes(_id))
        choosedMembers.push({ id: _id, name, surname });
    });

    const newChatData = {
      id: '3',
      members: [
        ...choosedMembers,
        { id: myData._id, name: myData.name, surname: myData.surname },
      ],
      chat_name: chatName,
      chat_description: chatDescription,
      date_create: new Date(),
      owner_id: myData._id,
    }

    createChat(newChatData).then((chat) => {
      setFilteredChats([...filteredChats, chat]);
      push('/dialogs');
    })
  }

  return (
    <> {friends &&
      <div className="new-chat">
        <button className="cancel" type="button" onClick={() => push('/dialogs')}>&#10006;</button>
        <SearchNewChatMembers setFilteredFriends={setFilteredFriends} friends={friends} />
        <form action="post" onSubmit={handleSubmit}>
          <MembersList friends={filteredFriends} choosedMembersId={choosedMembersId} setNewMemberId={setNewMemberId} />
          <ChatParamentsToChoose setChatName={setChatName} setChatDescription={setChatDescription} />
          <Button variant="contained" className="submit" type="submit">Create</Button>
        </form>
      </div>
    }
    </>
  )
}

export default NewChatForm;