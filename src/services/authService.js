import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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

  signup: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/createAdmin`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
