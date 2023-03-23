const User = require('../model/User');
const { generateToken } = require('../service/generateToken.service');
const bcrypt = require('bcrypt');
const authController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const checkUsername = await User.findOne({ username: username });
      if (checkUsername) {
        return res.send('User is exist');
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({ username: username, password: hashPassword });
      console.log(newUser);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({msg: error.message});
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          const accessToken = generateToken.generateAccessToken(user);
          const refreshToken = generateToken.generateRefreshToken(user);
          await User.findByIdAndUpdate(user._id, { token: { refreshToken: refreshToken } });
          res.status(200).json({ accessToken, refreshToken });
        } else {
          res.send({msg: 'Password incorrect'});
        }
      } else {
        res.send({msg: 'User not found'});
      }
    } catch (error) {
      res.status(500).json({msg: error.message});
    }
  },
  logout: async (req, res) => {
    try {
      const id = req.query.id;
      await User.findByIdAndUpdate(id, { token: { refreshToken: '' } });
      res.status(200).json('Logged out successfully!');
    } catch (error) {
      res.status(500).json({msg: error.message});
    }
  },
};

module.exports = authController;
