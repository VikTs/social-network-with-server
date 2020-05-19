import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { compareIncludeStrings } from '../../../utils/format/format';

import './FriendsFilter.scss';

const FriendsFilter = ({ users, setFilteredFriends }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setFilteredFriends(users.filter(user =>
      compareIncludeStrings([user.name, user.surname], inputValue)
    ))
  };

  return (<div>
    <Input
      placeholder="Enter user name"
      onChange={handleChange}
      className="users-filter"
      fullWidth
      disableUnderline
      autoFocus
      variant="filled"
      startAdornment={
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      }
    />
  </div>)
}


export default FriendsFilter