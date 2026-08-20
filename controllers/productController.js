import mongoose from "mongoose";
import Product from "../models/Product.js";


// ==========================
// CREATE PRODUCT
// ==========================
export const createProduct = async (req, res) => {

  try {

    const {
      product_name,
      product_price,
      product_description,
      product_category,
      product_stock,
      product_brand
    } = req.body;


    const product = await Product.create({
      product_name,
      product_price,
      product_description,
      product_category,
      product_stock,
      product_brand,
      product_image: req.imagePath
    });


    return res.status(201).json({
      status: "success",
      message: "Product Added Successfully",
      data: product
    });


  } catch (error) {

    return res.status(500).json({
      status: "failed",
      message: error.message
    });

  }
};



// ==========================
// GET ALL PRODUCTS
// ==========================
export const getAllProduct = async (req, res) => {

  try {

    const products = await Product.find({});


    return res.status(200).json({
      status: "success",
      length: products.length,
      data: products
    });


  } catch (error) {

    return res.status(500).json({
      status: "failed",
      message: error.message
    });

  }
};



// ==========================
// GET PRODUCTS WITH FILTER,
// SORT, FIELD & PAGINATION
// ==========================
export const addProduct = async (req, res) => {

  const objectFields = [
    "sort",
    "fields",
    "search",
    "page",
    "limit"
  ];


  try {

    const queryObject = { ...req.query };


    objectFields.forEach(
      (el)=> delete queryObject[el]
    );


    let query = Product.find(queryObject);



    // Search

    if(req.query.search){

      query = Product.find({
        product_name:{
          $regex:req.query.search,
          $options:"i"
        }
      });

    }



    // Sort

    if(req.query.sort){

      const sorts = req.query.sort
      .split(",")
      .join(" ");

      query=query.sort(sorts);

    }



    // Fields

    if(req.query.fields){

      const fields=req.query.fields
      .split(",")
      .join(" ");

      query=query.select(fields);

    }



    // Pagination

    const page = Number(req.query.page)||1;

    const limit = Number(req.query.limit)||10;

    const skip=(page-1)*limit;



    query=query
    .select("-createdAt -updatedAt")
    .skip(skip)
    .limit(limit);



    const products=await query;


    const total=
    await Product.countDocuments(queryObject);



    return res.status(200).json({

      status:"success",

      length:products.length,

      total,

      data:products

    });



  }catch(error){

    return res.status(500).json({

      status:"failed",

      message:error.message

    });

  }

};



// ==========================
// GET PRODUCT BY ID
// ==========================
export const getProductById = async(req,res)=>{


 const {id}=req.params;


 try{


  if(!mongoose.Types.ObjectId.isValid(id)){

    return res.status(400).json({

      status:"failed",

      message:"Invalid Product ID"

    });

  }



  const product =
  await Product.findById(id);



  if(!product){

    return res.status(404).json({

      status:"failed",

      message:"Product Not Found"

    });

  }



  return res.status(200).json({

    status:"success",

    data:product

  });



 }catch(error){


  return res.status(500).json({

    status:"failed",

    message:error.message

  });


 }

};




// ==========================
// UPDATE PRODUCT
// ==========================
export const updateProduct = async(req,res)=>{


const {id}=req.params;


try{


if(!mongoose.Types.ObjectId.isValid(id)){

return res.status(400).json({

status:"failed",

message:"Invalid Product ID"

});

}



const updateData={

product_name:req.body.product_name,

product_price:req.body.product_price,

product_description:req.body.product_description,

product_category:req.body.product_category,

product_stock:req.body.product_stock,

product_brand:req.body.product_brand

};



if(req.imagePath){

updateData.product_image=req.imagePath;

}



const updatedProduct=
await Product.findByIdAndUpdate(

id,

updateData,

{

new:true,

runValidators:true

}

);



if(!updatedProduct){

return res.status(404).json({

status:"failed",

message:"Product Not Found"

});

}



return res.status(200).json({

status:"success",

message:"Updated Successfully",

data:updatedProduct

});



}catch(error){


return res.status(500).json({

status:"failed",

message:error.message

});


}


};