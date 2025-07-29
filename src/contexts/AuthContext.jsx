import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        try {
          // Verify token and get user data
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/user`);
          const userData = response.data;
          
          if (userData.is_admin) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            clearAuth();
          }
        } catch (error) {
          // If token validation fails, clear auth without refresh attempt
          console.error('Token validation failed during init:', error);
          clearAuth();
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      toast.success('Login successful!');
      
      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      
      let message = 'Login failed';
      if (error?.response?.data?.error) {
        message = error.response.data.error;
      } else if (error?.message) {
        message = error.message;
      }
      
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    toast.success('Logged out successfully');
    navigate('/auth/login', { replace: true });
  };

  const clearAuth = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  // Setup axios interceptor for automatic token refresh
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // Only attempt refresh for authenticated users and avoid refresh loops
        if (error.response?.status === 401 && 
            !originalRequest._retry && 
            !isRefreshing && 
            isAuthenticated &&
            originalRequest.url !== `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`) {
          
          originalRequest._retry = true;
          setIsRefreshing(true);
          
          try {
            await authService.refreshToken();
            originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
            setIsRefreshing(false);
            return axios.request(originalRequest);
          } catch (refreshError) {
            setIsRefreshing(false);
            console.error('Token refresh failed in interceptor:', refreshError);
            clearAuth();
            navigate('/auth/login', { replace: true });
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate, isRefreshing, isAuthenticated]);

  const value = {
    user,
    loading,
    isAuthenticated,
    isRefreshing,
    login,
    logout,
    clearAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};