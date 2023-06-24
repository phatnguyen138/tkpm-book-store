const userModel = require('../models/user.model');
const { encodeToken } = require('../helpers/auth');
const { Error } = require('../helpers/error.helper');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const getUsers = async (req, res, next) => {
    const users = await userModel.findAll();
    return res.status(200).json({
        success: true,
        data: users
    });
};

const getUserById = async (req, res, next) => {
    const user_id = req.params.id;
    const user = await userModel.findById(user_id);
    return res.status(200).json({
        success: true,
        data: user
    });
};

const getProfileUser = async (req, res, next) => {
    const user_id = req.user_id;
    console.log('user_id', user_id);
    const user = await userModel.findById(user_id);
    return res.status(200).json({
        success: true,
        data: user
    });
};

const signUp = async (req, res, next) => {
    const { fullname, password, email, address, role_id } = req.body;

    // check if fields exist
    if (!fullname || !password || !email || !address)
        return next(new Error(400, 'Missing credentials'));

    // check if email is already in use
    const user = await userModel.findByEmail(email);
    if (user) return next(new Error(400, 'Email is already in use'));

    // hash password
    const hashed = await bcrypt.hash(password, saltRounds);
    const newUser = await userModel.create(
        fullname,
        email,
        hashed,
        address,
        role_id
    );
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
    console.log('user id', req.user_id);
    console.log('role id', req.role_id);
    return res.status(200).json({
        success: true,
        message: 'Authenticate successfully'
    });
};

const updateUser = async (req, res, next) => {
    const { fullname, email, address, phone } = req.body;

    const user_id = req.params.id;
    const user = await userModel.findById(user_id);
    if (!user) return next(new Error(404, 'Not found'));

    if (!fullname && !email && !req.file && !address && !phone)
        return res.status(200).json({
            success: true,
            data: user
        });

    const avatar = req.file
        ? `http://localhost:3000/avatars/${req.file.filename}`
        : undefined;
    const updatedUser = { fullname, email, avatar, address, phone };

    // replace new user to old user
    for (let prop in updatedUser) {
        if (
            updatedUser.hasOwnProperty(prop) &&
            updatedUser[prop] !== undefined
        ) {
            user[prop] = updatedUser[prop];
        }
    }

    // check email is exist
    const isExistEmail = await userModel.findByEmail(user.email);
    if (isExistEmail && isExistEmail.user_id !== user.user_id)
        return next(new Error(400, 'Email is already in use'));

    await userModel.update(
        user.fullname,
        user.email,
        user.avatar,
        user.address,
        user.phone,
        user.user_id
    );
    return res.status(200).json({
        success: true,
        data: user
    });
};

const deleteUser = async (req, res, next) => {
    const user_id = req.params.id;
    await userModel.remove(user_id);
    return res.status(200).json({
        success: true
    });
};

const resetPassword = async (req, res, next) => {
    const user_id = req.user_id;
    const { password } = req.body;
    // check if fields exist
    if (!password) return next(new Error(400, 'Missing credentials'));

    // hash password
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = await userModel.reset(hashed, user_id);

    return res.status(200).json({
        success: true
    });
};

module.exports = {
    getUsers,
    getProfileUser,
    getUserById,
    signUp,
    signIn,
    auth,
    updateUser,
    deleteUser,
    resetPassword
};
