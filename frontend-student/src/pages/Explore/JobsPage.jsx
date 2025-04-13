import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs");
        console.log(res.data.jobs);
        setJobs(res.data.jobs);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Explore Jobs
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-indigo-600 mb-2">
              {job.title}
            </h2>
            <p className="text-sm text-gray-500 mb-1">
              <strong>Company:</strong> {job.company}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              <strong>Salary:</strong> ₹{job.salaryRange.min.toLocaleString()} -
              ₹{job.salaryRange.max.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              <strong>Deadline:</strong>{" "}
              {format(new Date(job.deadline), "dd MMM yyyy")}
            </p>
            <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">
              {job.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-600 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
            {/* Conditionally show Apply button if not In College and applyLink exists */}
            {job.location !== "In College" && job.applyLink && (
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded hover:bg-indigo-700 transition"
              >
                Apply
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
