import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaClipboard,
  FaUserCheck,
  FaCode,
  FaTerminal,
  FaChartLine,
  FaRobot,
  FaBars,
} from "react-icons/fa";

const navItems = [
  { path: "Dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "My-Courses", label: "My Courses", icon: <FaBook /> },
  { path: "enrolled-students", label: "Enrolled Courses", icon: <FaBook /> },
  { path: "Assignments", label: "Assignments", icon: <FaClipboard /> },
  { path: "Attendence", label: "Attendance", icon: <FaUserCheck /> },
  { path: "Lectures", label: "Lectures", icon: <FaBook /> },
  { path: "Coding-Tracks", label: "Coding Tracks", icon: <FaCode /> },
  {
    path: "Practise-Compiler",
    label: "Practice Compiler",
    icon: <FaTerminal />,
  },
  { path: "My-Progress", label: "My Progress", icon: <FaChartLine /> },
  { path: "Apply-Jobs", label: "Apply-Jobs", icon: <FaChartLine /> },
  { path: "AI-Assistant", label: "AI Assistant", icon: <FaRobot /> },
  { path: "Fees", label: "Fees", icon: <FaRobot /> },
];

const ExploreLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-slate-900 text-white transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && <h2 className="text-xl font-semibold">Explore</h2>}
          <button
            className="text-white"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <FaBars />
          </button>
        </div>

        <nav className="flex flex-col mt-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-2 text-sm hover:bg-slate-700 transition-all ${
                  isActive ? "bg-slate-700 font-bold" : ""
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ExploreLayout;
