import { create } from 'zustand';
import { blogService } from '../services/blogService';

export const useBlogStore = create((set, get) => ({
  blogs: [],
  loading: false,
  error: null,
  initialized: false,

  fetchBlogs: async (force = false) => {
    const { initialized, blogs } = get();
    if (initialized && blogs.length > 0 && !force) {
      return;
    }
    
    set({ loading: true, error: null });
    try {
      const data = await blogService.getAll();
      set({ blogs: data, loading: false, initialized: true });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createBlog: async (blogData) => {
    try {
      const newBlog = await blogService.create(blogData);
      set(state => ({ blogs: [...state.blogs, newBlog] }));
      return newBlog;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateBlog: async (id, blogData) => {
    try {
      const updatedBlog = await blogService.update(id, blogData);
      set(state => ({
        blogs: state.blogs.map(blog => blog.id === id ? updatedBlog : blog)
      }));
      return updatedBlog;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      await blogService.delete(id);
      set(state => ({
        blogs: state.blogs.filter(blog => blog.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  }
}));