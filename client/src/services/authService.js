import api from './api';

/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls
 * 
 * Functions:
 * 1. register() - Register new user
 * 2. login() - Login user
 * 3. logout() - Logout user (clear local storage)
 * 4. getCurrentUser() - Get user from localStorage
 * 5. isAuthenticated() - Check if user is logged in
 */

const authService = {
  /**
   * Register New User
   * 
   * @param {Object} userData - User registration data
   * @param {string} userData.name - Full name
   * @param {string} userData.email - Email address
   * @param {string} userData.password - Password (min 6 chars)
   * @param {string} userData.phoneNumber - Phone number (optional)
   * 
   * @returns {Promise<Object>} Response with token and user info
   * 
   * Flow:
   * 1. POST request to /auth/register
   * 2. Backend validates and creates user
   * 3. Backend returns JWT token
   * 4. Store token and user in localStorage
   * 5. Return response
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    
    if (response.data.token) {
      // Store JWT token
      localStorage.setItem('token', response.data.token);
      
      // Store user info (without password)
      localStorage.setItem('user', JSON.stringify({
        id: response.data.userId,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      }));
    }
    
    return response.data;
  },

  /**
   * Login User
   * 
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - Email address
   * @param {string} credentials.password - Password
   * 
   * @returns {Promise<Object>} Response with token and user info
   * 
   * Flow:
   * 1. POST request to /auth/login
   * 2. Backend validates credentials
   * 3. Backend returns JWT token
   * 4. Store token and user in localStorage
   * 5. Return response
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.token) {
      // Store JWT token
      localStorage.setItem('token', response.data.token);
      
      // Store user info
      localStorage.setItem('user', JSON.stringify({
        id: response.data.userId,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      }));
    }
    
    return response.data;
  },

  /**
   * Logout User
   * 
   * Clears all authentication data from localStorage
   * No backend call needed (JWT is stateless)
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get Current User from LocalStorage
   * 
   * @returns {Object|null} User object or null if not logged in
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        return null;
      }
    }
    return null;
  },

  /**
   * Check if User is Authenticated
   * 
   * @returns {boolean} True if token exists
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
