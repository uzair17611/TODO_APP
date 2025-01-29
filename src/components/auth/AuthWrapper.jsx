import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AuthWrapper = () => {
  const { isAuthenticated } = useAuth(); 

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; 
  }

  return <Outlet />; 
};

export default AuthWrapper;
