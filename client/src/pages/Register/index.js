import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SignUp from '../../components/SignUp';
import { Typography, Box, Link } from '@mui/material';
import { AppRoutes } from '../../app/routes';
import FormPage from '../../components/FormPage';

const RegisterPage = () => {
  return (
    <FormPage
      title={
        <>
          <Typography sx={{ textAlign: 'center', fontSize: '25px', lineHeight: '32px', fontWeight: 600 }}>
            Create a new account
          </Typography>
          <Typography sx={{ textAlign: 'center', fontSize: '15px', lineHeight: '24px', color: 'grey.600' }}>
            It’s quick and easy.
          </Typography>
        </>
      }
      cardHeaderProps={{
        sx: {
          borderBottom: '1px solid',
          borderColor: 'grey.200'
        }
      }}>
      <SignUp />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Link component={RouterLink} to={AppRoutes.LOGIN}>
          Already have an account?
        </Link>
      </Box>
    </FormPage>
  );
};

export default RegisterPage;
