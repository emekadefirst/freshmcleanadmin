import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('access_token'),
  user: null,
  loading: false,
  error: null,
  
  setAuth: (isAuth) => set({ isAuthenticated: isAuth }),
  setUser: (userData) => set({ user: userData }),
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ isAuthenticated: false, user: null });
  },
  setLoading: (isLoading) => set({ loading: isLoading }),
  setError: (error) => set({ error: error }),
}));
