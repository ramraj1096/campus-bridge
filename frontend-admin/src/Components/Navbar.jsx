import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("FacultyToken");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md sm:px-10">
      {/* Logo Section */}
      <div className="flex items-center gap-2 text-lg font-semibold text-blue-700">
        <FaUniversity className="text-2xl text-blue-500" />
        <p className="cursor-pointer">Campus Bridge</p>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="px-6 sm:px-10 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow hover:bg-blue-600 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
