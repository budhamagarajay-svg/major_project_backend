const Overview = require("../models/Overview");

// GET Overview
const getOverview = async (req, res) => {
  try {
    const overview = await Overview.findOne();

    if (!overview) {
      return res.status(404).json({
        message: "Overview not found",
      });
    }

    res.status(200).json(overview);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch overview",
      error: error.message,
    });
  }
};


// CREATE Overview
const createOverview = async (req, res) => {
  try {
    const existingOverview = await Overview.findOne();

    if (existingOverview) {
      return res.status(400).json({
        message: "Overview already exists",
      });
    }

    const overview = await Overview.create(req.body);

    res.status(201).json({
      message: "Overview created successfully",
      overview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create overview",
      error: error.message,
    });
  }
};


// UPDATE Overview
const updateOverview = async (req, res) => {
  try {
    const overview = await Overview.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!overview) {
      return res.status(404).json({
        message: "Overview not found",
      });
    }

    res.status(200).json({
      message: "Overview updated successfully",
      overview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update overview",
      error: error.message,
    });
  }
};


// DELETE Overview
const deleteOverview = async (req, res) => {
  try {
    const overview = await Overview.findOneAndDelete({});

    if (!overview) {
      return res.status(404).json({
        message: "Overview not found",
      });
    }

    res.status(200).json({
      message: "Overview deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete overview",
      error: error.message,
    });
  }
};


module.exports = {
  getOverview,
  createOverview,
  updateOverview,
  deleteOverview,
};