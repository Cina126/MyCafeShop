const express = require("express");
const pool = require("../database.js");
const panelMenusRoutes = express.Router();

panelMenusRoutes.get("/", (req, res) => {
    pool.query(`SELECT * FROM panelmenus`, (err, result) => {
        if (err) {
            res.send(null);
            console.log(err);
        } else {
            res.send(result)


        }
    })
});

module.exports = panelMenusRoutes