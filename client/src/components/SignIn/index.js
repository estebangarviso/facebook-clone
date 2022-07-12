import React, { useContext } from 'react';
import Form from '../Form';
import { Box } from '@mui/material';
import GlobalContext from '../../context';
import AuthService from '../../services/auth.service';
import FormTextField from '../Form/FormTextField';
import FormButton from '../Form/FormButton';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';
import FormPassword from '../Form/FormPassword';

const SignIn = () => {
  const { auth } = useContext(GlobalContext);
  const handleSuccess = (data) => {
    if (data.success) {
      auth.setAuth(data.token, data.userId);
    }
  };
  return (
    <Form
      serviceCallback={AuthService.login}
      useFormProps={{
        resolver: yupResolver(schema)
      }}
      onSuccess={handleSuccess}
      >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FormTextField name='email' label='Email' variant='outlined' />
        <FormPassword name='password' label='Password' variant='outlined' />
        <FormButton type='submit' variant='contained' color='primary'>
          Log In
        </FormButton>
      </Box>
    </Form>
  );
};

export default SignIn;
