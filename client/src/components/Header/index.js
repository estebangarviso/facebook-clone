import React, { useState, useEffect, useContext } from 'react';
import { HeaderNav, BlackOverlay } from './styles';
import { AppRoutes } from '../../app/routes';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Paper, SvgIcon } from '@mui/material';
import ThemeSwitcher from '../ThemeSwitcher';
import GlobalContext from '../../context';

const Header = () => {
  const { auth } = useContext(GlobalContext);
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowSize]);

  return (
    <Paper
      component='header'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'secondary.header',
        borderRadius: 0
      }}
      elevation={0}>
      <Box>
        <Link to={AppRoutes.HOME.path}>
          <SvgIcon component={Logo} inheritViewBox sx={{ width: '40px', height: 'auto', ml: 2 }} />
        </Link>
      </Box>
      <Box>
        <ThemeSwitcher />
      </Box>
      {!isMobile && (
        <HeaderNav>
          <Link to={AppRoutes.POST.path}>{AppRoutes.POST.name}</Link>
          {auth.token ? (
            <a onClick={() => auth.logout()}>Sign Out</a>
          ) : (
            <Link to={AppRoutes.LOGIN.path}>{AppRoutes.LOGIN.name}</Link>
          )}
        </HeaderNav>
      )}
      {isMobile && (
        <>
          <MenuIcon onClick={handleClick} />
          <BlackOverlay isOpen={isOpen} />
          <HeaderNav isOpen={isOpen}>
            <Link to={AppRoutes.HOME.path}>{AppRoutes.HOME.name}</Link>
            <Link to={AppRoutes.POST.path}>{AppRoutes.POST.name}</Link>
            {auth.token ? (
              <a onClick={() => auth.logout()}>Sign Out</a>
            ) : (
              <Link to={AppRoutes.LOGIN.path}>{AppRoutes.LOGIN.name}</Link>
            )}
          </HeaderNav>
        </>
      )}
    </Paper>
  );
};

export default Header;
