const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const UserModel = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render("index");
});

app.get('/login', function (req, res) {
    res.render("login");
});

app.post('/login', async function (req, res) {
    let user = await UserModel.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.send("User not found");
    }

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign(
                { email: user.email },
                "shhhhhhhhhhh"
            );

            res.cookie("token", token);
            res.redirect("/home");
        } else {
            res.send("Wrong password");
        }
    });
});

app.post('/create', function (req, res) {
    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let createdUser = await UserModel.create({
                username,
                email,
                password: hash,
                age
            });

            let token = jwt.sign(
                { email: email },
                "shhhhhhhhhhh"
            );

            res.cookie("token", token);
            res.redirect("/home");
        });
    });
});

app.get('/home', function (req, res) {
    let token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    jwt.verify(token, "shhhhhhhhhhh", function (err, decoded) {
        if (err) {
            return res.send("Invalid Token");
        }
        res.render("home");
    });
});

app.get('/logout', function (req, res) {
    res.clearCookie("token");
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});