const { createBlog, getAllBLog, getBlogById, updateBlog, deleteBlog } = require("../controller/blogController");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Let's go to Blog!");
});
router.post("/Blog", createBlog);
router.get("/Blog", getAllBLog);
router.get("/Blog/:id", getBlogById);
router.put("/Blog/:id", updateBlog);
router.delete("/Blog/:id", deleteBlog);

module.exports = router;