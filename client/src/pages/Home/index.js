import React from 'react';
import Timeline from '../../components/Timeline';
import TimelinePost from '../../components/TimelinePost';
import Layout from '../../components/Layout';

const HomePage = () => {
  return (
    <>
      <Layout.LeftColumn>LEFT column</Layout.LeftColumn>
      <Layout.MainColumn>
        <TimelinePost />
        <Timeline />
      </Layout.MainColumn>
      <Layout.RightColumn>RIGHT column</Layout.RightColumn>
    </>
  );
};

export default HomePage;
