const userRoute = require('express').Router();
const userController = require('../controllers/user.controller');

userRoute
    .post('/signup', userController.signUp)
    .post('/signin', userController.signIn);

module.exports = userRoute;
