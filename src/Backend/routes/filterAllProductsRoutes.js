const express = require("express");
const database = require("../database.js");

const filterAllProductsRoutes = express.Router();

filterAllProductsRoutes.get("/grainTypes", (req, res) => {
    database.query(`SELECT * FROM graintypefilter`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});


filterAllProductsRoutes.get("/brandTypes", (req, res) => {
    database.query(`SELECT * FROM brandsfilter`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

filterAllProductsRoutes.get("/brandTypes", (req, res) => {
    database.query(`UPDATE brandsfilter SET null, null, null, isChecked='${req.body.checkedType}' WHERE id =${req.body.id}`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

filterAllProductsRoutes.get("/offersType", (req, res) => {
    database.query(`SELECT * FROM offersfilter`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

module.exports = filterAllProductsRoutes