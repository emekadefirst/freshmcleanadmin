import { create } from 'zustand';
import { subscriberService } from '../services/subscriberService';

export const useSubscriberStore = create((set, get) => ({
  subscribers: [],
  loading: false,
  error: null,
  initialized: false,

  fetchSubscribers: async (force = false) => {
    const { initialized } = get();
    if (initialized && !force) {
      return;
    }
    
    set({ loading: true, error: null });
    try {
      const data = await subscriberService.getAll();
      set({ subscribers: data, loading: false, initialized: true });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createSubscriber: async (subscriberData) => {
    try {
      const newSubscriber = await subscriberService.create(subscriberData);
      set(state => ({ subscribers: [...state.subscribers, newSubscriber] }));
      return newSubscriber;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteSubscriber: async (id) => {
    try {
      await subscriberService.delete(id);
      set(state => ({
        subscribers: state.subscribers.filter(subscriber => subscriber.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  }
}));