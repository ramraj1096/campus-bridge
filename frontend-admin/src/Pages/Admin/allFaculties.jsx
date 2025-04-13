import React, { useContext, useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { FaUser, FaEnvelope, FaBook, FaBriefcase, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
// import AuthProvider, { AuthContext } from '../../Context/AppContext';

const AllFaculties = () => {
  const [faculties, setFaculties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const adminToken = localStorage.getItem("AdminToken");

  const collegeId = "67fa12e9a1e5472ab9e6b801";
  useEffect(() => {
    const fetchFaculties = async () => {
      if (!adminToken) return;
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/faculty/${collegeId}`, {
          withCredentials: true,
        });
        setFaculties(data.faculty || []);
      } catch (error) {
        console.error("Error fetching faculties:", error);
        setError("Failed to load faculties. Please try again later.");
        toast.error("Failed to load faculties.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaculties();
  }, [adminToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 py-10 px-6 sm:px-12">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Faculty Directory
      </motion.h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
            >
              <div className="h-24 w-24 rounded-full bg-gray-200 mb-4 mx-auto"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg mt-10">{error}</div>
      ) : faculties.length === 0 ? (
        <div className="text-center text-gray-600 mt-10 text-lg">No faculties found for this college.</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {faculties.map((faculty) => (
            <motion.div
              key={faculty._id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 border border-blue-100 p-6"
              role="article"
              aria-labelledby={`faculty-name-${faculty._id}`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex justify-center mb-4">
                <img
                  src={faculty.image || 'https://via.placeholder.com/96'}
                  alt={`${faculty.name}'s profile`}
                  className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/96')}
                />
              </div>
              <h3
                id={`faculty-name-${faculty._id}`}
                className="text-xl font-semibold text-blue-700 flex items-center gap-2 mb-3 justify-center sm:justify-start"
              >
                <FaUser className="text-blue-600" />
                {faculty.name || 'Unnamed Faculty'}
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-500" />
                  {faculty.email || 'No email provided'}
                </p>
                <p className="flex items-center gap-2">
                  <FaBook className="text-gray-500" />
                  Subject: {faculty.subject || 'Not specified'}
                </p>
                <p className="flex items-center gap-2">
                  <FaBriefcase className="text-gray-500" />
                  Experience: {faculty.experience ? `${faculty.experience} years` : 'Not specified'}
                </p>
                <p className="flex items-start gap-2">
                  <FaInfoCircle className="text-gray-500 mt-1" />
                  {faculty.description || 'No description available'}
                </p>
                <p>SubjectId:{faculty.subjectId}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AllFaculties;
