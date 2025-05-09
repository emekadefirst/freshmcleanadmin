import { useState, useEffect } from "react";
import { Bell, Calendar, CreditCard, DollarSign, Home, PieChart, Search, Settings, User, Users, Menu, X, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel with CORS mode and error handling
        const [usersRes, bookingsRes, paymentsRes] = await Promise.all([
          fetch(`${API_URL}/auth/users/`, { mode: "cors" }),
          fetch(`${API_URL}/bookings/`, { mode: "cors" }),
          fetch(`${API_URL}/payments/`, { mode: "cors" })
        ]);

        // Log status for debugging
        console.log("Users status:", usersRes.status);
        console.log("Bookings status:", bookingsRes.status);
        console.log("Payments status:", paymentsRes.status);

        // Check for errors in responses
        if (!usersRes.ok) throw new Error(`Error fetching users: ${usersRes.status}`);
        if (!bookingsRes.ok) throw new Error(`Error fetching bookings: ${bookingsRes.status}`);
        if (!paymentsRes.ok) throw new Error(`Error fetching payments: ${paymentsRes.status}`);

        // Parse JSON responses
        const usersData = await usersRes.json();
        const bookingsData = await bookingsRes.json();
        const paymentsData = await paymentsRes.json();

        // Update state with fetched data
        setUsers(usersData);
        setBookings(bookingsData);
        setPayments(paymentsData);
      } catch (err) {
        setError(err.message || "Network error");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  // Dashboard statistics
  const stats = {
    totalUsers: users.length,
    verifiedUsers: users.filter(user => user.is_verified).length,
    cleaners: users.filter(user => user.is_cleaner).length,
    totalBookings: bookings.length,
    pendingPayments: payments.filter(payment => payment.status === "open").length,
    totalRevenue: payments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)
  };

  // Helper function to format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}


      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header */}
        {/* Content Area */}
        <main className="p-6">
          {activeTab === "dashboard" && (
            <DashboardContent stats={stats} bookings={bookings} payments={payments} formatDate={formatDate} />
          )}
          {activeTab === "users" && (
            <UsersContent users={users} formatDate={formatDate} />
          )}
          {activeTab === "bookings" && (
            <BookingsContent bookings={bookings} formatDate={formatDate} />
          )}
          {activeTab === "payments" && (
            <PaymentsContent payments={payments} bookings={bookings} formatDate={formatDate} />
          )}
          {activeTab === "analytics" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Analytics</h2>
              <p className="text-gray-500">Analytics features coming soon...</p>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <p className="text-gray-500">Settings features coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`h-12 w-12 rounded-lg ${color} flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

const DashboardContent = ({ stats, bookings, payments, formatDate }) => {
  // Get recent bookings
  const recentBookings = [...bookings].sort((a, b) => 
    new Date(b.created_at) - new Date(a.created_at)
  ).slice(0, 5);

  // Get recent payments
  const recentPayments = [...payments].sort((a, b) => 
    new Date(b.created_at) - new Date(a.created_at)
  ).slice(0, 5);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<Users size={24} className="text-white" />} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Total Bookings" 
          value={stats.totalBookings} 
          icon={<Calendar size={24} className="text-white" />} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Pending Payments" 
          value={stats.pendingPayments} 
          icon={<CreditCard size={24} className="text-white" />} 
          color="bg-yellow-500" 
        />
        <StatCard 
          title="Total Revenue" 
          value={`£${stats.totalRevenue}`} 
          icon={<DollarSign size={24} className="text-white" />} 
          color="bg-purple-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-2">Client</th>
                  <th className="pb-2">Service</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(booking => (
                  <tr key={booking.id} className="border-t border-gray-100">
                    <td className="py-3">{booking.client}</td>
                    <td className="py-3 capitalize">{booking.service_type}</td>
                    <td className="py-3">{formatDate(booking.created_at)}</td>
                    <td className="py-3">${booking.total_cost}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === "Done" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentBookings.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">No bookings found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Payments</h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-2">Payment ID</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Gateway</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map(payment => (
                  <tr key={payment.id} className="border-t border-gray-100">
                    <td className="py-3 text-sm">{payment.payment_id.substring(0, 12)}...</td>
                    <td className="py-3">${payment.amount}</td>
                    <td className="py-3">{formatDate(payment.created_at)}</td>
                    <td className="py-3">{payment.gateway}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentPayments.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">No payments found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const UsersContent = ({ users, formatDate }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">Users</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-left text-gray-500 text-sm">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Username</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Verified</th>
            <th className="px-4 py-3">Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">
                    {user.first_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{user.first_name} {user.last_name}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.username}</td>
              <td className="px-4 py-3">
                {user.is_admin && <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs mr-1">Admin</span>}
                {user.is_cleaner && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Cleaner</span>}
                {!user.is_admin && !user.is_cleaner && <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">User</span>}
              </td>
              <td className="px-4 py-3">
                {user.is_verified ? (
                  <CheckCircle size={18} className="text-green-500" />
                ) : (
                  <AlertCircle size={18} className="text-yellow-500" />
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{formatDate(user.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const BookingsContent = ({ bookings, formatDate }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">Bookings</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-left text-gray-500 text-sm">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Service Type</th>
            <th className="px-4 py-3">Kitchen Type</th>
            <th className="px-4 py-3">Rooms</th>
            <th className="px-4 py-3">Bathrooms</th>
            <th className="px-4 py-3">Days</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Cost</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Payment</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{booking.id.substring(0, 8)}...</td>
              <td className="px-4 py-3">{booking.client}</td>
              <td className="px-4 py-3 capitalize">{booking.service_type}</td>
              <td className="px-4 py-3">{booking.kitchen_type}</td>
              <td className="px-4 py-3">{booking.number_of_room}</td>
              <td className="px-4 py-3">{booking.number_of_bathroom}</td>
              <td className="px-4 py-3">{booking.number_of_day}</td>
              <td className="px-4 py-3 text-sm">{formatDate(booking.created_at)}</td>
              <td className="px-4 py-3">${booking.total_cost}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  booking.status === "Done" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {booking.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  booking.payment_status === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {booking.payment_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PaymentsContent = ({ payments, bookings, formatDate }) => {
  // Map booking IDs to their details for reference
  const bookingMap = bookings.reduce((map, booking) => {
    map[booking.id] = booking;
    return map;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Payments</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500 text-sm">
              <th className="px-4 py-3">Payment ID</th>
              <th className="px-4 py-3">Booking ID</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Gateway</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => {
              const booking = bookingMap[payment.booking_id];
              return (
                <tr key={payment.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{payment.payment_id.substring(0, 12)}...</td>
                  <td className="px-4 py-3 text-sm">{payment.booking_id.substring(0, 8)}...</td>
                  <td className="px-4 py-3">{booking ? booking.client : 'Unknown'}</td>
                  <td className="px-4 py-3">{payment.gateway}</td>
                  <td className="px-4 py-3">${payment.amount}</td>
                  <td className="px-4 py-3 text-sm">{formatDate(payment.created_at)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading dashboard data...</p>
    </div>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
      <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Dashboard</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);