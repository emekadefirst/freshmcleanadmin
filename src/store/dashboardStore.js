import { create } from 'zustand'
import axios from 'axios'
import DashboardService from '../services/dashboard.service';

const useDashboardStore = create((set) => ({
  statistics: null,
  orders: null,
  isLoading: false,
  error: null,

  fetchDashboardStats: async (token) => {
    set({ isLoading: true });
    try {
      const response = await DashboardService.getStatistics()

      console.log(response)
      set({ statistics: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchOrders: async (token) => {
    set({ isLoading: true });
    try {
      const response = await DashboardService.getOrders()
      set({ orders: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  }
}));

export default useDashboardStore;