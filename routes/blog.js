const { createBlog, getAllBLog, getBlogById, updateBlog, deleteBlog } = require("../controller/blogController");
const { verifyToken } = require("../middleware/verifyToken");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Let's go to Blog!");
});
router.post("/Blog", verifyToken, createBlog);
router.get("/Blog", verifyToken, getAllBLog);
router.get("/Blog/:id", verifyToken, getBlogById);
router.put("/Blog/:id", verifyToken, updateBlog);
router.delete("/Blog/:id", verifyToken, deleteBlog);

module.exports = router;