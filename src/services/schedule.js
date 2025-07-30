import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchSchedule() {
  try {
    const response = await axios.get(`${API_URL}/bookings`);

    const filtered = response.data.filter(
      booking => booking.payment_status === "Paid" && booking.status === "Not done"
    );

    return filtered;
  } catch (error) {
    return [];
  }
}



