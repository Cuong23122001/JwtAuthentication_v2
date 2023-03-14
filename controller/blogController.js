const Blog = require("../model/Blog");
const createBlog = async (req, res) => {
    try {
        const a = req.body;
        console.log(a);
        const newBlog = await Blog.create(req.body);
        res.status(200).json(newBlog);
    } catch (error) {
        res.status(500).json(error);
    }
};
const getAllBLog = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json(error);
    }
}
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
    }
};
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        await blog.updateOne({ $set: req.body });
        res.status(200).json("Update Successfully!!!" + blog);
    } catch (err) {
        console.log("Fail");
        res.status(500).json(err);
    }
};
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete Successfully!!!" + blog);
    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports = {
    createBlog,
    getAllBLog,
    getBlogById,
    updateBlog,
    deleteBlog
};