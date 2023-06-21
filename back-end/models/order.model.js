const db = require('../configs/db');

const findAllOrders = async () => {
    const orders = await db.any('SELECT * FROM orders ORDER BY order_id ASC');
    return orders;
};

module.exports = {
    findAllOrders
};
