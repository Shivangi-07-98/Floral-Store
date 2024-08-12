const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: 'Existing user found with same email address' });
        }
        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            mobileNumber: req.body.contact
        });
        await user.save();
        return res.status(200).json({ success: true, message: 'signed up successfully' });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal Server Error');
    }
};

const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const passCompare = req.body.password === user.password;
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                res.json({ success: false, errors: "Wrong password" });
            }
        } else {
            res.json({ success: false, errors: "Wrong Email ID" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getUser=async(req,res)=>{
    try{
        const result=await User.find();
        res.json({
            status:200,
            data:result
        })
    }catch(err){
        res.send("error")
    }
}

module.exports = {
    signup,
    login,
    getUser
};
