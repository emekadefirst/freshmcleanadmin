import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const blogService = {
  // Get all blogs
  getAll: async () => {
    const response = await axios.get(`${API_URL}/blogs/`);
    return response.data;
  },

  // Create new blog
  create: async (blogData) => {
    const response = await axios.post(`${API_URL}/blogs/`, blogData);
    return response.data;
  },

  // Get single blog
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data;
  },

  // Update blog
  update: async (id, blogData) => {
    const response = await axios.patch(`${API_URL}/blogs/${id}`, blogData);
    return response.data;
  },

  // Delete blog
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/blogs/${id}`);
    return response.data;
  }
};