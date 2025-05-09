import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import ClickOutside from '../ClickOutside';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
// import Link from 'react-router-dom'

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useAuthStore();
  const { t, i18n } = useTranslation();

  const api = import.meta.env.VITE_API_URL;
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const exceptionRef = useRef(null);


  useEffect(() => {
    const fetchCustomer = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${api}/getAdmin/${userId}`
        );
        const adminData = response.data.admin;
        setUser(adminData); // Store in global state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [setUser]); // Only re-run if setUser changes

  if (loading) {
    return (
      <header className="flex justify-between items-center px-6 py-[8px] bg-white border-b shadow-sm">
        <div className="text-lg font-bold">
          <h1 className="font-semibold text-xl">{t("loading")}</h1>
        </div>

      </header>
    );
  }

  // if (error) {
  //   return (
  //     <header className="flex justify-between items-center px-6 py-[8px] bg-white border-b shadow-sm">
  //       <div className="text-lg font-bold">
  //         <h1 className="font-semibold text-xl">{t('welcome')}</h1>
  //       </div>
  //     </header>
  //   );
  // }

  return (
    <header className="flex justify-between items-center px-6 py-[8px] bg-white border-b shadow-sm">
      <div className="flex items-center space-x-3">
        <h1 className="font-semibold text-xl">
          {t("welcome")} {user?.name || ""}
        </h1>

        {/* <div className="flex items-center gap-4">
          <button
            onClick={() => changeLanguage("en")}
            className={`px-3 py-1 rounded ${i18n.language === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("de")}
            className={`px-3 py-1 rounded ${i18n.language === "de" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            DE
          </button>
        </div> */}
      </div>
      <div className="flex items-center gap-4">
        <img
          src={user?.profileImage || "https://avatar.iran.liara.run/public"}
          alt="Profile"
          className="w-12 h-12 rounded-full border border-gray-300 cursor-pointer"
          onClick={toggleDropdown}
          ref={exceptionRef}
        />

        {isOpen && (
          <ClickOutside
            exceptionRef={exceptionRef}
            onClick={closeDropdown}
            className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-lg shadow-md"
          >
            <ul className="py-2 text-gray-700">
              {/* <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => console.log("Profile clicked")}
              >
                {t('profile')}
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => console.log("Settings clicked")}
              >
                {t('settings')}
              </li> */}
              <Link to="/auth/logout">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                  onClick={() => console.log("Logout clicked")}
                >
                  {t("logout")}
                </li>
              </Link>
            </ul>
          </ClickOutside>
        )}
      </div>
    </header>
  );
};

export default Header;