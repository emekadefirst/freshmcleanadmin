import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-semibold">Logging out...</h1>
    </div>
  );
};

export default Logout;