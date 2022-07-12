import React from 'react';
import Header from '../../components/Header';
import { Container, Box } from '@mui/material';
import Footer from '../../components/Footer';
import { StyledMain } from './StyledComponents';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container component={StyledMain} id='main' disableGutters maxWidth={false}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

Layout.LeftColumn = ({ children }) => {
  return (
    <Box id='left-column' component='aside'>
      {children}
    </Box>
  );
};

Layout.RightColumn = ({ children }) => {
  return (
    <Box id='right-column' component='aside'>
      {children}
    </Box>
  );
};

Layout.MainColumn = ({ children }) => {
  return (
    <Box id='main-column' component='section'>
      {children}
    </Box>
  );
};

export default Layout;
