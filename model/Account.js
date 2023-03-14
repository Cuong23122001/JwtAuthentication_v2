const mongoose = require("mongoose");
const AccountSchema = new mongoose.Schema({
    username: String,
    password: String,
}, {
    collection: 'Account'
});

const AccountModel = mongoose.model('Account', AccountSchema);
module.exports = AccountModel;