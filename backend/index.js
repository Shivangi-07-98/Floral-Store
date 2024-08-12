const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://shivangi:user123@cluster0.qdx6dsf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const stripe = require('stripe')('sk_test_51PQNMC08tfQw2xpz6mB0cZvupTCEqCYn4XXqopbjmyjQV8iD6hen6OZgkgIPRcLS3iUjBbwidifa8U1NtHelTIm700bYkiO9C2');


//payment
app.post('/payment', async (req, res) => {
    const { amount, email, token } = req.body;
    if (!token || !token.id || !email || !amount) {
        return res.status(400).send({ error: "Missing required parameters" });
    }
    try {
        const customer = await stripe.customers.create({
            email: email,
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseFloat(amount) * 100,
            currency: 'usd',
            customer: customer.id,
            payment_method_data: {
                type: 'card',
                card: {
                    token: token.id,
                },
            },
            off_session: true,
            confirm: true,
        });

        res.status(200).send('payment successfully');
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

// api creation
app.get("/", (req, res) => {
    res.send("Express app is running")
})

// image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

// creating upload endpoint for images
app.use('/images', express.static('upload/images'))


app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
    style: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }

})

app.post('/filter', async (req, res) => {
    try {
        const data = req.body;
        let priceArr = [];
        if (data.price != 0) {
            priceArr = data.price.split(',').map(price => parseFloat(price.trim()));
        }

        const aggregation = [];
        if (priceArr && priceArr.length != 0) {
            aggregation.push({
                $match: {
                    new_price: {
                        $gte: priceArr[0],
                        $lte: priceArr[1]
                    },
                }
            });
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

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 12;
        const skip = (page - 1) * perPage;
        aggregation.push({ $skip: skip });
        aggregation.push({ $limit: perPage });

        const products = await Product.aggregate(aggregation);
        const totalProducts = await Product.countDocuments(aggregation.length ? aggregation[0].$match : {});
        const totalPages = Math.ceil(totalProducts / perPage);

        res.json({ products, totalPages, totalProducts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        style: req.body.style,
        color: req.body.color
    });
    console.log(product);

    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// creating api for deleting products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// creating api for getting all products
app.post('/allproducts', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 12;
    const skip = (page - 1) * perPage;

    try {
        const products = await Product.find({}).skip(skip).limit(perPage);
        const totalProducts = await Product.countDocuments({});
        const totalPages = Math.ceil(totalProducts / perPage);

        res.json({ products, totalProducts, totalPages });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// schema creating for user model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

// creating endpoint for registering the user
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email })
    if (check) {
        return res.status(400).json({ success: false, errors: 'existing user found with same email address' })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })

})

// creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "wrong password" })
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email id" });
    }
})

// creating endpoint for newcollection data
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// creating endpoint for popular in women section
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: 'mothers-day' })
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: 'Please authenticate using valid token' })
    }

    else {

        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: 'Please authenticate using a valid token' })
        }
    }
}

// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
})

// creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed")
})

// creating endpoint to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
    console.log('GetCart');
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

// // Schema for creating addresses
// const Address = mongoose.model("Address", {
//     name: {
//         type: String,
//         required: true,
//     },
//     mobile: {
//         type: String,
//         required: true,
//     },
//     pincode: {
//         type: String,
//         required: true,
//     },
//     locality: {
//         type: String,
//         required: true,
//     },
//     address: {
//         type: String,
//         required: true,
//     },
//     city: {
//         type: String,
//         required: true,
//     },
//     state: {
//         type: String,
//         required: true,
//     },
//     landmark: {
//         type: String,
//         required: false,
//     },
//     alternatePhone: {
//         type: String,
//         required: false,
//     },
//     addressType: {
//         type: String,
//         required: true,
//     }
// });

// // const Address = mongoose.model('Address', addressSchema);
// module.exports = Address;


const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    pincode: { type: String, required: true },
    locality: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String },
    alternatePhone: { type: String },
    addressType: { type: String, required: true }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;


app.post('/address', async (req, res) => {
    try {
        const newAddress = new Address(req.body);
        await newAddress.save();
        res.status(201).json(newAddress);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port)
    }
    else {
        console.log("Error : " + error)
    }
}
)