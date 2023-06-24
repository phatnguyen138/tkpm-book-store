const db = require('../configs/db');

const findAll = async () => {
    const users = await db.any('SELECT * FROM users ORDER BY user_id ASC');
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

const create = async (fullname, email, password, address, role_id = 3) => {
    const user = await db.one(
        'INSERT INTO users (fullname, email, password, address, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [fullname, email, password, address, role_id]
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

const reset = async (password, id) => {
    const updateQuery = `UPDATE users SET password = $1 WHERE user_id = ${id} RETURNING *`;
    const user = await db.one(updateQuery, password);
    return user;
};

const remove = async (id) => {
    const res = await db.none('DELETE FROM users WHERE user_id = $1', id);
    return res;
};

module.exports = {
    findAll,
    create,
    findByEmail,
    findById,
    update,
    remove,
    reset
};
