import React from 'react';
import { NavLink } from 'react-router-dom';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import './DialogsNewButton.scss';

const DialogsNewButton = ({ setFilteredChats, chats }) => {
  const cleanFilteredChats = () => setFilteredChats(chats);

  return (
    <div className="dialog-new">
      <NavLink
        to={'/dialogs/new'}
        className="dialog-new-button"
      >
        <GroupAddIcon
          onClick={cleanFilteredChats}
          classes={{ root: 'dialog-new-button-icon' }}
        />
      </NavLink>
    </div>
  )
}

export default DialogsNewButton;