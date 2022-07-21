import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import Search from '../../components/Search';
import { AppRoutes } from '../../app/routes';

const PageNotFound = () => {
  return (
    <>
      <Typography variant='h1' sx={{ width: '100%', textAlign: 'center' }}>
        404
      </Typography>
      <Paper sx={{ my: 3, p: 1 }}>
        <Typography variant='p' sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>
          Page not found
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            alignItems: 'center'
          }}>
          <Search inputBaseFullWidth={true} />
          <Typography variant='span' sx={{ textAlign: 'center' }}>
            or <Link to={AppRoutes.HOME}>Go to home page</Link>
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default PageNotFound;
