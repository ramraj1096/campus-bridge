import React, { useState } from "react";
import axios from "axios";

const AddInternships = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    company: "",
    location: "In College",
    salaryMin: "",
    salaryMax: "",
    applyLink: "",
    deadline: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addInternships = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        company: formData.company,
        location: formData.location,
        salaryRange: {
          min: Number(formData.salaryMin),
          max: Number(formData.salaryMax),
        },
        applyLink: formData.applyLink,
        deadline: formData.deadline,
      };

      const response = await axios.post(
        "http://localhost:8000/api/jobs/",
        payload
      );
      setMessage(response.data.message);
      setFormData({
        title: "",
        description: "",
        skills: "",
        company: "",
        location: "Remote",
        salaryMin: "",
        salaryMax: "",
        applyLink: "",
        deadline: "",
      });
    } catch (error) {
      console.error("Failed to add internship:", error);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          Post an Internship
        </h2>
        {message && (
          <div className="mb-4 text-center text-sm text-green-600 font-semibold">
            {message}
          </div>
        )}
        <form onSubmit={addInternships} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Enter job title"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="e.g., Remote or City"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Job description"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">
                Salary Min
              </label>
              <input
                type="number"
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="Minimum Salary"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Salary Max
              </label>
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="Maximum Salary"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700">applyLink</label>
            <input
              type="text"
              name="applyLink"
              value={formData.applyLink}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Enter job Link"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
          >
            Post Internship
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInternships;
