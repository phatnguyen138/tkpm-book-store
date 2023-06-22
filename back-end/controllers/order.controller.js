const orderModel = require('../models/order.model');
const { Error } = require('../helpers/error.helper');
const moment = require('moment');
/* Orders Controller */

const getOrders = async (req, res, next) => {
    const orders = await orderModel.findAllOrders();
    // orders.filter((ord) => {
    //     const timestamp = moment(ord.order_date).format('YYYY-MM-DD HH:mm:ss');
    //     ord.order_date = timestamp;
    // });
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
    console.log('req body', { user_id, total_amount });
    const order = await orderModel.createOrder(user_id, total_amount);
    const timestamp = moment(order.order_date);
    const formattedTimestamp = timestamp.format('YYYY-MM-DD HH:mm:ss');
    order.order_date = formattedTimestamp;
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
