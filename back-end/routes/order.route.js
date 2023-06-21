const orderRoute = require('express').Router();
const orderController = require('../controllers/order.controller');
const { verifyToken } = require('../middlewares/auth');

orderRoute.get('/', orderController.getOrders);

module.exports = orderRoute;
