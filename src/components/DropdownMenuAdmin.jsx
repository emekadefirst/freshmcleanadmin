// import React, { useState } from "react";

import { Link, NavLink } from "react-router-dom";
// import Profile from "../buyerProfile/profile/Profile";

function DropdownMenuAdmin() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

  const activeLink =
    "cursor-pointer bg-secondary text-blue-500 p-2 pl-2 rounded-full";
  const normalLink = "";

  // Authentication start
//   const handleLogin = () => {
    // Perform login logic (e.g., API call, authentication)
    // If login is successful, set isAuthenticated to true
    // setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
    // Perform logout logic
    // If logout is successful, set isAuthenticated to false
    // setIsAuthenticated(false);
//   };
  return (
    <div className="whitespace-nowrap z-30 flex flex-col uppercase text-xs bg-primary w-[180px] text-white px-5 pt-5 pb-6 gap-5 rounded font-bold relative">
      <NavLink
        to="/CleanersHome"
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <p className="cursor-pointer font-Roboto">Home</p>
      </NavLink>
      <NavLink
        to="/TimeTracking"
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <p className="cursor-pointer font-Roboto">Time tracking</p>
      </NavLink>
      <NavLink
        to="/Reviews"
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <p className="cursor-pointer font-Roboto">Review & Rating</p>
      </NavLink>
      <NavLink
        to="/JobUpdates"
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <p className="cursor-pointer font-Roboto">Job updates</p>
      </NavLink>
      {/* <NavLink
        to="/FinancialManagement"
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <p className="cursor-pointer font-Roboto">Financial management</p>
      </NavLink>
      <NavLink
        to="/CustomerSupport"
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <p className="cursor-pointer font-Roboto">Customer support</p>
      </NavLink>
      <NavLink
        to="/AnalyticsAndInsights"
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <p className="cursor-pointer font-Roboto">Analytics and insights</p>
      </NavLink> */}
      <div className="mt-3">
        {/* {!isAuthenticated ? (

          // <Profile show="hidden" />
          <div>
            <div className="">
              <Link to="profile">
                <p className="text-base text-white font-bold font-Roboto cursor-pointer">
                  Bright Moses
                </p>
              </Link>
              <p className="text-[0.6875rem] text-white font-Roboto font-normal">
                Active
              </p>
            </div>
          </div>
        ) : (
          <div>
            <NavLink
              to="/signin"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <p className="linkHover font-Roboto cursor-pointer w-[90px] h-[33px] rounded-[33.5px] border-[0.84px] border-white flex items-center justify-center text-white text-[0.8369rem] font-semibold">
                Login
              </p>
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <p className="linkHover font-Roboto mt-2 cursor-pointer w-[90px] h-[33px] rounded-[33.5px] bg-white flex items-center justify-center text-[#035FCE] text-[0.8369rem] font-semibold">
                Sign up
              </p>
            </NavLink>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default DropdownMenuAdmin;
