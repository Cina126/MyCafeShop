const express = require("express");
const CaffeDB = require("./../database.js");
const productsRoutes = express.Router();

const path = require("path")
const multer = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

productsRoutes.get("/allProducts", (req, res) => {
    CaffeDB.query(`SELECT * FROM allproducts `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

productsRoutes.get("/getSingleProduct/:productID", (req, res) => {
    CaffeDB.query(`SELECT * FROM allproducts where id = "${req.params.productID}" `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

productsRoutes.post("/addNewProduct", upload.single("image"), (req, res) => {

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null

    CaffeDB.query(
        `INSERT INTO allproducts VALUES 
        (null ,'${req.body.name}','${imagePath}','${req.body.price}','${req.body.offPrice}','${req.body.offPrecent}',
        '${req.body.disc}','${req.body.cafeType}','${req.body.grainType}','${req.body.hasOffer}','${req.body.stars}',
        '${req.body.productCount}','${req.body.numberOfSell}' , ${req.body.campainOfferPrecent})`,
        (err, result) => {
            if (err) {
                res.send(null);
                console.log(err, req.body);
            } else {
                res.send(result)
            }
        })
});

productsRoutes.put("/editProduct/:productID", upload.single("image"), (req, res) => {
    const productID = req.params.productID;
    if (req.file) {
        const imagePath = `/uploads/${req.file.filename}`;
        CaffeDB.query(`SELECT image FROM allproducts WHERE id='${productID}'`, (err, result) => {
            if (err) return res.status(500).send("DB Error");

            const oldImagePath = result[0]?.image;

            CaffeDB.query(`UPDATE allproducts SET name='${req.body.name}',image='${imagePath}',price='${req.body.price}',offPrice='${req.body.offPrice}',offPrecent='${req.body.offPrecent}',disc='${req.body.disc}',caffeType='${req.body.caffeType}',grainType='${req.body.grainType}',hasOffer='${req.body.hasOffer}',stars='${req.body.stars}',productCount='${req.body.productCount}',numberOfSell='${req.body.numberOfSell}' WHERE id ="${req.params.productID}"`,
                (err, result) => {
                    if (err) return res.status(500).send("Update Error");
                    if (oldImagePath) {
                        const fullOldPath = path.join(__dirname, "..", oldImagePath);
                        fs.unlink(fullOldPath, (unlinkErr) => {
                            if (unlinkErr) console.log("⚠️ حذف عکس قبلی ناموفق:", unlinkErr.message);
                        });
                    }
                    res.send(result);
                }
            );
        });
    }
    else {
        CaffeDB.query(
            `UPDATE allproducts SET
             name='${req.body.name}',price='${req.body.price}',offPrice='${req.body.offPrice}',
             offPrecent='${req.body.offPrecent}',disc='${req.body.disc}',caffeType='${req.body.caffeType}',grainType='${req.body.grainType}',
             hasOffer='${req.body.hasOffer}',stars='${req.body.stars}',productCount='${req.body.productCount}',
             numberOfSell='${req.body.numberOfSell}' WHERE id ="${req.params.productID}" `,
            (err, result) => {
                if (err) res.status(500).send("Update Error");
                else res.send(result);
            }
        );
    }
});

productsRoutes.delete("/deleteProduct/:productID", (req, res) => {

    const selectQuery = `SELECT image FROM allproducts WHERE id = ${req.params.productID}`;
    const deleteQuery = `DELETE FROM allproducts WHERE id = ${req.params.productID}`;

    CaffeDB.query(selectQuery, (err, result) => {
        if (err) return res.status(500).json({ error: "DB error" });

        if (result.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        const imagePath = result[0].image;

        CaffeDB.query(deleteQuery, (err2) => {
            if (err2) return res.status(500).json({ error: "Delete error" });

            if (imagePath) {
                const fullPath = path.join(__dirname, "..", imagePath);
                fs.unlink(fullPath, (err3) => {
                    if (err3) {
                        console.error("File delete error:", err3);
                    }
                });
            }

            res.json({ success: true, message: "Product deleted" });
        });
    });
});

productsRoutes.get("/allProducts/newestProducts", (req, res) => {
    CaffeDB.query(`SELECT * FROM allProducts where category = "newest" `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)
        }
    })
});

productsRoutes.get("/allProducts/mostSellProducts", (req, res) => {
    CaffeDB.query(`SELECT * FROM allProducts where category = "most sell"  `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    })
});

productsRoutes.get("/allProducts/:productID", (req, res) => {
    CaffeDB.query(`SELECT * FROM allproducts WHERE id = "${req.params.productID}" `, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result)


        }
    })
});

productsRoutes.get("/getProductComments", (req, res) => {
    CaffeDB.query(`SELECT * FROM productscomments `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    });
});

