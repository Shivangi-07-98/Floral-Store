require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const cors = require('cors');
var app = express();
app.use(express.json())

const PORT = process.env.PORT || 4000
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND


var corsOptions = {
  origin: '*',
  methods: "GET,POST, PUT, DELETE",
  // some legacy browsers (IE11, various SmartTVs) choke on 204
  Credentials: true
}
app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// --------------------------------------------------------------------------------------------------------

const productRoutes = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const userRoutes = require('./routes/authRoute');
const paymentController = require('./controllers/paymentGetWays');
const addressRoutes = require('./routes/addressRoute')
const orderRoutes = require('./routes/orderRoute')


app.post('/payment', paymentController.makePayment);
app.use('/images', express.static('upload/images'))
app.use('/api', cartRoute);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api', addressRoutes)
app.use('/api', orderRoutes)
// to add iteminventory
// app.use('/api/item', itemInventoryRoute)


// Response handler Middleware
app.use((obj, req, res, next) => {
  const statusCode = obj.status || 500;
  const message = obj.message || "Something went wrong!";
  return res.status(statusCode).json({
    success: [200, 201, 204].some(a => a === obj.status) ? true : false,
    status: statusCode,
    message: message,
    data: obj.data
  })
})
// app.use(errorMiddleware);

// ------------------------------------------------------------------------------------------------------------

// Connect to MongoDB
mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB')
    app.get('/', (req, res) => {
      res.send('Hello World')
    })
    app.listen(PORT, () => {
      console.log(`server is running at port ${PORT}`)
    });
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

