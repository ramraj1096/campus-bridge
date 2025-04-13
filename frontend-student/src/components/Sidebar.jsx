import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Import icons from react-icons (using Material Design and Font Awesome icons)
import {
  MdDashboard,
  MdLibraryBooks,
  MdCode,
  MdEvent,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";
import { FaRegFileAlt, FaTerminal, FaChartLine, FaRobot } from "react-icons/fa";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Navigation items with icon, display name and path (adjust as needed)
  const navItems = [
    { name: "Dashboard", icon: <MdDashboard size={24} />, path: "/Dashboard" },
    {
      name: "My Courses",
      icon: <MdLibraryBooks size={24} />,
      path: "/My Courses",
    },
    {
      name: "Enrolled Courses",
      icon: <FaRobot size={24} />,
      path: "/enrolled-students",
    },
    {
      name: "Assignments",
      icon: <FaRegFileAlt size={24} />,
      path: "/Assignments",
    },
    { name: "Attendence", icon: <MdEvent size={24} />, path: "/Attendence" },
    {
      name: "Lectures",
      icon: <FaRobot size={24} />,
      path: "/Lectures",
    },
    {
      name: "Coding Tracks",
      icon: <MdCode size={24} />,
      path: "/Coding Tracks",
    },
    {
      name: "Practise Compiler",
      icon: <FaTerminal size={24} />,
      path: "/Practise Compiler",
    },
    {
      name: "My Progress",
      icon: <FaChartLine size={24} />,
      path: "/My Progress",
    },
    {
      name: "Apply Jobs",
      icon: <FaChartLine size={24} />,
      path: "/Apply-Jobs",
    },
    {
      name: "AI Assistant",
      icon: <FaRobot size={24} />,
      path: "/AI Assistant",
    },
    {
      name: "Fees",
      icon: <FaRobot size={24} />,
      path: "/Fees",
    },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-screen fixed left-0 top-0 ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300`}
    >
      {/* Header with app title and collapse toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-bold">My App</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 focus:outline-none"
        >
          {collapsed ? <MdExpandMore size={24} /> : <MdExpandLess size={24} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col mt-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center py-3 px-4 hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <div className="mr-3">{item.icon}</div>
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
