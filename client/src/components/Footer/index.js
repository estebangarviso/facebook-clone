import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Copyright as CopyrightIcon } from '@mui/icons-material';

const Footer = () => {
  return (
    <Paper
      component='footer'
      sx={{
        py: 3,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 0
      }}
      elevation={0}>
      <Box sx={{ flex: 1, textAlign: 'center' }}>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Copyright{' '}
          <sup>
            <CopyrightIcon fontSize='1' />
          </sup>{' '}
          {new Date().getFullYear()} - Esteban Garviso
        </Typography>
      </Box>
    </Paper>
  );
};

export default Footer;
