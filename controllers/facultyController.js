import Faculty from "../models/Faculty.js";
import path from "path";
import fs from "fs";

export const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({
      createdAt: -1,
    });

    res.status(200).json(faculty);
  } catch (error) {
    console.error("Get faculty error:", error);

    res.status(500).json({
      message: "Failed to get faculty",
      error: error.message,
    });
  }
};

export const addFaculty = async (req, res) => {
  try {
    const {
      name,
      position,
      department,
      qualification,
      email,
      phone,
      description,
    } = req.body;

    if (
      !name ||
      !position ||
      !department ||
      !qualification
    ) {
      return res.status(400).json({
        message:
          "Name, position, department and qualification are required.",
      });
    }

    let imagePath = "";

    if (req.files && req.files.image) {
      const image = req.files.image;

      const uploadDir = path.join(
        process.cwd(),
        "uploads",
        "faculty"
      );

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, {
          recursive: true,
        });
      }

      const fileName = `${Date.now()}-${image.name}`;

      const uploadPath = path.join(
        uploadDir,
        fileName
      );

      await image.mv(uploadPath);

      imagePath = `/uploads/faculty/${fileName}`;
    }

    const faculty = await Faculty.create({
      name,
      position,
      department,
      qualification,
      email: email || "",
      phone: phone || "",
      description: description || "",
      image: imagePath,
    });

    res.status(201).json({
      message: "Faculty added successfully",
      faculty,
    });
  } catch (error) {
    console.error("Add faculty error:", error);

    res.status(500).json({
      message: "Failed to add faculty",
      error: error.message,
    });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    const {
      name,
      position,
      department,
      qualification,
      email,
      phone,
      description,
    } = req.body;

    if (
      !name ||
      !position ||
      !department ||
      !qualification
    ) {
      return res.status(400).json({
        message:
          "Name, position, department and qualification are required.",
      });
    }

    faculty.name = name;
    faculty.position = position;
    faculty.department = department;
    faculty.qualification = qualification;
    faculty.email = email || "";
    faculty.phone = phone || "";
    faculty.description = description || "";

    if (req.files && req.files.image) {
      const image = req.files.image;

      const uploadDir = path.join(
        process.cwd(),
        "uploads",
        "faculty"
      );

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, {
          recursive: true,
        });
      }

      const fileName = `${Date.now()}-${image.name}`;

      const uploadPath = path.join(
        uploadDir,
        fileName
      );

      await image.mv(uploadPath);

      if (faculty.image) {
        const oldImagePath = path.join(
          process.cwd(),
          faculty.image.replace(/^\/+/, "")
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      faculty.image = `/uploads/faculty/${fileName}`;
    }

    const updatedFaculty = await faculty.save();

    res.status(200).json({
      message: "Faculty updated successfully",
      faculty: updatedFaculty,
    });
  } catch (error) {
    console.error("Update faculty error:", error);

    res.status(500).json({
      message: "Failed to update faculty",
      error: error.message,
    });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    if (faculty.image) {
      const imagePath = path.join(
        process.cwd(),
        faculty.image.replace(/^\/+/, "")
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Faculty.findByIdAndDelete(id);

    res.status(200).json({
      message: "Faculty deleted successfully",
    });
  } catch (error) {
    console.error("Delete faculty error:", error);

    res.status(500).json({
      message: "Failed to delete faculty",
      error: error.message,
    });
  }
};