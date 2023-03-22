const User = require('../model/User');
const { userUpdateSchema, userSchema } = require('../model/validationSchema/validate');

const userController = {
  createUser: async (req, res) => {
    try {
      const validate = await userSchema.validateAsync(req.body);
      const newUser = await User.create(validate);
      res.status(200).json(newUser);
    } catch (err) {
      console.log('Fail');
      res.status(500).json(err);
    }
  },
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.log('Fail');
      res.status(500).json(err);
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
      console.log('Successfully!!!');
    } catch (err) {
      console.log('Fail');
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, email, age, phone } = req.body;
      const validate = await userUpdateSchema.validateAsync({
        name: name,
        email: email,
        age: age,
        phone: phone,
      });
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: validate });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Delete Successfully!!!' + user);
      console.log('Delete Successfully!!!');
    } catch (err) {
      console.log('Fail');
      res.status(500).json(err);
    }
  },

};
module.exports = userController;
