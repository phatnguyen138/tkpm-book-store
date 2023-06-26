const orderRoute = require('express').Router();
const orderController = require('../controllers/order.controller');
const {
    verifyToken,
    verifyTokenAndAuthorization
} = require('../middlewares/auth');

orderRoute
    .get('/items', verifyTokenAndAuthorization, orderController.getOrderItems)
    .post(
        '/items',
        verifyTokenAndAuthorization,
        orderController.createOrderItems
    )
    .post(
        '/checkout',
        verifyTokenAndAuthorization,
        orderController.checkoutOrder
    )

    .get('/', orderController.getOrders)
    .get('/:id', orderController.getOrderById)
    .post('/', verifyTokenAndAuthorization, orderController.createOrder)
    .put('/', verifyTokenAndAuthorization, orderController.updateOrder)
    .delete('/', verifyTokenAndAuthorization, orderController.removeOrder);

module.exports = orderRoute;
