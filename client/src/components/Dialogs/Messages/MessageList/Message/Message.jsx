import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';

import Modal from '../../../../common/Modal/Modal';

import './Message.scss';

const Message = ({ myId, message_owner, context, date, user, message_id, deleteMessage }) => {
  const [isOpenDeleteMessModal, toggleDeleteMessModal] = useState(false);
  const [istapedTwice, toggleTapedTwice] = useState(false);
  const openModal = () => toggleDeleteMessModal(true);
  const closeModal = () => toggleDeleteMessModal(false);

  const { id, name } = user;
  const formatDate = new Date(date);

  const handleDeleteMessage = () => {
    if (myId === message_owner) deleteMessage(message_id);
  }

  const simulateDoubleClick = (e) => {
    if(!istapedTwice) {
        toggleTapedTwice(true);
        setTimeout( function() { toggleTapedTwice(false); }, 300 );
        return false;
    }
    setTimeout( function() { openModal(); }, 300 );    
}

  return (
    <>
      {isOpenDeleteMessModal &&
        <Modal
          title='Do you realy want to delete your message?'
          onSubmit={handleDeleteMessage}
          onCloseMethod={closeModal}
        />
      }
      <div className="message" onDoubleClick={openModal} onTouchStart={simulateDoubleClick}>
        <Card className="message-card">
          <CardContent id="message-card-content">
            <Typography>
              <NavLink to={'/profiles/' + id} className="message-author">
                <span className="message-author-name">{name}</span>
              </NavLink>
            </Typography>
            <Typography variant="subtitle2">
              <div className="message-context">{context}</div>
            </Typography>
            <Typography className="message-date" variant="subtitle2">
              <p className="message-date-day">{`${formatDate.getDate()}.${formatDate.getMonth() + 1}.${formatDate.getFullYear()}`}</p>
              <p className="message-date-time">{`${formatDate.toLocaleTimeString().slice(0, 5)}`}</p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Message;
