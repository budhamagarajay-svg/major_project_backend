import AcademicCalendar from "../models/AcademicCalendar.js";

export const getCalendarEvents = async (req, res) => {
  try {
    const events = await AcademicCalendar.find().sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCalendarEventById = async (req, res) => {
  try {
    const event = await AcademicCalendar.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Calendar event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createCalendarEvent = async (req, res) => {
  try {
    const { title, date, endDate, type, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        success: false,
        message: "Title and start date are required",
      });
    }

    const event = await AcademicCalendar.create({
      title,
      date,
      endDate,
      type,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Calendar event created successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCalendarEvent = async (req, res) => {
  try {
    const event = await AcademicCalendar.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Calendar event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Calendar event updated successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCalendarEvent = async (req, res) => {
  try {
    const event = await AcademicCalendar.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Calendar event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Calendar event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};