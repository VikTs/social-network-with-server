import React, { useState } from 'react';
import SearchNewChatMembers from './SearchNewChatMembers/SearchNewChatMembers'
import { useHistory } from 'react-router-dom';
import MembersList from './MembersList/MembersList';
import './NewChatForm.scss';
import ChatParamentsToChoose from './ChatParamentsToChoose/ChatParamentsToChoose';

const NewChatForm = ({ createChat, myData = {}, friends = [] }) => {
  const { goBack, push } = useHistory();
  const [choosedMembersId, setNewMemberId] = useState([]);
  const [chatName, setChatName] = useState('');
  const [chatDescription, setChatDescription] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(friends);

  const handleSubmit = e => {
    e.preventDefault();    
    const choosedMembers = [];
     friends.forEach(({_id, name, surname}) => {
      if (choosedMembersId.includes(_id))
      choosedMembers.push({ id: _id, name, surname });
    });

    createChat({
      id: '3',
      members: [
        ...choosedMembers,
        { id: myData._id, name: myData.name, surname: myData.surname },
      ],
      chat_name: chatName,
      chat_description: chatDescription,
      owner_id: myData._id,
    });
    push('/dialogs');
  }

  return (
    <div className="new-chat">
      <button className="cancel" type="button" onClick={() => goBack()}>&#10006;</button>
      <SearchNewChatMembers setFilteredFriends={setFilteredFriends} friends={friends} />
      <form action="post" onSubmit={handleSubmit}>        
        <MembersList friends={filteredFriends} choosedMembersId={choosedMembersId} setNewMemberId={setNewMemberId} />
        <ChatParamentsToChoose setChatName={setChatName} setChatDescription={setChatDescription} />
        <button className="submit" type="submit">Create new chat</button>
      </form>
    </div>
  )
}

export default NewChatForm;