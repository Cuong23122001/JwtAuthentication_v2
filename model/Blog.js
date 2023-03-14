const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    "collection": "Blog"
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;