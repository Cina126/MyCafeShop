const express = require("express");
const database = require("./../database.js");

const offCodesRoutes = express.Router();

offCodesRoutes.post("/studyOffCode", (req, res) => {
    database.query(`SELECT * FROM offcodes WHERE code = "${req.body.code}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

module.exports = offCodesRoutes