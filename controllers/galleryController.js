import Gallery from "../models/galleryModel.js";

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gallery",
      error: error.message,
    });
  }
};

export const addGallery = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        message: "Title and category are required",
      });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    const image = req.files.image;

    const fileName = `${Date.now()}-${image.name}`;

    const uploadPath = `uploads/${fileName}`;

    await image.mv(uploadPath);

    const gallery = new Gallery({
      title,
      category,
      image: `/uploads/${fileName}`,
    });

    const savedGallery = await gallery.save();

    res.status(201).json({
      message: "Gallery added successfully",
      gallery: savedGallery,
    });
  } catch (error) {
    console.error("GALLERY ERROR:", error);

    res.status(500).json({
      message: "Failed to add gallery",
      error: error.message,
    });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        message: "Title and category are required",
      });
    }

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery not found",
      });
    }

    gallery.title = title;
    gallery.category = category;

    if (req.files && req.files.image) {
      const image = req.files.image;

      const fileName = `${Date.now()}-${image.name}`;

      const uploadPath = `uploads/${fileName}`;

      await image.mv(uploadPath);

      gallery.image = `/uploads/${fileName}`;
    }

    const updatedGallery = await gallery.save();

    res.status(200).json({
      message: "Gallery updated successfully",
      gallery: updatedGallery,
    });
  } catch (error) {
    console.error("UPDATE GALLERY ERROR:", error);

    res.status(500).json({
      message: "Failed to update gallery",
      error: error.message,
    });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery not found",
      });
    }

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    console.error("DELETE GALLERY ERROR:", error);

    res.status(500).json({
      message: "Failed to delete gallery",
      error: error.message,
    });
  }
};