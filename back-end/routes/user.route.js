const multer = require('multer');
const multerConfig = require('../configs/multer');
const userRoute = require('express').Router();
const userController = require('../controllers/user.controller');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../middlewares/auth');

const upload = multer(multerConfig);

userRoute
    .get('/', userController.getUsers)
    .post('/signup', userController.signUp)
    .post('/signin', userController.signIn)
    .put(
        '/update/:id',
        verifyTokenAndAuthorization,
        upload.single('avatar'),
        userController.updateUser
    )
    .delete('/delete/:id', verifyTokenAndAdmin, userController.deleteUser)
    .get('/auth', verifyToken, userController.auth);

module.exports = userRoute;
