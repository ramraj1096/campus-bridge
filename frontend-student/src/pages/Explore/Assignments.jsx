import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Assignments = () => {
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await axios.get("/api/assesment"); // adjust if needed
        if (res.data.success) {
          console.log(res.data.assessments);
          setAssessments(res.data.assessments);
        }
      } catch (error) {
        console.error("Failed to fetch assessments", error);
      }
    };

    fetchAssessments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Assessments</h1>

      {assessments.map((assessment) => (
        <div
          key={assessment._id}
          className="border rounded-md shadow p-4 mb-6 bg-white"
        >
          <h2 className="text-xl font-semibold">{assessment.title}</h2>
          <p className="text-sm text-gray-600">{assessment.description}</p>

          <p className="mt-2">
            <strong>Type:</strong> {assessment.type}
          </p>
          <p>
            <strong>Total Marks:</strong> {assessment.totalMarks}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(assessment.dueDate).toLocaleDateString()}
          </p>

          <button
            onClick={() => navigate(`/assessment/${assessment._id}`)}
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Go to Assessment
          </button>
        </div>
      ))}
    </div>
  );
};
