const express = require('express');
const router = express.Router();

const { addToCart, removeFromCart, getCart } = require('../controllers/CartController');
const fetchUser = require('../middleware/fetchUser'); // Ensure you have this middleware

router.post('/addToCart', fetchUser, addToCart);
router.post('/removeFromCart', fetchUser, removeFromCart);
router.post('/getCart', getCart);

module.exports = router;
