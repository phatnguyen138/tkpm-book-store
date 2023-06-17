const userRoute = require('express').Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth');

userRoute
    .post('/signup', userController.signUp)
    .post('/signin', userController.signIn)
    .get('/auth', verifyToken, userController.auth);

module.exports = userRoute;
