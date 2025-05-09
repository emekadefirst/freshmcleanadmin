import { create } from 'zustand'

// Create a store for global state management
export const useStore = create((set) => ({
  // Authentication state
  isAuthenticated: false,
  user: null,
  
  // Authentication actions
  setAuth: (isAuth) => set({ isAuthenticated: isAuth }),
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),

  // UI state
  isLoading: false,
  error: null,

  // UI actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}))