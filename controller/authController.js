const Account = require("../model/Account");
const jwt = require("jsonwebtoken")
const authController = {
    register: async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const newAccount = await Account.create({
                username: username,
                password: password
            })
            res.status(200).json(newAccount);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    generateAccessToken: (account) => {
        return jwt.sign(
            {
                _id: account._id,
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_ACCESS_TIME }
        );
    },

    generateRefreshToken: (account) => {
        return jwt.sign(
            {
                _id: account._id,
            },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_TIME }
        );
    },
    login: async (req, res) => {
        try {
            const account = await Account.findOne({
                username: req.body.username,
                password: req.body.password
            });
            if (account) {
                const accessToken = authController.generateAccessToken(account);
                const refreshToken = authController.generateRefreshToken(account);
                await Account.findByIdAndUpdate(account._id, { token: { refreshToken: refreshToken } });
                const accountCurrent = await Account.findById(account._id);
                res.status(200).json({ accountCurrent, accessToken });
            };
        } catch (error) {
            res.status(500).json(error)
        }
    },
    logout: async (req, res) => {
        try {
            const id = req.query.id;
            await Account.findByIdAndUpdate(id, { token: { refreshToken: "" } });
            res.status(200).json("Logged out successfully!")
        } catch (error) {
            res.json(error);
        }
    },
}

module.exports = authController;