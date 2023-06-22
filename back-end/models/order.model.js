const db = require('../configs/db');

/* Orders Model */

const findAllOrders = async () => {
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

const createOrder = async (user_id, total_amount) => {
    const order = await db.one(
        'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *',
        [user_id, total_amount]
    );
    return order;
};

const updateOrderById = async (user_id, total_amount, id) => {
    const updateQuery = `UPDATE orders SET user_id = $1, total_amount = $2 WHERE order_id = ${id} RETURNING *`;
    const order = await db.one(updateQuery, [user_id, total_amount]);
    return order;
};

module.exports = {
    findById,
    findAllOrders,
    createOrder,
    updateOrderById
};
