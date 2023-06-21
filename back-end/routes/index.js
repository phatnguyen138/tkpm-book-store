const router = require('express').Router();

const userRoute = require('./user.route');
const bookRoute = require('./book.route');
const orderRoute = require('./order.route');

router.use('/users', userRoute);
router.use('/books', bookRoute);
router.use('/orders', orderRoute);

module.exports = router;
