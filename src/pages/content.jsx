import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ContentManagement = () => {
  const apiBase = import.meta.env.VITE_API_URL;

  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const routes = {
    blogs: "blogs",
    faqs: "faqs",
    categories: "categories",
    testimonies: "testimonies",
  };

  const handleCreate = async (item, data) => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await axios.post(`${apiBase}/${item}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success(`${item} created successfully`);
        fetchRoles(); 
      }
    } catch (error) {
      toast.error(`Error creating ${item}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (item, id, data) => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await axios.patch(`${apiBase}/${item}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 204) {
        toast.success(`${item} updated successfully`);
        fetchRoles();
        setShowDeleteModal(false);
      }
    } catch (error) {
      toast.error(`Failed to update ${item}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (item, id) => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`${apiBase}/${item}/${id}`);

      if (response.status === 204) {
        toast.success(`${item} deleted successfully`);
        fetchRoles();
        setShowDeleteModal(false);
      }
    } catch (error) {
      toast.error(`Failed to delete ${item}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return <div></div>;
};

export default ContentManagement;
