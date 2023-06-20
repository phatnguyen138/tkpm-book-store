const { decodeToken } = require('../helpers/auth');
const { Error } = require('../helpers/error.helper');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return next(new Error(401, 'Unauthorized'));

    try {
        const tokenDecoded = decodeToken(token);
        req.customer_id = tokenDecoded.id;
        next();
    } catch (error) {
        return next(new Error(403, 'Forbidden'));
    }
};

module.exports = verifyToken;
