const jwt = require('jsonwebtoken');
require('dotenv').config();

const encodeToken = (user) => {
    const accessToken = jwt.sign(
        { id: user.customer_id, email: user.email },
        process.env.JWT_SECRET
    );
    return accessToken;
};

const decodeToken = (accessToken) => {
    const tokenDecoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    return tokenDecoded;
};

module.exports = {
    encodeToken,
    decodeToken
};
