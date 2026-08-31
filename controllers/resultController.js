import Result from "../models/Result.js";

export const getResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("Get Results Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch results",
      error: error.message,
    });
  }
};

export const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Get Result By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch result",
      error: error.message,
    });
  }
};

export const createResult = async (req, res) => {
  try {
    const {
      student,
      rollNumber,
      symbolNumber,
      program,
      semester,
      gpa,
      status,
    } = req.body;

    if (
      !student ||
      !rollNumber ||
      !symbolNumber ||
      !program ||
      !semester ||
      gpa === undefined ||
      gpa === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const numericGpa = Number(gpa);

    if (Number.isNaN(numericGpa) || numericGpa < 0 || numericGpa > 4) {
      return res.status(400).json({
        success: false,
        message: "GPA must be a number between 0 and 4",
      });
    }

    const result = await Result.create({
      student: student.trim(),
      rollNumber: rollNumber.trim(),
      symbolNumber: symbolNumber.trim(),
      program: program.trim(),
      semester: semester.trim(),
      gpa: numericGpa,
      status: status || "Pass",
    });

    res.status(201).json({
      success: true,
      message: "Student result added successfully",
      result,
    });
  } catch (error) {
    console.error("Create Result Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add student result",
      error: error.message,
    });
  }
};

export const updateResult = async (req, res) => {
  try {
    const {
      student,
      rollNumber,
      symbolNumber,
      program,
      semester,
      gpa,
      status,
    } = req.body;

    if (
      !student ||
      !rollNumber ||
      !symbolNumber ||
      !program ||
      !semester ||
      gpa === undefined ||
      gpa === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const numericGpa = Number(gpa);

    if (Number.isNaN(numericGpa) || numericGpa < 0 || numericGpa > 4) {
      return res.status(400).json({
        success: false,
        message: "GPA must be a number between 0 and 4",
      });
    }

    const result = await Result.findByIdAndUpdate(
      req.params.id,
      {
        student: student.trim(),
        rollNumber: rollNumber.trim(),
        symbolNumber: symbolNumber.trim(),
        program: program.trim(),
        semester: semester.trim(),
        gpa: numericGpa,
        status: status || "Pass",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student result updated successfully",
      result,
    });
  } catch (error) {
    console.error("Update Result Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update student result",
      error: error.message,
    });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student result deleted successfully",
    });
  } catch (error) {
    console.error("Delete Result Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student result",
      error: error.message,
    });
  }
};