const orderRoute = require('express').Router();
const orderController = require('../controllers/order.controller');
const {
    verifyToken,
    verifyTokenAndAuthorization
} = require('../middlewares/auth');

orderRoute
    .get('/items', orderController.getOrderItems)
    .post(
        '/items',
        verifyTokenAndAuthorization,
        orderController.createOrderItems
    )

    .get('/', orderController.getOrders)
    .get('/:id', orderController.getOrderById)
    .post('/', orderController.createOrder)
    .put('/', verifyTokenAndAuthorization, orderController.updateOrder)
    .delete('/', verifyTokenAndAuthorization, orderController.removeOrder);

module.exports = orderRoute;
