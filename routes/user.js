const userController = require('../controller/user.controller');
const { verifyToken } = require('../middleware/verifyToken');
const {validate} = require('../utils/validate');
const router = require('express').Router();

router.post('/create', verifyToken, validate.userValidate, userController.createUser);
router.get('/getAll', verifyToken, userController.getAllUser);
router.get('/getUser/:id', verifyToken, userController.getUserById);
router.put('/updateUser/:id', verifyToken, validate.userUpdateValidate, userController.updateUser);
router.delete('/deleteUser/:id', verifyToken, userController.deleteUser);

module.exports = router;
