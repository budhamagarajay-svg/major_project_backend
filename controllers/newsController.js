import News from "../models/News.js";

export const getNews = async (req, res) => {
    try {
        const news = await News.find({
            status: "active"
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            status: "success",
            data: news
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const getSingleNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).json({
                status: "error",
                message: "News not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: news
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const addNews = async (req, res) => {
    try {
        const news = new News({
            title: req.body.title,
            date: req.body.date,
            category: req.body.category,
            description: req.body.description,
            content: req.body.content,
            image: req.body.image,
            status: req.body.status || "active"
        });

        const savedNews = await news.save();

        res.status(201).json({
            status: "success",
            message: "News Added Successfully",
            data: savedNews
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const updateNews = async (req, res) => {
    try {
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                date: req.body.date,
                category: req.body.category,
                description: req.body.description,
                content: req.body.content,
                image: req.body.image,
                status: req.body.status
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNews) {
            return res.status(404).json({
                status: "error",
                message: "News not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "News Updated Successfully",
            data: updatedNews
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const deleteNews = async (req, res) => {
    try {
        const deletedNews = await News.findByIdAndDelete(
            req.params.id
        );

        if (!deletedNews) {
            return res.status(404).json({
                status: "error",
                message: "News not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "News Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};