import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const userService = {
  // Get all users
  getAll: async () => {
    const response = await axios.get(`${API_URL}/auth/users`);
    return response.data;
  },

  // Get cleaners only (users with is_cleaner = true)
  getCleaners: async () => {
    const response = await axios.get(`${API_URL}/auth/users`);
    return response.data.filter(user => user.is_cleaner === true);
  }
};