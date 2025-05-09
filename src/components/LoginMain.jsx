/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import Logo from "./Media/FreshMClean-logo PNG 2.png";
import Gmail from "./Media/gmail.png";
import Google from "./Media/google.png";
import Facebook from "./Media/facebook.png";
import AuthTemplate from "./AuthTemplate.jsx";
import { Link,useNavigate } from "react-router-dom";
// import GoogleLoginButton from './GoogleLoginButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import MiniLoader from './preloader/mini-preloader';

function HelloAdmin() {
  const myCustomColor = "#3DA5EC";

  const handleGoogleLoginSuccess = (response) => {
    console.log('Google login successful', response);
    // Handle user data or authentication token
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed', error);
  };

  const history = useNavigate();


  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password.');
      setLoading(false);
      return;
    }


    try {
      const response = await axios.post('https://klean-up-server-hz1y.onrender.com/v1/api/loginAdmin', formData);
      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userId', response.data.id);
      }
      console.log('Login successful:', response.data);
      toast.success('Login successful!');
      setTimeout(() => {
        history('/WelcomeDashboard');
      }, 1000);

    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response.data.error || 'Login failed. Please try again later.');
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <AuthTemplate />
      <ToastContainer />
      <div>
        <div className="absolute -top-0 lg:top-10 h-96 w-[110%] lg:w-[40%] mx-40 -left-[185px] lg:-left-24 p-16 rounded-3xl lg:rounded-md  ">
          <div className="z-50">
            <img className="h-12 w-24 object-contain -my-8" src={Logo} />
            <Link to="/signup">
              <button className="w-32 h-1/6 mx-6 bg-gray-300 font-semibold text-black  float-right -right-10 relative -mt-3 rounded-md p-2">
                Sign Up
              </button>
            </Link>
          </div>
          <div className=" flex-1 items-center relative my-20 bg-white border-gray-500 border-opacity-10 border-2 rounded-md h-[140%] w-[104%] p-8">
            <div className="flex-1 text-center top-5 relative items-center justify-center"></div>
            <div className="my-14 -mt-12">
              <br />
              <br />
              <label className="font-semibold">Username</label>
              <br />
              <input
                type="email"
                className="lg:p-4 p-2 border mt-2 focus:outline-none border-gray-400 rounded-lg w-[100%] bg-gray-50 placeholder:text-black"
                placeholder="piersmorgan@gmail.com"
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
                placeholder="********"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <sub className="font-normal">Forgot password?</sub>
              <br />
              <br />
              {/* <Link to="/LoginPage"> */}
                {" "}
                <button
                  className="w-[100%] h-1/6 mx-6 py-3 font-semibold text-white justify-center relative -left-6 rounded-md p-2"
                  style={{ backgroundColor: myCustomColor }}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? <MiniLoader /> : 'Signin'}
                </button>
              {/* </Link> */}
            </div>
            <div className="flex whitespace-nowrap w-96 lgh-0 h-28 lg:h-12 mt-20 lg:mt-0 lg:w-96 relative lg:flex-nowrap flex-wrap -left-8 lg:-left-24 lg:text-base text-sm">
            {/* <GoogleLoginButton onSuccess={handleGoogleLoginSuccess} onFailure={handleGoogleLoginFailure} /> */}
            {/* <Link to="/signup" className="">
              <button className=" w-36 text-xs flex  h-8 mx-6 bg-gray-300  text-black  float-right lg:-right-2 relative -mt-3 rounded-md p-2">
              <img className="w-4 mr-1" src={Facebook}/>
                Login with Facebook
              </button>
            </Link> */}
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HelloAdmin;
