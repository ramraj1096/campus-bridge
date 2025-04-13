import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, PlayCircle, ExternalLink } from "lucide-react";

const JavaTrack = () => {
  const navigate = useNavigate();

  const handleStartCoding = () => {
    navigate("/track/java/problems");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-2">Java Track</h1>
      <p className="text-gray-600 mb-6">
        Welcome to the Java Track! This course covers the fundamentals of Java
        programming, object-oriented concepts, and practice problems to become
        interview ready.
      </p>

      {/* ✅ Embedded Video Tutorial */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
          <PlayCircle className="text-blue-600" /> Video Tutorials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <iframe
            className="w-full aspect-video rounded-xl"
            src="https://www.youtube.com/embed/UmnCZ7-9yDY"
            title="Java Full Course"
            allowFullScreen
          ></iframe>
          <iframe
            className="w-full aspect-video rounded-xl"
            src="https://www.youtube.com/embed/A74TOX803D0"
            title="Java in One Shot"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* ✅ Online Resources */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
          <BookOpen className="text-green-600" /> Learning Resources
        </h2>
        <ul className="list-disc list-inside text-blue-700 space-y-2 text-sm">
          <li>
            <a
              href="https://www.geeksforgeeks.org/java/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              GeeksforGeeks Java Guide <ExternalLink size={14} />
            </a>
          </li>
          <li>
            <a
              href="https://docs.oracle.com/javase/tutorial/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              Official Java Tutorials (Oracle) <ExternalLink size={14} />
            </a>
          </li>
          <li>
            <a
              href="https://www.w3schools.com/java/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              W3Schools Java Basics <ExternalLink size={14} />
            </a>
          </li>
          <li>
            <a
              href="https://javarevisited.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              JavaRevisited Blog <ExternalLink size={14} />
            </a>
          </li>
        </ul>
      </div>

      {/* ✅ CTA Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleStartCoding}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Start Solving Java Problems →
        </button>
      </div>
    </div>
  );
};

export default JavaTrack;
