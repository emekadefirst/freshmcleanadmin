import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DynamicTable = ({ resource, onCreate, onUpdate, onDelete }) => {
  const apiBase = import.meta.env.VITE_API_URL;

  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [resource]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiBase}/${resource}`);
      setData(res.data);
      if (res.data.length) setHeaders(Object.keys(res.data[0]));
    } catch (err) {
      toast.error(`Failed to fetch ${resource}`);
    }
  };

  const handleCellClick = (item) => {
    setSelectedItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      await onUpdate(resource, selectedItem.id, form);
      fetchData();
      setShowModal(false);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    await onDelete(resource, id);
    fetchData();
  };

  return (
    <div className="overflow-x-auto">
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((h) => (
                <th key={h} className="p-2 border text-left capitalize">
                  {h}
                </th>
              ))}
              <th className="p-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {headers.map((h) => (
                  <td
                    key={h}
                    onClick={() => handleCellClick(row)}
                    className="p-2 border cursor-pointer"
                  >
                    {typeof row[h] === "string" && row[h].length > 80
                      ? row[h].slice(0, 80) + "..."
                      : row[h]}
                  </td>
                ))}
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded w-full max-w-lg">
            <h2 className="font-semibold mb-4 text-lg">Edit {resource}</h2>
            <form className="space-y-3">
              {headers.map((field) => (
                <div key={field}>
                  <label className="block mb-1 capitalize text-sm">{field}</label>
                  {field === "image" ? (
                    <input
                      type="file"
                      name={field}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                    />
                  )}
                </div>
              ))}
            </form>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
