const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    user: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number, 
        required: true
    },
    paymentStatus: {
        type: String, 
        default: 'Pending'
    },
    orderStatus: {
        type: String, 
        default: 'Pending'
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }

});


module.exports = mongoose.model('Order', orderSchema);
