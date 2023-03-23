const Joi = require('joi');

const validate = {
  authValidate: async (req, res, next)=>{
    try {
      const authSchema = Joi.object({
        username: Joi.string().min(3).lowercase().required(),
        password: Joi.string().min(6).required(),
      });
      await authSchema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(500).json({msg: error.message});
    }
  },
  userValidate: async (req, res, next)=>{
    try {
      const userSchema = Joi.object({
        username: Joi.string().min(3).lowercase().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string(),
        email: Joi.string().email().lowercase(),
        age: Joi.number().integer(),
        phone: Joi.string().regex(/^[0-9]+$/),
      });
      await userSchema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(500).json({msg: error.message});
    }
  },
  userUpdateValidate: async (req, res, next)=>{
    try {
      const userUpdateSchema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email().lowercase(),
        age: Joi.number().integer(),
        phone: Joi.string().regex(/^[0-9]+$/),
      });
      await userUpdateSchema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(500).json({msg: error.message});
    }
  },
  blogValidate: async (req, res, next)=>{
    try {
      const blogSchema = Joi.object({
        title: Joi.string().min(5),
        description: Joi.string().min(5),
        createdAt: Joi.date(),
      });
      await blogSchema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(500).json({msg: error.message});
    }
  },
};


module.exports = {validate};
