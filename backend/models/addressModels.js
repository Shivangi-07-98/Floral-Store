const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema
const addressSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    pincode: { type: String, required: true },
    locality: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String },
    alternatePhone: { type: String },
    addressType: { type: String, enum: ['home', 'work'], default: 'home' }
});

// Create the model using the schema
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
