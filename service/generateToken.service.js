const jwt = require('jsonwebtoken');
const generateToken = {
  generateAccessToken: (account) => {
    return jwt.sign(
        {
          _id: account._id,
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TIME },
    );
  },

  generateRefreshToken: (account) => {
    return jwt.sign(
        {
          _id: account._id,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_TIME },
    );
  },
};
module.exports = {generateToken};
