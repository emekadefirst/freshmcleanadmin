import { create } from 'zustand';
import { testimonyService } from '../services/testimonyService';

export const useTestimonyStore = create((set, get) => ({
  testimonies: [],
  loading: false,
  error: null,
  initialized: false,

  fetchTestimonies: async (force = false) => {
    const { initialized, testimonies } = get();
    if (initialized && testimonies.length > 0 && !force) {
      return;
    }
    
    set({ loading: true, error: null });
    try {
      const data = await testimonyService.getAll();
      set({ testimonies: data, loading: false, initialized: true });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteTestimony: async (id) => {
    try {
      await testimonyService.delete(id);
      set(state => ({
        testimonies: state.testimonies.filter(testimony => testimony.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  }
}));