import express from "express";

import {
  getDigitalLearning,
  getDigitalLearningById,
  createDigitalLearning,
  updateDigitalLearning,
  deleteDigitalLearning,
} from "../controllers/digitalLearningController.js";

const router = express.Router();

router.get("/", getDigitalLearning);
router.get("/:id", getDigitalLearningById);
router.post("/", createDigitalLearning);
router.put("/:id", updateDigitalLearning);
router.delete("/:id", deleteDigitalLearning);

export default router;