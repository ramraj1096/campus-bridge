import React, { useContext, useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import { AuthContext } from "../../auth/AuthProvider";

const CoursesEnrolledByStudent = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const studentId = user?._id;

  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`/api/course/enrolled/${studentId}`)
      .then((response) => {
        if (response.data.success) {
          setCourses(response.data.courses || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching enrolled courses:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  if (loading) return <div className="p-4">Loading enrolled courses...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p>You are not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border border-gray-300 rounded-lg p-4 shadow-md bg-white"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Code:</strong> {course.code}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Semester:</strong> {course.semester}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Department:</strong> {course.department}
              </p>
              <p className="mt-2 text-gray-700 text-sm">{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesEnrolledByStudent;
