/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import MiniLoader from './preloader/mini-preloader';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceUpdate = () => {
  const history = useNavigate();
  const myCustomColor = "#FAFAFA";
  const myCustomColor1 = "#3DA5EC";
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    range: '',
    image: null
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.price || !formData.range || !formData.image) {
      toast.error('Opps!😉 Please fill in all the fields to register.');
      setLoading(false);
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('price', formData.price);
    formDataObj.append('range', formData.range);
    formDataObj.append('image', formData.image);

    try {
      const response = await axios.post('https://klean-up-server-hz1y.onrender.com/v1/api/createSeriveCategory', formDataObj, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      toast.success('Service Category is added successful!');
      setTimeout(() => {
        history('/ServiceCategory');
      }, 1000);
    } catch (error) {
      console.error('Error creating service category:', error);
      toast.error(error.response.data.error || 'Registration failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full max-w-lg mx-auto shadow-lg relative lg:ml-10 mt-10 pb-10 bg-white rounded-lg">
        <form onSubmit={handleSubmit} encType='multipart/form-data' className="px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Service Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Service Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price (Euros)
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="range">
              Range (in hour)
            </label>
            <input
              type="text"
              id="range"
              name="range"
              value={formData.range}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="i.e 2hrs"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? <MiniLoader /> : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ServiceUpdate;
