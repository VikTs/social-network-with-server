import React, { useState } from 'react';
import SearchNewChatMembers from './SearchNewChatMembers/SearchNewChatMembers'
import { useHistory } from 'react-router-dom';
import MembersList from './MembersList/MembersList';
import './NewChatForm.scss';
import ChatParamentsToChoose from './ChatParamentsToChoose/ChatParamentsToChoose';

const NewChatForm = (props) => {
  const { goBack, push } = useHistory();
  const [choosedMembersId, setNewMemberId] = useState([]);
  const [chatName, setChatName] = useState('');
  const [chatDescription, setChatDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(choosedMembersId, chatName, chatDescription);
    // push('/dialogs');
  }

  return (
    <div className="new-chat">
      <button className="cancel" type="button" onClick={() => goBack()}>&#10006;</button>
      <form action="post" onSubmit={handleSubmit}>
        <SearchNewChatMembers />
        <MembersList choosedMembersId={choosedMembersId} setNewMemberId={setNewMemberId} />
        <ChatParamentsToChoose setChatName={setChatName} setChatDescription={setChatDescription} />
        <button className="submit" type="submit">Create new chat</button>
      </form>
    </div>
  )
}

export default NewChatForm;