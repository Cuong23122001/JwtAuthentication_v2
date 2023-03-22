const Blog = require('../model/Blog');
const moment = require('moment');
const blogController = {
  createBlog: async (req, res) => {
    try {
      const { title, description } = req.body;
      const txtBlog = {
        title: title,
        description: description,
        createdAt: moment().format('YYYY/MM/DD h:mm:ss a'),
      };
      console.log(txtBlog);
      const newBlog = await Blog.create(txtBlog);
      res.status(200).json(newBlog);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllBlog: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getBlogById: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      res.status(200).json(blog);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      await blog.updateOne({ $set: req.body });
      res.status(200).json('Update Successfully!!!' + blog);
    } catch (err) {
      console.log('Fail');
      res.status(500).json(err);
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json('Delete Successfully!!!' + blog);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = blogController;
