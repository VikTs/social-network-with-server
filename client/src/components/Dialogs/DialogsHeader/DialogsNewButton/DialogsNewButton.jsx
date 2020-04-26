import React from 'react';
import { NavLink } from 'react-router-dom';
import './DialogsNewButton.scss';

const DialogsNewButton = () => {
  return (
    <div className="dialog-new">
      <NavLink
            to={'/dialogs/new'}
            className="dialog-new-button"
        > + </NavLink>
    </div>
  )
}

export default DialogsNewButton;