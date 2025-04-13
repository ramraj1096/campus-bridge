import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-6">
      <motion.div
        className="bg-white shadow-2xl rounded-2xl w-full max-w-xl p-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg mb-6">
          We'd love to hear from you! Reach out anytime.
        </p>

        <motion.p
          className="text-xl text-blue-500 font-semibold underline hover:text-blue-700 cursor-pointer transition"
          whileHover={{ scale: 1.05 }}
        >
          campusbridge@gmail.com
        </motion.p>

        <p className="mt-6 text-sm text-gray-500">
          Response time: within 1-2 business days 🕓
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;
