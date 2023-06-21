const multer = require('multer');
const multerConfig = require('../configs/multer');
const userRoute = require('express').Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth');

const upload = multer(multerConfig);

userRoute
    .post('/signup', userController.signUp)
    .post('/signin', userController.signIn)
    .put('/update/:id', upload.single('avatar'), userController.updateUser)
    .get('/auth', verifyToken, userController.auth);

module.exports = userRoute;
