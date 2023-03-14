require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog")
const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.use((err, req, res, next) => {
    console.log(err);
})

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoutes);
app.use("/v1/user", userRoutes);
app.use("/v1/blog", blogRoutes);


const PORT = process.env.PORT || 2111;
app.listen(PORT)
console.log("app running is: ", PORT)