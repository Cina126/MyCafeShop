const express = require("express");
const database = require("../database.js");

const readableArticles = express.Router();

readableArticles.get("/", (req, res) => {
    database.query(`SELECT * FROM readablearticles`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});