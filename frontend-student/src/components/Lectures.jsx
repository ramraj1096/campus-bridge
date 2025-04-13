import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Lectures() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get("/api/lecture");
        if (response.data.success) {
          setLectures(response.data.materials); // Set the materials array in the state
        } else {
          setError("Failed to fetch materials");
        }
      } catch (err) {
        console.error("Error fetching lectures:", err);
        setError("Failed to fetch lectures");
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8">Lectures</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <motion.div
            key={lecture._id}
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {lecture.title}
            </h2>
            <p className="text-gray-700 mb-4">{lecture.description}</p>
            <p className="text-gray-500 italic mb-4">{lecture.topic}</p>
            <motion.div
              className="relative w-full h-0 pt-[56.25%] bg-gray-100 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={lecture.fileUrl.replace("watch?v=", "embed/")}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={lecture.title}
              ></iframe>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Lectures;
