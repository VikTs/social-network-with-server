import React from 'react';
import { NavLink } from 'react-router-dom';

import './Message.scss';

const Message = ({ context, date, user }) => {
  const { id, name } = user;
  const formatDate = new Date(date);

  return (
    <div className="message">
      <NavLink to={'/profiles/' + id} className="message-author">
        <p className="message-author-name">{name}</p>
      </NavLink>
      <p className="message-context">{context}</p>
      <div className="message-date">
        <p className="message-date-day">{`${formatDate.getDate()}.${formatDate.getMonth() + 1}.${formatDate.getFullYear()}`}</p>
        <p className="message-date-time">{`${formatDate.getHours()} : ${formatDate.getMinutes()}`}</p>
      </div>
    </div>
  )
}

export default Message;
