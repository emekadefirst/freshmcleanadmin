/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Progress from "/assets/progress.png";
import Mobileprogress from "/assets/mobileprogress.png";
import Logo from "/assets/fresh-logo.png";
import GenderSelector from "./Genderselector";
import FileUpload from "./FileUpload";
import Facebook from "/assets/facebook.png";
import AuthTemplate from "./AuthTemplate.jsx";
import { Link,useNavigate } from "react-router-dom";
// import GoogleLoginButton from './GoogleLoginButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import MiniLoader from './preloader/mini-preloader';

function Signup() {
  const myCustomColor = "#FAFAFA";
  const myCustomColor1 = "#3DA5EC";

  const history = useNavigate();

  const handleGoogleLoginSuccess = (response) => {
    console.log('Google login successful', response);
    // Handle user data or authentication token
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed', error);
  };
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.fullname || !formData.email || !formData.password) {
      toast.error('❌ Please fill in all the fields to register.');
      setLoading(false);
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error('Password must contain at least one uppercase letter, one symbol, and be at least 8 characters long.');
      setLoading(false);
      return;
    }


    try {
      const response = await axios.post('https://klean-up-server-hz1y.onrender.com/v1/api/createAdmin', formData);
      console.log('Registration successful:', response.data);
      toast.success('Registration successful!');
      setTimeout(() => {
        history('/LoginMain');
      }, 1000);

    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error.response.data.error || 'Registration failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthTemplate />
      <ToastContainer />
      <div>
        <div className="absolute -top-0 lg:top-10 h-[440px] w-[110%] lg:w-[40%] mx-40 -left-[185px] lg:-left-24 p-16 rounded-3xl lg:rounded-md  ">
          <div className="z-50">
            <img className="h-12 w-24 object-contain -my-8" src={Logo} />
            <Link to="/LoginMain">
              <button className="w-32 h-1/6 mx-6 bg-gray-300 font-semibold text-black  float-right -right-10 relative -mt-3 rounded-md p-2">
                Sign In
              </button>
            </Link>
          </div>
          <div className=" flex-1 items-center relative my-20 bg-white border-gray-500 border-opacity-10 border-2 rounded-md h-[140%] w-[104%] p-8">
            <div className="flex-1 text-center top-5 relative items-center justify-center"></div>
            <div className="my-14 -mt-12">
              <br />
              <br />
              <label className="font-semibold">Fullname</label>
              <br />
              <input
                type="text"
                className="lg:p-4 p-2 border mt-2 focus:outline-none border-gray-400 rounded-lg w-[100%] bg-gray-50 placeholder:text-black"
                placeholder="Enter your fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
              <br />
              <br />
              <label className="font-semibold">Email</label>
              <br />
              <input
                type="email"
                className="lg:p-4 p-2 border mt-2 focus:outline-none border-gray-400 rounded-lg w-[100%] bg-gray-50 placeholder:text-black"
                placeholder="Enter your email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <br />
              <br />
              <label className="font-semibold">Password</label>
              <br />
              <input
                type="password"
                className="lg:p-4 p-2 border mt-2 focus:outline-none border-gray-400 rounded-lg w-[100%] bg-gray-50 placeholder:text-black"
                name="password"
                placeholder="Password contain 8 characters"
                value={formData.password}
                onChange={handleChange}
              />
             
              <br />
              <br />
                {" "}
                <button
                  className="w-[100%] h-1/6 mx-6 py-3 font-semibold text-white justify-center relative -left-6 rounded-md p-2"
                  style={{ backgroundColor: myCustomColor1 }}
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? <MiniLoader /> : 'Signup'}
                </button>
            </div>
            <div className="flex whitespace-nowrap w-96 lgh-0 h-28 lg:h-12 mt-20 lg:mt-0 lg:w-96 relative lg:flex-nowrap flex-wrap -left-8 lg:-left-24 lg:text-base text-sm ">
            {/* <GoogleLoginButton onSuccess={handleGoogleLoginSuccess} onFailure={handleGoogleLoginFailure} /> */}
            {/* <Link to="/signup" className="">
              <button className=" w-36 text-xs flex  h-8 mx-6 bg-gray-300  text-black  float-right lg:-right-2 relative -mt-3 rounded-md p-2">
              <img className="w-4 mr-1" src={Facebook}/>
                Login with Facebook
              </button>
            </Link>
             */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
