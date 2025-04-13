import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import {
  EnvelopeIcon,
  UserIcon,
  BookOpenIcon,
  IdentificationIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/faculty/faculty-profile",
        {
          headers: {
            token: localStorage.getItem("FacultyToken"),
          },
        }
      );

      if (response.data.success) {
        setFaculty(response.data.faculty);
      }
    } catch (error) {
      console.error("Error while fetching profile:", error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    faculty && (
      <div className="max-w-5xl mx-auto mt-12 px-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-8 items-start bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {/* Image */}
          <img
            className="w-40 h-48 object-cover rounded-md border border-gray-300 shadow-sm"
            src={faculty.image}
            alt={faculty.name}
          />

          {/* Details - shifted a bit lower */}
          <div className="flex flex-col gap-3 mt-20 sm:mt-22">
            <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-indigo-500" />
              {faculty.name}
            </h1>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <EnvelopeIcon className="h-4 w-4 text-blue-500" />
              {faculty.email}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <BookOpenIcon className="h-4 w-4 text-emerald-500" />
              <span className="font-medium text-gray-700">
                {faculty.profile}
              </span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-200" />

        {/* Detailed Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase mb-1">
              Subject
            </p>
            <p className="text-base text-gray-800">{faculty.subject}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase mb-1">
              Experience
            </p>
            <p className="text-base text-gray-800">
              {faculty.experience} years
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 font-semibold uppercase mb-1">
              Description
            </p>
            <p className="text-base text-gray-800 leading-relaxed">
              {faculty.description}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase mb-1">
              Faculty ID
            </p>
            <p className="text-base text-gray-800 flex items-center gap-2">
              <IdentificationIcon className="h-5 w-5 text-indigo-400" />
              {faculty.id}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase mb-1">
              Subject ID
            </p>
            <p className="text-base text-gray-800 flex items-center gap-2">
              <ClipboardDocumentListIcon className="h-5 w-5 text-green-400" />
              {faculty.subjectId}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default FacultyProfile;
