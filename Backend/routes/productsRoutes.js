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

productsRoutes.get("/getSingleProduct/:productID", (req, res) => {
    cafeDatabase.query(`SELECT * FROM allproducts where id = "${req.params.productID}" `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

productsRoutes.post("/addNewProduct", (req, res) => {
    cafeDatabase.query(
        `INSERT INTO allproducts VALUES 
        (null ,'${req.body.name}','${req.body.image}','${req.body.price}','${req.body.offPrice}','${req.body.offPrecent}',
        '${req.body.disc}','${req.body.cafeType}','${req.body.grainType}','${req.body.hasOffer}','${req.body.stars}',
        '${req.body.productCount}','${req.body.numberOfSell}' , ${req.body.campainOfferPrecent})`,
        (err, result) => {
            if (err) {
                res.send(null);
                console.log(err, req.body);
            } else {
                res.send(JSON.stringify(result));
            }
        })
});

productsRoutes.put("/editProduct/:productID", (req, res) => {
    cafeDatabase.query(
        `UPDATE allproducts SET
        name='${req.body.name}',image='${req.body.image}',price='${req.body.price}',offPrice='${req.body.offPrice}',
        offPrecent='${req.body.offPrecent}',disc='${req.body.disc}',caffeType='${req.body.caffeType}',grainType='${req.body.grainType}',
        hasOffer='${req.body.hasOffer}',stars='${req.body.stars}',productCount='${req.body.productCount}',
        numberOfSell='${req.body.numberOfSell}' WHERE id ="${req.params.productID}" `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

productsRoutes.delete("/deleteProduct/:productID", (req, res) => {
    cafeDatabase.query(
        `DELETE FROM allproducts WHERE id ="${req.params.productID}"`, (err, result) => {
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

productsRoutes.put("/editProductCommentsVerifyed/:commentID", (req, res) => {
    cafeDatabase.query(`UPDATE productscomments SET isVerifyed = 1 WHERE id = "${req.params.commentID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

productsRoutes.put("/editProductCommentsBlocked/:commentID", (req, res) => {
    cafeDatabase.query(`UPDATE productscomments SET isVerifyed = 0 WHERE id = "${req.params.commentID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

productsRoutes.put("/editProductCommentsValue/:commentID", (req, res) => {
    cafeDatabase.query(`UPDATE productscomments SET commentText = "${req.body.text}" WHERE id = "${req.params.commentID}"`, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

productsRoutes.delete("/deleteProductComments/:commentID", (req, res) => {
    cafeDatabase.query(`DELETE FROM productscomments WHERE id = "${req.params.commentID}"`, (err, result) => {
        if (err) {
            res.send(null);
            console.log(err);
        } else {
            res.send(JSON.stringify(result));
            console.log(JSON.stringify(result));
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

productsRoutes.put("/getProductComments/editSubComments/:subcommentID", (req, res) => {
    cafeDatabase.query(`UPDATE productssubcomments SET commentText='${req.body.commentText}' WHERE id = "${req.params.subcommentID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

productsRoutes.put("/getProductComments/acceptSubComments/:subCommentID", (req, res) => {
    cafeDatabase.query(`UPDATE productssubcomments SET isVerifyed = 1 WHERE id = "${req.params.subCommentID}"  `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

productsRoutes.put("/getProductComments/unAcceptSubComments/:subCommentID", (req, res) => {
    cafeDatabase.query(`UPDATE productssubcomments SET isVerifyed = 0 WHERE id = "${req.params.subCommentID}"  `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

productsRoutes.delete("/getProductComments/deleteSubComments/:subCommentID", (req, res) => {
    cafeDatabase.query(`DELETE FROM productssubcomments WHERE id = "${req.params.subCommentID}"  `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

productsRoutes.post("/allProducts/searchProducts", (req, res) => {
    const grainSpread = req.body.grainType.map(item => `"${item}"`).join(", ")
    const brandSpread = req.body.brandType.map(item => `"${item}"`).join(", ")
    const offerSpread = req.body.offerType.map(item => `"${item}"`).join(", ")
    const priceSpread = req.body.filterPrice.map(item => `"${item}"`).join(", ");

    cafeDatabase.query(` SELECT * FROM allProducts where
         name regexp "${req.body.inputValue}" and
         offPrice < ${priceSpread} and
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
    cafeDatabase.query(`INSERT INTO productssubcomments  VALUES (NULL , '${req.body.firstName}','${req.body.lastName}','${req.body.commentText}','${req.body.date}','${req.body.role}','${req.body.isVerifyed}','${req.body.commentID}','${req.body.userID}','${req.body.productID}') `, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send("OK");
        }
    });
});

module.exports = productsRoutes