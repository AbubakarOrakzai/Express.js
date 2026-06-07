const express = require('express');
const app = express();
const userModel = require("./models/user")
const postModel = require("./models/post")
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('views'));

app.get('/',(req,res)=>{
    res.render("index");
});

app.post("/register", async(req,res)=>{
    let {email,password,username,name,age}=req.body;
    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already register");
     
    bcrypt.genSalt(10, async (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash  
            });
            
            let token = jwt.sign({email: email, userid: user._id}, "shhhh");  
            res.cookie("token", token);
            res.send("registered");
        });
    });
});

app.get('/login',(req,res)=>{
    res.render("login");
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body;  // ✅ Fixed
    
    let user = await userModel.findOne({ email });
    if (!user) return res.status(500).send("Something went wrong");
    
    bcrypt.compare(password, user.password, function(err, result) {  // ✅ Fixed
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "shhhh");  
            res.cookie("token", token);
            res.status(200).send("you can login");
        } else {
            res.redirect("/login");
        }
    });
});

app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/login");
});

function isLoggedIn(req,res,next){
    if(req.cookies.token === "") {
        res.send("You must be logged in");
    } else {
        try {
            let data = jwt.verify(req.cookies.token,"shhhh");
            req.user = data;
            next();
        } catch(err) {
            res.send("Invalid token");
        }
    }
}

app.get('/profile', isLoggedIn, (req,res)=>{
    console.log(req.user);
    res.render("login")
});

app.listen(8000,()=>{
    console.log("The server is running on the port 8000");
});