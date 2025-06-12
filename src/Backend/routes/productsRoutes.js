const express = require("express");
const cafeDatabase = require("./../database.js");
const productsRoutes = express.Router();
const getIDFromProductName = require("./../funcs/getIDFromProductName.js")

productsRoutes.get("/allProducts", (req, res) => {
    cafeDatabase.query(`SELECT * FROM allproducts `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

productsRoutes.get("/allProducts/newestProducts", (req, res) => {
    cafeDatabase.query(`SELECT * FROM allProducts where category = "newest" `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

productsRoutes.get("/allProducts/mostSellProducts", (req, res) => {
    cafeDatabase.query(`SELECT * FROM allProducts where category = "most sell"  `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

productsRoutes.get("/allProducts/:productID", (req, res) => {
    cafeDatabase.query(`SELECT * FROM allproducts WHERE id = "${req.params.productID}" `, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

productsRoutes.get("/getProductComments/:productID", (req, res) => {
    cafeDatabase.query(`SELECT * FROM comments where productID = "${req.params.productID}" `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    });

});

productsRoutes.get("/getProductComments/subComments/:commentID", (req, res) => {
    cafeDatabase.query(`SELECT * FROM subcomments where commentID = "${req.params.commentID}" `, (err, result) => {
        if (err) {
            console.log(err);
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

productsRoutes.post("/allProducts/addNewComments", (req, res) => {
    cafeDatabase.query(`INSERT INTO comments  VALUES ('NULL , ${req.body.username}','${req.body.role}','${req.body.commentText}','${req.body.date}','${req.body.productID}','${req.body.isVerifyed}' `, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send("OK");
        }
    });
});

cafeDatabase.connect((err) => {
    if (err) {
        console.log(err);

    } else {
        // const datas = [
        //     { firstname: "سینا", lastname: "رضایی", role: "admin", dateJoined: "1400/7/17", email: "sinarezaee091@gmail.com", password: "123FD$%qw<>,swe0986", phone: "0905", token: "UGB45765FPK-trqjgk65400927-3875612plkmnbSQRT", isBlocked: 0 },
        //     { firstname: "امین", lastname: "رضایی", role: "user", dateJoined: "1402/3/10", email: "amin09831@gmail.com", password: "1KJsqFD$%qw.Mohap", phone: "0903", token: "UGB4576GirlK-trqjgk65400959-3875612plkmnbLMNT", isBlocked: 0 },
        //     { firstname: "محمد", lastname: "سعیدی", role: "user", dateJoined: "1404/9/26", email: "aminsaeedi0101011@gmail.com", password: "01010101.Mohap", phone: "0903", token: "UGB4576GirlK-trqjgk654007785-3825612plkmnblMTY", isBlocked: 0 }
        // ];

        // datas.forEach((informs) => {
        //     cafeDatabase.query(`INSERT INTO users VALUES ('NULL','${informs.firstname}','${informs.lastname}','${informs.password}','${informs.email}','${informs.phone}','${informs.token}','${informs.dateJoined}','${informs.isBlocked}')`, (err, result) => {
        //         if (err) {
        //             console.log("fatal", err);
        //         } else {
        //             console.log("Users Added");
        //         }
        //     })
        // })
    }
})

module.exports = productsRoutes