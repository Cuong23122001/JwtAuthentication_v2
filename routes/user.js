const { createUser, getAllUser, getUserById, updateUser, deleteUser, } = require("../controller/userController");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Let's go to User");
});
router.post("/User", createUser);
router.get("/User", getAllUser);
router.get("/User/:id", getUserById);
router.put("/User/:id", updateUser);
router.delete("/User/:id", deleteUser);

module.exports = router;