import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import GradeIcon from '@material-ui/icons/Grade';
import DeleteIcon from '@material-ui/icons/Delete';

import './DialogItem.scss';
import Modal from '../../../common/Modal/Modal';
import { Card, CardContent } from '@material-ui/core';

const DialogItem = ({ id, name, description, isOwner, owner, deleteChat, filteredChats, setFilteredChats }) => {
    const [isOpenDeleteModal, toggleDeleteModal] = useState(false);

    const openModal = (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleDeleteModal(true);
    }

    const handleDelete = () => {
        deleteChat(id);
        setFilteredChats(filteredChats.filter(chat => chat._id !== id));
    }

    return (
        <>
            {isOpenDeleteModal &&
                <Modal
                    title='Do you realy want to delete chat?'
                    onSubmit={handleDelete}
                    onCloseMethod={() => toggleDeleteModal(false)}
                />
            }
            <Card className="dialog-card">
                <CardContent className="dialog-card-content">
                    <NavLink to={'/dialogs/' + id} className="dialog-item">
                        <div className="dialog-item-info">
                            <div className="dialog-item-name">{name}</div>
                            <div className="dialog-item-description">{description}</div>
                        </div>
                    </NavLink>
                    {isOwner ?
                        <div className="dialog-owner owner-me">
                            <GradeIcon style={{ color: 'yellow' }} />
                            <DeleteIcon onClick={openModal} style={{ color: 'black' }} />
                        </div> :
                        <div className="dialog-owner owner-user">{owner.name}</div>
                    }
                </CardContent>
            </Card>
        </>
    )
}

export default DialogItem;