import express from "express";
import {
  getFeedback,
  createFeedback,
  replyFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/", getFeedback);
router.post("/", createFeedback);
router.patch("/:id/reply", replyFeedback);
router.delete("/:id", deleteFeedback);

export default router;