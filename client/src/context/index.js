import { createContext, useState, useRef, useMemo } from 'react';
import { red, yellow, lightBlue, green, grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AppConfig } from '../app/config';
import CountdownModal from '../components/CountdownModal';
import { AppRoutes } from '../app/routes';
import AuthService from '../services/auth.service';

// Replicate facebook's color palette
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    background: {
      paper: mode === 'dark' ? '#242526' : '#F5F5F5'
    },
    primary: {
      main: '#2374E1'
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
      main: '#42b72a'
    },
    info: {
      main: lightBlue[500]
    },
    text: {
      muted: '#96999e',
      muted2: '#737373'
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
    setShowModalTokenIsAboutToExpire(false);
    clearInterval(intervalRef.current);
    // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    // call logout endpoint
    AuthService.logout()
      .then((res) => {
        console.log('logout res', res);
        navigate(AppRoutes.LOGIN.path);
      })
      .catch((err) => {
        console.error(err);
        navigate(AppRoutes.LOGIN.path);
      });
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
      AuthService.refresh()
        .then((res) => {
          if (res.status === 200) setAuth(res.data.token, userId);
          else logout();
        })
        .catch((err) => {
          console.error(err);
          logout();
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
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
  const changeDocumentMainBackgroundColor = () =>
    document.documentElement.style.setProperty('--web-wash', mode === 'light' ? '#F0F2F5' : '#18191A');
  changeDocumentMainBackgroundColor();
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newMode);
          changeDocumentMainBackgroundColor();
          return newMode;
        });
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
