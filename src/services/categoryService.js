import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const categoryService = {
  // Get all categories
  getAll: async () => {
    const response = await axios.get(`${API_URL}/categories/`);
    return response.data;
  },

  // Create new category
  create: async (categoryData) => {
    const response = await axios.post(`${API_URL}/categories/`, categoryData);
    return response.data;
  },

  // Get single category
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
  },

  // Update category
  update: async (id, categoryData) => {
    const response = await axios.patch(`${API_URL}/categories/${id}`, categoryData);
    return response.data;
  },

  // Delete category
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response.data;
  }
};