const userModel = require('../models/user.model');
const { encodeToken } = require('../helpers/auth');
const { Error } = require('../helpers/error.helper');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const signUp = async (req, res, next) => {
    const { email, password, fullname, address } = req.body;

    // check if fields exist
    if (!email || !password || !fullname || !address)
        return next(new Error(400, 'Missing credentials'));

    // check if email is already in use
    const user = await userModel.findByEmail(email);
    if (user) return next(new Error(400, 'Email is already in use'));

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
    if (!email || !password) return next(new Error(400, 'Missing credentials'));
    const user = await userModel.findByEmail(email);
    if (!user) return next(new Error(404, 'Not found email'));
    const result = await bcrypt.compare(password, user.password);
    if (result === false) return next(new Error(401, 'Incorrect password'));

    const accessToken = encodeToken(user);
    res.setHeader('Authorization', accessToken);
    return res.status(200).json({
        success: true,
        accessToken
    });
};

const auth = (req, res) => {
    console.log(req.user_id);
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
