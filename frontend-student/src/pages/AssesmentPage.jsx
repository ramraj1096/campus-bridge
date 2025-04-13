import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axiosConfig";

export const AssesmentPage = () => {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axios.get(`/api/assesment/${id}`);
        if (response.data.success) {
          setAssessment(response.data.assessment);
        }
      } catch (error) {
        console.error("Error fetching assessment:", error);
      }
    };

    fetchAssessment();
  }, [id]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    assessment.questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        correct += 1;
      }
    });
    setScore(correct);
    setSubmitted(true);
  };

  if (!assessment) return <div className="p-4">Loading assessment...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{assessment.title}</h1>
        <p className="text-gray-600 mt-2">{assessment.description}</p>
        <p className="text-sm text-gray-500 mt-1">
          Due Date:{" "}
          <span className="font-semibold">
            {new Date(assessment.dueDate).toLocaleDateString()}
          </span>
        </p>
      </div>

      <div className="space-y-6">
        {assessment.questions.map((question, index) => (
          <div
            key={question._id}
            className="p-5 border rounded-lg bg-white shadow-md"
          >
            <p className="font-semibold mb-3 text-lg">
              {index + 1}. {question.questionText}
            </p>

            <div className="space-y-2">
              {question.options.map((opt, idx) => {
                const isSelected = answers[question._id] === opt;
                const isCorrect = question.correctAnswer === opt;

                let optionClass = "text-gray-700";
                if (submitted) {
                  if (isCorrect) optionClass = "text-green-600 font-medium";
                  else if (isSelected && !isCorrect)
                    optionClass = "text-red-600 font-medium";
                }

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer ${
                      isSelected
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    } ${submitted ? "cursor-not-allowed" : ""}`}
                  >
                    <input
                      type="radio"
                      name={question._id}
                      value={opt}
                      disabled={submitted}
                      checked={isSelected}
                      onChange={() => handleOptionChange(question._id, opt)}
                    />
                    <span className={`${optionClass}`}>{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      ) : (
        <div className="mt-6 text-xl font-semibold text-green-600">
          ✅ You got {score} out of {assessment.questions.length} correct!
        </div>
      )}
    </div>
  );
};
