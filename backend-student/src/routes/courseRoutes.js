import express from "express";
import {
  addCourse,
  editCourse,
  deleteCourse,
  getCourse,
  getAllCoursesByCollegeId,
  enrollStudent,
  getStudentsOfCourse,
  getCoursesByFacultyId,
  getCoursesEnrolledByStudent,
} from "../controllers/courseController.js";

import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import {
  addCourseValidation,
  editCourseValidation,
} from "../middlewares/courseValidation.js";
import { authentiFaculty } from "../middlewares/auth.js";

const router = express.Router();

// POST /api/courses/
router.post("/", addCourseValidation, handleValidationErrors, addCourse);

// PUT /api/courses/:id
router.put(
  "/:id",
  authentiFaculty,
  editCourseValidation,
  handleValidationErrors,
  editCourse
);

// DELETE /api/courses/:id
router.delete("/:id", authentiFaculty, deleteCourse);

// GET /api/courses/:id
router.get("/:id", getCourse);

// GET /api/courses/college/:id
router.get("/college/:id", getAllCoursesByCollegeId);

// POST /api/courses/:courseId/enroll
router.post("/:courseId/enroll", enrollStudent);

// GET /api/courses/:id/students
router.get("/:id/students", authentiFaculty, getStudentsOfCourse);

// GET /api/courses/faculty/:id
router.get("/faculty/:facultyId/:studentId", getCoursesByFacultyId);

// GET /api/courses/enrolled/:studentId
router.get(
  "/enrolled/:studentId",

  getCoursesEnrolledByStudent
);

export default router;
