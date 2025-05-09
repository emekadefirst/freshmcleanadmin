import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Add a request interceptor
axios.interceptors.request.use(
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

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      // Force update auth store
      useAuthStore.getState().setAuth(false);
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default axios;