import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  login: async (formData) => {
    try {
      // Step 1: Authenticate user
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      const { access_token, refresh_token } = response.data;

      if (!access_token) {
        throw new Error("Access token not provided");
      }

      // Step 2: Check user permissions
      const userRes = await axios.get(`${API_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const user = userRes.data;

      if (!user.is_admin) {
        throw new Error("You do not have admin privileges.");
      }

      // Step 3: Store the tokens in localStorage if the user is an admin
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Attach token to axios for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      return { access_token, refresh_token, user };
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      console.log('🔍 Checking for refresh token in localStorage...');
      const refresh = localStorage.getItem('refresh_token');
      if (!refresh) {
        console.error('❌ No refresh token found in localStorage');
        throw new Error('No refresh token available');
      }
      console.log('✅ Refresh token found, proceeding with refresh...');

      // Remove auth header temporarily to avoid interceptor loops
      console.log('🔧 Temporarily removing Authorization header...');
      const originalAuth = axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['Authorization'];

      console.log('📡 Making refresh token API call...');
      const response = await axios.post(`${API_URL}/auth/refresh-token`, {
        token: refresh
      });
      console.log('Refresh token API call successful');

      const { access_token, refresh_token } = response.data;
      
      if (!access_token) {
        console.error('No access token in refresh response');
        throw new Error('No access token in refresh response');
      }
      
      console.log('💾 Updating tokens in localStorage...');
      // Update stored token
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      console.log('✅ Tokens updated successfully');

      return access_token;
    } catch (error) {
      console.error('❌ Refresh token process failed:', error);
      console.log('🧹 Clearing tokens due to refresh failure...');
      // If refresh fails, clear tokens
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      delete axios.defaults.headers.common['Authorization'];
      throw error;
    }
  },

  signup: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/createAdmin`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};