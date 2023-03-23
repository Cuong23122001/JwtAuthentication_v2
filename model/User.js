const modelName = require('../constants/modelname.constants');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  name: String,
  email: String,
  age: Number,
  phone: String,
  token: [{ type: Object }],
}, {
  'collection': modelName.User,
});

const User = mongoose.model(modelName.User, UserSchema);
module.exports = User;
