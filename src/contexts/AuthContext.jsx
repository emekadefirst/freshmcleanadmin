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
  const [showRefreshModal, setShowRefreshModal] = useState(false);
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

  // Listen for refresh events from axios interceptor
  useEffect(() => {
    const handleRefreshStart = () => {
      setIsRefreshing(true);
      setShowRefreshModal(true);
    };
    
    const handleRefreshEnd = () => {
      setIsRefreshing(false);
      setShowRefreshModal(false);
    };
    
    const handleRefreshError = () => {
      setIsRefreshing(false);
      setShowRefreshModal(false);
      clearAuth();
      toast.error('Session expired. Please login again.');
      navigate('/auth/login', { replace: true });
    };
    
    window.addEventListener('token-refresh-start', handleRefreshStart);
    window.addEventListener('token-refresh-end', handleRefreshEnd);
    window.addEventListener('token-refresh-error', handleRefreshError);
    
    return () => {
      window.removeEventListener('token-refresh-start', handleRefreshStart);
      window.removeEventListener('token-refresh-end', handleRefreshEnd);
      window.removeEventListener('token-refresh-error', handleRefreshError);
    };
  }, [navigate]);

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
      
      {/* Refresh Token Modal */}
      {showRefreshModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Refreshing Session</h2>
              <p className="text-gray-600">Please wait while we refresh your session...</p>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};