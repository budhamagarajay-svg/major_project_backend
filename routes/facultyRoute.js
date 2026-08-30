import express from "express";

import {
  getFaculty,
  addFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";

const router = express.Router();

router.get("/", getFaculty);

router.post("/", addFaculty);

router.put("/:id", updateFaculty);

router.delete("/:id", deleteFaculty);

export default router;