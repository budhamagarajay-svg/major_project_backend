import express from "express";

import {
  getScholarships,
  addScholarship,
} from "../controllers/scholarshipController.js";

const router = express.Router();

router.get("/", getScholarships);

router.post("/", addScholarship);

export default router;