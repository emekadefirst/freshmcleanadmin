import { create } from 'zustand';
import { categoryService } from '../services/categoryService';

export const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,
  error: null,
  initialized: false,

  fetchCategories: async (force = false) => {
    const { initialized, categories } = get();
    if (initialized && categories.length > 0 && !force) {
      return;
    }
    
    set({ loading: true, error: null });
    try {
      const data = await categoryService.getAll();
      set({ categories: data, loading: false, initialized: true });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createCategory: async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      set(state => ({ categories: [...state.categories, newCategory] }));
      return newCategory;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const updatedCategory = await categoryService.update(id, categoryData);
      set(state => ({
        categories: state.categories.map(category => category.id === id ? updatedCategory : category)
      }));
      return updatedCategory;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      await categoryService.delete(id);
      set(state => ({
        categories: state.categories.filter(category => category.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  }
}));