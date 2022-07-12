import React from 'react';
import { Typography, List, ListItem, Box } from '@mui/material';
import { Copyright as CopyrightIcon } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      id='footer'
      component='footer'
      sx={{
        borderRadius: 0
      }}
      elevation={0}>
      <Box
        sx={{
          m: '0 auto',
          width: '980px'
        }}>
        <Box sx={{ my: '20px' }}>
          <List sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row' }}>
            <ListItem>
              <Typography variant='body2' color='text.secondary'>
                Register
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='body2' color='text.secondary'>
                About
              </Typography>
            </ListItem>
          </List>
          <Typography sx={{ color: 'text.muted2', fontSize: '12px' }}>
            Esteban Garviso{' '}
            <sup>
              <CopyrightIcon fontSize='1' />
            </sup>{' '}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
