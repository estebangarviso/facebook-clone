import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../app/routes';
import { Typography, List, ListItem, Box, Divider } from '@mui/material';
import { Copyright as CopyrightIcon } from '@mui/icons-material';
import GlobalContext from '../../context';

const Footer = () => {
  const { auth } = useContext(GlobalContext);
  return (
    !auth.currentUser && (
      <Box
        id='footer'
        component='footer'
        sx={{
          borderRadius: 0,
          pt: '20px'
        }}
        elevation={0}>
        <Box
          sx={{
            m: '0 auto',
            width: '980px'
          }}>
          <Box>
            <Typography sx={{ fontSize: '12px', color: 'grey.600' }}>English (US)</Typography>
          </Box>
          <Divider sx={{ my: 2, color: 'grey.500' }} />
          <Box>
            <List
              dense
              disablePadding
              sx={{
                display: 'inline-flex',

                '& > li:not(:last-child)': { mr: '20px' },
                '& > li a': { color: 'grey.600', fontSize: '12px', whiteSpace: 'nowrap' }
              }}>
              <ListItem disableGutters disablePadding>
                <Link to={AppRoutes.REGISTER}>Sign Up</Link>
              </ListItem>
              <ListItem disableGutters disablePadding>
                <Link to={AppRoutes.LOGIN}>Log In</Link>
              </ListItem>
            </List>
            <Typography sx={{ color: 'grey.600', fontSize: '12px', my: '20px' }}>
              Esteban Garviso{' '}
              <sup>
                <CopyrightIcon fontSize='1' />
              </sup>{' '}
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default Footer;
