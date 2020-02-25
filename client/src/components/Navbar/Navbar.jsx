import React from 'react';
import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        {/* <NavLink to='/profiles' className={`${classes.item} ${classes.active}`}> */}
        <NavLink to='/profiles' className={classes.item} activeClassName={classes.active}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/dialogs' className={classes.item} activeClassName={classes.active}>
          Messages
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/users' className={classes.item} activeClassName={classes.active}>
          Users
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/news' className={classes.item} activeClassName={classes.active}>
          News
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/music' className={classes.item} activeClassName={classes.active}>
          Music
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/settings' className={classes.item} activeClassName={classes.active}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;