const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const blogRouter = require('./blog');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/blog', blogRouter);

module.exports = router;
