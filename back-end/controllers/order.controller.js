const orderModel = require('../models/order.model');
const bookModel = require('../models/book.model');
const userModel = require('../models/user.model');
const { Error } = require('../helpers/error.helper');
const orderRoute = require('../routes/order.route');

/* Orders Controller */

const getOrders = async (req, res, next) => {
    const orders = await orderModel.findAll();
    for (const order of orders) {
        const { fullname, email, address, phone } = await userModel.findById(
            order.user_id
        );
        order.user = { fullname, email, address, phone };
    }
    return res.status(200).json({
        success: true,
        data: {
            orders
        }
    });
};

const getOrderById = async (req, res, next) => {
    const order_id = req.params.id;
    if (!order_id) return next(new Error(400, 'Missing fields'));
    const order = await orderModel.findById(order_id);
    if (!order) return next(new Error(400, 'User not found'));
    const { fullname, email, address, phone } = await userModel.findById(
        order.user_id
    );
    order.user = { fullname, email, address, phone };
    return res.status(200).json({
        success: true,
        data: order
    });
};

const createOrder = async (req, res, next) => {
    const user_id = req.user_id;
    let orders = await orderModel.findByUserId(user_id);
    let order = null;
    let FoundOrder = orders.find((ord) => ord.payment_status === 0);
    if (!FoundOrder) {
        order = await orderModel.create(user_id);
    } else {
        return next(new Error(404, 'Order is already exist'));
    }
    const { userId, fullname, email, address, phone } =
        await userModel.findById(order.user_id);
    order.user = { userId, fullname, email, address, phone };
    delete order.user_id;
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
    try {
        const user_id = req.user_id;
        const order_id = req.params.id;
        if (!user_id) return next(new Error(400, 'User not found'));
        if (!order_id) return next(new Error(400, 'Order not found'));
        const orders = await orderModel.findByUserId(user_id);
        await orderModel.remove(user_id, order_id);
        return res.status(200).json({
            success: true
        });
    } catch (error) {
        return next(error);
    }
};

const checkoutOrder = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const order_id = req.params.id;
        const { address_shipping, phone_shipping } = req.body;
        console.log('req body', { address_shipping, phone_shipping });
        if (!user_id) return next(new Error(400, 'User not found'));
        if (!order_id) return next(new Error(400, 'Order not found'));
        const order = await orderModel.checkout(
            address_shipping,
            phone_shipping,
            user_id,
            order_id
        );
        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        return next(error);
    }
};

/* Order Items Model */

const getOrderItems = async (req, res, next) => {
    const user_id = req.user_id;
    if (!user_id) return next(new Error(400, 'User not found'));
    let orders = await orderModel.findByUserId(user_id);
    let order = null;
    if (!orders || orders.length === 0) {
        order = await orderModel.create(user_id);
        orders.push(order);
    }
    let FoundOrder = orders.find((ord) => ord.payment_status === 0);
    if (!FoundOrder) {
        order = await orderModel.create(user_id);
        orders.push(order);
    } else order = FoundOrder;
    let items = await orderModel.findOrderItemsByOrderId(order.order_id);

    const { userId, fullname, email, address, phone } =
        await userModel.findById(order.user_id);
    order.user = { userId, fullname, email, address, phone };
    delete order.user_id;

    for (const item of items) {
        item.book = await bookModel.findBookById(item.book_id);
        delete item.book_id;
    }
    return res.status(200).json({
        success: true,
        data: {
            order: order,
            items
        }
    });
};

const createOrderItems = async (req, res, next) => {
    const user_id = req.user_id;
    const orders = await orderModel.findByUserId(user_id);
    let order = null;
    let FoundOrder = orders.find((ord) => ord.payment_status === 0);
    if (!FoundOrder) return next(new Error(400, 'Order not found'));
    else order = FoundOrder;
    const { book_id, quantity } = req.body;

    // get item
    const book = await bookModel.findBookById(book_id);
    const item_price = book.price - book.price * book.discount;

    // add item to order
    const orderItem = await orderModel.createOrderItem(
        order.order_id,
        book_id,
        quantity,
        item_price
    );

    // update total_amount in order
    const total_amount = order.total_amount + item_price * quantity;
    await orderModel.updateByOrderId(total_amount, user_id, order.order_id);

    return res.status(201).json({
        success: true,
        data: orderItem
    });
};

module.exports = {
    getOrderById,
    checkoutOrder,
    getOrders,
    createOrder,
    updateOrder,
    removeOrder,
    getOrderItems,
    createOrderItems
};
