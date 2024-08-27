import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth(); // Get the token from the authentication context

  return token ? children : <Navigate to="/" />; // Redirect to login if no token
};

export default ProtectedRoute;