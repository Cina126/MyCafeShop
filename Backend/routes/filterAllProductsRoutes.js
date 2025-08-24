const express = require("express");
const database = require("../database.js");

const filterAllProductsRoutes = express.Router();

filterAllProductsRoutes.get("/grainTypes", (req, res) => {
    database.query(`SELECT * FROM graintypefilter`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});


filterAllProductsRoutes.get("/brandTypes", (req, res) => {
    database.query(`SELECT * FROM brandsfilter`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

filterAllProductsRoutes.put("/brandTypes/:brandID", (req, res) => {
    database.query(`UPDATE brandsfilter SET isChecked='${req.body.checkedType}' WHERE id ="${req.params.brandID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

filterAllProductsRoutes.get("/offersType", (req, res) => {
    database.query(`SELECT * FROM offersfilter`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

module.exports = filterAllProductsRoutes