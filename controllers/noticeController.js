import Notice from "../models/Notice.js";

export const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            status: "success",
            data: notices
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const getSingleNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                status: "error",
                message: "Notice not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: notice
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const addNotice = async (req, res) => {
    try {
        const notice = new Notice({
            title: req.body.title,
            date: req.body.date,
            category: req.body.category,
            description: req.body.description,
            file: req.body.file
        });

        const savedNotice = await notice.save();

        res.status(201).json({
            status: "success",
            message: "Notice Added Successfully",
            data: savedNotice
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const updateNotice = async (req, res) => {
    try {
        const updatedNotice = await Notice.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                date: req.body.date,
                category: req.body.category,
                description: req.body.description,
                file: req.body.file,
                status: req.body.status
            },
            {
                new: true
            }
        );

        if (!updatedNotice) {
            return res.status(404).json({
                status: "error",
                message: "Notice not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Notice Updated Successfully",
            data: updatedNotice
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const deleteNotice = async (req, res) => {
    try {
        const deletedNotice = await Notice.findByIdAndDelete(
            req.params.id
        );

        if (!deletedNotice) {
            return res.status(404).json({
                status: "error",
                message: "Notice not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Notice Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};