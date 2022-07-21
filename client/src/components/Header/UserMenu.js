import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Typography } from '@mui/material';
import { AppRoutes } from '../../app/routes';
import GlobalContext from '../../context';

const UserMenu = ({ anchorEl, menuId, isMenuOpen, handleMenuClose }) => {
  const { auth } = useContext(GlobalContext);
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography
          variant='span'
          component={Link}
          to={AppRoutes.PROFILE}
          aria-label='profile of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          Profile
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography
          variant='span'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
          onClick={() => auth.logout()}>
          Logout
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
