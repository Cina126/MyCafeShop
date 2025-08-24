const express = require("express");
const database = require("../database.js");

const moment = require("moment")

const panelCampainRoutes = express.Router();

panelCampainRoutes.get("/", (req, res) => {
    database.query(`SELECT * FROM campains`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

panelCampainRoutes.put("/editProductsCampainPrecent", (req, res) => {
    const productsIDSpread = req.body.productsID.map(item => `"${item}"`).join(", ")
    database.query(`UPDATE allproducts SET campainOfferPrecent = CASE WHEN id in (${productsIDSpread}) THEN '${req.body.campainOfferPrecent}' ELSE '0' END `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

panelCampainRoutes.post("/addNewCampain", (req, res) => {
    const days = moment().add(+req.body.days, "days").format("YYYY-MM-DD 23:59:59")
    database.query(`INSERT INTO campains VALUES (null,'${req.body.title}','${req.body.campainOfferPrecent}','${days}' , '${req.body.isActive}')`, (err, result) => {
        if (err) {
            res.send(null);
            console.log(err);
        } else {
            res.send(result)


        }
    })
});

panelCampainRoutes.put("/editCampain/:campainID", (req, res) => {
    const days = moment().add(+req.body.days, "days").format("YYYY-MM-DD 23:59:59")
    database.query(`UPDATE campains SET title='${req.body.title}',campainOfferPrecent='${req.body.campainOfferPrecent}',days='${days}' WHERE id = '${req.params.campainID}'`, (err, result) => {
        if (err) {
            res.send(null);
            console.log(err);
        } else {
            res.send(result)


        }
    })
});

panelCampainRoutes.delete("/removeCampain/:campainID", (req, res) => {
    database.query(`DELETE FROM campains WHERE id = "${req.params.campainID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

panelCampainRoutes.put("/editCampainActivity/:campainID", (req, res) => {
    database.query(`UPDATE campains SET isActive = '${req.body.isActive}' WHERE id = "${req.params.campainID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
})

module.exports = panelCampainRoutes