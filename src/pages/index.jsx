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
  const apiUrl = "https://artificial-cherianne-emekadefirst-4fe958c5.koyeb.app";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingRes = await axios.get(`${apiUrl}/bookings/`);
        console.log(bookingRes);
        const bookingData = bookingRes.data || [];

        const usersRes = await axios.get(`${apiUrl}/auth/users/`);
        const usersData = usersRes.data || [];
        console.log(usersData);
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-gray-600">Total Users</h2>
          <p className="text-xl font-semibold">{metrics.totalUsers}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-gray-600">Total Requests</h2>
          <p className="text-xl font-semibold">{metrics.totalRequests}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-gray-600">Scheduled Jobs</h2>
          <p className="text-xl font-semibold">{metrics.scheduledJobs}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-gray-600">Completed Jobs</h2>
          <p className="text-xl font-semibold">{metrics.completedJobs}</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">All Bookings</h2>
        <div className="overflow-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3 font-semibold border-b">Service</th>

                <th className="px-5 py-3 font-semibold border-b">Schedule Date</th>
                <th className="px-5 py-3 font-semibold border-b">Payment</th>
                <th className="px-5 py-3 font-semibold border-b">Status</th>
                <th className="px-5 py-3 font-semibold border-b">Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">{booking.service_type}</td>
                  <td className="px-5 py-3">
                    {booking.schedule_dates.length > 0 ? booking.schedule_dates[0] : "N/A"}
                  </td>
                  <td className={`px-5 py-3 font-medium ${booking.payment_status === "Paid" ? "text-green-600" : "text-red-500"}`}>
                    {booking.payment_status}
                  </td>
                  <td className={`px-5 py-3 capitalize ${booking.status === "Completed" ? "text-green-700" : "text-yellow-600"}`}>
                    {booking.status}
                  </td>
                  <td className="px-5 py-3">{booking.address}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">No bookings found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
