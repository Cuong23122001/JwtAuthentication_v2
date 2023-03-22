const userController = require('../controller/userController');
const { verifyToken } = require('../middleware/verifyToken');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Let\'s go to User');
});
router.post('/user', verifyToken, userController.createUser);
router.get('/user', verifyToken, userController.getAllUser);
router.get('/user/:id', verifyToken, userController.getUserById);
router.put('/user/:id', verifyToken, userController.updateUser);
router.delete('/user/:id', verifyToken, userController.deleteUser);

module.exports = router;
