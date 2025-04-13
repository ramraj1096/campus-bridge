import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Link as LinkIcon } from "lucide-react";

const resources = [
  {
    title: "Python Basics",
    description:
      "Understand syntax, variables, data types, input/output, and basic operators in Python.",
    video: "https://www.youtube.com/embed/_uQrJ0TkZlc",
    link: "https://www.w3schools.com/python/",
  },
  {
    title: "Control Flow & Functions",
    description:
      "Master if-else, loops, functions, parameters, return values, and scope.",
    video: "https://www.youtube.com/embed/TqPzwenhMj0",
    link: "https://realpython.com/defining-your-own-python-function/",
  },
  {
    title: "Lists, Tuples & Dictionaries",
    description:
      "Dive into Python data structures like lists, tuples, sets, and dictionaries with operations.",
    video: "https://www.youtube.com/embed/9Q6sLbz37gk",
    link: "https://docs.python.org/3/tutorial/datastructures.html",
  },
  {
    title: "Object-Oriented Programming",
    description:
      "Learn about classes, objects, inheritance, encapsulation, and polymorphism in Python.",
    video: "https://www.youtube.com/embed/JeznW_7DlB0",
    link: "https://realpython.com/python3-object-oriented-programming/",
  },
  {
    title: "Python Practice & Projects",
    description:
      "Practice problem-solving using Python and build beginner-friendly projects.",
    video: "https://www.youtube.com/embed/8ext9G7xspg",
    link: "https://www.hackerrank.com/domains/tutorials/10-days-of-python",
  },
];

const PythonTrack = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h1
        className="text-4xl font-bold text-center text-emerald-700 mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Python Programming Track
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((topic, idx) => (
          <motion.div
            key={idx}
            className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all p-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-xl font-semibold text-emerald-800 flex items-center gap-2 mb-2">
              <BookOpen size={20} />
              {topic.title}
            </h2>
            <p className="text-gray-600 text-sm mb-3">{topic.description}</p>

            <div className="rounded-md overflow-hidden mb-3">
              <iframe
                src={topic.video}
                title={topic.title}
                className="w-full aspect-video rounded"
                allowFullScreen
              ></iframe>
            </div>

            <a
              href={topic.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1 text-sm font-medium"
            >
              <LinkIcon size={16} />
              Learn More
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PythonTrack;
