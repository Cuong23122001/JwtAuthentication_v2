const authController = require('../controller/authController');
const { verifyToken } = require('../middleware/verifyToken');
const router = require('express').Router();

router.get('/', verifyToken, (req, res) => {
  res.send('Let\'s build a CRUD API!');
});
// REGISTER
router.post('/register', authController.register);
// LOG IN
router.post('/login', authController.login);
// LOG OUT
router.post('/logout', verifyToken, authController.logout);

module.exports = router;
