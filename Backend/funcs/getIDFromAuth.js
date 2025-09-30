const CaffeDB = require("./../database.js");

function getIDFromAuth(userToken) {
    return new Promise((resolve, reject) => {
        CaffeDB.query(`SELECT id FROM users WHERE token = "${userToken}" `, (err, result) => {
            if (err) {
                return err
            } else {
                resolve(result)
            }
        });
    })
}
module.exports = getIDFromAuth;

