import axios from 'axios';

/**
 * Axios Instance Configuration
 * 
 * Centralized HTTP client for all API calls
 * 
 * Base URL: http://localhost:8080/api
 * 
 * Interceptors:
 * - Request: Automatically adds JWT token to headers
 * - Response: Handles errors globally
 */

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * 
 * Runs BEFORE every API call
 * Automatically adds JWT token from localStorage
 * 
 * Flow:
 * 1. Check if token exists in localStorage
 * 2. If yes, add to Authorization header
 * 3. Format: "Bearer <token>"
 * 4. Send request
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * 
 * Runs AFTER every API response
 * Handles common errors globally
 * 
 * Flow:
 * 1. If response successful, return data
 * 2. If 401 (Unauthorized), clear token and redirect to login
 * 3. If other error, return error message
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
