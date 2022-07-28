import React, { useEffect, useRef, useState } from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { Typography } from '@mui/material';

const TimeAgo = ({ timestamp }) => {
  const handleTime = (timestamp) => timestamp && formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
  const [timeAgo, setTimeAgo] = useState(handleTime(timestamp));
  const timeAgoRef = useRef();

  useEffect(() => {
    timeAgoRef.current = setInterval(() => {
      setTimeAgo(handleTime(timestamp));
    }, 1000);
    return () => clearInterval(timeAgoRef.current);
  }, [timestamp]);

  return (
    <Typography title={timestamp} component='span'>
      {timeAgo}
    </Typography>
  );
};
export default TimeAgo;
