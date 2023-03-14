const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phone: String,
}, {
    "collection": "User"
})

const User = mongoose.model("User", UserSchema);
module.exports = User;