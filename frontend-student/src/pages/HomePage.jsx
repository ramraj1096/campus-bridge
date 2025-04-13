import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const assets = {
  courses: "https://cdn-icons-png.flaticon.com/512/201/201614.png",
  assignment: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
  codingTracks: "https://cdn-icons-png.flaticon.com/512/2721/2721298.png",
  compiler: "https://cdn-icons-png.flaticon.com/512/3523/3523063.png",
  badges: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  aiDebug: "https://cdn-icons-png.flaticon.com/512/4712/4712100.png",
  jobMatch: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  codeRoom: "https://cdn-icons-png.flaticon.com/512/4213/4213111.png",
  dashboardPreview: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  integrated: "https://cdn-icons-png.flaticon.com/512/1048/1048943.png",
};

const studentFeatures = [
  {
    title: "Access Courses & Materials",
    desc: "Dive into academic courses, download lecture notes, watch recorded sessions, and manage your schedule seamlessly.",
    img: assets.courses,
  },
  {
    title: "Assignments & Attendance",
    desc: "Submit assignments, track deadlines, and monitor attendance with real-time updates.",
    img: assets.assignment,
  },
  {
    title: "Enroll in Coding Tracks",
    desc: "Master DSA, Web Dev, Python, Java, and more with structured learning paths.",
    img: assets.codingTracks,
  },
  {
    title: "Built-in Compiler",
    desc: "Code in real-time with a multi-language editor supporting C, C++, Python, and Java.",
    img: assets.compiler,
  },
  {
    title: "Achievements & Heatmaps",
    desc: "Visualize your progress with skill heatmaps, badges, and weekly streaks.",
    img: assets.badges,
  },
  {
    title: "AI Debug Assistant",
    desc: "Get instant AI-powered code debugging, logic hints, and quality feedback.",
    img: assets.aiDebug,
  },
  {
    title: "Job Match Recommender",
    desc: "Discover job opportunities tailored to your skills and portfolio.",
    img: assets.jobMatch,
  },
  {
    title: "Live Code Rooms",
    desc: "Collaborate with peers in real-time coding sessions and hackathons.",
    img: assets.codeRoom,
  },
];

const motionConfig = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.0, type: "spring", stiffness: 50 },
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative bg-gradient-to-br from-green-200 to-cyan-300 text-white py-24 px-8"
      >
        <div className="max-w-xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Campus Bridge
          </motion.h1>
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto"
          >
            Your all-in-one platform to excel in academics, master coding, and
            kickstart your career.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="mt-8 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            Get Started
          </motion.button>
        </div>
      </motion.section>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-12">
            Discover Your Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {studentFeatures.slice(0, 3).map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                initial={motionConfig.initial}
                whileInView={motionConfig.animate}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-lg shadow-md text-center"
              >
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  src={feature.img}
                  alt={feature.title}
                  className="w-24 h-24 mx-auto mb-4 object-contain"
                />
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {studentFeatures.map((feature, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, type: "spring", stiffness: 60 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-12 px-8 py-12 ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <motion.img
            src={feature.img}
            alt={feature.title}
            className="object-contain rounded-lg w-1/5 max-w-[120px]"
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <div className="w-1/3 md:w-1/2 text-center md:text-left">
            <motion.h3
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-indigo-600 mb-4"
            >
              {feature.title}
            </motion.h3>
            <motion.p
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-lg text-gray-600"
            >
              {feature.desc}
            </motion.p>
          </div>
        </motion.section>
      ))}

      <section className="py-20 px-8 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Ready to Transform Your Future?
        </motion.h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of students mastering academics and coding with Campus
          Bridge.
        </p>
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="px-12 py-6 bg-white text-indigo-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            Sign Up Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/about")}
            className="px-12 py-6 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-700 transition"
          >
            Learn More
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
