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
    const order = await db.oneOrNone(
        'SELECT * FROM orders WHERE user_id = $1',
        id
    );
    return order;
};

const create = async (user_id, total_amount) => {
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

const remove = async (id) => {
    const res = await db.none('DELETE FROM orders where user_id = $1', id);
    return res;
};

const findAllOrderItems = async () => {
    const orderItems = await db.any(
        'SELECT * FROM order_items ORDER BY order_item_id ASC'
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

module.exports = {
    findAll,
    findById,
    findByUserId,
    create,
    update,
    remove,
    findAllOrderItems,
    createOrderItem
};
