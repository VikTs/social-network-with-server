import React, { useEffect, useRef, useState } from 'react'
import Message from './Message/Message';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { IconButton } from '@material-ui/core';

import './MessageList.scss';

const MessageList = ({ messages, chat }) => {
    const messagesEndRef = useRef(null);
    const messagesListRef = useRef(null);

    const [isScrollButtonShow, toggleScrollButtonShow] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    const handleScrollClick = () => {
        scrollToBottom();
        toggleScrollButtonShow(false);
    }

    const messageElements = messages.map(message => (
        <Message
            key={message.id}
            context={message.context}
            date={message.date_create}
            user={chat.members.find(member => member.id === message.user_id)}
        />
    ));

    const handleScroll = () => {
        const listMessBottom = messagesListRef.current.getBoundingClientRect().bottom;
        const listEndBottom = messagesEndRef.current.getBoundingClientRect().bottom;
        if(listMessBottom >= listEndBottom) toggleScrollButtonShow(false);
        else if(!isScrollButtonShow) toggleScrollButtonShow(true);
    }

    return (
        <div className="message-list" onScroll={handleScroll} ref={messagesListRef}>
            {isScrollButtonShow && (
                <IconButton aria-label="scroll" className="scroll-bottom">
                    <KeyboardArrowDownIcon
                        onClick={handleScrollClick}
                        className="scroll-bottom-button"
                    />
                </IconButton>
            )}
            {messageElements}
            <div ref={messagesEndRef} />
        </div>)
}

export default MessageList;
