import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");

    navigate("/auth/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-semibold">Logging out...</h1>
    </div>
  );
};

export default Logout;