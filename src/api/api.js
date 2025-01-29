import axios from 'axios';

// ✅ Ensure base URL is correct for API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Automatically Attach Authorization Token to Every Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
