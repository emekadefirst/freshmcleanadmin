import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalRequests: 0,
    scheduledJobs: 0,
    completedJobs: 0,
  });

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  console.log("API URL:", apiUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingRes, usersRes] = await Promise.all([
          axios.get(`${apiUrl}/bookings/`),
          axios.get(`${apiUrl}/auth/users`)
        ]);

        const bookingData = bookingRes.data || [];
        const usersData = usersRes.data || [];

        console.log("Bookings:", bookingData);
        console.log("Users:", usersData);

        const totalUsers = usersData.length;
        const totalRequests = bookingData.filter(b => b.payment_status === "Not Paid").length;
        const scheduledJobs = bookingData.filter(b => b.payment_status === "Paid" && b.status === "Not done").length;
        const completedJobs = bookingData.filter(b => b.payment_status === "Paid" && b.status === "Completed").length;

        setBookings(bookingData);
        setUsers(usersData);
        setMetrics({
          totalUsers,
          totalRequests,
          scheduledJobs,
          completedJobs,
        });

        console.log("Metrics set:", {
          totalUsers,
          totalRequests,
          scheduledJobs,
          completedJobs,
        });
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };

    if (apiUrl) {
      fetchData();
    } else {
      console.error("API base URL is not defined.");
    }
  }, [apiUrl]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-blue-800">Total Users</h3>
          <p className="text-xl font-bold">{metrics.totalUsers}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-yellow-800">Requests</h3>
          <p className="text-xl font-bold">{metrics.totalRequests}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-purple-800">Scheduled</h3>
          <p className="text-xl font-bold">{metrics.scheduledJobs}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-green-800">Completed</h3>
          <p className="text-xl font-bold">{metrics.completedJobs}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-sm font-bold uppercase border-b">Service</th>
              <th className="px-6 py-3 text-sm font-bold uppercase border-b">Schedule Date</th>
              <th className="px-6 py-3 text-sm font-bold uppercase border-b">Payment</th>
              <th className="px-6 py-3 text-sm font-bold uppercase border-b">Status</th>
              <th className="px-6 py-3 text-sm font-bold uppercase border-b">Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking, index) => (
              <tr
                key={booking.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-3">{booking.service_type}</td>
                <td className="px-6 py-3">
                  {booking.schedule_dates.length > 0 ? booking.schedule_dates[0] : "N/A"}
                </td>
                <td className={`px-6 py-3 font-medium ${booking.payment_status === "Paid" ? "text-green-600" : "text-red-500"}`}>
                  {booking.payment_status}
                </td>
                <td className={`px-6 py-3 capitalize ${booking.status === "Completed" ? "text-green-700" : "text-yellow-600"}`}>
                  {booking.status}
                </td>
                <td className="px-6 py-3">{booking.address}</td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
