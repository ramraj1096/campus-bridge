import express from "express";
import {
  addFaculty,
  editFaculty,
  loginFaculty,
  logoutFaculty,
  getFacultyProfile,
  meFaculty,
  getAllFacultyByCollege
} from "../controllers/facultyController.js";

import {
  addFacultyValidation,
  editFacultyValidation,
} from "../middlewares/facultyValidations.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import upload from "../middlewares/upload.js";
import { authentiFaculty } from "../middlewares/auth.js";

const router = express.Router();

// POST /api/faculty/register
router.post(
  "/register",
  addFaculty
);

// POST /api/faculty/login
router.post("/login", loginFaculty);
router.get("/faculty-profile", authentiFaculty, getFacultyProfile);
router.get("/:collegeId", getAllFacultyByCollege)

// GET /api/faculty/:id
//router.get("/:id", getFaculty);

// PUT /api/faculty/:id
router.put(
  "/:id",
  upload.single("file"),
  editFacultyValidation,
  handleValidationErrors,
  editFaculty
);

// GET /api/faculty/college/:collegeId
//router.get("/college/:collegeId", getAllFacultyByCollege);

// Route to handle Faculty logout
router.post("/logout", logoutFaculty);

// Route to fetch the faculty profile (protected route)


// Route to get the logged-in faculty’s data (protected route)
router.get("/me", authentiFaculty, meFaculty);

export default router;
