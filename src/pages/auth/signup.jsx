import React from "react";
import Logo from "/assets/fresh-logo.png";
import AuthTemplate from "../../components/AuthTemplate";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from "../../components/auth/SignupForm";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    setTimeout(() => {
      navigate("/auth/login");
    }, 1000);
  };

  return (
    <>
      <AuthTemplate />
      <ToastContainer />
      <div>
        <div className="absolute -top-0 lg:top-10 h-[440px] w-[110%] lg:w-[40%] mx-40 -left-[185px] lg:-left-24 p-16 rounded-3xl lg:rounded-md">
          <div className="z-50 flex items-center justify-between">
            <img className="h-12 w-24 object-contain -my-8" src={Logo} alt="Logo" />
            <Link
              to="/auth/login"
              className="bg-gray-200 font-medium text-sm text-black rounded-md px-4 py-2 hover:bg-gray-300 duration-150"
            >
              Sign In
            </Link>
          </div>

          <div className="flex-1 items-center mt-10 relative bg-white border-gray-500 border-opacity-10 border-2 rounded-md w-[104%] p-8">
            <SignupForm onSuccess={handleSignupSuccess} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;