const express = require("express");
const database = require("./../database.js");

const categorieRoutes = express.Router();

categorieRoutes.get("/getCupCategories", (req, res) => {
    database.query(`SELECT * FROM categories`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)
        }
    })
});

categorieRoutes.get("/getTwoSideCategories", (req, res) => {
    database.query(`SELECT * FROM twosidecategories`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

module.exports = categorieRoutes