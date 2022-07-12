import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../../components/SignIn';
import { Typography, Box, Card, CardContent, CardHeader, Divider, Button, SvgIcon } from '@mui/material';
import GlobalContext, { getDesignTokens } from '../../context';
import { AppRoutes } from '../../app/routes';
import { ReactComponent as FacebookLogo } from './../../assets/facebook.svg';
import { ThemeProvider, createTheme } from '@mui/material';

const LoginPage = () => {
  const theme = useMemo(() => createTheme(getDesignTokens('light')), []);
  const navigate = useNavigate();
  const { auth } = useContext(GlobalContext);

  if (auth.token) {
    // redirect to home page
    return navigate(AppRoutes.HOME.path);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          py: 10,
          width: '100%'
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SvgIcon component={FacebookLogo} sx={{ width: '240px', height: 'auto' }} inheritViewBox />
        </Box>
        <Card sx={{ maxWidth: 'sm', m: 'auto', width: '396px', background: 'white' }} elevation={4}>
          <CardHeader title={<Typography sx={{ textAlign: 'center' }}>Log Into Facebook</Typography>} />
          <CardContent>
            <SignIn theme='light' />
            <Divider sx={{ my: 2, color: 'text.muted', fontSize: '12px' }}>or</Divider>
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
                onClick={() => navigate(AppRoutes.REGISTER.path)}>
                Create a new account
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
