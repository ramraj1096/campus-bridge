import React from "react";
import { motion } from "framer-motion";
import { Code2, Link } from "lucide-react";

const resources = [
  {
    title: "HTML Basics",
    description:
      "Learn the building blocks of every web page — HTML structure, tags, and layout.",
    video: "https://www.youtube.com/embed/UB1O30fR-EE",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    title: "CSS Styling",
    description:
      "Style your web pages with CSS — colors, layouts, responsiveness and animations.",
    video: "https://www.youtube.com/embed/yfoY53QXEnI",
    link: "https://css-tricks.com/",
  },
  {
    title: "JavaScript Essentials",
    description:
      "Make your websites interactive with JavaScript — functions, DOM, events, and logic.",
    video: "https://www.youtube.com/embed/hdI2bqOjy3c",
    link: "https://javascript.info/",
  },
  {
    title: "React for Frontend",
    description:
      "Build dynamic UIs using React — components, state, props, hooks and routing.",
    video: "https://www.youtube.com/embed/bMknfKXIFA8",
    link: "https://reactjs.org/docs/getting-started.html",
  },
  {
    title: "Backend Basics",
    description:
      "Understand how the backend works using Node.js, Express, and simple REST APIs.",
    video: "https://www.youtube.com/embed/Oe421EPjeBE",
    link: "https://expressjs.com/",
  },
];

const WebDev = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h1
        className="text-4xl font-bold text-center text-blue-700 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Full Stack Web Development Track 🌐
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white border rounded-xl shadow-md hover:shadow-lg p-5 transition-all"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-2">
              <Code2 size={20} />
              {item.title}
            </h2>
            <p className="text-gray-600 text-sm mb-3">{item.description}</p>

            <div className="rounded overflow-hidden mb-3">
              <iframe
                src={item.video}
                title={item.title}
                className="w-full aspect-video rounded"
                allowFullScreen
              ></iframe>
            </div>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1 text-sm font-medium"
            >
              <Link size={16} />
              Resource Link
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WebDev;
