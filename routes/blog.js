const blogController = require('../controller/blogController');
const { verifyToken } = require('../middleware/verifyToken');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Let\'s go to Blog!');
});
router.post('/create', verifyToken, blogController.createBlog);
router.get('/getAll', verifyToken, blogController.getAllBlog);
router.get('/getBlog/:id', verifyToken, blogController.getBlogById);
router.put('/updateBlog/:id', verifyToken, blogController.updateBlog);
router.delete('/deleteBlog/:id', verifyToken, blogController.deleteBlog);

module.exports = router;
