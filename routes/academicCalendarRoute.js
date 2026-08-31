import express from "express";

import {
  getCalendarEvents,
  getCalendarEventById,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "../controllers/academicCalendarController.js";

const router = express.Router();

router.get("/", getCalendarEvents);
router.get("/:id", getCalendarEventById);
router.post("/", createCalendarEvent);
router.put("/:id", updateCalendarEvent);
router.delete("/:id", deleteCalendarEvent);

export default router;