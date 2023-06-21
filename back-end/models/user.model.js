const db = require('../configs/db');

const findAll = async () => {
    const users = await db.any('SELECT * FROM users');
    return users;
};

const findByEmail = async (email) => {
    const users = await db.oneOrNone(
        'SELECT * FROM users WHERE email = $1',
        email
    );
    return users;
};

const create = async (email, password, fullname, address) => {
    const user = await db.one(
        'INSERT INTO users (email, password, fullname, address) VALUES ($1, $2, $3, $4) RETURNING *',
        [email, password, fullname, address]
    );
    return user;
};

module.exports = {
    findAll,
    create,
    findByEmail
};
