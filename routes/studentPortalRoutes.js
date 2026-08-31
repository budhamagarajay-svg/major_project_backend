import express from "express";

import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAcademicResources,
  createAcademicResource,
  updateAcademicResource,
  deleteAcademicResource,
} from "../controllers/studentPortalController.js";

import {
  getDigitalLearning,
  getDigitalLearningById,
  createDigitalLearning,
  updateDigitalLearning,
  deleteDigitalLearning,
} from "../controllers/digitalLearningController.js";

const router = express.Router();

router.get("/students", getStudents);
router.get("/students/:id", getStudentById);
router.post("/students", createStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

router.get("/academic-resources", getAcademicResources);
router.post("/academic-resources", createAcademicResource);
router.put("/academic-resources/:id", updateAcademicResource);
router.delete("/academic-resources/:id", deleteAcademicResource);

router.get("/digital-learning", getDigitalLearning);
router.get("/digital-learning/:id", getDigitalLearningById);
router.post("/digital-learning", createDigitalLearning);
router.put("/digital-learning/:id", updateDigitalLearning);
router.delete("/digital-learning/:id", deleteDigitalLearning);

export default router;