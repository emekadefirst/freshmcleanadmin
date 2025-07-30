import apiClient from './axiosConfig';

export const bookingService = {
  // Get single booking
  getById: async (id) => {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data;
  },

  // Assign cleaner to booking
  assignCleaner: async (id, cleanerId) => {
    const data = { cleaner_id: cleanerId }
    console.log("Cleaner ID", cleanerId)
    const response = await apiClient.patch(`/bookings/${id}`, data);
    return response.data;
  }
};