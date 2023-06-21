const db = require('../configs/db');

const findAll = async () => {
    const users = await db.any('SELECT * FROM users');
    return users;
};

const findByEmail = async (email) => {
    const user = await db.oneOrNone(
        'SELECT * FROM users WHERE email = $1',
        email
    );
    return user;
};
const findById = async (id) => {
    const user = await db.oneOrNone(
        'SELECT * FROM users WHERE user_id = $1',
        id
    );
    return user;
};

const create = async (fullname, email, password, address) => {
    const user = await db.one(
        'INSERT INTO users (fullname, email, password, address) VALUES ($1, $2, $3, $4) RETURNING *',
        [fullname, email, password, address]
    );
    return user;
};

const update = async (fullname, email, avatar, address, phone, id) => {
    const updateQuery = `UPDATE users SET fullname = $1, email = $2, avatar = $3, address = $4, phone = $5 WHERE user_id = ${id} RETURNING *`;
    const user = await db.one(updateQuery, [
        fullname,
        email,
        avatar,
        address,
        phone
    ]);
    return user;
};

module.exports = {
    findAll,
    create,
    findByEmail,
    findById,
    update
};
