import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useAuthStore();

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCustomer = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${api}/getAdmin/${userId}`);
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
          <h1 className="font-semibold text-xl">Loading...</h1>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="flex justify-between items-center px-6 py-[8px] bg-white border-b shadow-sm">
        <div className="text-lg font-bold">
          <h1 className="font-semibold text-xl">Welcome</h1>
        </div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center px-6 py-[8px] bg-white border-b shadow-sm">
      <div className="text-lg font-bold">
        <h1 className="font-semibold text-xl">Welcome {user?.name || ""}</h1>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={
            // user?.profileImage ||
            "https://avatars.dicebear.com/api/avataaars/random.svg"
          }
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;