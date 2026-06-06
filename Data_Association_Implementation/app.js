const express = require('express');
const app = express();
const userModel = require("./models/user")
const cookieParser = require('cookie-parser');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('views'));

app.get('/',(req,res)=>{
        res.render("index");
});

app.get("/create",(req,res)=>{

})
app.listen(8000,()=>{
     console.log("The server is runing on the port 8000")
})