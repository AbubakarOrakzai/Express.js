const express = require('express');
const app = express()

app.get('/',(req,res)=>{
       console.log("hey")
       res.send("hellow World")
})

app.listen(3000,()=>{
       console.log("Your server is runing on the port 3000")
})