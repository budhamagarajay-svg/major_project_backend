import Download from "../models/Download.js";
import path from "path";
import fs from "fs";

export const getDownloads = async (req, res) => {
  try {
    const downloads = await Download.find().sort({
      createdAt: -1,
    });

    res.status(200).json(downloads);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch downloads",
      error: error.message,
    });
  }
};

export const addDownload = async (req, res) => {
  try {
    const {
      title,
      category,
      date,
      description,
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        message: "Title and category are required",
      });
    }

    let filePath = "";

    if (req.files && req.files.file) {
      const file = req.files.file;

      const uploadDir = path.join(
        process.cwd(),
        "uploads"
      );

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, {
          recursive: true,
        });
      }

      const fileName = `${Date.now()}-${file.name}`;

      const uploadPath = path.join(
        uploadDir,
        fileName
      );

      await file.mv(uploadPath);

      filePath = `/uploads/${fileName}`;
    }

    const download = await Download.create({
      title: title.trim(),
      category: category.trim(),
      date: date || new Date(),
      description: description
        ? description.trim()
        : "",
      file: filePath,
    });

    res.status(201).json({
      message: "Download added successfully",
      download,
    });
  } catch (error) {
    console.error("ADD DOWNLOAD ERROR:", error);

    res.status(500).json({
      message: "Failed to add download",
      error: error.message,
    });
  }
};

export const deleteDownload = async (req, res) => {
  try {
    const { id } = req.params;

    const download =
      await Download.findById(id);

    if (!download) {
      return res.status(404).json({
        message: "Download not found",
      });
    }

    if (download.file) {
      const filePath = path.join(
        process.cwd(),
        download.file
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Download.findByIdAndDelete(id);

    res.status(200).json({
      message: "Download deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE DOWNLOAD ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to delete download",
      error: error.message,
    });
  }
};