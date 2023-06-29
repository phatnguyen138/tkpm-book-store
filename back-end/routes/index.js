const router = require('express').Router();

const userRoute = require('./user.route');
const bookRoute = require('./book.route');
const orderRoute = require('./order.route');
const billRoute = require('./bill.route');
const reportRoute = require('./report.route');

router.use('/users', userRoute);
router.use('/books', bookRoute);
router.use('/orders', orderRoute);
router.use('/bills', billRoute);
router.use('/reports', reportRoute);

module.exports = router;
