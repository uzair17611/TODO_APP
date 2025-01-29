import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AuthWrapper = () => {
  const { isAuthenticated } = useAuth(); // Check if user is logged in

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return <Outlet />; // Render child components if authenticated
};

export default AuthWrapper;
