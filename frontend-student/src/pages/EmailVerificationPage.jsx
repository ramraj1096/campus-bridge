import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { verifyOtp } from "../apis/otpApi";
import { register } from "../apis/userApi";

const EmailVerificationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("registerData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserData(parsed);
      } catch (err) {
        toast.error("Invalid session data.");
        navigate("/register");
      }
    } else {
      toast.error("Session expired. Please register again.");
      navigate("/register");
    }
  }, []);

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const focusIndex = newCode.includes("") ? newCode.indexOf("") : 5;
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const verificationCode = code.join("");

    if (!userData?.email) {
      toast.error("Missing email info. Please start over.");
      navigate("/register");
      return;
    }

    try {
      setIsLoading(true);
      console.log(verificationCode, userData);
      const response = await verifyOtp({
        otp: verificationCode,
        email: userData.email,
      });

      if (response.success) {
        toast.success("Email verified successfully!");

        const registerUser = await register(userData);
        if (registerUser.success) {
          toast.success(registerUser.message);
          sessionStorage.removeItem("registerData");
          navigate("/login");
        } else {
          toast.error(registerUser.message || "Registration failed.");
        }
      } else {
        toast.error(response.message || "Invalid code. Please try again.");
        sessionStorage.removeItem("registerData");
        navigate("/register");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Verification failed. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-submit when all 6 digits are entered
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <motion.div
        className="w-full max-w-lg p-10 text-white bg-gray-900 shadow-xl rounded-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="mb-6 text-3xl font-bold text-center">
          Verify Your Email
        </h2>
        <p className="mb-6 text-center text-gray-300">
          Enter the 6-digit code sent to your email address.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-between gap-4">
            {code.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="text-3xl font-bold text-center text-white bg-gray-700 border-2 border-gray-600 rounded-lg w-14 h-14 focus:border-green-500 focus:outline-none"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              />
            ))}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full py-3 font-bold bg-purple-500 rounded-xl hover:bg-purple-600 focus:outline-none disabled:opacity-50"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </motion.form>
      </motion.div>

      <div className="mt-4 text-sm text-center">
        <Link
          to="/register"
          className="flex items-center justify-center text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sign Up
        </Link>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
