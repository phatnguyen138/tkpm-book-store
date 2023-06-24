const orderModel = require('../models/order.model');
const { Error } = require('../helpers/error.helper');
const moment = require('moment');

/* Orders Controller */

const getOrders = async (req, res, next) => {
    const orders = await orderModel.findAllOrders();
    return res.status(200).json({
        success: true,
        data: orders
    });
};

const getOrderByID = async (req, res, next) => {
    const order_id = req.params.id;
    const order = await orderModel.findById(order_id);
    return res.status(200).json({
        success: true,
        data: order
    });
};

const createOrder = async (req, res, next) => {
    const { user_id, total_amount } = req.body;
    const order = await orderModel.createOrder(user_id, total_amount);
    return res.status(201).json({
        success: true,
        data: order
    });
};

module.exports = {
    getOrderByID,
    getOrders,
    createOrder
};
