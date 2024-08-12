const order = require('../models/orderModel');

const getOrder = async (req, res) => {
    try {
        const orders = await order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const postOrder = async (req, res) => {
    const { user, product, quantity, totalAmount, paymentStatus, orderStatus } = req.body;

    try {
        const newOrder = new order({
            user,
            product,
            quantity,
            totalAmount,
            paymentStatus,
            orderStatus
        });

        await newOrder.save();
        res.status(200).send("Order added successfully");
        
    } catch (err) {
        res.status(400).json({message: err.message});
            
    }
}

// Using res.status(400).json{} is incorrect and will result in a syntax error. The json method is a function and must be called with parentheses().

module.exports = {
    getOrder, postOrder
};
