const User = require('../models/userModel');

const addToCart = async (req, res) => {
    try {
        console.log("added", req.body.itemId);
        let userData = await User.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('Internal Server Error');
    }
};

const removeFromCart = async (req, res) => {
    try {
        console.log("removed", req.body.itemId);
        let userData = await User.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0)
            userData.cartData[req.body.itemId] -= 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getCart = async (req, res) => {
    try {
        console.log('GetCart');
        let userData = await User.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error('Error getting cart data:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    getCart
};
