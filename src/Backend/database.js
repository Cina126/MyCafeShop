/* eslint-disable no-unused-vars */

const mysql = require('mysql');
const CaffeDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "CaffeShopp"
});

module.exports = CaffeDB

