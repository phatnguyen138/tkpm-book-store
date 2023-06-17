const { decodeToken } = require('../helpers/auth');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token', token);

    if (!token)
        return res.status(401).json({
            error: {
                message: 'Unauthorized'
            }
        });

    try {
        const tokenDecoded = decodeToken(token);
        console.log('tokenDecoded', tokenDecoded);
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
