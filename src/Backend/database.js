/* eslint-disable no-unused-vars */

const mysql = require('mysql');
const CaffeDB = mysql.createConnection({
    
    // host: "mysql://root:cDjJneNr9h65LLCiF5zjS7Pr@my-cafe-shop:3306/inspiring_ramanujan",
    // user: "root",
    // database: "CaffeShopp"

    host: "my-cafe-shop",
    user: "root",
    database: "inspiring_ramanujan"
});

module.exports = CaffeDB

