import Feedback from "../models/feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;

    if (!feedback || feedback.trim() === "") {
      return res.status(400).json({
        message: "Feedback is required",
      });
    }

    const newFeedback = await Feedback.create({
      feedback: feedback.trim(),
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Create Feedback Error:", error);

    res.status(500).json({
      message: "Failed to submit feedback",
      error: error.message,
    });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({
      createdAt: -1,
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Get Feedback Error:", error);

    res.status(500).json({
      message: "Failed to get feedback",
      error: error.message,
    });
  }
};