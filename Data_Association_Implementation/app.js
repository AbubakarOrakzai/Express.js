const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/miniporject")
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ Connection error:', err));

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('views'));

app.get('/',(req,res)=>{
    res.render("index");
});

app.get("/register", (req,res)=>{
    res.render("index");
});

app.post("/register", async(req,res)=>{
    let {email, password, username, name, age} = req.body;
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
    let { email, password } = req.body;  
    
    let user = await userModel.findOne({ email });
    if (!user) return res.status(500).send("Something went wrong");
    
    bcrypt.compare(password, user.password, function(err, result) {  
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "shhhh");  
            res.cookie("token", token);
            res.status(200).redirect("/profile");
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
            res.redirect("/login");
        }
    }
}

app.get('/profile', isLoggedIn, async(req,res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    console.log(user);
    console.log("User's posts with content:", user.posts); 
    res.render("profile", {user});
});

app.post("/post", isLoggedIn, async(req,res)=>{
    let user = await userModel.findOne({email: req.user.email});
    let {content} = req.body;
    
    let post = await postModel.create({
        user: user._id,
        content,
        likes: []
    });
    
    user.posts.push(post._id);
    await user.save();
    
    await user.populate("posts");
    console.log("Updated posts:", user.posts);
    
    res.redirect("/profile");
});

app.get("/like/:id", isLoggedIn, async(req,res)=>{
    try {
        let post = await postModel.findOne({_id: req.params.id});
        
        if (!post) {
            return res.redirect("/profile");
        }
        
        if (!post.likes) {
            post.likes = [];
        }
        
        if(post.likes.indexOf(req.user.userid) == -1){
            post.likes.push(req.user.userid);
        } else {
            post.likes.splice(post.likes.indexOf(req.user.userid), 1);
        }
        
        await post.save();
        res.redirect("/profile");
    } catch(err) {
        console.error("Like error:", err);
        res.redirect("/profile");
    }
});

app.get("/edit/:id", isLoggedIn, async(req,res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate("user");
    await post.user.populate("posts");  
    res.render("edit", {post});  
});

app.post("/update/:id", isLoggedIn, async(req,res)=>{
    try {
        await postModel.findOneAndUpdate(
            {_id: req.params.id},
            {content: req.body.content}
        );
        res.redirect("/profile");
    } catch(err) {
        console.error("Update error:", err);
        res.redirect("/profile");
    }
});

app.listen(8000,()=>{
    console.log("The server is running on the port 8000");
});