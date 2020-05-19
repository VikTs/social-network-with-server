import React from "react";
import { NavLink } from "react-router-dom";

import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import logo from '../../images/logo.jpg';

import "./Header.scss";

const Header = ({ login, isAuth, newNotificationsCount }) => {

  return (
    <header className="header">
      <img
        className="logo"
        alt="social network logo"
        src={logo}
      />
      {/* <div className="login-block">
        {isAuth ? (
          <div>
            <div className="notification">
              <button>
                <NavLink to="/notification">
                  <NotificationsNoneIcon /> {newNotificationsCount || ""}
                </NavLink>
              </button>
            </div>
            <div className="header-user-name">
              {login.toUpperCase()}
            </div>
          </div>
        ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}
      </div> */}
    </header>
  );
};

export default Header;
