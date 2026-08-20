import express from "express";

import {
  getDownloads,
  addDownload,
} from "../controllers/downloadController.js";

const router = express.Router();

router.get("/", getDownloads);

router.post("/", addDownload);

export default router;