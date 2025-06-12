const express = require("express");
const database = require("../database.js");

const menueRoutes = express.Router();

menueRoutes.get("/", (req, res) => {
    database.query(`SELECT * FROM menuelinks`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

module.exports = menueRoutes