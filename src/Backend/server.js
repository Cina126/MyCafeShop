/* eslint-disable no-unused-vars */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const menuesLinksRoutes = require("./routes/menueRoutes");
const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes")
const usersRoutes = require("./routes/usersRoutes");
const filterAllProductsRoutes = require("./routes/filterAllProductsRoutes")

const panelMenuesRoutes = require("./routes/panelMenusRoutes")

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use("/cafeAPI/menues", menuesLinksRoutes);
server.use("/cafeAPI/products", productsRoutes);
server.use("/cafeAPI/categories", categoriesRoutes);
server.use("/cafeAPI/users", usersRoutes);
server.use("/cafeAPI/filterProducts", filterAllProductsRoutes);
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
server.use("/cafeAPI/panel", panelMenuesRoutes);

server.listen(7000, (err) => {
    err ? console.log(err) : console.log("server run on port 7000");
});




