import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

/**
 * Authentication Context
 * 
 * Global state management for authentication
 * 
 * Provides:
 * - user: Current user object
 * - isAuthenticated: Boolean flag
 * - login(): Login function
 * - register(): Register function
 * - logout(): Logout function
 * 
 * Why Context?
 * - Avoid prop drilling (passing props through many components)
 * - Share auth state globally
 * - Single source of truth for authentication
 * 
 * Usage in components:
 * const { user, isAuthenticated, login, logout } = useAuth();
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * Initialize auth state from localStorage
   * Runs once on app load
   */
  useEffect(() => {
    const initializeAuth = () => {
      const currentUser = authService.getCurrentUser();
      const isAuth = authService.isAuthenticated();
      
      if (currentUser && isAuth) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  /**
   * Login Function
   * 
   * @param {Object} credentials - Email and password
   * @returns {Promise<Object>} Auth response
   */
  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser({
      id: response.userId,
      name: response.name,
      email: response.email,
      role: response.role,
    });
    setIsAuthenticated(true);
    return response;
  };

  /**
   * Register Function
   * 
   * @param {Object} userData - Registration data
   * @returns {Promise<Object>} Auth response
   */
  const register = async (userData) => {
    const response = await authService.register(userData);
    setUser({
      id: response.userId,
      name: response.name,
      email: response.email,
      role: response.role,
    });
    setIsAuthenticated(true);
    return response;
  };

  /**
   * Logout Function
   * 
   * Clears user state and localStorage
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom Hook to use Auth Context
 * 
 * Usage: const { user, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
