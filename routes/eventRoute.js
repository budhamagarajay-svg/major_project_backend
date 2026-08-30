import express from "express";

import {
  getEvents,
  getSingleEvent,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getSingleEvent);

router.post("/", addEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;