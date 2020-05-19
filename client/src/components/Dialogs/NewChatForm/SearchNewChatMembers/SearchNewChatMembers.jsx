import React from 'react';
import { Input, InputAdornment } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { compareIncludeStrings } from '../../../../utils/format/format';

import './SearchNewChatMembers.scss';

const SearchNewChatMembers = ({ setFilteredFriends, friends }) => {
  const handleChange = (e) => {
    setFilteredFriends(friends.filter(({ name, surname, city }) =>
      compareIncludeStrings([name, surname, city], e.target.value)
    ))
  }

  return (
    <div className="new-chat-search">
      <Input
        type="text"
        name="searchFriend"
        className="search-field"
        placeholder="Enter friend name"
        onChange={handleChange}
        fullWidth
        disableUnderline
        autoFocus
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle classes={{ root: 'new-chat-search-icon' }} />
          </InputAdornment>
        }
      />
    </div>
  )
}

export default SearchNewChatMembers;