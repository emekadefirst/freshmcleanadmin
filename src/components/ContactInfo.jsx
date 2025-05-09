/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import Logo from "./Media/KleanUp.png";
import { useNavigate } from "react-router-dom";
import MiniLoader from './preloader/mini-preloader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
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

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.price || !formData.range || !formData.image) {
      toast.error('Opps!😉 Please fill in all the fields to register.');
      setLoading(false);
      return;
    }
    // console.log('Form Data:', formData);

    // Use FormData to send the form data
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('price', formData.price);
    formDataObj.append('range', formData.range);
    formDataObj.append('image', formData.image);

    try {
      const response = await axios.post('https://klean-up-server-hz1y.onrender.com/v1/api/createSeriveCategory', formDataObj,{
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
      <div className="">
        <div className="flex justify-center mt-16">
          <img
            className="h-8 w-24 relative right-[25%] lg:right-0 lg:w-24 lg:object-contain"
            src={Logo}
          />
        </div>
      </div>
      <ToastContainer />
      <div className="lg:w-2/5 h-fit shadow-lg relative  lg:left-96 lg:ml-10 mt-10 -pb-20">
        <form encType='multipart/form-data'>
        <div className="relative lg:right-9 right-12">
          <div className="top-0  relative ">
            <label className="-mt-8 top-8 left-20 relative whitespace-nowrap font-semibold">
              Service Category Name
            </label>
            <input
              type="text"
              placeholder="Service Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border-gray-200 mt-11 ml-20 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
              style={{ backgroundColor: myCustomColor }}
            />
          </div>
          <div className="-top-2  relative ">
            <label className="-mt-8 top-8 left-20 relative whitespace-nowrap font-semibold">
              Price(Euros)
            </label>
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border-gray-200 mt-11 ml-20 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
              style={{ backgroundColor: myCustomColor }}
            />
          </div>
          <div className="-top-2  relative ">
            <label className="-mt-8 top-8 left-20 relative whitespace-nowrap font-semibold">
              Range(in hour)
            </label>
            <input
              type="text"
              placeholder="i.e 2hrs"
              name="range"
              value={formData.range}
              onChange={handleInputChange}
              className="border-gray-200 mt-11 ml-20 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
              style={{ backgroundColor: myCustomColor }}
            />
          </div>
          <div className="mt-5 left-20 relative">
            <label>Upload the image</label>
            <p className="text-sm  text-gray-500">
              Accepted any format of image
            </p>
            {/* Use normal file input */}
            <input
              type="file"
              name='image'
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
              className="border-gray-200 mt-11 ml-20 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
              style={{ backgroundColor: myCustomColor }}
            />
          </div>
          <br />
          <button
            className="w-[50%] h-1/6 mx-6 py-3 font-semibold text-white justify-center relative -left-6 rounded-md p-2"
            style={{ backgroundColor: myCustomColor1 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <MiniLoader /> : 'Signup'}
          </button>
        </div>
        </form>
      </div>
      <div className="h-40 mt-20"></div>
    </>
  );
}

export default Signup;
