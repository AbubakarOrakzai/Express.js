const express = require('express');
const app = express()

app.get('/',(req,res)=>{
       console.log("hey")
})

app.get('/create',async(req,res)=>{
      let createduser = await userModel.create({
        name:"Abubakar Orakzai",
        email:"abubakarorakzai15@gmail.com",
        username:"Abubakar Orakzai"
      })
        res.send(createduser)
})

app.delete('/delete',async(req,res)=>{
    let user = await userModel.findOneAndDelete({username:"Abubakar Orakzai"})
      res.send(users)
})
app.listen(3000,()=>{
       console.log("Your server is runing on the port 3000")
})