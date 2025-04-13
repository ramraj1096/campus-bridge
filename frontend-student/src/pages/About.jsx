import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl max-w-3xl p-10 text-gray-800"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
          About Campus Bridge
        </h1>

        <p className="text-lg leading-relaxed mb-4">
          <strong>Campus Bridge</strong> is a powerful platform designed to
          streamline communication and management between college
          administrators, faculty, and students. Our mission is to build a
          digital bridge that connects every stakeholder in the educational
          ecosystem—ensuring transparency, efficiency, and collaboration.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>🔹 Simplified faculty management and onboarding</li>
            <li>🔹 Secure and role-based login system</li>
            <li>🔹 Easy access to faculty data and performance insights</li>
            <li>🔹 A responsive and user-friendly interface</li>
            <li>🔹 Built with MERN Stack, Tailwind CSS, and Framer Motion</li>
          </ul>
        </motion.div>

        <p className="mt-6 text-sm text-gray-600 text-center italic">
          Empowering education through innovation ✨
        </p>
      </motion.div>
    </div>
  );
};

export default About;
