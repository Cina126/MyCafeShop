/* eslint-disable no-unused-vars */

const mysql = require('mysql');
const CaffeDB = mysql.createConnection({

    host: "localhost",
    user: "root",
    database: "CaffeShopp"

    // host: "my-cafe-shop",
    // user: "root",
    // database: "mystifying_murdock"
});

module.exports = CaffeDB

