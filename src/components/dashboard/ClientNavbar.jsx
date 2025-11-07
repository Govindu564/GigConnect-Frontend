import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

function ClientNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/auth");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1
        className="text-xl font-semibold cursor-pointer"
        onClick={() => navigate("/client")}
      >
        💼 Freelance Portal
      </h1>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md"
        >
          <UserCircle size={24} />
          <span>Menu</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg">
            <button
              onClick={() => navigate("/client-dashboard")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              🏠 Home
            </button>
            <button
              onClick={() => navigate("/client/gigs")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              📋 Your Gigs
            </button>
            <hr />
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default ClientNavbar;
