import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ModalMain from "../common/Modal/Modal";

import './Settings.scss';

const Settings = ({ login, logout, deletePage, userId }) => {
    const { push } = useHistory();

    const [isOpenDeletePageModal, toggleOpenDeletePageModal] = useState(false);
    const [isOpenLogOutModal, toggleOpenLogOutModal] = useState(false);

    const openDeletePageModal = () => toggleOpenDeletePageModal(true);
    const closeDeletePageModal = () => toggleOpenDeletePageModal(false);
    const openLogOutModal = () => toggleOpenLogOutModal(true);
    const closeLogOutModal = () => toggleOpenLogOutModal(false);

    const handleDeletePage = () => {
        deletePage(userId);
        push('/signUp');
    }

    const handleLogOut = () => {
        logout();
        push('/login');
    }

    return (
        <div>
            Settings
            {isOpenLogOutModal && <ModalMain
                title={'Do you really want to log out?'}
                onSubmit={handleLogOut}
                onCloseMethod={closeLogOutModal}
            />}
            {isOpenDeletePageModal && <ModalMain
                title={`Do you really want to delete ${login} page? You will lost all information.`}
                onSubmit={handleDeletePage}
                onCloseMethod={closeDeletePageModal}
            />}


            <div>
                <Button
                    variant="outlined"
                    type="button"
                    classes={{ root: 'logout-button' }}
                    onClick={openLogOutModal}
                    endIcon={<ExitToAppIcon />}
                >
                    LogOut
              </Button>
                <Button
                    variant="outlined"
                    type="button"
                    classes={{ root: 'delete-page-button' }}
                    onClick={openDeletePageModal}
                >
                    Delete page
              </Button>
            </div>
        </div>
    );
}

export default Settings;