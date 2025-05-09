import { useState, useEffect } from 'react';
import { CircleCheck, CircleX, ExternalLink, Loader2, Search, Filter } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CleanerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Pending');

  const { t } = useTranslation();
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${api}/kyc/`);
      const apps = response.data;

      const userResponse = await axios.get(`${api}/auth/users`);
      const userMap = {};
      for (const user of userResponse.data) {
        userMap[user.id] = user;
      }

      setUsers(userMap);
      setApplications(apps);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications or users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setButtonLoading(id);
    try {
      const response = await axios.patch(`${api}/kyc/${id}`, { status: "Valid" });
  
      if (response.status === 200) {
        toast.success("Approved successfully, User is now a cleaner");
        window.location.reload()
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error approving application:", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "An error occurred while updating the status.";
      toast.error(message);
    } finally {
      setButtonLoading(null);
    }
  };
  

  const handleDisapprove = async (id) => {
    setButtonLoading(id);
    try {
      const response = await axios.patch(`${api}/kyc/${id}`, { status: "Failed" });
  
      if (response.status === 200) {
        toast.success("Application disapproved successfully!");
        window.location.reload()
        setApplications(prev => 
          prev.map(app => app._id === id ? { ...app, status: 'Failed' } : app)
        );
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error disapproving application:", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "An error occurred while updating the status.";
      toast.error(message);
    } finally {
      setButtonLoading(null);
    }
  };
  
  const filteredApplications = applications
    .filter(app => app.status === selectedStatus)
    .filter(app => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        app.fullname.toLowerCase().includes(term) ||
        (users[app.user_id]?.username?.toLowerCase().includes(term))
      );
    });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      Valid: 'bg-green-100 text-green-800 border-green-300',
      Failed: 'bg-red-100 text-red-800 border-red-300'
    };
    return (
      <span className={`px-3 py-1 text-sm border rounded-full font-medium ${styles[status] || 'bg-gray-100 text-gray-700 border-gray-300'}`}>{status}</span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{t('cleanerApplicationTitle') || "Cleaner Applications"}</h1>
          <p className="text-gray-500 mt-1">Review and manage cleaner applications</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex gap-2">
            {['Pending', 'Valid', 'Failed'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-md font-medium ${selectedStatus === status ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by name or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white p-6 rounded-lg shadow flex justify-center items-center">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
            <Filter className="mx-auto mb-4 w-8 h-8" />
            <p>No {selectedStatus.toLowerCase()} applications found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">Date Applied</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">Documents</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApplications.map(app => (
                  <tr key={app._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{app.fullname}</div>
                      <div className="text-sm text-gray-500">@{users[app.user_id]?.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <a href={app.id_proof} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">ID <ExternalLink className="inline h-4 w-4 ml-1" /></a>
                      <a href={app.work_authorization} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">Auth <ExternalLink className="inline h-4 w-4 ml-1" /></a>
                      <a href={app.resume} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">Resume <ExternalLink className="inline h-4 w-4 ml-1" /></a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleApprove(app.id)}
                        disabled={buttonLoading === app.id}
                        className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-sm font-medium"
                      >
                        {buttonLoading === app._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CircleCheck className="h-4 w-4 mr-1" />} Approve
                      </button>
                      <button
                        onClick={() => handleDisapprove(app.id)}
                        disabled={buttonLoading === app._id}
                        className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium"
                      >
                        {buttonLoading === app.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CircleX className="h-4 w-4 mr-1" />} Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CleanerApplications;
