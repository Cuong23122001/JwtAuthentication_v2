const constant = require('../constant/dbo');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  age: Number,
  phone: String,
  token: [{ type: Object }],
}, {
  'collection': constant.USER,
});

const User = mongoose.model(constant.USER, UserSchema);
module.exports = User;
