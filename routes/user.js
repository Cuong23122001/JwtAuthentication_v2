const { createUser, getAllUser, getUserById, updateUser, deleteUser, } = require("../controller/userController");
const { verifyToken } = require("../middleware/verifyToken");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Let's go to User");
});
router.post("/User", verifyToken, createUser);
router.get("/User", verifyToken, getAllUser);
router.get("/User/:id", verifyToken, getUserById);
router.put("/User/:id", verifyToken, updateUser);
router.delete("/User/:id", verifyToken, deleteUser);

module.exports = router;