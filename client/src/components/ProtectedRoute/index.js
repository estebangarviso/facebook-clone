import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import GlobalContext from '../../context';
import { AppRoutes } from '../../app/routes';

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(GlobalContext);
  if (!auth.currentUser) {
    return <Navigate to={AppRoutes.LOGIN} />;
  }
  return children;
};

export default ProtectedRoute;
