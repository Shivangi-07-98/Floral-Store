const Address = require("../models/addressModels");


const createAddress = async (req, res) => {
    try {
        const { name, mobile, pincode, locality, address, city, state, landmark, alternatePhonne, addressType } = req.body;

        const newAddress = new Address({
            userId: userId,
            name: name,
            mobile: mobile,
            pincode: pincode,
            locality: locality,
            address: address,
            city: city,
            state: state,
            landmark: landmark,
            alternatePhone: alternatePhone,
            addressType: addressType
        })

        newAddress.save();
        res.json("added");
    } catch (err) {
        console.log(err);
    }
}

module.exports = { createAddress };