import { createContext, useState, useRef, useMemo, useEffect } from 'react';
import ThemeProvider from './ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AppConfig } from '../app/config';
import CountdownModal from '../components/CountdownModal';
import { AppRoutes } from '../app/routes';
import AuthService from '../services/AuthService';
import { useDispatch } from 'react-redux';

const GlobalContext = createContext({
  auth: {
    currentUser: null,
    logout: () => {},
    login: (token) => {}
  }
});

export default GlobalContext;

export const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  /** auth - end */
  const wsRef = useRef();
  const intervalWsRef = useRef();
  const connectWs = (clientId) => {
    if (!clientId || wsRef.current?.readyState === WebSocket.OPEN) return;
    console.log(`Attempting to connect to websocket with clientId: ${clientId}`);
    wsRef.current = new WebSocket(`${AppConfig.WS_URL}?clientId=${clientId}`);
    wsRef.current.addEventListener('open', () => {
      console.log('Connected to WS');
    });

    wsRef.current.addEventListener('message', (e) => {
      e &&
        e.data &&
        e.data.text &&
        e.data
          .text()
          .then((data) => {
            const parsedData = JSON.parse(data);
            const { type, payload } = parsedData.data;
            if (type && payload) {
              dispatch({ type, payload });
            }
          })
          .catch((err) => console.error(err));
    });
  };
  const reconnectWs = (userId) => {
    intervalWsRef.current = setInterval(() => {
      // let wsState;
      // switch (wsRef.current?.readyState) {
      //   case WebSocket.CONNECTING:
      //     wsState = 'CONNECTING';
      //     break;
      //   case WebSocket.OPEN:
      //     wsState = 'OPEN';
      //     break;
      //   case WebSocket.CLOSING:
      //     wsState = 'CLOSING';
      //     break;
      //   case WebSocket.CLOSED:
      //     wsState = 'CLOSED';
      //     break;
      //   default:
      //     wsState = 'UNKNOWN';
      //     break;
      // }
      // console.log(`WebSocket reconnecting... current state ${wsState}: ${wsRef.current?.readyState}`, wsRef.current);
      if (wsRef.current?.readyState !== WebSocket.OPEN) {
        console.log('Reconnecting to WS...');
        connectWs(userId);
      }
    }, 5000);
  };

  const intervalRef = useRef();
  const [currentUser, setCurrentUser] = useState(
    useMemo(() => {
      if (!document.cookie.includes('token')) {
        localStorage.removeItem('token');
      }
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        //connect to websocket
        connectWs(decodedToken.user._id);
        reconnectWs(decodedToken.user._id);
        return decodedToken?.user;
      }
      return null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );
  const [showModalTokenIsAboutToExpire, setShowModalTokenIsAboutToExpire] = useState(false);

  const logout = () => {
    wsRef.current?.close();
    localStorage.removeItem('token');
    setCurrentUser(null);
    setShowModalTokenIsAboutToExpire(false);
    clearInterval(intervalRef.current);
    clearInterval(intervalWsRef.current);
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    // call logout endpoint
    AuthService.logout()
      .then((res) => {
        return <Navigate to={AppRoutes.LOGIN} />;
      })
      .catch((err) => {
        return <Navigate to={AppRoutes.LOGIN} />;
      });
  };

  const login = (token) => {
    const decodedToken = jwt_decode(token);
    // check if we are connect to websocket
    if (!wsRef.current) {
      connectWs(decodedToken.user._id);
      reconnectWs(decodedToken.user._id);
    }
    localStorage.setItem('token', token);
    setCurrentUser(decodedToken.user);
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
    if (currentUser) {
      AuthService.refresh()
        .then((res) => {
          if (res.status === 200) login(res.data.token);
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
    currentUser,
    logout,
    login
  };
  /** auth - end */
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(intervalWsRef.current);
    };
  }, []);
  return (
    <GlobalContext.Provider value={{ auth }}>
      <ThemeProvider>
        <CssBaseline />
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
