import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../../components/SignIn';
import { Typography, Box, Divider, Button } from '@mui/material';
import { AppRoutes } from '../../app/routes';
import FormPage from '../../components/FormPage';

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <FormPage title={<Typography sx={{ textAlign: 'center' }}>Log Into Facebook</Typography>}>
      <SignIn />
      <Divider sx={{ my: 2, color: 'grey.500', fontSize: '12px' }}>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
          variant='contained'
          color='success'
          sx={{
            fontSize: '14px',
            fontWeight: 'bold',
            letterSpacing: '0.25px',
            color: 'white'
          }}
          onClick={() => navigate(AppRoutes.REGISTER)}>
          Create a new account
        </Button>
      </Box>
    </FormPage>
  );
};

export default LoginPage;
