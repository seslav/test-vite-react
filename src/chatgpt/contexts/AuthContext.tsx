import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a context for authentication with default value `undefined`
const AuthContext = createContext(undefined);

// AuthProvider component that provides authentication state to its children
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Use state to hold the authentication token
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  // Function to log in and set the token
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken); // Save token in localStorage
    navigate('/profile'); // Redirect to profile page after login
  };

  // Function to log out and remove the token
  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken'); // Remove token from localStorage
    navigate('/'); // Redirect to login page after logout
  };

  // Provide the authentication context to children
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};