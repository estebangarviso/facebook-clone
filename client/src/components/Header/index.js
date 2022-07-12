import React, { useState, useContext } from 'react';
// import { AppRoutes } from '../../app/routes';
// import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { AppBar, Box, Toolbar, IconButton, Badge, SvgIcon } from '@mui/material';
import {
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';
import Search from '../Search';
import GlobalContext from '../../context';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import ThemeSwitcherIconButton from '../ThemeSwitcherIconButton';

const Header = () => {
  const { auth } = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const userMenuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    auth.token && (
      <>
        <AppBar position='static'>
          <Toolbar>
            {/* <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}
            <SvgIcon
              component={Logo}
              inheritViewBox
              sx={{ display: { xs: 'none', sm: 'block' }, width: '40px', height: 'auto', ml: 2 }}
            />
            <Search sx={{ borderRadius: '50px' }} />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
                {' '}
                {/* !TODO: Dropdown to mailbox  */}
                <Badge badgeContent={4} color='error'>
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
                {' '}
                {/* !TODO: Dropdown to notifications  */}
                <Badge badgeContent={17} color='error'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <ThemeSwitcherIconButton size='large' aria-label='switch theme' color='inherit' hideText />
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={userMenuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'>
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'>
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <MobileMenu
          mobileMoreAnchorEl={mobileMoreAnchorEl}
          mobileMenuId={mobileMenuId}
          isMobileMenuOpen={isMobileMenuOpen}
          handleMobileMenuClose={handleMobileMenuClose}
          handleProfileMenuOpen={handleProfileMenuOpen}
        />
        <UserMenu anchorEl={anchorEl} menuId={userMenuId} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} />
      </>
    )
  );
};

export default Header;
