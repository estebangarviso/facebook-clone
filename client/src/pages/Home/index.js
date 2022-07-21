import React from 'react';
import Timeline from '../../components/Timeline';
import PostForm from '../../components/PostForm';
import Layout from '../../components/Layout';
import { Box } from '@mui/material';

const HomePage = () => {
  return (
    <>
      <Layout.LeftColumn>LEFT column</Layout.LeftColumn>
      <Layout.MainColumn>
        <Box
          sx={{
            width: '500px',
            margin: 'auto'
          }}>
          <PostForm />
          <Timeline />
        </Box>
      </Layout.MainColumn>
      <Layout.RightColumn>RIGHT column</Layout.RightColumn>
    </>
  );
};

export default HomePage;
