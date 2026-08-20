import Order from "../models/Order.js";


// CREATE ORDER
export const createOrder = async (req, res) => {

    const { user, products, totalPrice } = req.body;

    try {

        await Order.create({
            user,
            products,
            totalPrice,
        });

        return res.status(201).json({
            status: "Success",
            message: "Order Created Successfully",
        });

    } catch (error) {

        return res.status(400).json({
            status: "Failed",
            message: `${error}`,
        });
    }
};



// GET ALL ORDERS
export const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find();

        return res.status(200).json({
            status: "Success",
            orders,
        });

    } catch (error) {

        return res.status(400).json({
            status: "Failed",
            message: `${error}`,
        });
    }
};



// DELETE ORDER
export const deleteOrder = async (req, res) => {

    try {

        await Order.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            status: "Success",
            message: "Order Deleted Successfully",
        });

    } catch (error) {

        return res.status(400).json({
            status: "Failed",
            message: `${error}`,
        });
    }
};