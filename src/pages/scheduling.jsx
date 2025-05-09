import { useState, useEffect } from "react";
import DataTable from "../components/ui/DataTable";
import { useTranslation } from "react-i18next";
import { Search, Filter, Calendar, User, CheckCircle, Clock, Euro, Building, Home } from "lucide-react";

const Scheduling = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [serviceType, setServiceType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [status, setStatus] = useState("");
  const [scheduleType, setScheduleType] = useState("");
  const [kitchenType, setKitchenType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useTranslation();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Only set orders that have 'Paid' payment_status
      const paidOrders = data.filter(order => order.payment_status === 'Paid');
      setOrders(paidOrders);
      setFilteredOrders(paidOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...orders];

    if (serviceType) filtered = filtered.filter((o) => o.service_type === serviceType);
    if (paymentStatus) filtered = filtered.filter((o) => o.payment_status === paymentStatus);
    if (status) filtered = filtered.filter((o) => o.status === status);
    if (scheduleType) filtered = filtered.filter((o) => o.schedule_type === scheduleType);
    if (kitchenType) filtered = filtered.filter((o) => o.kitchen_type === kitchenType);

    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((order) =>
        JSON.stringify(order).toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredOrders(filtered);
  }, [serviceType, paymentStatus, status, scheduleType, kitchenType, searchTerm, orders]);

  const resetFilters = () => {
    setServiceType("");
    setPaymentStatus("");
    setStatus("");
    setScheduleType("");
    setKitchenType("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In progress": return "bg-blue-100 text-blue-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      case "Not done": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const columns = [
    {
      header: "Client",
      accessor: "client",
      render: (order) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 text-indigo-500">
            <User size={16} />
          </div>
          <span className="font-medium">
            {typeof order.client === "object"
              ? order.client.name || order.client.email || "N/A"
              : order.client}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (order) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      ),
    },
    {
      header: "Payment Status",
      accessor: "payment_status",
      render: (order) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            order.payment_status === "Paid"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {order.payment_status}
        </span>
      ),
    },
    {
      header: "Total Cost",
      accessor: "total_cost",
      render: (order) => (
        <div className="flex items-center">
          <Euro size={16} className="mr-1 text-gray-500" />
          <span className="font-medium">€{order.total_cost?.toLocaleString()}</span>
        </div>
      ),
    },
    {
      header: "Created At",
      accessor: "created_at",
      render: (order) => (
        <div className="flex items-center">
          <Calendar size={16} className="mr-2 text-gray-500" />
          <span>
            {new Date(order.created_at).toLocaleString("en-NG", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
              Schedules
            </h1>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter size={18} className="mr-2" />
                Filters {isFilterOpen ? "▲" : "▼"}
              </button>
              
              <button 
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Search by client name, email, or any other detail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Dropdown Filters */}
          {isFilterOpen && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {serviceType === "business" ? (
                        <Building size={16} className="text-gray-500" />
                      ) : (
                        <Home size={16} className="text-gray-500" />
                      )}
                    </div>
                    <select 
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                      value={serviceType} 
                      onChange={(e) => setServiceType(e.target.value)}
                    >
                      <option value="">All Service Types</option>
                      <option value="personal">Personal</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Euro size={16} className="text-gray-500" />
                    </div>
                    <select 
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                      value={paymentStatus} 
                      onChange={(e) => setPaymentStatus(e.target.value)}
                    >
                      <option value="">All Payment Status</option>
                      <option value="Paid">Paid</option>
                      <option value="Not Paid">Not Paid</option>
                    </select>
                  </div>
                </div>

                {/* Remaining filters... */}
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">
                Showing {filteredOrders.length} of {orders.length} requests
              </div>
            </div>
            <DataTable 
              data={filteredOrders} 
              columns={columns} 
              title="All Schedules" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
