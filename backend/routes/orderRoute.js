const express = require('express');
const router = express.Router();

const {getOrder, postOrder} = require('../controllers/orderController');

router.get('/getOrder', getOrder);
router.post('/postOrder', postOrder);

module.exports = router;
