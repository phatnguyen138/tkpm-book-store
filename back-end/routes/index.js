const router = require('express').Router();
const userRoute = require('./user.route');
const productRoute = require('./product.route');

router.use('/user', userRoute);
router.use('/product', productRoute);

module.exports = router;
