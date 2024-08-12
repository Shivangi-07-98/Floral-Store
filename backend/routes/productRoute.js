const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, removeProduct, getNewCollections, getPopularInWomen, upload, uploadImage } = require('../controllers/productController');

router.post('/allProducts', getAllProducts);
router.post('/addProduct', addProduct);
router.post('/removeProduct', removeProduct);
router.get('/newCollections', getNewCollections);
router.get('/popularInWomen', getPopularInWomen);
router.post('/upload', upload.single('product'), uploadImage);

module.exports = router;
