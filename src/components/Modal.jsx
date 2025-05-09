// src/Modal.js
import React from "react";

const Modal = ({ show, handleClose, service, handleChange, handleSave }) => {
  if (!show) return null;

  return (
    <div className="fixed z-90 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-4">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h4 className="text-lg font-semibold">Update Service Info</h4>
          <button onClick={handleClose} className="text-gray-600">X</button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Service Name:</label>
          <input
            type="text"
            name="serviceName"
            value={service.serviceName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            name="servicePrice"
            value={service.servicePrice}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Service Type:</label>
          <input
            type="text"
            name="serviceType"
            value={service.serviceType}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Service Discount:</label>
          <input
            type="number"
            name="serviceDiscount"
            value={service.serviceDiscount}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleClose} className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Close</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
