import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ArrowUpDown, Loader2, FileText, Filter, X, Calendar, 
  CheckCircle, XCircle, Clock, AlertCircle, CreditCard 
} from 'lucide-react';

// API URL from environment variables
const api = import.meta.env.VITE_API_URL;

// Status badge configuration
const statusConfig = {
  completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  failed: { color: 'bg-red-100 text-red-800', icon: XCircle },
  refunded: { color: 'bg-blue-100 text-blue-800', icon: CreditCard },
  cancelled: { color: 'bg-gray-100 text-gray-800', icon: X },
  default: { color: 'bg-purple-100 text-purple-800', icon: AlertCircle }
};

export default function PaymentManagement() {
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'created_at',
    direction: 'desc'
  });
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const navigate = useNavigate();

  // Fetch payments from API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${api}/payments/`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setPayments(data);
        setFilteredPayments(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching payments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Handle search and filters
  useEffect(() => {
    let filtered = [...payments];
    
    // Apply search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(payment => 
        (payment.id && payment.id.toLowerCase().includes(query)) ||
        (payment.payment_id && payment.payment_id.toLowerCase().includes(query)) ||
        (payment.booking_id && payment.booking_id.toLowerCase().includes(query)) ||
        (payment.status && payment.status.toLowerCase().includes(query)) ||
        (payment.gateway && payment.gateway.toLowerCase().includes(query)) ||
        (payment.amount && payment.amount.toString().includes(query))
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }
    
    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(payment => {
        if (!payment.created_at) return false;
        const paymentDate = new Date(payment.created_at);
        return paymentDate.toDateString() === filterDate.toDateString();
      });
    }
    
    setFilteredPayments(filtered);
    setCurrentPage(1); // Reset to first page when filters change
    
  }, [searchQuery, statusFilter, dateFilter, payments]);

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    setFilteredPayments(prev => {
      const sorted = [...prev].sort((a, b) => {
        // Handle null values
        if (a[key] === null) return direction === 'asc' ? -1 : 1;
        if (b[key] === null) return direction === 'asc' ? 1 : -1;
        
        // Sort by type
        if (typeof a[key] === 'string') {
          return direction === 'asc' 
            ? a[key].localeCompare(b[key])
            : b[key].localeCompare(a[key]);
        } else {
          return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
        }
      });
      return sorted;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setDateFilter('');
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Handle row click and navigate to the cleaning detail page with booking_id
  const handleRowClick = (payment) => {
    const bookingId = payment.booking_id;
    if (bookingId) {
      navigate(`/cleaning-detail/${bookingId}`);
    } else {
      console.error("Booking ID is undefined or null", payment);
    }
  };
  
  // Get unique status values for filter dropdown
  const uniqueStatuses = [...new Set(payments.map(payment => payment.status))].filter(Boolean);
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Get status badge details
  const getStatusBadge = (status) => {
    if (!status) return statusConfig.default;
    const lowerStatus = status.toLowerCase();
    return statusConfig[lowerStatus] || statusConfig.default;
  };
  
  // Export to CSV functionality (placeholder)
  const exportToCSV = () => {
    alert('Export functionality would be implemented here!');
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header with stats */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Payment Management</h1>
              <p className="mt-1 text-gray-500">Manage and track all transaction records</p>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="text-xl font-bold">{payments.filter(p => p.status && p.status.toLowerCase() === 'completed').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 mr-4">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending</p>
                  <p className="text-xl font-bold">{payments.filter(p => p.status && p.status.toLowerCase() === 'pending').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 mr-4">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Failed</p>
                  <p className="text-xl font-bold">{payments.filter(p => p.status && p.status.toLowerCase() === 'failed').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Amount</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(payments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search & filters */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="relative flex-1 mb-4 md:mb-0 md:mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by ID, amount, status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-md border ${filtersVisible ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-white border-gray-300 text-gray-700'} flex items-center`}
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {Object.values([statusFilter, dateFilter]).some(Boolean) && <span className="ml-1 w-2 h-2 bg-blue-600 rounded-full"></span>}
              </button>
              
              {(statusFilter || dateFilter || searchQuery) && (
                <button
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 flex items-center hover:bg-gray-50"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </button>
              )}
            </div>
          </div>
          
          {filtersVisible && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Payments table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-2" />
              <p className="text-gray-500">Loading payment data...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load payments</h3>
              <p className="text-gray-500 mb-4">{error}</p>
              <button 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('id')}
                      >
                        <div className="flex items-center">
                          ID
                          <ArrowUpDown className="inline-block ml-1 h-4 w-4" />
                          {sortConfig.key === 'id' && (
                            <span className="ml-1 text-blue-600">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('id')}
                      >
                        <div className="flex items-center">
                           Booking ID
                          <ArrowUpDown className="inline-block ml-1 h-4 w-4" />
                          {sortConfig.key === 'id' && (
                            <span className="ml-1 text-blue-600">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('booking_id')}
                      >
                        <div className="flex items-center">
                        Payment ID
                          <ArrowUpDown className="inline-block ml-1 h-4 w-4" />
                          {sortConfig.key === 'booking_id' && (
                            <span className="ml-1 text-blue-600">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('amount')}
                      >
                        <div className="flex items-center">
                          Amount
                          <ArrowUpDown className="inline-block ml-1 h-4 w-4" />
                          {sortConfig.key === 'amount' && (
                            <span className="ml-1 text-blue-600">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('created_at')}
                      >
                        <div className="flex items-center">
                          Date
                          <ArrowUpDown className="inline-block ml-1 h-4 w-4" />
                          {sortConfig.key === 'created_at' && (
                            <span className="ml-1 text-blue-600">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center">
                          Status
                          <ArrowUpDown className="inline-block ml-1 h-4 w-4" />
                          {sortConfig.key === 'status' && (
                            <span className="ml-1 text-blue-600">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.length > 0 ? (
                      currentItems.map((payment) => {
                        const StatusIcon = getStatusBadge(payment.status).icon;
                        return (
                          <tr
                            key={payment.id}
                            className="hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                            onClick={() => handleRowClick(payment)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {payment.id ? payment.id.slice(0, 8) + '...' : 'N/A'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{payment.booking_id || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{payment.payment_id || 'N/A'}</div>
                              <div className="text-xs text-gray-500">
                                {payment.gateway || 'Unknown gateway'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{formatDate(payment.created_at)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(payment.status).color}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {payment.status || 'Unknown'}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                            <h3 className="text-sm font-medium text-gray-900">No payments found</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              No payments match your search criteria. Try adjusting your filters.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {filteredPayments.length > itemsPerPage && (
                <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredPayments.length)} of {filteredPayments.length} payments
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Previous
                    </button>
                    
                    {[...Array(Math.min(5, totalPages)).keys()].map(i => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={i}
                          onClick={() => paginate(pageNum)}
                          className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    {totalPages > 5 && (
                      <span className="px-2 py-1">...</span>
                    )}
                    
                    {totalPages > 5 && (
                      <button
                        onClick={() => paginate(totalPages)}
                        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {totalPages}
                      </button>
                    )}
                    
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}