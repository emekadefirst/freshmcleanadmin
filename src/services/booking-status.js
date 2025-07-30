import apiClient from './axiosConfig';

export async function updateBookingStatus(id, status) {
  const response = await apiClient.patch(`/bookings/${id}`, { status });
  return response.status;
}
