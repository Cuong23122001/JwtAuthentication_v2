const User = require("../model/User");

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.status(200).json(newUser);
    } catch (err) {
        console.log("Fail");
        res.status(500).json(err);
    }
}
const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.log("Fail");
        res.status(500).json(err);
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
        console.log("Successfully!!!");
    } catch (err) {
        console.log("Fail");
        res.status(500).json(err);
    }
};
const updateUser = async (req, res) => {
    try {
        const a = req.body;
        console.log(a);
        const user = await User.findById(req.params.id);
        await user.updateOne({ $set: req.body });
        res.status(200).json(user);
        console.log("Update Successfully!!!");
    } catch (err) {
        console.log("Fail");
        res.status(500).json(err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete Successfully!!!" + user);
        console.log("Delete Successfully!!!");
    } catch (err) {
        console.log("Fail");
        res.status(500).json(err);
    }
};
module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
}