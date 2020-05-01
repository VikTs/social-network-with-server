import React from 'react';
import { NavLink } from 'react-router-dom';
import GradeIcon from '@material-ui/icons/Grade';

import './DialogItem.scss';

const DialogItem = ({ id, name, description, isOwner, owner }) => {
    return (
        <NavLink to={'/dialogs/' + id} className="dialog-item">
            <div className="dialog-item-info">
                <div className="dialog-item-name">{name}</div>
                <div className="dialog-item-description">{description}</div>
                {isOwner ?
                    <div className="dialog-owner owner-me">
                        <GradeIcon style={{ color:'yellow' }} />
                    </div> :
                    <div className="dialog-owner owner-user">{owner.name}</div>
                }
            </div>
        </NavLink>
    )
}

export default DialogItem;