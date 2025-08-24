const express = require("express");
const database = require("./../database.js");

const offCodesRoutes = express.Router();

offCodesRoutes.get("/getAllOffsCode", (req, res) => {
    database.query(`SELECT * FROM offcodes`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

offCodesRoutes.post("/addNewOffCode", (req, res) => {
    database.query(`INSERT INTO offcodes VALUES (null,"${req.body.code}","${req.body.precent}","${req.body.amount}", 0 ,"${req.body.dateCreated}" ,"${req.body.creator}")`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

offCodesRoutes.put("/updateOffCode/:codeID", (req, res) => {
    database.query(`UPDATE offcodes SET code='${req.body.code}',precent='${req.body.precent}',amount='${req.body.amount}',timeUsed='${req.body.timeUsed}',dateCreated='${req.body.dateCreated}',creator='${req.body.creator}' WHERE id = "${req.params.codeID}"`, (err, result) => {
        if (err) {
            res.send(null);
            console.log(err);
        } else {
            res.send(result)


        }
    })
});

offCodesRoutes.delete("/deleteOffCode/:codeID", (req, res) => {
    database.query(`DELETE FROM offcodes WHERE id = "${req.params.codeID}" `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

offCodesRoutes.post("/studyOffCode", (req, res) => {
    database.query(`SELECT * FROM offcodes WHERE code = "${req.body.code}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else if (result?.[0]?.amount > result?.[0]?.timeUsed) {
            res.send(result)


        } else {
            res.send(null)
        }
    })
});

offCodesRoutes.put("/offCodeAmount", (req, res) => {
    database.query(`UPDATE offcodes SET timeUsed = "${req.body.timeUsedUpdate}" WHERE id =" ${req.body.codeID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

offCodesRoutes.post("/studyOffCodeUserUsage", (req, res) => {
    database.query(`SELECT * FROM offcodeuserusage WHERE offCodeID = "${req.body.codeID}" and userID = "${req.body.userID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

offCodesRoutes.post("/offCodeUserUsage", (req, res) => {
    database.query(`INSERT INTO offcodeuserusage VALUES (null,'${req.body.userID}','${req.body.offCodeID}')`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

module.exports = offCodesRoutes