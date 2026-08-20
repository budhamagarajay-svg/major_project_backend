import express from "express";

import {
    getEvents,
    addEvent,
} from "../controllers/eventController.js";


const router = express.Router();


console.log("EVENT ROUTE FILE LOADED");


router.get("/", getEvents);

router.post("/", addEvent);


router.post("/test", (req, res) => {
    res.json({
        message: "EVENT POST ROUTE WORKING",
    });
});


export default router;