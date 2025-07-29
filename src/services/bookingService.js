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
    const response = await axios.patch(`${API_URL}/bookings/${id}`, {
      cleaner_id: cleanerId,
      status: "In Progress"
    });
    return response.data;
  }
};