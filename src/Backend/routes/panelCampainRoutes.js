const express = require("express");
const database = require("../database.js");

const panelCampainRoutes = express.Router();

panelCampainRoutes.get("/", (req, res) => {
    database.query(`SELECT * FROM campains`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

module.exports = panelCampainRoutes