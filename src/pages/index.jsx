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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-300 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalUsers}</p>
              <p className="text-sm text-blue-600 mt-1">Active accounts</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-300 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">New Requests</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalRequests}</p>
              <p className="text-sm text-orange-600 mt-1">Pending payment</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-300 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Scheduled Jobs</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.scheduledJobs}</p>
              <p className="text-sm text-purple-600 mt-1">Ready to start</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-300 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Completed Jobs</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.completedJobs}</p>
              <p className="text-sm text-green-600 mt-1">Successfully done</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
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
