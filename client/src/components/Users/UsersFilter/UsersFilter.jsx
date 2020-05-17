import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

import './UsersFilter.scss';

let UsersFilter = ({ users, setFilteredUsers }) => {

  const handleChange = (e) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    setFilteredUsers(users.filter(user =>
      user.name.includes(inputValue) || user.surname.includes(inputValue)
    ))
  };

  return (<div>
    <Input
      autoFocus={true}
      placeholder="Enter user name"
      onChange={handleChange}
      className="users-filter"
      startAdornment={
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      }
    />
  </div>)
}


export default UsersFilter