import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { login } from "../apis/userApi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader immediately

    try {
      const response = await login({ email, password });

      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("student_id", response.student?._id);
        console.log(response.student?._id);
        navigate("/");
      } else {
        toast.error(response.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false); // Always hide loader after response
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <motion.div
        className="w-full max-w-md p-8 text-white bg-gray-900 shadow-2xl rounded-2xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="cursor-pointer w-full py-3 font-bold bg-purple-500 rounded-xl hover:bg-purple-600 focus:outline-none"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="mx-auto animate-spin" size={24} />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </p>
        </div>

        <div className="mt-2 text-center">
          <p>
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot your password?
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
