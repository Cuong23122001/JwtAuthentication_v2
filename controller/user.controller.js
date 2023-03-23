const User = require('../model/User');
const bcrypt = require('bcrypt');

const userController = {
  createUser: async (req, res) => {
    try {
      const { username, password, name, email, age, phone } = req.body;
      const checkUsername = await User.findOne({ username: username });
      if (!checkUsername) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
          username: username,
          password: hashPassword,
          name: name,
          email: email,
          age: age,
          phone: phone,
        });
        res.status(200).json(newUser);
      } else {
        res.send({ msg: 'User already exists' });
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.send({msg: 'User not found'});
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, email, age, phone } = req.body;
      const user = await User.findById(req.params.id);
      if (user) {
        await user.updateOne({
          $set: {
            name: name,
            email: email,
            age: age,
            phone: phone,
          },
        });
        res.status(200).json(user);
      } else {
        res.send({ msg: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) {
        res.status(200).json('Delete Successfully!!!' + user.name);
      } else {
        res.send({ msg: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

};
module.exports = userController;
