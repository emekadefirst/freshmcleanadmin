import { create } from 'zustand';
import DashboardService from '../services/dashboard.service';


const useDashboardStore = create((set) => ({
  // User State
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
  statistics: null,

  // Actions
  setUsers: (users) => set({ users }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setStatistics: (stats) => set({ statistics: stats }),
  // Fetch Users
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      set({ users: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  //fetch statistics
  fetchStatistics: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await DashboardService.getStatistics('/api/statistics');
      const data = await response.json();
      set({ statistics: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Add User
  addUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const newUser = await response.json();
      set((state) => ({
        users: [...state.users, newUser],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Update User
  updateUser: async (userId, userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const updatedUser = await response.json();
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? updatedUser : user
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Delete User
  deleteUser: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Reset Error
  resetError: () => set({ error: null }),

  // Reset Store
  resetStore: () => set({
    users: [],
    currentUser: null,
    isLoading: false,
    error: null,
  }),
}));

export default useDashboardStore;
