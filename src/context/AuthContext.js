import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getStoredUser, getStoredToken } from '../api/authService';

// Create Auth Context
const AuthContext = createContext();

// Provide Auth Context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(getStoredToken());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    console.log("Received credentials:", credentials); // ✅ Debugging
    console.log("Email:", credentials.email); 
    console.log("Password:", credentials.password); 
  
    if (!credentials.password) {
      console.error("🚨 Missing password in credentials:", credentials);
      return;
    }
  
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginUser(credentials);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

   const signup = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await registerUser(userData);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return true; // ✅ Return success to navigate in Signup Form
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
      return false; // ❌ Return failure
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutUser();  
    setUser(null);  
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
