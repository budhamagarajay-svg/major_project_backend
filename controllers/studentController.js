import Student from "../models/Student.js";

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    const {
      studentId,
      fullName,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      program,
      semester,
      rollNumber,
      admissionYear,
    } = req.body;

    if (!studentId || !fullName || !program || !semester) {
      return res.status(400).json({
        success: false,
        message: "Student ID, name, program and semester are required",
      });
    }

    const existingStudent = await Student.findOne({ studentId });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student ID already exists",
      });
    }

    const image = req.file ? `/uploads/students/${req.file.filename}` : "";

    const student = await Student.create({
      studentId,
      fullName,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      program,
      semester,
      rollNumber,
      admissionYear,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const {
      studentId,
      fullName,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      program,
      semester,
      rollNumber,
      admissionYear,
    } = req.body;

    const updateData = {
      studentId,
      fullName,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      program,
      semester,
      rollNumber,
      admissionYear,
    };

    if (req.file) {
      updateData.image = `/uploads/students/${req.file.filename}`;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};