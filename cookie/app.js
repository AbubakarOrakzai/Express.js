const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());


app.get('/',(req,res)=>{
    res.cookie("Name","Abubakar Orakzai")
    res.send("Hey")
})

app.get('/read',(req,res)=>{
    console.log(req.cookies)
    console.log("Done")
 res.send(req.cookies);
})
app.listen(3000,()=>{
    console.log("The server is running ")
})