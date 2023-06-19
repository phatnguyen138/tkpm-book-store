const userModel = require('../models/user.model');
const { encodeToken } = require('../helpers/auth');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const signUp = async (req, res) => {
    const { email, password, fullname, address } = req.body;

    // check if fields exist
    if (!email || !password || !fullname || !address) {
        return res.status(400).json({
            success: false,
            error: {
                message: 'Missing credentials'
            }
        });
    }

    // check if email is already in use
    const user = await userModel.findByEmail(email);
    if (user)
        return res.status(400).json({
            success: false,
            error: {
                message: 'Email is already in use'
            }
        });

    // hash password
    const hashed = await bcrypt.hash(password, saltRounds);
    const newUser = await userModel.create(email, hashed, fullname, address);
    return res.status(201).json({
        success: true,
        data: newUser
    });
};

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    const result = await bcrypt.compare(password, user.password);
    if (result === false)
        return res.status(401).json({
            success: false,
            error: {
                message: 'Incorrect password'
            }
        });

    const accessToken = encodeToken(user);
    res.setHeader('Authorization', accessToken);
    return res.status(200).json({
        success: true,
        accessToken
    });
};

const auth = (req, res) => {
    console.log(req.customer_id);
    return res.status(200).json({
        success: true,
        message: 'Authenticate successfully'
    });
};

module.exports = {
    signUp,
    signIn,
    auth
};
