import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

const AdditionalRoles = () => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState("view");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Form states
  const [newRole, setNewRole] = useState({
    roleName: "",
    rolePrice: ""
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${api}/extra`);
      setRoles(response.data);  // Response is already in array form
    } catch (error) {
      toast.error("Error fetching roles");
    }
  };

  const handleEdit = (role) => {
    setEditMode({ ...editMode, [role.id]: true });
    setEditData({ ...editData, [role.id]: { ...role } });
  };

  const handleUpdate = async (id) => {
    const updatedRole = editData[id];

    try {
      const response = await axios.patch(`${api}/extra/${id}`, updatedRole);

      if (response.status === 200) {
        toast.success("Role updated successfully");
        fetchRoles();
        setEditMode({ ...editMode, [id]: false });
      }
    } catch (error) {
      toast.error("Error updating role");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`${api}/extra/${roleToDelete}`);
      
      if (response.status === 204) {
        toast.success("Role deleted successfully");
        fetchRoles();
        setShowDeleteModal(false);
      }
    } catch (error) {
      toast.error("Error deleting role");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const response = await axios.post(`${api}/extra/`, {
        name: newRole.roleName,
        price: Number(newRole.rolePrice)
      });
      
      if (response.status === 201) {
        toast.success("Role created successfully");
        fetchRoles();
        setNewRole({ roleName: "", rolePrice: "" });
        setActiveTab("view");
      }
    } catch (error) {
      toast.error("Error creating role");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-indigo-800">{t("additionalRolesTitle")}</h2>

      {/* Modern Tabs */}
      <div className="flex mb-8 bg-gray-100 p-1 rounded-lg shadow-sm">
        <button
          className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 font-medium text-sm ${
            activeTab === "view" 
              ? "bg-white text-indigo-700 shadow-sm" 
              : "text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("view")}
        >
          {t("view")}
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 font-medium text-sm ${
            activeTab === "create" 
              ? "bg-white text-indigo-700 shadow-sm" 
              : "text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("create")}
        >
          {t("createNew")}
        </button>
      </div>

      {activeTab === "view" && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-800">
                    {t("description")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-800">
                    {t("price")}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-indigo-800">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {roles.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                      {t("noRolesFound")}
                    </td>
                  </tr>
                ) : (
                  roles
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((role) => (
                      <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          {editMode[role.id] ? (
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              value={editData[role.id]?.name || ""}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  [role.id]: {
                                    ...editData[role.id],
                                    name: e.target.value,
                                  },
                                })
                              }
                            />
                          ) : (
                            <span className="font-medium text-gray-800">{role.name}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editMode[role.id] ? (
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              value={editData[role.id]?.price || ""}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  [role.id]: {
                                    ...editData[role.id],
                                    price: e.target.value,
                                  },
                                })
                              }
                            />
                          ) : (
                            <span className="font-medium text-gray-800">{role.price}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {editMode[role.id] ? (
                            <button
                              className="inline-flex items-center px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                              onClick={() => handleUpdate(role.id)}
                            >
                              {t("save")}
                            </button>
                          ) : (
                            <div className="flex justify-end gap-2">
                              <button
                                className="p-2 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-50 transition-colors"
                                onClick={() => handleEdit(role)}
                                aria-label="Edit"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50 transition-colors"
                                onClick={() => {
                                  setRoleToDelete(role.id);
                                  setShowDeleteModal(true);
                                }}
                                aria-label="Delete"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modern Pagination */}
          {roles.length > 0 && (
            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                {t("showing")} {Math.min((currentPage - 1) * 10 + 1, roles.length)} - {Math.min(currentPage * 10, roles.length)} {t("of")} {roles.length} {t("roles")}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className={`p-2 rounded-lg ${
                    currentPage === 1 
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed" 
                      : "text-gray-700 bg-white hover:bg-indigo-50 border border-gray-200"
                  }`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="px-4 py-2 rounded-lg bg-white border border-gray-200">{currentPage}</span>
                <button
                  className={`p-2 rounded-lg ${
                    roles.length <= currentPage * 10 
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed" 
                      : "text-gray-700 bg-white hover:bg-indigo-50 border border-gray-200"
                  }`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={roles.length <= currentPage * 10}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "create" && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-6 text-indigo-800">{t("createNewRole")}</h3>
          <form onSubmit={handleCreateRole}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("roleName")}</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                value={newRole.roleName}
                onChange={(e) =>
                  setNewRole({ ...newRole, roleName: e.target.value })
                }
                placeholder={t("enterRoleName")}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("rolePrice")}</label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                value={newRole.rolePrice}
                onChange={(e) =>
                  setNewRole({ ...newRole, rolePrice: e.target.value })
                }
                placeholder={t("enterRolePrice")}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center"
                type="submit"
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("creating")}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {t("create")}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modern Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 animate-fade-in">
            <div className="flex items-center justify-center mb-6 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">{t("confirmDelete")}</h3>
            <p className="text-gray-600 text-center mb-6">{t("confirmDeleteText")}</p>
            
            <div className="flex gap-4">
              <button
                className="flex-1 px-4 py-3 bg-gray-200 rounded-lg text-gray-800 font-medium hover:bg-gray-300 transition-colors"
                onClick={() => setShowDeleteModal(false)}
              >
                {t("cancel")}
              </button>
              <button
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex justify-center items-center"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("deleting")}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t("delete")}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AdditionalRoles;