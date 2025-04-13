import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Link as LinkIcon, Video } from "lucide-react";

const topics = [
  {
    title: "Arrays & Strings",
    description:
      "Understanding the basics of arrays, strings, sliding window, two-pointer techniques.",
    video: "https://www.youtube.com/embed/B31LgI4Y4DQ",
    link: "https://leetcode.com/tag/array/",
  },
  {
    title: "Linked Lists",
    description:
      "Master singly and doubly linked lists, cycle detection, reversal, and merging techniques.",
    video: "https://www.youtube.com/embed/q8gdBn9RPeI",
    link: "https://leetcode.com/tag/linked-list/",
  },
  {
    title: "Stacks & Queues",
    description:
      "Explore stack, queue, circular queue, deque, and their applications in problems like next greater element.",
    video: "https://www.youtube.com/embed/jDM6_TnYIqE",
    link: "https://leetcode.com/tag/stack/",
  },
  {
    title: "Trees & Binary Search Trees",
    description:
      "Dive into binary trees, tree traversal, BST operations, and recursion patterns.",
    video: "https://www.youtube.com/embed/fAAZixBzIAI",
    link: "https://leetcode.com/tag/tree/",
  },
  {
    title: "Dynamic Programming",
    description:
      "Learn overlapping subproblems, optimal substructure, memoization, and tabulation.",
    video: "https://www.youtube.com/embed/Wo8pY4yJvFQ",
    link: "https://leetcode.com/tag/dynamic-programming/",
  },
];

const DSATrack = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h1
        className="text-4xl font-bold text-center text-indigo-700 mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        DSA Learning Track
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {topics.map((topic, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-xl font-semibold text-indigo-800 mb-2 flex items-center gap-2">
              <BookOpen size={20} /> {topic.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">{topic.description}</p>

            <div className="rounded-md overflow-hidden mb-3">
              <iframe
                src={topic.video}
                title={`Video for ${topic.title}`}
                className="w-full aspect-video"
                allowFullScreen
              ></iframe>
            </div>

            <a
              href={topic.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline"
            >
              <LinkIcon size={16} />
              Practice on LeetCode
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DSATrack;
