const express = require("express");
const database = require("../database.js");

const panelNoticeRoutes = express.Router();

panelNoticeRoutes.get("/", (req, res) => {
    database.query(`SELECT * FROM notice`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

module.exports = panelNoticeRoutes