import React from "react";

export const MyProgress = () => {
  const subjects = [
    { code: "CS101", title: "Introduction to Programming", attendance: 92 },
    { code: "CS102", title: "Introduction to Coding", attendance: 85 },
    { code: "CS103", title: "Introduction to Java", attendance: 78 },
    { code: "CS105", title: "Introduction to Python", attendance: 96 },
    { code: "CS106", title: "Introduction to DSA", attendance: 88 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Student Progress</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {subjects.map((subject) => (
          <div
            key={subject.code}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {subject.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Code:</strong> {subject.code}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className={`h-4 rounded-full ${
                  subject.attendance >= 85
                    ? "bg-green-500"
                    : subject.attendance >= 75
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${subject.attendance}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-700">
              progress:{" "}
              <span className="font-semibold">{subject.attendance}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
