const db = require('../configs/db');

const findAll = async () => {
    const products = await db.any('SELECT * FROM books');
    return products;
};

const findById = async (id) => {
    const product = await db.oneOrNone(
        'SELECT * FROM books WHERE book_id = $1',
        id
    );
    return product;
};

const createUser = async (email, password, fullname, address) => {
    const user = await db.none(
        'INSERT INTO customers (email, password, fullname, address) VALUES ($1, $2, $3, $4)',
        [email, password, fullname, address]
    );
    return user;
};

module.exports = {
    findAll,
    createUser,
    findById
};
