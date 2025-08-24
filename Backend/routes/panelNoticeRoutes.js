const express = require("express");
const database = require("../database.js");

const panelNoticeRoutes = express.Router();

panelNoticeRoutes.get("/", (req, res) => {
    database.query(`SELECT * FROM notice`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

panelNoticeRoutes.get("/getSingelTitle/:noticeID", (req, res) => {
    database.query(`SELECT * FROM notice WHERE id = "${req.params.noticeID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

panelNoticeRoutes.put("/editActivition/:noticeID", (req, res) => {
    database.query(`UPDATE notice SET isActive='${req.body.isActive}' WHERE id = "${req.params.noticeID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

panelNoticeRoutes.put("/editTitle/:noticeID", (req, res) => {
    database.query(`UPDATE notice SET title='${req.body.title}' WHERE id = "${req.params.noticeID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

panelNoticeRoutes.delete("/deleteNotice/:noticeID", (req, res) => {
    database.query(`DELETE FROM notice WHERE id = "${req.params.noticeID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

panelNoticeRoutes.post("/addNewNotice", (req, res) => {
    database.query(`INSERT INTO notice VALUES (null ,'${req.body.title}','1')`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

module.exports = panelNoticeRoutes