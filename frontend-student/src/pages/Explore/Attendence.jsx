import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Attendence = () => {
  const subjects = [
    { code: "CS101", title: "Introduction to Programming", attendance: 92 },
    { code: "CS102", title: "Introduction to Coding", attendance: 85 },
    { code: "CS103", title: "Introduction to Java", attendance: 78 },
    { code: "CS105", title: "Introduction to Python", attendance: 96 },
    { code: "CS106", title: "Introduction to DSA", attendance: 88 },
  ];

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [barColors, setBarColors] = useState([]);

  useEffect(() => {
    const colors = subjects.map(() => getRandomColor());
    setBarColors(colors);
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Attendance</h2>

      <div className="relative flex items-end gap-6 pl-12">
        {/* Y-axis line */}
        <div className="absolute left-10 top-0 h-[400px] w-px bg-gray-400 z-10" />

        {/* Y-axis labels (reversed) */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between h-[400px] text-xs text-gray-500">
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className="h-[40px] flex items-center justify-end pr-2"
            >
              {100 - i * 10}
            </div>
          ))}
        </div>

        {/* Bars */}
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.code}
            className="flex flex-col items-center w-20 group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Bar container */}
            <div
              className="w-full bg-white rounded-md overflow-hidden relative"
              style={{ height: "400px" }}
            >
              <motion.div
                className="w-full absolute bottom-0 rounded-t-md"
                style={{
                  height: (subject.attendance / 100) * 400,
                  backgroundColor: barColors[index],
                }}
              />
            </div>

            {/* Subject Code */}
            <h3 className="text-sm font-semibold text-gray-800 text-center mt-2">
              {subject.code}
            </h3>
            <p className="text-sm text-gray-700">{subject.attendance}%</p>
          </motion.div>
        ))}
      </div>

      {/* X-axis line */}
      <div className="mt-1 ml-12 w-[calc(5*5rem+1rem)] h-px bg-gray-400" />
    </div>
  );
};
