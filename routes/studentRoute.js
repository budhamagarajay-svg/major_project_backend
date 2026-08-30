import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

const uploadDir = "uploads/students";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

router.get("/", getStudents);

router.get("/:id", getStudentById);

router.post("/", upload.single("image"), createStudent);

router.put("/:id", upload.single("image"), updateStudent);

router.delete("/:id", deleteStudent);

export default router;