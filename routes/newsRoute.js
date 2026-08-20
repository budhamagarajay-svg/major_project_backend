import express from "express";

import {
    getNews,
    getSingleNews,
    addNews,
    updateNews,
    deleteNews
} from "../controllers/newsController.js";

const router = express.Router();

router.get("/", getNews);

router.get("/:id", getSingleNews);

router.post("/", addNews);

router.put("/:id", updateNews);

router.delete("/:id", deleteNews);

export default router;