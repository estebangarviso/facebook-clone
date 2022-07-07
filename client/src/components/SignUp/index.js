import React from 'react';
import Form from '../Form';
import FormAvatarUpload from '../Form/FormAvatarUpload';
import FormTextField from '../Form/FormTextField';
import FormPassword from '../Form/FormPassword';
import FormButton from '../Form/FormButton';
import { Container, Paper, Box, Typography } from '@mui/material';
import schema from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthService from '../../services/auth.service';

const SignUp = () => {
  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Form serviceCallback={AuthService.register} useFormProps={{ resolver: yupResolver(schema) }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormAvatarUpload name='avatar' label='Avatar' />
            <FormTextField name='name' type='text' label='Name' required />
            <FormTextField name='email' type='email' label='Email' required />
            <FormPassword name='password' label='Password' required />
            <FormPassword name='confirmPassword' label='Confirm Password' required />
            <FormButton type='submit' variant='contained' color='primary'>
              Sign Up
            </FormButton>
          </Box>
        </Form>
      </Paper>
    </Container>
  );
};

export default SignUp;
