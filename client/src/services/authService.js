import api from './api';

const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      
      localStorage.setItem('user', JSON.stringify({
        id: response.data.userId,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      }));
    }
    
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      
      localStorage.setItem('user', JSON.stringify({
        id: response.data.userId,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      }));
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

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

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;