import api from './api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
    console.log("Sending Payload:", credentials);
  
    const response = await api.post(`${API_BASE_URL}/auth/login`, credentials, {
      headers: { 'Content-Type': 'application/json' }, 
    });
  
    return response.data;
  }
  

export const registerUser = async (userData) => {
  const response = await api.post(`${API_BASE_URL}/auth/signup`, userData);
  return response.data;
};


export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};


export const getStoredToken = () => {
  return localStorage.getItem('token');
};
