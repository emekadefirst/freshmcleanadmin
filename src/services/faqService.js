import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const faqService = {
  // Get all FAQs
  getAll: async () => {
    const response = await axios.get(`${API_URL}/faqs/`);
    return response.data;
  },

  // Create new FAQ
  create: async (faqData) => {
    const response = await axios.post(`${API_URL}/faqs/`, faqData);
    return response.data;
  },

  // Get single FAQ
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/faqs/${id}`);
    return response.data;
  },

  // Update FAQ
  update: async (id, faqData) => {
    const response = await axios.patch(`${API_URL}/faqs/${id}`, faqData);
    return response.data;
  },

  // Delete FAQ
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/faqs/${id}`);
    return response.data;
  }
};