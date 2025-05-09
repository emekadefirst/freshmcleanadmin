import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, DollarSign, Home, MapPin, User, Clipboard, AlertCircle } from 'lucide-react';

export default function CleaningDetail() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the ID from URL path parameters
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        
        if (!id) {
          throw new Error('Booking ID is missing');
        }
        
        const api = import.meta.env.VITE_API_URL;
        const response = await fetch(`${api}/bookings/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookingDetails();
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
    navigate(-1); // Go back to previous page
  };

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
              <div className="mt-4 md:mt-0">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'Done' ? 'bg-green-100 text-green-800' : 
                  booking.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Client Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Client Information
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Client Name</p>
                    <p className="font-medium text-gray-800">{booking.client}</p>
                  </div>
                  {booking.cleaner && (
                    <div>
                      <p className="text-sm text-gray-500">Assigned Cleaner</p>
                      <p className="font-medium text-gray-800">{booking.cleaner}</p>
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
      </div>
    </div>
  );
}