import React from 'react';
import { Search as MuiSearch, SearchIconWrapper, StyledInputBase } from './styled-components';
import { Search as SearchIcon } from '@mui/icons-material';

const Search = ({ inputBaseFullWidth = false, ...otherProps }) => {
  return (
    <MuiSearch {...otherProps}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} fullWidth={inputBaseFullWidth} />
    </MuiSearch>
  );
};

export default Search;
