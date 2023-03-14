const router = require("express").Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const AccountModel = require("./model/Account")
router.use(cookieParser());
router.get('/', (req, res) => {
    res.render('login')
})
router.get("/login", (req, res, next) => {
    res.render("login");
});
router.post("/login", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    //database
    AccountModel.findOne({
        username: username,
        password: password
    })
        .then(data => {
            if (data) {
                const token = jwt.sign({
                    //trả về một object
                    _id: data._id
                }, "2312")

                return res.json({
                    message: "Succeed",
                    token: token
                })

            } else {
                return res.json("Fail")
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('Fail Server')
        })
});
//check login
router.get("/home", (req, res, next) => {
    try {
        const token = req.cookies.token;
        const result = jwt.verify(token, '2312');
        if (result) {
            next();
        }
    } catch (error) {
        return res.redirect('/login');
    }
}, (req, res, next) => {
    res.render("home")
})

module.exports = router;