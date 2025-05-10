import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";
import { useTranslation } from 'react-i18next';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const api = import.meta.env.VITE_API_BASE_URL;
  const { t } = useTranslation();

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  // In fetchUserDetails, ensure proper initialization
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/auth/users/${id}`);
      const userData = response.data;
      // Ensure boolean fields have proper default values
      setUser({
        ...userData,
        is_admin: userData.is_admin || false,
        is_cleaner: userData.is_cleaner || false,
        is_verified: userData.is_verified || false
      });
      setEditedUser({
        ...userData,
        is_admin: userData.is_admin || false,
        is_cleaner: userData.is_cleaner || false,
        is_verified: userData.is_verified || false
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to load user details");
      if (error.response && error.response.status === 404) {
        toast.error("User not found");
        setTimeout(() => navigate("/users"), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  // Simplified handleInputChange
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Changing ${name} to`, type === "checkbox" ? checked : value);
    setEditedUser(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        is_admin: Boolean(editedUser.is_admin),
        first_name: editedUser.first_name || null,
        last_name: editedUser.last_name || null,  // or lastname if that's what your backend expects
        username: editedUser.username || null,
        email: editedUser.email || null,
        is_cleaner: Boolean(editedUser.is_cleaner),
        is_verified: Boolean(editedUser.is_verified)
      };
  
      console.log('Sending payload:', payload); // For debugging
  
      const response = await axios.patch(`${api}/auth/users/admin/${id}`, payload);
      
      if (response.data) {
        setUser(response.data);
        setEditedUser(response.data);
        toast.success("User updated successfully");
      } else {
        throw new Error("No data returned from server");
      }
      
      setEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.detail || error.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };
  const handleCancel = () => {
    setEditedUser(user);
    setEditing(false);
  };

  const getUserRoleLabel = (user) => {
    if (user.is_admin) return "Admin";
    if (user.is_cleaner) return "Cleaner";
    return "Customer";
  };

  const getUserRoleBadgeColor = (user) => {
    if (user.is_admin) return "bg-indigo-100 text-indigo-800";
    if (user.is_cleaner) return "bg-blue-100 text-blue-800";
    return "bg-emerald-100 text-emerald-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ThreeDots color="#4F46E5" height={50} width={50} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-700">User not found</h2>
        <p className="text-gray-500 mt-2">The requested user does not exist or you don't have permission to view it.</p>
        <button
          onClick={() => navigate("/users")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition shadow-sm"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Details</h1>
            <p className="text-gray-500">View and manage user information</p>
          </div>
          <button
            onClick={() => navigate("/user-management")}
            className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition flex items-center border border-gray-300 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Users
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {`${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username || "User"}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2 justify-center md:justify-start">
                    <span className={`px-3 py-1 text-xs rounded-full ${getUserRoleBadgeColor(user)}`}>
                      {getUserRoleLabel(user)}
                    </span>
                    <span className={`px-3 py-1 text-xs rounded-full ${user.is_verified ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                      {user.is_verified ? "Verified" : "Not Verified"}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      ID: {user.id}
                    </span>
                  </div>
                </div>
              </div>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition shadow-sm flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit User
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition shadow-sm flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={saving}
                  >
                    {saving ? (
                      <ThreeDots color="#fff" height={20} width={20} />
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Save
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              {editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={editedUser.username || ""}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editedUser.email || ""}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={editedUser.first_name || ""}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={editedUser.last_name || ""}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">User Permissions</h3>
                      <div className="space-y-3">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="is_admin"
                            checked={editedUser.is_admin ?? false} // Fallback to false if null
                            onChange={handleInputChange}
                            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-3 text-gray-700">Administrator Access</span>
                          <span className="ml-2 text-xs py-0.5 px-2 bg-indigo-100 text-indigo-800 rounded-full">Grants full system access</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-6">User Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Username</div>
                      <div className="mt-1 text-base text-gray-900 font-medium">{user.username || "-"}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Email</div>
                      <div className="mt-1 text-base text-gray-900 font-medium">{user.email || "-"}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">First Name</div>
                      <div className="mt-1 text-base text-gray-900 font-medium">{user.first_name || "-"}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Last Name</div>
                      <div className="mt-1 text-base text-gray-900 font-medium">{user.last_name || "-"}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Role</div>
                      <div className="mt-1">
                        <span className={`inline-flex px-3 py-1 text-xs rounded-full ${getUserRoleBadgeColor(user)}`}>
                          {getUserRoleLabel(user)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Verification Status</div>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-3 py-1 text-xs rounded-full ${user.is_verified ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                          {user.is_verified ? (
                            <>
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              Not Verified
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;