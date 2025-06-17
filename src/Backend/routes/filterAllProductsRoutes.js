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

filterAllProductsRoutes.put("/grainTypes", (req, res) => {
    database.query(`UPDATE graintypefilter SET isChecked = CASE WHEN id ="${req.body.id}" THEN 1 ELSE 0 END`, (err, result) => {
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

filterAllProductsRoutes.put("/brandTypes", (req, res) => {
    database.query(`UPDATE brandsfilter SET isChecked = CASE WHEN id ="${req.body.id}" THEN 1 ELSE 0 END`, (err, result) => {
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

filterAllProductsRoutes.put("/offersType", (req, res) => {
    database.query(`UPDATE offersfilter SET isChecked = CASE WHEN id ="${req.body.id}" THEN 1 ELSE 0 END`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

module.exports = filterAllProductsRoutes