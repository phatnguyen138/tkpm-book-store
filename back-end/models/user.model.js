const db = require('../configs/db');

const findAll = async () => {
    const users = await db.any('SELECT * FROM customers');
    return users;
};

const findByEmail = async (email) => {
    const users = await db.oneOrNone(
        'SELECT * FROM customers WHERE email = $1',
        email
    );
    return users;
};

const create = async (email, password, fullname, address) => {
    const user = await db.one(
        'INSERT INTO customers (email, password, fullname, address) VALUES ($1, $2, $3, $4) RETURNING *',
        [email, password, fullname, address]
    );
    return user;
};

module.exports = {
    findAll,
    create,
    findByEmail
};
