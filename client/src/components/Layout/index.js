import React, { useEffect, useRef } from 'react';
import Header from '../../components/Header';
import { Paper, Box } from '@mui/material';
import Footer from '../../components/Footer';

const Layout = ({ children }) => {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const headerHeight = headerRef.current?.clientHeight;
    const footerHeight = footerRef.current?.clientHeight;
    if (mainRef.current) {
      mainRef.current.style.paddingTop = `${headerHeight}px`;
      mainRef.current.style.paddingBottom = `${footerHeight}px`;
    }
  }, []);

  return (
    <>
      <Header ref={headerRef} />
      <Box component='main' sx={{ px: 3 }} ref={mainRef}>
        {children}
      </Box>
      <Footer ref={footerRef} />
    </>
  );
};

export default Layout;
