const userModel = require('../models/user.model');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const signUp = async (req, res) => {
    const { email, password, fullname, address } = req.body;

    // check email is already in use
    const user = await userModel.findByEmail(email);
    if (user)
        return res.status(403).json({
            error: {
                message: 'Email is already in use'
            }
        });
    const hashed = await bcrypt.hash(password, saltRounds);
    await userModel.create(email, hashed, fullname, address);
    return res.status(201).json({
        success: true
    });
};

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    const result = await bcrypt.compare(password, user.password);
    if (result === true)
        return res.status(200).json({
            success: true
        });
};

module.exports = {
    signUp,
    signIn
};
