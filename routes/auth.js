const authController = require('../controller/auth.controller');
const { verifyToken } = require('../middleware/verifyToken');
const {validate} = require('../utils/validate');
const router = require('express').Router();

router.get('/', verifyToken, (req, res) => {
  res.send('Let\'s build a CRUD API!');
});
// REGISTER
router.post('/register', validate.authValidate, authController.register);
// LOG IN
router.post('/login', validate.authValidate, authController.login);
// LOG OUT
router.post('/logout', verifyToken, authController.logout);

module.exports = router;
