import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${(props) => props.theme.palette.background.paper};
  border: 2px solid #000;
  box-shadow: ${(props) => props.theme.shadows[24]};
  padding: ${(props) => props.theme.spacing(4)};
  .icon {
    font-size: ${(props) => props.theme.spacing(7)};
    color: ${(props) => props.theme.palette.primary.main};
    animation: ringing 1s linear infinite;
    transition: all 0.5s ease-in-out;
  }
  .timer {
    font-size: ${(props) => props.theme.spacing(8)};
    color: ${(props) => props.theme.palette.error.main};
    font-weight: bold;
    font-style: italic;
  }

  @keyframes ringing {
    0% {
      transform: rotate(0) scale(1) skew(1deg);
    }
    10% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    20% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
    30% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    40% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
    50% {
      transform: rotate(0) scale(1) skew(1deg);
    }
    100% {
      transform: rotate(0) scale(1) skew(1deg);
    }
  }
`;

// const styles = {
//     modal: {
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       width: 400,
//       bgcolor: 'background.paper',
//       border: '2px solid #000',
//       boxShadow: 24,
//       p: 4
//     },
//     centerContent: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center'
//     },
//     bigIcon: {
//       fontSize: 60,
//       color: 'primary.main'
//     },
//     timeLeft: {
//       fontSize: 60,
//       color: 'error.main',
//       fontWeight: 'bold',
//       fontStyle: 'italic'
//     }
//   };
