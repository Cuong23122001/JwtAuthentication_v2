const Joi = require('joi');

const authSchema = Joi.object({
  username: Joi.string().min(2).lowercase().required(),
  password: Joi.string().min(3).required(),
});
const userSchema = Joi.object({
  username: Joi.string().min(2).lowercase().required(),
  password: Joi.string().min(3).required(),
  name: Joi.string().regex(/^[A-Z]+$/i),
  email: Joi.string().email().lowercase(),
  age: Joi.number().integer(),
  phone: Joi.string().regex(/^[0-9]{10}$/),
});
const userUpdateSchema = Joi.object({
  name: Joi.string().regex(/^[A-Z]+$/i),
  email: Joi.string().email().lowercase(),
  age: Joi.number().integer(),
  phone: Joi.string().regex(/^[0-9]{10}$/),
});
module.exports = { authSchema, userSchema, userUpdateSchema };
