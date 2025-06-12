const cafeDatabase = require("./../database.js");

function getIDFromProductName(productBrandName) {
    return new Promise((resolve, reject) => {
        cafeDatabase.query(`SELECT id FROM allproducts where brandName = "${productBrandName}" `, (err, result) => {
            if (err) {
                return err
            } else {
                resolve(result)
            }
        });
    })
}
module.exports = getIDFromProductName;