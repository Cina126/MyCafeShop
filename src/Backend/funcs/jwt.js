const jwt = require("jsonwebtoken");

const secretKey = "This Is My Secret KEY";

function generateUniqToken() {
    const payload = {
        timestamp: new Date(),
        random: Math.random(),
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token
}



module.exports = generateUniqToken;

