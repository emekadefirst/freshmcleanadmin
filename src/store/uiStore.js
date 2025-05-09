import { create } from 'zustand'

export const useUIStore = create((set) => ({
  // UI state
  isLoading: false,
  error: null,

  // UI actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}))