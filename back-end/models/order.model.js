const db = require('../configs/db');

/* Orders Model */

const findAll = async () => {
    const orders = await db.any('SELECT * FROM orders ORDER BY order_id ASC');
    return orders;
};

const findById = async (id) => {
    const order = await db.oneOrNone(
        'SELECT * FROM orders WHERE order_id = $1',
        id
    );
    return order;
};

const findByUserId = async (id) => {
    const order = await db.any(
        'SELECT * FROM orders WHERE user_id = $1 ORDER BY order_id',
        id
    );
    return order;
};

const create = async (user_id, total_amount = 0) => {
    const order = await db.one(
        'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *',
        [user_id, total_amount]
    );
    return order;
};

const update = async (total_amount, id) => {
    const updateQuery = `UPDATE orders SET total_amount = $1 WHERE user_id = ${id} RETURNING *`;
    const order = await db.one(updateQuery, total_amount);
    return order;
};

const checkout = async (
    address_shipping,
    phone_shipping,
    user_id,
    order_id
) => {
    const order = await db.one(
        `UPDATE orders SET payment_status = 1, address_shipping = $1, phone_shipping = $2 WHERE user_id = ${user_id} AND order_id = ${order_id} RETURNING *`,
        [address_shipping, phone_shipping]
    );
    return order;
};

const updateByOrderId = async (total_amount, user_id, order_id) => {
    const updateQuery = `UPDATE orders SET total_amount = $1 WHERE user_id = ${user_id} AND order_id = ${order_id} RETURNING *`;
    const order = await db.one(updateQuery, total_amount);
    return order;
};

const remove = async (user_id, order_id) => {
    const deleteQuery = `DELETE FROM orders where user_id = ${user_id} AND order_id = ${order_id}`;
    const res = await db.none(deleteQuery);
    return res;
};

const findAllOrderItems = async () => {
    const orderItems = await db.any(
        'SELECT * FROM order_items ORDER BY order_item_id ASC'
    );
    return orderItems;
};

const findOrderItemsByOrderId = async (order_id) => {
    const orderItems = await db.any(
        'SELECT * FROM order_items WHERE order_id = $1',
        order_id
    );
    return orderItems;
};

const createOrderItem = async (order_id, book_id, quantity, item_price) => {
    const order = await db.one(
        'INSERT INTO order_items (order_id, book_id, quantity, item_price) VALUES ($1, $2, $3, $4) RETURNING *',
        [order_id, book_id, quantity, item_price]
    );
    return order;
};

const removeOrderItems = async (id) => {
    const res = await db.none(
        'DELETE FROM order_items where order_id = $1',
        id
    );
    return res;
};

module.exports = {
    findAll,
    findById,
    findByUserId,
    updateByOrderId,
    checkout,
    create,
    update,
    remove,
    removeOrderItems,
    findAllOrderItems,
    findOrderItemsByOrderId,
    createOrderItem
};
