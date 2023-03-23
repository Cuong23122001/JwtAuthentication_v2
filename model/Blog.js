const modelName = require('../constants/modelname.constants');
const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: String,
}, {
  'collection': modelName.Blog,
});

const Blog = mongoose.model(modelName.Blog, BlogSchema);
module.exports = Blog;
