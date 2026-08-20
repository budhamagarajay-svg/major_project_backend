import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true, trim: true },
    product_price: { type: Number, required: true },
    product_description: { type: String, required: true },
    product_category: { type: String, required: true },
    product_stock: { type: Number, default: 0 },
    product_image: { type: String,required:true },
    product_brand: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;