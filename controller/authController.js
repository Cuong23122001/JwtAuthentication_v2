const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { authSchema } = require('../model/validationSchema/validate');
const bcrypt = require('bcrypt');
const authController = {
  register: async (req, res) => {
    try {
      const validate = await authSchema.validateAsync(req.body);
      const checkUsername = await User.findOne({ username: validate.username });
      if (checkUsername) {
        return res.send('User is exist');
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(validate.password, salt);
      validate.password = hashPassword;

      const newUser = await User.create(validate);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
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
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        await User.findByIdAndUpdate(user._id, { token: { refreshToken: refreshToken } });
        res.status(200).json({ accessToken, refreshToken });
      } else {
        res.send('Password incorrect');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  logout: async (req, res) => {
    try {
      const id = req.query.id;
      await User.findByIdAndUpdate(id, { token: { refreshToken: '' } });
      res.status(200).json('Logged out successfully!');
    } catch (error) {
      res.json(error);
    }
  },
};

module.exports = authController;
