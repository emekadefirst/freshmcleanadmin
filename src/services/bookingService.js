import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const bookingService = {
  // Get single booking
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/bookings/${id}`);
    return response.data;
  },

  // Assign cleaner to booking
  assignCleaner: async (id, cleanerId) => {
    const data = { cleaner_id: cleanerId }
    console.log("Cleaner ID", cleanerId)
    const response = await axios.patch(`${API_URL}/bookings/${id}`, data);
    return response.data;
  }
};