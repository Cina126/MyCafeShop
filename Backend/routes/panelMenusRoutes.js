const express = require("express");
const CaffeDB = require("../database.js");
const panelMenusRoutes = express.Router();

panelMenusRoutes.get("/", (req, res) => {
    CaffeDB.query(`SELECT * FROM panelmenus`, (err, result) => {
        if (err) {
            res.send(null);
            console.log(err);
        } else {
            res.send(result)


        }
    })
});

module.exports = panelMenusRoutes