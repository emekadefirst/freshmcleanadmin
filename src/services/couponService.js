import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const couponService = {
  // Get all coupons
  getAll: async () => {
    const response = await axios.get(`${API_URL}/coupon/`);
    return response.data;
  },

  // Create new coupon
  create: async (couponData) => {
    const response = await axios.post(`${API_URL}/coupon/`, couponData);
    return response.data;
  },

  // Get single coupon
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/coupon/${id}`);
    return response.data;
  },

  // Update coupon
  update: async (id, couponData) => {
    const response = await axios.patch(`${API_URL}/coupon/${id}`, couponData);
    return response.data;
  },

  // Delete coupon
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/coupon/${id}`);
    return response.data;
  }
};