productsRoutes.put("/editProductCommentsVerifyed/:commentID", (req, res) => {
    CaffeDB.query(`UPDATE productscomments SET isVerifyed = 1 WHERE id = "${req.params.commentID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    });
});

productsRoutes.put("/editProductCommentsBlocked/:commentID", (req, res) => {
    CaffeDB.query(`UPDATE productscomments SET isVerifyed = 0 WHERE id = "${req.params.commentID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    });
});

productsRoutes.put("/editProductCommentsValue/:commentID", (req, res) => {
    CaffeDB.query(`UPDATE productscomments SET commentText = "${req.body.text}" WHERE id = "${req.params.commentID}"`, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result)


        }
    });
});

productsRoutes.delete("/deleteProductComments/:commentID", (req, res) => {
    CaffeDB.query(`DELETE FROM productscomments WHERE id = "${req.params.commentID}"`, (err, result) => {
        if (err) {
            res.send(null);
            console.log(err);
        } else {
            res.send(result)


            console.log(JSON.stringify(result));
        }
    });
});

productsRoutes.get("/getProductComments/subComments", (req, res) => {
    CaffeDB.query(`SELECT * FROM productssubcomments `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    });
});

productsRoutes.put("/getProductComments/editSubComments/:subcommentID", (req, res) => {
    CaffeDB.query(`UPDATE productssubcomments SET commentText='${req.body.commentText}' WHERE id = "${req.params.subcommentID}"`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    });
});

productsRoutes.put("/getProductComments/acceptSubComments/:subCommentID", (req, res) => {
    CaffeDB.query(`UPDATE productssubcomments SET isVerifyed = 1 WHERE id = "${req.params.subCommentID}"  `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    });
});

productsRoutes.put("/getProductComments/unAcceptSubComments/:subCommentID", (req, res) => {
    CaffeDB.query(`UPDATE productssubcomments SET isVerifyed = 0 WHERE id = "${req.params.subCommentID}"  `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    });
});

productsRoutes.delete("/getProductComments/deleteSubComments/:subCommentID", (req, res) => {
    CaffeDB.query(`DELETE FROM productssubcomments WHERE id = "${req.params.subCommentID}"  `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)


        }
    });
});

productsRoutes.post("/allProducts/searchProducts", (req, res) => {

    const grainSpread = req.body.grainType ? [req.body.grainType].map(item => `"${item}"`).join(", ") : ["Mixed-Arabica-And-Robusta", "Pure-Arabica", "Pure-Robusta"].map(item => `"${item}"`).join(", ")
    const brandSpread = req.body.brandType ? [req.body.brandType].map(item => `"${item}"`).join(", ") : ["Robusta", "Tomkins", "Bonmono"].map(item => `"${item}"`).join(", ")
    const offerSpread = req.body.offerType ? [req.body.offerType].map(item => `"${item}"`).join(", ") : [1, 0].map(item => `"${item}"`).join(", ")
    const priceSpread = req.body.filterPrice ? req.body.filterPrice : [1_000_000].map(item => `"${item}"`).join(", ")

    if (req.body.inputValue && req.body.inputValue.trim() !== "") {
        CaffeDB.query(` SELECT * FROM allproducts where
         name regexp "${req.body.inputValue}" and
         offPrice < ${priceSpread} and
         grainType in (${grainSpread}) and
         caffeType in (${brandSpread}) and
         hasOffer in (${offerSpread})`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(null)
                } else {
                    res.send(result)
                }
            });
    } else {
        CaffeDB.query(` SELECT * FROM allproducts where
         offPrice < ${priceSpread} and
         grainType in (${grainSpread}) and
         caffeType in (${brandSpread}) and
         hasOffer in (${offerSpread})`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(null)
                } else {
                    res.send(result)
                }
            });
    }
});

productsRoutes.post("/allProducts/addNewComments", (req, res) => {
    CaffeDB.query(`INSERT INTO productscomments  VALUES (NULL , '${req.body.firstName}','${req.body.lastName}','${req.body.role}','${req.body.commentText}','${req.body.date}','${req.body.isVerifyed}','${req.body.userID}','${req.body.productID}') `, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send("OK");
            console.log(res);
        }
    });
});
productsRoutes.post("/allProducts/addNewSubComments", (req, res) => {
    CaffeDB.query(`INSERT INTO productssubcomments  VALUES (NULL , '${req.body.firstName}','${req.body.lastName}','${req.body.commentText}','${req.body.date}','${req.body.role}','${req.body.isVerifyed}','${req.body.commentID}','${req.body.userID}','${req.body.productID}') `, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send("OK");
        }
    });
});

module.exports = productsRoutes