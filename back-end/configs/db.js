require('dotenv').config();
const pgp = require('pg-promise')({});
const moment = require('moment');

pgp.pg.types.setTypeParser(1114, function (stringValue) {
    return moment(stringValue).format('YYYY-MM-DD HH:mm:ss');
});

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

module.exports = pgp(cn);
