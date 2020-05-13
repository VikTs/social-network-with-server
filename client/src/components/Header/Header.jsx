import React from "react";
import { NavLink } from "react-router-dom";

import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import "./Header.scss";

const Header = ({ login, isAuth, newNotificationsCount }) => {

  return (
    <header className="header">
      <img
        className="logo"
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
              {login}
            </div>
          </div>
        ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}
      </div>
    </header>
  );
};

export default Header;
