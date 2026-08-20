import Gallery from "../models/galleryModel.js";

export const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find().sort({ createdAt: -1 });

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
        console.log("========== GALLERY DEBUG ==========");
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);
        console.log("IMAGE:", req.files?.image);

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