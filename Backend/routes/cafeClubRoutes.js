const express = require("express");
const database = require("../database.js");

const cafeClubRoutes = express.Router();

cafeClubRoutes.get("/", (req, res) => {
    database.query(`SELECT * FROM cafeclub`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)

        }
    })
});

module.exports = cafeClubRoutes