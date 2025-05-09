import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/ui/pagination";
import DataTable from "../components/ui/DataTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";
import { useTranslation } from 'react-i18next';

const UserManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [allUsers, setAllUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsersCurrentPage, setAllUsersCurrentPage] = useState(1);
  const [cleanersCurrentPage, setCleanersCurrentPage] = useState(1);
  const [adminsCurrentPage, setAdminsCurrentPage] = useState(1);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const itemsPerPage = 10;
  const api = import.meta.env.VITE_API_BASE_URL;

  const { t } = useTranslation();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/auth/users`);
      const users = response.data;
      console.log("Fetched users:", users);
      
      // Set all users
      setAllUsers(users);
      
      // Filter users based on roles
      setCustomers(users.filter(user => !user.is_cleaner && !user.is_admin));
      setCleaners(users.filter(user => user.is_cleaner));
      setAdmins(users.filter(user => user.is_admin));
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setIsCreatingAdmin(true);
    try {
      const response = await axios.post(`${api}/createAdmin`, newAdmin);
      if (response.status === 200 || response.status === 201) {
        toast.success("Admin created successfully");
        setShowAddAdminModal(false);
        setNewAdmin({ fullName: "", email: "", password: "" });
        fetchUsers();
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      toast.error(error.response?.data?.message || "Error creating admin");
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  const columns = [
    {
      header: "Username",
      accessor: "username",
      render: (user) => user.username || "N/A",
    },
    {
      header: "Name",
      accessor: "name",
      render: (user) => `${user.first_name || ""} ${user.last_name || ""}`.trim() || "N/A",
    },
    {
      header: "Email",
      accessor: "email",
      render: (user) => user.email || "N/A",
    },
    {
      header: "Status",
      accessor: "is_verified",
      render: (user) => user.is_verified ? "Verified" : "Not Verified",
    },
    {
      header: "Created At",
      accessor: "created_at",
      render: (user) => user.created_at ? new Date(user.created_at).toLocaleString() : "No record",
    },
  ];

  // Get current items for all users
  const getCurrentAllUsers = () => {
    const indexOfLastItem = allUsersCurrentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return allUsers.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Get current items for customers
  const getCurrentCustomers = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return customers.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Get current items for cleaners
  const getCurrentCleaners = () => {
    const indexOfLastItem = cleanersCurrentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return cleaners.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Get current items for admins
  const getCurrentAdmins = () => {
    const indexOfLastItem = adminsCurrentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return admins.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Pagination handlers for all users
  const nextAllUsersPage = () => {
    const totalPages = Math.ceil(allUsers.length / itemsPerPage);
    if (allUsersCurrentPage < totalPages) {
      setAllUsersCurrentPage((prev) => prev + 1);
    }
  };

  const prevAllUsersPage = () => {
    if (allUsersCurrentPage > 1) {
      setAllUsersCurrentPage((prev) => prev - 1);
    }
  };

  // Pagination handlers for customers
  const nextCustomersPage = () => {
    const totalPages = Math.ceil(customers.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevCustomersPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Pagination handlers for cleaners
  const nextCleanersPage = () => {
    const totalPages = Math.ceil(cleaners.length / itemsPerPage);
    if (cleanersCurrentPage < totalPages) {
      setCleanersCurrentPage((prev) => prev + 1);
    }
  };

  const prevCleanersPage = () => {
    if (cleanersCurrentPage > 1) {
      setCleanersCurrentPage((prev) => prev - 1);
    }
  };

  // Pagination handlers for admins
  const nextAdminsPage = () => {
    const totalPages = Math.ceil(admins.length / itemsPerPage);
    if (adminsCurrentPage < totalPages) {
      setAdminsCurrentPage((prev) => prev + 1);
    }
  };

  const prevAdminsPage = () => {
    if (adminsCurrentPage > 1) {
      setAdminsCurrentPage((prev) => prev - 1);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/auth/users/${userId}`);
  };

  const renderUserTable = (users, title, currentPageFn, totalPages, prevPageFn, nextPageFn) => (
    <div className="px-3 py-4 border border-gray-300 rounded-lg">
      <h1 className="font-semibold text-lg mb-6">{title}</h1>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <ThreeDots color="#3B82F6" height={50} width={50} />
        </div>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 font-semibold">
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created At</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleUserClick(user.id)}
                  >
                    <td className="py-3 px-4 truncate" title={user.username}>
                      {user.username || "N/A"}
                    </td>
                    <td className="py-3 px-4 truncate" title={`${user.first_name || ""} ${user.last_name || ""}`}>
                      {`${user.first_name || ""} ${user.last_name || ""}`.trim() || "N/A"}
                    </td>
                    <td className="py-3 px-4 truncate" title={user.email}>
                      {user.email || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${user.is_verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {user.is_verified ? "Verified" : "Not Verified"}
                      </span>
                    </td>
                    <td className="py-3 px-4 truncate" title={user.created_at}>
                      {user.created_at ? new Date(user.created_at).toLocaleString() : "No record"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPageFn}
            totalPages={totalPages}
            ordersPerPage={itemsPerPage}
            ordersLength={users.length}
            prevPage={prevPageFn}
            nextPage={nextPageFn}
          />
        </>
      )}
    </div>
  );

  return (
    <>
      <ToastContainer />
      <div className="w-full py-3 px-2">
        <div className="flex space-x-8 border-b border-gray-200 mb-4">
          <button
            className={`py-2 text-center text-md font-medium ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Users
          </button>
          <button
            className={`py-2 text-center text-md font-medium ${
              activeTab === "customer"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("customer")}
          >
            {t("customerAccounts")}
          </button>
          <button
            className={`py-2 text-center text-md font-medium ${
              activeTab === "cleaner"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("cleaner")}
          >
            {t("cleanerAccounts")}
          </button>
          <button
            className={`py-2 text-center text-md font-medium ${
              activeTab === "admin"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("admin")}
          >
            Admin Accounts
          </button>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === "all" && renderUserTable(
          getCurrentAllUsers(),
          "All User Accounts",
          allUsersCurrentPage,
          Math.ceil(allUsers.length / itemsPerPage),
          prevAllUsersPage,
          nextAllUsersPage
        )}

        {activeTab === "customer" && renderUserTable(
          getCurrentCustomers(),
          "Customer Accounts",
          currentPage,
          Math.ceil(customers.length / itemsPerPage),
          prevCustomersPage,
          nextCustomersPage
        )}

        {activeTab === "cleaner" && renderUserTable(
          getCurrentCleaners(),
          "Cleaner Accounts",
          cleanersCurrentPage,
          Math.ceil(cleaners.length / itemsPerPage),
          prevCleanersPage,
          nextCleanersPage
        )}

        {activeTab === "admin" && (
          <>
            <div className="px-3 py-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-semibold text-lg">Admin Accounts</h1>
                <button
                  onClick={() => setShowAddAdminModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Add Admin
                </button>
              </div>
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <ThreeDots color="#3B82F6" height={50} width={50} />
                </div>
              ) : (
                <>
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100 text-left text-gray-600 font-semibold">
                        <th className="py-3 px-4">Username</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {getCurrentAdmins().length > 0 ? (
                        getCurrentAdmins().map((admin) => (
                          <tr
                            key={admin.id}
                            className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleUserClick(admin.id)}
                          >
                            <td className="py-3 px-4 truncate" title={admin.username}>
                              {admin.username || "N/A"}
                            </td>
                            <td className="py-3 px-4 truncate" title={`${admin.first_name || ""} ${admin.last_name || ""}`}>
                              {`${admin.first_name || ""} ${admin.last_name || ""}`.trim() || "N/A"}
                            </td>
                            <td className="py-3 px-4 truncate" title={admin.email}>
                              {admin.email || "N/A"}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs ${admin.is_verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                {admin.is_verified ? "Verified" : "Not Verified"}
                              </span>
                            </td>
                            <td className="py-3 px-4 truncate" title={admin.created_at}>
                              {admin.created_at ? new Date(admin.created_at).toLocaleString() : "No record"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-gray-500">
                            No admin users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <Pagination
                    currentPage={adminsCurrentPage}
                    totalPages={Math.ceil(admins.length / itemsPerPage)}
                    ordersPerPage={itemsPerPage}
                    ordersLength={admins.length}
                    prevPage={prevAdminsPage}
                    nextPage={nextAdminsPage}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Add Admin Modal */}
      {showAddAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
            <form onSubmit={handleCreateAdmin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAdmin.fullName}
                  onChange={(e) => setNewAdmin({ ...newAdmin, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddAdminModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isCreatingAdmin}
                >
                  {isCreatingAdmin ? (
                    <ThreeDots
                      color="#fff"
                      height={20}
                      width={20}
                      className="inline-block"
                    />
                  ) : (
                    "Create Admin"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagement;