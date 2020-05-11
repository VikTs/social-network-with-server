import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import ModalMain from "../common/Modal/Modal";

import "./Header.scss";

const Header = ({ logout, deletePage, userId, login, isAuth, newNotificationsCount }) => {
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
    <>
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
      <header className="header">
        <img
          alt="social network logo"
          src="https://99designs-start-attachments.imgix.net/alchemy-pictures/2019%2F02%2F01%2F23%2F47%2F26%2Ff919da14-1e80-42b8-ae4c-33c381ede7f9%2Fextrafin.png?auto=format&ch=Width%2CDPR&fm=png&w=450&h=450"
        />
        <div className="login-block">
          {isAuth ? (
            <div>
              <div className="notification">
                <button>
                  <NavLink to="/notification">
                    <NotificationsNoneIcon /> {newNotificationsCount || ""}
                  </NavLink>
                </button>
              </div>
              <div>
                {" "}
                {login} - {" "}
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
          ) : (
              <NavLink to={"/login"}>Login</NavLink>
            )}
        </div>
      </header>
    </>
  );
};

export default Header;
