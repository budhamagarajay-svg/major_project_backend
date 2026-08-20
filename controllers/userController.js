import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ================= SIGNUP =================

export const userSignup = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        // Check user already exists
        const isExist = await User.findOne({ email });


        if (isExist) {
            return res.status(400).json({
                status: "error",
                message: "User already exists",
            });
        }


        // Hash password
        const hashPass = bcrypt.hashSync(password, 10);


        // Create new user
        await User.create({

            username,

            email,

            password: hashPass,

        });


        return res.status(201).json({

            status: "success",

            message: "Successfully registered",

        });


    } catch (error) {


        return res.status(500).json({

            status: "failed",

            message: error.message,

        });


    }

};





// ================= LOGIN =================


export const userLogin = async (req, res) => {


    const { email, password } = req.body;


    try {


        // Find user by email

        const isExist = await User.findOne({ email });



        if (!isExist) {

            return res.status(400).json({

                status: "error",

                message: "User not found",

            });

        }




        // Compare password

        const passMatch = bcrypt.compareSync(

            password,

            isExist.password

        );



        if (!passMatch) {


            return res.status(400).json({

                status: "error",

                message: "Invalid credentials",

            });


        }




        // Create JWT Token

        const token = jwt.sign(

            {

                userid: isExist._id,

                isAdmin: isExist.isAdmin,

            },


            "tokey",


            {

                expiresIn: "1d"

            }

        );





        return res.status(200).json({


            status: "success",


            message: "Login successful",


            token,


            id: isExist._id,


            username: isExist.username,


            email: isExist.email,


            isAdmin: isExist.isAdmin,


        });



    } catch (error) {


        return res.status(500).json({


            status: "error",


            message: error.message,


        });


    }


};