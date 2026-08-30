import express from "express";

import {
  getGallery,
  addGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);

router.post("/", addGallery);

router.put("/:id", updateGallery);

router.delete("/:id", deleteGallery);

export default router;