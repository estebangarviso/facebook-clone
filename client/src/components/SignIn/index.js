import React, { useContext } from 'react';
import Form from '../Form';
import { Box, Typography } from '@mui/material';
import GlobalContext from '../../context';
import AuthService from '../../services/AuthService';
import FormTextField from '../Form/FormTextField';
import FormButton from '../Form/FormButton';
import schema from './schema';
import FormPassword from '../Form/FormPassword';

const SignIn = () => {
  const { auth } = useContext(GlobalContext);
  const handleSuccess = (res) => {
    auth.setAuth(res.data.token);
  };
  return (
    <Form serviceCallback={AuthService.login} validationSchema={schema} onSuccess={handleSuccess} autoComplete='off'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FormTextField name='email' label='Email' variant='outlined' />
        <FormPassword name='password' label='Password' variant='outlined' />
        <FormButton type='submit' variant='contained' color='primary' animated>
          <Typography variant='button'>Log In</Typography>
        </FormButton>
      </Box>
    </Form>
  );
};

export default SignIn;
