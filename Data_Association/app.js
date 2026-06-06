const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", function(req, res) {
    res.send("hello this is Abubakar Orakzai");
});

app.get("/create", async(req, res) => {
     let user = await userModel.create({
          username: "Abubakar Orakzai",
          age:25,
          email:"abubakarorakzai15@gmail.com"
     });
         res.send(user);
});

app.get("/post/create",async(req,res)=>{
       let post = await  postModel.create({
        postdata:"hello you will see the data about all the user",
        user:"6a242b1bc4b8cb3765730cc9"
     })

     let user = await userModel.findOne({_id:"6a242b1bc4b8cb3765730cc9"})
     user.posts.push(post._id);  
        await user.save()
         res.send({post,user});

})

app.listen(3000, () => {
    console.log("Running on port 3000");
});