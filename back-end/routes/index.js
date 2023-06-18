const router = require('express').Router();
const userRoute = require('./user.route');
const bookRoute = require('./book.route');

router.use('/users', userRoute);
router.use('/books', bookRoute);

module.exports = router;
