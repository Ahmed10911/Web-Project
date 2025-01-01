// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If user is not authenticated, redirect to signin
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;  // Return protected content if authenticated
};

export default PrivateRoute;
