import React, { useRef } from 'react';
import { Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { compareIncludeStrings } from '../../../../utils/format/format';

import './DialogsSearch.scss';

const DialogsSearch = ({ chats, setFilteredChats }) => {
  const dialogSearchRef = useRef();

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const filteredChats = chats.filter(
      ({ chat_name, chat_description }) =>
        compareIncludeStrings([chat_name, chat_description] , inputValue)
    )
    setFilteredChats(filteredChats);
  }

  const focusSearch = () => dialogSearchRef.current.focus();

  return (
    <div className="dialog-search">
      <Input
        placeholder="Search dialog"
        onChange={handleChange}
        className="dialog-search-field"
        fullWidth
        disableUnderline
        inputRef={dialogSearchRef}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon onClick={focusSearch} className="dialog-search-icon" />
          </InputAdornment>
        }
      />
    </div>
  )
}

export default DialogsSearch;