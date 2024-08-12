const Product = require('../models/productModel');
const multer = require("multer");
const path = require("path");

const getAllProducts = async (req, res) => {
    try {
        const data = req.body;
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 12;
        const skip = (page - 1) * perPage;

        const aggregation = [];
        // Filters
        if (data.price) {
            const priceArr = data.price.split(',').map(price => parseFloat(price.trim()));
            if (priceArr.length > 0) {
                aggregation.push({
                    $match: {
                        new_price: {
                            $gte: priceArr[0],
                            $lte: priceArr[1]
                        },
                    }
                });
            }
        }

        if (data.occasions) {
            aggregation.push({
                $match: {
                    category: data.occasions
                }
            });
        }

        if (data.color) {
            aggregation.push({
                $match: {
                    color: data.color
                }
            });
        }

        if (data.style) {
            aggregation.push({
                $match: {
                    style: data.style
                }
            });
        }

        // Sorting
        let sortOption = data.sortOption || '';
        let sortCriteria = {};
        switch (sortOption) {
            case 'priceLowToHigh':
                sortCriteria = { new_price: 1 };
                break;
            case 'priceHighToLow':
                sortCriteria = { new_price: -1 };
                break;
            case 'newest':
                sortCriteria = { date: -1 };
                break;
            default:
                sortCriteria = null; // No sorting
                break;
        }

        if (sortCriteria) {
            aggregation.push({ $sort: sortCriteria });
        }

        // Pagination
        aggregation.push({ $skip: skip });
        aggregation.push({ $limit: perPage });

        const products = await Product.aggregate(aggregation);
        const totalProducts = await Product.countDocuments(aggregation.length ? aggregation[0].$match : {});
        const totalPages = Math.ceil(totalProducts / perPage);

        res.json({ products, totalPages, totalProducts });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
};

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

const uploadImage = (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    });
};


const addProduct = async (req, res) => {
    try {
        const { flowerType, price, color, style, occasion,image } = req.body;
        // const image = req.file ? req.file.filename : null;
        const product = new Product({
            name: flowerType,
            image: image,
            category: occasion,
            new_price: price,
            style: style,
            color: color
        });
        await product.save();
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getNewCollections = async (req, res) => {
    try {
        let products = await Product.find({});
        let newCollection = products.slice(1).slice(-8);
        console.log("NewCollection Fetched");
        res.send(newCollection);
    } catch (error) {
        console.error('Error fetching new collections:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getPopularInWomen = async (req, res) => {
    try {
        let products = await Product.find({ category: 'mothers-day' });
        let popularInWomen = products.slice(0, 4);
        console.log("Popular in women fetched");
        res.send(popularInWomen);
    } catch (error) {
        console.error('Error fetching popular in women:', error);
        res.status(500).send('Internal Server Error');
    }
};




module.exports = {
    getAllProducts,
    addProduct,
    uploadImage,
    removeProduct,
    getNewCollections,
    getPopularInWomen, upload
};
