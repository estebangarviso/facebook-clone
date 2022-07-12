import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../../components/SignUp';
import { Box } from '@mui/material';
import GlobalContext from '../../context';
import { AppRoutes } from '../../app/routes';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(GlobalContext);

  if (auth.token) {
    // redirect to home page
    return navigate(AppRoutes.HOME.path);
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row'
          },
          gap: 1,
          pt: 3
        }}>
        <SignUp />
      </Box>
    </>
  );
};

export default RegisterPage;
