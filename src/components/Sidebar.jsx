// import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      {/* <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2> */}
      <div className="mb-10">
        <img
          src="/assets/fresh-logo.png"
          alt="logo"
          className="w-[95px] mx-auto"
        />
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="hover:bg-gray-700 p-2 block rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/users"
              className="hover:bg-gray-700 p-2 block rounded"
            >
              Cleaning Requests
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className="hover:bg-gray-700 p-2 block rounded"
            >
              User Management
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/settings"
              className="hover:bg-gray-700 p-2 block rounded"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              className="hover:bg-gray-700 p-2 block rounded"
            >
             Transaction category
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className="hover:bg-gray-700 p-2 block rounded"
            >
             Service category
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;