// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faHome, faMoneyBill, faCog, faUser } from '@fortawesome/free-solid-svg-icons';


// const Sidebar = () => {
//   const [activeLink, setActiveLink] = useState("Dashboard");

//   const navItems = [
//     { name: "Dashboard", icon: faHome },
//     { name: "Financials", icon: faMoneyBill },
//     { name: "Operations", icon: faCog },
//     { name: "Employees", icon: faUser },
//     { name: "Support", icon: faUser },
//     { name: "Settings", icon: faCog },
//   ];

//   return (
//     <div className="flex flex-col w-64 h-screen bg-gray-900 text-white">
//       {/* Logo */}
//       <div className="p-6 text-lg font-bold">Logo</div>

//       {/* Navigation Links */}
//       <nav className="flex-1">
//         {navItems.map((item) => (
//           <button
//             key={item.name}
//             onClick={() => setActiveLink(item.name)}
//             className={`flex items-center p-4 w-full ${
//               activeLink === item.name ? "bg-gray-700" : "hover:bg-gray-800"
//             }`}
//           >
//             <FontAwesomeIcon icon={item.icon} className="mr-3" />
//             {item.name}
//           </button>
//         ))}
//       </nav>

//       {/* User Profile */}
//       <div className="flex items-center p-4 mt-auto bg-gray-800">
//         <img
//           src="https://via.placeholder.com/40"
//           alt="User"
//           className="w-10 h-10 rounded-full mr-2"
//         />
//         <div>
//           <p className="text-sm font-semibold">Victor Akinode</p>
//           <p className="text-xs">victor@telneting.com</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Header = () => {
//   return (
//     <header className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
//       {/* Page Title */}
//       <div className="text-xl font-semibold text-gray-700">Dashboard</div>

//       {/* Profile & Notification */}
//       <div className="flex items-center space-x-4">
//         <span>Welcome, User!</span>
//         <FontAwesomeIcon icon={faBell} className="text-gray-500 cursor-pointer" />
//         <div className="relative">
//           <img
//             src="https://via.placeholder.com/40"
//             alt="User"
//             className="w-10 h-10 rounded-full"
//           />
//         </div>
//       </div>
//     </header>
//   );
// };

// // eslint-disable-next-line react/prop-types
// const Layout = ({ children }) => {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1">
//         {/* Header */}
//         <Header />

//         {/* Page Content */}
//         <main className="flex-1 p-6 bg-gray-50">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import Header from "../components/header";
import Sidebar from "../components/sidebars";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed on the left */}
      <aside className="w-72 h-full fixed top-0 left-0 bg-white border-r border-gray-300">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-72">
        {" "}
        <Header />
        <main className="flex-1 p-6 bg-white overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
