const express = require('express');
const router = express.Router();

const { createAddress } = require('../controllers/addressController');
router.post('/addAddress', createAddress);

module.exports = router;
