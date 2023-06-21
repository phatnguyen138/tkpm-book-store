const { decodeToken } = require('../helpers/auth');
const { Error } = require('../helpers/error.helper');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return next(new Error(401, 'Unauthorized'));

    try {
        const tokenDecoded = decodeToken(token);
        req.user_id = tokenDecoded.user_id;
        req.role_id = tokenDecoded.role_id;
        next();
    } catch (error) {
        return next(new Error(403, 'Forbidden'));
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (
            req.user_id == req.params.id ||
            req.role_id === 1 ||
            req.role_id === 2
        ) {
            next();
        } else {
            return next(new Error(403, 'Forbidden'));
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user_id == req.params.id && req.role_id === 1) {
            next();
        } else {
            return next(new Error(403, 'Forbidden'));
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};
