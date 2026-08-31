import express from "express";

import {
  getResults,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
} from "../controllers/resultController.js";

const router = express.Router();

router.get("/", getResults);

router.get("/:id", getResultById);

router.post("/", createResult);

router.put("/:id", updateResult);

router.delete("/:id", deleteResult);

export default router;