const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const accessToken = token && token.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    next();
  } catch (error) {
    res.status(401).json('You are not authenticated');
  }
};

module.exports = { verifyToken };
