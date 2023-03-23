const blogController = require('../controller/blog.controller');
const { verifyToken } = require('../middleware/verifyToken');
const {validate} = require('../utils/validate');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Let\'s go to Blog!');
});
router.post('/create', verifyToken, validate.blogValidate, blogController.createBlog);
router.get('/getAll', verifyToken, blogController.getAllBlog);
router.get('/getBlog/:id', verifyToken, blogController.getBlogById);
router.put('/updateBlog/:id', verifyToken, validate.blogValidate, blogController.updateBlog);
router.delete('/deleteBlog/:id', verifyToken, blogController.deleteBlog);

module.exports = router;
