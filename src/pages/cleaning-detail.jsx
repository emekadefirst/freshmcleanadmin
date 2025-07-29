import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, DollarSign, Home, MapPin, User, Clipboard, AlertCircle, UserPlus, Search } from 'lucide-react';
import { bookingService } from '../services/bookingService';
import { userService } from '../services/userService';
import { toast } from 'react-toastify';
import { updateBookingStatus } from '../services/booking-status';

export default function CleaningDetail() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cleaners, setCleaners] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCleaner, setSelectedCleaner] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (!id) {
          throw new Error('Booking ID is missing');
        }
        
        const [bookingData, cleanersData] = await Promise.all([
          bookingService.getById(id),
          userService.getCleaners()
        ]);
        
        setBooking(bookingData);
        setCleaners(cleanersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to get day name
  const getDayName = (day) => {
    const days = {
      "MON": "Monday",
      "TUE": "Tuesday",
      "WED": "Wednesday",
      "THU": "Thursday",
      "FRI": "Friday",
      "SAT": "Saturday",
      "SUN": "Sunday"
    };
    return days[day] || day;
  };

  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  // Handle assign cleaner
  const handleAssignCleaner = async () => {
    if (!selectedCleaner) {
      toast.error('Please select a cleaner');
      return;
    }

    setAssigning(true);
    try {
      const updatedBooking = await bookingService.assignCleaner(id, selectedCleaner);
      setBooking(updatedBooking);
      setShowAssignModal(false);
      setSelectedCleaner('');
      setSearchQuery('');
      toast.success('Cleaner assigned successfully');
    } catch (error) {
      toast.error('Failed to assign cleaner');
      console.error('Assignment error:', error);
    } finally {
      setAssigning(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      const response = await updateBookingStatus(id, newStatus);
      if (response.status === 200 || response.ok) {
        // Reload the booking data
        const updatedBooking = await bookingService.getById(id);
        setBooking(updatedBooking);
        toast.success('Status updated successfully');
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Failed to update status');
      console.error('Status update error:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Filter cleaners based on search
  const filteredCleaners = cleaners.filter(cleaner =>
    `${cleaner.first_name} ${cleaner.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cleaner.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <AlertCircle className="text-red-500 w-12 h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Error</h1>
          <p className="text-center text-gray-600">{error}</p>
          <button 
            className="mt-6 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <AlertCircle className="text-yellow-500 w-12 h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">No Booking Found</h1>
          <p className="text-center text-gray-600">The requested booking could not be found.</p>
          <button 
            className="mt-6 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleBack}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-800 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Booking Details</h1>
                <p className="text-blue-100">ID: {booking.id}</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  booking.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                  booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {booking.status}
                </span>
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusUpdate(e.target.value)}
                  disabled={updatingStatus}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                >
                  <option value="Not done">Not done</option>
                  <option value="In progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {updatingStatus && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Client Information */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-500" />
                  Client Information
                </h2>
                {!booking.cleaner && (
                  <button
                    onClick={() => setShowAssignModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Assign Cleaner</span>
                  </button>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Client Name</p>
                    <p className="font-medium text-gray-800">{booking.client}</p>
                  </div>
                  {booking.cleaner ? (
                    <div>
                      <p className="text-sm text-gray-500">Assigned Cleaner</p>
                      <p className="font-medium text-gray-800">{booking.cleaner}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500">Assigned Cleaner</p>
                      <p className="font-medium text-orange-600">Not assigned yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Clipboard className="w-5 h-5 mr-2 text-blue-500" />
                Booking Details
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Service Type</p>
                    <p className="font-medium text-gray-800 capitalize">{booking.service_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Kitchen Type</p>
                    <p className="font-medium text-gray-800">{booking.kitchen_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Number of Rooms</p>
                    <p className="font-medium text-gray-800">{booking.number_of_room}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Number of Bathrooms</p>
                    <p className="font-medium text-gray-800">{booking.number_of_bathroom}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Number of Days</p>
                    <p className="font-medium text-gray-800">{booking.number_of_day}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created At</p>
                    <p className="font-medium text-gray-800">{formatDate(booking.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Schedule Information
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                {booking.schedule_dates && booking.schedule_dates.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Scheduled Dates</p>
                    <div className="flex flex-wrap gap-2">
                      {booking.schedule_dates.map((date, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {formatDate(date)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {booking.schedule_days && booking.schedule_days.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Weekly Schedule</p>
                    <div className="flex flex-wrap gap-2">
                      {booking.schedule_days.map((day, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {getDayName(day)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {(!booking.schedule_dates || booking.schedule_dates.length === 0) && 
                 (!booking.schedule_days || booking.schedule_days.length === 0) && (
                  <p className="text-gray-500">No schedule information available</p>
                )}
              </div>
            </div>

            {/* Location Information */}
            {(booking.latitude !== "string" || booking.logitude !== "string") && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  Location
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Latitude</p>
                      <p className="font-medium text-gray-800">{booking.latitude}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Longitude</p>
                      <p className="font-medium text-gray-800">{booking.logitude}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
                Payment Information
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Cost</p>
                    <p className="font-medium text-gray-800">${booking.total_cost.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      booking.payment_status === 'Paid' ? 'bg-green-100 text-green-800' : 
                      booking.payment_status === 'Partially Paid' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.payment_status}
                    </span>
                  </div>
                  {booking.discount_code && (
                    <div>
                      <p className="text-sm text-gray-500">Discount Code</p>
                      <p className="font-medium text-gray-800">{booking.discount_code}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Last Updated: {formatDate(booking.updated_at)}
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  Edit
                </button>
                <button 
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                  onClick={handleBack}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Assign Cleaner Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Assign Cleaner</h2>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedCleaner('');
                    setSearchQuery('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <AlertCircle className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Cleaners
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Cleaner
                  </label>
                  <select
                    value={selectedCleaner}
                    onChange={(e) => setSelectedCleaner(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Choose a cleaner...</option>
                    {filteredCleaners.map((cleaner) => (
                      <option key={cleaner.id} value={cleaner.id}>
                        {cleaner.first_name} {cleaner.last_name} - {cleaner.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={handleAssignCleaner}
                  disabled={assigning || !selectedCleaner}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {assigning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Assigning...
                    </>
                  ) : (
                    'Assign Cleaner'
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedCleaner('');
                    setSearchQuery('');
                  }}
                  disabled={assigning}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}