import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import MiniLoader from '../components/preloader/mini-preloader';
import { useTranslation } from 'react-i18next';

const AccountManagement = () => {
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    is_cleaner: false,
    is_admin: false,
    is_verified: false,
    created_at: "",
    updated_at: "",
  });
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const api = "https://artificial-cherianne-emekadefirst-4fe958c5.koyeb.app";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Fetch user data (first_name, last_name, email, username) using access_token
  const fetchUserData = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      try {
        const response = await axios.get(`${api}/auth/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const user = response.data;
   
        setFormData({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          username: user.username,
          is_cleaner: user.is_cleaner,
          is_admin: user.is_admin,
          is_verified: user.is_verified,
          created_at: user.created_at,
          updated_at: user.updated_at,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };
  

  // Handle form data input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        const response = await axios.patch(`${api}/auth/users/admin/${formData.id}`, formData);
        if (response.status === 200) {
          toast.success("Profile updated successfully");
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.message || "Error updating profile. Please try again."
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ToastContainer />

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          {t("accountManagementTitle")}
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => changeLanguage("en")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${i18n.language === "en"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            English (EN)
          </button>
          <button
            onClick={() => changeLanguage("de")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${i18n.language === "de"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            German (DE)
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Personal Information</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-6 md:grid-cols-2">
            {/* Readonly ID field */}
            <div className="relative">
              <label htmlFor="id" className="block text-sm font-medium text-gray-600 mb-1">
                User ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                readOnly
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 focus:outline-none"
              />
              <div className="absolute right-3 top-9 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* First Name */}
            <div className="relative">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your first name"
              />
              <div className="absolute right-3 top-9 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Last Name */}
            <div className="relative">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your last name"
              />
              <div className="absolute right-3 top-9 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
              />
              <div className="absolute right-3 top-9 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Username */}
            <div className="relative">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
              />
              <div className="absolute right-3 top-9 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Account Status</h4>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Cleaner Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${formData.is_cleaner
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                    }`}>
                    {formData.is_cleaner ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Admin Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${formData.is_admin
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800'
                    }`}>
                    {formData.is_admin ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Verification</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${formData.is_verified
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {formData.is_verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">Created At</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(formData.created_at).toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">Last Updated</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {formData.updated_at ? new Date(formData.updated_at).toLocaleString() : 'Not updated yet'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-right">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <MiniLoader />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  {t("updateProfile")}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountManagement;