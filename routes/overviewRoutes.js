import express from "express";

import {
    getOverview,
    createOverview,
    updateOverview,
    deleteOverview
} from "../controllers/overviewController.js";

const router = express.Router();

router.get("/", getOverview);

router.post("/", createOverview);

router.put("/", updateOverview);

router.delete("/", deleteOverview);

export default router;