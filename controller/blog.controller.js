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
      const newBlog = await Blog.create(txtBlog);
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAllBlog: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getBlogById: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog) {
        res.status(200).json(blog);
      } else {
        res.send({ msg: 'Blog not found' });
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog) {
        await blog.updateOne({ $set: req.body });
        res.status(200).json({
          msg: 'Update Successfully!!!',
          data: blog.id,
        });
      } else {
        res.send({ msg: 'Blog not found' });
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (blog) {
        res.status(200).json({
          msg: 'Delete Successfully!!!',
          data: blog._id,
        });
      } else {
        res.send({ msg: 'Blog not found' });
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = blogController;
