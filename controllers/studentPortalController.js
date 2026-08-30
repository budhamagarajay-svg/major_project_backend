import Student from "../models/Student.js";

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("Get students error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load students",
      error: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("Get student error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get student",
      error: error.message,
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    console.error("Create student error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("Update student error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update student",
      error: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete student error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: error.message,
    });
  }
};

let academicResources = [];

export const getAcademicResources = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      academicResources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load academic resources",
      error: error.message,
    });
  }
};

export const createAcademicResource = async (req, res) => {
  try {
    const resource = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date(),
    };

    academicResources.push(resource);

    res.status(201).json({
      success: true,
      message: "Academic resource created successfully",
      academicResource: resource,
    });
  } catch (error) {
    console.error("Create academic resource error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create academic resource",
      error: error.message,
    });
  }
};

export const updateAcademicResource = async (req, res) => {
  try {
    const index = academicResources.findIndex(
      (item) => item.id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Academic resource not found",
      });
    }

    academicResources[index] = {
      ...academicResources[index],
      ...req.body,
      updatedAt: new Date(),
    };

    res.status(200).json({
      success: true,
      message: "Academic resource updated successfully",
      academicResource: academicResources[index],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update academic resource",
      error: error.message,
    });
  }
};

export const deleteAcademicResource = async (req, res) => {
  try {
    const index = academicResources.findIndex(
      (item) => item.id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Academic resource not found",
      });
    }

    academicResources.splice(index, 1);

    res.status(200).json({
      success: true,
      message: "Academic resource deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete academic resource",
      error: error.message,
    });
  }
};