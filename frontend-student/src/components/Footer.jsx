import React from "react";
import { Mail, Phone, ShieldCheck, Info, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 mt-32 pt-14 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 pb-10 text-sm">
        {/* Brand Info */}
        <div>
          <h1 className="text-blue-500 text-3xl font-semibold mb-4 text-primary">
            Campus Bridge
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-xs">
            Campus Bridge is your trusted platform for managing doctor
            consultations and appointments, providing seamless and efficient
            healthcare access.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="mb-4 text-lg font-semibold text-gray-800">Company</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <Link
              to="/"
              className="hover:text- transition flex items-center gap-2"
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-primary transition flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-primary transition flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </Link>
            <Link
              to="/privacy-policy"
              className="hover:text-primary transition flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Privacy Policy
            </Link>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="mb-4 text-lg font-semibold text-gray-800">
            Get in Touch
          </p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +91 8639141744
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              campusbridge@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <p className="text-center text-xs text-gray-500 py-5">
          &copy; 2025 Campus Bridge — All rights reserved.
        </p>
      </div>
    </footer>
  );
};
