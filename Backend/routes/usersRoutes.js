const express = require("express");
const cafeDatabase = require("./../database.js");
const usersRoutes = express.Router();
const getIDFromAuth = require("./../funcs/getIDFromAuth.js");
const uniqToken = require("./../funcs/jwt.js");

usersRoutes.get("/getAllUsers", (req, res) => {
    cafeDatabase.query(`SELECT * FROM users `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

usersRoutes.get("/getSingleUsers/:userID", (req, res) => {
    cafeDatabase.query(`SELECT * FROM users where id = "${req.params.userID}" `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

usersRoutes.put("/editUserVerify/:userID", (req, res) => {
    if (+req.body.isBlocked === 1) {
        cafeDatabase.query(`UPDATE users SET isBlocked = 0 WHERE id = "${req.params.userID}" `, (err, result) => {
            if (err) {
                res.send(null);
            } else {
                res.send(result)


            }
        })
    } else {
        cafeDatabase.query(`UPDATE users SET isBlocked = 1 WHERE id = "${req.params.userID}" `, (err, result) => {
            if (err) {
                res.send(null);
            } else {
                res.send(result)


            }
        })
    }

});

usersRoutes.put("/editUser/:userID", (req, res) => {
    cafeDatabase.query(`UPDATE users SET firstName = '${req.body.firstName}' ,lastName='${req.body.lastName}',password='${req.body.password}',email='${req.body.email}',phone='${req.body.phone}',token='${req.body.token}',role='${req.body.role}',dateJoined='${req.body.dateJoined}',isBlocked='${req.body.isBlocked}' WHERE id = "${req.params.userID}" `, (err, result) => {
        if (err) {
            res.send(null);
            console.log(err);
        } else {
            res.send(result)


        }
    })
});

usersRoutes.delete("/deleteUser/:userID", (req, res) => {
    cafeDatabase.query(`DELETE FROM users WHERE id = "${req.params.userID}" `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

usersRoutes.get("/getUserInforms", (req, res) => {

    cafeDatabase.query(`SELECT * FROM users WHERE token = "${req.headers.authorization}" `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

usersRoutes.post("/getUserInformsLogin", (req, res) => {
    cafeDatabase.query(`SELECT * FROM users WHERE firstName = "${req.body.firstName}" and lastName = "${req.body.lastName}" and password = "${req.body.password}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

usersRoutes.get("/getUserProducts", (req, res) => {
    let userID = null;
    getIDFromAuth(req.headers.authorization).then(resolved => {
        userID = resolved[0].id;
        cafeDatabase.query(`SELECT * FROM usercart WHERE userID = "${userID}" `, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result)


            }
        })
    });
});

usersRoutes.post("/registerNewUser", (req, res) => {
    const jwtCreator = uniqToken();
    const datas = req.body[0];
    cafeDatabase.query(` INSERT INTO users VALUES (NULL ,'${datas.firstName}','${datas.lastName}','${datas.password}','${datas.email}','${datas.phone}','${jwtCreator}',"کاربر",'${datas.dateJoined}','${datas.isBlocked}')`, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(jwtCreator);
        }
    })
});

module.exports = usersRoutes