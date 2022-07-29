import { red, yellow, lightBlue, grey } from '@mui/material/colors';
// Replicate facebook's color palette
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    background: {
      paper: mode === 'dark' ? '#242526' : '#F5F5F5',
      default: mode === 'dark' ? '#18191A' : '#F0F2F5',
      comment: mode === 'dark' ? '#3A3B3C' : '#F0F2F5'
    },
    action: {
      hover: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
    },
    primary: {
      main: '#2374E1'
    },
    secondary: {
      main: grey[900],
      button: mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#E4E6EB'
    },
    error: {
      main: red[500]
    },
    warning: {
      main: yellow[500]
    },
    success: {
      main: '#42b72a'
    },
    info: {
      main: lightBlue[500]
    }
  }
});
