import React from 'react';
import { Skeleton, Box } from '@mui/material';

// Create facebook skeleton timeline
const TimelineSkeleton = () => {
  return (
    <Box>
      <Skeleton variant='rect' width='80vw' height='25vh' style={{ marginBottom: '1rem' }} />
      <Skeleton variant='rect' width='80vw' height='25vh' style={{ marginBottom: '1rem' }} />
      <Skeleton variant='rect' width='80vw' height='25vh' style={{ marginBottom: '1rem' }} />
    </Box>
  );
};

export default TimelineSkeleton;
