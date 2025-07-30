import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Add request interceptor to include access token for write operations
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && ['post', 'patch', 'delete', 'put'].includes(config.method?.toLowerCase())) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const subscriberService = {
  // Get all subscribers
  getAll: async () => {
    const response = await axios.get(`${API_URL}/subcribers/`);
    return response.data;
  },

  // Create new subscriber
  create: async (subscriberData) => {
    const response = await axios.post(`${API_URL}/subcribers/`, subscriberData);
    return response.data;
  },

  // Get single subscriber
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/subcribers/${id}`);
    return response.data;
  },

  // Delete subscriber
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/subcribers/${id}`);
    return response.data;
  }
};