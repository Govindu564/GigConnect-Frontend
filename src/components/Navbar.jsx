import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userInitial, setUserInitial] = useState("U");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    setUserRole(role || "freelancer");
    if (username) setUserInitial(username[0].toUpperCase());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setMenuOpen(false);
    navigate("/auth");
  };

  const menuItems =
    userRole === "client"
      ? [
          { label: " Home", path: "/client-dashboard" },
          { label: " Your Gigs", path: "/client/gigs" },
        ]
      : [
          { label: " Home", path: "/freelancer-dashboard" },
          { label: " My Applications", path: "/freelancer/applications" },
        ];

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <h1
        onClick={() =>
          navigate(
            userRole === "client"
              ? "/client-dashboard"
              : "/freelancer-dashboard"
          )
        }
        className="text-xl font-semibold text-blue-600 cursor-pointer"
      >
        GigConnect
      </h1>

      <div className="relative">
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold cursor-pointer hover:bg-blue-600 transition-all"
        >
          {userInitial}
        </div>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100">
            <ul className="text-gray-700">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block px-4 py-2 hover:bg-blue-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 bg-white text-blue-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
