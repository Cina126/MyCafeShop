const express = require("express");
const CaffeDB = require("./../database.js");
const articlesRoutes = express.Router();

const path = require("path")
const multer = require("multer")

const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
        fieldSize: 50 * 1024 * 1024,
        fieldNameSize: 200
    }
})

articlesRoutes.get("/getAllArticles", (req, res) => {
    CaffeDB.query(`SELECT * FROM articles `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)
        }
    })
});

articlesRoutes.post("/addNewArticle", upload.single("cover"), (req, res) => {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null
    CaffeDB.query(`INSERT INTO articles VALUES (null,'${imagePath}',
        '${req.body.title}',
        '${req.body.summery}',
        '${req.body.body}',
        '${req.body.date}',
        '${req.body.creator}',
        '${req.body.link}')`,
        (err, result) => {
            if (err) {
                res.send(null);
            } else {
                res.send(result)
            }
        })
});

articlesRoutes.delete("/deleteArticle/:articleID", (req, res) => {
    const articleId = req.params.articleID;
    CaffeDB.query(`SELECT cover FROM articles WHERE id = '${req.params.articleID}' `, (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) {
            return res.status(404).send({ message: "مقاله پیدا نشد" });
        }
        const imagePath = result[0].cover;
        CaffeDB.query(`DELETE FROM articles WHERE id = '${articleId}' `, (err2, result2) => {
            if (err2) return res.status(500).send(err2);
            if (imagePath) {
                const fullPath = path.join(__dirname, "..", imagePath);
                fs.unlink(fullPath, (err3) => {
                    if (err3) {
                        console.error("خطا در حذف فایل:", err3);
                    }
                });
            }
            res.send({ message: "مقاله و عکسش حذف شد" });
        });
    });
});

articlesRoutes.put("/updateArticle/:articleID", upload.single("cover"), (req, res) => {
    const articleID = req.params.articleID;
    if (req.file) {
        const imagePath = `/uploads/${req.file.filename}`;
        CaffeDB.query(`SELECT cover FROM articles WHERE id='${articleID}'`, (err, result) => {
            if (err) return res.status(500).send("DB Error");

            const oldImagePath = result[0]?.cover;

            CaffeDB.query(
                `UPDATE articles SET cover='${imagePath}',title='${req.body.title}',summery='${req.body.summery}',body='${req.body.body}',link='${req.body.link}' WHERE id='${articleID}'`,
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
            `UPDATE articles SET title='${req.body.title}',summery='${req.body.summery}',body='${req.body.body}',link='${req.body.link}'WHERE id='${articleID}'`,
            (err, result) => {
                if (err) res.status(500).send("Update Error");
                else res.send(result);
            }
        );
    }
});

articlesRoutes.post("/uploadImageCKEditor", upload.single("upload"), (req, res) => {
    if (req.file) {
        const imagePath = `http://localhost:7000/uploads/${req.file.filename}`
        res.json({ url: imagePath })
    }
});

articlesRoutes.post("/searchArticlesByName", (req, res) => {

    if (req.body.inputValue && req.body.inputValue.trim() !== "") {
        CaffeDB.query(`SELECT * FROM articles where
         title regexp "${req.body.inputValue}" `,
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(null)
                } else {
                    res.send(result)
                }
            });
    } else {
        CaffeDB.query(`SELECT * FROM articles where
         title regexp "" `,
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(null)
                } else {
                    res.send(result)
                }
            });
    }
})

module.exports = articlesRoutes
