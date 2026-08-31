import DigitalLearning from "../models/DigitalLearning.js";

export const getDigitalLearning = async (req, res) => {
  try {
    const data = await DigitalLearning.find().sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch digital learning resources",
      error: error.message,
    });
  }
};

export const getDigitalLearningById = async (req, res) => {
  try {
    const data = await DigitalLearning.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Digital learning resource not found",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch digital learning resource",
      error: error.message,
    });
  }
};

export const createDigitalLearning = async (req, res) => {
  try {
    const { title, description, program, semester, type, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        message: "Title and URL are required",
      });
    }

    const data = await DigitalLearning.create({
      title,
      description,
      program,
      semester,
      type,
      url,
    });

    res.status(201).json({
      message: "Digital learning resource created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create digital learning resource",
      error: error.message,
    });
  }
};

export const updateDigitalLearning = async (req, res) => {
  try {
    const data = await DigitalLearning.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!data) {
      return res.status(404).json({
        message: "Digital learning resource not found",
      });
    }

    res.status(200).json({
      message: "Digital learning resource updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update digital learning resource",
      error: error.message,
    });
  }
};

export const deleteDigitalLearning = async (req, res) => {
  try {
    const data = await DigitalLearning.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Digital learning resource not found",
      });
    }

    res.status(200).json({
      message: "Digital learning resource deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete digital learning resource",
      error: error.message,
    });
  }
};