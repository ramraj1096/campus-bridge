import React, { useContext, useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import { AuthContext } from "../../auth/AuthProvider";
import { toast } from "react-toastify";

export const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const studentId = localStorage.getItem("student_id");
  console.log(studentId);
  useEffect(() => {
    if (!studentId) {
      console.error("Student ID not found in localStorage");
      setLoading(false);
      return;
    }

    axios
      .get(`/api/course/faculty/67f9542b67cf8a70b0687a8c/${studentId}`)
      .then((response) => {
        if (response.data.success) {
          setCourses(response.data.courses);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  const handleEnroll = async (courseId) => {
    try {
      const res = await axios.post(`/api/course/${courseId}/enroll`, {
        studentId,
      });

      if (res.data.success) {
        toast.success("Enrolement added successfully !");
        // Optional: Refresh the course list
        setCourses((prev) => prev.filter((course) => course._id !== courseId));
      } else {
        toast.error("Enrollement Failed");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <div className="p-4">Loading courses...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
      {courses.length === 0 ? (
        <p>No courses found.</p>
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

              <button
                onClick={() => handleEnroll(course._id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
