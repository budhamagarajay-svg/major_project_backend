import News from "../models/News.js";

export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch news",
      error: error.message,
    });
  }
};

export const getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch news",
      error: error.message,
    });
  }
};

export const createNews = async (req, res) => {
  try {
    const {
      title,
      date,
      category,
      description,
      content,
    } = req.body;

    const news = await News.create({
      title,
      date,
      category,
      description,
      content,
    });

    res.status(201).json({
      message: "News created successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create news",
      error: error.message,
    });
  }
};

export const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    res.status(200).json({
      message: "News updated successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update news",
      error: error.message,
    });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    res.status(200).json({
      message: "News deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete news",
      error: error.message,
    });
  }
};