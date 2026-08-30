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

export default router;