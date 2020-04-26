import React from 'react';
import Message from './Message/Message';

import './MessageList.scss';

const MessageList = ({ messages, chat }) => {
    const messageElements = messages.map(message =>
        <Message
            key={message.id}
            context={message.context}
            date={message.date_create}
            user={chat.members.find(member => member.id === message.user_id)}
        />
    )
    return (<div className="message-list">{messageElements}</div>)
}

export default MessageList;