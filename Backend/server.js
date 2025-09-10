/* eslint-disable no-unused-vars */

require("dotenv").config()

const path = require("path")


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const menuesLinksRoutes = require("./routes/menueRoutes");
const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes")
const usersRoutes = require("./routes/usersRoutes");
const filterAllProductsRoutes = require("./routes/filterAllProductsRoutes");
const offCodesRoutes = require("./routes/offCodesRoutes");
const cafeClubRoutes = require("./routes/cafeClubRoutes");

const panelMenusRoutes = require("./routes/panelMenusRoutes");
const panelNoticeRoutes = require("./routes/panelNoticeRoutes");
const panelCampainRoutes = require("./routes/panelCampainRoutes");

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.use("/uploads", express.static(path.join(__dirname, "uploads")))

server.use("/cafeAPI/menues", menuesLinksRoutes);
server.use("/cafeAPI/products", productsRoutes);
server.use("/cafeAPI/categories", categoriesRoutes);
server.use("/cafeAPI/users", usersRoutes);
server.use("/cafeAPI/filterProducts", filterAllProductsRoutes);
server.use("/cafeAPI/offCodes", offCodesRoutes);
server.use("/cafeAPI/cafeClub", cafeClubRoutes);
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
server.use("/cafeAPI/panel/menus", panelMenusRoutes);
server.use("/cafeAPI/panel/notices", panelNoticeRoutes);
server.use("/cafeAPI/panel/campains", panelCampainRoutes);


const PORT = process.env.PORT || 5000

server.listen(7000, (err) => {
    err ? console.log(err) : console.log("server run on port process.env.PORT");
});

// http://localhost:7000
// cd Frontend
// npm start
// cd Backend
// npx nodemon server.js

// server.listen(PORT, "0.0.0.0", (err) => {
//     err ? console.log(err) : console.log("server run on port process.env.PORT");
// });

// https://mycafeshop.onrender.com




