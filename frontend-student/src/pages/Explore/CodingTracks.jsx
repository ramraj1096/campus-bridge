import React from "react";
import { useNavigate } from "react-router-dom";

const tracks = [
  {
    name: "Java",
    description: "Master Java programming with structured problems and OOP.",
    image: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
  },
  {
    name: "DSA",
    description: "Strengthen your Data Structures and Algorithms skills.",
    image: "https://cdn-icons-png.flaticon.com/512/2721/2721623.png",
  },
  {
    name: "Python",
    description: "Learn Python from basics to advanced scripting.",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
  },
  {
    name: "WebDev",
    description: "Frontend + Backend journey with real projects.",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
  },
];

export const CodingTracks = () => {
  const navigate = useNavigate();

  const handleGoToTrack = (trackName) => {
    navigate(`/track/${trackName.toLowerCase()}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Explore Coding Tracks
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track, index) => (
          <div
            key={index}
            className="bg-white shadow-md border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <img
              src={track.image}
              alt={track.name}
              className="w-20 h-20 object-contain mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {track.name}
            </h2>
            <p className="text-gray-600 mb-4 text-sm">{track.description}</p>
            <button
              onClick={() => handleGoToTrack(track.name)}
              className="mt-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition"
            >
              Go to Track →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
