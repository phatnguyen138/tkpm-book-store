const orderModel = require('../models/order.model');
const { Error } = require('../helpers/error.helper');

const getOrders = async (req, res, next) => {
    const orders = await orderModel.findAllOrders();
    return res.status(200).json({
        success: true,
        data: orders
    });
};

module.exports = {
    getOrders
};
