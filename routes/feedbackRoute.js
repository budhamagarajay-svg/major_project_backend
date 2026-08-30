import express from "express";

import {
  createFeedback,
  getFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", createFeedback);
router.get("/", getFeedback);

export default router;