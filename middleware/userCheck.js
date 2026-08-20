import jwt from "jsonwebtoken";

export const userCheck = (req, res, next) => {

    const token = req.headers.authorization;

    try {

        const decode = jwt.verify(token, "toky");

        req.userId = decode.userId;
        req.isAdmin = decode.isAdmin;

        next();

    } catch (err) {

        return res.status(400).json({

            status: "error",
            message: err.message

        });

    }

}; // <-- Missing semicolon/closing of the function

export const adminCheck = (req, res, next) => {

    if (req.isAdmin) {

        next();

    } else {

        return res.status(400).json({

            status: "error",
            message: "Unauthorized"

        });

    }

};