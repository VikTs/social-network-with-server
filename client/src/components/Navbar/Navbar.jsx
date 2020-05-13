import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="item">
        <NavLink to='/profiles' className="item" activeClassName="active">
          Profile
        </NavLink>
      </div>
      <div className="item">
        <NavLink to='/dialogs' className="item" activeClassName="active">
          Messages
        </NavLink>
      </div>
      <div className="item">
        <NavLink to='/friends' className="item" activeClassName="active">
          Friends
        </NavLink>
      </div>
      <div className="item">
        <NavLink to='/users' className="item" activeClassName="active">
          Users
        </NavLink>
      </div>
      <div className="item">
        <NavLink to='/requests' className="item" activeClassName="active">
          Requests
        </NavLink>
      </div>
      <div className="item">
        <NavLink to='/news' className="item" activeClassName="active">
          News
        </NavLink>
      </div>
      <div className="item">
        <NavLink to='/settings' className="item" activeClassName="active">
          Settings
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;