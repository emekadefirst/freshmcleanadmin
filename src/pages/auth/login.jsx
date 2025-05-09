import React from "react";
import Logo from "/assets/fresh-logo.png";
import AuthTemplate from "../../components/AuthTemplate";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <ToastContainer />
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-6 py-8 bg-white shadow-lg rounded-lg">
          <div className="flex items-center justify-between mb-8">
            <img className="h-10 w-auto object-contain" src={Logo} alt="Logo" />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;