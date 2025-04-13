import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import otpRoute from "./routes/otpRoute.js";
import cookieParser from "cookie-parser";
import collegeRoute from "./routes/collegeRoute.js";
import facultyRoute from "./routes/facultyRoute.js";
import assesmentROute from "./routes/assesmentsRoute.js";
import coadingQuestionsRoute from "./routes/codingQuestionRoute.js";
import coadingQuestionsSubmissionROute from "./routes/codingQuestionSubmissionRoutes.js";
import courseRoute from "./routes/courseRoutes.js";
import jobsRoute from "./routes/jobRoute.js";
import lectureMeterialRoute from "./routes/lectureMeterialRouter.js";
import assesmentSubmissionROute from "./routes/submissionRouter.js";
import aiRoute from "./routes/ai.js";
import FeesRoutes from "./routes/FeesRoutes.js";
const app = express();
dotenv.config();

const MONGODB_URL =
  "mongodb+srv://bandikarthik75:CWYFeZTCRe0sZgRQ@cluster0.aeqdj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = ["http://localhost:5174", "http://localhost:5173"];
app.use(
  cors({
    origin: routes,
    credentials: true,
  })
);
app.use(cookieParser());

//mongodb config .
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("database connection successfull !"))
  .catch((err) => console.log(err));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Health OK!" });
});

// api routes .
app.use("/api/users/", userRoute);
app.use("/api/otp/", otpRoute);
app.use("/api/colleges", collegeRoute);
app.use("/api/faculty", facultyRoute);
app.use("/api/jobs", jobsRoute);
app.use("/api/assesment", assesmentROute);
app.use("/api/assesment-submit", assesmentSubmissionROute);
app.use("/api/coading-questions", coadingQuestionsRoute);
app.use("/api/coading-questions-submission", coadingQuestionsSubmissionROute);
app.use("/api/course", courseRoute);
app.use("/api/lecture", lectureMeterialRoute);
app.use("/api/", aiRoute);
app.use("/api/fees", FeesRoutes);
app.post("/compile", async (req, res) => {
  const { script, language, versionIndex, stdin } = req.body;

  try {
    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      script,
      language,
      versionIndex,
      stdin,
      clientId: "671a34a764ab5a7a5df0a0ec49729b78",
      clientSecret:
        "d44246b7c7e3c10899403df0a043ae2641ea59929c6fa44fbfea1d0760bebddb",
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "JDoodle API error", details: err.message });
  }
});

app.listen(7000, () => {
  console.log("app is running on port 7000");
});
