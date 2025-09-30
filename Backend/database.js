/* eslint-disable no-unused-vars */

const mysql = require('mysql');
const CaffeDB = mysql.createConnection({

    // host: "sql12.freesqldatabase.com",
    // user: "sql12795972",
    // database: "sql12795972",
    // password: "UtICscATj8",
    // port: 3306

    host: "localhost",
    user: "root",
    database: "caffeshopp",

});

// const { Pool } = require("pg")
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false }
// })

module.exports = CaffeDB

