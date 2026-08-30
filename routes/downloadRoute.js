import express from "express";

import {
  getDownloads,
  addDownload,
  deleteDownload,
} from "../controllers/downloadController.js";

const router = express.Router();

router.get("/", getDownloads);
router.post("/", addDownload);
router.delete("/:id", deleteDownload);

export default router;