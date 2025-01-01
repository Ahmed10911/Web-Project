// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On app load, check if the user is logged in based on localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function: Update the state and store in localStorage
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('user', 'true');  // Store login status
  };

  // Logout function: Reset the state and clear from localStorage
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');  // Remove login status
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
