import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Mocked student data
  const student = {
    name: user?.name,
    enrolledCourses: 5,
    codingProgress: 72,
    totalHours: 120,
    upcomingAssignments: [
      { title: "Data Structures Quiz", dueDate: "2025-04-15" },
      { title: "JS Project Submission", dueDate: "2025-04-18" },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Welcome, {student.name}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Courses Enrolled */}
        <div className="bg-white shadow-md hover:shadow-xl rounded-lg p-5 text-center transition-all">
          <h2 className="text-lg font-medium text-gray-600">
            Courses Enrolled
          </h2>
          <p className="text-2xl font-bold text-indigo-600">
            {student.enrolledCourses}
          </p>
        </div>

        {/* Coding Progress with Progress Bar */}
        <div className="bg-white shadow-md hover:shadow-xl rounded-lg p-5 text-center transition-all">
          <h2 className="text-lg font-medium text-gray-600">Coding Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${student.codingProgress}%`,
                backgroundColor:
                  student.codingProgress >= 85
                    ? "green"
                    : student.codingProgress >= 50
                    ? "yellow"
                    : "red",
              }}
            ></div>
          </div>
          <p className="text-2xl font-bold text-green-500 mt-2">
            {student.codingProgress}%
          </p>
        </div>

        {/* Total Hours */}
        <div className="bg-white shadow-md hover:shadow-xl rounded-lg p-5 text-center transition-all">
          <h2 className="text-lg font-medium text-gray-600">Total Hours</h2>
          <p className="text-2xl font-bold text-blue-500">
            {student.totalHours}
          </p>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white shadow-md hover:shadow-xl rounded-lg p-5 text-center transition-all">
          <h2 className="text-lg font-medium text-gray-600">Upcoming Tasks</h2>
          <p className="text-2xl font-bold text-red-500">
            {student.upcomingAssignments.length}
          </p>
        </div>
      </div>

      {/* Upcoming Assignments */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upcoming Assignments
        </h2>
        <ul className="divide-y divide-gray-200">
          {student.upcomingAssignments.map((assignment, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span className="text-gray-800">{assignment.title}</span>
              <span className="text-sm text-gray-500">
                Due: {assignment.dueDate}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Dashboard };
