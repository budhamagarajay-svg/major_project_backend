import express from "express";

import {
    getGallery,
    addGallery,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);

router.post("/", addGallery);

export default router;