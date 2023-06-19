const { decodeToken } = require('../helpers/auth');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({
            error: {
                message: 'Unauthorized'
            }
        });

    try {
        const tokenDecoded = decodeToken(token);
        req.customer_id = tokenDecoded.id;
        next();
    } catch (error) {
        return res.status(403).json({
            error: {
                message: 'Forbidden'
            }
        });
    }
};

module.exports = verifyToken;
