import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Plus, Edit2, Trash2, Save, X, Image, MessageSquare, FileText, Tag, User } from "lucide-react";

const ContentManagement = () => {
  const apiBase = import.meta.env.VITE_API_URL;
  
  // Resource configuration with proper content types and methods
  const resources = {
    blogs: { 
      fields: ["title", "category", "content", "image"],
      icon: <FileText className="w-5 h-5" />,
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      useFormData: true // Only blogs use FormData
    },
    faqs: { 
      fields: ["title", "category", "content"],
      icon: <MessageSquare className="w-5 h-5" />,
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50",
      useFormData: false // Use JSON for FAQs
    },
    categories: { 
      fields: ["name"],
      icon: <Tag className="w-5 h-5" />,
      color: "bg-amber-600",
      lightColor: "bg-amber-50",
      useFormData: false // Use JSON for categories
    },
    testimonies: { 
      fields: ["user", "message"],
      icon: <User className="w-5 h-5" />,
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      useFormData: false // Use JSON for testimonies
    }
  };

  // State
  const [activeTab, setActiveTab] = useState("blogs");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);

  // Fetch data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [itemsRes, categoriesRes] = await Promise.all([
        axios.get(`${apiBase}/${activeTab}/`),
        activeTab !== "categories" ? axios.get(`${apiBase}/categories/`) : Promise.resolve({ data: [] })
      ]);
      
      setItems(itemsRes.data);
      if (activeTab !== "categories") setCategories(categoriesRes.data);
      if (activeTab === "categories") setCategories(itemsRes.data);
    } catch (error) {
      toast.error(`Failed to fetch data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const isUpdate = editingId !== null;
    const url = `${apiBase}/${activeTab}/${isUpdate ? `${editingId}/` : ''}`;
    const method = isUpdate ? 'patch' : 'post';
    
    try {
      let response;

      if (resources[activeTab].useFormData) {
        // Use FormData for blogs (for image upload)
        const data = new FormData();
        resources[activeTab].fields.forEach(field => {
          if (formData[field] !== undefined && formData[field] !== null) {
            data.append(field, formData[field]);
          }
        });
        
        response = await axios[method](url, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        // Use JSON for everything else
        const data = {};
        resources[activeTab].fields.forEach(field => {
          if (formData[field] !== undefined && formData[field] !== null) {
            data[field] = formData[field];
          }
        });
        
        response = await axios[method](url, data, {
          headers: { "Content-Type": "application/json" }
        });
      }
      
      if (response.status === 200 || response.status === 201) {
        toast.success(`${activeTab.slice(0, -1)} ${isUpdate ? 'updated' : 'created'} successfully`);
        resetForm();
        fetchData();
      }
    } catch (error) {
      toast.error(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${activeTab.slice(0, -1)}?`)) return;
    
    try {
      await axios.delete(`${apiBase}/${activeTab}/${id}/`);
      toast.success(`${activeTab.slice(0, -1)} deleted successfully`);
      fetchData();
      if (viewItem && viewItem.id === id) {
        setViewItem(null);
      }
    } catch (error) {
      toast.error(`Error deleting: ${error.message}`);
    }
  };

  // Edit item
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setShowForm(true);
    setViewItem(null);
  };

  // View item details
  const handleView = (item) => {
    setViewItem(item);
    setShowForm(false);
  };

  // Form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({});
    setEditingId(null);
    setShowForm(false);
  };

  // Effect to fetch data when active tab changes
  useEffect(() => {
    resetForm();
    setViewItem(null);
    fetchData();
  }, [activeTab]);

  // Render form fields based on active tab
  const renderFormFields = () => {
    return resources[activeTab].fields.map(field => {
      if (field === "category" && activeTab !== "categories") {
        return (
          <div key={field} className="mb-4">
            <label className="block font-medium mb-1 text-gray-700 capitalize">{field}</label>
            <select
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        );
      }
      
      if (field === "content" || field === "message") {
        return (
          <div key={field} className="mb-4">
            <label className="block font-medium mb-1 text-gray-700 capitalize">{field}</label>
            <textarea
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all h-32"
              required
            />
          </div>
        );
      }
      
      return (
        <div key={field} className="mb-4">
          <label className="block font-medium mb-1 text-gray-700 capitalize">{field}</label>
          <input
            type={field === "image" ? "file" : "text"}
            accept={field === "image" ? "image/*" : undefined}
            name={field}
            value={field === "image" ? undefined : formData[field] || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
            required={field !== "image" || !editingId}
          />
          {field === "image" && formData[field] && typeof formData[field] === "string" && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Current image:</p>
              <img 
                src={formData[field]} 
                className="h-20 w-auto rounded border"
                alt="Current" 
              />
            </div>
          )}
        </div>
      );
    });
  };

  // Get color for active tab
  const getActiveColor = (tab) => {
    return tab === activeTab ? 
      `${resources[tab].color} text-white` : 
      'bg-white text-gray-600 hover:bg-gray-50';
  };

  // Get border color for cards
  const getBorderColor = (tab) => {
    if (tab === 'blogs') return 'border-blue-200';
    if (tab === 'faqs') return 'border-emerald-200';
    if (tab === 'categories') return 'border-amber-200';
    if (tab === 'testimonies') return 'border-purple-200';
    return 'border-gray-200';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Content Management</h1>
      <p className="text-gray-600 mb-6">Manage your website content with ease</p>
      
      {/* Tabs */}
      <div className="flex mb-6 border-b overflow-x-auto">
        {Object.keys(resources).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm rounded-t-lg flex items-center gap-2 transition-all ${getActiveColor(tab)}`}
          >
            {resources[tab].icon}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className={`p-2 rounded-full ${resources[activeTab].lightColor} mr-3`}>
            {resources[activeTab].icon}
          </span>
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <span className="ml-3 bg-gray-200 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {items.length} items
          </span>
        </div>
        
        <button 
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) resetForm();
            setViewItem(null);
          }}
          className={`flex items-center gap-2 ${resources[activeTab].color} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-sm`}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel" : `Add ${activeTab.slice(0, -1)}`}
        </button>
      </div>

      {/* Item Detail View */}
      {viewItem && (
        <div className={`${resources[activeTab].lightColor} border ${getBorderColor(activeTab)} p-6 rounded-lg mb-8 shadow-sm`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              {resources[activeTab].icon}
              {activeTab === 'categories' ? 'Category Details' : 
               activeTab === 'testimonies' ? 'Testimony Details' : 
               activeTab === 'faqs' ? 'FAQ Details' : 'Blog Details'}
            </h3>
            <button 
              onClick={() => setViewItem(null)}
              className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-full transition-all"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="bg-white p-5 rounded-lg border">
            {/* Display all fields from the selected item */}
            {Object.keys(viewItem).filter(key => key !== 'id').map(key => {
              if (key === 'image' && viewItem[key]) {
                return (
                  <div key={key} className="mb-4">
                    <h4 className="font-medium text-gray-700 capitalize mb-2">{key}:</h4>
                    <img 
                      src={viewItem[key]} 
                      alt="Content" 
                      className="w-full max-h-80 object-contain rounded border"
                    />
                  </div>
                );
              }
              
              if (key === 'category' && activeTab !== 'categories') {
                const categoryName = categories.find(c => c.id === viewItem[key])?.name || 'Unknown category';
                return (
                  <div key={key} className="mb-4">
                    <h4 className="font-medium text-gray-700 capitalize mb-1">{key}:</h4>
                    <p className="bg-gray-100 inline-block px-2 py-1 rounded text-gray-700">{categoryName}</p>
                  </div>
                );
              }
              
              if (key === 'content' || key === 'message') {
                return (
                  <div key={key} className="mb-4">
                    <h4 className="font-medium text-gray-700 capitalize mb-1">{key}:</h4>
                    <div className="bg-gray-50 p-4 rounded border whitespace-pre-wrap">{viewItem[key]}</div>
                  </div>
                );
              }
              
              return (
                <div key={key} className="mb-4">
                  <h4 className="font-medium text-gray-700 capitalize mb-1">{key}:</h4>
                  <p className="text-gray-800">{viewItem[key]}</p>
                </div>
              );
            })}
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleEdit(viewItem)}
                className={`flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all`}
              >
                <Edit2 size={18} />
                Edit
              </button>
              
              <button
                onClick={() => handleDelete(viewItem.id)}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className={`${resources[activeTab].lightColor} border ${getBorderColor(activeTab)} p-6 rounded-lg mb-8 shadow-sm`}>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            {resources[activeTab].icon}
            {editingId ? `Edit ${activeTab.slice(0, -1)}` : `Create new ${activeTab.slice(0, -1)}`}
          </h3>
          
          <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg border">
            {renderFormFields()}
            
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 ${resources[activeTab].color} text-white px-5 py-2 rounded-lg hover:opacity-90 transition-all disabled:opacity-50`}
              >
                {isSubmitting ? "Processing..." : (
                  <>
                    {editingId ? <Save size={18} /> : <Plus size={18} />}
                    {editingId ? "Update" : "Create"}
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2 border rounded-lg hover:bg-gray-50 transition-all text-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Cards */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-3 text-gray-600">Loading content...</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div 
                key={item.id} 
                className={`border ${getBorderColor(activeTab)} rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden`}
              >
                {/* Header with icon */}
                <div className="flex justify-between items-start mb-3">
                  <div className={`${resources[activeTab].lightColor} p-2 rounded-lg`}>
                    {resources[activeTab].icon}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleView(item)}
                      className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-all"
                      title="View details"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-all"
                      title="Edit"
                    >
                      <Edit2 size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 bg-gray-100 hover:bg-red-100 rounded-md transition-all"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-gray-600 hover:text-red-600" />
                    </button>
                  </div>
                </div>
                
                {/* Content */}
                {activeTab === "categories" ? (
                  <h3 className="font-bold text-lg mb-0 text-gray-800">
                    {item.name}
                  </h3>
                ) : (
                  <>
                    {/* Title or user */}
                    {item.title && (
                      <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
                        {item.title}
                      </h3>
                    )}
                    
                    {item.user && (
                      <h3 className="font-bold text-lg mb-2 text-gray-800">
                        {item.user}
                      </h3>
                    )}

                    {/* Category */}
                    {item.category && categories.length > 0 && (
                      <div className="mb-3">
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {categories.find(c => c.id === item.category)?.name || 'Unknown category'}
                        </span>
                      </div>
                    )}
                    
                    {/* Content or message */}
                    {(item.content || item.message) && (
                      <div className="mb-3">
                        <div className="text-gray-700 text-sm line-clamp-3">
                          {item.content || item.message}
                        </div>
                        {(item.content?.length > 100 || item.message?.length > 100) && (
                          <button 
                            onClick={() => handleView(item)} 
                            className={`text-sm ${resources[activeTab].color.replace('bg-', 'text-')}`}
                          >
                            Read more
                          </button>
                        )}
                      </div>
                    )}
                    
                    {/* Image preview */}
                    {item.image && (
                      <div className="mt-3 relative rounded-lg overflow-hidden h-40">
                        <img 
                          src={item.image} 
                          alt={item.title || "Image"} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed">
              <div className="mx-auto h-12 w-12 text-gray-400">{resources[activeTab].icon}</div>
              <h3 className="mt-3 text-lg font-medium text-gray-700">No {activeTab} found</h3>
              <p className="text-gray-500 mt-1">Get started by creating a new {activeTab.slice(0, -1)}</p>
              <button 
                onClick={() => setShowForm(true)}
                className={`mt-4 inline-flex items-center gap-2 ${resources[activeTab].color} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all`}
              >
                <Plus size={18} />
                Add {activeTab.slice(0, -1)}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentManagement;