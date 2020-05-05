import React from 'react';
import { NavLink } from 'react-router-dom';

import './Message.scss';

const Message = ({ context, date, user }) => {
  const { id, name } = user;

  return (
    <div className="message">
      <NavLink to={'/profiles/' + id} className="message-author">
        <p className="message-author-name">{name}</p>
      </NavLink>
      <p className="message-context">{context}</p>
      <div className="message-date">
        <p className="message-date-day">{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</p>
        <p className="message-date-time">{`${date.getHours()} : ${date.getMinutes()}`}</p>
      </div>
    </div>
  )
}

export default Message;
