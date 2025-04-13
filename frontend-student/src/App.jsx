import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import LoginPage from "./pages/LoginPage";
import ForgotOtpPage from "./pages/ForgotOtpPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Myprofile from "./pages/Myprofile.jsx";
import Navbar from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";

// 🛠️ FIXED: These should be imported, NOT exported
import { Dashboard } from "./pages/Explore/Dashboard";
import { MyCourses } from "./pages/Explore/MyCourses";
import { Assignments } from "./pages/Explore/Assignments";
import { Attendence } from "./pages/Explore/Attendence";
import { CodingTracks } from "./pages/Explore/CodingTracks";
import PractiseCompiler from "./pages/Explore/PractiseCompiler";
import { MyProgress } from "./pages/Explore/MyProgress";
import { AiAssitant } from "./pages/Explore/AiAssitant";

import { ExploreFeatures } from "./pages/ExploreFeatures";
import ExploreLayout from "./components/ExploreLayout"; // Sidebar layout wrapper
import CoursesEnrolledByStudent from "./pages/Explore/CoursesEnrolledByStudent.jsx";
import { AssesmentPage } from "./pages/AssesmentPage.jsx";
import JavaTrack from "./pages/JavaTrack.jsx";
import DSATrack from "./pages/DSATrack.jsx";
import PythonTrack from "./pages/PythonTrack.jsx";
import WebDev from "./pages/WebDev.jsx";

import Lectures from "./components/Lectures.jsx";
import JobsPage from "./pages/Explore/JobsPage.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import { PayFees } from "./pages/Explore/PayFees.jsx";

function App() {
  const location = useLocation();
  const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",
    "/verify-otp",
  ];

  const isAuthRoute =
    authRoutes.includes(location.pathname) ||
    matchPath("/reset-password/:otp", location.pathname);

  const containerClass = isAuthRoute
    ? "min-h-screen bg-gradient-to-br from-blue-100 to-green-100"
    : "ml-7 mr-7";

  return (
    <div className={containerClass}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      {!isAuthRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<ForgotOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:otp" element={<ResetPasswordPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<Myprofile />} />
        <Route path="/assessment/:id" element={<AssesmentPage />} />
        <Route path="/track/java" element={<JavaTrack />} />
        <Route path="/track/dsa" element={<DSATrack />} />
        <Route path="/track/python" element={<PythonTrack />} />
        <Route path="/track/webDev" element={<WebDev />} />

        {/*  NESTED SIDEBAR ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/Explore-Features" element={<ExploreLayout />}>
            <Route index element={<ExploreFeatures />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="My-Courses" element={<MyCourses />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Attendence" element={<Attendence />} />
            <Route path="Coding-Tracks" element={<CodingTracks />} />
            <Route path="Practise-Compiler" element={<PractiseCompiler />} />
            <Route path="My-Progress" element={<MyProgress />} />
            <Route path="AI-Assistant" element={<AiAssitant />} />
            <Route path="Lectures" element={<Lectures />} />
            <Route path="Apply-Jobs" element={<JobsPage />} />
            <Route path="Fees" element={<PayFees />} />
            <Route
              path="enrolled-students"
              element={<CoursesEnrolledByStudent />}
            />
          </Route>
        </Route>
      </Routes>

      {!isAuthRoute && <Footer />}
    </div>
  );
}

export default App;
