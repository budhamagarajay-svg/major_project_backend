const StudentPortal = require("../models/StudentPortal");

const getStudentPortal = async (req, res) => {
  try {
    const data = await StudentPortal.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStudentPortalById = async (req, res) => {
  try {
    const data = await StudentPortal.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Student portal data not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createStudentPortal = async (req, res) => {
  try {
    const { title, description, category, link, file, date, status } =
      req.body;

    const data = await StudentPortal.create({
      title,
      description,
      category,
      link,
      file,
      date,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Student portal data created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateStudentPortal = async (req, res) => {
  try {
    const data = await StudentPortal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Student portal data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student portal data updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteStudentPortal = async (req, res) => {
  try {
    const data = await StudentPortal.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Student portal data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student portal data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStudentPortal,
  getStudentPortalById,
  createStudentPortal,
  updateStudentPortal,
  deleteStudentPortal,
};