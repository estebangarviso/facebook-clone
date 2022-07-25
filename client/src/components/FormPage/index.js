import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Card, CardContent, CardHeader, SvgIcon, CssBaseline } from '@mui/material';
import GlobalContext, { getDesignTokens } from '../../context';
import { AppRoutes } from '../../app/routes';
import { ReactComponent as FacebookLogo } from './../../assets/facebook.svg';
import { ThemeProvider, createTheme } from '@mui/material';

const FormPage = ({ children, cardHeaderProps, title, checkToken = true, returnTo = AppRoutes.HOME }) => {
  const lightTheme = getDesignTokens('light');
  const defaultBgColor = lightTheme.palette.background.default;
  lightTheme.palette.background.default = '#fff';
  const theme = createTheme(lightTheme);
  const { auth } = useContext(GlobalContext);

  if (checkToken && auth.currentUser) {
    // redirect to home page
    return <Navigate to={returnTo} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          py: 10,
          width: '100%',
          backgroundColor: defaultBgColor
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SvgIcon component={FacebookLogo} sx={{ width: '240px', height: 'auto' }} inheritViewBox />
        </Box>
        <Card
          sx={{ maxWidth: 'sm', m: 'auto', width: '400px', background: 'white', borderRadius: '8px' }}
          elevation={4}>
          <CardHeader title={title} {...cardHeaderProps} />
          <CardContent>{children}</CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default FormPage;
