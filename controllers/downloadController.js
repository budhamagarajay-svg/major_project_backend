import Download from "../models/Download.js";

// GET all downloads
export const getDownloads = async (req, res) => {
  try {
    const downloads = await Download.find().sort({ createdAt: -1 });

    res.status(200).json(downloads);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch downloads",
      error: error.message,
    });
  }
};

// POST new download
export const addDownload = async (req, res) => {
  try {
    const { title, category, date, description, file } = req.body;

    const download = await Download.create({
      title,
      category,
      date,
      description,
      file,
    });

    res.status(201).json({
      message: "Download added successfully",
      download,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add download",
      error: error.message,
    });
  }
};