const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.token;
        // ở headers có đoạn text là bearer token nên sử dụng split(" ")[1] để lấy token ra
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (err) {
                res.status(403).json("Token is not valid!");
                next("Invalid")
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(401).json("You're not authenticated");
    }
}

module.exports = { verifyToken };