const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleModelSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: false },
    vehicleType: { 
        type: String, 
        required: true, 
        enum: ['5-seater', '7-seater'] },
    pricePerKm: { type: Number, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [String], required: true }
    }
});

vehicleModelSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('VehicleModel', vehicleModelSchema);
