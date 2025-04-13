import express from "express";
import {
  addLectureMaterial,
  editLectureMaterial,
  getAllLectureMaterials,
  deleteLectureMaterial,
} from "../controllers/lectureMaterialController.js";
import {
  addLectureMaterialValidator,
  editLectureMaterialValidator,
} from "../middlewares/lectureMaterialValidator.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import { authentiFaculty } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/add/:id",
  authentiFaculty,
  addLectureMaterial
);
router.put(
  "/:id",
  upload.single("file"),
  // authentiFaculty,
  editLectureMaterialValidator,
  handleValidationErrors,
  editLectureMaterial
);
router.get("/", authentiFaculty, getAllLectureMaterials);
router.delete("/:id", deleteLectureMaterial);

export default router;
