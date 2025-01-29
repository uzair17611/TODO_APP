import api from './api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
    console.log("Sending Payload:", credentials); // ✅ Debugging
  
    const response = await api.post(`${API_BASE_URL}/auth/login`, credentials, {
      headers: { 'Content-Type': 'application/json' }, // ✅ Ensures JSON format
    });
  
    return response.data;
  }
  

/**
 * Registers a new user by sending user data to the API.
 * @param {Object} userData - { name, email, password }
 * @returns {Object} - { token, user }
 */
export const registerUser = async (userData) => {
  const response = await api.post(`${API_BASE_URL}/auth/signup`, userData);
  return response.data;
};

/**
 * Logs out a user by removing token from localStorage.
 */
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Retrieves the stored user from localStorage.
 * @returns {Object|null} - User object if logged in, otherwise null.
 */
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Retrieves the stored token from localStorage.
 * @returns {string|null} - Token string if exists, otherwise null.
 */
export const getStoredToken = () => {
  return localStorage.getItem('token');
};
