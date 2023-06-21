const jwt = require('jsonwebtoken');
require('dotenv').config();

const encodeToken = (user) => {
    const accessToken = jwt.sign(
        { user_id: user.user_id, email: user.email, role_id: user.role_id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
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
