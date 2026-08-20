import express from "express";

import {
  addProduct,
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct
} from "../controllers/productController.js";

import { fileCheck } from "../middleware/fileCheck.js";
import { userCheck, adminCheck } from "../middleware/userCheck.js";


const router = express.Router();


router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.post("/", userCheck, adminCheck, fileCheck, createProduct);

router.put("/:id", updateProduct);


export default router;