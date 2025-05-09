import { NavLink } from "react-router-dom";

const SidebarNavItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg text-sm ${
          isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 text-gray-500"
        }`
      }
    >
      {({ isActive }) => (
        <span className="flex items-center space-x-3">
          <Icon
            className={`text-xl ${isActive ? "text-white" : "text-gray-500"}`}
          />
          <span>{label}</span>
        </span>
      )}
    </NavLink>
  );
};

export default SidebarNavItem;