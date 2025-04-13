import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider.jsx";
import { assets } from "../assets/assets.js";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Track dropdown state

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility on profile click
  };

  return (
    <nav className="flex items-center justify-between py-4 px-4 md:px-8 shadow-lg bg-white sticky top-0 z-50">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="text-2xl">🎓</div>
        <p className="text-xl font-extrabold text-blue-700">Campus Bridge</p>
      </div>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex gap-8 text-lg font-medium text-gray-700">
        {["Home", "About", "Contact", "Explore Features"].map(
          (label, index) => (
            <NavLink
              key={index}
              to={`/${
                label === "Home" ? "" : label.toLowerCase().replace(" ", "-")
              }`}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-500 transition"
              }
            >
              <li className="py-1 cursor-pointer">{label}</li>
            </NavLink>
          )
        )}
      </ul>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <div className="relative">
            <div
              onClick={handleProfileClick} // Open dropdown on profile click
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                src={user.image}
                alt="User"
              />
              <img
                src={assets.dropdown_icon}
                className="w-4"
                alt="Dropdown Icon"
              />
            </div>

            {/* Profile Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-48 text-gray-700 text-sm z-50">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={logout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/register")}
            className="hidden md:block px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md z-50 transition-transform duration-300 ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-2">
            <div className="text-xl">🎓</div>
            <span className="text-lg font-bold text-blue-700">
              Campus Bridge
            </span>
          </div>
          <img
            className="w-6 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <ul className="flex flex-col p-5 gap-4 text-lg font-medium text-gray-700">
          {["Home", "About", "Contact", "Explore Features"].map(
            (label, index) => (
              <NavLink
                key={index}
                to={`/${
                  label === "Home" ? "" : label.toLowerCase().replace(" ", "-")
                }`}
                onClick={() => setShowMenu(false)}
              >
                <li className="hover:text-blue-500">{label}</li>
              </NavLink>
            )
          )}
          {!isAuthenticated && (
            <li
              onClick={() => {
                setShowMenu(false);
                navigate("/register");
              }}
              className="text-blue-600 font-semibold"
            >
              Create Account
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
