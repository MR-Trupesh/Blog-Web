/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar({ isOpen, onClose }) {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("role");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-end transition-opacity duration-300 ease-in-out">
          <div className="bg-white w-64 h-full shadow-xl transform transition-transform duration-300 ease-in-out rotate-y-0 hover:rotate-y-1">
            <div className="flex justify-between items-center p-4 border-b">
              <h1 className="text-xl font-semibold">Sidebar</h1>
              <button
                onClick={onClose}
                className="text-2xl font-bold transition-transform hover:scale-110"
              >
                ✖
              </button>
            </div>
            {role === "admin" && (
              <ul className="p-4 space-y-2">
                <li className="mb-2">
                  <Link
                    to="/admin"
                    className="block p-2 rounded hover:bg-gray-200 transition-colors duration-300"
                  >
                    Admin Dashboard
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/Post"
                    className="block p-2 rounded hover:bg-gray-200 transition-colors duration-300"
                  >
                    Post
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    onClick={handleSignOut}
                    to="/"
                    className="block p-2 rounded hover:bg-gray-200 transition-colors duration-300"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            )}
            {role === "editor" && (
              <ul>
                <li>
                  <Link
                    to="/editor"
                    className="block p-2 rounded hover:bg-gray-200 transition-colors duration-300"
                  >
                    Editor Dashboard
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    onClick={handleSignOut}
                    to="/"
                    className="block p-2 rounded hover:bg-gray-200 transition-colors duration-300"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
