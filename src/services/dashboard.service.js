import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const DashboardService = {
  getStatistics: () =>
    axios.get(`${API_URL}/bookings`, {
      headers: getAuthHeaders()
    }),

  getOrders: () =>
    axios.get(`${API_URL}/bookings/`, {
      headers: getAuthHeaders()
    }),
};

export default DashboardService;
