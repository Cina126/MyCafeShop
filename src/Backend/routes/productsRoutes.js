const express = require("express");
const cafeDatabase = require("./../database.js");
const productsRoutes = express.Router();

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

productsRoutes.get("/getProductComments", (req, res) => {
    cafeDatabase.query(`SELECT * FROM productscomments `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    });

});

productsRoutes.get("/getProductComments/subComments", (req, res) => {
    cafeDatabase.query(`SELECT * FROM productssubcomments `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

productsRoutes.post("/allProducts/searchProducts", (req, res) => {
    const grainSpread = req.body.grainType.map(item => `"${item}"`).join(", ");;
    const brandSpread = req.body.brandType.map(item => `"${item}"`).join(", ");;
    const offerSpread = req.body.offerType.map(item => `"${item}"`).join(", ");;
    console.log(offerSpread);
    cafeDatabase.query(`SELECT * FROM allProducts where
         name regexp "${req.body.inputValue}" and
         offPrice < "${req.body.filterPrice}" and
         grainType in (${grainSpread}) and
         caffeType in (${brandSpread}) and
         hasOffer in (${offerSpread})`,
        (err, result) => {
            if (err) {
                res.send(null)
            } else {
                res.send(JSON.stringify(result));
            }
        });
});

productsRoutes.post("/allProducts/addNewComments", (req, res) => {
    cafeDatabase.query(`INSERT INTO productscomments  VALUES (NULL , '${req.body.firstName}','${req.body.lastName}','${req.body.role}','${req.body.commentText}','${req.body.date}','${req.body.isVerifyed}','${req.body.userID}','${req.body.productID}') `, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send("OK");
            console.log(res);
        }
    });
});
productsRoutes.post("/allProducts/addNewSubComments", (req, res) => {
    console.log(req.body);
    cafeDatabase.query(`INSERT INTO productssubcomments  VALUES (NULL , '${req.body.firstName}','${req.body.lastName}','${req.body.commentText}','${req.body.date}','${req.body.role}','${req.body.isVerifyed}','${req.body.commentID}','${req.body.userID}','${req.body.productID}') `, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send("OK");
        }
    });
});

module.exports = productsRoutes