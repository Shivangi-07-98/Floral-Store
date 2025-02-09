const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    mobileNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
