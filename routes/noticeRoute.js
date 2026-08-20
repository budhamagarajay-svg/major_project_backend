import express from "express";

import {
    getNotices,
    getSingleNotice,
    addNotice,
    updateNotice,
    deleteNotice
} from "../controllers/noticeController.js";

const router = express.Router();

router.get("/", getNotices);

router.post("/", addNotice);

router.get("/:id", getSingleNotice);

router.put("/:id", updateNotice);

router.delete("/:id", deleteNotice);

export default router;