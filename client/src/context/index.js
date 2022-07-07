import { createContext, useState, useRef, useMemo } from 'react';
import { red, yellow, lightBlue, lime, grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AppConfig } from '../app/config';
import CountdownModal from '../components/CountdownModal';
import { AppRoutes } from '../app/routes';

// Replicate facebook's color palette
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#2374E1',
      paper: mode === 'dark' ? '#242526' : '#F5F5F5'
    },
    secondary: {
      main: grey[900]
    },
    error: {
      main: red[500]
    },
    warning: {
      main: yellow[500]
    },
    success: {
      main: lime[500]
    },
    info: {
      main: lightBlue[500]
    }
  }
});
const GlobalContext = createContext({
  auth: {
    token: null,
    userId: null,
    logout: () => {},
    login: (token, userId) => {}
  },
  colorMode: { toggleColorMode: () => {} }
});

export default GlobalContext;

export const GlobalProvider = ({ children }) => {
  /** auth - end */
  const intervalRef = useRef();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [showModalTokenIsAboutToExpire, setShowModalTokenIsAboutToExpire] = useState(false);

  const logout = () => {
    localStorage.clear();
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    setToken(null);
    setUserId(null);
    setShowModalTokenIsAboutToExpire(false);
    clearInterval(intervalRef.current);
    navigate(AppRoutes.LOGIN.path);
  };

  const setAuth = (token, userId) => {
    const decodedToken = jwt_decode(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setToken(token);
    setUserId(userId);
    const tokenExp = decodedToken.exp;
    const tokenIat = decodedToken.iat;
    // set the cookie token
    const timeToExpireMiliseconds = (tokenExp - tokenIat) * 1000;
    const warnTime = new Date(tokenExp * 1000 - AppConfig.TOKEN_EXPIRATION_WARN_TIME_MILISECONDS);

    // warn time needs to be lower than the token expiration time, otherwise the user will be logged out
    if (AppConfig.TOKEN_EXPIRATION_WARN_TIME_MILISECONDS > timeToExpireMiliseconds) {
      logout();
      console.error(
        'Token expiration time is lower than the warning time. User will be logged out. Token expiration time:',
        timeToExpireMiliseconds,
        'Warning time:',
        AppConfig.TOKEN_EXPIRATION_WARN_TIME_MILISECONDS
      );
    }
    document.cookie = `token=${token}; expires=${new Date(tokenExp * 1000).toUTCString()};`;

    let show = false;
    intervalRef.current = setInterval(() => {
      if (Date.now() > warnTime && !show) {
        show = true;
        setShowModalTokenIsAboutToExpire(true);
      }
    }, 1000);
  };

  const refreshToken = () => {
    if (token) {
      fetch(`${AppConfig.BACKEND_URL}/refresh-token`, {
        method: 'POST',
        credentials: 'include'
      })
        .then(async (response) => {
          const json = await response.json();
          console.log('refreshToken', { json });
          if (response.status === 401 || response.status === 403 || response.status === 500) {
            logout();
          }
          if (json.data.token) {
            setAuth(json.data.token, userId);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleRefreshCountdown = () => {
    setShowModalTokenIsAboutToExpire(false);
    refreshToken();
  };

  const auth = {
    token,
    userId,
    logout,
    setAuth
  };
  /** auth - end */
  /** theme - start */
  // ref: https://mui.com/material-ui/customization/dark-mode/
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'dark');
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  /** theme - end */
  return (
    <GlobalContext.Provider value={{ auth, colorMode }}>
      <ThemeProvider theme={theme}>
        {children}
        {showModalTokenIsAboutToExpire ? (
          <CountdownModal
            open={showModalTokenIsAboutToExpire}
            onClose={handleRefreshCountdown}
            title='Your token is about to expire'
            description='Are you there? Click the button below to refresh your session.'
            timeLeftSeconds={AppConfig.TOKEN_EXPIRATION_WARN_TIME_MILISECONDS / 1000}
            onRefresh={handleRefreshCountdown}
            onTimeout={() => logout()}
            labelRefresh='I am here'
          />
        ) : null}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};
