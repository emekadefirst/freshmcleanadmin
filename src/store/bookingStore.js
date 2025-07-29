import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useBookingStore = create((set, get) => ({
  bookings: [],
  loading: false,
  error: null,
  initialized: false,

  fetchBookings: async (force = false) => {
    const { initialized, bookings } = get();
    if (initialized && bookings.length > 0 && !force) {
      return;
    }
    
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/bookings/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      set({ bookings: response.data, loading: false, initialized: true });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Get all bookings
  getAllBookings: () => {
    const { bookings } = get();
    return bookings;
  },

  // Get filtered bookings for schedule (paid and not done)
  getScheduleBookings: () => {
    const { bookings } = get();
    return bookings.filter(
      booking => booking.payment_status === "Paid" && booking.status === "Not done"
    );
  },

  // Update a specific booking in the store
  updateBooking: (updatedBooking) => {
    set(state => ({
      bookings: state.bookings.map(booking => 
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    }));
  }
}));