import React from 'react';
import classes from './Header.module.css'
import {NavLink} from 'react-router-dom'

const Header = (props) => {
    return (
        <header className={classes.header}>
            <img src='https://99designs-start-attachments.imgix.net/alchemy-pictures/2019%2F02%2F01%2F23%2F47%2F26%2Ff919da14-1e80-42b8-ae4c-33c381ede7f9%2Fextrafin.png?auto=format&ch=Width%2CDPR&fm=png&w=450&h=450'></img>
            <div className={classes.loginBlock}>
                {props.isAuth ? 
                <div> {props.login} - <button onClick={props.logout}>LogOut</button> </div> : 
                <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;