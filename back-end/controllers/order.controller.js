const orderModel = require('../models/order.model');
const bookModel = require('../models/book.model');
const { Error } = require('../helpers/error.helper');
const moment = require('moment');

/* Orders Controller */

const getOrders = async (req, res, next) => {
    const orders = await orderModel.findAll();
    return res.status(200).json({
        success: true,
        data: orders
    });
};

const getOrderById = async (req, res, next) => {
    const order_id = req.params.id;
    if (!order_id) return next(new Error(400, 'Missing fields'));
    const order = await orderModel.findById(order_id);
    return res.status(200).json({
        success: true,
        data: order
    });
};

const createOrder = async (req, res, next) => {
    const { user_id, total_amount } = req.body;
    const order = await orderModel.create(user_id, total_amount);
    return res.status(201).json({
        success: true,
        data: order
    });
};

const updateOrder = async (req, res, next) => {
    const user_id = req.user_id;
    const { total_amount } = req.body;
    if (!user_id || !total_amount)
        return next(new Error(400, 'Missing fields'));
    const order = await orderModel.update(total_amount, user_id);
    return res.status(200).json({
        success: true,
        data: order
    });
};

const removeOrder = async (req, res, next) => {
    const user_id = req.user_id;
    if (!user_id) return next(new Error(400, 'Missing fields'));
    await orderModel.remove(user_id);
    return res.status(200).json({
        success: true
    });
};

/* Order Items Model */

const getOrderItems = async (req, res, next) => {
    const orderItems = await orderModel.findAllOrderItems();
    return res.status(200).json({
        success: true,
        data: orderItems
    });
};

const createOrderItems = async (req, res, next) => {
    const user_id = req.user_id;
    console.log('user id', user_id);
    const order = await orderModel.findByUserId(user_id);
    console.log(order);
    const { book_id, quantity } = req.body;

    const book = await bookModel.findBookById(book_id);
    const orderItem = await orderModel.createOrderItem(
        order.order_id,
        user_id,
        quantity,
        book.price
    );
    return res.status(201).json({
        success: true,
        data: orderItem
    });
};

module.exports = {
    getOrderById,
    getOrders,
    createOrder,
    updateOrder,
    removeOrder,
    getOrderItems,
    createOrderItems
};
