const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const UserModel = require("./models/user")
const bcrypt = require('bcrypt')  
const jwt = require('jsonwebtoken')  

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/create', (req, res) => {
    let { username, email, password, age } = req.body
    
    bcrypt.genSalt(10, (err, salt) => {  
        if (err) return res.status(500).send(err.message);
        
        bcrypt.hash(password, salt, async (err, hash) => {  
            if (err) return res.status(500).send(err.message);
            
            try {
                let createdUser = await UserModel.create({
                    username,
                    email,
                    password: hash,  
                    age
                })
                
                let token = jwt.sign({ email: email }, "12345678")  
                res.cookie("token", token)
                res.send(createdUser)
            } catch (error) {
                res.status(500).send(error.message)
            }
        })
    })
});

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});