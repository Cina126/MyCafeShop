const express = require("express");
const cafeDatabase = require("../database.js");
const panelMenusRoutes = express.Router();

panelMenusRoutes.get("/panelMenus", (req, res) => {
    cafeDatabase.query(`SELECT * FROM panelmenus`, (err, result) => {
        if (err) {
            res.send(null);
            console.log(err);
        } else {
            res.send(JSON.stringify(result));
            console.log(result);
        }
    })
});

module.exports = panelMenusRoutes