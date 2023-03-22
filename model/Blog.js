const constant = require('../constant/dbo');
const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: String,
}, {
  'collection': constant.BLOG,
});

const Blog = mongoose.model(constant.BLOG, BlogSchema);
module.exports = Blog;
