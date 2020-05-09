import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import GradeIcon from '@material-ui/icons/Grade';
import DeleteIcon from '@material-ui/icons/Delete';

import './DialogItem.scss';

const DialogItem = ({ id, name, description, isOwner, owner, deleteChat, filteredChats, setFilteredChats }) => {
    const handleDelete = (e, id) => {
        e.stopPropagation();
        e.preventDefault();
        deleteChat(id);
        setFilteredChats(filteredChats.filter(chat => chat._id !== id));
    }

    return (
        <NavLink to={'/dialogs/' + id} className="dialog-item">
            <div className="dialog-item-info">
                <div className="dialog-item-name">{name}</div>
                <div className="dialog-item-description">{description}</div>
                {isOwner ?
                    <div className="dialog-owner owner-me">
                        <GradeIcon style={{ color:'yellow' }} />
                        <DeleteIcon onClick={(e) => handleDelete(e, id)} style={{ color:'black' }} />
                    </div> :
                    <div className="dialog-owner owner-user">{owner.name}</div>
                }
            </div>
        </NavLink>
    )
}

export default DialogItem;