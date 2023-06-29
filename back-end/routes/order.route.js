const orderRoute = require('express').Router();
const orderController = require('../controllers/order.controller');
const {
    verifyToken,
    verifyTokenAndAuthorization
} = require('../middlewares/auth');

orderRoute
    .post(
        '/:id/checkout/',
        verifyTokenAndAuthorization,
        orderController.checkoutOrder
    )
    .get('/items', verifyTokenAndAuthorization, orderController.getOrderItems)
    .post(
        '/items',
        verifyTokenAndAuthorization,
        orderController.createOrderItems
    )
    .delete(
        '/:id/items',
        verifyTokenAndAuthorization,
        orderController.removeAllItemsOrder
    )

    .get('/', orderController.getOrders)
    .get('/:id', orderController.getOrderById)
    .post('/', verifyTokenAndAuthorization, orderController.createOrder)
    .put('/', verifyTokenAndAuthorization, orderController.updateOrder)
    .delete('/', verifyTokenAndAuthorization, orderController.removeOrder);

module.exports = orderRoute;
