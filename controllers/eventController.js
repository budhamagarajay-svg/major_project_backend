import Event from "../models/Event.js";

// GET all events
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });

        res.status(200).json(events);
    } catch (error) {
        console.error("Get Events Error:", error);

        res.status(500).json({
            message: "Failed to fetch events",
            error: error.message,
        });
    }
};


// POST new event
export const addEvent = async (req, res) => {
    try {
        const {
            title,
            date,
            time,
            location,
            category,
            description,
        } = req.body;

        const newEvent = new Event({
            title,
            date,
            time,
            location,
            category,
            description,
        });

        const savedEvent = await newEvent.save();

        res.status(201).json({
            message: "Event added successfully",
            event: savedEvent,
        });
    } catch (error) {
        console.error("Add Event Error:", error);

        res.status(500).json({
            message: "Failed to add event",
            error: error.message,
        });
    }
};