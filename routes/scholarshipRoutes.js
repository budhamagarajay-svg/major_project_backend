import express from "express";

import {
  getScholarships,
  addScholarship,
  updateScholarship,
  deleteScholarship,
} from "../controllers/scholarshipController.js";

const router = express.Router();

router.get("/", getScholarships);

router.post("/", addScholarship);

router.put("/:id", updateScholarship);

router.delete("/:id", deleteScholarship);

export default router;