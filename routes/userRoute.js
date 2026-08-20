import express from "express";
import Joi from "joi";
import validator from "express-joi-validation";

import {
    userSignup,
    userLogin
} from "../controllers/userController.js";



const router = express.Router();


// Create Validator

const Validate = validator.createValidator({});





// ================= SIGNUP VALIDATION =================


const signupSchema = Joi.object({


    username: Joi.string()
        .min(3)
        .max(15)
        .required()
        .messages({

            "string.min":"Username must be at least 3 characters",

            "string.max":"Username must be maximum 15 characters",

            "any.required":"Username is required"

        }),



    email: Joi.string()
        .email()
        .required()
        .messages({

            "string.email":"Please provide valid email",

            "any.required":"Email is required"

        }),



    password: Joi.string()
        .min(8)
        .max(15)
        .required()
        .messages({

            "string.min":"Password must be at least 8 characters",

            "string.max":"Password must be maximum 15 characters",

            "any.required":"Password is required"

        })



});







// ================= LOGIN VALIDATION =================


const loginSchema = Joi.object({


    email: Joi.string()

        .email()

        .required()

        .messages({

            "string.email":"Invalid email address",

            "any.required":"Email is required"

        }),




    password: Joi.string()

        .min(8)

        .max(15)

        .required()

        .messages({

            "string.min":"Password must be at least 8 characters",

            "any.required":"Password is required"

        })


});








// ================= ROUTES =================





// Signup API

router.post(

    "/signup",

    Validate.body(signupSchema),

    userSignup

);







// Login API

router.post(

    "/login",

    Validate.body(loginSchema),

    userLogin

);







export default router;