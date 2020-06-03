import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import ModalMain from "../common/Modal/Modal";

import './Navbar.scss';

const Navbar = ({ logout, deletePage, isAuth }) => {
  const { push } = useHistory();
  const [isOpenLogOutModal, toggleOpenLogOutModal] = useState(false);

  const openLogOutModal = () => toggleOpenLogOutModal(true);
  const closeLogOutModal = () => toggleOpenLogOutModal(false);

  const handleLogOut = () => {
    logout();
    push('/login');
  }

  return (
    <nav className="nav">
      {isOpenLogOutModal && <ModalMain
        title={'Do you really want to log out?'}
        onSubmit={handleLogOut}
        onCloseMethod={closeLogOutModal}
      />}
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
      {isAuth && <div className="item">
        <button className="item logout" onClick={openLogOutModal}>
          LOGOUT
        </button>
      </div>}
    </nav>
  );
}

export default Navbar;