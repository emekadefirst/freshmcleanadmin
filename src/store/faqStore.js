import { create } from 'zustand';
import { faqService } from '../services/faqService';

export const useFaqStore = create((set, get) => ({
  faqs: [],
  loading: false,
  error: null,
  initialized: false,

  fetchFaqs: async (force = false) => {
    const { initialized, faqs } = get();
    if (initialized && faqs.length > 0 && !force) {
      return;
    }
    
    set({ loading: true, error: null });
    try {
      const data = await faqService.getAll();
      set({ faqs: data, loading: false, initialized: true });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createFaq: async (faqData) => {
    try {
      const newFaq = await faqService.create(faqData);
      set(state => ({ faqs: [...state.faqs, newFaq] }));
      return newFaq;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateFaq: async (id, faqData) => {
    try {
      const updatedFaq = await faqService.update(id, faqData);
      set(state => ({
        faqs: state.faqs.map(faq => faq.id === id ? updatedFaq : faq)
      }));
      return updatedFaq;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteFaq: async (id) => {
    try {
      await faqService.delete(id);
      set(state => ({
        faqs: state.faqs.filter(faq => faq.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  }
}));