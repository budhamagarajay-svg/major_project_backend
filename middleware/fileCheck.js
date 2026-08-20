import path from "path";

const supports = [".png", ".jpg", ".jpeg"];

export const fileCheck = (req, res, next) => {

    const file = req.files?.product_image;

    if (!file) {
        return next();
    }

    const ext = path.extname(file.name).toLowerCase();

    if (!supports.includes(ext)) {
        return res.status(400).json({
            message: "Invalid image"
        });
    }

    file.mv(`./uploads/${file.name}`, (err) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        req.imagePath = `/uploads/${file.name}`;
        next();
    });
};