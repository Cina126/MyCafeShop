const express = require("express");
const pool = require("./../database.js");
const articlesRoutes = express.Router();

const path = require("path")
const multer = require("multer")

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
    pool.query(`SELECT * FROM articles `, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)
        }
    })
});


articlesRoutes.post("/addNewArticle", upload.single("cover"), (req, res) => {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null
    pool.query(`INSERT INTO articles VALUES (null,'${imagePath}','${req.body.title}','${req.body.summery}','${req.body.body}','${req.body.date}','${req.body.creator}','${req.body.link}')`, (err, result) => {
        if (err) {
            res.send(null);
        } else {
            res.send(result)
        }
    })
});

articlesRoutes.put("/updateArticle/:articleID", upload.single("cover"), (req, res) => {
    if (req.file) {
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null
        pool.query(`UPDATE articles SET cover='${imagePath}',title='${req.body.title}',summery='${req.body.summery}',body='${req.body.body}',link='${req.body.link}' WHERE id = '${req.params.articleID}' `, (err, result) => {
            if (err) {
                res.send(null);
            } else {
                res.send(result)
            }
        })
    }
    else {
        pool.query(`UPDATE articles SET title='${req.body.title}',summery='${req.body.summery}',body='${req.body.body}',link='${req.body.link}' WHERE id = '${req.params.articleID}' `, (err, result) => {
            if (err) {
                res.send(null);
            } else {
                res.send(result)
            }
        })
    }

});

articlesRoutes.post("/uploadImageCKEditor", upload.single("upload"), (req, res) => {
    if (req.file) {
        const imagePath = `http://localhost:7000/uploads/${req.file.filename}`
        res.json({ url: imagePath })
    }
});

module.exports = articlesRoutes
