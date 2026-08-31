import Feedback from "../models/Feedback.js";

export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;

    if (!feedback) {
      return res.status(400).json({
        message: "Feedback is required",
      });
    }

    const newFeedback = await Feedback.create({
      feedback,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const replyFeedback = async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply || !reply.trim()) {
      return res.status(400).json({
        message: "Reply is required",
      });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        reply: reply.trim(),
        status: "Replied",
      },
      {
        new: true,
      }
    );

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      message: "Reply sent successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};