import React from 'react';
import { NavLink } from 'react-router-dom';

import './Message.scss';
import { Card, CardContent, Typography } from '@material-ui/core';

const Message = ({ context, date, user }) => {
  const { id, name } = user;
  const formatDate = new Date(date);

  return (
    <div className="message">
      <Card className="message-card">
        <CardContent id="message-card-content">
          <Typography>
            <NavLink to={'/profiles/' + id} className="message-author">
              <p className="message-author-name">{name}</p>
            </NavLink>
          </Typography>
          <Typography>
            <div className="message-context">{context}</div>
          </Typography>
          <Typography className="message-date" variant="body2">
            <p className="message-date-day">{`${formatDate.getDate()}.${formatDate.getMonth() + 1}.${formatDate.getFullYear()}`}</p>
            <p className="message-date-time">{`${formatDate.toLocaleTimeString().slice(0, 5)}`}</p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Message;
