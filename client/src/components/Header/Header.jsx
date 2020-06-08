import React from "react";
import logo from '../../images/logo2.jpg';

import "./Header.scss";

const Header = ({ login, isAuth }) => {

  return (
    <header className="header">
      <img
        className="logo"
        alt="social network logo"
        src={logo}
      />      
    </header>
  );
};

export default Header;
