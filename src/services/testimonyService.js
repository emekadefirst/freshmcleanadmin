import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const testimonyService = {
  // Get all testimonies
  getAll: async () => {
    const response = await axios.get(`${API_URL}/testimonies/`);
    return response.data;
  },

  // Get single testimony
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/testimonies/${id}`);
    return response.data;
  },

  // Delete testimony (admin only action)
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/testimonies/${id}`);
    return response.data;
  }
};