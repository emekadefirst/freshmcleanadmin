import apiClient from './axiosConfig';

export const userService = {
  // Get all users
  getAll: async () => {
    const response = await apiClient.get('/auth/users');
    return response.data;
  },

  // Get cleaners only (users with is_cleaner = true)
  getCleaners: async () => {
    const response = await apiClient.get('/auth/users');
    return response.data.filter(user => user.is_cleaner === true);
  }
};