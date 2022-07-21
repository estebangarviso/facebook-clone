import React, { useEffect, useState, useRef } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Alarm as AlarmIcon } from '@mui/icons-material';
import { ModalBox } from './StyledComponents';

const CountdownModal = ({
  open,
  onClose,
  onRefresh,
  onTimeout,
  title,
  timeLeftSeconds,
  description,
  labelRefresh = 'Refresh',
  otherProps
}) => {
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(timeLeftSeconds);
  const interval = useRef();

  useEffect(() => {
    if (open) {
      interval.current = setInterval(() => {
        setTimeLeftInSeconds(timeLeftInSeconds - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [open, timeLeftInSeconds]);

  useEffect(() => {
    if (timeLeftInSeconds <= 0) {
      onTimeout();
    }
  }, [timeLeftInSeconds, onTimeout]);

  useEffect(() => {
    setTimeLeftInSeconds(timeLeftSeconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // format time left in 00:00:00 format
  const timeLeftFormatted = () => {
    const hours = Math.floor(timeLeftInSeconds / 3600);
    const minutes = Math.floor((timeLeftInSeconds % 3600) / 60);
    const seconds = Math.floor(timeLeftInSeconds % 60);
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  return (
    <Modal open={open} onClose={onClose} {...otherProps}>
      <ModalBox>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h6' component='h2'>
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <AlarmIcon className='icon' />
          <Typography variant='h6' component='h3' className='timer'>
            {timeLeftFormatted()}
          </Typography>
        </Box>
        <Box>
          <Typography variant='body1' sx={{ mt: 2 }}>
            {description}
          </Typography>
        </Box>
        <Box className='center-content' sx={{ mt: 2 }}>
          <Button variant='contained' color='primary' onClick={onRefresh} disabled={timeLeftInSeconds <= 0} fullWidth>
            {labelRefresh}
          </Button>
        </Box>
      </ModalBox>
    </Modal>
  );
};

export default CountdownModal;
