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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Login Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <img className="h-8 w-auto object-contain mx-auto mb-4" src={Logo} alt="Logo" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Administrator Login</h2>
              <p className="text-gray-600">Please sign in to access the dashboard</p>
            </div>
            
            <LoginForm />
            
            {/* Security Notice */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-amber-800">Security Notice</p>
                  <p className="text-sm text-amber-700 mt-1">This is a restricted area. Only authorized administrators can access this system.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-blue-200 text-sm">© 2024 FreshMcLean Admin Portal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;